const db = require("../../data/dbConfig");

async function getAll() {
  return await db("indoor_outdoor");
}

module.exports = { getAll };
