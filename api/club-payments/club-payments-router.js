const router = require("express").Router();
const clubPaymentsModel = require("./club-payments-model");

router.get("/", async (req, res, next) => {
  try {
    const payments = await clubPaymentsModel.getAll();
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newPayment = await clubPaymentsModel.add(req.body);
    res.status(201).json(newPayment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
