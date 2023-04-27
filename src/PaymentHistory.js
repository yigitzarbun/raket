import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GET_USER, getPlayerPayments } from "./redux stuff/actions";
function PaymentHistory() {
  const dispatch = useDispatch();
  let { user, myPayments } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  let paymentCount = null;
  if (myPayments == null) {
    paymentCount = "Loading payments";
  } else if (myPayments.length == 0) {
    paymentCount = "No payments yet";
  } else if (Array.isArray(myPayments) && myPayments) {
    for (let i = 0; i < myPayments.length; i++) {
      paymentCount++;
    }
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getPlayerPayments(user.player_id));
  }, []);
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-4 my-8  ml-2 w-1/4 rounded-md shadow-md flex flex-col justify-between">
      <h2 className="font-bold text-4xl">Payments</h2>
      <h4 className="text-2xl mt-4">
        {paymentCount > 0 ? `${paymentCount} payments` : paymentCount}
      </h4>

      <Link to="/payments">
        <button className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold">View Payments</p>
        </button>
      </Link>
    </div>
  );
}

export default PaymentHistory;
