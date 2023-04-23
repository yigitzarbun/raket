const router = require("express").Router();
const gendersModel = require("./genders-model");

router.get("/", async (req, res, next) => {
  try {
    const genders = await gendersModel.getAll();
    res.status(200).json(genders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
