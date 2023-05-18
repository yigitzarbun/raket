const router = require("express").Router();
const courtTypesModel = require("./court_types_model");

router.get("/", async (req, res, next) => {
  try {
    const courtTypes = await courtTypesModel.getAll();
    res.status(200).json(courtTypes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
