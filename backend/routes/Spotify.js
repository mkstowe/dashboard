require('dotenv').config();

const express = require('express');
const router = express.Router();

const axios = require('axios');

var querystring = require('querystring');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

function generateRandomString(length) {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

/* -------------------------------------------------------------------------- */
/*                                Authorization                               */
/* -------------------------------------------------------------------------- */
//#region Authorization

router.get('/login', (req, res) => {
	const state = generateRandomString(16);
	res.cookie('spotify_auth_state', state);

	const scope =
		'user-read-private user-read-email user-modify-playback-state user-read-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative user-read-playback-position user-top-read user-read-recently-played user-library-read';

	const queryParams = querystring.stringify({
		client_id: CLIENT_ID,
		response_type: 'code',
		redirect_uri: REDIRECT_URI,
		state: state,
		scope: scope,
	});

	res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

router.get('/callback', (req, res) => {
	const code = req.query.code || null;

	// axios({
	// 	method: 'post',
	// 	url: 'https://accounts.spotify.com/api/token',
	// 	data: querystring.stringify({
	// 		grant_type: 'authorization_code',
	// 		code: code,
	// 		redirect_uri: REDIRECT_URI,
	// 	}),
	// 	headers: {
	// 		'content-type': 'application/x-www-form-urlencoded',
	// 		Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
	// 	},
	// })
	axios
		.post(
			'https://accounts.spotify.com/api/token',
			{
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: REDIRECT_URI,
			},
			{
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
				},
			}
		)
		.then((response) => {
			if (response.status === 200) {
				const { access_token, refresh_token, expires_in } = response.data;

				const queryParams = querystring.stringify({
					access_token,
					refresh_token,
					expires_in,
				});

				res.send(queryParams);
				res.redirect(`http://localhost:4200/music/?${queryParams}`);
			} else {
				res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
			}
		})
		.catch((error) => res.send(error));
});

router.get('/refresh_token', (req, res) => {
	const { refresh_token } = req.query;

	// axios({
	// 	method: 'post',
	// 	url: 'https://accounts.spotify.com/api/token',
	// 	data: querystring.stringify({
	// 		grant_type: 'refresh_token',
	// 		refresh_token: refresh_token,
	// 	}),
	// 	headers: {
	// 		'content-type': 'application/x-www-form-urlencoded',
	// 		Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
	// 	},
	// })
	axios
		.post(
			'https://accounts.spotify.com/api/token',
			{
				grant_type: 'refresh_token',
				refresh_token: refresh_token,
			},
			{
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
				},
			}
		)
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                   Albums                                   */
/* -------------------------------------------------------------------------- */
//#region Albums

/* -------------------------------- Get Album ------------------------------- */
router.get('/albums/:id', (req, res) => {});

/* --------------------------- Get Several Albums --------------------------- */
router.get('/albums/:ids', (req, res) => {});

/* ---------------------------- Get Album Tracks ---------------------------- */
router.get('/slbums/:id/tracks', (req, res) => {});

/* ------------------------- Get User's Saved Albums ------------------------ */
router.get('/me/albums', (req, res) => {});

/* ---------------------- Save Albums for Current User ---------------------- */
router.put('/me/albums/:ids', (req, res) => {});

/* ----------------------- Remove Users's Saved Albums ---------------------- */
router.delete('/me/albums/:ids', (req, res) => {});

/* ------------------------ Check User's Saved Albums ----------------------- */
router.get('/me/albums/contains/:id', (req, res) => {});

/* ---------------------------- Get New Releases ---------------------------- */
router.get('/browse/new-releases', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                   Artists                                  */
/* -------------------------------------------------------------------------- */
//#region Artists

/* ------------------------------- Get Artist ------------------------------- */
router.get('/artists/:id', (req, res) => {});

/* --------------------------- Get Several Artists -------------------------- */
router.get('/artists/:ids', (req, res) => {});

/* --------------------------- Get Artist's Albums -------------------------- */
router.get('/artists/:id/albums', (req, res) => {});

/* ------------------------- Get Artist's Top Tracks ------------------------ */
router.get('/artists/:id/top-tracks', (req, res) => {});

/* ---------------------- Get Artist's Related Artists ---------------------- */
router.get('/artists/:id/related-artists', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                 Audiobooks                                 */
/* -------------------------------------------------------------------------- */
//#region Audiobooks

/* ---------------------------- Get an Audiobook ---------------------------- */
router.get('/audiobooks/:id', (req, res) => {});

/* ------------------------- Get Several Audiobooks ------------------------- */
router.get('/audiobooks/:ids', (req, res) => {});

/* ------------------------- Get Audiobook Chapters ------------------------- */
router.get('/audiobooks/:id/chapters', (req, res) => {});

/* ----------------------- Get User's Saved Audiobooks ---------------------- */
router.get('/me/audiobooks', (req, res) => {});

/* -------------------- Save Audiobooks for Current User -------------------- */
router.put('/me/audiobooks/:ids', (req, res) => {});

/* --------------------- Remove User's Saved Audiobooks --------------------- */
router.delete('/me/audiobooks/:ids', (req, res) => {});

/* ---------------------- Check User's Saved Audiobooks --------------------- */
router.get('/me/audiobooks/contains/:ids', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                 Categories                                 */
/* -------------------------------------------------------------------------- */
//#region Categories

/* ---------------------- Get Several Browse Categories --------------------- */
router.get('/browse/categories', (req, res) => {});

/* ----------------------- Get Single Browse Category ----------------------- */
router.get('/browse/categories/:id', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                  Chapters                                  */
/* -------------------------------------------------------------------------- */
//#region Chapteres

/* ------------------------------ Get a Chapter ----------------------------- */
router.get('/chapters/:id', (req, res) => {});

/* -------------------------- Get Several Chapters -------------------------- */
router.get('/chapters', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                  Episodes                                  */
/* -------------------------------------------------------------------------- */
//#region Episodes

/* ------------------------------- Get Episode ------------------------------ */
router.get('/episodes/:id', (req, res) => {});

/* -------------------------- Get Several Episodes -------------------------- */
router.get('/episodes/:ids', (req, res) => {});

/* ------------------------ Get User's Saved Episodes ----------------------- */
router.get('/me/episodes', (req, res) => {});

/* --------------------- Save Episodes for Current User --------------------- */
router.put('/me/episodes/:ids', (req, res) => {});

/* ---------------------- Remove User's Saved Episodes ---------------------- */
router.delete('/me/episodes/:ids', (req, res) => {});

/* ----------------------- Check User's Saved Episodes ---------------------- */
router.get('/me/episodes/contains/:ids', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                   Genres                                   */
/* -------------------------------------------------------------------------- */
//#region Genres

/* ------------------------ Get Available Genre Seeds ----------------------- */
router.get('/recommendations/available-genre-seeds', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                   Markets                                  */
/* -------------------------------------------------------------------------- */
//#region Markets

/* -------------------------- Get Available Markets ------------------------- */
router.get('/markets', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                   Player                                   */
/* -------------------------------------------------------------------------- */
//#region Player

/* --------------------------- Get Playback State --------------------------- */
router.get('/me/player', (req, res) => {
	const { market, additional_types } = req.query;

	axios
		.get(`${SPOTIFY_API_URL}/me/player`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
			params: {
				...(market && { market }),
				...(additional_types && { additional_types }),
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* ---------------------------- Transfer Playback --------------------------- */
router.put('/me/player', async (req, res) => {
	const { device_ids, play } = req.body;

	axios
		.put(
			`${SPOTIFY_API_URL}/me/player`,
			{
				...(device_ids && { device_ids }),
				...(play && { play }),
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: req.headers.authorization,
				},
			}
		)
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* -------------------------- Get Available Devices ------------------------- */
router.get('/me/player/devices', (req, res) => {
	const { market, additional_types } = req.query;

	axios
		.get(`${SPOTIFY_API_URL}/me/player/devices`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
			params: {
				...(market && { market }),
				...(additional_types && { additional_types }),
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* ----------------------- Get Currently Playing Track ---------------------- */
router.get('/me/player/currently-playing', (req, res) => {
	const { market, additional_types } = req.query;

	axios
		.get(`${SPOTIFY_API_URL}/me/player/currently-playing`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
			params: {
				...(market && { market }),
				...(additional_types && { additional_types }),
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* -------------------------- Start/Resume Playback ------------------------- */
router.put('/me/player/play', (req, res) => {
	const { device_id, context_uri, uris, offset, position_ms } = req.body;

	axios
		.put(
			`${SPOTIFY_API_URL}/me/player/play`,
			{
				...(device_id && { device_id }),
				...(context_uri && { context_uri }),
				...(uris && { uris }),
				...(offset && { offset }),
				...(position_ms && { position_ms }),
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: req.headers.authorization,
				},
			}
		)
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* ----------------------------- Pause Playback ----------------------------- */
router.put('/me/player/pause', (req, res) => {
	const { device_id } = req.body;

	axios
		.put(
			`${SPOTIFY_API_URL}/me/player/pause`,
			{
				...(device_id && { device_id }),
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: req.headers.authorization,
				},
			}
		)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => res.send(error));
});

/* ------------------------------ Skip to Next ------------------------------ */
router.post('/me/player/next', (req, res) => {
	const { device_id } = req.body;

	axios
		.post(
			`${SPOTIFY_API_URL}/me/player/next`,
			{
				...(device_id && { device_id }),
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: req.headers.authorization,
				},
			}
		)
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* ---------------------------- Skip to Previous ---------------------------- */
router.post('/me/player/previous', (req, res) => {
	const { device_id } = req.body;

	axios
		.post(
			`${SPOTIFY_API_URL}/me/player/previous`,
			{
				...(device_id && { device_id }),
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: req.headers.authorization,
				},
			}
		)
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* ---------------------------- Seek to Position ---------------------------- */
router.put('/me/player/seek', (req, res) => {
	const { position_ms, device_id } = req.body;

	axios
		.put(`${SPOTIFY_API_URL}/me/player/seek`, null, {
			params: {
				position_ms,
				...(device_id && { device_id }),
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* ----------------------------- Set Repeat Mode ---------------------------- */
router.put('/me/player/repeat', (req, res) => {
	const { state, device_id } = req.body;

	axios
		.put(`${SPOTIFY_API_URL}/me/player/repeat`, null, {
			params: {
				state,
				...(device_id && { device_id }),
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* --------------------------- Set Playback Volume -------------------------- */
router.put('/me/player/volume', (req, res) => {
	const { volume_percent, device_id } = req.body;

	axios
		.put(`${SPOTIFY_API_URL}/me/player/volume`, null, {
			params: {
				volume_percent,
				...(device_id && { device_id }),
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* ------------------------- Toggle Playback Shuffle ------------------------ */
router.put('/me/player/shuffle', (req, res) => {
	const { state, device_id } = req.body;

	axios
		.put(`${SPOTIFY_API_URL}/me/player/shuffle`, null, {
			params: {
				state,
				...(device_id && { device_id }),
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* ----------------------- Get Recently Played Tracks ----------------------- */
router.get('/me/player/recently-played', (req, res) => {
	const { limit, after, before } = req.query;

	axios
		.get(`${SPOTIFY_API_URL}/me/player/recently-played`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
			params: {
				...(limit && { limit }),
				...(after && { after }),
				...(before && { before }),
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* -------------------------- Get the User's Queue -------------------------- */
router.get('/me/player/queue', (req, res) => {
	axios
		.get(`${SPOTIFY_API_URL}/me/player/queue`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* ----------------------- Add Item to Playback Queue ----------------------- */
router.post('/me/player/queue', (req, res) => {
	const { uri, device_id } = req.body;

	axios
		.post(`${SPOTIFY_API_URL}/me/player/queue`, null, {
			params: {
				uri,
				...(device_id && { device_id }),
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                  Playlists                                 */
/* -------------------------------------------------------------------------- */
//#region Playlists

/* ------------------------------ Get Playlist ------------------------------ */
router.get('/playlists/:id', (req, res) => {
	const { market, fields, additional_types } = req.query;

	axios
		.get(`${SPOTIFY_API_URL}/playlists/${req.params.id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
			params: {
				...(market && { market }),
				...(fields && { fields }),
				...(additional_types && { additional_types }),
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* ------------------------- Change Playlist Details ------------------------ */
router.put('/playlists/:id', (req, res) => {});

/* --------------------------- Get Playlist Items --------------------------- */
router.get('/playlists/:id/tracks', (req, res) => {});

/* -------------------------- Update Playlist Items ------------------------- */
router.put('/playlists/:id/tracks', (req, res) => {});

/* -------------------------- Add Items to Playlist ------------------------- */
router.post('/playlists/:id/tracks', (req, res) => {});

/* -------------------------- Remove Playlist Items ------------------------- */
router.delete('/playlists/:id/tracks', (req, res) => {});

/* ---------------------- Get Current User's Playlists ---------------------- */
router.get('/me/playlists', (req, res) => {
	const { limit, offset } = req.query;

	axios
		.get(`${SPOTIFY_API_URL}/me/playlists`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
			params: {
				...(limit && { limit }),
				...(offset && { offset }),
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* -------------------------- Get User's Playlists -------------------------- */
router.get('/users/:id/playlists', (req, res) => {});

/* ----------------------------- Create Playlist ---------------------------- */
router.post('/users/:id/playlists', (req, res) => {});

/* ------------------------- Get Featured Playlists ------------------------- */
router.get('/browse/featured-playlists', (req, res) => {});

/* ------------------------ Get Category's Playlists ------------------------ */
router.get('/browse/categories/:id/playlists', (req, res) => {});

/* ------------------------ Get Playlist Cover Image ------------------------ */
router.get('/playlists/:id/images', (req, res) => {});

/* --------------------- Add Custom Playlist Cover Image -------------------- */
router.put('/playlists/:id/images', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                   Search                                   */
/* -------------------------------------------------------------------------- */
//#region Search

/* ----------------------------- Search for Item ---------------------------- */
router.get('/search', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                    Shows                                   */
/* -------------------------------------------------------------------------- */
//#region Shows

/* -------------------------------- Get Show -------------------------------- */
router.get('/shows/:id', (req, res) => {});

/* ---------------------------- Get Several Shows --------------------------- */
router.get('/shows', (req, res) => {});

/* ---------------------------- Get Show Episodes --------------------------- */
router.get('/shows/:id/episodes', (req, res) => {});

/* ------------------------- Get User's Saved Shows ------------------------- */
router.get('/me/shows', (req, res) => {});

/* ----------------------- Save Shows for Current User ---------------------- */
router.put('/me/shows', (req, res) => {});

/* ------------------------ Remove User's Saved Shows ----------------------- */
router.delete('/me/shows', (req, res) => {});

/* ------------------------ Check User's Saved Shows ------------------------ */
router.get('/me/shows/contains', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                   Tracks                                   */
/* -------------------------------------------------------------------------- */
//#region Tracks

/* -------------------------------- Get Track ------------------------------- */
router.get('/tracks/:id', (req, res) => {});

/* --------------------------- Get Several Tracks --------------------------- */
router.get('/tracks', (req, res) => {});

/* ------------------------- Get User's Saved Tracks ------------------------ */
router.get('/me/tracks', (req, res) => {});

/* ---------------------- Save Tracks for Current User ---------------------- */
router.put('/me/tracks', (req, res) => {});

/* ----------------------- Remove User's Saved Tracks ----------------------- */
router.delete('/me/tracks', (req, res) => {});

/* ------------------------ Check User's Saved Tracks ----------------------- */
router.get('/me/tracks/contains', (req, res) => {});

/* ----------------------- Get Tracks' Audio Features ----------------------- */
router.get('/audio-features', (req, res) => {});

/* ----------------------- Get Track's Audio Features ----------------------- */
router.get('/audio-features/:id', (req, res) => {});

/* ----------------------- Get Track's Audio Analysis ----------------------- */
router.get('/audio-analysis/:id', (req, res) => {});

/* --------------------------- Get Recommendations -------------------------- */
router.get('/recommendations', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */
/*                                    Users                                   */
/* -------------------------------------------------------------------------- */
//#region Users

/* ----------------------- Get Current User's Profile ----------------------- */
router.get('/me', (req, res) => {
	axios
		.get(`${SPOTIFY_API_URL}/me`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* -------------------------- Get User's Top Items -------------------------- */
router.get('/me/top/:type', (req, res) => {
	const { time_range, limit, offset } = req.query;

	axios
		.get(`${SPOTIFY_API_URL}/me/top/${req.params.type}`, {
			params: {
				...(time_range && { time_range }),
				...(limit && { limit }),
				...(offset && { offset }),
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: req.headers.authorization,
			},
		})
		.then((response) => res.send(response.data))
		.catch((error) => res.send(error));
});

/* --------------------------- Get User's Profile --------------------------- */
router.get('/users/:id', (req, res) => {});

/* ----------------------------- Follow Playlist ---------------------------- */
router.put('/playlists/:id/followers', (req, res) => {});

/* ---------------------------- Unfollow Playlist --------------------------- */
router.delete('/playlists/:id/followers', (req, res) => {});

/* -------------------------- Get Followed Artists -------------------------- */
router.get('/me/following', (req, res) => {});

/* ------------------------- Follow Artists or Users ------------------------ */
router.put('/me/following', (req, res) => {});

/* ------------------------ Unfollow Artists or Users ----------------------- */
router.delete('/me/following', (req, res) => {});

/* ----------------- Check if User Follows Artists or Users ----------------- */
router.get('/me/following/contains', (req, res) => {});

/* --------------------- Check if Users Follow Playlist --------------------- */
router.get('/playlists/:id/followers/contains', (req, res) => {});

//#endregion

/* -------------------------------------------------------------------------- */

module.exports = router;
