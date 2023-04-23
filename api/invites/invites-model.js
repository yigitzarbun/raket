const db = require("../../data/dbConfig");

async function getAll() {
  const invites = await db("invites")
    .leftJoin("players", "players.player_id", "invites.invitee_id")
    .leftJoin("clubs", "clubs.club_id", "invites.club_id")
    .leftJoin("courts", "courts.court_id", "invites.court_id")
    .leftJoin("levels", "levels.level_id", "players.level_id")
    .leftJoin("genders", "genders.gender_id", "players.gender_id");

  return invites;
}

async function getByFilter(filter) {
  const invite = await db("invites").where(filter).first();
  return invite;
}

async function getById(invite_id) {
  const invite = await db("invites").where("invite_id", invite_id).first();
  return invite;
}

async function add(invite) {
  const inviteIdArray = await db("invites").insert(invite);
  const inviteId = inviteIdArray[0];
  const newinvite = await db("invites").where("invite_id", inviteId).first();
  return newinvite;
}

async function remove(invite_id) {
  return db("invites").where("invite_id", invite_id).del();
}

module.exports = { getAll, getByFilter, getById, add, remove };
