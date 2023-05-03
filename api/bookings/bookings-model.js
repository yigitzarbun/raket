const db = require("../../data/dbConfig");

async function getAll() {
  const bookings = await db("bookings");
  return bookings;
}

async function getById(booking_id) {
  const booking = await db("bookings").where("booking_id", booking_id).first();
  return booking;
}

async function add(booking) {
  const bookingIdArray = await db("bookings").insert(booking);
  const bookingId = bookingIdArray[0];
  const newBooking = await db("bookings")
    .where("booking_id", bookingId)
    .first();
  return newBooking;
}

async function remove(booking_id) {
  return await db("bookings").where("booking_id", booking_id).del();
}

async function update(booking_id, changes) {
  return await db("bookings").where("booking_id", booking_id).update(changes);
}
module.exports = { getAll, getById, add, remove, update };
