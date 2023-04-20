import React from "react";
import { Link } from "react-router-dom";

function IncomingRequests() {
  return (
    <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
      <table className="w-full text-left">
        <thead>
          <tr className="h-12 text-blue-400">
            <th>Event</th>
            <th>#</th>
            <th>Player</th>
            <th>Player Name</th>
            <th>Level</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Court</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12">
            <td>Match</td>
            <td className="text-slate-300">1</td>
            <td>
              <img
                src="/images/alcaraz.png"
                alt="player-image"
                className="w-12 h-12 rounded-full object-contain"
              />
            </td>
            <td>Carlos Alcaraz</td>
            <td>Pro</td>
            <td>Male</td>
            <td>Dalyan Club</td>
            <td>09.04.2023</td>
            <td>19:00</td>
            <td>5</td>

            <td className="p-1 border-2 mt-4 border-green-500 rounded-md hover:bg-green-500 hover:text-white mr-2">
              Accept
            </td>
            <td className="p-1 border-2 mt-4 border-red-500 rounded-md hover:bg-red-500 hover:text-white ml-2">
              Decline
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/calendar">
        <p className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400">
          Check out calendar for confirmed training sessions
        </p>
      </Link>
    </div>
  );
}

export default IncomingRequests;
