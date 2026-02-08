<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';

	interface Props {
		recentPosts: Array<{
			slug: string;
			title: string;
			description: string;
			pubDate: Date;
			readTime?: string;
		}>;
		skills: Array<{ category: string; items: string[] }>;
	}

	const { recentPosts, skills }: Props = $props();

	type TerminalEntry = {
		command: string;
		type: 'aboutfetch' | 'help' | 'skills' | 'blog' | 'contact' | 'text';
		data?: string;
	};

	let history = $state<TerminalEntry[]>([{ command: 'aboutfetch', type: 'aboutfetch' }]);
	let currentInput = $state('');
	let inputEl = $state<HTMLInputElement | null>(null);
	let terminalEl = $state<HTMLDivElement | null>(null);
	let commandHistory = $state<string[]>([]);
	let historyIndex = $state(-1);

	const commandNames = [
		'aboutfetch',
		'blog',
		'cat',
		'cd',
		'clear',
		'contact',
		'date',
		'echo',
		'exit',
		'help',
		'ls',
		'pwd',
		'skills',
		'sudo',
		'uname',
		'whoami'
	];

	function executeCommand(input: string): TerminalEntry | null {
		const trimmed = input.trim();
		if (!trimmed) return null;

		const [cmd, ...rest] = trimmed.split(/\s+/);
		const args = rest.join(' ');

		switch (cmd) {
			case 'help':
				return { command: trimmed, type: 'help' };
			case 'aboutfetch':
				return { command: trimmed, type: 'aboutfetch' };
			case 'skills':
				return { command: trimmed, type: 'skills' };
			case 'blog':
				return { command: trimmed, type: 'blog' };
			case 'contact':
				return { command: trimmed, type: 'contact' };
			case 'whoami':
				return { command: trimmed, type: 'text', data: 'marco@web' };
			case 'ls':
				return {
					command: trimmed,
					type: 'text',
					data: 'about/  blog/  skills/  contact/  impressum/  datenschutz/'
				};
			case 'cd': {
				const target = args.replace(/\/$/, '');
				const routes: Record<string, string> = {
					blog: '/blog/',
					impressum: '/impressum/',
					datenschutz: '/datenschutz/',
					'~': '/',
					'': '/'
				};
				if (target in routes) {
					goto(routes[target]);
					return { command: trimmed, type: 'text', data: '' };
				}
				return {
					command: trimmed,
					type: 'text',
					data: `bash: cd: ${args}: No such file or directory`
				};
			}
			case 'pwd':
				return { command: trimmed, type: 'text', data: '/home/marco' };
			case 'echo':
				return { command: trimmed, type: 'text', data: args };
			case 'date':
				return {
					command: trimmed,
					type: 'text',
					data: new Date().toLocaleString('de-DE', {
						weekday: 'short',
						year: 'numeric',
						month: 'short',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit'
					})
				};
			case 'uname':
				return {
					command: trimmed,
					type: 'text',
					data: 'Linux marco-web 6.18.7-zen1-1-zen #1 SMP x86_64 GNU/Linux'
				};
			case 'sudo':
				return { command: trimmed, type: 'text', data: 'Nice try.' };
			case 'rm':
				return {
					command: trimmed,
					type: 'text',
					data: 'rm: permission denied. This is not your terminal.'
				};
			case 'vim':
			case 'nvim':
			case 'nano':
				return {
					command: trimmed,
					type: 'text',
					data:
						cmd === 'vim'
							? "You're now stuck in vim. Just kidding. Type 'help' for commands."
							: `${cmd}: not installed. Try 'help' instead.`
				};
			case 'exit':
				return {
					command: trimmed,
					type: 'text',
					data: 'logout\nConnection to marco-kretz.de closed.'
				};
			case 'cat':
				if (!args) return { command: trimmed, type: 'text', data: 'usage: cat [file]' };
				if (args === '/etc/passwd')
					return { command: trimmed, type: 'text', data: 'Nice try.' };
				return {
					command: trimmed,
					type: 'text',
					data: `cat: ${args}: No such file or directory`
				};
			default:
				return {
					command: trimmed,
					type: 'text',
					data: `bash: ${cmd}: command not found. Type 'help' for available commands.`
				};
		}
	}

	async function handleSubmit() {
		const trimmed = currentInput.trim();
		if (trimmed) {
			commandHistory = [...commandHistory, trimmed];
		}
		historyIndex = -1;

		if (trimmed === 'clear') {
			history = [];
			currentInput = '';
			return;
		}

		const entry = executeCommand(currentInput);
		if (entry) {
			history = [...history, entry];
		}
		currentInput = '';

		await tick();
		terminalEl?.scrollTo({ top: terminalEl.scrollHeight, behavior: 'smooth' });
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleSubmit();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (commandHistory.length > 0) {
				if (historyIndex === -1) {
					historyIndex = commandHistory.length - 1;
				} else if (historyIndex > 0) {
					historyIndex--;
				}
				currentInput = commandHistory[historyIndex];
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyIndex >= 0) {
				if (historyIndex < commandHistory.length - 1) {
					historyIndex++;
					currentInput = commandHistory[historyIndex];
				} else {
					historyIndex = -1;
					currentInput = '';
				}
			}
		} else if (e.key === 'Tab') {
			e.preventDefault();
			const partial = currentInput.trim().toLowerCase();
			if (partial) {
				const matches = commandNames.filter((c) => c.startsWith(partial));
				if (matches.length === 1) {
					currentInput = matches[0];
				}
			}
		} else if (e.key === 'l' && e.ctrlKey) {
			e.preventDefault();
			history = [];
		}
	}

	function focusInput() {
		inputEl?.focus();
	}

	const asciiArt = `                   -\`
                    .o+\`
                   \`ooo/
                  \`+oooo:
                 \`+oooooo:
                 -+oooooo+:
               \`/:-:++oooo+:
              \`/++++/+++++++:
             \`/++++++++++++++:
            \`/+++ooooooooooooo/\`
           ./ooosssso++osssssso+\`
          .oossssso-\`\`\`\`/ossssss+\`
         -osssssso.      :ssssssso.
        :osssssss/        osssso+++.
       /ossssssss/        +ssssooo/-
     \`/ossssso+/:-        -:/+osssso+-
    \`+sso+:-\`                 \`.-/+oso:
   \`++:.                           \`-/+/
   .\`                                 \``;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="terminal-window mb-8" onclick={focusInput}>
	<div bind:this={terminalEl} class="terminal-body overflow-y-auto h-[450px]">
		{#each history as entry}
			<!-- Command prompt -->
			<div class="flex items-center gap-2 mb-1">
				<span class="prompt-symbol">$</span>
				<span class="text-terminal-textDim">{entry.command}</span>
			</div>

			<!-- Output -->
			{#if entry.type === 'aboutfetch'}
				<div class="grid md:grid-cols-[auto_1fr] gap-x-8 gap-y-0 mb-4">
					<div
						class="font-mono text-terminal-accent leading-tight text-sm hidden md:block perspective-container"
					>
						<pre class="whitespace-pre rotate-y">{asciiArt}</pre>
					</div>
					<div class="font-mono text-sm space-y-1">
						<div class="text-terminal-accent font-bold mb-2">marco@web</div>
						<div class="border-t border-terminal-border mb-2"></div>
						<div>
							<span class="text-terminal-accent font-semibold">Rolle:</span>
							<span class="text-terminal-text">Webentwickler</span>
						</div>
						<div>
							<span class="text-terminal-accent font-semibold">Standort:</span>
							<span class="text-terminal-text">Deutschland</span>
						</div>
						<div>
							<span class="text-terminal-accent font-semibold">Kernel:</span>
							<span class="text-terminal-text">cologne-12.89-de</span>
						</div>
						<div>
							<span class="text-terminal-accent font-semibold">Erfahrung:</span>
							<span class="text-terminal-text">~20 Jahre</span>
						</div>
						<div>
							<span class="text-terminal-accent font-semibold">Kernkompetenzen:</span>
							<span class="text-terminal-text">PHP (Symfony, WordPress), JS (Vue.js, Svelte)</span>
						</div>
						<div>
							<span class="text-terminal-accent font-semibold">Shell:</span>
							<span class="text-terminal-text">zsh</span>
						</div>
						<div>
							<span class="text-terminal-accent font-semibold">Editor:</span>
							<span class="text-terminal-text">VS Code, Neovim</span>
						</div>
						<div>
							<span class="text-terminal-accent font-semibold">Terminal:</span>
							<span class="text-terminal-text">Ghostty</span>
						</div>
						<div>
							<span class="text-terminal-accent font-semibold">AI-Tools:</span>
							<span class="text-terminal-text">Claude Code, OpenCode</span>
						</div>
						<div class="mt-3 flex gap-2">
							<span class="inline-block w-8 h-4 bg-[#0d1117]" title="black"></span>
							<span class="inline-block w-8 h-4 bg-[#da3633]" title="red"></span>
							<span class="inline-block w-8 h-4 bg-[#238636]" title="green"></span>
							<span class="inline-block w-8 h-4 bg-[#d29922]" title="yellow"></span>
							<span class="inline-block w-8 h-4 bg-[#58a6ff]" title="blue"></span>
							<span class="inline-block w-8 h-4 bg-[#bc8cff]" title="magenta"></span>
							<span class="inline-block w-8 h-4 bg-[#39c5cf]" title="cyan"></span>
							<span class="inline-block w-8 h-4 bg-[#c9d1d9]" title="white"></span>
						</div>
					</div>
				</div>
			{:else if entry.type === 'help'}
				<div class="mb-4 font-mono text-sm">
					<div class="text-terminal-accent mb-2">Available commands:</div>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1">
						<div>
							<span class="text-terminal-accent">aboutfetch</span>
							<span class="text-terminal-textDim">- system info</span>
						</div>
						<div>
							<span class="text-terminal-accent">skills</span>
							<span class="text-terminal-textDim">- tech stack</span>
						</div>
						<div>
							<span class="text-terminal-accent">blog</span>
							<span class="text-terminal-textDim">- recent posts</span>
						</div>
						<div>
							<span class="text-terminal-accent">contact</span>
							<span class="text-terminal-textDim">- get in touch</span>
						</div>
						<div>
							<span class="text-terminal-accent">whoami</span>
							<span class="text-terminal-textDim">- current user</span>
						</div>
						<div>
							<span class="text-terminal-accent">ls</span>
							<span class="text-terminal-textDim">- list sections</span>
						</div>
						<div>
							<span class="text-terminal-accent">cd &lt;dir&gt;</span>
							<span class="text-terminal-textDim">- navigate</span>
						</div>
						<div>
							<span class="text-terminal-accent">echo &lt;text&gt;</span>
							<span class="text-terminal-textDim">- echo text</span>
						</div>
						<div>
							<span class="text-terminal-accent">date</span>
							<span class="text-terminal-textDim">- current date</span>
						</div>
						<div>
							<span class="text-terminal-accent">clear</span>
							<span class="text-terminal-textDim">- clear screen</span>
						</div>
					</div>
					<div class="text-terminal-textDim mt-2">
						Tip: Use <span class="text-terminal-text">↑↓</span> for history,
						<span class="text-terminal-text">Tab</span> for autocomplete
					</div>
				</div>
			{:else if entry.type === 'skills'}
				<div class="grid md:grid-cols-3 gap-4 mb-4">
					{#each skills as cat}
						<div>
							<div class="text-terminal-accent font-semibold mb-1"># {cat.category}</div>
							{#each cat.items as item}
								<div class="text-terminal-text">
									<span class="text-terminal-accent">→</span>
									{item}
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{:else if entry.type === 'blog'}
				<div class="mb-4">
					{#if recentPosts.length > 0}
						{#each recentPosts as post}
							<div class="mb-2">
								<a
									href="/blog/{post.slug}/"
									class="text-terminal-blue hover:text-terminal-accent hover:underline"
								>
									{post.title}
								</a>
								<span class="text-terminal-textDim text-sm ml-2">
									({post.pubDate.toLocaleDateString('de-DE')})
								</span>
							</div>
						{/each}
						<div class="text-terminal-textDim text-sm mt-1">
							Type <span class="text-terminal-accent">'cd blog'</span> to see all posts.
						</div>
					{:else}
						<div class="text-terminal-textDim">No posts found.</div>
					{/if}
				</div>
			{:else if entry.type === 'contact'}
				<div class="mb-4 font-mono text-sm space-y-1">
					<div>
						<span class="text-terminal-accent font-semibold">Email:</span>
						<a
							href="mailto:hallo@marco-kretz.de"
							class="text-terminal-blue hover:underline">hallo@marco-kretz.de</a
						>
					</div>
					<div>
						<span class="text-terminal-accent font-semibold">GitHub:</span>
						<a
							href="https://github.com/marco-kretz"
							target="_blank"
							rel="noopener noreferrer"
							class="text-terminal-blue hover:underline">github.com/marco-kretz</a
						>
					</div>
					<div>
						<span class="text-terminal-accent font-semibold">Web:</span>
						<a
							href="https://codebites.de"
							target="_blank"
							rel="noopener noreferrer"
							class="text-terminal-blue hover:underline">codebites.de</a
						>
					</div>
				</div>
			{:else if entry.type === 'text'}
				{#if entry.data}
					<div class="mb-4 whitespace-pre-wrap">{entry.data}</div>
				{/if}
			{/if}
		{/each}

		<!-- Input line -->
		<div class="flex items-center gap-2">
			<span class="prompt-symbol">$</span>
			<input
				bind:this={inputEl}
				bind:value={currentInput}
				onkeydown={handleKeyDown}
				class="flex-1 bg-transparent border-none outline-none text-terminal-textDim font-mono text-sm caret-terminal-accent"
				type="text"
				spellcheck="false"
				autocomplete="off"
				autocapitalize="off"
				placeholder="type 'help' for commands..."
				aria-label="Terminal command input"
			/>
		</div>
	</div>
</div>

<style>
	.perspective-container {
		perspective: 1000px;
	}

	.rotate-y {
		animation: rotate-y 8s linear infinite;
		transform-style: preserve-3d;
	}

	@keyframes rotate-y {
		from {
			transform: rotateY(0deg);
		}
		to {
			transform: rotateY(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.rotate-y {
			animation: none;
		}
	}

	input::placeholder {
		color: rgba(139, 148, 158, 0.4);
	}
</style>
