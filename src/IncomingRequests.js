import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInvites, GET_USER, updateInvite } from "./redux stuff/actions";
function IncomingRequests() {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);

  let { invites, user } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const handleAccept = (data) => {
    setChange(!change);
    const dataWide = {
      invite_id: data.invite_id,
      event_date: data.event_date,
      time: data.time,
      date: data.date,
      message: data.message,
      inviter_id: data.inviter_id,
      invitee_id: data.invitee_id,
      court_id: data.court_id,
      club_id: data.club_id,
      status: "Accepted",
    };
    dispatch(updateInvite(dataWide));
  };

  const handleReject = (data) => {
    setChange(!change);

    const dataWide = {
      invite_id: data.invite_id,
      event_date: data.event_date,
      time: data.time,
      date: data.date,
      message: data.message,
      inviter_id: data.inviter_id,
      invitee_id: data.invitee_id,
      court_id: data.court_id,
      club_id: data.club_id,
      status: "Rejected",
    };
    dispatch(updateInvite(dataWide));
  };
  let resultJsx = "";
  if (invites == null) {
    resultJsx = "Loading booking";
  } else if (invites.length === 0) {
    resultJsx = "There is no booking";
  } else if (Array.isArray(invites) && invites) {
    resultJsx = invites
      .filter(
        (invite) =>
          invite.invitee_id === Number(user.player_id) &&
          invite.status === "Pending"
      )
      .map((invite) => (
        <tr key={invite.invite_id} className="text-white">
          <td>Training</td>
          <td>{invite.status}</td>
          <td>{invite.fname}</td>
          <td>{invite.lname}</td>
          <td>{invite.level}</td>
          <td>{invite.gender}</td>
          <td>{invite.name}</td>
          <td>{invite.event_date}</td>
          <td>{invite.time}</td>
          <td>{invite.court_name}</td>
          <button
            onClick={() => {
              handleAccept(invite);
            }}
          >
            <td>Accept</td>
          </button>
          <button onClick={() => handleReject(invite)}>
            <td>Reject</td>
          </button>
        </tr>
      ));
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
  }, [change]);
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
      <Link to="/calendar">
        <p className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400">
          Check out calendar for confirmed training sessions
        </p>
      </Link>
    </div>
  );
}

export default IncomingRequests;
