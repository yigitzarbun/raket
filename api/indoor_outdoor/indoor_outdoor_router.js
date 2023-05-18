const router = require("express").Router();
const indoorOutdoorModel = require("./indoor_outdoor_model");

router.get("/", async (req, res, next) => {
  try {
    const indoorOutdoor = await indoorOutdoorModel.getAll();
    res.status(200).json(indoorOutdoor);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
