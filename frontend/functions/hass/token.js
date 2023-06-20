export function onRequest(context) {
  return new Response(json, {
    hassUrl: context.env.HASS_URL,
    hassToken: context.env.HASS_ACCESS_TOKEN
  });
}
