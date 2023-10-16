const knex = require('knex')
const config = require('./knexfile');
const client = knex(config);

module.exports = client;