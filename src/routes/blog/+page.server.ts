import { getPosts } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = getPosts().slice(0, 10);
	return {
		posts: posts.map((p) => ({
			slug: p.slug,
			...p.frontmatter
		}))
	};
};
