import React from "react";
import { Link } from "react-router-dom";
function MyStats() {
  return (
    <div className="bg-slate-800 text-white rounded-md px-4 py-9 flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="text-center">
          <p className="text-4xl font-bold">10</p>
          <p>Events</p>
        </div>
        <div className="text-center text-green-400">
          <p className="text-4xl font-bold">10</p>
          <p>Won</p>
        </div>
        <div className="text-center text-red-400">
          <p className="text-4xl font-bold">0</p>
          <p>Lost</p>
        </div>
        <div className="text-center text-blue-400">
          <p className="text-4xl font-bold">0</p>
          <p>Practice</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold">#1</p>
          <p>Ranking</p>
        </div>
      </div>
      <Link to="">
        <p className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400">
          Detailed Stats
        </p>
      </Link>
    </div>
  );
}

export default MyStats;
