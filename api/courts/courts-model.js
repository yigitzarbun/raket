const db = require("../../data/dbConfig");

async function getAll() {
  const courts = await db("courts")
    .leftJoin("clubs", "clubs.club_id", "courts.club_id")
    .leftJoin(
      "court_types",
      "court_types.court_type_id",
      "courts.court_type_id"
    )
    .leftJoin(
      "indoor_outdoor",
      "indoor_outdoor.indoor_outdoor_id",
      "courts.indoor_outdoor_id"
    );
  return courts;
}

async function add(court) {
  const newCourtIdArray = await db("courts").insert(court);
  const id = newCourtIdArray[0];
  const newCourt = await db("courts").where("court_id", id).first();
  return newCourt;
}

async function update(court_id, changes) {
  return await db("courts").where("court_id", court_id).update(changes);
}

async function remove(court_id) {
  return await db("courts").where("court_id", court_id).del();
}
module.exports = { getAll, add, update, remove };
