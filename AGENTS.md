# AI Agent Guidelines for marco-kretz.de

## Project Overview

Personal business card website with blog. Astro 5.x + Tailwind CSS 3.x + TypeScript. Modern terminal-inspired design, professional coder aesthetic.

### Color Palette

```css
Background: #0d1117, Border: #30363d, Text: #c9d1d9, Accent: #d29922
Blue: #58a6ff (links), Green: #238636, Red: #da3633
```

## Tech Stack

- **Astro 5.x**: Static site generator
- **Tailwind CSS 3.x**: Utility-first CSS
- **TypeScript**: Strict type checking
- `@astrojs/tailwind`, `astro:content`

## Project Structure

```
src/
├── components/    # TerminalWindow, CodeBlock, SocialLink
├── content/
│   ├── config.ts  # Content collection schema
│   └── blog/      # Blog post markdown files
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro
│   └── blog/[slug].astro
└── styles/global.css
```

## Coding Conventions

- Use `.astro` extension with TypeScript interfaces for Props
- Prefer Tailwind utilities over custom CSS
- Use theme colors: `bg-terminal-bg`, `text-terminal-accent`
- Mobile-first: `md: (768px)`, `lg: (1024px)`
- Blog posts in `src/content/blog/` with frontmatter: `title`, `description`, `pubDate`
- Headings: Monospace with terminal indicators (`$`, `>`)

## Available Commands

```bash
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build for production
npx astro check    # Check TypeScript types
```

## Common Tasks

### Add Blog Post
1. Create `.md` in `src/content/blog/` with frontmatter
2. Write content with code blocks (```php, ```css, ```javascript)
3. Update `public/llms-full.txt` with summary
4. Test: `npm run dev`, then `npm run build`

### Update Social Links
Edit `src/pages/index.astro` socialLinks array

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

**Last Updated**: 2025-12-31
