import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LOGOUT } from "./redux stuff/actions";
import { useDispatch, useSelector } from "react-redux";
function Header() {
  const user = useSelector((store) => store.user);
  console.log(user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-4 items-center text-white">
        <Link to="/" className="w-1/5 text-3xl font-bold cursor-pointer">
          Raket
        </Link>
        <nav className="flex justify-around w-2/5">
          <NavLink
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
            to="/account"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Account
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-1/5 text-right p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
          >
            Logout
          </button>
          <NavLink
            to="/club-courts"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Courts
          </NavLink>
          <NavLink
            to="/club-account"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Club Account
          </NavLink>
          <NavLink
            to="/club-calendar"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Club Calendar
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default Header;
