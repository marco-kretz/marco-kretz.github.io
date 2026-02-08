import { getRawPosts } from '$lib/blog';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import type { RequestHandler } from './$types';

const parser = new MarkdownIt();
const site = 'https://marco-kretz.de';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = getRawPosts();

	const items = posts
		.map((post) => {
			const content = sanitizeHtml(parser.render(post.rawContent), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
			});

			return `
		<item>
			<title><![CDATA[${post.frontmatter.title}]]></title>
			<description><![CDATA[${post.frontmatter.description}]]></description>
			<link>${site}/blog/${post.slug}/</link>
			<guid isPermaLink="true">${site}/blog/${post.slug}/</guid>
			<pubDate>${post.frontmatter.pubDate.toUTCString()}</pubDate>
			<content:encoded><![CDATA[${content}]]></content:encoded>
		</item>`;
		})
		.join('\n');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Marco Kretz | Blog</title>
		<description>Webentwickler aus Deutschland mit fast 20 Jahren Erfahrung. PHP (Symfony/WordPress/Shopware), API-Entwicklung, Backend &amp; Frontend.</description>
		<link>${site}</link>
		<atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
		<language>de-de</language>
		<lastBuildDate>${posts[0]?.frontmatter.pubDate.toUTCString() ?? new Date().toUTCString()}</lastBuildDate>
		${items}
	</channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
