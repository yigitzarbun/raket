import React from "react";
import { Link } from "react-router-dom";

function LeaderboardFull() {
  return (
    <div>
      <div className="bg-heroLeaderboard bg-center bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 w-full mt-8 rounded-md shadow-md">
        <h2 className="font-bold text-4xl text-white ">Leaderboard</h2>
        <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
          <table className="w-full text-left">
            <tr>
              <th className="text-slate-300">#</th>
              <th>Player</th>
              <th>Player Name</th>
              <th>Level</th>
              <th>Gender</th>
              <th className="text-blue-400">Played</th>
              <th className="text-green-400">Won</th>
              <th className="text-red-500">Lost</th>
            </tr>
            <tr>
              <td className="text-slate-300">1</td>
              <td>
                <img
                  src="/images/alcaraz.png"
                  alt="player-image"
                  className="w-12 h-12 object-contain "
                />
              </td>
              <td>Carlos Alcaraz</td>
              <td>Pro</td>
              <td>Male</td>
              <td className="text-blue-400">10</td>
              <td className="text-green-400">9</td>
              <td className="text-red-500">1</td>
            </tr>
            <tr>
              <td className="text-slate-300">2</td>
              <td>
                <img
                  src="/images/federer-face.png"
                  alt="player-image"
                  className="w-12 h-12 object-contain "
                />
              </td>
              <td>Roger Federer</td>
              <td>Pro</td>
              <td>Male</td>
              <td className="text-blue-400">10</td>
              <td className="text-green-400">8</td>
              <td className="text-red-500">2</td>
            </tr>
            <tr>
              <td className="text-slate-300">3</td>
              <td>
                <img
                  src="/images/nadal-face.png"
                  alt="player-image"
                  className="w-12 h-12 object-contain "
                />
              </td>
              <td>Rafael Nadal</td>
              <td>Pro</td>
              <td>Male</td>
              <td className="text-blue-400">10</td>
              <td className="text-green-400">7</td>
              <td className="text-red-500">3</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardFull;
