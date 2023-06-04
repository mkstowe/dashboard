const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const spotifyRoute = require("./routes/Spotify");
const plantsRoute = require("./routes/Plants");
app.use("/spotify", spotifyRoute);
app.use("/plants", plantsRoute);

const ALLOWED_ORIGINS = [
  "http://localhost:4200",
  "http://localhost:3000",
  "http://localhost:3001",
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
