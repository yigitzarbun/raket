import React, { useState } from "react";
import PastResults from "./PastResults";
import PendingResults from "./PendingResults";
function Scores() {
  const [displayed, setDisplayed] = useState("pending");
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
      <div className="bg-heroScores bg-bottom bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <div className="flex justify-between">
          <button
            className="border-white rounded-md border-2 w-1/2 p-2 mr-2 hover:border-blue-500"
            style={displayed == "pending" ? activeColor : {}}
            onClick={() => handleDisplayed("pending")}
          >
            <p className="text-white font-bold"> Pending</p>
          </button>
          <button
            className="border-white rounded-md border-2 w-1/2 p-2 mr-2 hover:border-blue-500"
            style={displayed == "past" ? activeColor : {}}
            onClick={() => handleDisplayed("past")}
          >
            <p className="text-white font-bold"> Past</p>
          </button>
        </div>
        {displayed == "pending" ? <PendingResults /> : <PastResults />}
      </div>
    </div>
  );
}

export default Scores;
