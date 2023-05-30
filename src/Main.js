import React, { useEffect, useState } from "react";
import Train from "./Train";
import Match from "./Match";
import Requests from "./Requests";
import Upcoming from "./Upcoming";
import Stats from "./Stats";
import Equipment from "./Equipment";
import SearchGPT from "./SearchGPT";
import { useDispatch, useSelector } from "react-redux";
import { getInvites, GET_USER } from "./redux stuff/actions";

function Main() {
  const dispatch = useDispatch();
  let { user, invites } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  let myInvites = "";
  let myEvents = "";
  let now = new Date();
  let today = now.toISOString().split("T")[0];
  let time = now
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .replace(":", "");
  if (invites === null) {
    myInvites = "Loading invitations";
    myEvents = "Loading events";
  } else if (invites.length === 0) {
    myInvites = "No invitations";
    myEvents = "No upcoming events";
  } else if (Array.isArray(invites) && invites) {
    myInvites = invites.filter(
      (invite) =>
        invite.invitee_id === user.player_id &&
        invite.status === "pending" &&
        (invite.event_date > today ||
          (invite.event_date === today && invite.time >= time))
    );
    myEvents = invites.filter(
      (invite) =>
        (invite.invitee_id === user.player_id ||
          invite.inviter_id === user.player_id) &&
        invite.status === "confirmed" &&
        (invite.event_date > today ||
          (invite.event_date === today && invite.time >= time))
    );
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
  }, []);
  return (
    <div>
      <div className="bg-hero bg-bottom bg-auto py-28 rounded-md mt-4"></div>
      <div className="flex justify-between">
        <Train />
        <Match />
      </div>
      {myInvites && myInvites.length > 0 && <Requests />}
      <div className="flex justify-between">
        {myEvents && myEvents.length > 0 && <Upcoming />}
        <div
          className={
            myEvents && myEvents.length > 0
              ? "flex flex-col w-4/6"
              : "w-full flex justify-between items-center"
          }
        >
          <div className={myEvents.length === 0 ? "w-1/2 mr-2" : ""}>
            <Stats />
          </div>
          <div className={myEvents.length === 0 ? "w-1/2 ml-2" : ""}>
            <Equipment />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <SearchGPT />
      </div>
    </div>
  );
}

export default Main;
