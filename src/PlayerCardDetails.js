import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyCard, GET_USER } from "./redux stuff/actions";

function PlayerCardDetails() {
  const dispatch = useDispatch();
  let { user, myCard } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getMyCard(user.player_id));
  }, []);
  return (
    <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-8 mt-8 rounded-md shadow-md flex flex-col">
      <h2 className="font-bold text-4xl">Card</h2>
      <div className="flex justify-between items-center mt-8">
        <img src="/images/john_isner.png" alt="opponent" className="w-16" />
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Name on Card</p>
          <p>{myCard && myCard["name_on_card"]}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Card Number</p>
          <p>{myCard && myCard["card_number"]}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Expiry Month</p>
          <p>{myCard && myCard["expiry_month"]}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Expiry Year</p>
          <p>{myCard && myCard["expiry_year"]}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">CVC</p>
          <p>{myCard && myCard["cvc"]}</p>
        </div>
        <div>
          <button className=" p-2 border-2 border-black rounded-md hover:bg-black hover:text-white mr-2">
            <p className="font-bold">Remove</p>
          </button>
        </div>
      </div>
      <Link to="/payments">
        <p className="text-sm ml-auto mt-4 cursor-pointer italic hover:text-slate-800">
          View payments
        </p>
      </Link>
    </div>
  );
}

export default PlayerCardDetails;
