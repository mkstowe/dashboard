export function onRequest(context) {
  return new Response(context.env.NODE_VERSION);
}
