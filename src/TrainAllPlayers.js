import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlayers,
  GET_USER,
  getLevels,
  getGenders,
} from "./redux stuff/actions";
import { Link } from "react-router-dom";
import Modal, { setAppElement } from "react-modal";
setAppElement("#root");

function TrainAllPlayers() {
  const dispatch = useDispatch();
  let { players, user, levels, genders } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  // search filter
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
  // level filter
  const [levelModal, setLevelModal] = useState(false);
  const toggleLevelModal = () => {
    setLevelModal(!levelModal);
  };
  const [selectedLevel, setSelectedLevel] = useState("");
  const handleSelectedLevel = (e) => {
    setSelectedLevel(e.target.value);
  };
  // gender filter
  const [genderModal, setGenderModal] = useState(false);
  const toggleGenderModal = () => {
    setGenderModal(!genderModal);
  };
  const [selectedGender, setSelectedGender] = useState("");
  const handleSelectedGender = (e) => {
    setSelectedGender(e.target.value);
  };

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
      .filter((player) => {
        if (selectedGender === "") {
          return player;
        } else if (Number(player.gender_id) === Number(selectedGender)) {
          return player;
        }
      })
      .filter((player) => {
        if (selectedLevel === "") {
          return player;
        } else if (Number(player.level_id) === Number(selectedLevel)) {
          return player;
        }
      })
      .map((player) => (
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
      ));
  }
  useEffect(() => {
    dispatch(getPlayers());
    dispatch({ type: GET_USER });
    dispatch(getLevels());
    dispatch(getGenders());
  }, []);
  return (
    <div>
      <div className="bg-heroAllPlayers bg-bottom bg-auto py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <h2 className="font-bold text-4xl text-white">Players</h2>
        <div className="flex my-4">
          <input
            type="text"
            value={search}
            className="w-3/4 rounded-md p-2  text-black"
            placeholder="Search players by name"
            onChange={handleSearch}
          />
          <button
            onClick={handleClear}
            className="p-2 border-2 border-red-500 font-bold rounded-md text-white hover:bg-red-500 ml-2"
          >
            Clear
          </button>
        </div>
        <div className="flex justify-between w-1/2 items-center text-white">
          <p>Filter by</p>

          <p
            onClick={toggleLevelModal}
            className={
              selectedLevel
                ? "font-bold text-blue-400 cursor-pointer"
                : "font-bold hover:text-blue-400 cursor-pointer"
            }
          >
            Level
          </p>
          <p
            onClick={toggleGenderModal}
            className={
              selectedGender
                ? "font-bold text-blue-400 cursor-pointer"
                : "font-bold hover:text-blue-400 cursor-pointer"
            }
          >
            Gender
          </p>
        </div>
        {selectedLevel !== "" || selectedGender !== "" ? (
          <div className="flex flex-col">
            <p className="text-blue-400 font-bold mt-4">Selected filters:</p>
            <p className="text-slate-400 text-sm italic">
              Click on selected filters below to reset them
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="flex w-1/2">
          {selectedLevel && (
            <p
              onClick={() => setSelectedLevel("")}
              className="text-white text-sm mt-4 border-2 border-red-400 rounded-md p-2 font-bold cursor-pointer hover:bg-red-400 ml-2"
            >
              {levels &&
                levels.find(
                  (l) => Number(l.level_id) === Number(selectedLevel)
                )["level"]}
            </p>
          )}
          {selectedGender && (
            <p
              onClick={() => setSelectedGender("")}
              className="text-white text-sm mt-4 border-2 border-red-400 rounded-md p-2 font-bold cursor-pointer hover:bg-red-400 ml-2"
            >
              {genders &&
                genders.find(
                  (l) => Number(l.gender_id) === Number(selectedGender)
                )["gender"]}
            </p>
          )}
          {levelModal && (
            <div>
              <Modal isOpen={levelModal} onRequestClose={toggleLevelModal}>
                <h2 className="font-bold text-4xl text-center">
                  Filter Events by Level
                </h2>
                <div className="w-1/2 mx-auto flex flex-col mt-8">
                  <select onChange={handleSelectedLevel}>
                    <option value="">-- Choose Level --</option>
                    {levels &&
                      levels.map((l) => (
                        <option key={l.level_id} value={l.level_id}>
                          {l.level}
                        </option>
                      ))}
                  </select>
                  <div className="flex justify-between">
                    <button
                      onClick={toggleLevelModal}
                      className="w-1/2 mr-2 mt-8 p-2 border-2 border-blue-500 font-bold rounded-md hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      Apply
                    </button>
                    <button
                      onClick={toggleLevelModal}
                      className="w-1/2 ml-2 mt-8 p-2 border-2 border-red-500 font-bold rounded-md  hover:bg-red-500 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          )}
          {genderModal && (
            <div>
              <Modal isOpen={genderModal} onRequestClose={toggleGenderModal}>
                <h2 className="font-bold text-4xl text-center">
                  Filter Events by Gender
                </h2>
                <div className="w-1/2 mx-auto flex flex-col mt-8">
                  <select onChange={handleSelectedGender}>
                    <option value="">-- Choose Gender --</option>
                    {genders &&
                      genders.map((g) => (
                        <option key={g.gender_id} value={g.gender_id}>
                          {g.gender}
                        </option>
                      ))}
                  </select>
                  <div className="flex justify-between">
                    <button
                      onClick={toggleGenderModal}
                      className="w-1/2 mr-2 mt-8 p-2 border-2 border-blue-500 font-bold rounded-md hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      Apply
                    </button>
                    <button
                      onClick={toggleGenderModal}
                      className="w-1/2 ml-2 mt-8 p-2 border-2 border-red-500 font-bold rounded-md  hover:bg-red-500 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          )}
        </div>
        <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
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
    </div>
  );
}

export default TrainAllPlayers;
