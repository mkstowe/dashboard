const knex = require("./knex");

function getAllPlants() {
  return knex("plants").select("*");
}

function getPlant(id) {
  return knex("plants").select("*").where("id", id).first();
}

function createPlant(plant) {
  return knex("plants").insert(plant).returning("*");
}

function updatePlant(id, plant) {
  return knex("plants").where("id", id).update(plant).returning("*");
}

function deletePlant(id) {
  return knex("plants").where("id", id).del();
}

module.exports = {
  getAllPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant,
};
