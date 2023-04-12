import React, { useState } from "react";
import BookedCourts from "./BookedCourts";
import ManageAvailabilty from "./ManageAvailabilty";
function ClubReservations() {
  const [displayed, setDisplayed] = useState("booked");
  const handleDisplayed = (value) => {
    setDisplayed(value);
  };
  const activeColor = {
    backgroundColor: "rgb(59 130 246)",
    border: "rgb(59 130 246 / var(--tw-bg-opacity))",
    color: "white",
  };
  return (
    <div>
      {" "}
      <div className="bg-heroClubCalendar bg-center bg-auto py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <div className="flex justify-between">
          <button
            className="border-white rounded-md border-2 w-1/2 p-2 mr-2 hover:border-blue-500"
            style={displayed == "booked" ? activeColor : {}}
            onClick={() => handleDisplayed("booked")}
          >
            <p className="text-white font-bold"> Booked Courts</p>
          </button>
          <button
            className="border-white rounded-md border-2 w-1/2 p-2 mr-2 hover:border-blue-500"
            style={displayed == "manage" ? activeColor : {}}
            onClick={() => handleDisplayed("manage")}
          >
            <p className="text-white font-bold"> Manage Court Availability</p>
          </button>
        </div>
        {displayed == "booked" ? <BookedCourts /> : <ManageAvailabilty />}
      </div>
    </div>
  );
}

export default ClubReservations;
