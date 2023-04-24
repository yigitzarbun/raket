const db = require("../../data/dbConfig");

async function getAll() {
  const invites = await db("invites")
    .leftJoin("players as invitee", "invitee.player_id", "invites.invitee_id")
    .leftJoin("players as inviter", "inviter.player_id", "invites.inviter_id")
    .leftJoin("clubs", "clubs.club_id", "invites.club_id")
    .leftJoin("courts", "courts.court_id", "invites.court_id")
    .leftJoin(
      "levels as invitee_level",
      "invitee_level.level_id",
      "invitee.level_id"
    )
    .leftJoin(
      "levels as inviter_level",
      "inviter_level.level_id",
      "inviter.level_id"
    )
    .leftJoin(
      "genders as invitee_gender",
      "invitee_gender.gender_id",
      "invitee.gender_id"
    )
    .leftJoin(
      "genders as inviter_gender",
      "inviter_gender.gender_id",
      "inviter.gender_id"
    );
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
