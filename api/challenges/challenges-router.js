const router = require("express").Router();
const challengesModel = require("./challenges-model");

router.get("/", async (req, res, next) => {
  try {
    const challenges = await challengesModel.getAll();
    res.status(200).json(challenges);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newChallenge = await challengesModel.add(req.body);
    res.status(201).json(newChallenge);
  } catch (error) {
    next(error);
  }
});

router.put("/:challenge_id", async (req, res, next) => {
  try {
    const changes = req.body;
    await challengesModel.update(changes.challenge_id, changes);
    const updatedChallenge = await challengesModel.getById(
      changes.challenge_id
    );
    res.status(200).json(updatedChallenge);
  } catch (error) {
    next(error);
  }
});

router.delete("/:challenge_id", async (req, res, next) => {
  try {
    const deletedChallenge = await challengesModel.remove(
      req.params.challenge_id
    );
    res.status(200).json(deletedChallenge);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
