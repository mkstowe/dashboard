const knex = require('../db/knex');

const express = require("express");
const router = express.Router();

const db = require("../db/dashboard");

// Get all plants
router.get("/", async (req, res) => {
  const userId = req.auth.payload.sub;

  knex('plant').where({ userId }).select('*').then((plants) => {
    res.status(200).json(plants);
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  })
});

// Get plant by id
router.get("/:id", async (req, res, next) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex('plant').where({ userId, id }).select('*').first().then((plant) => {
    res.status(200).json({ plant })
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  })
});

// Create new plant
router.post("/", async (req, res) => {
  const userId = req.auth.payload.sub;
  const plant = req.body;

  knex('plant').insert({...plant, userId}).returning('*').then((plant) => {
    res.status(201).json({ plant })
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
});

// Update plant
router.patch("/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;
  const plant = req.body;

  knex('plant').where({ userId, id }).update(plant).returning('*').then((plant) => {
    res.status(200).json({ plant })
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
});

// Delete plant
router.delete("/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex('plant').where({ userId, id }).del().then(() => {
    res.status(204).json({})
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
});

module.exports = router;
