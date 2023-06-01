import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInvites,
  GET_USER,
  getPlayers,
  getLevels,
  getGenders,
} from "./redux stuff/actions";
import Modal, { setAppElement } from "react-modal";
setAppElement("#root");

function AllEvents() {
  const { levels, genders } = useSelector((store) => store);
  const dispatch = useDispatch();
  // search bar
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
  // date filter
  const [dateModal, setDateModal] = useState(false);
  const toggleDateModal = () => {
    setDateModal(!dateModal);
  };
  const [selectedDate, setSelectedDate] = useState("");
  const handleSelectedDate = (e) => {
    setSelectedDate(e.target.value);
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
  // status filter
  const [statusModal, setStatusModal] = useState(false);
  const toggleStatusModal = () => {
    setStatusModal(!statusModal);
  };
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleSelectedStatus = (e) => {
    setSelectedStatus(e.target.value);
  };

  let eventType = "Training";
  let { user, invites, players } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const compareDates = (a, b) => {
    const dateA = new Date(a.event_date);
    const dateB = new Date(b.event_date);
    return dateA - dateB;
  };
  let myEvents = null;
  let filteredEvents = null;
  if (invites === null) {
    myEvents = "Loading..";
  } else if (invites.length === 0) {
    myEvents = "No events available";
  } else if (Array.isArray(invites) && user) {
    myEvents = invites.filter(
      (invite) =>
        invite.inviter_id === user.player_id ||
        invite.invitee_id === user.player_id
    );
    filteredEvents = myEvents
      .filter((e) => {
        if (search === "") {
          return e;
        } else if (
          e.fname.toLowerCase().includes(search.toLowerCase()) ||
          e.lname.toLowerCase().includes(search.toLowerCase()) ||
          e.name.toLowerCase().includes(search.toLowerCase())
        ) {
          return e;
        }
      })
      .filter((e) => {
        if (selectedDate === "") {
          return e;
        } else if (selectedDate === e.event_date) {
          return e;
        }
      })
      .filter((e) => {
        if (selectedLevel === "") {
          return e;
        } else if (Number(selectedLevel) === Number(e.level_id)) {
          return e;
        }
      })
      .filter((e) => {
        if (selectedGender === "") {
          return e;
        } else if (Number(selectedGender) === Number(e.gender_id)) {
          return e;
        }
      })
      .filter((e) => {
        if (selectedStatus === "") {
          return e;
        } else if (selectedStatus === e.status) {
          return e;
        }
      })
      .sort(compareDates);
  }
  let resultJsx = null;
  if (filteredEvents && filteredEvents.length > 0) {
    resultJsx = (
      <table className="w-full text-left">
        <thead>
          <tr className="h-12 text-blue-400">
            <th>Event</th>
            <th>Status</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Level</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Court</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 &&
            Array.isArray(filteredEvents) &&
            filteredEvents.map((event) => (
              <tr key={event.invite_id} className="text-white">
                <td>{eventType}</td>
                <td>{event.status}</td>
                <td>
                  {event.fname !== user.fname
                    ? event.fname
                    : (players.find((p) => p.player_id === event.invitee_id) ||
                        {})["fname"]}
                </td>
                <td>
                  {event.lname !== user.lname
                    ? event.lname
                    : (players.find((p) => p.player_id === event.invitee_id) ||
                        {})["lname"]}
                </td>
                <td>{event.level}</td>
                <td>{event.gender}</td>
                <td>
                  {event.name && event.name.length > 8
                    ? event.name.slice(0, 8).padEnd(10, ".")
                    : event.name}
                </td>
                <td>{event.event_date}</td>
                <td>
                  {event.time < 1000
                    ? "0" +
                      event.time.toString()[0] +
                      ":" +
                      event.time.toString()[1] +
                      event.time.toString()[2]
                    : event.time.toString()[0] +
                      event.time.toString()[1] +
                      ":" +
                      event.time.toString()[2] +
                      event.time.toString()[3]}
                </td>
                <td>{event.court_name}</td>
                <td className="text-green-500">{event.price / 2} (*)</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  } else if (
    myEvents &&
    filteredEvents &&
    myEvents.length > 0 &&
    filteredEvents.length === 0
  ) {
    resultJsx = (
      <div>
        <p>No events matching your criteria.</p>
      </div>
    );
  } else {
    resultJsx = (
      <div>
        <p>No past events available yet.</p>
      </div>
    );
  }

  useEffect(() => {
    dispatch(getInvites());
    dispatch(getPlayers());
    dispatch({ type: GET_USER });
    dispatch(getLevels());
    dispatch(getGenders());
  }, []);
  return (
    <div>
      <div className="bg-heroAllEvents bg-bottom bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <h2 className="font-bold text-4xl text-white">Events History</h2>
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
            onClick={toggleDateModal}
            className={
              selectedDate
                ? "font-bold text-blue-400 cursor-pointer"
                : "font-bold hover:text-blue-400 cursor-pointer"
            }
          >
            Date
          </p>
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
          <p
            onClick={toggleStatusModal}
            className={
              selectedStatus
                ? "font-bold text-blue-400 cursor-pointer"
                : "font-bold hover:text-blue-400 cursor-pointer"
            }
          >
            Status
          </p>
        </div>
        {selectedDate !== "" ||
        selectedLevel !== "" ||
        selectedGender !== "" ||
        selectedStatus !== "" ? (
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
          {selectedDate && (
            <p
              onClick={() => setSelectedDate("")}
              className="text-white text-sm mt-4 border-2 border-red-400 rounded-md p-2 font-bold cursor-pointer hover:bg-red-400"
            >
              {selectedDate}
            </p>
          )}
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
          {selectedStatus && (
            <p
              onClick={() => setSelectedStatus("")}
              className="text-white text-sm mt-4 border-2 border-red-400 rounded-md p-2 font-bold cursor-pointer hover:bg-red-400 ml-2"
            >
              {selectedStatus}
            </p>
          )}
          {dateModal && (
            <div>
              <Modal isOpen={dateModal} onRequestClose={toggleDateModal}>
                <h2 className="font-bold text-4xl text-center">
                  Filter Events by Date
                </h2>
                <div className="w-1/2 mx-auto flex flex-col mt-8">
                  <input
                    type="date"
                    className="border-2 border-black rounded-md p-12 font-bold text-xl"
                    onChange={handleSelectedDate}
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={toggleDateModal}
                      className="w-1/2 mr-2 mt-8 p-2 border-2 border-blue-500 font-bold rounded-md hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      Apply
                    </button>
                    <button
                      onClick={toggleDateModal}
                      className="w-1/2 ml-2 mt-8 p-2 border-2 border-red-500 font-bold rounded-md  hover:bg-red-500 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
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
          {statusModal && (
            <div>
              <Modal isOpen={statusModal} onRequestClose={toggleStatusModal}>
                <h2 className="font-bold text-4xl text-center">
                  Filter Events by Event Status
                </h2>
                <div className="w-1/2 mx-auto flex flex-col mt-8">
                  <select onChange={handleSelectedStatus}>
                    <option value="">-- Choose Status --</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <div className="flex justify-between">
                    <button
                      onClick={toggleStatusModal}
                      className="w-1/2 mr-2 mt-8 p-2 border-2 border-blue-500 font-bold rounded-md hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      Apply
                    </button>
                    <button
                      onClick={toggleStatusModal}
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
          {resultJsx}
        </div>
      </div>
    </div>
  );
}

export default AllEvents;
