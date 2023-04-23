import React, { useState } from "react";
import Login from "./Login";
import LoginClub from "./LoginClub";
function LoginInitial() {
  const [displayed, setDisplayed] = useState("player");
  const handleDisplayed = (value) => {
    setDisplayed(value);
  };
  const activeColor = {
    backgroundColor: "rgb(59 130 246)",
    border: "rgb(59 130 246 / var(--tw-bg-opacity))",
    color: "white",
  };
  return (
    <>
      <div className="bg-heroLogin bg-bottom bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 w-full mt-8 rounded-md shadow-md">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => handleDisplayed("player")}
            className="border-white rounded-md border-2 w-1/2 p-2 mr-2 hover:border-blue-500"
            style={displayed == "player" ? activeColor : {}}
          >
            <p className="text-white font-bold">Player</p>
          </button>
          <button
            onClick={() => handleDisplayed("club")}
            className="border-white rounded-md border-2 w-1/2 p-2 ml-2  hover:border-blue-500"
            style={displayed == "club" ? activeColor : {}}
          >
            <p className="text-white font-bold"> Club</p>
          </button>
        </div>
        {displayed == "player" ? <Login /> : <LoginClub />}
      </div>
    </>
  );
}

export default LoginInitial;
