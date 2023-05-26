import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { GET_USER, LOGOUT, getInvites } from "./redux stuff/actions";
import { useDispatch, useSelector } from "react-redux";
function Header() {
  let { user, invites } = useSelector((store) => store);
  if (user) {
    if (user.player) {
      user = user.player;
    } else if (user.club) {
      user = user.club;
    }
  }
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };
  let newInvites = null;
  if (invites === null) {
    newInvites = "";
  } else if (invites.length === 0) {
    newInvites = "";
  } else if (Array.isArray(invites) && invites && user) {
    newInvites = invites.filter(
      (invite) =>
        invite.invitee_id === user.player_id && invite.status === "pending"
    ).length;
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-4 items-center text-white">
        <Link
          to={user && user.user_type === "player" ? "/" : "club-dashboard"}
          className="w-1/5 text-3xl font-bold cursor-pointer"
        >
          Raket
        </Link>
        <nav className="flex justify-around w-3/5">
          {user && user.user_type === "player" && (
            <>
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
                {newInvites > 0 && (
                  <span className="text-blue-400 text-xs ml-1">
                    ({newInvites})
                  </span>
                )}
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
            </>
          )}
          {user && user.user_type === "club" && (
            <>
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
                to="/club-calendar"
                className={({ isActive }) =>
                  isActive
                    ? "active-link"
                    : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
                }
              >
                Calendar
              </NavLink>
              <NavLink
                to="/club-account"
                className={({ isActive }) =>
                  isActive
                    ? "active-link"
                    : "p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
                }
              >
                Account
              </NavLink>
            </>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className=" p-2 font-bold cursor-pointer border-2 border-red-500  hover:bg-red-500 rounded-md hover:text-white"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;
