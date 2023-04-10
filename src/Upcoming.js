import React from "react";
import { Link } from "react-router-dom";

function Upcoming() {
  return (
    <div className="p-8 mr-4 mt-8 rounded-md shadow-md bg-gradient-to-r from-blue-200 to-blue-400">
      <h2 className="font-bold text-4xl">Upcoming</h2>
      <h4 className="italic">Training</h4>
      <img src="/images/alcaraz.png" alt="opponent" className="h-32" />
      <p className="text-xl font-bold mt-2">Blake Felix</p>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <p className="w-4 text-center">#</p>
          <p className="text-sm ml-2 font-bold">Ranking</p>
        </div>
        <p>1</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img src="/images/calendar.png" alt="date" className="w-4 h-4" />
          <p className="text-sm ml-2 font-bold">Date</p>
        </div>
        <p className="text-sm">21.04.2023</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img src="/images/time.png" alt="time" className="w-4 h-4" />
          <p className="text-sm ml-2 font-bold"> Time</p>
        </div>
        <p className="text-sm">18:05</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img src="/images/location.png" alt="location" className="w-4 h-4" />
          <p className="text-sm ml-2 font-bold">Location</p>
        </div>
        <p className="text-sm">IBB Maltepe Kortları</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img src="/images/court.png" alt="court" className="w-4 h-4" />
          <p className="text-sm ml-2 font-bold">Court</p>
        </div>
        <p className="text-sm">Court 2</p>
      </div>
      <button className="mt-4 p-2 border-2 border-black rounded-md w-full hover:bg-red-500 hover:text-white">
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
