import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER,
  getBookings,
  getInvites,
  getPlayers,
} from "./redux stuff/actions";
function BookedCourts() {
  const dispatch = useDispatch();
  let { user, bookings, invites, players } = useSelector((store) => store);
  if (user.club) {
    user = user.club;
  } else {
    user = user;
  }
  let today = new Date();
  let day = today.getDate().toString();
  let month = (today.getMonth() + 1).toString();
  let year = today.getFullYear();

  let eventDay = day.padStart(2, "0");
  let eventMonth = month.padStart(2, "0");
  let date = `${year}-${eventMonth}-${eventDay}`;
  const [filter, setFilter] = useState("today");
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  let myEvents = [];
  let filteredEvents = [];
  if (
    bookings &&
    invites &&
    Array.isArray(bookings) &&
    Array.isArray(invites)
  ) {
    myEvents = invites.filter(
      (i) =>
        i.club_id === user.club_id &&
        (i.status === "confirmed" || i.status === "pending")
    );
    if (filter === "today") {
      filteredEvents = myEvents.filter(
        (e) =>
          new Date(e.event_date).toDateString() ===
          new Date(date).toDateString()
      );
    } else if (filter === "future") {
      filteredEvents = myEvents.filter(
        (e) => new Date(e.event_date).getTime() >= new Date(date).getTime()
      );
    } else if (filter === "past") {
      filteredEvents = myEvents.filter(
        (e) => new Date(e.event_date).getTime() <= new Date(date).getTime()
      );
    }
  }
  let resultJsx = "";
  if (bookings === null) {
    resultJsx = "Loading..";
  } else if (bookings.length === 0) {
    resultJsx = <p>No bookings yet</p>;
  } else if (Array.isArray(bookings) && bookings && user) {
    resultJsx = (
      <table className="w-full text-left">
        <thead>
          <tr className="h-12 text-blue-400">
            <th>Status</th>
            <th>Inviter</th>
            <th>Invitee</th>
            <th>Date</th>
            <th>Time</th>
            <th>Court</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((e) => (
            <tr className="h-12" key={e.invite_id}>
              <td>{e.status}</td>
              <td>{e.fname + " " + e.lname}</td>
              <td>
                {players.filter((p) => p.player_id === e.invitee_id)[0] &&
                  players.filter((p) => p.player_id === e.invitee_id)[0][
                    "fname"
                  ] +
                    " " +
                    players.filter((p) => p.player_id === e.invitee_id)[0][
                      "lname"
                    ]}
              </td>
              <td>{e.event_date}</td>
              <td>
                {e.time === 0
                  ? "00:00"
                  : e.time < 1000
                  ? "0" +
                    e.time.toString()[0] +
                    ":" +
                    e.time.toString()[1] +
                    e.time.toString()[2]
                  : e.time.toString()[0] +
                    e.time.toString()[1] +
                    ":" +
                    e.time.toString()[2] +
                    e.time.toString()[3]}
              </td>
              <td>{e.court_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getBookings());
    dispatch(getInvites());
    dispatch(getPlayers());
  }, []);
  return (
    <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
      <select
        className="text-blue-600 font-bold p-2 rounded-md"
        onChange={handleFilter}
      >
        <option value="today">Today</option>
        <option value="future">Future</option>
        <option value="past">Past</option>
      </select>
      {resultJsx}
      <p className="text-green-500 text-sm mt-5 hover:text-green-400">
        Only courts booked through Raket are displayed
      </p>
    </div>
  );
}

export default BookedCourts;
