import React from "react";
import { Link } from "react-router-dom";

function Match() {
  return (
    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-8 ml-4 mt-8 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Match</h2>
      <p className="mt-4">
        Challenge players and make your way to the top of the leaderboard
      </p>
      <Link to="/match">
        <button className="mt-4 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold">Challenge an opponent</p>
        </button>
      </Link>
    </div>
  );
}

export default Match;
