import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GET_USER, getClubPayments } from "./redux stuff/actions";
function ClubPayments() {
  const dispatch = useDispatch();
  let { user, clubPayments } = useSelector((store) => store);
  if (user.club) {
    user = user.club;
  } else {
    user = user;
  }
  let paidSum = 0;
  let myPayments;
  let today = new Date();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let receivedToday;
  let refundedToday;
  if (user && clubPayments) {
    myPayments = clubPayments.filter((p) => {
      const paymentDate = new Date(p.date);
      return (
        p.club_id === user.club_id &&
        paymentDate.getFullYear() === year &&
        paymentDate.getMonth() === month &&
        paymentDate.getDate() === date
      );
    });
    receivedToday = myPayments.filter((p) => p.payment_type_id === 1);
    refundedToday = myPayments.filter((p) => p.payment_type_id === 5);
  }

  if (user) {
    let receivedTotal = myPayments
      .filter((p) => p.payment_type_id !== 5)
      .reduce((acc, curr) => acc + curr.amount, 0);
    let refundedTotal = myPayments
      .filter((p) => p.payment_type_id === 5)
      .reduce((acc, curr) => acc + curr.amount, 0);
    paidSum = receivedTotal - refundedTotal;
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getClubPayments());
  }, []);
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-4 my-8  ml-2 w-1/4 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Payments</h2>
      <h4 className="text-2xl mt-4">TL {paidSum}</h4>
      <p className="mt-2">{`${
        receivedToday.length - refundedToday.length
      } payments today`}</p>
      <Link to="/club-payments">
        <button className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold">View All</p>
        </button>
      </Link>
    </div>
  );
}

export default ClubPayments;
