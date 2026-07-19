<script lang="ts">
	import '../app.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/500.css';
	import '@fontsource/jetbrains-mono/600.css';
	import '@fontsource/jetbrains-mono/700.css';
	import '@fontsource/ibm-plex-sans/400.css';
	import '@fontsource/ibm-plex-sans/500.css';
	import '@fontsource/ibm-plex-sans/600.css';
	import '@fontsource/ibm-plex-sans/700.css';
	import '@fontsource/space-grotesk/400.css';
	import '@fontsource/space-grotesk/500.css';
	import '@fontsource/space-grotesk/600.css';
	import '@fontsource/space-grotesk/700.css';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { children } = $props();

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/blog/', label: 'Blog' }
	];

	let showBackToTop = $state(false);

	onMount(() => {
		function toggleBackToTop() {
			showBackToTop = window.scrollY > 300;
		}
		window.addEventListener('scroll', toggleBackToTop, { passive: true });
		toggleBackToTop();
		return () => window.removeEventListener('scroll', toggleBackToTop);
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}
</script>

<div class="min-h-screen flex flex-col">
	<!-- Header -->
	<header class="border-b border-terminal-border bg-terminal-bg/85 backdrop-blur-sm sticky top-0 z-50">
		<nav class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
			<a
				href="/"
				class="glitch font-display font-bold text-lg tracking-tight hover:text-terminal-accent transition-colors"
				data-text="<MK/>"
			>
				<span class="text-terminal-accent">&lt;</span>MK<span class="text-terminal-accent">/&gt;</span>
			</a>
			<ul class="flex items-center gap-6 font-display text-sm tracking-tight">
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							class="hover:text-terminal-accent transition-colors {isActive(link.href, $page.url.pathname)
								? 'text-terminal-accent'
								: 'text-terminal-text'}"
						>
							{link.label}
						</a>
					</li>
				{/each}
				<li>
					<a
						href="https://github.com/marco-kretz"
						target="_blank"
						rel="noopener noreferrer"
						class="text-terminal-text hover:text-terminal-accent transition-colors"
						aria-label="GitHub"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</li>
			</ul>
		</nav>
	</header>

	<!-- Main Content -->
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-terminal-border mt-auto">
		<div class="max-w-4xl mx-auto px-4 py-8">
			<div
				class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-terminal-textDim font-mono"
			>
				<p>&copy; {new Date().getFullYear()} Marco Kretz</p>
				<div class="flex items-center gap-4">
					<a href="/impressum/" class="hover:text-terminal-accent transition-colors">Impressum</a>
					<span class="text-terminal-border">|</span>
					<a href="/datenschutz/" class="hover:text-terminal-accent transition-colors">Datenschutz</a>
				</div>
			</div>
		</div>
	</footer>
</div>

<!-- Back to Top Button -->
<button
	onclick={scrollToTop}
	class="fixed bottom-6 right-6 z-50 p-3 bg-terminal-surface border border-terminal-border rounded-lg text-terminal-textDim hover:text-terminal-accent hover:border-terminal-accent transition-all duration-200 {showBackToTop
		? 'opacity-100 visible translate-y-0'
		: 'opacity-0 invisible translate-y-4'}"
	aria-label="Zurück nach oben"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="w-5 h-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
	</svg>
</button>
