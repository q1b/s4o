import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro'

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";
import vercel from '@astrojs/vercel/serverless';

/** @type {'vercel' | 'cloudflare'} */
let target = "cloudflare";

export default defineConfig({
  site: (target === 'vercel' ? "https://osteopath.vercel.app" : 'https://osteopath.pages.dev'),
  prefetch: true,
  output: "server",
  adapter: target === 'vercel' ? vercel() : cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [
    tailwind(), react(), markdoc(), ...( (target === 'vercel') ? [keystatic()] : [])
  ]
});