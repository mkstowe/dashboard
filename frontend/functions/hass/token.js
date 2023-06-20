export const onRequestGet(context) {
  return new Response({
    hassUrl: context.env.get("HASS_URL"),
    hassToken: context.env.get("HASS_ACCESS_TOKEN")
  });
}
