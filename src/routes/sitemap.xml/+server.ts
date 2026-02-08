import { getPosts } from '$lib/blog';
import type { RequestHandler } from './$types';

const site = 'https://marco-kretz.de';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = getPosts();

	const staticPages = ['', '/blog/', '/impressum/', '/datenschutz/'];

	const urls = staticPages.map(
		(page) => `
	<url>
		<loc>${site}${page}</loc>
		<changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
		<priority>${page === '' ? '1.0' : '0.7'}</priority>
	</url>`
	);

	const postUrls = posts.map(
		(post) => `
	<url>
		<loc>${site}/blog/${post.slug}/</loc>
		<lastmod>${post.frontmatter.pubDate.toISOString().split('T')[0]}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.8</priority>
	</url>`
	);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${[...urls, ...postUrls].join('\n')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
