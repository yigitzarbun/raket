const db = require("../../data/dbConfig");

async function getAll() {
  const challenges = await db("challenges")
    .leftJoin(
      "players as challengee",
      "challengee.player_id",
      "challenges.challengee_id"
    )
    .leftJoin(
      "players as challenger",
      "challenger.player_id",
      "challenges.challenger_id"
    )
    .leftJoin("clubs", "clubs.club_id", "challenges.club_id")
    .leftJoin("courts", "courts.court_id", "challenges.court_id")
    .leftJoin(
      "levels as challengee_level",
      "challengee_level.level_id",
      "challengee.level_id"
    )
    .leftJoin(
      "levels as challenger_level",
      "challenger_level.level_id",
      "challenger.level_id"
    )
    .leftJoin(
      "genders as challengee_gender",
      "challengee_gender.gender_id",
      "challengee.gender_id"
    )
    .leftJoin(
      "genders as challenger_gender",
      "challenger_gender.gender_id",
      "challenger.gender_id"
    );
  return challenges;
}

async function getById(challenge_id) {
  return await db("challenges").where("challenge_id", challenge_id).first();
}

async function getByFilter(filter) {
  return await db("challenges").where(filter).first();
}

async function add(challenge) {
  const newChallengeIdArray = await db("challenges").insert(challenge);
  const id = newChallengeIdArray[0];
  const newChallenge = await db("challenges").where("challenge_id", id).first();
  return newChallenge;
}

async function update(challenge_id, updates) {
  return await db("challenges")
    .where("challenge_id", challenge_id)
    .update(updates);
}

async function remove(challenge_id) {
  return await db("challenges").where("challenge_id", challenge_id).del();
}

module.exports = { getAll, getById, getByFilter, add, update, remove };
