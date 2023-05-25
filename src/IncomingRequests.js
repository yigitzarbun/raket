import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getInvites,
  GET_USER,
  updateInvite,
  addPlayerPayment,
  getCourts,
  getMyCard,
  updateBooking,
  getBookings,
} from "./redux stuff/actions";
function IncomingRequests() {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  const eventType = "Training";
  let { invites, user, courts, myCard, bookings } = useSelector(
    (store) => store
  );
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const handleAccept = (data) => {
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
      status: "confirmed",
    };
    dispatch(updateInvite(dataWide));
    const paymentDataInvitee = {
      amount:
        courts.filter((court) => court.court_id === data.court_id)[0]["price"] /
        2,
      date: Date.now(),
      player_id: data.inviter_id,
      payment_type_id: 1,
    };
    dispatch(addPlayerPayment(paymentDataInvitee));
    const paymentDataInviter = {
      amount:
        courts.filter((court) => court.court_id === data.court_id)[0]["price"] /
        2,
      date: Date.now(),
      player_id: user.player_id,
      payment_type_id: 1,
    };
    dispatch(addPlayerPayment(paymentDataInviter));
    setChange(!change);
    let bookingId = bookings.find(
      (b) =>
        b.event_date === data.event_date &&
        b.time === data.time &&
        b.court_id === data.court_id &&
        b.status === "pending"
    );
    if (bookingId) {
      const bookingData = {
        status: "confirmed",
        booking_id: bookingId.booking_id,
        date: Date.now(),
        event_date: data.event_date,
        time: data.time,
        club_id: data.club_id,
        court_id: data.court_id,
      };
      dispatch(updateBooking(bookingData));
    }
  };

  const handleReject = (data) => {
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
      status: "rejected",
    };
    dispatch(updateInvite(dataWide));
    setChange(!change);
    let bookingId = bookings.find(
      (b) =>
        b.event_date === data.event_date &&
        b.time === data.time &&
        b.court_id === data.court_id &&
        b.status === "pending"
    );
    if (bookingId) {
      const bookingData = {
        status: "rejected",
        booking_id: bookingId.booking_id,
        date: Date.now(),
        event_date: data.event_date,
        time: data.time,
        club_id: data.club_id,
        court_id: data.court_id,
      };
      dispatch(updateBooking(bookingData));
    }
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
      .filter(
        (invite) =>
          invite.invitee_id === Number(user.player_id) &&
          invite.status === "pending"
      )
      .map((invite) => (
        <tr key={invite.invite_id} className="text-white">
          <td>{eventType}</td>
          <td>{invite.status}</td>
          <td>{invite.fname}</td>
          <td>{invite.lname}</td>
          <td>{invite.level}</td>
          <td>{invite.gender}</td>
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
          <td className="text-green-500">{invite.price / 2} (*)</td>

          {myCard ? (
            <td>
              <p
                className=" text-center font-bold p-2 border-2 cursor-pointer border-green-500 rounded-md hover:bg-green-500 hover:text-white"
                onClick={() => {
                  handleAccept(invite);
                }}
              >
                Accept
              </p>
            </td>
          ) : (
            <td>
              <Link
                to="/add-player-card"
                className="text-center font-bold p-2 border-2 border-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white"
              >
                Add Card
              </Link>
            </td>
          )}
          <td>
            <p
              className="text-center font-bold  p-2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white cursor-pointer"
              onClick={() => handleReject(invite)}
            >
              Reject
            </p>
          </td>
        </tr>
      ));
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
    dispatch(getCourts());
    dispatch(getMyCard(user.player_id));
    dispatch(getBookings());
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
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{resultJsx}</tbody>
      </table>
      <Link to="/calendar">
        <p className="text-blue-500 text-sm italic mt-5 inline cursor-pointer hover:text-blue-400">
          Check out calendar for confirmed training sessions
        </p>
      </Link>
      <p className="text-green-500 text-sm mt-5 hover:text-green-400">
        (*) Price indicates the amount that you'll need to pay.
      </p>
    </div>
  );
}

export default IncomingRequests;
