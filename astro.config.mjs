// @ts-check
import { defineConfig } from 'astro/config';

const rawBase = (process.env.ASTRO_BASE ?? '/').trim() || '/';
const base =
  rawBase === '/' || rawBase === ''
    ? '/'
    : `/${rawBase.replace(/^\/|\/$/g, '')}/`;

const site =
  (process.env.ASTRO_SITE ?? 'https://drewsartorius.com').trim() ||
  'https://drewsartorius.com';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  prefetch: true,
});
