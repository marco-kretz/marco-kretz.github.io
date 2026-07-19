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
		type: 'aboutfetch' | 'help' | 'skills' | 'contact' | 'text';
		data?: string;
		note?: string;
	};

	type HelpSection = {
		category: 'site' | 'blog' | 'contact' | 'meta';
		commands: Array<{ name: string; description: string }>;
	};

	let history = $state<TerminalEntry[]>([{ command: 'aboutfetch', type: 'aboutfetch' }]);
	let currentInput = $state('');
	let inputEl = $state<HTMLInputElement | null>(null);
	let terminalEl = $state<HTMLDivElement | null>(null);
	let commandHistory = $state<string[]>([]);
	let historyIndex = $state(-1);
	let tabSeed = $state('');
	let tabCandidates = $state<string[]>([]);
	let tabIndex = $state(0);

	const commandAliases: Record<string, string> = {
		about: 'aboutfetch',
		stack: 'skills',
		mail: 'contact',
		'?': 'help',
		ll: 'ls',
		cls: 'clear'
	};

	const internalNavigation: Record<string, string> = {
		blog: '/blog/',
		impressum: '/impressum/',
		datenschutz: '/datenschutz/',
		rss: '/rss.xml',
		sitemap: '/sitemap.xml',
		home: '/'
	};

	const cdNavigation: Record<string, string> = {
		blog: '/blog/',
		impressum: '/impressum/',
		datenschutz: '/datenschutz/',
		'~': '/',
		'/': '/',
		'..': '/',
		'.': '/',
		home: '/',
		'': '/'
	};

	const externalOpenTargets: Record<string, string> = {
		github: 'https://github.com/marco-kretz',
		codebites: 'https://codebites.de/',
		email: 'mailto:hallo@marco-kretz.de'
	};

	const servicesOutput = `Leistungen:
- Backend-Entwicklung (PHP, Symfony, WordPress, Shopware)
- Frontend-Entwicklung (Svelte, Vue.js, Tailwind CSS)
- API-Design und Integrationen
- Technische Beratung und Code Reviews`;

	const availabilityOutput = `Verfuegbarkeit:
- Aktuell offen fuer neue Projekte
- Startzeitpunkt nach Absprache
- Kontakt: hallo@marco-kretz.de`;

	const cvOutput = `CV:
- Lebenslauf als PDF auf Anfrage
- Schreib mir an hallo@marco-kretz.de`;

	const helpSections: HelpSection[] = [
		{
			category: 'site',
			commands: [
				{ name: 'about | aboutfetch', description: 'profil anzeigen' },
				{ name: 'stack | skills', description: 'tech stack anzeigen' },
				{ name: 'services', description: 'angebotene leistungen' },
				{ name: 'availability', description: 'aktuelle verfuegbarkeit' },
				{ name: 'cv', description: 'hinweis zum lebenslauf' }
			]
		},
		{
			category: 'blog',
			commands: [
				{ name: 'blog', description: 'zur blog-uebersicht wechseln' },
				{ name: 'blog <slug>', description: 'direkt zum beitrag wechseln' },
				{ name: 'impressum | datenschutz', description: 'rechtliche seiten oeffnen' },
				{ name: 'rss | sitemap', description: 'feeds und index oeffnen' }
			]
		},
		{
			category: 'contact',
			commands: [
				{ name: 'contact', description: 'kontaktblock anzeigen' },
				{ name: 'open github|codebites|email', description: 'externe links oeffnen' }
			]
		},
		{
			category: 'meta',
			commands: [
				{ name: 'ls | cat <topic>', description: 'inhalte als dateisystem anzeigen' },
				{ name: 'cd <dir>', description: 'interne navigation' },
				{ name: 'whoami, pwd, date, echo', description: 'shell utilities' },
				{ name: 'clear, Ctrl+L, exit', description: 'terminal steuerung' }
			]
		}
	];

	const commandNames = [
		'aboutfetch',
		'about',
		'availability',
		'blog',
		'cat',
		'cd',
		'clear',
		'contact',
		'cv',
		'datenschutz',
		'date',
		'echo',
		'exit',
		'help',
		'impressum',
		'ls',
		'open',
		'pwd',
		'rss',
		'services',
		'sitemap',
		'skills',
		'stack',
		'sudo',
		'uname',
		'whoami'
	];

	const autocompletePool = Array.from(new Set([...commandNames, ...Object.keys(commandAliases)]));
	const suggestionPool = autocompletePool.filter((candidate) => candidate !== '?');

	function resolveExactCommand(cmd: string): string {
		return commandAliases[cmd] ?? cmd;
	}

	function resetTabCompletion() {
		tabSeed = '';
		tabCandidates = [];
		tabIndex = 0;
	}

	function commandAcceptsArgs(cmd: string): boolean {
		return ['blog', 'cd', 'open', 'cat', 'echo'].includes(cmd);
	}

	function getArgumentCandidates(cmd: string): string[] {
		switch (cmd) {
			case 'blog':
				return recentPosts.map((post) => post.slug);
			case 'cd':
				return Object.keys(cdNavigation).filter((target) => target !== '');
			case 'open':
				return [...Object.keys(externalOpenTargets), ...Object.keys(internalNavigation)];
			case 'cat':
				return ['about', 'stack', 'skills', 'services', 'availability', 'cv', 'contact'];
			default:
				return [];
		}
	}

	function getCompletions(input: string): string[] {
		const value = input.trimStart().toLowerCase();
		if (!value) return [];

		const endsWithWhitespace = /\s$/.test(input);
		const tokens = value.split(/\s+/);
		const firstToken = tokens[0];

		if (tokens.length === 1 && !endsWithWhitespace) {
			const prefixMatches = autocompletePool.filter((name) => name.startsWith(firstToken));
			const containsMatches = autocompletePool.filter(
				(name) => !name.startsWith(firstToken) && name.includes(firstToken)
			);
			return [...prefixMatches, ...containsMatches];
		}

		const canonical = resolveExactCommand(firstToken);
		const argCandidates = getArgumentCandidates(canonical);
		if (argCandidates.length === 0) return [];

		const partialArg = endsWithWhitespace ? '' : tokens.slice(1).join(' ');
		return argCandidates
			.filter((candidate) => candidate.startsWith(partialArg))
			.map((candidate) => `${firstToken} ${candidate}`.trim());
	}

	function levenshteinDistance(a: string, b: string): number {
		if (a === b) return 0;
		if (!a.length) return b.length;
		if (!b.length) return a.length;

		const matrix = Array.from({ length: a.length + 1 }, (_, row) =>
			Array.from({ length: b.length + 1 }, (_, col) => {
				if (row === 0) return col;
				if (col === 0) return row;
				return 0;
			})
		);

		for (let i = 1; i <= a.length; i++) {
			for (let j = 1; j <= b.length; j++) {
				const cost = a[i - 1] === b[j - 1] ? 0 : 1;
				matrix[i][j] = Math.min(
					matrix[i - 1][j] + 1,
					matrix[i][j - 1] + 1,
					matrix[i - 1][j - 1] + cost
				);
			}
		}

		return matrix[a.length][b.length];
	}

	function getCommandSuggestions(input: string, limit = 3): string[] {
		return suggestionPool
			.map((candidate) => ({
				candidate,
				distance: levenshteinDistance(input, candidate)
			}))
			.sort((a, b) => a.distance - b.distance || a.candidate.localeCompare(b.candidate))
			.slice(0, limit)
			.map((item) => item.candidate);
	}

	function findFuzzyMatch(input: string): string | null {
		const [best] = suggestionPool
			.map((candidate) => ({
				candidate,
				distance: levenshteinDistance(input, candidate)
			}))
			.sort((a, b) => a.distance - b.distance || a.candidate.localeCompare(b.candidate));

		if (!best) return null;
		const maxDistance = Math.max(1, Math.floor(input.length / 3) + 1);
		return best.distance <= maxDistance ? best.candidate : null;
	}

	function resolveBlogSlug(input: string): string {
		const normalized = input.trim().toLowerCase();
		if (!normalized) return '';

		const slugMatch = recentPosts.find((post) => post.slug.toLowerCase() === normalized);
		if (slugMatch) return slugMatch.slug;

		const titleMatch = recentPosts.find((post) => post.title.toLowerCase() === normalized);
		if (titleMatch) return titleMatch.slug;

		const slugLike = normalized
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9-]/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '');

		const partialMatch = recentPosts.find((post) => post.slug.toLowerCase().startsWith(slugLike));
		return partialMatch?.slug ?? slugLike;
	}

	function navigateInternal(path: string) {
		void goto(path);
	}

	function openExternal(targetUrl: string) {
		window.open(targetUrl, '_blank', 'noopener,noreferrer');
	}

	function textEntry(command: string, data: string, note?: string): TerminalEntry {
		return { command, type: 'text', data, note };
	}

	function executeCommand(input: string): TerminalEntry | null {
		const trimmed = input.trim();
		if (!trimmed) return null;

		const [rawCmd = '', ...rest] = trimmed.split(/\s+/);
		const originalCmd = rawCmd.toLowerCase();
		const args = rest.join(' ').trim();
		let cmd = resolveExactCommand(originalCmd);
		let note: string | undefined;

		if (!autocompletePool.includes(originalCmd)) {
			const fuzzyMatch = findFuzzyMatch(originalCmd);
			if (fuzzyMatch) {
				cmd = resolveExactCommand(fuzzyMatch);
				note = `auto-corrected '${originalCmd}' -> '${fuzzyMatch}'`;
			}
		}

		switch (cmd) {
			case 'help':
				return { command: trimmed, type: 'help', note };
			case 'aboutfetch':
				return { command: trimmed, type: 'aboutfetch', note };
			case 'skills':
				return { command: trimmed, type: 'skills', note };
			case 'contact':
				return { command: trimmed, type: 'contact', note };
			case 'services':
				return textEntry(trimmed, servicesOutput, note);
			case 'availability':
				return textEntry(trimmed, availabilityOutput, note);
			case 'cv':
				return textEntry(trimmed, cvOutput, note);
			case 'blog':
				if (!args) {
					navigateInternal('/blog/');
					return textEntry(trimmed, 'Opening /blog/', note);
				}
				{
					const slug = resolveBlogSlug(args);
					if (!slug) return textEntry(trimmed, 'usage: blog <slug>', note);
					const target = `/blog/${slug}/`;
					navigateInternal(target);
					return textEntry(trimmed, `Opening ${target}`, note);
				}
			case 'impressum':
			case 'datenschutz':
			case 'rss':
			case 'sitemap': {
				const targetPath = internalNavigation[cmd];
				navigateInternal(targetPath);
				return textEntry(trimmed, `Opening ${targetPath}`, note);
			}
			case 'whoami':
				return textEntry(trimmed, 'marco@web', note);
			case 'ls':
				return textEntry(
					trimmed,
					'about/  services/  blog/  contact/  impressum/  datenschutz/  rss.xml  sitemap.xml',
					note
				);
			case 'cd': {
				const target = args.toLowerCase().replace(/\/$/, '');
				if (target.startsWith('blog/')) {
					const blogPath = `/${target}/`;
					navigateInternal(blogPath);
					return textEntry(trimmed, `Opening ${blogPath}`, note);
				}

				if (target in cdNavigation) {
					const resolvedPath = cdNavigation[target];
					navigateInternal(resolvedPath);
					return textEntry(trimmed, resolvedPath ? `Opening ${resolvedPath}` : '', note);
				}
				return textEntry(trimmed, `bash: cd: ${args}: No such file or directory`, note);
			}
			case 'pwd':
				return textEntry(trimmed, '/home/marco', note);
			case 'echo':
				return textEntry(trimmed, args, note);
			case 'date':
				return textEntry(
					trimmed,
					new Date().toLocaleString('de-DE', {
						weekday: 'short',
						year: 'numeric',
						month: 'short',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit'
					}),
					note
				);
			case 'uname':
				return textEntry(
					trimmed,
					'Linux marco-web 6.18.7-zen1-1-zen #1 SMP x86_64 GNU/Linux',
					note
				);
			case 'sudo':
				return textEntry(trimmed, 'Nice try.', note);
			case 'rm':
				return textEntry(trimmed, 'rm: permission denied. This is not your terminal.', note);
			case 'vim':
			case 'nvim':
			case 'nano':
				return textEntry(
					trimmed,
					cmd === 'vim'
						? "You're now stuck in vim. Just kidding. Type 'help' for commands."
						: `${cmd}: not installed. Try 'help' instead.`,
					note
				);
			case 'exit':
				return textEntry(trimmed, 'logout\nConnection to marco-kretz.de closed.', note);
			case 'open': {
				const openTarget = args.toLowerCase();
				if (!openTarget) return textEntry(trimmed, 'usage: open <target>', note);

				if (openTarget in externalOpenTargets) {
					openExternal(externalOpenTargets[openTarget]);
					return textEntry(trimmed, `Opening ${openTarget} in a new tab`, note);
				}
				if (openTarget in internalNavigation) {
					const targetPath = internalNavigation[openTarget];
					navigateInternal(targetPath);
					return textEntry(trimmed, `Opening ${targetPath}`, note);
				}
				return textEntry(
					trimmed,
					`open: unknown target '${args}'. try: ${Object.keys(externalOpenTargets).join(', ')}`,
					note
				);
			}
			case 'cat':
				if (!args) return textEntry(trimmed, 'usage: cat [file]', note);
				{
					const catTarget = args.toLowerCase();
					if (catTarget === 'about') return { command: trimmed, type: 'aboutfetch', note };
					if (catTarget === 'stack' || catTarget === 'skills')
						return { command: trimmed, type: 'skills', note };
					if (catTarget === 'contact') return { command: trimmed, type: 'contact', note };
					if (catTarget === 'services') return textEntry(trimmed, servicesOutput, note);
					if (catTarget === 'availability') return textEntry(trimmed, availabilityOutput, note);
					if (catTarget === 'cv') return textEntry(trimmed, cvOutput, note);
					if (catTarget === '/etc/passwd')
						return textEntry(trimmed, 'Nice try.', note);
				}
				return textEntry(trimmed, `cat: ${args}: No such file or directory`, note);
			default: {
				const suggestions = getCommandSuggestions(originalCmd);
				const suggestionHint =
					suggestions.length > 0 ? ` Did you mean: ${suggestions.join(', ')}?` : '';
				return textEntry(
					trimmed,
					`bash: ${originalCmd}: command not found. Type 'help' for available commands.${suggestionHint}`
				);
			}
		}
	}

	function isClearCommand(input: string): boolean {
		const [rawCmd = ''] = input.trim().toLowerCase().split(/\s+/);
		return resolveExactCommand(rawCmd) === 'clear';
	}

	function handleTabCompletion() {
		if (!currentInput.trim()) return;

		if (tabSeed !== currentInput) {
			tabSeed = currentInput;
			tabCandidates = getCompletions(currentInput);
			tabIndex = 0;
		} else if (tabCandidates.length > 1) {
			tabIndex = (tabIndex + 1) % tabCandidates.length;
		}

		if (tabCandidates.length === 0) return;

		const completion = tabCandidates[tabIndex];
		const canonical = resolveExactCommand(completion.trim().toLowerCase());
		const needsTrailingSpace = !completion.includes(' ') && commandAcceptsArgs(canonical);
		currentInput = needsTrailingSpace ? `${completion} ` : completion;
	}

	async function handleSubmit() {
		const trimmed = currentInput.trim();
		if (trimmed) {
			commandHistory = [...commandHistory, trimmed];
		}
		historyIndex = -1;
		resetTabCompletion();

		if (isClearCommand(trimmed)) {
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
			e.preventDefault();
			handleSubmit();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			resetTabCompletion();
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
			resetTabCompletion();
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
			handleTabCompletion();
		} else if (e.key === 'l' && e.ctrlKey) {
			e.preventDefault();
			history = [];
		} else {
			resetTabCompletion();
		}
	}

	function focusInput() {
		inputEl?.focus();
	}

	const asciiArt = ` ███╗   ███╗██╗  ██╗
 ████╗ ████║██║ ██╔╝
 ██╔████╔██║█████╔╝
 ██║╚██╔╝██║██╔═██╗
 ██║ ╚═╝ ██║██║  ██╗
 ╚═╝     ╚═╝╚═╝  ╚═╝
   < developer />`;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="pipboy-terminal terminal-window mb-8" onclick={focusInput}>
	<div class="pipboy-screen">
		<div class="pipboy-glass" aria-hidden="true"></div>
		<div class="pipboy-scanlines" aria-hidden="true"></div>
		<div class="pipboy-sweep" aria-hidden="true"></div>

		<div bind:this={terminalEl} class="terminal-body pipboy-body overflow-y-auto h-[450px]">
			{#each history as entry}
				<!-- Command prompt -->
				<div class="flex items-center gap-2 mb-1">
					<span class="prompt-symbol">$</span>
					<span class="text-terminal-textDim">{entry.command}</span>
				</div>
				{#if entry.note}
					<div class="text-terminal-textDim text-xs font-mono mb-1">{entry.note}</div>
				{/if}

				<!-- Output -->
				{#if entry.type === 'aboutfetch'}
					<div class="grid md:grid-cols-[auto_1fr] gap-x-8 gap-y-0 mb-4">
						<div class="company-logo hidden md:flex self-center" aria-hidden="true">
							<pre class="company-logo-mark whitespace-pre">{asciiArt}</pre>
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
						<div class="text-terminal-accent mb-3">Command tree:</div>
						<div class="grid md:grid-cols-2 gap-4">
							{#each helpSections as section}
								<div>
									<div class="text-terminal-accent font-semibold mb-1"># {section.category}</div>
									{#each section.commands as helpCommand}
										<div class="leading-relaxed">
											<span class="text-terminal-accent">$</span>
											<span class="text-terminal-text"> {helpCommand.name}</span>
											<span class="text-terminal-textDim"> - {helpCommand.description}</span>
										</div>
									{/each}
								</div>
							{/each}
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
</div>

<style>
	.pipboy-terminal {
		--pip-green: 56, 180, 96;
		position: relative;
		border-color: rgba(var(--pip-green), 0.28);
		background: #0c1210;
		box-shadow:
			0 0 0 1px rgba(var(--pip-green), 0.08),
			0 14px 36px rgba(0, 0, 0, 0.5),
			0 0 24px rgba(var(--pip-green), 0.08),
			inset 0 0 0 1px rgba(var(--pip-green), 0.04);
	}

	.pipboy-screen {
		position: relative;
		border-radius: inherit;
		overflow: hidden;
		isolation: isolate;
	}

	.pipboy-body {
		position: relative;
		z-index: 1;
		color: #c4cfc6;
		text-shadow: 0 0 6px rgba(var(--pip-green), 0.08);
	}

	.pipboy-body :global(.text-terminal-text) {
		color: #c4cfc6;
	}

	.pipboy-body :global(.text-terminal-textDim) {
		color: #8b948c;
	}

	.pipboy-body :global(.text-terminal-accent),
	.pipboy-body :global(.prompt-symbol) {
		/* Keep brand gold, with a faint phosphor halo */
		color: #c9b86a;
		text-shadow: 0 0 8px rgba(var(--pip-green), 0.18);
	}

	.pipboy-body :global(.border-terminal-border) {
		border-color: rgba(var(--pip-green), 0.16);
	}

	.pipboy-glass {
		pointer-events: none;
		position: absolute;
		inset: 0;
		z-index: 2;
		background:
			radial-gradient(ellipse 115% 95% at 50% 38%, rgba(var(--pip-green), 0.055) 0%, transparent 58%),
			radial-gradient(ellipse at center, transparent 48%, rgba(0, 0, 0, 0.38) 100%);
		box-shadow:
			inset 0 0 40px rgba(0, 0, 0, 0.5),
			inset 0 0 80px rgba(var(--pip-green), 0.04);
	}

	.pipboy-scanlines {
		pointer-events: none;
		position: absolute;
		inset: 0;
		z-index: 3;
		opacity: 0.45;
		background: repeating-linear-gradient(
			to bottom,
			transparent 0,
			transparent 2px,
			rgba(0, 0, 0, 0.22) 2px,
			rgba(0, 0, 0, 0.22) 3px
		);
	}

	.pipboy-sweep {
		pointer-events: none;
		position: absolute;
		left: 0;
		right: 0;
		top: -28%;
		height: 24%;
		z-index: 4;
		background: linear-gradient(
			to bottom,
			transparent 0%,
			rgba(var(--pip-green), 0.04) 40%,
			rgba(var(--pip-green), 0.12) 50%,
			rgba(var(--pip-green), 0.04) 60%,
			transparent 100%
		);
		animation: pipboy-sweep 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	@keyframes pipboy-sweep {
		0%,
		68%,
		100% {
			transform: translateY(0);
			opacity: 0;
		}
		72% {
			opacity: 1;
		}
		90% {
			transform: translateY(480%);
			opacity: 0.5;
		}
		94%,
		100% {
			transform: translateY(480%);
			opacity: 0;
		}
	}

	/* Fallout-style company mark: same ASCII, static emblem */
	.company-logo {
		align-items: center;
		justify-content: center;
		padding: 0.85rem 1rem 0.7rem;
		border: 1px solid rgba(var(--pip-green), 0.28);
		border-radius: 0.35rem;
		background:
			radial-gradient(ellipse at 50% 40%, rgba(var(--pip-green), 0.08) 0%, transparent 70%),
			rgba(8, 14, 10, 0.55);
		box-shadow:
			inset 0 0 0 1px rgba(201, 184, 106, 0.12),
			inset 0 0 18px rgba(0, 0, 0, 0.35),
			0 0 14px rgba(var(--pip-green), 0.08);
	}

	.company-logo-mark {
		margin: 0;
		font-family: ui-monospace, 'JetBrains Mono', monospace;
		font-size: 0.95rem;
		line-height: 1.05;
		letter-spacing: 0.02em;
		color: #c9b86a;
		text-align: left;
		text-shadow:
			0 0 6px rgba(var(--pip-green), 0.25),
			0 0 1px rgba(201, 184, 106, 0.5);
		animation: logo-phosphor 5.5s ease-in-out infinite;
	}

	@keyframes logo-phosphor {
		0%,
		100% {
			opacity: 0.88;
			filter: drop-shadow(0 0 2px rgba(56, 180, 96, 0.15));
		}
		50% {
			opacity: 1;
			filter: drop-shadow(0 0 6px rgba(56, 180, 96, 0.3));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.company-logo-mark,
		.pipboy-sweep {
			animation: none;
		}

		.company-logo-mark {
			opacity: 1;
			filter: none;
		}

		.pipboy-sweep {
			display: none;
		}
	}

	input::placeholder {
		color: rgba(139, 148, 140, 0.45);
	}
</style>
