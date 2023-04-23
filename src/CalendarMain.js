import React from "react";
import { Link } from "react-router-dom";
function CalendarMain() {
  return (
    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-8 ml-4 mt-8 w-1/2 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Calendar</h2>
      <p className="mt-4">Manage court availability and view reservations</p>
      <Link to="/club-calendar">
        <button className="mt-4 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold">Manage Calendar</p>
        </button>
      </Link>
    </div>
  );
}

export default CalendarMain;
