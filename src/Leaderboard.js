import React from "react";
import { Link } from "react-router-dom";

function Leaderboard() {
  return (
    <div className="bg-slate-800 text-white rounded-md p-4">
      <table className="w-full text-left">
        <tr>
          <th className="text-slate-300">#</th>
          <th>Player Name</th>
          <th className="text-blue-400">Played</th>
          <th className="text-green-400">Won</th>
          <th className="text-red-500">Lost</th>
        </tr>
        <tr>
          <td className="text-slate-300">1</td>
          <td>Carlos Alcaraz</td>
          <td className="text-blue-400">10</td>
          <td className="text-green-400">9</td>
          <td className="text-red-500">1</td>
        </tr>
        <tr>
          <td className="text-slate-300">2</td>
          <td>Roger Federer</td>
          <td className="text-blue-400">10</td>
          <td className="text-green-400">8</td>
          <td className="text-red-500">2</td>
        </tr>
        <tr>
          <td className="text-slate-300">3</td>
          <td>Rafael Nadal</td>
          <td className="text-blue-400">10</td>
          <td className="text-green-400">7</td>
          <td className="text-red-500">3</td>
        </tr>
      </table>
      <Link to="/leaderboard">
        <p className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400">
          View All
        </p>
      </Link>
    </div>
  );
}

export default Leaderboard;
