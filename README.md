# Marketing Site Starter

A production-ready boilerplate for high-performance, accessible marketing sites. Built for non-developers using Claude Code.

**Stack:** Astro 6 · React 19 · TypeScript · Tailwind CSS 4 · Radix UI · GSAP · Lenis · Cloudflare Workers

**Designed for:** Marketing sites, landing pages, blogs, portfolios, and content-driven sites that need to be fast, accessible, and easy to update.

---

## Why this stack?

- **Fast by default.** Astro ships almost no JavaScript, so pages load instantly. Better Google rankings, better conversion, better feel.
- **Accessible by default.** Radix UI handles all the tricky accessibility logic (keyboard navigation, screen readers, focus management) for components like dropdowns, modals, accordions, and tabs.
- **Beautiful animations.** GSAP and Lenis give you the kind of smooth scroll and motion you see on award-winning agency sites.
- **Cheap to run.** Cloudflare Workers' free tier handles 100,000 visits per day with unlimited bandwidth, free SSL, and free custom domains.
- **AI-friendly.** Includes a `CLAUDE.md` file with full project context and live access to Astro's documentation via the Astro Docs MCP server, so Claude Code generates correct, current code every time.

---

## Quick start (3 commands)

You'll need [Node.js 22+](https://nodejs.org) installed.

```bash
# 1. Clone the repo
git clone https://github.com/YOUR-USERNAME/marketing-site-starter.git my-site
cd my-site

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser. You should see the starter homepage. The page auto-updates as you (or Claude Code) make changes.

---

## What's included

```
my-site/
├── CLAUDE.md                  ← Project context for Claude Code (read first!)
├── README.md                  ← This file
├── astro.config.mjs           ← Astro configuration (Cloudflare adapter, integrations)
├── tailwind.config.mjs        ← Tailwind theme tokens (colors, spacing, fonts)
├── tsconfig.json              ← TypeScript settings (strict mode)
├── wrangler.jsonc             ← Cloudflare Workers deploy config
├── package.json               ← Dependencies and scripts
├── .env.example               ← Template for your CMS credentials
├── public/                    ← Static files served as-is
│   ├── favicon.svg
│   └── robots.txt             ← SEO: tells search engines what to crawl
└── src/
    ├── components/
    │   ├── Header.astro       ← Top nav (uses Radix Navigation Menu)
    │   ├── Footer.astro       ← Bottom of every page
    │   ├── SEO.astro          ← Meta tags, Open Graph, Twitter Cards
    │   ├── Hero.astro         ← Example hero section with GSAP animation
    │   ├── FAQ.tsx            ← Example accessible FAQ (Radix Accordion)
    │   ├── AnimatedText.tsx   ← Reusable GSAP scroll-triggered text
    │   └── SmoothScroll.tsx   ← Lenis smooth scroll wrapper
    ├── layouts/
    │   └── BaseLayout.astro   ← Wraps every page with <head>, header, footer
    ├── lib/
    │   ├── cms.ts             ← Placeholder for Sanity/Payload client
    │   ├── jsonld.ts          ← Structured data helpers (SEO)
    │   └── site.ts            ← Site metadata (name, URL, social links)
    ├── pages/
    │   ├── index.astro        ← Homepage
    │   ├── about.astro        ← Example second page
    │   └── sitemap.xml.ts     ← Generates sitemap automatically
    ├── styles/
    │   └── global.css         ← Tailwind imports and base styles
    └── types/
        └── env.d.ts           ← TypeScript types for env vars
