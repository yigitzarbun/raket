import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-4 items-center text-white">
        <Link to="/" className="w-1/5 text-3xl font-bold cursor-pointer">
          Raket
        </Link>
        <nav className="flex justify-around w-2/5">
          <Link
            to="/train"
            className="p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
          >
            Train
          </Link>
          <Link
            to="/match"
            className="p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
          >
            Match
          </Link>
          <Link
            to="/requests"
            className="p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
          >
            Requests
          </Link>
          <Link
            to="/scores"
            className="p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
          >
            Scores
          </Link>
          <Link
            to="/calendar"
            className="p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
          >
            Calendar
          </Link>
          <Link
            to="/account"
            className="p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
          >
            Account
          </Link>
          <Link
            to="/intro"
            className="w-1/5 text-right p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
          >
            Logout
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;
