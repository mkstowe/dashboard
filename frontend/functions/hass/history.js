export async function onRequest(context) {
  // const queryString = url.get('entity');
  const entityId = context.request.url.split('=')[1];
  return new Response(entityId);
  // const response = await fetch(
    // `${context.env.HASS_URL}/api/history/period?filter_entity_id=${entityId}`,
    // {
      // headers: {
        // 'Content-Type': 'application/json',
        // Authorization: `Bearer ${context.env.HASS_TOKEN}`
      // }
    // }
  // );

  // return new Response(response);
  // return new Response(`BODY: ${context.request.body}, \nJSON: ${context.request.json}, \nURL: ${context.request.url}, \nREQUEST: ${JSON.stringify(context.request)}`);
}
