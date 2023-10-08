require("dotenv").config();
const knex = require('../db/knex');

const express = require("express");
const router = express.Router();

const axios = require("axios");
const querystring = require("querystring");

const getSecret = require("../secrets");

const HASS_URL = process.env.HASS_URL;

// Get all groups
router.get("/group", async (req, res) => {
  const userId = req.auth.payload.sub;

  knex('hassGroup').where({ userId }).select('*').then((groups => {
    res.status(200).json(groups);
  }))
  .catch((error) => {
    res.status(500).json({ error: error.message})
  })
});

// Get group by id
router.get("/group/:id", async (req, res, next) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex('hassGroup').where({ userId, id }).select('*').first().then((group) => {
    res.status(200).json({ group });
  })
  .catch((error) => {
    res.status(500).json({ error: error.message });
  });
});

// Create new group
router.post("/group", async (req, res) => {
  const userId = req.auth.payload.sub;
  const group = req.body;

  knex('hassGroup').insert({...group, userId}).returning('*').then((group) => {
    res.status(201).json({ group })
  }).catch((error) => {
    res.status(500).json({ error: error.message})
  })
});

// Update group
router.patch("/group/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;
  const group = req.body;

  knex('hassGroup').where({ userId, id }).update(group).returning('*').then((group) => {
    res.status(200).json({ group });
  })
  .catch((error) => {
    res.status(500).json({error: error.message})
  })
});

// Delete group
router.delete("/group/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex('hassGroup').where({ userId, id }).del().then(() => {
    res.status(204).json({})
  }).catch((error) => {
    res.status(500).json({error: error.message});
  })
});

// Get cards
router.get("/card", async (req, res) => {
  const userId = req.auth.payload.sub;
  const group = req.query.group;

  knex('hassCard').where({ userId, group }).select('*').then((cards) => {
    res.status(200).json(cards);
  }).catch((error) => {
    res.status(500).json({error: error.message});
  })
});

// Get card by id
router.get("/card/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex('hassCard').where({ userId, id }).select('*').first().then((card) => {
    res.status(200).json({ card });
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
});

// Create new card
router.post("/card", async (req, res) => {
  const userId = req.auth.payload.sub;
  const card = req.body;

  knex('hassCard').insert({ ...card, userId }).returning('*').then((card) => {
    res.status(201).json({ card });
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
});

// Update card
router.patch("/card/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;
  const card = req.body;

  knex('hassCard').where({ userId, id }).update(card).then((card) => {
    res.status(200).json({ card })
  }).catch
  ((error) => {
    res.status(500).json({ error: error.message });
  })
});

// Delete card
router.delete("/card/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex('hassCard').where({ userId, id }).del().then(() => {
    res.status(204).json({})
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
});

// Get sensors
router.get("/sensor", async (req, res) => {
  const userId = req.auth.payload.sub;
  const card = req.query.card;

  knex('hassSensor').where({ userId, card }).select('*').then((sensors) => {
    res.status(200).json(sensors);
  }).catch
  ((error) => {
    res.status(500).json({ error: error.message })
  })
});

// Get sensor by id
router.get("/sensor/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex('hassSensor').where({ userId, id }).select('*').first().then((sensor) => {
    res.status(200).json({ sensor })
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
});

// Create new sensor
router.post("/sensor", async (req, res) => {
  const userId = req.auth.payload.sub;
  const sensor = req.body;

  knex('hassSensor').insert({ ...sensor, userId }).returning('*').then((sensor) => {
    res.status(201).json({ sensor })
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
});

// Update sensor
router.patch("/sensor/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;
  const sensor = req.body;

  knex('hassSensor').where({ userId, id }).update(sensor).then((sensor) => {
    res.status(200).json({ sensor })
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
});

// Delete sensor
router.delete("/sensor/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex('hassSensor').where({ userId, id }).del().then(() => {
    res.status(204).json({})
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
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
