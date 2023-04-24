const router = require("express").Router();
const courtsModel = require("./courts-model");

router.get("/", async (req, res, next) => {
  try {
    const courts = await courtsModel.getAll();
    res.status(200).json(courts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
