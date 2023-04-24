import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getInvites, GET_USER, deleteInvite } from "./redux stuff/actions";
function IncomingRequests() {
  let { invites, user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    resultJsx = "Loading booking";
  } else if (invites.length === 0) {
    resultJsx = "There is no booking";
  } else if (Array.isArray(invites) && invites) {
    resultJsx = invites
      .filter((invite) => invite.invitee_id === Number(user.player_id))
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
          <button>
            <td>Accept</td>
          </button>
          <button onClick={() => handleCancel(invite.invite_id)}>
            <td>Cancel</td>
          </button>
        </tr>
      ));
  }

  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
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
      <Link to="/calendar">
        <p className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400">
          Check out calendar for confirmed training sessions
        </p>
      </Link>
    </div>
  );
}

export default IncomingRequests;
