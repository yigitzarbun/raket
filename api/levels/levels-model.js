const db = require("../../data/dbConfig");

async function getAll() {
  const levels = await db("levels");
  return levels;
}

module.exports = { getAll };
