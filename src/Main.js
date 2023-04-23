import React from "react";
import Train from "./Train";
import Match from "./Match";
import Hero from "./Hero";
import Requests from "./Requests";
import Upcoming from "./Upcoming";
import Stats from "./Stats";
import Equipment from "./Equipment";
import { useSelector } from "react-redux";

function Main() {
  const { user } = useSelector((store) => store);
  return (
    <div>
      <Hero />
      <div className="flex justify-between">
        <Train />
        <Match />
      </div>
      <Requests />
      <div className="flex justify-between">
        <Upcoming />
        <div className="flex flex-col w-2/3">
          <Stats />
          <Equipment />
        </div>
      </div>
    </div>
  );
}

export default Main;
