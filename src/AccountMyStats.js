import React from "react";

function AccountMyStats() {
  return (
    <div className="bg-slate-800 text-white rounded-md p-4 my-8">
      <h2 className="font-bold text-4xl">Stats</h2>
      <div className="flex justify-between mt-4">
        <div className="text-center">
          <p className="text-4xl font-bold">10</p>
          <p>Events</p>
        </div>
        <div className="text-center text-green-400">
          <p className="text-4xl font-bold">10</p>
          <p>Won</p>
        </div>
        <div className="text-center text-red-400">
          <p className="text-4xl font-bold">0</p>
          <p>Lost</p>
        </div>
        <div className="text-center text-blue-400">
          <p className="text-4xl font-bold">0</p>
          <p>Practice</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold">#1</p>
          <p>Ranking</p>
        </div>
      </div>
    </div>
  );
}

export default AccountMyStats;
