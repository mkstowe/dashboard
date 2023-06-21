export async function onRequest(context) {
  const entityId = context.request.url.split('=')[1];
  const response = await fetch(
    `${context.env.HASS_URL}/api/history/period?filter_entity_id=${entityId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.env.HASS_TOKEN}`
      }
    }
  );

  return new Response(JSON.stringify(response));
}
