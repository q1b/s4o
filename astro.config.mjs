import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro'

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";
import vercel from '@astrojs/vercel/serverless';

/** @type {'vercel' | 'cloudflare'} */
let target = "vercel";

export default defineConfig({
  site: target ? "https://osteopath.vercel.app" : 'https://osteopath.pages.dev',
  output: "hybrid",
  adapter: target === 'vercel' ? vercel() : cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [
    tailwind(), react(), markdoc(), ...( target === 'vercel' ? [keystatic()] : [])
  ]
});