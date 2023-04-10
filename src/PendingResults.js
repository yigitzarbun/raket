import React from "react";
import { Link } from "react-router-dom";
function PendingResults() {
  return (
    <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
      <table className="w-full text-left">
        <thead>
          <tr className="h-12 text-blue-400">
            <th>Player</th>
            <th>Player Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Court</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12">
            <td>
              <img
                src="/images/alcaraz.png"
                alt="player-image"
                className="w-12 h-12 rounded-full object-contain "
              />
            </td>
            <td>Carlos Alcaraz</td>
            <td>Dalyan Club</td>
            <td>09.04.2023</td>
            <td>19:00</td>
            <td>5</td>
            <Link to="/score">
              <button
                type="button"
                value="invite"
                className="p-1 border-2 mt-4 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white ml-2"
              >
                Result
              </button>
            </Link>
          </tr>
          <tr className="h-12">
            <td>
              <img
                src="/images/federer-face.png"
                alt="player-image"
                className="w-12 h-12 rounded-full object-contain "
              />
            </td>
            <td>Roger Federer</td>
            <td>Büyük Kulüp</td>
            <td>11.04.2023</td>
            <td>10:00</td>
            <td>1</td>
            <Link to="/score">
              <button
                type="button"
                value="invite"
                className="p-1 border-2 mt-4 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white ml-2"
              >
                Result
              </button>
            </Link>
          </tr>
          <tr className="h-12">
            <td>
              <img
                src="/images/nadal-face.png"
                alt="player-image"
                className="w-12 h-12 rounded-full object-contain "
              />
            </td>
            <td>Rafael Nadal</td>

            <td>Miltaş Spor Tesisleri</td>
            <td>01.05.2023</td>
            <td>20:00</td>
            <td>2</td>
            <Link to="/score">
              <button
                type="button"
                value="invite"
                className="p-1 border-2 mt-4 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white ml-2"
              >
                Result
              </button>
            </Link>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PendingResults;
