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

module.exports = { getAll, add };
