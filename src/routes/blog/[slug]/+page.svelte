<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { getPostBySlug } from '$lib/blog';
	import { onMount } from 'svelte';

	let { data } = $props();

	const post = $derived(getPostBySlug(data.slug)!);
	const Content = $derived(post.content);

	const shareUrl = $derived(`https://marco-kretz.de/blog/${data.slug}/`);

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: data.frontmatter.title,
			description: data.frontmatter.description,
			datePublished: data.frontmatter.pubDate.toISOString(),
			author: {
				'@type': 'Person',
				name: 'Marco Kretz',
				url: 'https://marco-kretz.de'
			},
			publisher: {
				'@type': 'Person',
				name: 'Marco Kretz',
				url: 'https://marco-kretz.de'
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': `https://marco-kretz.de/blog/${data.slug}/`
			},
			...(data.frontmatter.tags && { keywords: data.frontmatter.tags.join(', ') })
		})
	);

	onMount(() => {
		initTOC();
		initCodeBlocks();
	});

	function initTOC() {
		const article = document.getElementById('article-content');
		const tocList = document.getElementById('toc-list');
		if (!article || !tocList) return;

		tocList.textContent = '';
		const headings = article.querySelectorAll('h2, h3');
		if (headings.length === 0) return;

		headings.forEach((heading, index) => {
			if (!heading.id) {
				heading.id = `section-${index}`;
			}

			const li = document.createElement('li');
			const a = document.createElement('a');
			const isH3 = heading.tagName === 'H3';

			a.href = `#${heading.id}`;
			a.className = `toc-link block py-1 ${isH3 ? 'pl-3 text-xs' : ''} text-terminal-textDim hover:text-terminal-accent transition-colors truncate`;
			a.setAttribute('data-target', heading.id);
			a.textContent = `${isH3 ? '└ ' : ''}${heading.textContent}`;

			li.appendChild(a);
			tocList.appendChild(li);
		});

		const tocLinks = tocList.querySelectorAll('.toc-link');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const id = entry.target.id;
						tocLinks.forEach((link) => {
							if (link.getAttribute('data-target') === id) {
								link.classList.add('text-terminal-accent', 'font-semibold');
								link.classList.remove('text-terminal-textDim');
							} else {
								link.classList.remove('text-terminal-accent', 'font-semibold');
								link.classList.add('text-terminal-textDim');
							}
						});
					}
				});
			},
			{
				rootMargin: '-80px 0px -60% 0px',
				threshold: 0
			}
		);

		headings.forEach((heading) => observer.observe(heading));

		tocLinks.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const targetId = link.getAttribute('data-target');
				const target = document.getElementById(targetId || '');
				if (target) {
					target.scrollIntoView({ behavior: 'smooth', block: 'start' });
					history.pushState(null, '', `#${targetId}`);
				}
			});
		});
	}

	function initCodeBlocks() {
		const codeblocks = document.querySelectorAll('pre.shiki:not([data-initialized])');

		codeblocks.forEach((codeblock) => {
			codeblock.setAttribute('data-initialized', 'true');
			const language = codeblock.getAttribute('data-language') || 'text';
			codeblock.setAttribute('data-title', language);

			const wrapper = document.createElement('div');
			wrapper.className = 'code-block-wrapper';
			codeblock.parentElement?.insertBefore(wrapper, codeblock);
			wrapper.appendChild(codeblock);

			const copyButton = document.createElement('button');
			copyButton.className = 'code-copy-button';
			copyButton.setAttribute('aria-label', 'Code in die Zwischenablage kopieren');

			const copyIcon = createCopyIcon();
			copyButton.appendChild(copyIcon);

			copyButton.addEventListener('click', async () => {
				const codeElement = codeblock.querySelector('code');
				const codeText = codeElement?.textContent;
				if (!codeText) return;

				try {
					await navigator.clipboard.writeText(codeText);
					copyButton.textContent = '';
					copyButton.appendChild(createCheckIcon());
					copyButton.style.color = '#238636';
					setTimeout(() => {
						copyButton.textContent = '';
						copyButton.appendChild(createCopyIcon());
						copyButton.style.color = '';
					}, 2000);
				} catch (err) {
					console.error('Failed to copy code:', err);
				}
			});

			wrapper.appendChild(copyButton);
		});
	}

	function createSvgElement(pathD: string): SVGSVGElement {
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('class', 'w-4 h-4');
		svg.setAttribute('fill', 'none');
		svg.setAttribute('viewBox', '0 0 24 24');
		svg.setAttribute('stroke', 'currentColor');
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('stroke-linecap', 'round');
		path.setAttribute('stroke-linejoin', 'round');
		path.setAttribute('stroke-width', '2');
		path.setAttribute('d', pathD);
		svg.appendChild(path);
		return svg;
	}

	function createCopyIcon(): SVGSVGElement {
		return createSvgElement(
			'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
		);
	}

	function createCheckIcon(): SVGSVGElement {
		return createSvgElement('M5 13l4 4L19 7');
	}
</script>

<Seo
	title="{data.frontmatter.title} - Marco Kretz"
	description={data.frontmatter.description}
	url={shareUrl}
/>

<svelte:head>
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<!-- Floating Table of Contents -->
<nav
	id="toc"
	class="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block w-56 max-h-[70vh] overflow-y-auto"
	aria-label="Inhaltsverzeichnis"
>
	<div class="bg-[#161b22]/90 backdrop-blur-sm border border-terminal-border rounded-lg p-4">
		<h2
			class="font-mono text-xs uppercase tracking-wider text-terminal-textDim mb-3 flex items-center gap-2"
		>
			<span class="text-terminal-accent">$</span> Inhalt
		</h2>
		<ul id="toc-list" class="space-y-1 text-sm font-mono">
			<!-- Populated by JavaScript -->
		</ul>
	</div>
