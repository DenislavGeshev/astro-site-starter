# Claude Code Project Context

This file is read automatically by Claude Code at the start of every session. It tells Claude the rules of this project. Keep it accurate.

---

## Project type

A marketing website built with Astro. Optimized for performance, SEO, and accessibility. Content is fetched from a CMS (Sanity or Payload, depending on setup).

## Tech stack

- **Astro 6** with the App Router pattern (file-based routing in `src/pages/`)
- **React 19** with **TypeScript strict mode** for interactive islands only
- **Tailwind CSS 4** for all styling
- **Radix UI** for all interactive UI primitives (dropdowns, modals, accordions, tabs, navigation menus, tooltips)
- **GSAP 3** with **ScrollTrigger** for animations
- **Lenis** for smooth scrolling
- **@astrojs/cloudflare** adapter for deploying to **Cloudflare Workers**
- **@astrojs/sitemap** for automatic sitemap generation
- CMS is either **Sanity** or **Payload** (check `src/lib/cms.ts` to see which)

---

## CRITICAL: Astro 6 ↔ @astrojs/react 5 must stay paired

`@astrojs/react` is versioned per Astro major:
- Astro 5 → `@astrojs/react` v4
- Astro 6 → `@astrojs/react` v5

**Never upgrade or downgrade one without the other.** A mismatch (e.g. Astro 6 + `@astrojs/react` 4) causes the dev server to crash with `Cannot read properties of null (reading 'useRef')` / "Invalid hook call" errors during SSR — the renderer and React end up in separate module instances and the hook dispatcher is null.

The same pairing rule applies to `@astrojs/cloudflare` (v13 for Astro 6, v12 for Astro 5).

**Never run `npm audit fix --force`** on this project. It bumps `astro` and `@astrojs/cloudflare` independently and leaves `@astrojs/react` behind, breaking the pairing. If there's a vulnerability, address the specific package manually and bump the React adapter alongside Astro.

If versions ever drift, restore them together and run `rm -rf node_modules/.vite` before `npm run dev` to clear stale Vite SSR optimizer chunks.

---

## CRITICAL: Use the Astro Docs MCP server

The Astro Docs MCP server is configured in this environment. **ALWAYS** consult it before generating Astro-specific code. Astro APIs evolve quickly and your training data may be out of date. The MCP server gives you real-time access to current documentation.

When the user asks you to do something Astro-related, your first action is to query the Astro Docs MCP server to verify the current best practice. Examples of when to use it:

- Adding integrations (`astro add` patterns)
- Configuring the Cloudflare adapter (image service, sessions, prerendering)
- Working with content collections, content layer, or markdown
- Setting up routing, middleware, or actions
- Image optimization with `astro:assets`
- Server islands or view transitions
- Anything in `astro.config.mjs`

If you're unsure whether an API has changed, check the docs first. It costs almost nothing and prevents bad code.

---

## Project conventions

### Component choice

The default is **Astro components** (`.astro`). Only reach for React (`.tsx`) when the component genuinely needs client-side interactivity. Examples that NEED React:

- Dropdowns, modals, accordions, tabs, tooltips (use Radix UI)
- GSAP animations triggered by scroll or interaction
- Form submissions with client-side validation
- Anything with `useState`, `useEffect`, or event handlers

Examples that should stay as Astro:

- Static content sections
- SEO/meta components
- Layouts and wrappers
- Lists rendered from data fetched at build time

### React island hydration

Use the lightest hydration directive that works:

- `client:visible`, for animations, anything below the fold (best default)
- `client:idle`, for nav menus and similar (interactive but not urgent)
- `client:load`, only when truly needed immediately on page load (rare)
- `client:only="react"`, for components that can't render on the server (very rare)

Never use `client:load` if `client:visible` would work. It hurts performance.

### Pre-rendering

Marketing sites should pre-render aggressively. Static pages must export:

```ts
export const prerender = true;
```

Only use on-demand rendering when the page genuinely needs per-request server logic (rare for marketing sites).

### Styling

- Use **Tailwind utility classes** for everything. No custom CSS files unless absolutely necessary.
- Brand tokens (colors, spacing, fonts) live in `tailwind.config.mjs`. Use the named tokens (`bg-brand-primary`, `text-brand-muted`) rather than raw hex codes.
- For dynamic class names built from variables, use the full string (Tailwind can't see partial classes).
- Mobile-first: write base classes for mobile, then add `sm:`, `md:`, `lg:` for larger screens.

### Accessibility (non-negotiable)

- Use **semantic HTML** (`<nav>`, `<main>`, `<section>`, `<article>`, `<button>`, `<a>` correctly).
- **Every interactive UI primitive** that has a Radix equivalent MUST use Radix. This includes: Dialog, Dropdown Menu, Navigation Menu, Accordion, Tabs, Tooltip, Popover, Hover Card, Select, Switch, Checkbox, Radio Group, Slider, Toast, Toggle, Toolbar.
- **Never write your own accessibility logic** for these patterns. Radix is battle-tested.
- Every meaningful image has descriptive alt text. Decorative images use `alt=""`.
- Every form input has a properly associated `<label>`.
- Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text).
- Focus indicators are always visible. Don't remove the focus outline without replacing it with something equally visible.

