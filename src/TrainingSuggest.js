import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPlayers, GET_USER, addInvite } from "./redux stuff/actions";
function TrainingSuggest() {
  const dispatch = useDispatch();

  let { user, players } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  let suggested = "";
  if (players === null) {
    suggested = "Loading events";
  } else if (players.length === 0) {
    suggested = "No upcoming events";
  } else if (Array.isArray(players) && players) {
    suggested = players.filter((player) => player.player_id !== user.player_id);
  }
  const [invitationIndex, setInvitationIndex] = useState(0);
  const handleNextIndex = () => {
    setInvitationIndex((invitationIndex + 1) % suggested.length);
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
            players[invitationIndex] !== undefined &&
            players[invitationIndex]["body_image"]
          }
          alt="opponent"
          className="w-1/3"
        />
        <div className="w-1/2">
          <p>#4</p>
          <p className="font-bold text-2xl">
            {players &&
              players[invitationIndex] !== undefined &&
              players[invitationIndex]["fname"] +
                " " +
                players[invitationIndex]["lname"]}
          </p>
          <p>
            {players &&
              players[invitationIndex] !== undefined &&
              players[invitationIndex]["gender"]}
          </p>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-4xl font-bold">10</p>
              <p>Events</p>
            </div>
            <div className="text-center text-green-400">
              <p className="text-4xl font-bold">10</p>
              <p>Won</p>
            </div>
            <div className="text-center text-red-400">
              <p className="text-4xl font-bold">0</p>
              <p>Lost</p>
            </div>
            <div className="text-center text-blue-400">
              <p className="text-4xl font-bold">0</p>
              <p>Practice</p>
            </div>
          </div>
          <p className="mt-8 text-sm italic">
            Would you like to invite{" "}
            {players &&
              players[invitationIndex] !== undefined &&
              players[invitationIndex]["fname"]}{" "}
            for a training session?
          </p>
          <div>
            <Link to="/invite" state={players[invitationIndex]["player_id"]}>
              <button className="mt-4 p-2 border-2 border-green-500 rounded-md hover:bg-green-500 hover:text-white">
                <p className="font-bold">
                  Invite{" "}
                  {players &&
                    players[invitationIndex] !== undefined &&
                    players[invitationIndex]["fname"]}
                </p>
              </button>
            </Link>
            <button
              onClick={handleNextIndex}
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

export default TrainingSuggest;

/*
for (let i = 0; i < players.length; i++) {
      // full match (age +- 5 years)
      //  level and location match
      // level +- 1 and all location and gender and age +- 10 years match
      // level +- 1 and all location and gender and age +- 15 years match
      // level +- 1 and 2 locations and gender match
      // level +- 1 and 2 locations match
      // level +- 1 and 1 location and gender match
      // level +- 1 and 1 location match
      //
      if (
        players[i]["level_id"] === user["level_id"] &&
        players[i]["gender_id"] === user["gender_id"] &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_1_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_1_id"] ||
          players[i]["court_preference_3_id"] ===
            user["court_preference_1_id"]) &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_2_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_2_id"] ||
          players[i]["court_preference_3_id"] ===
            user["court_preference_2_id"]) &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_3_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_3_id"] ||
          players[i]["court_preference_3_id"] ===
            user["court_preference_3_id"]) &&
        Math.abs(players[i]["birth_year"] - user["birth_year"]) <= 10 &&
        players[i]["player_id"] !== user.player_id
      ) {
        suggested.push(players[i]);
      } else if (
        players[i]["level_id"] === user["level_id"] &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_1_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_1_id"] ||
          players[i]["court_preference_3_id"] ===
            user["court_preference_1_id"]) &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_2_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_2_id"] ||
          players[i]["court_preference_3_id"] ===
            user["court_preference_2_id"]) &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_3_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_3_id"] ||
          players[i]["court_preference_3_id"] === user["court_preference_3_id"])
      ) {
        suggested.push(players[i]);
      } else if (
        players[i]["gender_id"] === user["gender_id"] &&
        Math.abs(players[i]["birth_year"] - user["birth_year"]) <= 10 &&
        Math.abs(players[i]["level_id"] - user["level_id"]) <= 1
      ) {
        suggested.push(players[i]);
      } else if (
        players[i]["gender_id"] === user["gender_id"] &&
        Math.abs(players[i]["birth_year"] - user["birth_year"]) <= 15 &&
        Math.abs(players[i]["level_id"] - user["level_id"]) <= 1
      ) {
        suggested.push(players[i]);
      } else if (
        players[i]["gender_id"] === user["gender_id"] &&
        Math.abs(players[i]["level_id"] - user["level_id"]) <= 1 &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_1_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_1_id"] ||
          players[i]["court_preference_3_id"] ===
            user["court_preference_1_id"]) &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_2_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_2_id"] ||
          players[i]["court_preference_3_id"] === user["court_preference_2_id"])
      ) {
        suggested.push(players[i]);
      } else if (
        Math.abs(players[i]["level_id"] - user["level_id"]) <= 1 &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_1_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_1_id"] ||
          players[i]["court_preference_3_id"] ===
            user["court_preference_1_id"]) &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_2_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_2_id"] ||
          players[i]["court_preference_3_id"] === user["court_preference_2_id"])
      ) {
        suggested.push(players[i]);
      } else if (
        Math.abs(players[i]["level_id"] - user["level_id"]) <= 1 &&
        (players[i]["court_preference_1_id"] ===
          user["court_preference_1_id"] ||
          players[i]["court_preference_2_id"] ===
            user["court_preference_1_id"] ||
          players[i]["court_preference_3_id"] === user["court_preference_1_id"])
      ) {
        suggested.push(players[i]);
      } else if (
        players[i]["court_preference_1_id"] === user["court_preference_1_id"] ||
        players[i]["court_preference_2_id"] === user["court_preference_1_id"] ||
        players[i]["court_preference_3_id"] === user["court_preference_1_id"]
      ) {
        suggested.push(players[i]);
      } else if (Math.abs(players[i]["level_id"] - user["level_id"]) <= 1) {
        suggested.push(players[i]);
      }
    }
    */
