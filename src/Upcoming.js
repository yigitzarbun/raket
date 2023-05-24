import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getInvites,
  GET_USER,
  updateInvite,
  getBookings,
  updateBooking,
} from "./redux stuff/actions";

function Upcoming() {
  const dispatch = useDispatch();
  let { user, invites, bookings } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const [myEvents, setMyEvents] = useState([]);
  const [invitationIndex, setInvitationIndex] = useState(0);
  const handleNextIndex = () => {
    setInvitationIndex((invitationIndex + 1) % myEvents.length);
  };
  const handlePrevIndex = () => {
    setInvitationIndex(
      (invitationIndex + myEvents.length - 1) % myEvents.length
    );
  };
  const handleCancelEvent = (invite) => {
    const inviteUpdateData = {
      invite_id: invite.invite_id,
      status: "cancelled",
    };
    dispatch(updateInvite(inviteUpdateData));
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
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
    dispatch(getBookings());
  }, []);
  useEffect(() => {
    if (Array.isArray(invites) && invites.length > 0) {
      const filteredInvites = invites.filter(
        (invite) =>
          (invite.invitee_id === user.player_id ||
            invite.inviter_id === user.player_id) &&
          invite.status === "confirmed"
      );
      setMyEvents(
        filteredInvites.sort(function (a, b) {
          return new Date(a.event_date) - new Date(b.event_date);
        })
      );
    }
  }, [invites, user]);
  return (
    <div className="p-8 mr-4 mt-8 rounded-md w-2/6 shadow-md bg-gradient-to-r from-teal-400 to-purple-500">
      <div className="flex justify-between">
        <h2 className="font-bold text-4xl">Upcoming</h2>
        {myEvents && myEvents.length > 1 && (
          <div className="flex justify-between w-1/8">
            <div
              className="flex-col hover:text-slate-800 cursor-pointer"
              onClick={handlePrevIndex}
            >
              <img src="/images/left-arrow.png" className="w-4 h-4 mx-auto" />
            </div>
            <div
              className="flex-col hover:text-slate-800 cursor-pointer"
              onClick={handleNextIndex}
            >
              <img src="/images/right-arrow.png" className="w-4 h-4 mx-auto" />
            </div>
          </div>
        )}
      </div>
      <h4 className="italic">Training</h4>
      {myEvents.length > 0 &&
        myEvents[invitationIndex] &&
        myEvents[invitationIndex]["face_image"] && (
          <img
            src={myEvents[invitationIndex]["face_image"]}
            alt="face"
            className="rounded-full w-32 h-32 object-cover mt-8"
          />
        )}

      <p className="text-xl font-bold mt-4">
        {myEvents &&
          myEvents.length > 0 &&
          myEvents[invitationIndex]["fname"] +
            " " +
            myEvents[invitationIndex]["lname"]}
      </p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <img src="/images/calendar.png" alt="date" className="w-4 h-4" />
          <p className="ml-2 font-bold">Date</p>
        </div>
        <p>
          {myEvents &&
            myEvents.length > 0 &&
            myEvents[invitationIndex]["event_date"]}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <img src="/images/time.png" alt="time" className="w-4 h-4" />
          <p className="ml-2 font-bold"> Time</p>
        </div>
        {myEvents &&
          myEvents.length > 0 &&
          myEvents[invitationIndex].time !== undefined && (
            <p>
              {myEvents[invitationIndex].time.toString().length < 4
                ? "0" +
                  myEvents[invitationIndex].time.toString()[0] +
                  ":" +
                  myEvents[invitationIndex].time.toString()[1] +
                  myEvents[invitationIndex].time.toString()[2]
                : myEvents[invitationIndex].time.toString()[0] +
                  myEvents[invitationIndex].time.toString()[1] +
                  ":" +
                  myEvents[invitationIndex].time.toString()[2] +
                  myEvents[invitationIndex].time.toString()[3]}
            </p>
          )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <img src="/images/location.png" alt="location" className="w-4 h-4" />
          <p className="ml-2 font-bold">Location</p>
        </div>
        <p>
          {myEvents && myEvents.length > 0 && myEvents[invitationIndex]["name"]}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <img src="/images/court.png" alt="court" className="w-4 h-4" />
          <p className="ml-2 font-bold">Court</p>
        </div>
        <p>
          {myEvents &&
            myEvents.length > 0 &&
            myEvents[invitationIndex]["court_name"]}
        </p>
      </div>
      <button
        className="mt-8 p-2 border-2 border-black rounded-md w-full hover:bg-red-500 hover:border-red-500 hover:text-white"
        onClick={() => handleCancelEvent(myEvents[invitationIndex])}
      >
        <p className="font-bold">Cancel</p>
      </button>
      <Link to="/calendar">
        <p className="text-sm mt-4 italic cursor-pointer text-center hover:text-slate-700">
          View all upcoming events
        </p>
      </Link>
    </div>
  );
}

export default Upcoming;
