import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers, GET_USER } from "./redux stuff/actions";
import { Link } from "react-router-dom";
function TrainAllPlayers() {
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
  const dispatch = useDispatch();
  let { players, user } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  let resultJsx = [];
  if (players === null) {
    resultJsx.push(
      <tr key="loading">
        <td>Loading players</td>
      </tr>
    );
  } else if (players.length === 0) {
    resultJsx.push(
      <tr key="no-matching">
        <td>No players available</td>
      </tr>
    );
  } else if (Array.isArray(players) && players) {
    resultJsx = players
      .filter((player) => player.player_id !== user.player_id)
      .filter((player) => {
        if (search == "") {
          return player;
        } else if (
          player.fname.toLowerCase().includes(search.toLocaleLowerCase()) ||
          player.lname.toLowerCase().includes(search.toLocaleLowerCase())
        ) {
          return player;
        }
      })
      .map((player) => (
        <tr key={player.player_id} className="h-12">
          <td>
            <img src={player.face_image} className="w-12" />
          </td>
          <td>{player.fname}</td>
          <td>{player.lname}</td>
          <td>{player.gender}</td>
          <td>{player.level}</td>
          <td className="p-1 border-2 mt-4 border-green-500 rounded-md hover:bg-green-500 hover:text-white">
            <Link to="/invite" state={player.player_id}>
              Invite
            </Link>
          </td>
        </tr>
      ));
  }
  useEffect(() => {
    dispatch(getPlayers());
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div>
      <div className="bg-heroAllPlayers bg-bottom bg-auto py-28 rounded-md mt-4"></div>
      <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
        <h2 className="font-bold text-4xl">Players</h2>
        <input
          type="text"
          value={search}
          className="w-3/4 rounded-md p-2 mt-4 text-black"
          placeholder="Search players by name"
          onChange={handleSearch}
        />

        <button onClick={handleClear}>Clear</button>
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
          <tbody>{resultJsx}</tbody>
        </table>
        <Link
          to="/train"
          className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400"
        >
          Filter players by level, location and gender
        </Link>
      </div>
    </div>
  );
}

export default TrainAllPlayers;
