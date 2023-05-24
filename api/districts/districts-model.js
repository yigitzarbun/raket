const db = require("../../data/dbConfig");

async function getAll(req, res, next) {
  return await db("districts");
}

module.exports = { getAll };
