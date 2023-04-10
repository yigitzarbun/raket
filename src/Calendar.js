import React from "react";

function Calendar() {
  return (
    <div>
      <div className="bg-heroCalendar bg-bottom bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <h2 className="font-bold text-4xl text-white">Calendar</h2>
        <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
          <table className="w-full text-left">
            <thead>
              <tr className="h-12 text-blue-400">
                <th>Event</th>
                <th>#</th>
                <th>Player</th>
                <th>Player Name</th>
                <th>Level</th>
                <th>Gender</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Court</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-12">
                <td className="text-slate-300">Training</td>
                <td className="text-slate-300">1</td>
                <td>
                  <img
                    src="/images/alcaraz.png"
                    alt="player-image"
                    className="w-12 h-12 rounded-full object-contain "
                  />
                </td>
                <td>Carlos Alcaraz</td>
                <td>Pro</td>
                <td>Male</td>
                <td>Dalyan Club</td>
                <td>09.04.2023</td>
                <td>19:00</td>
                <td>5</td>

                <button
                  type="button"
                  value="invite"
                  className="p-1 border-2 mt-4 border-red-500 rounded-md hover:bg-red-500 hover:text-white ml-2"
                >
                  Cancel
                </button>
              </tr>
              <tr className="h-12">
                <td className="text-slate-300">Training</td>
                <td className="text-slate-300">2</td>
                <td>
                  <img
                    src="/images/federer-face.png"
                    alt="player-image"
                    className="w-12 h-12 rounded-full object-contain "
                  />
                </td>
                <td>Roger Federer</td>
                <td>Pro</td>
                <td>Male</td>
                <td>Büyük Kulüp</td>
                <td>11.04.2023</td>
                <td>10:00</td>
                <td>1</td>

                <button
                  type="button"
                  value="invite"
                  className="p-1 border-2 mt-4 border-red-500 rounded-md hover:bg-red-500 hover:text-white ml-2"
                >
                  Cancel
                </button>
              </tr>
              <tr className="h-12">
                <td className="text-slate-300">Training</td>
                <td className="text-slate-300">3</td>
                <td>
                  <img
                    src="/images/nadal-face.png"
                    alt="player-image"
                    className="w-12 h-12 rounded-full object-contain "
                  />
                </td>
                <td>Rafael Nadal</td>
                <td>Pro</td>
                <td>Male</td>
                <td>Miltaş Spor Tesisleri</td>
                <td>01.05.2023</td>
                <td>20:00</td>
                <td>2</td>

                <button
                  type="button"
                  value="invite"
                  className="p-1 border-2 mt-4 border-red-500 rounded-md hover:bg-red-500 hover:text-white ml-2"
                >
                  Cancel
                </button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
