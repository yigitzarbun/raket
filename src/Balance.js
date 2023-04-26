import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPlayerPayments, GET_USER } from "./redux stuff/actions";
function Balance() {
  const dispatch = useDispatch();
  let { user, myPayments } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  let balance = null;
  if (myPayments == null) {
    balance = "Loading balance";
  } else if (Array.isArray(myPayments) && myPayments) {
    for (let i = 0; i < myPayments.length; i++) {
      if (myPayments[i]["payment_type_id"] === 1) {
        balance += myPayments[i]["amount"];
      } else {
        balance -= myPayments[i]["amount"];
      }
    }
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getPlayerPayments(user.player_id));
  }, []);
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 my-8  mx-2 w-1/4 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Balance</h2>
      <h4 className="text-2xl mt-4">TL {balance && balance}</h4>
      <Link to="/add-balance">
        <button className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold">Add Balance</p>
        </button>
      </Link>
    </div>
  );
}

export default Balance;
