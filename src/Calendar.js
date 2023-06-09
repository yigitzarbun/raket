import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getInvites,
  getPlayers,
  GET_USER,
  updateInvite,
  updateBooking,
  getBookings,
  addPlayerPayment,
  getCourts,
  addClubPayment,
} from "./redux stuff/actions";
function Calendar() {
  let now = new Date();
  let time = now
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .replace(":", "");
  let today = now.toISOString().split("T")[0];

  const dispatch = useDispatch();
  const eventType = "Training";
  let { user, invites, players, bookings, courts } = useSelector(
    (store) => store
  );
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const sortDates = (a, b) => {
    const dateA = new Date(a.event_date);
    const dateB = new Date(b.event_date);
    return dateA - dateB;
  };
  const handleCancel = (invite) => {
    const inviteData = {
      invite_id: invite.invite_id,
      status: "cancelled",
    };
    dispatch(updateInvite(inviteData));
    let bookingId = bookings.find(
      (b) =>
        b.event_date === invite.event_date &&
        b.time === invite.time &&
        b.court_id === invite.court_id &&
        b.status === "confirmed"
    );
    if (bookingId) {
      const bookingData = {
        status: "cancelled",
        booking_id: bookingId.booking_id,
        date: Date.now(),
        event_date: invite.event_date,
        time: invite.time,
        club_id: invite.club_id,
        court_id: invite.court_id,
      };
      dispatch(updateBooking(bookingData));

      if (courts && invites) {
        let court = invites.find((i) => i.invite_id === invite.invite_id);
        if (court) {
          let courtPrice = court["price"];
          let clubId = court["club_id"];
          const playerPayment1 = {
            amount: courtPrice / 2,
            date: Date.now(),
            player_id: user.player_id,
            payment_type_id: 5,
          };
          dispatch(addPlayerPayment(playerPayment1));
          let player2Id;
          if (court.inviter_id === user.player_id) {
            player2Id = court["invitee_id"];
          } else {
            player2Id = court["inviter_id"];
          }
          const playerPayment2 = {
            amount: courtPrice / 2,
            date: Date.now(),
            player_id: player2Id,
            payment_type_id: 5,
          };
          dispatch(addPlayerPayment(playerPayment2));
          const clubPayment = {
            amount: courtPrice,
            date: Date.now(),
            club_id: clubId,
            payment_type_id: 5,
          };
          dispatch(addClubPayment(clubPayment));
        }
      }
    }
  };
  // search
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
  let resultJsx = [];
  let myEvents = [];
  let filteredEvents = [];
  if (invites === null) {
    resultJsx = (
      <tr>
        <td>Loading bookings</td>
      </tr>
    );
  } else if (invites.length === 0) {
    resultJsx = (
      <tr>
        <td>No confirmed events</td>
      </tr>
    );
  } else if (Array.isArray(invites) && invites) {
    myEvents = invites.filter(
      (invite) =>
        ((invite.status === "confirmed" && invite.event_date > today) ||
          (invite.event_date === today &&
            invite.time >= time &&
            invite.status === "confirmed")) &&
        (invite.inviter_id === user.player_id ||
          invite.invitee_id === user.player_id)
    );
    filteredEvents = myEvents.filter((invite) => {
      if (search === "") {
        return invite;
      } else if (
        invite.fname.toLowerCase().includes(search.toLowerCase()) ||
        invite.lname.toLowerCase().includes(search.toLowerCase()) ||
        invite.name.toLowerCase().includes(search.toLowerCase())
      ) {
        return invite;
      }
    });
    resultJsx = (
      <table className="w-full text-left">
        <thead>
          <tr className="h-12 text-blue-400">
            <th>Event</th>
            <th>Name</th>
            <th>Level</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Court</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.sort(sortDates).map((invite) => (
            <tr key={invite.invite_id}>
              <td>{eventType}</td>
              <td>
                {invite.inviter_id === user.player_id
                  ? players.filter(
                      (player) => player.player_id === invite.invitee_id
                    )[0] &&
                    players.filter(
                      (player) => player.player_id === invite.invitee_id
                    )[0]["fname"] +
                      " " +
                      players.filter(
                        (player) => player.player_id === invite.invitee_id
                      )[0]["lname"]
                  : players.filter(
                      (player) => player.player_id === invite.inviter_id
                    )[0] &&
                    players.filter(
                      (player) => player.player_id === invite.inviter_id
                    )[0]["fname"] +
                      " " +
                      players.filter(
                        (player) => player.player_id === invite.inviter_id
                      )[0]["lname"]}
              </td>
              <td>
                {invite.inviter_id === user.player_id
                  ? players.filter(
                      (player) => player.player_id === invite.invitee_id
                    )[0] &&
                    players.filter(
                      (player) => player.player_id === invite.invitee_id
                    )[0]["level"]
                  : players.filter(
                      (player) => player.player_id === invite.inviter_id
                    )[0] &&
                    players.filter(
                      (player) => player.player_id === invite.inviter_id
                    )[0]["level"]}
              </td>
              <td>
                {invite.inviter_id === user.player_id
                  ? players.filter(
                      (player) => player.player_id === invite.invitee_id
                    )[0] &&
                    players.filter(
                      (player) => player.player_id === invite.invitee_id
                    )[0]["gender"]
                  : players.filter(
                      (player) => player.player_id === invite.inviter_id
                    )[0] &&
                    players.filter(
                      (player) => player.player_id === invite.inviter_id
                    )[0]["gender"]}
              </td>
              <td>
                {invite.name && invite.name.length > 8
                  ? invite.name.slice(0, 8).padEnd(10, ".")
                  : invite.name}
              </td>
              <td>{invite.event_date}</td>
              <td>
                {invite.time < 1000
                  ? "0" +
                    invite.time.toString()[0] +
                    ":" +
                    invite.time.toString()[1] +
                    invite.time.toString()[2]
                  : invite.time.toString()[0] +
                    invite.time.toString()[1] +
                    ":" +
                    invite.time.toString()[2] +
                    invite.time.toString()[3]}
              </td>
              <td>{invite.court_name}</td>
              <td onClick={() => handleCancel(invite)}>
                <button className="text-center font-bold  p-2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
    dispatch(getPlayers());
    dispatch(getBookings());
    dispatch(getCourts());
  }, []);
  return (
    <div>
      <div className="bg-heroCalendar bg-bottom bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-4xl text-white">Calendar</h2>
          <Link
            to="/player-calendar-view"
            className="text-slate-400 hover:text-blue-400"
          >
            <p>Calendar View</p>
          </Link>
        </div>
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
          {filteredEvents.length > 0 && resultJsx}
          {myEvents.length > 0 && filteredEvents.length === 0 && (
            <p>No events matching your search criteria</p>
          )}
          {myEvents.length === 0 && <p>No upcoming events</p>}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
