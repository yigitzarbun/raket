import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayerPayments, GET_USER } from "./redux stuff/actions";

function Payments() {
  const dispatch = useDispatch();
  let { user, myPayments } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }

  let resultJsx = "";
  if (myPayments === null) {
    resultJsx = "Loading payments";
  } else if (myPayments.length === 0) {
    resultJsx = "No payments available";
  } else if (Array.isArray(myPayments) && myPayments) {
    resultJsx = myPayments.map((p) => (
      <tr
        key={p.player_payment_id}
        className={p.payment_type_id === 1 ? "text-green-300" : "text-red-400"}
      >
        <td>{p.player_payment_id}</td>
        <td>{p.payment_type}</td>
        <td>
          {new Date(p.date).getFullYear() +
            "/" +
            new Date(p.date).getMonth() +
            "/" +
            new Date(p.date).getDate()}
        </td>
        <td>TL {p.amount}</td>
      </tr>
    ));
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getPlayerPayments(user.player_id));
  }, []);
  return (
    <div>
      <div className="bg-heroPayments bg-center bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md w-2/3 mx-auto ">
        <h2 className="font-bold text-4xl text-white">Payment History</h2>
        <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
          <table className="text-left w-full">
            <thead>
              <tr className="h-12 text-blue-400">
                <th>Id</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{resultJsx}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Payments;
