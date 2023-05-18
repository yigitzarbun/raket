const db = require("../../data/dbConfig");

async function getAll() {
  return await db("court_types");
}

module.exports = { getAll };
