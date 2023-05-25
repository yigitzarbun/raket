import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  GET_USER,
  getInvites,
  updateInvite,
  addPlayerPayment,
  getCourts,
  updateBooking,
  getBookings,
  getMyCard,
  addClubPayment,
} from "./redux stuff/actions";
function Requests() {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  let { user, invites, courts, bookings, myCard } = useSelector(
    (store) => store
  );
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const [invitationIndex, setInvitationIndex] = useState(0);

  let myInvites = "";
  if (invites === null) {
    myInvites = "Loading invitations";
  } else if (invites.length === 0) {
    myInvites = "No invitations";
  } else {
    myInvites = invites.filter(
      (invite) =>
        invite.invitee_id === user.player_id && invite.status === "pending"
    );
  }
  const handleNextIndex = () => {
    setInvitationIndex((invitationIndex + 1) % myInvites.length);
  };
  const handlePrevIndex = () => {
    setInvitationIndex(
      (invitationIndex + myInvites.length - 1) % myInvites.length
    );
  };
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
    dispatch(getInvites());
    setInvitationIndex(0);
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
    const clubPayment = {
      amount: courts.filter((court) => court.court_id === data.court_id)[0][
        "price"
      ],
      date: Date.now(),
      club_id: data.club_id,
      payment_type_id: 1,
    };
    dispatch(addClubPayment(clubPayment));
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
    dispatch(getInvites());
    setInvitationIndex(0);
    let bookingId = bookings.find(
      (b) =>
        b.event_date === data.event_date &&
        b.time === data.time &&
        b.court_id === data.court_id &&
        b.status !== "cancelled"
    );
    const bookingData = {
      status: "cancelled",
      booking_id: bookingId.booking_id,
      date: Date.now(),
      event_date: data.event_date,
      time: data.time,
      club_id: data.club_id,
      court_id: data.court_id,
    };
    dispatch(updateBooking(bookingData));
  };

  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
    dispatch(getCourts());
    dispatch(getBookings());
    dispatch(getMyCard(user.player_id));
  }, [change]);

  return (
    <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-8 mt-8 rounded-md shadow-md flex flex-col">
      <div className="flex justify-between">
        <h2 className="font-bold text-4xl">Requests</h2>
        {myInvites.length > 1 && (
          <div className="flex justify-between w-1/6">
            <div
              className="flex-col hover:text-slate-800 cursor-pointer"
              onClick={handlePrevIndex}
            >
              <img src="/images/left-arrow.png" className="w-4 h-4 mx-auto" />
              <p className="text-sm">Prev</p>
            </div>
            <div
              className="flex-col hover:text-slate-800 cursor-pointer"
              onClick={handleNextIndex}
            >
              <img src="/images/right-arrow.png" className="w-4 h-4 mx-auto" />
              <p className="text-sm">Next</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-8">
        {myInvites[invitationIndex] && (
          <img
            src={myInvites[invitationIndex]["face_image"]}
            alt="opponent"
            className="w-16 rounded-full"
          />
        )}

        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Challenger</p>
          {myInvites[invitationIndex] && (
            <p>
              {myInvites[invitationIndex]["fname"] +
                " " +
                myInvites[invitationIndex]["lname"]}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Event</p>
          <p>Training</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Date</p>
          {myInvites[invitationIndex] && (
            <p>{myInvites[invitationIndex]["event_date"]}</p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Time</p>
          {myInvites &&
            myInvites.length > 0 &&
            myInvites[invitationIndex].time !== undefined && (
              <p className="text-sm">
                {myInvites[invitationIndex].time.toString().length < 4
                  ? "0" +
                    myInvites[invitationIndex].time.toString()[0] +
                    ":" +
                    myInvites[invitationIndex].time.toString()[1] +
                    myInvites[invitationIndex].time.toString()[2]
                  : myInvites[invitationIndex].time.toString()[0] +
                    myInvites[invitationIndex].time.toString()[1] +
                    ":" +
                    myInvites[invitationIndex].time.toString()[2] +
                    myInvites[invitationIndex].time.toString()[3]}
              </p>
            )}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Location</p>
          {myInvites[invitationIndex] && (
            <p>{myInvites[invitationIndex]["name"]}</p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Kort</p>
          {myInvites[invitationIndex] && (
            <p>Court {myInvites[invitationIndex]["court_name"]}</p>
          )}
        </div>
        <div>
          {myCard ? (
            <button
              className="p-2 border-2 border-black rounded-md hover:bg-black hover:text-white mr-2"
              onClick={() => {
                handleAccept(myInvites[invitationIndex]);
              }}
            >
              <p className="font-bold">Accept</p>
            </button>
          ) : (
            <Link to="/add-player-card">
              <button className="font-bold mr-2 p-2 border-2 border-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white">
                Add Card
              </button>
            </Link>
          )}

          <button
            className=" p-2 border-2 border-black rounded-md hover:bg-black hover:text-white"
            onClick={() => {
              handleReject(myInvites[invitationIndex]);
            }}
          >
            <p className="font-bold">Decline</p>
          </button>
        </div>
      </div>
      <Link
        to="requests"
        className="text-sm mt-4 cursor-pointer italic hover:text-slate-800 mr-auto"
      >
        View all requests
      </Link>
    </div>
  );
}

export default Requests;
