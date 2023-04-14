const router = require("express").Router();
const playersModel = require("./players-model");

router.get("/", async (req, res, next) => {
  try {
    const players = await playersModel.getAll();
    res.status(200).json(players);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const player = await playersModel.getById(req.params.id);
    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
