<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		image?: string;
		url?: string;
	}

	const {
		title = 'Marco Kretz | Webentwickler',
		description = 'Webentwickler aus Deutschland mit fast 20 Jahren Erfahrung. PHP (Symfony/WordPress/Shopware), API-Entwicklung, Backend & Frontend.',
		image,
		url = 'https://marco-kretz.de'
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if image}
		<meta name="twitter:image" content={image} />
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={url} />

	<!-- RSS Feed -->
	<link rel="alternate" type="application/rss+xml" title="Marco Kretz | Blog" href="/rss.xml" />
</svelte:head>
