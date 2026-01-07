# AI Agent Guidelines for marco-kretz.de

This document provides context and guidelines for AI agents working on this personal business card website.

## Project Overview

**Type**: Personal business card website with blog
**Framework**: Astro 5.x (Static Site Generator)
**Styling**: Tailwind CSS 3.x
**Deployment**: Static hosting (Netlify, Vercel, etc.)

### Design Philosophy

- **Theme**: Modern terminal-inspired design
- **Vibe**: "Coder" aesthetic without being too hacky
- **Tone**: Professional, warm, approachable
- **Target Audience**: Potential clients, employers, fellow developers

### Color Palette

```css
Background: #0d1117 (dark terminal)
Border:     #30363d (subtle borders)
Text:        #c9d1d9 (primary text)
Text Dim:     #8b949e (secondary text)
Accent:       #d29922 (warm amber)
Accent Hover: #e3b341 (lighter amber)
Blue:         #58a6ff (links, highlights)
Green:        #238636 (success states)
Red:          #da3633 (errors)
```

## Tech Stack & Libraries

### Core
- **Astro 5.x**: Modern static site generator
- **Tailwind CSS 3.x**: Utility-first CSS framework
- **TypeScript**: Strict type checking enabled

### Dependencies
- `@astrojs/tailwind`: Tailwind integration for Astro
- `astro:content`: Content collections for blog posts

### Font Stack
- **Monospace**: Cascadia Code, Source Code Pro, Menlo, Consolas, Monaco
- **Sans-serif**: Inter, system-ui

## Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── TerminalWindow.astro  # Terminal-style container
│   ├── CodeBlock.astro       # Styled code blocks
│   └── SocialLink.astro      # Social media link cards
├── content/
│   ├── config.ts            # Content collection schema
│   └── blog/               # Blog post markdown files
├── layouts/
│   └── Layout.astro        # Base layout with metadata
├── pages/
│   ├── index.astro         # Homepage
│   └── blog/
│       ├── index.astro      # Blog listing
│       └── [slug].astro   # Individual blog posts
└── styles/
    └── global.css         # Tailwind directives + custom styles
```

## Coding Conventions

### Astro Components
- Use `.astro` extension
- Define TypeScript interfaces for Props
- Use `<slot />` for component composition
- Keep styles scoped when component-specific

### Tailwind Classes
- Prefer utility classes over custom CSS
- Use custom theme colors (e.g., `bg-terminal-bg`, `text-terminal-accent`)
- Use responsive prefixes (`md:`, `lg:`) for mobile-first design
- Use component classes (`@layer components`) for complex UI patterns

### Content Collections
- Blog posts go in `src/content/blog/`
- Frontmatter must include: `title`, `description`, `pubDate`
- Optional: `readTime`, `tags`
- Slug is auto-generated from filename

### Typography
- Headings: Monospace font, styled with terminal indicators
- Body text: Sans-serif, comfortable line-height
- Code: Monospace, warm accent color
- Terminal commands: `$` prompt prefix, `>` section indicators

## Design Patterns

### Terminal Decorations
- Use `TerminalWindow.astro` for terminal-style containers
- Window header has red/yellow/green dots
- Use `$` for command prompts
- Use `>` for section headers
- Add blinking cursor animation for interactive feel

### Interactive Elements
- Hover states with color transitions (200ms duration)
- Focus rings with amber color
- Links use blue (#58a6ff) by default
- Buttons use amber accent with hover effects

### Responsive Design
- Mobile-first approach
- Breakpoints: `md: (768px)`, `lg: (1024px)`
- Stacked layouts on mobile, grid on larger screens
- Touch-friendly tap targets (minimum 44px)

## Available Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build

# Type Checking
npx astro check      # Check TypeScript types
```

## Content Guidelines

### Blog Posts
- Focus on PHP, Symfony, WordPress, Shopware, CSS, JavaScript
- Include practical code examples
- Use ` ```php`, ` ```css`, ` ```javascript` code blocks
- Tag posts with relevant technologies
- Estimated read time in format "X min"

### Personal Info Updates
- Name: Marco Kretz
- Location: Germany
- Experience: Nearly 20 years
- Email: Update to real address
- Social links: Update to real profiles

## Common Tasks

### Adding a New Blog Post
1. Create `.md` file in `src/content/blog/`
2. Add frontmatter with title, description, pubDate
3. Write content in Markdown
4. Include code blocks with language specification
5. Update `public/llms-full.txt` with a summary of the new blog post
6. Test locally: `npm run dev`
7. Check build: `npm run build`

**Note**: The `public/llms.txt` file contains basic site info and rarely needs updates. The `public/llms-full.txt` file should be updated with summaries of new blog posts to help LLMs like ChatGPT and Gemini understand and cite your content.

### Updating Social Links
Edit `src/pages/index.astro`:
```astro
const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/yourusername', icon: '📦' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', icon: '💼' },
  { name: 'Email', href: 'mailto:hello@marco-kretz.de', icon: '📧' },
];
```

### Styling a New Component
1. Use Tailwind utilities first
2. Add custom styles to `global.css` under `@layer components`
3. Use theme colors (`bg-terminal-bg`, `text-terminal-accent`)
4. Test responsive behavior

## Git Commit Conventions

Follow Conventional Commits format for clear, descriptive commit messages:

### Format
```
<type>(<scope>): <subject>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies, etc.
- `build`: Build system or dependencies changes

### Scopes
- `blog`: Blog-related changes
- `design`: Design/styling changes
- `content`: Content additions/updates
- `component`: Reusable components
- `config`: Configuration changes
- `deps`: Dependency updates

### Examples
```
feat(blog): add blog post about REST APIs
fix(layout): correct responsive breakpoint
docs(agents): add commit conventions
style(component): improve terminal window styling
chore(deps): upgrade tailwindcss to 3.4.0
```

### Guidelines
- Keep subject line under 72 characters
- Use imperative mood ("add" not "added")
- Capitalize first letter
- No period at end of subject
- Separate subject from body with blank line
- Reference issues in commit body if applicable

## Things to Avoid

- ❌ Don't change the color palette significantly
- ❌ Don't add heavy frameworks (React, Vue, etc.) unless necessary
- ❌ Don't use `any` types - use proper TypeScript
- ❌ Don't add unnecessary animations (keep it subtle)
- ❌ Don't break the terminal aesthetic
- ❌ Don't use bright/contrasting colors
- ❌ Don't make the design too "hacker-ish" - keep it professional

## SEO Considerations

- All pages have meta descriptions
- Open Graph tags for social sharing
- Twitter Card meta tags
- Semantic HTML structure
- Descriptive alt text for images
- Fast loading (static site)

## Performance Notes

- Site is fully static - no server-side rendering needed
- Minimal JavaScript (only where needed for interactivity)
- CSS purged via Tailwind
- Optimize images before adding to `public/`
- Use WebP format when possible

## Deployment

The build outputs to `dist/` directory and can be deployed to any static host:
- Netlify: Connect to GitHub repository
- Vercel: Connect to GitHub repository
- GitHub Pages: Use GitHub Actions for automated builds
- Any static host supporting static sites

---

**Last Updated**: 2025-12-31
**Maintained By**: Marco Kretz