```

Every file has detailed comments explaining what it does and why.

---

## Next steps

### 1. Customize the basics

Edit `src/lib/site.ts` to set your site name, description, URL, and social links. These propagate to SEO meta tags everywhere.

### 2. Set up Claude Code

If you haven't already:

```bash
npm install -g @anthropic-ai/claude-code
claude
```

Log in. Then connect Claude to Astro's live documentation (this is critical, it gives Claude up-to-date Astro knowledge):

```bash
claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp
```

Now you can start prompting. The first prompts to try are listed below.

### 3. Suggested first prompts

Open Claude Code from inside this folder (`claude`) and try these prompts in order. Each one is self-contained and safe to try.

#### Prompt 1: Tour the project

> Please read the CLAUDE.md file first, then give me a brief tour of this project. Tell me what's in each folder, what the main files do, and what I should customize first.

#### Prompt 2: Update the brand basics

> Please update src/lib/site.ts with these details:
> - Site name: [YOUR SITE NAME]
> - Tagline: [YOUR TAGLINE]
> - Description: [ONE SENTENCE DESCRIPTION]
> - URL: [YOUR DOMAIN, e.g. https://example.com]
>
> Also update the favicon at public/favicon.svg if you can suggest a simple replacement based on the brand.

#### Prompt 3: Customize the homepage hero

> Please update the Hero section on the homepage with:
> - Heading: [YOUR HEADLINE]
> - Subheading: [YOUR SUPPORTING TEXT]
> - Primary CTA: "[BUTTON TEXT]" linking to [URL]
> - Secondary CTA: "[BUTTON TEXT]" linking to [URL]
>
> Keep the existing GSAP animation but feel free to refine the layout if it would look better.

#### Prompt 4: Add a features section

> Please add a "features" section to the homepage between the Hero and the FAQ. It should have 3 feature cards in a responsive grid. Each card has an icon, a heading, and a 1-2 sentence description. Animate the cards with GSAP ScrollTrigger to fade in and slide up, staggered, when they enter the viewport. Use Tailwind for styling and match the visual language of the existing components.

#### Prompt 5: Connect a CMS

> I want to connect [Sanity / Payload] as the CMS. Please walk me through what I need to install, what credentials I need to add to .env, and update src/lib/cms.ts to fetch real content. Then update the homepage to fetch and display 3 latest blog posts from the CMS.

#### Prompt 6: Build from a Figma design

> Please look at this Figma frame and build it as a section on the homepage: [FIGMA-LINK]
>
> Use Tailwind for styling. If any interactive component is needed (dropdown, modal, accordion, tabs, navigation menu, tooltip), use the matching Radix UI primitive for accessibility. Match the design closely.

#### Prompt 7: Add a smooth scroll animation

> Please add a smooth pin-and-reveal section to the homepage. As the user scrolls, the section should pin in place while three steps reveal one by one (similar to apple.com product pages). Use GSAP ScrollTrigger inside a React island. Use placeholder content for the three steps that I can edit later.

#### Prompt 8: Audit accessibility

> Please audit the site for accessibility. Check that every interactive element is keyboard-accessible, every image has appropriate alt text, color contrast meets WCAG AA, all forms have labels, semantic HTML is used, and any custom interactive components use Radix UI primitives. Fix what you can; list what needs my decision.

#### Prompt 9: Optimize for performance

> Please run npm run build and audit the output. Check that images use Astro's <Image> component with proper width/height and lazy loading. Verify React components only have client:* directives where actually needed. Look for large dependencies that could be replaced. Report on bundle size and what could improve.

#### Prompt 10: Prepare for launch

> Please prepare this site for launch. Verify that: (1) every page has unique title, description, and Open Graph tags; (2) sitemap and robots.txt point to the correct production URL; (3) all environment variables have production values set in .env; (4) no debug code, console.logs, or placeholder content remains. List anything I need to do manually before going live.

---

## Daily workflow

Once your site is live:

```bash
# Pull any updates from GitHub
git pull

# Start the dev server
npm run dev

# In another terminal, open Claude Code
claude

# Make changes by talking to Claude. Watch your browser update live.

# When happy, save and push
git add .
git commit -m "Describe what changed"
git push

# Cloudflare auto-deploys in about a minute
```

---

## Available scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts local dev server at http://localhost:4321 |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Previews the built site locally using Wrangler (Cloudflare's runtime) |
| `npm run deploy` | Builds and deploys directly to Cloudflare Workers |
| `npm run astro` | Runs any Astro CLI command |

---

## Updating dependencies (read before running `npm update` or `npm audit fix`)

A few packages must stay paired with the Astro major version:

| Astro | `@astrojs/react` | `@astrojs/cloudflare` |
|-------|------------------|------------------------|
| 5.x   | 4.x              | 12.x                   |
| 6.x   | 5.x              | 13.x                   |

If you bump one, bump the others to match. A mismatched pair (e.g. Astro 6 with `@astrojs/react` 4) breaks `npm run dev` with cryptic React "Invalid hook call" / `useRef` is null errors during SSR.

**Don't run `npm audit fix --force`** — it upgrades `astro` and the Cloudflare adapter independently and leaves the React adapter behind, breaking the pairing. To address vulnerabilities, update the specific package manually.

If `npm run dev` ever crashes after a dependency change, run `rm -rf node_modules/.vite` to clear Astro's stale build cache, then try again.

---

## Deploying to Cloudflare

The easiest way is to connect your GitHub repo in the Cloudflare dashboard. See **Part 11** of the build guide for step-by-step instructions.

If you'd prefer to deploy from your terminal:

```bash
# One-time: log in
npx wrangler login

# Deploy
npm run deploy
```

---

## Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env`. The same variables also need to be set in Cloudflare's dashboard for production builds.

---

## Tech stack details

- **Astro 6**: Static-first website framework with islands architecture
- **React 19**: Used inside Astro for interactive components only
- **TypeScript (strict)**: Catches bugs before they ship
- **Tailwind CSS 4**: Utility-first styling
- **Radix UI**: Unstyled, accessible component primitives
- **GSAP 3**: Industry-standard animation library
- **Lenis**: Smooth scroll library
- **@astrojs/cloudflare**: Official adapter for Cloudflare Workers
- **@astrojs/sitemap**: Automatic sitemap.xml generation
- **schema-dts**: TypeScript types for JSON-LD structured data

---

## Need help?

1. **Read CLAUDE.md**, it has the full project context
2. **Ask Claude Code**, paste error messages directly, it's great at debugging
3. **Check the build guide**, the companion document walks through everything
4. **Astro docs**: [docs.astro.build](https://docs.astro.build) (Claude Code can read these live via the MCP server)

---

## License

MIT. Use it however you like.
