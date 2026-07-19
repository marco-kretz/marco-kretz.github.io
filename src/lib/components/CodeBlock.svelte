<script lang="ts">
	import type { Snippet } from 'svelte';
	import TerminalWindow from './TerminalWindow.svelte';

	interface Props {
		language?: string;
		title?: string;
		children: Snippet;
	}

	const { language = 'text', title, children }: Props = $props();

	const displayTitle = title || language;

	let copied = $state(false);
	let codeWrapper: HTMLDivElement;

	async function copyCode() {
		const codeElement = codeWrapper?.querySelector('code');
		const codeText = codeElement?.textContent;
		if (!codeText) return;

		try {
			await navigator.clipboard.writeText(codeText);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy code:', err);
		}
	}
</script>

<TerminalWindow title={displayTitle} titleColor="text-terminal-accent">
	<div class="code-wrapper relative" bind:this={codeWrapper}>
		<button
			onclick={copyCode}
			class="copy-button absolute top-4 right-4 p-2 rounded bg-terminal-bg hover:bg-terminal-surface text-terminal-textDim hover:text-terminal-accent transition-colors duration-200 text-xs font-mono border border-terminal-border opacity-0"
			aria-label="Code in die Zwischenablage kopieren"
		>
			{#if copied}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4 text-terminal-green"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
					/>
				</svg>
			{/if}
		</button>
		<div class="code-content overflow-x-auto">
			{@render children()}
		</div>
	</div>
</TerminalWindow>

<style>
	.code-wrapper:hover .copy-button {
		opacity: 1;
	}

	.code-content {
		font-family: ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, Monaco, monospace;
		font-size: 0.875rem;
		line-height: 1.625;
	}
</style>
