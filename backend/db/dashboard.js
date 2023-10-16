const knex = require("./knexfile");

function getAllGroups() {
  return knex("hassGroup").select("*");
}

function getGroup(id) {
  return knex("hassGroup").select("*").where("id", id).first();
}

function createGroup(group) {
  return knex("hassGroup").insert(group).returning("*");
}

function updateGroup(id, group) {
  return knex("hassGroup").where("id", id).update(group).returning("*");
}

function deleteGroup(id) {
  return knex("hassGroup").where("id", id).del();
}

function getAllCards() {
  return knex("hassCard").select("*");
}

function getCards(groupId) {
  return knex("hassCard")
    .select("*")
    .modify(function (queryBuilder) {
      if (groupId) {
        queryBuilder.where("group", groupId);
      }
    });
}

function getCard(id) {
  return knex("hassCard").select("*").where("id", id).first();
}

function createCard(card) {
  return knex("hassCard").insert(card).returning("*");
}

function updateCard(id, card) {
  return knex("hassCard").where("id", id).update(card).returning("*");
}

function deleteCard(id) {
  return knex("hassCard").where("id", id).del();
}

function getSensors(cardId) {
  return knex("hassSensor")
    .select("*")
    .modify(function (queryBuilder) {
      if (cardId) {
        queryBuilder.where("card", cardId);
      }
    });
}

function getSensor(id) {
  return knex("hassSensor").select("*").where("id", id).first();
}

function createSensor(sensor) {
  return knex("hassSensor").insert(sensor).returning("*");
}

function updateSensor(id, sensor) {
  return knex("hassSensor").where("id", id).update(sensor).returning("*");
}

function deleteSensor(id) {
  return knex("hassSensor").where("id", id).del();
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
  getAllGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  getAllCards,
  getCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
  getSensors,
  getSensor,
  createSensor,
  updateSensor,
  deleteSensor,
  getAllPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant,
};
