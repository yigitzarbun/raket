import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCardDetails from "./PlayerCardDetails";
import { getMyCard, GET_USER } from "./redux stuff/actions";
import { Link } from "react-router-dom";
function ManagePlayerCard() {
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
    <div>
      <div className="bg-heroBalance bg-bottom bg-cover py-28 rounded-md mt-4 "></div>
      {myCard ? (
        <PlayerCardDetails />
      ) : (
        <div className="bg-slate-800 rounded-md p-4 mt-8 text-blue-400 text-center">
          <h2 className="font-bold text-4xl text-white">
            No registered cards on your account
          </h2>
          <p className="mt-4 text-xl italic font-bold">
            You need to add a credit / debit card in order to play with other
            players.
          </p>
          <Link to="/add-player-card">
            <button className="py-2 px-4 rounded-md mt-8 border-2 border-blue-400 text-white font-bold hover:bg-blue-400">
              Add Card
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ManagePlayerCard;
