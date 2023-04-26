require('dotenv').config();

const express = require('express');
const app = express();

const axios = require('axios');
var querystring = require('querystring');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

function generateRandomString(length) {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

// handling CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

const stateKey = 'spotify_auth_state';
app.get('/spotify/login', (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);

	const scope = 'user-read-private user-read-email';

	const queryParams = querystring.stringify({
		client_id: CLIENT_ID,
		response_type: 'code',
		redirect_uri: REDIRECT_URI,
		state: state,
		scope: scope,
	});

	res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/spotify/callback', (req, res) => {
	const code = req.query.code || null;

	axios({
		method: 'post',
		url: 'https://accounts.spotify.com/api/token',
		data: querystring.stringify({
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: REDIRECT_URI,
		}),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
		},
	})
		.then((response) => {
			if (response.status === 200) {
				const { access_token, refresh_token, expires_in } = response.data;

				const queryParams = querystring.stringify({
					access_token,
					refresh_token,
					expires_in
				});

				res.redirect(`http://localhost:4200/music/?${queryParams}`);
			} else {
				res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
			}
		})
		.catch((error) => {
			res.send(error);
		});
});

app.get('/spotify/refresh_token', (req, res) => {
	const { refresh_token } = req.query;

	axios({
		method: 'post',
		url: 'https://accounts.spotify.com/api/token',
		data: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token: refresh_token,
		}),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
		},
	})
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
