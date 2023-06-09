import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getInvites,
  GET_USER,
  updateInvite,
  getPlayers,
  updateBooking,
  getBookings,
  getChallenges,
  updateChallenge,
} from "./redux stuff/actions";
function OutgoingRequests() {
  let { invites, user, players, bookings, challenges } = useSelector(
    (store) => store
  );
  const dispatch = useDispatch();
  const training = "Training";
  const match = "Match";

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
    if (invite.invite_id) {
      const updatedInviteData = {
        invite_id: invite.invite_id,
        status: "cancelled",
      };
      dispatch(updateInvite(updatedInviteData));
    } else if (invite.challengee_id) {
      const updatedChallengeData = {
        challenge_id: invite.challenge_id,
        status: "cancelled",
      };
      dispatch(updateChallenge(updatedChallengeData));
    }
    let bookingId = bookings.find(
      (b) =>
        b.event_date === invite.event_date &&
        b.time === invite.time &&
        b.court_id === invite.court_id &&
        b.status !== "cancelled"
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
    }
  };

  let resultJsx = [];
  let trainingInvites = [];
  let matchChallenges = [];
  if (invites == null) {
    resultJsx.push(
      <tr>
        <td>Loading bookings</td>
      </tr>
    );
  } else if (invites.length === 0) {
    resultJsx.push(
      <tr>
        <td>No bookings</td>
      </tr>
    );
  } else if (Array.isArray(invites) && invites) {
    trainingInvites = invites.filter(
      (invite) =>
        invite.inviter_id === Number(user.player_id) &&
        invite.status === "pending"
    );
    matchChallenges = challenges.filter(
      (challenge) =>
        challenge.challenger_id === Number(user.player_id) &&
        challenge.status === "pending"
    );
    resultJsx = [...trainingInvites, ...matchChallenges]
      .sort(sortDates)
      .map((invite) => (
        <tr key={invite.date} className="text-white">
          <td>
            {players && players.find((p) => p.player_id === invite.invitee_id)
              ? training
              : players.find((p) => p.player_id === invite.challengee_id)
              ? match
              : ""}
          </td>
          <td>{invite.status}</td>
          <td>
            {players &&
              players.filter(
                (player) =>
                  player.player_id === invite.invitee_id ||
                  player.player_id === invite.challengee_id
              )[0] &&
              players.filter(
                (player) =>
                  player.player_id == invite.invitee_id ||
                  player.player_id === invite.challengee_id
              )[0]["fname"] +
                " " +
                players.filter(
                  (player) =>
                    player.player_id == invite.invitee_id ||
                    player.player_id === invite.challengee_id
                )[0]["lname"]}
          </td>
          <td>
            {players &&
              players.filter(
                (player) =>
                  player.player_id == invite.invitee_id ||
                  player.player_id === invite.challengee_id
              )[0] &&
              players.filter(
                (player) =>
                  player.player_id == invite.invitee_id ||
                  player.player_id === invite.challengee_id
              )[0]["level"]}
          </td>
          <td>
            {players &&
              players.filter(
                (player) =>
                  player.player_id == invite.invitee_id ||
                  player.player_id === invite.challengee_id
              )[0] &&
              players.filter(
                (player) =>
                  player.player_id == invite.invitee_id ||
                  player.player_id === invite.challengee_id
              )[0]["gender"]}
          </td>
          <td>
            {invite.name && invite.name.length > 8
              ? invite.name.slice(0, 8).padEnd(10, ".")
              : invite.name}
          </td>
          <td>{invite.event_date}</td>
          <td>
            {invite.time && invite.time < 1000
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
    dispatch(getChallenges());
  }, []);
  return (
    <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
      <table className="w-full text-left">
        <thead>
          <tr className="h-12 text-blue-400">
            <th>Event</th>
            <th>Status</th>
            <th>Name</th>
            <th>Level</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Court</th>
          </tr>
        </thead>
        <tbody>{resultJsx}</tbody>
      </table>
      {resultJsx.length === 0 && (
        <p className="text-center mt-8">No outgoing requests</p>
      )}
      <Link to="/train">
        <p className="text-blue-500 text-sm italic mt-8 cursor-pointer hover:text-blue-400">
          Invite players for training
        </p>
      </Link>
    </div>
  );
}

export default OutgoingRequests;
