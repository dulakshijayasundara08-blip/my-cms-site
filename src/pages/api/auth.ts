export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect }) => {
  const client_id = import.meta.env.OAUTH_GITHUB_CLIENT_ID;
  const redirect_uri = 'https://github.com/login/oauth/authorize';
  const scope = 'repo user'; // GitHub scope වෙන් කරන්නේ comma (,) වලින් නොව space එකකින්.

  return redirect(`${redirect_uri}?client_id=${client_id}&scope=${encodeURIComponent(scope)}`);
};