import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-4 items-center text-white">
        <Link to="/" className="w-1/5 text-3xl font-bold cursor-pointer">
          Raket
        </Link>
        <nav className="flex justify-around w-2/5">
          <NavLink
            activeClassName="active-link"
            to="/train"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Train
          </NavLink>
          <NavLink
            activeClassName="active-link"
            to="/match"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Match
          </NavLink>
          <NavLink
            activeClassName="active-link"
            to="/requests"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Requests
          </NavLink>
          <NavLink
            activeClassName="active-link"
            to="/scores"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Scores
          </NavLink>
          <NavLink
            activeClassName="active-link"
            to="/calendar"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Calendar
          </NavLink>
          <NavLink
            activeClassName="active-link"
            to="/account"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Account
          </NavLink>
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
