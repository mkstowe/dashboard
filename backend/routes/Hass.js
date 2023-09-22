require("dotenv").config();

const express = require("express");
const router = express.Router();

const db = require("../db/dashboard");

const axios = require("axios");
const querystring = require("querystring");

const getSecret = require("../secrets");

const HASS_URL = process.env.HASS_URL;

// Get all groups
router.get("/group", async (req, res) => {
  const groups = await db.getAllGroups();
  res.status(200).json(groups);
});

// Get group by id
router.get("/group/:id", async (req, res, next) => {
  const group = await db.getGroup(req.params.id);
  res.status(200).json({ group });
});

// Create new group
router.post("/group", async (req, res) => {
  const group = await db.createGroup(req.body);
  res.status(201).json({ group });
});

// Update group
router.patch("/group/:id", async (req, res) => {
  const group = await db.updateGroup(req.params.id, req.body);
  res.status(200).json({ group });
});

// Delete group
router.delete("/group/:id", async (req, res) => {
  await db.deleteGroup(req.params.id);
  res.status(204).json({});
});

// Get cards
router.get("/card", async (req, res) => {
  const { groupId } = req.query;
  const cards = await db.getCards(groupId);
  res.status(200).json(cards);
});

// Get card by id
router.get("/card/:id", async (req, res) => {
  const card = await db.getCard(req.params.id);
  res.status(200).json({ card });
});

// Create new card
router.post("/card", async (req, res) => {
  const card = await db.createCard(req.body);
  res.status(201).json({ card });
});

// Update card
router.patch("/card/:id", async (req, res) => {
  const card = await db.updateCard(req.params.id, req.body);
  res.status(200).json({ card });
});

// Delete card
router.delete("/card/:id", async (req, res) => {
  await db.deleteCard(req.params.id);
  res.status(204).json({});
});

// Get entity history
router.get("/history/period", async (req, res) => {
  const HASS_ACCESS_TOKEN = await getSecret("HASS_ACCESS_TOKEN");
  const queryParams = querystring.stringify(req.query);

  axios
    .get(`${HASS_URL}/api/history/period?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${HASS_ACCESS_TOKEN}`,
      },
    })
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
});

module.exports = router;
