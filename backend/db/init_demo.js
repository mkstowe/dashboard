const knex = require("./knex");

const userId = "auth0|6509201570d3cfe7ec80ceef";

async function clearTables() {
  await knex("hassGroup").where({ userId }).del();
}

async function generateData() {
  let group = await knex("hassGroup").insert({ title: "Overview", userId });
  let card = await knex("hassCard").insert({
    group: group[0],
    type: "sensorCard",
    userId,
  });
  await knex("hassSensor").insert({
    card: card[0],
    entityId: "sensor.temperature",
    icon: "thermometer",
    enableGraph: true,
    name: "Temperature",
    state: "68",
    userId,
    stateOptions: '{"afterString": "°F"}',
  });
  await knex("hassSensor").insert({
    card: card[0],
    entityId: "sensor.humidity",
    icon: "water-drops",
    enableGraph: true,
    name: "Humidity",
    state: "50",
    userId,
    stateOptions: '{"afterString": "%"}',
  });

  group = await knex("hassGroup").insert({ title: "Quick Toggles", userId });
  await knex("hassCard").insert({
    group: group[0],
    type: "lightCard",
    entityId: "light.all_lights",
    icon: "light-bulb",
    iconActive: "light-bulb-active",
    name: "All Lights",
    state: "on",
    service:
      '{"domain": "light", "service": "toggle", "target": {"entity_id": "light.all_lights"}}',
    userId,
  });
  await knex("hassCard").insert({
    group: group[0],
    type: "entityCard",
    entityId: "input_boolean.air_conditioner_toggle",
    icon: "fan",
    iconActive: "fan-active",
    name: "Air Conditioner",
    state: "off",
    service:
      '{"domain": "input_boolean", "service": "toggle", "target": {"entity_id": "input_boolean.air_conditioner_toggle"}}',
    userId,
  });

  group = await knex("hassGroup").insert({ title: "Office", userId });
  await knex("hassCard").insert({
    group: group[0],
    type: "entityCard",
    entityId: "input_boolean.desktop_toggle",
    icon: "computer",
    iconActive: "computer-active",
    name: "Desktop",
    state: "on",
    service:
      '{"domain": "input_boolean", "service": "toggle", "target": {"entity_id": "input_boolean.desktop_toggle"}}',
    userId,
  });
  await knex("hassCard").insert({
    group: group[0],
    type: "lightCard",
    entityId: "light.office",
    icon: "floor-lamp",
    iconActive: "floor-lamp-active",
    name: "Office Lamp",
    state: "on",
    service:
      '{"domain": "light", "service": "toggle", "target": {"entity_id": "light.office"}}',
    userId,
  });
  await knex("hassCard").insert({
    group: group[0],
    type: "fanCard",
    entityId: "fan.office",
    icon: "fan",
    iconActive: "fan-active",
    name: "Office Fan",
    state: "off",
    service:
      '{"domain": "fan", "entityId": "fan.office" "service": "toggle", "target": {"entity_id": "fan.office"}}',
    userId,
  });

  group = await knex("hassGroup").insert({ title: "Living Room", userId });
  await knex("hassCard").insert({
    group: group[0],
    type: "tvCard",
    entityId: "tv.living_room_tv",
    icon: "tv",
    iconActive: "tv-active",
    name: "Living Room TV",
    state: "off",
    service:
      '{"domain": "tv", "service": "toggle", "target": {"entity_id": "tv.living_room_tv"}}',
    userId,
  });
  await knex("hassCard").insert({
    group: group[0],
    type: "lightCard",
    entityId: "light.living_room",
    icon: "floor-lamp",
    iconActive: "floor-lamp-active",
    name: "Living Room Lamp",
    state: "off",
    service:
      '{"domain": "light", "service": "toggle", "target": {"entity_id": "light.living_room"}}',
    userId,
  });
  await knex("hassCard").insert({
    group: group[0],
    type: "lightCard",
    entityId: "light.loft",
    icon: "ceiling-light",
    iconActive: "ceiling-light-active",
    name: "Loft Lights",
    state: "off",
    service:
      '{"domain": "light", "service": "toggle", "target": {"entity_id": "light.loft"}}',
    userId,
  });
  await knex("hassCard").insert({
    group: group[0],
    type: "speakerCard",
    entityId: "media_player.living_room",
    icon: "speaker",
    iconActive: "speaker-active",
    name: "Living Room Speaker",
    state: "off",
    service:
      '{"domain": "light", "service": "toggle", "target": {"entity_id": "media_player.living_room"}}',
    userId,
  });

  group = await knex("hassGroup").insert({ title: "Bedroom", userId });
  await knex("hassCard").insert({
    group: group[0],
    type: "entityCard",
    entityId: "script.sleep",
    icon: "zzz",
    name: "Sleep Time!",
    lock: "true",
    service:
      '{"domain": "script", "service": "turn_on", "target": {"entity_id": "script.sleep"}}',
    userId,
  });
  await knex("hassCard").insert({
    group: group[0],
    type: "lightCard",
    entityId: "light.bedroom",
    icon: "table-lamp",
    iconActive: "table-lamp-active",
    name: "Bedroom Lamp",
    state: "on",
    service:
      '{"domain": "light", "service": "toggle", "target": {"entity_id": "light.bedroom"}}',
    userId,
  });
  await knex("hassCard").insert({
    group: group[0],
    type: "speakerCard",
    entityId: "media_player.bedroom",
    icon: "speaker",
    iconActive: "speaker-active",
    name: "Bedroom Speaker",
    state: "off",
    service:
      '{"domain": "light", "service": "toggle", "target": {"entity_id": "media_player.bedroom"}}',
    userId,
  });

  group = await knex("hassGroup").insert({ title: "Cats", userId });
  await knex("hassCard").insert({
    group: group[0],
    type: "entityCard",
    entityId: "vacuum.litter_robot",
    icon: "toilet",
    name: "Litter Robot",
    state: "Ready",
    service:
      '{"domain": "vacuum", "service": "turn_on", "target": {"entity_id": "vacuum.litter_robot"}}',
    userId,
  });
  card = await knex("hassCard").insert({
    group: group[0],
    type: "sensorCard",
    userId,
  });
  await knex("hassSensor").insert({
    card: card[0],
    entityId: "sensor.litter_level",
    icon: "litter",
    enableGraph: true,
    name: "Litter Level",
    state: "35.25",
    userId,
    stateOptions:
      '{"afterString": "%", "warningExpression": "< 75", "dangerExpression": "< 40", "round": "true"}',
  });
  await knex("hassSensor").insert({
    card: card[0],
    entityId: "sensor.waste_level",
    icon: "poop",
    enableGraph: true,
    name: "Waste Level",
    state: "48.001",
    userId,
    stateOptions:
      '{"afterString": "%", "warningExpression": "> 40", "dangerExpression": "> 70", "round": "true"}',
  });
  card = await knex("hassCard").insert({
    group: group[0],
    type: "sensorCard",
    userId,
  });
  await knex("hassSensor").insert({
    card: card[0],
    entityId: "sensor.food_level",
    icon: "chicken-leg",
    enableGraph: false,
    name: "Food Level",
    state: "Full",
    userId,
    stateOptions: `{"warningExpression": "== 'Low'", "dangerExpression": "== 'Empty'"}`,
  });
}

async function initDemoData() {
  await clearTables();
  await generateData();
}

module.exports = { initDemoData };
