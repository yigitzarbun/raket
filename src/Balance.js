import React from "react";
import { Link } from "react-router-dom";
function Balance() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 my-8  mx-2 w-1/4 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Balance</h2>
      <h4 className="text-2xl mt-4">TL 2.145,00</h4>
      <Link to="/add-balance">
        <button className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white">
          <p className="font-bold">Add Balance</p>
        </button>
      </Link>
    </div>
  );
}

export default Balance;
