const db = require("../../data/dbConfig");

async function getAll() {
  const payments = await db("player_payments");
  return payments;
}

async function add(payment) {
  const paymentIdArray = await db("player_payments").insert(payment);
  const paymentId = paymentIdArray[0];
  const newPayment = await db("player_payments")
    .where("player_payment_id", paymentId)
    .first();
  return newPayment;
}

module.exports = { getAll, add };
