const db = require("../../data/dbConfig");

async function getAll() {
  const cards = await db("player_cards");
  return cards;
}

async function add(card) {
  const newCardIdArray = await db("player_cards").insert(card);
  const cardId = newCardIdArray[0];
  const newCard = await db("player_cards")
    .where("player_card_id", cardId)
    .first();
  return newCard;
}

async function remove(player_card_id) {
  return await db("player_cards").where("player_card_id", player_card_id).del();
}

module.exports = { getAll, add, remove };
