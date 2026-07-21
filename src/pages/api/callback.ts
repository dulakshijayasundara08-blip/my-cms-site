import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  const client_id = import.meta.env.OAUTH_GITHUB_CLIENT_ID;
  const client_secret = import.meta.env.OAUTH_GITHUB_CLIENT_SECRET;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  });

  const data = await response.json();
  const token = data.access_token;

  const content = `
    <script>
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
          e.origin
        );
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;

  return new Response(content, {
    headers: { 'Content-Type': 'text/html' },
  });
};