require("dotenv").config();

const express = require("express");
const router = express.Router();

const axios = require("axios");
const querystring = require("querystring");

const getSecret = require('../secrets');

const MEALIE_URL = process.env.MEALIE_URL;

router.get("/", async (req, res) => {
  const MEALIE_ACCESS_TOKEN = await getSecret('MEALIE_ACCESS_TOKEN');
	const queryParams = querystring.stringify(req.query);

	axios
		.get(`${MEALIE_URL}/api/recipes?${queryParams}`, {
			headers: {
				Authorization: `Bearer ${MEALIE_ACCESS_TOKEN}`,
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

router.get("/:slug", async (req, res) => {
  const MEALIE_ACCESS_TOKEN = await getSecret('MEALIE_ACCESS_TOKEN');
  
	axios
		.get(`${MEALIE_URL}/api/recipes/${req.params.slug}`, {
			headers: {
				Authorization: `Bearer ${MEALIE_ACCESS_TOKEN}`,
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

module.exports = router;
