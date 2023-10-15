const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const checkJwt = require("./jwt");
app.use((req, res, next) => {
  if (req.originalUrl.includes('/api/spotify/login') || req.originalUrl.includes('/api/spotify/callback')) {
    next();
  } else {
    checkJwt(req, res, next);
  }
});

const hassRoute = require("./routes/Hass");
const spotifyRoute = require("./routes/Spotify");
const plantsRoute = require("./routes/Plants");
const recipesRoute = require("./routes/Recipes");
app.use("/api/hass", hassRoute);
app.use("/api/spotify", spotifyRoute);
app.use("/api/plants", plantsRoute);
app.use("/api/recipes", recipesRoute);

const demo = require("./db/init_demo");
demo.initDemoData();

const ALLOWED_ORIGINS = [
  "http://localhost:4200",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://dash.mkstowe.com",
  "https://mkstowe.com",
];

// handling CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

module.exports = app;
