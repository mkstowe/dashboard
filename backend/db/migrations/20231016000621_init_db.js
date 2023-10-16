/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("hassGroup", (table) => {
    table.increments("id");
    table.text("title", 128).notNullable();
    table.text("userId", 128).notNullable();
  });

  await knex.schema.createTable("hassCard", (table) => {
    table.increments("id");
    table.integer("group").unsigned().notNullable();
    table
      .foreign("group")
      .references("id")
      .inTable("hassGroup")
      .onDelete("CASCADE");
    table.text("type", 128).notNullable();
    table.text("entityId", 128);
    table.text("icon", 128);
    table.text("iconActive", 128);
    table.boolean("lock");
    table.text("name", 128);
    table.text("state", 128);
    table.jsonb("service");
    table.jsonb("stateOptions");
    table.text("userId", 128).notNullable();
  });

  await knex.schema.createTable("hassSensor", (table) => {
    table.increments("id");
    table.integer("card").unsigned().notNullable();
    table
      .foreign("card")
      .references("id")
      .inTable("hassCard")
      .onDelete("CASCADE");
    table.text("entityId", 128).notNullable();
    table.text("icon", 128);
    table.boolean("enableGraph");
    table.text("name", 128);
    table.text("state", 128);
    table.jsonb("stateOptions");
    table.text("userId", 128).notNullable();
  });

  await knex.schema.createTable("plant", (table) => {
    table.increments("id");
    table.text("name", 128);
    table.text("scientificName", 128);
    table.text("type", 128);
    table.date("dateAdded");
    table.text("temperature");
    table.text("humidity");
    table.boolean("isToxic");
    table.text("light");
    table.text("water");
    table.text("soil");
    table.text("fertilizer");
    table.text("propagation");
    table.text("repotting");
    table.datetime("lastWatered");
    table.datetime("lastFertilized");
    table.text("notes");
    table.text("userId", 128).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("hassSensor");
  await knex.schema.dropTableIfExists("hassCard");
  await knex.schema.dropTableIfExists("hassGroup");
  await knex.schema.dropTableIfExists("plant");
};
