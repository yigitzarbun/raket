const router = require("express").Router();
const paymentsModel = require("./payments-model");

router.get("/", async (req, res, next) => {
  try {
    const payments = await paymentsModel.getAll();
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payment = await paymentsModel.add(req.body);
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
