# AI Agent Guidelines for marco-kretz.de

## Project Overview

Personal business card website with blog. SvelteKit + Tailwind CSS 3.x + TypeScript. Modern terminal-inspired design, professional coder aesthetic.

### Color Palette

```css
Background: #0d1117, Border: #30363d, Text: #c9d1d9, Accent: #d29922
Blue: #58a6ff (links), Green: #238636, Red: #da3633
```

## Tech Stack

- **SvelteKit**: Static site generator with `adapter-static`
- **Svelte 5**: Using runes (`$props()`, `$state()`, `{@render children()}`)
- **Tailwind CSS 3.x**: Utility-first CSS
- **TypeScript**: Strict type checking
- **mdsvex**: Markdown processing with Shiki syntax highlighting
- **lucide-svelte**: Icon components

## Project Structure

```
src/
├── lib/
│   ├── components/    # TerminalWindow, CodeBlock, SocialLink, Seo
│   └── blog.ts        # Blog content system (import.meta.glob + Zod)
├── content/
│   └── blog/          # Blog post markdown files
├── routes/
│   ├── +layout.svelte # Main layout with header/footer
│   ├── +layout.ts     # Prerender + trailing slash config
│   ├── +page.svelte   # Homepage
│   ├── blog/
│   │   ├── +page.svelte        # Blog listing
│   │   └── [slug]/+page.svelte # Blog post
│   ├── impressum/     # Legal pages
│   ├── datenschutz/
│   ├── rss.xml/       # RSS feed endpoint
│   └── sitemap.xml/   # Sitemap endpoint
├── app.css            # Global styles + Tailwind
└── app.html           # HTML template
```

## Coding Conventions

- Use Svelte 5 runes: `$props()`, `$state()`, `$derived()`, `{@render children()}`
- Prefer Tailwind utilities over custom CSS
- Use theme colors: `bg-terminal-bg`, `text-terminal-accent`
- Mobile-first: `md: (768px)`, `lg: (1024px)`
- Blog posts in `src/content/blog/` with frontmatter: `title`, `description`, `pubDate`
- Headings: Monospace with terminal indicators (`$`, `>`)
- Use `$lib/` alias for imports from `src/lib/`

## Available Commands

```bash
pnpm dev        # Start dev server at http://localhost:5173
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm check      # Check TypeScript types
```

## Common Tasks

### Add Blog Post
1. Create `.md` in `src/content/blog/` with frontmatter
2. Write content with code blocks (```php, ```css, ```javascript)
3. Update `static/llms-full.txt` with summary
4. Test: `pnpm dev`, then `pnpm build`

### Update Social Links
Edit `src/routes/+page.svelte` socialLinks array

## Git Commit Conventions

Format: `<type>(<scope>): <subject>`

**Types**: feat, fix, docs, style, refactor, perf, test, chore, build
**Scopes**: blog, design, content, component, config, deps

Examples:
```
feat(blog): add blog post about REST APIs
fix(layout): correct responsive breakpoint
chore(deps): upgrade tailwindcss to 3.4.0
```

Keep subject under 72 chars, imperative mood, no period.

## Things to Avoid

- Changing color palette significantly
- Adding heavy frameworks (React, Vue) unless necessary
- Using `any` types
- Unnecessary animations
- Breaking terminal aesthetic
- Too "hacker-ish" design - keep professional

---

**Last Updated**: 2026-02-08
