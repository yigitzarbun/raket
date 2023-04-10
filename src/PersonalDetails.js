import React from "react";

function PersonalDetails() {
  return (
    <div className=" bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-md p-4 my-8 mr-2 w-1/2">
      <h2 className="font-bold text-4xl text-black">Personal Details</h2>
      <div className="mt-4 flex">
        <img
          src="/images/federer-face.png"
          alt="profile-pic"
          className="w-32 h-32 rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Name:</p>
            <h2>Roger Federer</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Gender:</p>
            <h2>Male</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Age:</p>
            <h2>32</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Level:</p>
            <h2>Pro</h2>
          </div>
          <div className="flex">
            <p className="text-slate-950 font-bold mr-2">Locations:</p>
            <h2>Büyük Kulüp, Miltaş Spor, Dalyan Club</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
