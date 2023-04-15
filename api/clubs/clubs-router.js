const router = require("express").Router();
const clubsModel = require("./clubs-model");

router.get("/", async (req, res, next) => {
  try {
    const clubs = await clubsModel.getAll();
    res.status(200).json(clubs);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const club = await clubsModel.getById(req.params.id);
    res.status(200).json(club);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
