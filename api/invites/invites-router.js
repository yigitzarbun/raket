const router = require("express").Router();
const invitesModel = require("./invites-model");

router.get("/", async (req, res, next) => {
  try {
    const invites = await invitesModel.getAll();
    res.status(200).json(invites);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const club = await invitesModel.getById(req.params.id);
    res.status(200).json(club);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const invite = await invitesModel.add(req.body);
    res.status(201).json(invite);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await invitesModel.remove(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
});

router.put("/:invite_id", async (req, res, next) => {
  try {
    const updates = req.body;
    await invitesModel.update(updates.invite_id, updates);
    const updatedInvite = invitesModel.getById(updates.invite_id);
    res.status(201).json(updatedInvite);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
