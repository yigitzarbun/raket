const db = require("../../data/dbConfig");

async function getAll() {
  const players = await db("players")
    .leftJoin("genders", "genders.gender_id", "players.gender_id")
    .leftJoin("levels", "levels.level_id", "players.level_id");
  return players;
}

async function getByFilter(filter) {
  const player = await db("players").where(filter).first();
  return player;
}

async function getById(player_id) {
  const player = await db("players").where("player_id", player_id);
  return player;
}

async function add(player) {
  const playerIdArray = await db("players").insert(player);
  const playerId = playerIdArray[0];
  const newPlayer = await db("players").where("player_id", playerId).first();
  return newPlayer;
}

async function update(updates) {
  return await db("players")
    .where("player_id", updates.player_id)
    .update(updates);
}

module.exports = {
  getAll,
  getByFilter,
  getById,
  add,
  update,
};
