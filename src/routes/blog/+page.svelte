<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';

	let { data } = $props();
</script>

<Seo title="Blog - Marco Kretz" url="https://marco-kretz.de/blog/" />

<div class="max-w-4xl mx-auto px-4 py-8 md:py-16">
	<header class="mb-12">
		<h1 class="text-4xl md:text-5xl font-bold font-mono mb-4">
			<span class="text-terminal-accent">&lt;</span>
			<span>Blog</span>
			<span class="text-terminal-accent">/&gt;</span>
		</h1>
		<p class="text-terminal-textDim text-lg">
			Gedanken, Tutorials und Einblicke aus meiner Reise als Webentwickler.
		</p>
	</header>

	<div class="space-y-6">
		{#each data.posts as post}
			<a href="/blog/{post.slug}/" class="block group">
				<article class="card hover:border-terminal-accent transition-colors">
					<div class="flex flex-col gap-2">
						<h2
							class="text-xl font-semibold font-mono text-terminal-text group-hover:text-terminal-accent transition-colors"
						>
							{post.title}
						</h2>
						<div class="text-terminal-textDim text-sm flex items-center gap-4">
							<time datetime={post.pubDate.toISOString()}>
								{post.pubDate.toLocaleDateString('de-DE', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
							{#if post.readTime}
								<span>&middot; {post.readTime} Lesezeit</span>
							{/if}
						</div>
						{#if post.description}
							<p class="text-terminal-text mt-2">{post.description}</p>
						{/if}
						{#if post.tags && post.tags.length > 0}
							<div class="flex flex-wrap gap-2 mt-3">
								{#each post.tags as tag}
									<span
										class="px-2 py-1 text-xs font-mono bg-[#161b22] border border-terminal-border rounded text-terminal-textDim"
									>
										#{tag}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				</article>
			</a>
		{/each}
	</div>
</div>
