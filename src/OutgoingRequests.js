import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getInvites,
  GET_USER,
  deleteInvite,
  getPlayers,
} from "./redux stuff/actions";
function OutgoingRequests() {
  let { invites, user, players } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventType = "Training";
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const handleCancel = (invite_id) => {
    dispatch(deleteInvite(invite_id, navigate));
  };

  let resultJsx = "";
  if (invites == null) {
    resultJsx = (
      <tr>
        <td>Loading bookings</td>
      </tr>
    );
  } else if (invites.length === 0) {
    resultJsx = (
      <tr>
        <td>No bookings</td>
      </tr>
    );
  } else if (Array.isArray(invites) && invites) {
    resultJsx = invites
      .filter((invite) => invite.inviter_id === Number(user.player_id))
      .map((invite) => (
        <tr key={invite.invite_id} className="text-white">
          <td>{eventType}</td>
          <td>{invite.status}</td>
          <td>
            {players &&
              players.filter(
                (player) => player.player_id == invite.invitee_id
              )[0] &&
              players.filter(
                (player) => player.player_id == invite.invitee_id
              )[0]["fname"]}
          </td>
          <td>
            {players &&
              players.filter(
                (player) => player.player_id == invite.invitee_id
              )[0] &&
              players.filter(
                (player) => player.player_id == invite.invitee_id
              )[0]["lname"]}
          </td>
          <td>
            {players &&
              players.filter(
                (player) => player.player_id == invite.invitee_id
              )[0] &&
              players.filter(
                (player) => player.player_id == invite.invitee_id
              )[0]["level"]}
          </td>
          <td>
            {players &&
              players.filter(
                (player) => player.player_id == invite.invitee_id
              )[0] &&
              players.filter(
                (player) => player.player_id == invite.invitee_id
              )[0]["gender"]}
          </td>
          <td>{invite.name}</td>
          <td>{invite.event_date}</td>
          <td>{invite.time}</td>
          <td>{invite.court_name}</td>
          <td onClick={() => handleCancel(invite.invite_id)}>Cancel</td>
        </tr>
      ));
  }

  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
    dispatch(getPlayers());
  }, []);
  return (
    <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
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
          </tr>
        </thead>
        <tbody>{resultJsx}</tbody>
      </table>
      <Link to="/train">
        <p className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400">
          Invite players for training
        </p>
      </Link>
    </div>
  );
}

export default OutgoingRequests;
