import React from "react";
import CourtsMain from "./CourtsMain";
import CalendarMain from "./CalendarMain";
import Equipment from "./Equipment";
function ClubMain() {
  return (
    <div>
      <div className="bg-hero bg-bottom bg-auto py-28 rounded-md mt-4"></div>
      <div className="flex justify-between">
        <CourtsMain />
        <CalendarMain />
      </div>
      <div>
        <Equipment />
      </div>
    </div>
  );
}

export default ClubMain;
