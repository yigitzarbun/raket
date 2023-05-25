import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClubPayments, GET_USER } from "./redux stuff/actions";
function ClubPaymentHistory() {
  const dispatch = useDispatch();
  let { user, clubPayments } = useSelector((store) => store);
  if (user.club) {
    user = user.club;
  }
  let myPayments = 0;
  if (user && clubPayments) {
    myPayments = clubPayments.filter((p) => p.club_id === user.club_id);
  }
  useEffect(() => {
    dispatch(getClubPayments());
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div>
      <div className="bg-heroClubAccount bg-center bg-cover py-28 rounded-md mt-4"></div>
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
            <tbody>
              {clubPayments &&
                myPayments.length > 0 &&
                myPayments.map((p) => (
                  <tr
                    key={p.club_payment_id}
                    className={
                      p.payment_type_id !== 5
                        ? "text-green-300"
                        : "text-red-400"
                    }
                  >
                    <td>{p.club_payment_id}</td>
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
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClubPaymentHistory;
