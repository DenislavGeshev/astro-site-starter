/// <reference types="astro/client" />

/**
 * TypeScript types for environment variables.
 *
 * After adding a new env var, add it here so TypeScript autocompletes it
 * and catches typos. Then add the actual value to .env (local) and to
 * Cloudflare's dashboard (production).
 */
interface ImportMetaEnv {
  // ===== CMS =====
  // Sanity (used if CMS is Sanity)
  readonly SANITY_PROJECT_ID?: string;
  readonly SANITY_DATASET?: string;
  readonly SANITY_API_VERSION?: string;
  readonly SANITY_TOKEN?: string; // Optional: for fetching drafts

  // Payload (used if CMS is Payload)
  readonly PAYLOAD_API_URL?: string;
  readonly PAYLOAD_API_KEY?: string; // Optional: for protected endpoints

  // ===== R2 (optional, for media CDN) =====
  readonly R2_PUBLIC_URL?: string;

  // ===== ANALYTICS / MONITORING (optional) =====
  readonly PLAUSIBLE_DOMAIN?: string;
  readonly SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Cloudflare runtime types.
 * These give you typed access to Cloudflare bindings (KV, R2, D1, etc.)
 * via Astro.locals.runtime.env in your pages.
 *
 * Run `npx wrangler types` to regenerate after changing wrangler.jsonc.
 */
type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
