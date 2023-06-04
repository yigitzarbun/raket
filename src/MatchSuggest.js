import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GET_USER, getPlayers } from "./redux stuff/actions";
function MatchSuggest() {
  let { user, players } = useSelector((store) => store);
  const dispatch = useDispatch();
  if (user.player) {
    user = user.player;
  }
  let suggested = "";
  if (players === null) {
    suggested = "Loading events";
  } else if (players.length === 0) {
    suggested = "No upcoming events";
  } else if (Array.isArray(players) && players && user) {
    suggested = players.filter((player) => player.player_id !== user.player_id);
  }
  const [invitationIndex, setInvitationIndex] = useState(0);
  const handleInvitationIndex = () => {
    setInvitationIndex(
      (invitationIndex + suggested.length + 1) % suggested.length
    );
  };
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getPlayers());
  }, []);
  return (
    <div className="bg-slate-800 text-white  p-8 mr-4 mt-8 w-2/3 rounded-md shadow-md flex flex-col ">
      <h2 className="font-bold text-4xl">Suggested</h2>
      <div className="flex justify-around mt-8 items-center">
        <img
          src={
            players &&
            suggested[invitationIndex] &&
            suggested[invitationIndex]["body_image"]
          }
          alt="opponent"
          className="w-1/3"
        />
        <div className="w-1/2">
          <p>#5</p>
          <p className="font-bold text-2xl">
            {players &&
              suggested[invitationIndex] &&
              suggested[invitationIndex]["fname"] +
                " " +
                suggested[invitationIndex]["lname"]}
          </p>
          <p>
            {players &&
              suggested[invitationIndex] &&
              suggested[invitationIndex]["gender"]}
          </p>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-4xl font-bold">10</p>
              <p>Events</p>
            </div>
            <div className="text-center text-green-400">
              <p className="text-4xl font-bold">6</p>
              <p>Won</p>
            </div>
            <div className="text-center text-red-400">
              <p className="text-4xl font-bold">2</p>
              <p>Lost</p>
            </div>
            <div className="text-center text-blue-400">
              <p className="text-4xl font-bold">2</p>
              <p>Practice</p>
            </div>
          </div>
          <p className="mt-8 text-sm italic">
            {`Would you like to challenge ${
              players && suggested[invitationIndex]["fname"]
            } for a match?`}
          </p>
          <div>
            <Link to="/challenge" state={suggested[invitationIndex]}>
              <button className="mt-4 p-2 border-2 border-green-500 rounded-md hover:bg-green-500 hover:text-white">
                <p className="font-bold">
                  {`Challenge ${
                    players && suggested[invitationIndex]["fname"]
                  }`}
                </p>
              </button>
            </Link>
            <button
              onClick={handleInvitationIndex}
              className="mt-4 p-2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white ml-4"
            >
              <p className="font-bold"> Skip</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchSuggest;
