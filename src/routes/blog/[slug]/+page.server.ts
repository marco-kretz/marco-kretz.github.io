import { getPosts, getPostBySlug } from '$lib/blog';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return getPosts().map((p) => ({ slug: p.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const post = getPostBySlug(params.slug);
	if (!post) {
		throw error(404, 'Post nicht gefunden');
	}

	return {
		slug: params.slug,
		frontmatter: post.frontmatter
	};
};
