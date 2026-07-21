// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import decapCmsOauth from 'astro-decap-cms-oauth';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [decapCmsOauth()],
});