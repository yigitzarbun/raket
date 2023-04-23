const db = require("../../data/dbConfig");

async function getAll() {
  const genders = await db("genders");
  return genders;
}

module.exports = { getAll };
