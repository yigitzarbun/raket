import React from "react";
import { Link } from "react-router-dom";

function BookedCourts() {
  return (
    <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
      <table className="w-full text-left">
        <thead>
          <tr className="h-12 text-blue-400">
            <th>Event</th>
            <th>Inviter</th>
            <th>Invitee</th>
            <th>Date</th>
            <th>Time</th>
            <th>Court</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-12">
            <td>Match</td>
            <td>Carlos Alcaraz</td>
            <td>Roger Federer</td>
            <td>09.04.2023</td>
            <td>19:00</td>
            <td>5</td>
          </tr>
          <tr className="h-12">
            <td>Match</td>
            <td>Carlos Alcaraz</td>
            <td>Roger Federer</td>
            <td>09.04.2023</td>
            <td>20:00</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookedCourts;
