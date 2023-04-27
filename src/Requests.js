import React from "react";
import { Link } from "react-router-dom";

function Requests() {
  return (
    <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-8 mt-8 rounded-md shadow-md flex flex-col">
      <h2 className="font-bold text-4xl">Requests</h2>
      <div className="flex justify-between items-center mt-8">
        <img src="/images/john_isner.png" alt="opponent" className="w-16" />
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Challenger</p>
          <p>Liam Salisbury</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Event</p>
          <p>Match</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Date</p>
          <p>09.04.2023</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Time</p>
          <p>19:00</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Location</p>
          <p>Moda Sahil</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold italic">Kort</p>
          <p>Kort 1</p>
        </div>
        <div>
          <button className=" p-2 border-2 border-black rounded-md hover:bg-black hover:text-white mr-2">
            <p className="font-bold">Accept</p>
          </button>
          <button className=" p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
            <p className="font-bold">Decline</p>
          </button>
        </div>
      </div>
      <Link to="requests">
        <p className="text-sm ml-auto mt-4 cursor-pointer italic hover:text-slate-800">
          View all requests
        </p>
      </Link>
    </div>
  );
}

export default Requests;