### SEO

- Every page sets unique `title`, `description`, and `canonical` props on `BaseLayout`.
- Use absolute URLs for `og:image` and `og:url`.
- Add JSON-LD structured data where appropriate (Organization, Article, BreadcrumbList, FAQPage). Helpers are in `src/lib/jsonld.ts`.
- Sitemap is generated automatically via `@astrojs/sitemap`. Check `astro.config.mjs` for the `site` URL, it must be set correctly for sitemap to work.

### Images

- ALWAYS use Astro's `<Image>` from `astro:assets` for local images. Never use raw `<img>` tags for project images.
- Specify `width` and `height` (Astro requires these to prevent layout shift).
- Use `loading="lazy"` (the default) for everything except hero images.
- Use `loading="eager"` only for above-the-fold critical images.
- Provide descriptive `alt` text for every image.
- For external images (from a CMS), use `<Image>` with the `inferSize` attribute or specify dimensions explicitly.

### Animations

- Use **GSAP** for non-trivial animations. Use plain CSS for simple hover and transition effects.
- For scroll-triggered animations, use **GSAP ScrollTrigger** inside a React island marked `client:visible`.
- **Register ScrollTrigger only once per component** with `gsap.registerPlugin(ScrollTrigger)`.
- **Always clean up** in `useEffect` returns. Kill ScrollTrigger instances on unmount.
- **Only animate `transform` and `opacity`** for performance. Avoid animating `width`, `height`, `top`, `left`, `margin`, they trigger expensive layout recalculation.
- Wrap GSAP code in `useGSAP()` hook from `@gsap/react` for automatic cleanup, OR use `useEffect` with manual cleanup.

### CMS data fetching

- Fetch data in the Astro frontmatter (between the `---` fences) for static pages.
- For dynamic routes, use `getStaticPaths()` for SSG or fetch in the page for SSR.
- Cache aggressively. Marketing content changes rarely.
- Type all CMS responses. Add types to `src/types/` if needed.

---

## What NOT to do

- ❌ Don't use `client:load` when `client:visible` would work
- ❌ Don't write custom dropdown/modal/tab logic when Radix UI exists
- ❌ Don't use raw `<img>` tags for project images (use Astro's `<Image>`)
- ❌ Don't animate `width`, `height`, `top`, `left`, `margin` (use `transform`)
- ❌ Don't add `console.log` statements in committed code
- ❌ Don't skip `alt` text on images
- ❌ Don't remove focus indicators without replacement
- ❌ Don't add custom CSS files when Tailwind utilities would work
- ❌ Don't fetch data inside React components when you could fetch it in Astro
- ❌ Don't commit `.env` files or secrets
- ❌ Don't use deprecated Astro APIs (always check the MCP docs first)

---

## File organization

- **Atomic, single-purpose files.** A component file should contain one component.
- **Co-locate related styles, types, and helpers** with the component when they're not reused.
- **Move shared logic to `src/lib/`** when used in 2+ places.
- **Move shared types to `src/types/`** when used in 2+ files.
- **Use kebab-case for filenames** for `.astro` files (`hero-section.astro`).
- **Use PascalCase for React components** (`AnimatedText.tsx`).
- **Match the export name to the filename.**

---

## Commit conventions

When the user asks you to make commits, use clear, descriptive messages in the imperative mood:

- ✅ "Add features section to homepage"
- ✅ "Fix mobile nav z-index issue"
- ✅ "Update CMS schema to include author bio"
- ❌ "Updates"
- ❌ "Fixed stuff"
- ❌ "WIP"

---

## When you're unsure

Ask the user. Don't guess. Especially when:

- A design choice could go multiple ways
- A new dependency might be needed
- The change affects pricing or external services
- The change touches the deployment pipeline or environment

For technical questions about Astro itself, use the Astro Docs MCP server before asking the user.

---

## How the user works

The user is non-technical. They will:

- Describe what they want in plain English
- Reference URLs and Figma designs as inspiration
- Sometimes paste error messages without context

You should:

- Explain what you're about to do before doing it (in 1-2 sentences)
- Use plain language in any explanations (no jargon without defining it)
- Run commands yourself when safe (don't make them copy-paste unless necessary)
- Test your work by running `npm run dev` or `npm run build` when relevant
- Report back briefly when done, with a summary of what changed
