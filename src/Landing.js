import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex justify-between items-center">
      <img src="/images/landing.jpeg" className="rounded-md mt-4 mr-2 w-3/5" />
      <div className="flex-col text-center ml-2 w-2/5">
        <h2 className="text-5xl text-white font-bold">Welcome to Raket</h2>
        <p className="text-slate-300 mt-12 text-lg">
          Train with the most suitable partners according to your level and
          preferences. Challenge others and make your way to the top of the
          leaderboard.
        </p>
        <div className="flex w-3/4 mx-auto mt-8">
          <Link
            to="/login"
            className="p-1 border-2 mt-4 w-1/2 border-green-500 rounded-md hover:bg-green-500 hover:text-white mr-2"
          >
            <button type="button" value="login">
              <p className="text-white font-bold py-2 px-4"> Login</p>
            </button>
          </Link>
          <Link
            to="/register"
            className="p-1 border-2 mt-4 w-1/2 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white ml-2"
          >
            <button type="button" value="register">
              <p className="text-white font-bold py-2 px-4"> Register</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
