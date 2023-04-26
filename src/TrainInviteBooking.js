import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeroTrainBooking from "./HeroTrainBooking";
import { deleteInvite, getInvites, getPlayers } from "./redux stuff/actions";
function TrainInviteBooking() {
  const navigate = useNavigate();
  const { invite_id } = useParams();
  const { invites, players } = useSelector((store) => store);
  const dispatch = useDispatch();
  const eventType = "Training";
  const handleCancel = (invite_id) => {
    dispatch(deleteInvite(invite_id, navigate));
  };
  let resultJsx = [];
  let textJsx = "";
  let inviteeJsx = [];
  if (invites == null) {
    resultJsx.push(
      <tr key="loading">
        <td>Loading booking</td>
      </tr>
    );
    inviteeJsx.push(
      <tr key="loading">
        <td>Loading booking</td>
      </tr>
    );
  } else if (invites.length === 0) {
    resultJsx.push(
      <tr key="noBooking">
        <td>No booking</td>
      </tr>
    );
    inviteeJsx.push(
      <tr key="noBooking">
        <td>No booking</td>
      </tr>
    );
  } else if (
    Array.isArray(invites) &&
    invites &&
    Array.isArray(players) &&
    players
  ) {
    resultJsx = invites
      .filter((invite) => invite.invite_id === Number(invite_id))
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
          <td>
            <button onClick={() => handleCancel(invite.invite_id)}>
              Cancel
            </button>
          </td>
        </tr>
      ));
    textJsx = invites.filter(
      (invite) => invite.invite_id === Number(invite_id)
    )[0];
    if (textJsx) {
      inviteeJsx = players.filter(
        (p) => p.player_id === textJsx["invitee_id"]
      )[0];
    }
  }
  useEffect(() => {
    dispatch(getInvites());
    dispatch(getPlayers());
  }, []);
  return (
    <div>
      <HeroTrainBooking />

      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <h2 className="font-bold text-4xl text-white">Booking Details</h2>
        <table className="w-full text-left mt-4 bg-slate-800 rounded-md px-4 py-14 ">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{resultJsx}</tbody>
        </table>
        <Link to="/requests">
          <p className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400">
            Check out all incoming and outgoing requests
          </p>
        </Link>
      </div>
      {inviteeJsx && (
        <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-8 mt-8 rounded-md shadow-md flex flex-col ">
          <h3 className="font-bold italic text-xl mt-4">
            Your training invitation to{" "}
            {inviteeJsx["fname"] + " " + inviteeJsx["lname"]} was sent
            successufly.
          </h3>
          <div className="flex items-center mt-4">
            <img src="/images/time.png" alt="time" className="w-8 h-8 mr-2" />
            <p>
              {inviteeJsx["fname"] + " " + inviteeJsx["lname"]} has 30 mins to
              accept your invitation.
            </p>
          </div>
          <div className="flex items-center mt-4">
            <img
              src="/images/approve.png"
              alt="approve"
              className="w-8 h-8 mr-2"
            />
            <p>
              If {inviteeJsx["fname"] + " " + inviteeJsx["lname"]} accepts your
              invitation within 30 mins, your court booking will be made
              automatically and the court fee will be deducted from your
              balance.
            </p>
          </div>
          <div className="flex items-center mt-4">
            <img
              src="/images/decline.png"
              alt="approve"
              className="w-8 h-8 mr-2"
            />
            <p>
              If {inviteeJsx["fname"] + " " + inviteeJsx["lname"]} doesn't
              accept your invitation within 30 mins or declines your invitation,
              your court reservation will automatically be canceled and you will
              not be charged any fees.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainInviteBooking;
