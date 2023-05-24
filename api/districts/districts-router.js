const router = require("express").Router();
const districtsModel = require("./districts-model");

router.get("/", async (req, res, next) => {
  try {
    const districts = await districtsModel.getAll();
    res.status(200).json(districts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
