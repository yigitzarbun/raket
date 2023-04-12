import React, { useState } from "react";
import NewCourt from "./NewCourt";
import CourtsList from "./CourtsList";
function Courts() {
  const [displayed, setDisplayed] = useState("newCourt");
  const handleDisplayed = (value) => {
    setDisplayed(value);
  };
  const activeColor = {
    backgroundColor: "rgb(59 130 246)",
    border: "rgb(59 130 246 / var(--tw-bg-opacity))",
    color: "white",
  };
  return (
    <div>
      <div className="bg-heroCourts bg-center bg-auto py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 w-full mt-8 rounded-md shadow-md">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => handleDisplayed("newCourt")}
            className="border-white rounded-md border-2 w-1/2 p-2 mr-2 hover:border-blue-500"
            style={displayed == "newCourt" ? activeColor : {}}
          >
            <p className="text-white font-bold">New Court</p>
          </button>
          <button
            onClick={() => handleDisplayed("courtsList")}
            className="border-white rounded-md border-2 w-1/2 p-2 ml-2  hover:border-blue-500"
            style={displayed == "courtsList" ? activeColor : {}}
          >
            <p className="text-white font-bold">Courts List</p>
          </button>
        </div>
        {displayed == "newCourt" ? <NewCourt /> : <CourtsList />}
      </div>
    </div>
  );
}

export default Courts;
