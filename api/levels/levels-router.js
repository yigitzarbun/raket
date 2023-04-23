const router = require("express").Router();
const levelsModel = require("./levels-model");

router.get("/", async (req, res, next) => {
  try {
    const levels = await levelsModel.getAll();
    res.status(200).json(levels);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
