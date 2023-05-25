import React from "react";
import { Link } from "react-router-dom";

function MatchResults() {
  return (
    <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
      <h2 className="font-bold text-4xl">Results</h2>
      <table className="w-full text-left mt-4">
        <thead>
          <tr className="h-12">
            <th className="text-slate-300">#</th>
            <th>Player Name</th>
            <th>Player</th>
            <th>Level</th>
            <th>Gender</th>
            <th>Events</th>
            <th className="text-green-400">Won</th>
            <th className="text-red-500">Lost</th>
            <th className="text-blue-400">Practice</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12">
            <td className="text-slate-300">1</td>
            <td>Carlos Alcaraz</td>
            <td>
              <img
                src="/images/alcaraz.png"
                alt="player-image"
                className="w-12 h-12 rounded-full object-contain "
              />
            </td>
            <td>Pro</td>
            <td>Male</td>
            <td>15</td>
            <td className="text-green-400">9</td>
            <td className="text-red-500">1</td>
            <td className="text-blue-400">5</td>
            <td>
              <button className="greenButton">Challenge </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400">
        View All
      </p>
    </div>
  );
}

export default MatchResults;
