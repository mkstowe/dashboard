const getSecret = require("../secrets");

const config = {
  client: "cockroachdb",
  connection: async () => await getSecret("DATABASE_URL"),
  migration: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

module.exports = config;
