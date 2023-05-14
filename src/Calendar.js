import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getInvites,
  getPlayers,
  GET_USER,
  deleteInvite,
  updateBooking,
  getBookings,
} from "./redux stuff/actions";
function Calendar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventType = "Training";
  let { user, invites, players, bookings } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const handleCancel = (invite) => {
    dispatch(deleteInvite(invite.invite_id, navigate));
    let bookingId = bookings.filter(
      (b) =>
        b.event_date === invite.event_date &&
        b.time === invite.time &&
        b.court_id === invite.court_id
    )[0];
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
  };
  let resultJsx = [];
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
    resultJsx = invites
      .filter(
        (invite) =>
          invite.status === "Accepted" &&
          (invite.inviter_id === user.player_id ||
            invite.invitee_id === user.player_id)
      )
      .map((invite) => (
        <tr key={invite.invite_id}>
          <td>{eventType}</td>
          <td>
            {invite.inviter_id === user.player_id
              ? players.filter(
                  (player) => player.player_id === invite.invitee_id
                )[0] &&
                players.filter(
                  (player) => player.player_id === invite.invitee_id
                )[0]["fname"]
              : players.filter(
                  (player) => player.player_id === invite.inviter_id
                )[0] &&
                players.filter(
                  (player) => player.player_id === invite.inviter_id
                )[0]["fname"]}
          </td>
          <td>
            {invite.inviter_id === user.player_id
              ? players.filter(
                  (player) => player.player_id === invite.invitee_id
                )[0] &&
                players.filter(
                  (player) => player.player_id === invite.invitee_id
                )[0]["lname"]
              : players.filter(
                  (player) => player.player_id === invite.inviter_id
                )[0] &&
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
          <td>{invite.name}</td>
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
          <td onClick={() => handleCancel(invite)}>Cancel</td>
        </tr>
      ));
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
    dispatch(getPlayers());
    dispatch(getBookings());
  }, []);
  return (
    <div>
      <div className="bg-heroCalendar bg-bottom bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <h2 className="font-bold text-4xl text-white">Calendar</h2>
        <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
          <table className="w-full text-left">
            <thead>
              <tr className="h-12 text-blue-400">
                <th>Event</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Level</th>
                <th>Gender</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Court</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{resultJsx && resultJsx}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
