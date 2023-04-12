import React from "react";

function ClubDetails() {
  return (
    <div className=" bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-md p-4 my-8 mr-2 w-1/2">
      <h2 className="font-bold text-4xl text-black">Club Details</h2>
      <div className="mt-4 flex items-center">
        <img
          src="/images/wimbledon_logo.png"
          alt="profile-pic"
          className="w-32 h-32 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Name:</p>
            <h2>Wimbledon Tennis Club</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Number of Courts:</p>
            <h2>7</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">
              Indoor / Outdoor Courts:
            </p>
            <h2>Both</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">District:</p>
            <h2>Kadıköy</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDetails;
