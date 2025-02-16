export default {
  async fetch(request, env) {
    if (request.method !== "GET") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const pathname = new URL(request.url).pathname;
    const match = await env.KV.get(pathname);

    if (!match) {
      return new Response("Not Found", { status: 404 });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: match,
      },
    });
  },
} satisfies ExportedHandler<Env>;
