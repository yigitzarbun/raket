import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GET_USER, getMyCard } from "./redux stuff/actions";
function PlayerCard() {
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
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 my-8  mx-2 w-1/4 rounded-md shadow-md flex flex-col justify-between">
      <h2 className="font-bold text-4xl">Card</h2>
      <h4 className="text-2xl mt-4">
        {myCard ? "1 card available" : "No cards available"}
      </h4>
      <Link to="/manage-player-card">
        <button className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold">Manage Card</p>
        </button>
      </Link>
    </div>
  );
}

export default PlayerCard;
