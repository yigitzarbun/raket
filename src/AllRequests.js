import React, { useState } from "react";
import HeroRequests from "./HeroRequests";
import IncomingRequests from "./IncomingRequests";
import OutgoingRequests from "./OutgoingRequests";

function AllRequests() {
  const [displayed, setDisplayed] = useState("incoming");
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
      <HeroRequests />
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <div className="flex justify-between">
          <button
            className="border-white rounded-md border-2 w-1/2 p-2 mr-2 hover:border-blue-500"
            style={displayed == "incoming" ? activeColor : {}}
            onClick={() => handleDisplayed("incoming")}
          >
            <p className="text-white font-bold"> Incoming</p>
          </button>
          <button
            className="border-white rounded-md border-2 w-1/2 p-2 mr-2 hover:border-blue-500"
            style={displayed == "outgoing" ? activeColor : {}}
            onClick={() => handleDisplayed("outgoing")}
          >
            <p className="text-white font-bold"> Outgoing</p>
          </button>
        </div>
        {displayed == "incoming" ? <IncomingRequests /> : <OutgoingRequests />}
      </div>
    </div>
  );
}

export default AllRequests;
