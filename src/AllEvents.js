import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvites, GET_USER, getPlayers } from "./redux stuff/actions";

function AllEvents() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
  let eventType = "Training";
  let { user, invites, players } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
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
    filteredEvents = myEvents.filter((e) => {
      if (search === "") {
        return e;
      } else if (
        e.fname.toLowerCase().includes(search.toLowerCase()) ||
        e.lname.toLowerCase().includes(search.toLowerCase()) ||
        e.name.toLowerCase().includes(search.toLowerCase())
      ) {
        return e;
      }
    });
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
                <td>{event.name}</td>
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
  } else if (myEvents.length > 0 && filteredEvents.length === 0) {
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
        <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
          {resultJsx}
        </div>
      </div>
    </div>
  );
}

export default AllEvents;
