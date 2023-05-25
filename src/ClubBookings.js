import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GET_USER, getInvites } from "./redux stuff/actions";
function ClubBookings() {
  const dispatch = useDispatch();
  let { user, invites } = useSelector((store) => store);
  let myInvites = 0;
  if (user.club) {
    user = user.club;
  }
  let today = new Date();
  let day = today.getDate().toString();
  let month = (today.getMonth() + 1).toString();
  let year = today.getFullYear();

  let eventDay = day.padStart(2, "0");
  let eventMonth = month.padStart(2, "0");
  let date = `${year}-${eventMonth}-${eventDay}`;

  if (user && invites) {
    myInvites = invites.filter(
      (i) =>
        i.club_id === user.club_id &&
        i.event_date === date &&
        i.status === "confirmed"
    );
  }

  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
  }, []);
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 my-8  mx-2 w-1/4 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Bookings</h2>
      <h4 className="text-2xl mt-4">{myInvites.length} today</h4>
      <Link to="/club-calendar">
        <button className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold">View All</p>
        </button>
      </Link>
    </div>
  );
}

export default ClubBookings;
