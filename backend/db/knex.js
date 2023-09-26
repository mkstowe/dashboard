const knex = require("knex");

const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "dashboard.sqlite",
  },
  pool: {
    afterCreate: function(conn, done) {
      conn.run("PRAGMA foreign_keys = ON");
      done();
    }
  }
});

module.exports = connectedKnex;
