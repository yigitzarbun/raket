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

router.post("/", async (req, res, next) => {
  try {
    const newCourt = await courtsModel.add(req.body);
    res.status(201).json(newCourt);
  } catch (error) {
    next(error);
  }
});

router.delete("/:court_id", async (req, res, next) => {
  try {
    const deletedCourt = await courtsModel.remove(req.params.court_id);
    res.status(200).json(deletedCourt);
  } catch (error) {
    next(error);
  }
});

router.put("/:court_id", async (req, res, next) => {
  try {
    console.log(req.body);
    const updates = req.body;
    const updatedCourt = await courtsModel.update(updates.court_id, updates);
    res.status(200).json(updatedCourt);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
