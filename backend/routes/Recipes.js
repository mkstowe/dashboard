require("dotenv").config();

const express = require("express");
const router = express.Router();

const axios = require("axios");

var querystring = require("querystring");

const MEALIE_URL = process.env.MEALIE_URL;
const MEALIE_ACCESS_TOKEN = process.env.MEALIE_ACCESS_TOKEN;

router.get("/", (req, res) => {
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

router.get("/:slug", (req, res) => {
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
