require("dotenv").config();

const express = require('express');
const router = express.Router();

const axios = require("axios");
const querystring = require("querystring");

const getSecret = require("../secrets");

const HASS_URL = process.env.HASS_URL;

router.get("/history/period", async (req, res) => {
  const HASS_ACCESS_TOKEN = await getSecret('HASS_ACCESS_TOKEN');
  const queryParams = querystring.stringify(req.query);

  axios.get(`${HASS_URL}/api/history/period?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${HASS_ACCESS_TOKEN}`,
    },
  }).then((response) => res.send(response.data))
  .catch((error) => res.send(error));
});

module.exports = router;
