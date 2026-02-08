<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		titleColor?: string;
		children: Snippet;
	}

	const { title = 'terminal', titleColor = 'text-terminal-accent', children }: Props = $props();
</script>

<div class="terminal-window">
	<div class="terminal-header">
		<div class="terminal-dots">
			<div class="terminal-dot terminal-dot-red"></div>
			<div class="terminal-dot terminal-dot-yellow"></div>
			<div class="terminal-dot terminal-dot-green"></div>
		</div>
		<div class="ml-4 text-sm text-terminal-textDim font-mono flex-1">
			<span class={titleColor}>{title}</span>
		</div>
	</div>
	<div class="terminal-body">
		{@render children()}
	</div>
</div>
