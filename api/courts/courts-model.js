const db = require("../../data/dbConfig");

async function getAll() {
  const courts = await db("courts").leftJoin(
    "clubs",
    "clubs.club_id",
    "courts.club_id"
  );
  return courts;
}

module.exports = { getAll };
