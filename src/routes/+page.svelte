<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import InteractiveTerminal from '$lib/components/InteractiveTerminal.svelte';
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import Mail from '@lucide/svelte/icons/mail';
	import Github from '$lib/components/icons/Github.svelte';

	let { data } = $props();

	const title = 'Marco Kretz';
	const role = 'Webentwickler';
	const location = 'Deutschland';
	const experience = '20 Jahre';

	const skills = [
		{
			category: 'Backend',
			items: ['PHP', 'Symfony', 'WordPress', 'Shopware', 'API-Entwicklung']
		},
		{
			category: 'Frontend',
			items: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS', 'Vue.js']
		},
		{
			category: 'Tools',
			items: ['Git', 'Docker', 'Linux', 'Composer', 'npm']
		}
	];

	const socialLinks = [
		{
			name: 'GitHub',
			href: 'https://github.com/marco-kretz',
			icon: Github
		},
		{
			name: 'codebites (Meine Firma)',
			href: 'https://codebites.de/',
			icon: Briefcase
		},
		{
			name: 'Email',
			href: 'mailto:hallo@marco-kretz.de',
			icon: Mail
		}
	];

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Marco Kretz',
		url: 'https://marco-kretz.de',
		jobTitle: 'Webentwickler',
		worksFor: {
			'@type': 'Organization',
			name: 'codebites',
			url: 'https://codebites.de'
		},
		knowsAbout: [
			'PHP',
			'Symfony',
			'WordPress',
			'Shopware',
			'JavaScript',
			'Vue.js',
			'API-Entwicklung',
			'Backend-Entwicklung',
			'Frontend-Entwicklung',
			'Agentic Coding',
			'AI-assisted Development'
		],
		sameAs: ['https://github.com/marco-kretz']
	});
</script>

<Seo />

<svelte:head>
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8 md:py-16">
	<!-- Hero Section -->
	<section class="mb-12">
		<div class="text-center mb-8">
			<h1
				class="glitch text-4xl md:text-5xl font-bold font-mono mb-2 hero-title"
				data-text="<Marco Kretz/>"
			>
				<span class="text-terminal-accent">&lt;</span>
				{title}
				<span class="text-terminal-accent">/&gt;</span>
			</h1>
			<p class="text-terminal-textDim text-lg">
				{role} aus {location} mit {experience}n Erfahrung
			</p>
		</div>

		<InteractiveTerminal recentPosts={data.recentPosts} {skills} />

		<!-- Social Links -->
		<div class="flex flex-wrap justify-center gap-4 mb-8">
			{#each socialLinks as link}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 px-6 py-3 bg-[#161b22] border border-terminal-border rounded-lg hover:border-terminal-accent hover:text-terminal-accent transition-all duration-200 font-mono"
				>
					<link.icon class="w-5 h-5 text-terminal-accent" />
					<span>{link.name}</span>
				</a>
			{/each}
		</div>
	</section>

	<!-- About Section -->
	<section class="mb-12">
		<h2 class="section-title">
			<span class="text-white">Über mich</span>
		</h2>
		<div class="card">
			<p class="text-terminal-text leading-relaxed mb-4">
				Moin! 👋<br />
				Mein Name ist Marco und ich bin Webentwickler aus Deutschland mit fast 20 Jahren Erfahrung in
				der Entwicklung robuster Webanwendungen. Ich bin spezialisiert auf PHP-Entwicklung, insbesondere
				mit Symfony, WordPress und Shopware.
			</p>
			<p class="text-terminal-text leading-relaxed mb-4">
				Meine Expertise umfasst sowohl Backend- als auch Frontend-Entwicklung mit einem starken Fokus
				auf Clean Code, API-Entwicklung und die Erstellung nahtloser Benutzererlebnisse. Ob Custom-Applications
				oder die Erweiterung bestehender Systeme – ich bringe ein tiefes Verständnis für Webtechnologien
				und Best Practices ein.
			</p>
			<p class="text-terminal-text leading-relaxed">
				Außerdem bin ich begeisterter <span class="text-terminal-accent font-semibold"
					>Agentic Coding</span
				> Enthusiast. KI-gestützte Entwicklung mit Tools wie Claude Code und OpenCode ist für mich nicht
				nur ein Trend, sondern ein fundamentaler Shift in der Art, wie wir Software entwickeln.
			</p>
		</div>
	</section>

	<!-- Skills Section -->
	<section class="mb-12">
		<h2 class="section-title">
			<span class="text-white">Fähigkeiten</span>
		</h2>
		<div class="grid md:grid-cols-3 gap-4">
			{#each skills as skillCategory}
				<div class="card">
					<h3 class="font-mono text-terminal-accent font-semibold mb-3 flex items-center gap-2">
						<span class="text-terminal-blue">#</span>
						{skillCategory.category}
					</h3>
					<ul class="space-y-2">
						{#each skillCategory.items as item}
							<li class="text-terminal-text flex items-center gap-2">
								<span class="text-terminal-accent">→</span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- Blog Preview Section -->
	<section class="mb-12">
		<h2 class="section-title">
			<span class="text-white">Neueste Beiträge</span>
		</h2>
		<div class="space-y-4">
			{#if data.recentPosts.length > 0}
				{#each data.recentPosts as post}
					<article class="card hover:border-terminal-accent transition-colors">
						<a href="/blog/{post.slug}/" class="block group">
							<div class="flex flex-col gap-2">
								<h3
									class="text-lg font-semibold font-mono text-terminal-text group-hover:text-terminal-accent transition-colors"
								>
									{post.title}
								</h3>
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
									<p class="text-terminal-text text-sm mt-1">{post.description}</p>
								{/if}
							</div>
						</a>
					</article>
				{/each}
			{:else}
				<div class="card">
					<p class="text-terminal-textDim">Noch keine Beiträge vorhanden.</p>
				</div>
			{/if}
		</div>
		<a
			href="/blog/"
			class="inline-flex items-center gap-2 text-terminal-accent font-mono hover:underline mt-4"
		>
			<span>Alle Beiträge anzeigen</span>
			<span class="text-terminal-accent">→</span>
		</a>
	</section>

	<!-- Contact Section -->
	<section>
		<h2 class="section-title">
			<span class="text-white">Kontakt</span>
		</h2>
		<div class="terminal-window">
			<div class="terminal-body">
				<div class="flex items-center gap-2 mb-4">
					<span class="prompt-symbol">$</span>
					<span class="text-terminal-textDim">echo "Lass uns zusammenarbeiten"</span>
				</div>
				<p class="mb-4 text-terminal-text">
					Ich bin immer interessiert an neuen Projekten und Möglichkeiten.
				</p>
				<a
					href="mailto:hallo@marco-kretz.de"
					class="inline-flex items-center gap-2 text-terminal-accent font-mono hover:underline"
				>
					<span>hallo@marco-kretz.de</span>
				</a>
			</div>
		</div>
	</section>
</div>

<style>
	.hero-title {
		text-shadow: 0 0 20px rgba(210, 153, 34, 0.2);
	}
</style>
