require("dotenv").config();
const knex = require("../db/client");

const express = require("express");
const router = express.Router();

const axios = require("axios");
const querystring = require("querystring");

const getSecret = require("../secrets");

const HASS_URL = process.env.HASS_URL;

// Get all groups
router.get("/groups", async (req, res) => {
  const userId = req.auth.payload.sub;

  knex("hassGroup")
    .where({ userId })
    .select("*")
    .orderBy("index", "asc")
    .then((groups) => {
      res.status(200).json(groups);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Get group by id
router.get("/group/:id", async (req, res, next) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex("hassGroup")
    .where({ userId, id })
    .select("*")
    .first()
    .then((group) => {
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

  const maxIdx = await knex("hassGroup").max("index").where({ userId }).first();
  group.index = maxIdx.max !== null ? Number(maxIdx.max) + 1 : 0;

  knex("hassGroup")
    .insert({ ...group, userId })
    .returning("*")
    .then((group) => {
      res.status(201).json({ group });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Update group
router.patch("/group/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;
  const group = req.body;

  knex("hassGroup")
    .where({ userId, id })
    .update(group)
    .returning("*")
    .then((group) => {
      res.status(200).json({ group });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Delete group
router.delete("/group/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex("hassGroup")
    .where({ userId, id })
    .del()
    .then(() => {
      res.status(204).json({});
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Reorder groups
router.post("/groups/reorder", async (req, res) => {
  const userId = req.auth.payload.sub;
  const groups = req.body;

  knex.transaction((transaction) => {
    const queries = [];
    groups.forEach((group) => {
      const query = knex("hassGroup")
        .where({ userId, id: group.id })
        .update({ index: group.index })
        .transacting(transaction);
      queries.push(query);
    });

    Promise.all(queries).then(transaction.commit).catch(transaction.rollback);
  });
});

// Get cards
router.get("/cards", async (req, res) => {
  const userId = req.auth.payload.sub;
  const group = req.query.group;

  knex("hassCard")
    .where({ userId, group })
    .select("*")
    .orderBy("index", "asc")
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Get card
router.get("/card", async (req, res) => {
  const userId = req.auth.payload.sub;
  const entityId = req.query.entityId;

  knex("hassCard")
    .where({ userId, entityId })
    .select("*")
    .first()
    .then((card) => {
      res.status(200).json({ card });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Get card by id
router.get("/card/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex("hassCard")
    .where({ userId, id })
    .select("*")
    .first()
    .then((card) => {
      res.status(200).json({ card });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Create new card
router.post("/card", async (req, res) => {
  const userId = req.auth.payload.sub;
  const card = req.body;

  const maxIdx = await knex("hassCard")
    .max("index")
    .where({ userId, group: card.group })
    .first();
  card.index = maxIdx.max !== null ? Number(maxIdx.max) + 1 : 0;

  knex("hassCard")
    .insert({ ...card, userId })
    .returning("*")
    .then((card) => {
      res.status(201).json({ card });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Update card
router.patch("/card/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;
  const card = req.body;

  knex("hassCard")
    .where({ userId, id })
    .update(card)
    .then((card) => {
      res.status(200).json({ card });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Delete card
router.delete("/card/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex("hassCard")
    .where({ userId, id })
    .del()
    .then(() => {
      res.status(204).json({});
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Reorder cards
router.post("/cards/reorder", async (req, res) => {
  const userId = req.auth.payload.sub;
  const cards = req.body;

  knex.transaction((transaction) => {
    const queries = [];
    cards.forEach((card) => {
      const query = knex("hassCard")
        .where({ userId, id: card.id })
        .update({ index: card.index })
        .transacting(transaction);
      queries.push(query);
    });

    Promise.all(queries).then(transaction.commit).catch(transaction.rollback);
  });
});

// Get sensors
router.get("/sensors", async (req, res) => {
  const userId = req.auth.payload.sub;
  const card = req.query.card;

  knex("hassSensor")
    .where({ userId, card })
    .select("*")
    .orderBy("index", "asc")
    .then((sensors) => {
      res.status(200).json(sensors);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Get sensor by id
router.get("/sensor/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex("hassSensor")
    .where({ userId, id })
    .select("*")
    .first()
    .then((sensor) => {
      res.status(200).json({ sensor });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Create new sensor
router.post("/sensor", async (req, res) => {
  const userId = req.auth.payload.sub;
  const sensor = req.body;

  const maxIdx = await knex("hassSensor")
    .max("index")
    .where({ userId, card: sensor.card })
    .first();
  sensor.index = maxIdx.max !== null ? Number(maxIdx.max) + 1 : 0;

  knex("hassSensor")
    .insert({ ...sensor, userId })
    .returning("*")
    .then((sensor) => {
      res.status(201).json({ sensor });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Update sensor
router.patch("/sensor/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;
  const sensor = req.body;

  knex("hassSensor")
    .where({ userId, id })
    .update(sensor)
    .then((sensor) => {
      res.status(200).json({ sensor });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Delete sensor
router.delete("/sensor/:id", async (req, res) => {
  const userId = req.auth.payload.sub;
  const id = req.params.id;

  knex("hassSensor")
    .where({ userId, id })
    .del()
    .then(() => {
      res.status(204).json({});
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Reorder sensors
router.post("/sensors/reorder", async (req, res) => {
  const userId = req.auth.payload.sub;
  const sensors = req.body;

  knex.transaction((transaction) => {
    const queries = [];
    sensors.forEach((sensor) => {
      const query = knex("hassSensor")
        .where({ userId, id: sensor.id })
        .update({ index: sensor.index })
        .transacting(transaction);
      queries.push(query);
    });

    Promise.all(queries).then(transaction.commit).catch(transaction.rollback);
  });
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
