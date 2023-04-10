import React from "react";
import { Link } from "react-router-dom";
function MatchSuggest() {
  return (
    <div className="bg-slate-800 text-white  p-8 mr-4 mt-8 w-2/3 rounded-md shadow-md flex flex-col ">
      <h2 className="font-bold text-4xl">Suggested</h2>
      <div className="flex justify-around mt-8 items-center">
        <img src="/images/djokovic.png" alt="opponent" className="w-1/3" />
        <div className="w-1/2">
          <p>#5</p>
          <p className="font-bold text-2xl">Novak Djokovic</p>
          <p>Male</p>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-4xl font-bold">10</p>
              <p>Events</p>
            </div>
            <div className="text-center text-green-400">
              <p className="text-4xl font-bold">6</p>
              <p>Won</p>
            </div>
            <div className="text-center text-red-400">
              <p className="text-4xl font-bold">2</p>
              <p>Lost</p>
            </div>
            <div className="text-center text-blue-400">
              <p className="text-4xl font-bold">2</p>
              <p>Practice</p>
            </div>
          </div>
          <p className="mt-8 text-sm italic">
            Would you like to challenge Novak for a match?
          </p>
          <div>
            <Link to="/challenge">
              <button className="mt-4 p-2 border-2 border-green-500 rounded-md hover:bg-green-500 hover:text-white">
                <p className="font-bold"> Challenge Novak</p>
              </button>
            </Link>
            <button className="mt-4 p-2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white ml-4">
              <p className="font-bold"> Skip</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchSuggest;
