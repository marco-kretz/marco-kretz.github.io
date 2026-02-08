import { z } from 'zod';

const postSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	readTime: z.string().optional(),
	tags: z.array(z.string()).optional()
});

export type PostFrontmatter = z.infer<typeof postSchema>;

export interface Post {
	slug: string;
	frontmatter: PostFrontmatter;
	content: ConstructorOfATypedSvelteComponent;
}

type MdModule = {
	default: ConstructorOfATypedSvelteComponent;
	metadata: Record<string, unknown>;
};

function getModules(): Record<string, MdModule> {
	return import.meta.glob<MdModule>('/src/content/blog/*.md', { eager: true });
}

export function getPosts(): Post[] {
	const modules = getModules();
	const posts: Post[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = path.split('/').pop()!.replace('.md', '');
		const parsed = postSchema.safeParse(module.metadata);
		if (!parsed.success) {
			console.warn(`Invalid frontmatter in ${path}:`, parsed.error);
			continue;
		}
		posts.push({
			slug,
			frontmatter: parsed.data,
			content: module.default
		});
	}

	return posts.sort(
		(a, b) => b.frontmatter.pubDate.valueOf() - a.frontmatter.pubDate.valueOf()
	);
}

export function getPostBySlug(slug: string): Post | undefined {
	return getPosts().find((p) => p.slug === slug);
}

export function getRawPosts(): { slug: string; frontmatter: PostFrontmatter; rawContent: string }[] {
	const modules = import.meta.glob<string>('/src/content/blog/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	const posts: { slug: string; frontmatter: PostFrontmatter; rawContent: string }[] = [];

	for (const [path, raw] of Object.entries(modules)) {
		const slug = path.split('/').pop()!.replace('.md', '');
		// Extract frontmatter and body
		const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
		if (!match) continue;

		const body = match[2];

		// Parse frontmatter from the compiled modules
		const compiledModules = getModules();
		const compiled = compiledModules[path];
		if (!compiled) continue;

		const parsed = postSchema.safeParse(compiled.metadata);
		if (!parsed.success) continue;

		posts.push({
			slug,
			frontmatter: parsed.data,
			rawContent: body
		});
	}

	return posts.sort(
		(a, b) => b.frontmatter.pubDate.valueOf() - a.frontmatter.pubDate.valueOf()
	);
}
