import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER } from "./redux stuff/actions";
import { Link } from "react-router-dom";
function TrainResults(props) {
  let user = useSelector((store) => store.user);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const dispatch = useDispatch();
  const { players, filter, setFilter } = props;
  const filteredPlayers = players.filter(
    (player) => player.player_id != user.player_id
  );
  let resultJsx = [];
  let searchedPlayers = [];
  if (filteredPlayers === null) {
    resultJsx.push(
      <tr key="loading">
        <td>Loading players</td>
      </tr>
    );
  } else if (filteredPlayers.length === 0) {
    resultJsx.push(
      <tr key="no-matching">
        <td>No players available</td>
      </tr>
    );
  } else if (filteredPlayers && Array.isArray(filteredPlayers)) {
    searchedPlayers = filteredPlayers.filter((player) => {
      if (
        !filter ||
        (filter.club_preference_id === "" &&
          filter.gender_id === "" &&
          filter.level_id === "" &&
          player.player_id !== user.player_id)
      ) {
        return player;
      } else if (
        filter &&
        (filter.club_preference_id === 0 ||
          filter.club_preference_id === player.club_preference_1_id ||
          filter.club_preference_id === player.club_preference_2_id ||
          filter.club_preference_id === player.club_preference_3_id) &&
        (filter.gender_id === 0 || filter.gender_id === player.gender_id) &&
        (filter.level_id === 0 || filter.level_id === player.level_id) &&
        player.player_id !== user.player_id
      ) {
        return player;
      }
    });
    if (searchedPlayers.length > 0) {
      resultJsx = (
        <table className="w-full text-left mt-4">
          <thead>
            <tr className="h-12">
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Level</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchedPlayers.map((player) => (
              <tr key={player.player_id} className="h-12">
                <td>
                  <img src={player.face_image} className="w-12 rounded-full" />
                </td>
                <td>{player.fname}</td>
                <td>{player.lname}</td>
                <td>{player.gender}</td>
                <td>{player.level}</td>
                <td>
                  <Link to="/invite" state={player} className="greenButton">
                    Invite
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      resultJsx = (
        <div className="my-8 text-center">
          <h2 className="font-bold text-xl">
            No players matching search criteria
          </h2>
          <p className="mt-4">
            Clear or refine search criteria to find players to invite for a
            training session.
          </p>
          <button onClick={() => setFilter("")} className="redButton font-bold">
            Clear Search
          </button>
        </div>
      );
    }
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
      <h2 className="font-bold text-4xl">Results</h2>
      {resultJsx}
      <Link
        to="/train-all-players"
        className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400"
      >
        View All Players
      </Link>
    </div>
  );
}

export default TrainResults;
