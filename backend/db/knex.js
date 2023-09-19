const knex = require("knex");

const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "dashboard.sqlite",
  },
});

module.exports = connectedKnex;
