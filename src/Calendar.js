import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
          invite.status === "confirmed" &&
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
          <td onClick={() => handleCancel(invite)}>
            <button className="text-center font-bold  p-2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white">
              Cancel
            </button>
          </td>
        </tr>
      ));
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
