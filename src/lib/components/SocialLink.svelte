<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		label: string;
		children: Snippet;
	}

	const { href, label, children }: Props = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-terminal-border rounded-lg hover:border-terminal-accent hover:text-terminal-accent transition-all duration-200 group"
>
	<span class="text-xl">
		{@render children()}
	</span>
	<span class="font-mono text-sm">{label}</span>
</a>
