import React from "react";
import { Link } from "react-router-dom";

function Train() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 mr-4 mt-8 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Train</h2>
      <p className="mt-4">
        Train with players suitable to your level, location and preferences
      </p>
      <Link to="/train">
        <button className="mt-4 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold"> Find a partner</p>
        </button>
      </Link>
    </div>
  );
}

export default Train;
