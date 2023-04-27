const router = require("express").Router();
const cardsModel = require("./cards-model");

router.get("/", async (req, res, next) => {
  try {
    const cards = await cardsModel.getAll();
    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newCard = await cardsModel.add(req.body);
    res.status(201).json(newCard);
  } catch (error) {
    next(error);
  }
});

router.delete("/:player_card_id", async (req, res, next) => {
  try {
    const deletedCard = await cardsModel.remove(req.params.player_card_id);
    res.status(200).json(deletedCard);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
