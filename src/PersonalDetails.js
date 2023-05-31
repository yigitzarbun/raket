import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers, GET_USER, getClubs } from "./redux stuff/actions";
import { Link } from "react-router-dom";
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

  let clubPreferences = [];
  if (clubs == null) {
    clubPreferences.push(<p>Loading clubs</p>);
  } else if (clubs.length === 0) {
    clubPreferences.push(<p>No clubs available</p>);
  } else if (Array.isArray(clubs) && clubs && players && player) {
    for (let c = 0; c < clubs.length; c++) {
      if (clubs[c]["club_id"] === player["club_preference_1_id"]) {
        clubPreferences.push(clubs[c]["name"]);
      } else if (clubs[c]["club_id"] === player["club_preference_2_id"]) {
        clubPreferences.push(clubs[c]["name"]);
      } else if (clubs[c]["club_id"] === player["club_preference_3_id"]) {
        clubPreferences.push(clubs[c]["name"]);
      }
    }
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getPlayers());
    dispatch(getClubs());
  }, []);
  return (
    <div className=" bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-md p-4 my-8 mr-2 w-1/2">
      <div className="flex justify-between">
        <h2 className="font-bold text-4xl text-black">Personal Details</h2>
        {players && user && player && (
          <Link to="/edit-personal-details" state={{ player: player }}>
            <img
              src="/images/edit.png"
              alt="edit-profile"
              className="w-6 h-6 object-contain cursor-pointer"
            />
          </Link>
        )}
      </div>
      <div className="mt-4 flex">
        <img
          src={user && players && player && player.face_image}
          alt="profile-pic"
          className="w-32 h-32 rounded-full mr-4"
        />
        <table className="text-left w-1/2">
          <tbody>
            <tr>
              <th>Name</th>
              <td>
                {user && players && player && player.fname + " " + player.lname}
              </td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{user && players && player && player.gender}</td>
            </tr>
            <tr>
              <th>Age</th>
              <td>
                {user &&
                  players &&
                  player &&
                  new Date().getFullYear() - player.birth_year}
              </td>
            </tr>
            <tr>
              <th>Level</th>
              <td>{user && players && player && player.level}</td>
            </tr>
            <tr>
              <th>Club #1</th>
              <td>
                {user &&
                  players &&
                  player &&
                  clubPreferences[0] &&
                  Array.isArray(clubPreferences) &&
                  typeof clubPreferences[0] === "string" &&
                  clubPreferences[0].slice(0, 10) + ".."}
              </td>
            </tr>
            {clubPreferences[1] && (
              <tr>
                <th>Club #2</th>
                <td>
                  {user &&
                    players &&
                    player &&
                    clubPreferences[1] &&
                    Array.isArray(clubPreferences) &&
                    typeof clubPreferences[1] === "string" &&
                    clubPreferences[1].slice(0, 10) + ".."}
                </td>
              </tr>
            )}
            {clubPreferences[2] && (
              <tr>
                <th>Club #3</th>
                <td>
                  {user &&
                    players &&
                    player &&
                    clubPreferences[2] &&
                    Array.isArray(clubPreferences) &&
                    typeof clubPreferences[2] === "string" &&
                    clubPreferences[2].slice(0, 10) + ".."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PersonalDetails;
