// @ts-check
// Astro configuration file. This is loaded when you run any astro command.
// Docs: https://docs.astro.build/en/reference/configuration-reference/
//
// IMPORTANT: When asked to change anything here, Claude should consult the
// Astro Docs MCP server first to verify the current API. Astro config evolves.

import { defineConfig } from 'astro/config';

// Adapter that lets us deploy to Cloudflare Workers.
// https://docs.astro.build/en/guides/integrations-guide/cloudflare/
import cloudflare from '@astrojs/cloudflare';

// Lets us use React components inside Astro pages.
// React components are only hydrated when marked with a client:* directive.
import react from '@astrojs/react';

// Auto-generates sitemap.xml and sitemap-index.xml at build time.
// Requires the `site` field below to be set correctly.
// https://docs.astro.build/en/guides/integrations-guide/sitemap/
import sitemap from '@astrojs/sitemap';

// Tailwind CSS v4 ships as a Vite plugin (not an Astro integration).
// https://tailwindcss.com/docs/installation/framework-guides/astro
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // CRITICAL: Set this to your real production URL.
  // Without this, sitemap won't generate, og:url tags will be wrong, and
  // canonical URLs will break. Use https://example.com as a placeholder if
  // you don't have a domain yet, then update before going live.
  site: 'https://example.com',

  // Use the Cloudflare adapter. By default this enables on-demand rendering
  // for all pages. Individual pages can opt into static pre-rendering by
  // exporting `export const prerender = true` at the top of the file.
  //
  // For marketing sites, the recommended pattern is:
  //   - Static pages (home, about, contact, blog index): pre-rendered
  //   - Dynamic pages (per-request data, user-specific): on-demand
  //
  // In Astro 6, the dev server uses Cloudflare's workerd runtime (the same
  // runtime that runs in production), so what works in `npm run dev` works
  // in production. No more "works locally, fails in deploy" surprises.
  adapter: cloudflare({
    // Use the cloudflare-binding image service for runtime image transforms.
    // Requires the Cloudflare Images binding (see wrangler.jsonc).
    // If you don't need runtime image optimization, change to 'compile' for
    // build-time-only optimization (works without the binding).
    imageService: 'compile',
  }),

  integrations: [
    // Enable React components inside .astro files.
    react(),

    // Generate sitemap.xml at build time.
    // Output: dist/sitemap-index.xml and dist/sitemap-0.xml
    sitemap({
      // Filter out pages we don't want indexed (404, etc.)
      filter: (page) => !page.includes('/404'),
      // Default change frequency hint for search engines
      changefreq: 'weekly',
      // Last modified date will be set automatically per page
    }),
  ],

  // Vite is the underlying build tool Astro uses.
  // Tailwind v4 plugs in here as a Vite plugin.
  vite: {
    plugins: [tailwindcss()],
  },

  // Image optimization settings.
  // Astro will automatically optimize any image imported from src/.
  // For images from a CMS (remote URLs), add the domain to `image.domains`.
  image: {
    // Add CMS or asset domains here if you fetch images from remote URLs
    // domains: ['cdn.sanity.io', 'media.yourdomain.com'],
  },

  // Tells Astro to minify HTML output. Smaller files = faster loading.
  compressHTML: true,

  // Prefetch links on hover for instant page transitions.
  // https://docs.astro.build/en/guides/prefetch/
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
