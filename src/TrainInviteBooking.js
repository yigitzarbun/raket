import React from "react";
import { Link } from "react-router-dom";
import HeroTrainBooking from "./HeroTrainBooking";
function TrainInviteBooking() {
  return (
    <div>
      <HeroTrainBooking />

      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <h2 className="font-bold text-4xl text-white">Booking Details</h2>
        <table className="w-full text-left mt-4 bg-slate-800 rounded-md px-4 py-14 ">
          <thead>
            <tr className="h-12 text-blue-400">
              <th>Event</th>
              <th>Status</th>
              <th>#</th>
              <th>Player Name</th>
              <th>Level</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Court</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="h-12">
              <td>Training</td>
              <td className="text-yellow-400">Pending</td>
              <td>2</td>
              <td>Roger Federer</td>
              <td>Pro</td>
              <td>Male</td>
              <td>Dalyan Club</td>
              <td>09.04.2023</td>
              <td>19:00</td>
              <td>5</td>

              <td className="p-1 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white ml-2">
                Cancel
              </td>
            </tr>
          </tbody>
        </table>

        <p className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400">
          Check out all incoming and outgoing requests
        </p>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-8 mt-8 rounded-md shadow-md flex flex-col ">
        <h3 className="font-bold italic text-xl mt-4">
          Your training invitation to Roger Federer was sent successufly.
        </h3>
        <div className="flex items-center mt-4">
          <img src="/images/time.png" alt="time" className="w-8 h-8 mr-2" />
          <p>Roger Federer has 30 mins to accept your invitation.</p>
        </div>
        <div className="flex items-center mt-4">
          <img
            src="/images/approve.png"
            alt="approve"
            className="w-8 h-8 mr-2"
          />
          <p>
            If Roger Federer accepts your invitation within 30 mins, your court
            booking will be made automatically and the court fee will be
            deducted from your balance.
          </p>
        </div>
        <div className="flex items-center mt-4">
          <img
            src="/images/decline.png"
            alt="approve"
            className="w-8 h-8 mr-2"
          />
          <p>
            If Roger Federer doesn't accept your invitation within 30 mins or
            declines your invitation, your court reservation will automatically
            be canceled and you will not be charged any fees.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrainInviteBooking;
