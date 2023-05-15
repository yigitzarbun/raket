import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInvites, GET_USER } from "./redux stuff/actions";
function AccountEvents() {
  let { user, invites } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  let myEvents = null;
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
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInvites());
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div className="w-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 p-4 my-8  mx-2 rounded-md shadow-md flex flex-col justify-between">
      <h2 className="font-bold text-4xl">Events</h2>
      <h4 className="text-2xl mt-4">
        {myEvents.length > 0 ? myEvents.length + " events" : "0 events"}
      </h4>
      <Link to="/all-events">
        <button className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold">View Past Events</p>
        </button>
      </Link>
    </div>
  );
}

export default AccountEvents;