</nav>

<div class="max-w-4xl mx-auto px-4 py-8 md:py-16">
	<article id="article-content">
		<header class="mb-8">
			<h1 class="text-3xl md:text-4xl font-bold font-mono mb-4">
				{data.frontmatter.title}
			</h1>
			<div class="flex flex-wrap items-center gap-4 text-terminal-textDim text-sm mb-4">
				<time datetime={data.frontmatter.pubDate.toISOString()}>
					{data.frontmatter.pubDate.toLocaleDateString('de-DE', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
				{#if data.frontmatter.readTime}
					<span>&middot; {data.frontmatter.readTime} Lesezeit</span>
				{/if}
			</div>
			{#if data.frontmatter.description}
				<p class="text-terminal-textDim text-lg">{data.frontmatter.description}</p>
			{/if}
			{#if data.frontmatter.tags && data.frontmatter.tags.length > 0}
				<div class="flex flex-wrap gap-2 mt-4">
					{#each data.frontmatter.tags as tag}
						<span
							class="px-2 py-1 text-xs font-mono bg-[#161b22] border border-terminal-border rounded text-terminal-textDim"
						>
							#{tag}
						</span>
					{/each}
				</div>
			{/if}
		</header>

		<div class="prose prose-invert max-w-none">
			<Content />
		</div>
	</article>

	<div class="mt-16 pt-8 border-t border-terminal-border">
		<div class="flex items-center gap-4">
			<span class="text-terminal-textDim">Diesen Beitrag teilen:</span>
			<a
				href="https://twitter.com/intent/tweet?text={encodeURIComponent(data.frontmatter.title)}&url={encodeURIComponent(shareUrl)}"
				target="_blank"
				rel="noopener noreferrer"
				class="text-terminal-accent hover:underline"
			>
				Twitter
			</a>
			<a
				href="https://www.linkedin.com/sharing/share-offsite/?url={encodeURIComponent(shareUrl)}"
				target="_blank"
				rel="noopener noreferrer"
				class="text-terminal-accent hover:underline"
			>
				LinkedIn
			</a>
		</div>
	</div>
</div>

<style>
	/* TOC scrollbar styling */
	:global(#toc::-webkit-scrollbar) {
		width: 4px;
	}

	:global(#toc::-webkit-scrollbar-track) {
		background: transparent;
	}

	:global(#toc::-webkit-scrollbar-thumb) {
		background-color: #30363d;
		border-radius: 2px;
	}

	:global(#toc::-webkit-scrollbar-thumb:hover) {
		background-color: #484f58;
	}

	/* Offset headings for sticky header */
	:global(.prose h2),
	:global(.prose h3),
	:global(.prose h4) {
		scroll-margin-top: 5rem;
	}

	/* Active TOC link indicator */
	:global(.toc-link.text-terminal-accent) {
		position: relative;
	}

	:global(.toc-link.text-terminal-accent::before) {
		content: '';
		position: absolute;
		left: -8px;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 12px;
		background-color: #d29922;
		border-radius: 2px;
	}

	:global(.prose) {
		--tw-prose-body: #c9d1d9;
		--tw-prose-headings: #ffffff;
		--tw-prose-lead: #8b949e;
		--tw-prose-links: #58a6ff;
		--tw-prose-bold: #ffffff;
		--tw-prose-counters: #8b949e;
		--tw-prose-bullets: #8b949e;
		--tw-prose-hr: #30363d;
		--tw-prose-quotes: #c9d1d9;
		--tw-prose-quote-borders: #30363d;
		--tw-prose-captions: #8b949e;
		--tw-prose-code: #d29922;
		--tw-prose-pre-code: #c9d1d9;
		--tw-prose-pre-bg: #0d1117;
		--tw-prose-th-borders: #30363d;
		--tw-prose-td-borders: #30363d;
	}

	:global(.prose p > code),
	:global(.prose li > code),
	:global(.prose td > code) {
		background-color: #161b22;
		padding: 0.375rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		font-family: ui-monospace, monospace;
		color: #d29922;
	}

	:global(.prose code::before),
	:global(.prose code::after) {
		content: none;
	}

	/* Table styling */
	:global(.prose table) {
		border: 1px solid #30363d !important;
		border-radius: 0.5rem !important;
		overflow: hidden !important;
		background-color: #161b22 !important;
		margin-top: 2rem !important;
		margin-bottom: 2rem !important;
		border-collapse: separate !important;
		border-spacing: 0 !important;
	}

	:global(.prose thead) {
		background-color: #0d1117 !important;
	}

	:global(.prose th) {
		padding: 0.75rem 1rem !important;
		text-align: left !important;
		font-weight: 600 !important;
		font-family: 'JetBrains Mono', ui-monospace, monospace !important;
		border-right: 1px solid #30363d !important;
		border-bottom: 1px solid #30363d !important;
	}

	:global(.prose th:last-child) {
		border-right: none !important;
	}

	:global(.prose td) {
		padding: 0.75rem 1rem !important;
		border-right: 1px solid #30363d !important;
		border-bottom: 1px solid #30363d !important;
	}

	:global(.prose td:last-child) {
		border-right: none !important;
	}

	:global(.prose tbody tr:last-child td) {
		border-bottom: none !important;
	}

	/* Image styling */
	:global(.prose img) {
		border-radius: 0.5rem !important;
		border: 1px solid #30363d !important;
		margin: 2rem auto !important;
		display: block !important;
		max-width: 100% !important;
		height: auto !important;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.3),
			0 2px 4px -1px rgba(0, 0, 0, 0.2) !important;
	}

	:global(.prose p > img) {
		margin-top: 2rem !important;
		margin-bottom: 2rem !important;
	}
</style>
