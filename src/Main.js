import React, { useEffect } from "react";
import Train from "./Train";
import Match from "./Match";
import Hero from "./Hero";
import Requests from "./Requests";
import Upcoming from "./Upcoming";
import Stats from "./Stats";
import Equipment from "./Equipment";
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
  if (invites === null) {
    myInvites = "Loading invitations";
  } else if (invites.length === 0) {
    myInvites = "No invitations";
  } else if (Array.isArray(invites) && invites) {
    myInvites = invites.filter(
      (invite) =>
        invite.invitee_id === user.player_id && invite.status === "Pending"
    );
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
  }, []);
  return (
    <div>
      <Hero />
      <div className="flex justify-between">
        <Train />
        <Match />
      </div>
      {myInvites && myInvites.length > 0 && <Requests />}

      <div className="flex justify-between">
        <Upcoming />
        <div className="flex flex-col w-2/3">
          <Stats />
          <Equipment />
        </div>
      </div>
    </div>
  );
}

export default Main;
