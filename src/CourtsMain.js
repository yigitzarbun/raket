import React from "react";
import { Link } from "react-router-dom";
function CourtsMain() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 mr-4 mt-8 w-1/2 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Courts</h2>
      <p className="mt-4">
        Add and manage courts, offer them to Raket players.
      </p>
      <Link to="/club-courts">
        <button className="mt-4 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold"> Manage Courts</p>
        </button>
      </Link>
    </div>
  );
}

export default CourtsMain;
