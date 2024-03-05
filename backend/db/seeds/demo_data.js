/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const userId = "auth0|6509201570d3cfe7ec80ceef";

  await knex("hassGroup").del();
  await knex("hassCard").del();
  await knex("hassSensor").del();
  await knex("plant").del();

  let group = await knex("hassGroup")
    .insert({ title: "Overview", userId })
    .returning("id");
  group = group[0].id;
  let card = await knex("hassCard")
    .insert({ group, type: "sensorCard", userId })
    .returning("id");
  card = card[0].id;
  await knex("hassSensor").insert({
    card,
    entityId: "sensor.temperature",
    icon: "thermometer",
    enableGraph: true,
    name: "Temperature",
    state: "68",
    userId,
    stateOptions: { afterString: "°F" },
  });
  await knex("hassSensor").insert({
    card,
    entityId: "sensor.humidity",
    icon: "water-drops",
    enableGraph: true,
    name: "Humidity",
    state: "50",
    userId,
    stateOptions: { afterString: "%" },
  });

  group = await knex("hassGroup")
    .insert({ title: "Quick Toggles", userId })
    .returning("id");
  group = group[0].id;
  await knex("hassCard").insert({
    group,
    type: "lightCard",
    entityId: "light.all_lights",
    icon: "light-bulb",
    name: "All Lights",
    state: "on",
    service: {
      domain: "light",
      service: "toggle",
      target: { entity_id: "light.all_lights" },
    },
    userId,
  });
  await knex("hassCard").insert({
    group,
    type: "entityCard",
    entityId: "input_boolean.air_conditioner_toggle",
    icon: "fan",
    name: "Air Conditioner",
    state: "off",
    service: {
      domain: "input_boolean",
      service: "toggle",
      target: { entity_id: "input_boolean.air_conditioner_toggle" },
    },
    userId,
  });

  group = await knex("hassGroup")
    .insert({ title: "Office", userId })
    .returning("id");
  group = group[0].id;
  await knex("hassCard").insert({
    group,
    type: "entityCard",
    entityId: "input_boolean.desktop_toggle",
    icon: "computer",
    name: "Desktop",
    state: "on",
    service: {
      domain: "input_boolean",
      service: "toggle",
      target: { entity_id: "input_boolean.desktop_toggle" },
    },
    userId,
  });
  await knex("hassCard").insert({
    group,
    type: "lightCard",
    entityId: "light.office",
    icon: "floor-lamp",
    name: "Office Lamp",
    state: "on",
    service: {
      domain: "light",
      service: "toggle",
      target: { entity_id: "light.office" },
    },
    userId,
  });
  await knex("hassCard").insert({
    group,
    type: "fanCard",
    entityId: "fan.office",
    icon: "fan",
    name: "Office Fan",
    state: "off",
    service: {
      domain: "fan",
      entityId: "fan.office",
      service: "toggle",
      target: { entity_id: "fan.office" },
    },
    userId,
  });

  group = await knex("hassGroup")
    .insert({ title: "Living Room", userId })
    .returning("id");
  group = group[0].id;
  await knex("hassCard").insert({
    group,
    type: "tvCard",
    entityId: "tv.living_room_tv",
    icon: "tv",
    name: "Living Room TV",
    state: "off",
    service: {
      domain: "tv",
      service: "toggle",
      target: { entity_id: "tv.living_room_tv" },
    },
    userId,
  });
  await knex("hassCard").insert({
    group,
    type: "lightCard",
    entityId: "light.living_room",
    icon: "floor-lamp",
    name: "Living Room Lamp",
    state: "off",
    service: {
      domain: "light",
      service: "toggle",
      target: { entity_id: "light.living_room" },
    },
    userId,
  });
  await knex("hassCard").insert({
    group,
    type: "lightCard",
    entityId: "light.loft",
    icon: "ceiling-light",
    name: "Loft Lights",
    state: "off",
    service: {
      domain: "light",
      service: "toggle",
      target: { entity_id: "light.loft" },
    },
    userId,
  });
  await knex("hassCard").insert({
    group,
    type: "speakerCard",
    entityId: "media_player.living_room",
    icon: "speaker",
    name: "Living Room Speaker",
    state: "off",
    service: {
      domain: "light",
      service: "toggle",
      target: { entity_id: "media_player.living_room" },
    },
    userId,
  });

  group = await knex("hassGroup")
    .insert({ title: "Bedroom", userId })
    .returning("id");
  group = group[0].id;
  await knex("hassCard").insert({
    group,
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
    group,
    type: "lightCard",
    entityId: "light.bedroom",
    icon: "table-lamp",
    name: "Bedroom Lamp",
    state: "on",
    service: {
      domain: "light",
      service: "toggle",
      target: { entity_id: "light.bedroom" },
    },
    userId,
  });
  await knex("hassCard").insert({
    group,
    type: "speakerCard",
    entityId: "media_player.bedroom",
    icon: "speaker",
    name: "Bedroom Speaker",
    state: "off",
    service: {
      domain: "light",
      service: "toggle",
      target: { entity_id: "media_player.bedroom" },
    },
    userId,
  });

  group = await knex("hassGroup")
    .insert({ title: "Cats", userId })
    .returning("id");
  group = group[0].id;
  await knex("hassCard").insert({
    group,
    type: "entityCard",
    entityId: "vacuum.litter_robot",
    icon: "toilet",
    name: "Litter Robot",
    state: "Ready",
    service: {
      domain: "vacuum",
      service: "turn_on",
      target: { entity_id: "vacuum.litter_robot" },
    },
    userId,
  });
  card = await knex("hassCard")
    .insert({ group, type: "sensorCard", userId })
    .returning("id");
  card = card[0].id;
  await knex("hassSensor").insert({
    card,
    entityId: "sensor.litter_level",
    icon: "litter",
    enableGraph: true,
    name: "Litter Level",
    state: "35.25",
    userId,
    stateOptions: {
      afterString: "%",
      warningExpression: "< 75",
      dangerExpression: "< 40",
      round: "true",
    },
  });
  await knex("hassSensor").insert({
    card,
    entityId: "sensor.waste_level",
    icon: "poop",
    enableGraph: true,
    name: "Waste Level",
    state: "48.001",
    userId,
    stateOptions: {
      afterString: "%",
      warningExpression: "> 40",
      dangerExpression: "> 70",
      round: "true",
    },
  });
  card = await knex("hassCard")
    .insert({ group, type: "sensorCard", userId })
    .returning("id");
  card = card[0].id;
  await knex("hassSensor").insert({
    card,
    entityId: "sensor.food_level",
    icon: "chicken-leg",
    enableGraph: false,
    name: "Food Level",
    state: "Full",
    userId,
    stateOptions: {
      warningExpression: "== 'Low'",
      dangerExpression: "== 'Empty'",
    },
  });
};
