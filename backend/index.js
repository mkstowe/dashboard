require('dotenv').config();

const express = require('express');
const app = express();

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

// handling CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

/* -------------------------------------------------------------------------- */
/*                                Authorization                               */
/* -------------------------------------------------------------------------- */

app.get('/login', (req, res) => {
	const state = generateRandomString(16);
	res.cookie('spotify_auth_state', state);

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

app.get('/callback', (req, res) => {
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
					expires_in,
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

app.get('/refresh_token', (req, res) => {
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

/* -------------------------------------------------------------------------- */
/*                                   Albums                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Get Album ------------------------------- */
app.get('/albums/:id', (req, res) => {});

/* --------------------------- Get Several Albums --------------------------- */
app.get('/albums/:ids', (req, res) => {});

/* ---------------------------- Get Album Tracks ---------------------------- */
app.get('/slbums/:id/tracks', (req, res) => {});

/* ------------------------- Get User's Saved Albums ------------------------ */
app.get('/me/albums', (req, res) => {});

/* ---------------------- Save Albums for Current User ---------------------- */
app.put('/me/albums/:ids', (req, res) => {});

/* ----------------------- Remove Users's Saved Albums ---------------------- */
app.delete('/me/albums/:ids', (req, res) => {});

/* ------------------------ Check User's Saved Albums ----------------------- */
app.get('/me/albums/contains/:id', (req, res) => {});

/* ---------------------------- Get New Releases ---------------------------- */
app.get('/browse/new-releases', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                   Artists                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Get Artist ------------------------------- */
app.get('/artists/:id', (req, res) => {});

/* --------------------------- Get Several Artists -------------------------- */
app.get('/artists/:ids', (req, res) => {});

/* --------------------------- Get Artist's Albums -------------------------- */
app.get('/artists/:id/albums', (req, res) => {});

/* ------------------------- Get Artist's Top Tracks ------------------------ */
app.get('/artists/:id/top-tracks', (req, res) => {});

/* ---------------------- Get Artist's Related Artists ---------------------- */
app.get('/artists/:id/related-artists', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                 Audiobooks                                 */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Get an Audiobook ---------------------------- */
app.get('/audiobooks/:id', (req, res) => {});

/* ------------------------- Get Several Audiobooks ------------------------- */
app.get('/audiobooks/:ids', (req, res) => {});

/* ------------------------- Get Audiobook Chapters ------------------------- */
app.get('/audiobooks/:id/chapters', (req, res) => {});

/* ----------------------- Get User's Saved Audiobooks ---------------------- */
app.get('/me/audiobooks', (req, res) => {});

/* -------------------- Save Audiobooks for Current User -------------------- */
app.put('/me/audiobooks/:ids', (req, res) => {});

/* --------------------- Remove User's Saved Audiobooks --------------------- */
app.delete('/me/audiobooks/:ids', (req, res) => {});

/* ---------------------- Check User's Saved Audiobooks --------------------- */
app.get('/me/audiobooks/contains/:ids', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                 Categories                                 */
/* -------------------------------------------------------------------------- */

/* ---------------------- Get Several Browse Categories --------------------- */
app.get('/browse/categories', (req, res) => {});

/* ----------------------- Get Single Browse Category ----------------------- */
app.get('/browse/categories/:id', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                  Chapters                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Get a Chapter ----------------------------- */
app.get('/chapters/:id', (req, res) => {});

/* -------------------------- Get Several Chapters -------------------------- */
app.get('/chapters', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                  Episodes                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Get Episode ------------------------------ */
app.get('/episodes/:id', (req, res) => {});

/* -------------------------- Get Several Episodes -------------------------- */
app.get('/episodes/:ids', (req, res) => {});

/* ------------------------ Get User's Saved Episodes ----------------------- */
app.get('/me/episodes', (req, res) => {});

/* --------------------- Save Episodes for Current User --------------------- */
app.put('/me/episodes/:ids', (req, res) => {});

/* ---------------------- Remove User's Saved Episodes ---------------------- */
app.delete('/me/episodes/:ids', (req, res) => {});

/* ----------------------- Check User's Saved Episodes ---------------------- */
app.get('/me/episodes/contains/:ids', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                   Genres                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------ Get Available Genre Seeds ----------------------- */
app.get('/recommendations/available-genre-seeds', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                   Markets                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------- Get Available Markets ------------------------- */
app.get('/markets', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                   Player                                   */
/* -------------------------------------------------------------------------- */

/* --------------------------- Get Playback State --------------------------- */
app.get('/me/player', (req, res) => {});

/* ---------------------------- Transfer Playback --------------------------- */
app.put('/me/player', (req, res) => {});

/* -------------------------- Get Available Devices ------------------------- */
app.get('/me/player/devices', (req, res) => {});

/* ----------------------- Get Currently Playing Track ---------------------- */
app.get('/me/player/currently-playing', (req, res) => {});

/* -------------------------- Start/Resume Playback ------------------------- */
app.put('/me/player/play', (req, res) => {});

/* ----------------------------- Pause Playback ----------------------------- */
app.put('/me/player/pause', (req, res) => {});

/* ------------------------------ Skip to Next ------------------------------ */
app.post('/me/player/next', (req, res) => {});

/* ---------------------------- Skip to Previous ---------------------------- */
app.post('/me/player/previous', (req, res) => {});

/* ---------------------------- Seek to Position ---------------------------- */
app.put('/me/player/seek', (req, res) => {});

/* ----------------------------- Set Repeat Mode ---------------------------- */
app.put('/me/player/repeat', (req, res) => {});

/* --------------------------- Set Playback Volume -------------------------- */
app.put('/me/player/volume', (req, res) => {});

/* ------------------------- Toggle Playback Shuffle ------------------------ */
app.put('/me/player/shuffle', (req, res) => {});

/* ----------------------- Get Recently Played Tracks ----------------------- */
app.get('/me/player/recently-played', (req, res) => {});

/* -------------------------- Get the User's Queue -------------------------- */
app.get('/me/player/queue', (req, res) => {});

/* ----------------------- Add Item to Playback Queue ----------------------- */
app.post('/me/player/queue', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                  Playlists                                 */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Get Playlist ------------------------------ */
app.get('/playlists/:id', (req, res) => {
	const { market, fields, additional_types } = req.query;
	
	axios
		.get(`${SPOTIFY_API_URL}/playlists/${req.params.id}`, {
			headers: { Authorization: req.headers.authorization },
			params: {
				...(market && { market }),
				...(fields && { fields }),
				...(additional_types && { additional_types }),
			},
		})
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

/* ------------------------- Change Playlist Details ------------------------ */
app.put('/playlists/:id', (req, res) => {});

/* --------------------------- Get Playlist Items --------------------------- */
app.get('/playlists/:id/tracks', (req, res) => {});

/* -------------------------- Update Playlist Items ------------------------- */
app.put('/playlists/:id/tracks', (req, res) => {});

/* -------------------------- Add Items to Playlist ------------------------- */
app.post('/playlists/:id/tracks', (req, res) => {});

/* -------------------------- Remove Playlist Items ------------------------- */
app.delete('/playlists/:id/tracks', (req, res) => {});

/* ---------------------- Get Current User's Playlists ---------------------- */
app.get('/me/playlists', (req, res) => {
	const { limit, offset } = req.query;

	axios
		.get(`${SPOTIFY_API_URL}/me/playlists`, {
			headers: { Authorization: req.headers.authorization },
			params: {
				...(limit && { limit }),
				...(offset && { offset }),
			},
		})
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

/* -------------------------- Get User's Playlists -------------------------- */
app.get('/users/:id/playlists', (req, res) => {});

/* ----------------------------- Create Playlist ---------------------------- */
app.post('/users/:id/playlists', (req, res) => {});

/* ------------------------- Get Featured Playlists ------------------------- */
app.get('/browse/featured-playlists', (req, res) => {});

/* ------------------------ Get Category's Playlists ------------------------ */
app.get('/browse/categories/:id/playlists', (req, res) => {});

/* ------------------------ Get Playlist Cover Image ------------------------ */
app.get('/playlists/:id/images', (req, res) => {});

/* --------------------- Add Custom Playlist Cover Image -------------------- */
app.put('/playlists/:id/images', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                   Search                                   */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Search for Item ---------------------------- */
app.get('/search', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                    Shows                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Get Show -------------------------------- */
app.get('/shows/:id', (req, res) => {});

/* ---------------------------- Get Several Shows --------------------------- */
app.get('/shows', (req, res) => {});

/* ---------------------------- Get Show Episodes --------------------------- */
app.get('/shows/:id/episodes', (req, res) => {});

/* ------------------------- Get User's Saved Shows ------------------------- */
app.get('/me/shows', (req, res) => {});

/* ----------------------- Save Shows for Current User ---------------------- */
app.put('/me/shows', (req, res) => {});

/* ------------------------ Remove User's Saved Shows ----------------------- */
app.delete('/me/shows', (req, res) => {});

/* ------------------------ Check User's Saved Shows ------------------------ */
app.get('/me/shows/contains', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                   Tracks                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Get Track ------------------------------- */
app.get('/tracks/:id', (req, res) => {});

/* --------------------------- Get Several Tracks --------------------------- */
app.get('/tracks', (req, res) => {});

/* ------------------------- Get User's Saved Tracks ------------------------ */
app.get('/me/tracks', (req, res) => {});

/* ---------------------- Save Tracks for Current User ---------------------- */
app.put('/me/tracks', (req, res) => {});

/* ----------------------- Remove User's Saved Tracks ----------------------- */
app.delete('/me/tracks', (req, res) => {});

/* ------------------------ Check User's Saved Tracks ----------------------- */
app.get('/me/tracks/contains', (req, res) => {});

/* ----------------------- Get Tracks' Audio Features ----------------------- */
app.get('/audio-features', (req, res) => {});

/* ----------------------- Get Track's Audio Features ----------------------- */
app.get('/audio-features/:id', (req, res) => {});

/* ----------------------- Get Track's Audio Analysis ----------------------- */
app.get('/audio-analysis/:id', (req, res) => {});

/* --------------------------- Get Recommendations -------------------------- */
app.get('/recommendations', (req, res) => {});

/* -------------------------------------------------------------------------- */
/*                                    Users                                   */
/* -------------------------------------------------------------------------- */

/* ----------------------- Get Current User's Profile ----------------------- */
app.get('/me', (req, res) => {
	axios({
		method: 'get',
		url: `${SPOTIFY_API_URL}/me`,
		headers: {
			Authorization: req.headers.authorization,
		},
	})
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

/* -------------------------- Get User's Top Items -------------------------- */
app.get('/me/:type', (req, res) => {});

/* --------------------------- Get User's Profile --------------------------- */
app.get('/users/:id', (req, res) => {});

/* ----------------------------- Follow Playlist ---------------------------- */
app.put('/playlists/:id/followers', (req, res) => {});

/* ---------------------------- Unfollow Playlist --------------------------- */
app.delete('/playlists/:id/followers', (req, res) => {});

/* -------------------------- Get Followed Artists -------------------------- */
app.get('/me/following', (req, res) => {});

/* ------------------------- Follow Artists or Users ------------------------ */
app.put('/me/following', (req, res) => {});

/* ------------------------ Unfollow Artists or Users ----------------------- */
app.delete('/me/following', (req, res) => {});

/* ----------------- Check if User Follows Artists or Users ----------------- */
app.get('/me/following/contains', (req, res) => {});

/* --------------------- Check if Users Follow Playlist --------------------- */
app.get('/playlists/:id/followers/contains', (req, res) => {});

/* -------------------------------------------------------------------------- */

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
