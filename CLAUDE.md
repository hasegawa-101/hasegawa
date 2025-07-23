# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website/blog for Hayato Hasegawa (長谷川 駿) built with Astro, focusing on web accessibility. The site uses static site generation with TypeScript, Tailwind CSS, and MDX for content.

## Essential Commands

```bash
# Development
bun run dev          # Start development server (or bun start)

# Build
bun run build        # Type check and build for production

# Preview
bun run preview      # Preview production build locally

# Code Quality
bun run check        # Run Biome linter/formatter with auto-fix on ./src
```

## Architecture Overview

### Technology Stack
- **Astro 5.11.1** - Static site generator
- **TypeScript** - Strict mode enabled
- **Tailwind CSS 3.4.14** - With custom logical properties plugin
- **Biome** - Linting and formatting
- **Bun** - Package manager and runtime

### Project Structure
- **Content System**: Uses Astro's content collections for blog posts
  - Blog posts in `/src/content/blog/` (supports .md and .mdx)
  - Schema: title (string), description (string), date (Date), ogImage (optional string)
  
- **Routing**: 
  - Static pages in `/src/pages/`
  - Dynamic blog routes via `[...slug].astro`
  - RSS feed generation at `/rss.xml`

- **Styling Approach**:
  - Tailwind CSS with extensive customization
  - Custom utilities for logical properties (block-start/end, inline-start/end)
  - Typography plugin for blog content
  - Hover states that respect user preferences

### Key Configuration
- Site URL: `https://hayatohasegawa.com`
- Path alias: `@/*` → `src/*`
- Tailwind customizations focus on internationalization support with logical properties

## Development Patterns

When modifying this codebase:
1. Use the existing component patterns in `/src/components/`
2. Follow the established Astro + TypeScript patterns
3. Maintain the logical properties approach for CSS (use block/inline directions instead of top/bottom/left/right)
4. Run `bun run check` before committing to ensure code quality
5. Blog posts should include all required frontmatter fields