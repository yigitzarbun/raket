const router = require("express").Router();
const bookingsModel = require("./bookings-model");

router.get("/", async (req, res, next) => {
  try {
    const bookings = await bookingsModel.getAll();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

router.get("/:booking_id", async (req, res, next) => {
  try {
    const { booking_id } = req.params;
    const booking = await bookingsModel.getById(booking_id);
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newBooking = await bookingsModel.add(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

router.put("/:booking_id", async (req, res, next) => {
  try {
    updates = req.body;
    await bookingsModel.update(updates.booking_id, updates);
    const updatedBooking = await bookingsModel.getById(updates.booking_id);
    res.status(201).json(updatedBooking);
  } catch (error) {
    next(error);
  }
});

router.delete("/:booking_id", async (req, res, next) => {
  try {
    const deletedBooking = await bookingsModel.remove(req.params.booking_id);
    res.status(200).json(deletedBooking);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
