const db = require("../../data/dbConfig");

async function getAll() {
  const payments = await db("club_payments").leftJoin(
    "payment_types",
    "club_payments.payment_type_id",
    "payment_types.payment_type_id"
  );
  return payments;
}

async function add(club_payment) {
  const paymentIdArray = await db("club_payments").insert(club_payment);
  const paymentId = paymentIdArray[0];
  const newPayment = await db("club_payments")
    .where(paymentId, "club_payment_id")
    .first();
  return newPayment;
}
module.exports = { getAll, add };
