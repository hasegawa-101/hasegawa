# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website/blog for Hayato Hasegawa (長谷川 駿) built with Astro, focusing on web accessibility. The site uses static site generation with TypeScript, Tailwind CSS, and MDX for content.

## Essential Commands

Run commands from the repository root. The pnpm version is pinned in `package.json` under `packageManager`; do not duplicate its version in other configuration files. If pnpm is not installed, use `npx get-pnpm` as described in the [official installation guide](https://pnpm.io/installation).

```bash
# Install Dependencies
pnpm --version       # Verify against package.json packageManager
pnpm install --frozen-lockfile

# Development
pnpm run dev          # Start development server (or pnpm run start)

# Build
pnpm run build        # Run both Astro and native type checks, then build for production

# Preview
pnpm run preview      # Preview production build locally

# Code Quality
pnpm run check        # Check ./src with Biome and Astro formatting with Prettier; no writes
pnpm run check:types  # Run astro check with TS 6, then the native TS 7 compiler
pnpm run check:native # Generate Astro types, then check ordinary TS files with native TS 7
pnpm run check:fix    # Apply Biome fixes and format Astro files with Prettier
pnpm run format       # Format src TS/JS with Biome and Astro files with Prettier
pnpm run format:astro # Run Prettier on Astro files only
```

## Architecture Overview

### Technology Stack
- **Astro 7.x** - Static site generator with MDX support
- **Node.js** - Requires 22.13.0 or newer; CI and deployment use Node 24
- **TypeScript 6.x + native 7.x** - Strict mode enabled; Astro tooling uses the TypeScript 6 API, while the native compiler checks ordinary TypeScript files
- **Tailwind CSS v4** - Configured via CSS @theme, no separate config file
- **Biome** - Linting and formatting (tabs, double quotes, import organization)
- **Prettier** - For Astro file formatting only
- **pnpm** - Package manager (version pinned by `packageManager` in `package.json`; dependencies locked in `pnpm-lock.yaml`)

### Project Structure
- **Content System**: Uses Astro's content collections for blog posts
  - Blog posts in `/src/content/blog/` (supports .md and .mdx)
  - Schema in `/src/content.config.ts`: title (string), description (string), date (Date), ogImage (optional Astro image)

- **Routing**:
  - Static pages in `/src/pages/`
  - Blog listing at `/blogs/`, dynamic posts via `/src/pages/blogs/[...slug].astro`
  - RSS feed generation at `/rss.xml`

- **Styling Approach**:
  - Tailwind v4 configured entirely via CSS in `/src/styles/style.css`
  - Custom logical properties plugin in `/src/styles/logical-properties-plugin.css` provides:
    - Padding/margin utilities: `pbl-*`, `pbe-*`, `pis-*`, `pie-*`, etc.
    - Space utilities: `space-b-*`, `space-i-*` (block/inline directions)
    - Border utilities: `border-bs`, `border-be`, `border-is-*`, etc.
    - Inset utilities: `block-start-*`, `block-end-*`
    - Grid utilities: `grid-cols-auto-fill-*`, `grid-cols-auto-fit-*`
  - Custom fonts: MFW-PIshiiGothicStdN (regular and bold variants)
  - Typography plugin for blog content
  - All hover states respect user preferences via `@media (hover: hover)`

### Key Configuration
- Site URL: `https://hayatohasegawa.com`
- Path alias: `@/*` → `src/*`
- TypeScript: Extends `astro/tsconfigs/strict`
- TypeScript coexistence follows the [official alias setup](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6-0): `typescript` aliases `@typescript/typescript6` to provide the API required by Astro tooling, and `@typescript/native` aliases TypeScript 7. The `tsc` executable is native 7; `tsc6` is legacy 6. Versions are pinned in `package.json` and `pnpm-lock.yaml`.
- `check:types` runs `astro check` followed by `tsc --noEmit --project tsconfig.json`. `check:native` runs `astro sync` followed by the same native command. Native checks cover ordinary TS/config/RSS/utility files; `.astro` templates require `astro check`. The production build runs `check:types` before `astro build`.
- Biome ignores: `/src/styles/style.css` and `/src/styles/logical-properties-plugin.css`
- `vite.resolve.noExternal` bundles Astro's `cookie` dependency for prerendering so pnpm builds do not resolve an unrelated ancestor installation.

## Development Patterns

### Code Style
- **Formatting**: Use tabs for indentation, double quotes for strings
- **Import organization**: Biome automatically organizes imports
- **Astro files**: Use Prettier exclusively for formatting. Biome provides partial lint support; `noUnusedVariables`, `noUnusedImports`, `useImportType`, and `useConst` are disabled only for Astro files to avoid false positives. `astro check` runs during the build.

### CSS Guidelines
- **Always use logical properties** instead of physical directions:
  - Use `pbs-4` (padding-block-start) instead of `pt-4`
  - Use `mbe-2` (margin-block-end) instead of `mb-2`
  - Use `pis-6` (padding-inline-start) instead of `pl-6`
- This approach supports internationalization for RTL/LTR and different writing modes

### Content Guidelines
- Blog posts must include all required frontmatter: `title`, `description`, `date`
- Optional: `ogImage` (uses Astro's image() helper)
- Place blog posts in `/src/content/blog/` as `.md` or `.mdx` files

### CI/CD
- **CI checks** run on PRs targeting `main` and pushes to `main`: read-only lint/format checks, type check, and build
- **Auto-deploy** to GitHub Pages after successful CI for a push to `main`, using that CI run's commit SHA; manual deployment is also available
- **Dependabot**: Checks npm dependencies managed with pnpm (`package-ecosystem: npm`) and GitHub Actions daily at 09:00 JST, with related packages grouped together. The workflow approves patch/minor updates and enables auto-merge. GitHub must allow auto-merge and Actions PR approvals; require the CI job's `test` check on `main` to ensure CI passes before merging.
