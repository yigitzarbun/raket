const db = require("../../data/dbConfig");

async function getAll() {
  const clubs = await db("clubs");
  return clubs;
}

async function getByFilter(filter) {
  const club = await db("clubs").where(filter).first();
  return club;
}

async function getById(club_id) {
  const club = await db("clubs").where("club_id", club_id);
  return club;
}

async function add(club) {
  const clubIdArray = await db("clubs").insert(club);
  const clubId = clubIdArray[0];
  const newClub = await db("clubs").where("club_id", clubId).first();
  return newClub;
}

module.exports = { getAll, getByFilter, getById, add };
