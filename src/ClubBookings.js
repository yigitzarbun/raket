import React from "react";
import { Link } from "react-router-dom";
function ClubBookings() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 my-8  mx-2 w-1/4 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Bookings</h2>
      <h4 className="text-2xl mt-4">17 today</h4>
      <Link to="/club-calendar">
        <button className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold">View All</p>
        </button>
      </Link>
    </div>
  );
}

export default ClubBookings;
