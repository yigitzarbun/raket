import React, { useState } from "react";
import MyStats from "./MyStats";
import Leaderboard from "./Leaderboard";

function Stats() {
  const [displayed, setDisplayed] = useState("myStats");
  const handleDisplayed = (value) => {
    setDisplayed(value);
  };
  const activeColor = {
    backgroundColor: "rgb(59 130 246)",
    border: "rgb(59 130 246 / var(--tw-bg-opacity))",
    color: "white",
  };
  return (
    <div className="bg-slate-950 p-5 w-full mt-8 rounded-md shadow-md">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => handleDisplayed("myStats")}
          className="border-white rounded-md border-2 w-1/2 p-2 mr-2 hover:border-blue-500"
          style={displayed == "myStats" ? activeColor : {}}
        >
          <p className="text-white font-bold"> My Stats</p>
        </button>
        <button
          onClick={() => handleDisplayed("leaderboard")}
          className="border-white rounded-md border-2 w-1/2 p-2 ml-2  hover:border-blue-500"
          style={displayed == "leaderboard" ? activeColor : {}}
        >
          <p className="text-white font-bold"> Leaderboard</p>
        </button>
      </div>
      {displayed == "myStats" ? <MyStats /> : <Leaderboard />}
    </div>
  );
}

export default Stats;
