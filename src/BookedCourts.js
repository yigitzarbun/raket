import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER,
  getBookings,
  getInvites,
  getPlayers,
} from "./redux stuff/actions";
function BookedCourts() {
  const dispatch = useDispatch();
  let { user, bookings, invites, players } = useSelector((store) => store);
  if (user.club) {
    user = user.club;
  } else {
    user = user;
  }
  let myEvents = [];
  let myBookings = [];
  if (
    bookings &&
    invites &&
    Array.isArray(bookings) &&
    Array.isArray(invites)
  ) {
    myEvents = invites.filter(
      (i) =>
        i.club_id === user.club_id &&
        (i.status === "confirmed" || i.status === "pending")
    );
    myBookings = bookings.filter((b) => b.club_id === user.club_id);
  }
  let resultJsx = "";
  if (bookings === null) {
    resultJsx = "Loading..";
  } else if (bookings.length === 0) {
    resultJsx = <p>No bookings yet</p>;
  } else if (Array.isArray(bookings) && bookings && user) {
    resultJsx = (
      <table className="w-full text-left">
        <thead>
          <tr className="h-12 text-blue-400">
            <th>Event</th>
            <th>Inviter</th>
            <th>Invitee</th>
            <th>Date</th>
            <th>Time</th>
            <th>Court</th>
          </tr>
        </thead>
        <tbody>
          {myEvents.map((e) => (
            <tr className="h-12" key={e.booking_id}>
              <td>Training</td>
              <td>{e.name}</td>
              <td>
                {
                  players.filter((p) => p.player_id === e.invitee_id)[0][
                    "fname"
                  ]
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  console.log(invites);
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getBookings());
    dispatch(getInvites());
    dispatch(getPlayers());
  }, []);
  return (
    <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
      {resultJsx}
    </div>
  );
}

export default BookedCourts;
