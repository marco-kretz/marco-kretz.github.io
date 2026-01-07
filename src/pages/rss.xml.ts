import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
	const posts = await getCollection('blog');
	const sortedPosts = posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);

	return rss({
		title: 'Marco Kretz | Blog',
		description:
			'Webentwickler aus Deutschland mit fast 20 Jahren Erfahrung. PHP (Symfony/WordPress/Shopware), API-Entwicklung, Backend & Frontend.',
		site: context.site?.toString() ?? 'https://marco-kretz.de',
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/blog/${post.slug}/`,
			content: sanitizeHtml(parser.render(post.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
			}),
		})),
		customData: `<language>de-de</language>`,
	});
}
