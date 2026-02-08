import adapter from '@sveltejs/adapter-static';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: [
		'javascript',
		'typescript',
		'php',
		'css',
		'html',
		'bash',
		'json',
		'yaml',
		'markdown',
		'svelte',
		'toml',
		'ini',
		'diff',
		'python',
		'sql'
	]
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang) => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang: lang || 'text',
					theme: 'github-dark'
				})
			);
			return `{@html \`${html}\`}`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*']
		},
		alias: {
			$content: 'src/content'
		}
	}
};

export default config;
