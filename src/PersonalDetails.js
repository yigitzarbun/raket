import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers, GET_USER, getClubs } from "./redux stuff/actions";

function PersonalDetails() {
  const dispatch = useDispatch();
  let { user, players, clubs } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  let player = "";
  if (players == null) {
    player = "Loading details";
  } else if (players.length === 0) {
    player = "Player not available";
  } else if (Array.isArray(players) && players) {
    player = players.filter((p) => p.player_id === user.player_id)[0];
  }

  let clubList = "";
  if (clubs == null) {
    clubList = "Loading clubs";
  } else if (clubs.length === 0) {
    clubList = "No clubs available";
  } else if (Array.isArray(clubs) && clubs) {
    let clubPreferences = [];
    for (let c = 0; c < clubs.length; c++) {
      if (clubs[c]["club_id"] == user["club_preference_1_id"]) {
        clubPreferences.push(clubs[c]["name"]);
      } else if (clubs[c]["club_id"] == user["club_preference_2_id"]) {
        clubPreferences.push(clubs[c]["name"]);
      } else if (clubs[c]["club_id"] == user["club_preference_3_id"]) {
        clubPreferences.push(clubs[c]["name"]);
      }
    }
    clubList =
      clubPreferences[0] +
      ", " +
      clubPreferences[1] +
      ", " +
      clubPreferences[2];
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getPlayers());
    dispatch(getClubs());
  }, []);
  return (
    <div className=" bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-md p-4 my-8 mr-2 w-1/2">
      <h2 className="font-bold text-4xl text-black">Personal Details</h2>
      <div className="mt-4 flex">
        <img
          src={user && user.face_image}
          alt="profile-pic"
          className="w-32 h-32 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Name:</p>
            <h2>{user && user.fname + " " + user.lname}</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Gender:</p>
            <h2>{user && user.gender}</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Age:</p>
            <h2>{user && new Date().getFullYear() - user.birth_year}</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Level:</p>
            <h2>{player && player.level}</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Locations:</p>
            <h2>{clubList}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
