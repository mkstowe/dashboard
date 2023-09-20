const knex = require("./knex");

function getAllGroups() {
  return knex("group").select("*");
}

function getGroup(id) {
  return knex("group").select("*").where("id", id).first();
}

function createGroup(group) {
  return knex("group").insert(group).returning("*");
}

function updateGroup(id, group) {
  return knex("group").where("id", id).update(group).returning("*");
}

function deleteGroup(id) {
  return knex("group").where("id", id).del();
}

function getAllCards() {
  return knex("card").select("*");
}

function getCard(id) {
  return knex("card").select("*").where("id", id).first();
}

function createCard(card) {
  return knex("card").insert(card).returning("*");
}

function updateCard(id, card) {
  return knex("card").where("id", id).update(card).returning("*");
}

function deleteCard(id) {
  return knex("card").where("id", id).del();
}

function getAllPlants() {
  return knex("plant").select("*");
}

function getPlant(id) {
  return knex("plant").select("*").where("id", id).first();
}

function createPlant(plant) {
  return knex("plant").insert(plant).returning("*");
}

function updatePlant(id, plant) {
  return knex("plant").where("id", id).update(plant).returning("*");
}

function deletePlant(id) {
  return knex("plant").where("id", id).del();
}

module.exports = {
  getAllPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant,
};
