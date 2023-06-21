export async function onRequest(context) {
  const entityId = context.params.entity;
  const response = await fetch(
    `${context.env.HASS_URL}/api/history/period?filter_entity_id=${entityId}`
  );

  return new Response(response);
}
