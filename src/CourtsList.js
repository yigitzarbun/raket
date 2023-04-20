import React from "react";

function CourtsList() {
  return (
    <div>
      <div className="bg-slate-950 p-8 w-full mt-8 rounded-md shadow-md">
        <h2 className="font-bold text-4xl text-white ">Courts</h2>
        <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
          <table className="w-full text-left">
            <tr className="h-12">
              <th>Court Name / No.</th>
              <th>Surface</th>
              <th>Indoor / Outdoor</th>
              <th>Price per hour</th>
              <th className="text-green-400">Opening hour</th>
              <th className="text-red-500">Closing hour</th>
              <th>Action</th>
            </tr>
            <tr className="h-12">
              <td className="text-slate-300">1</td>
              <td>Clay</td>
              <td>Indoor</td>
              <td>TL 150</td>
              <td className="text-green-400">08:00</td>
              <td className="text-red-500">22:00</td>
              <td className="py-1 px-4 border-2  border-blue-500 rounded-md hover:bg-blue-500 hover:text-white ml-2 mt-2">
                Edit
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CourtsList;
