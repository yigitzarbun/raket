import React from "react";
import { Link } from "react-router-dom";
function CalendarSelectedDay(props) {
  const { selectedDay, myEvents, handleSelectedDay } = props;
  const eventType = "Training";
  let resultJsx = [];
  if (myEvents.length === 0) {
    resultJsx.push(
      <div className="flex items-center justify-center h-full">
        <p className="text-center">No events available</p>
      </div>
    );
  } else if (selectedDay === "") {
    resultJsx.push(
      <div className="flex items-center justify-center h-full">
        <p className="text-center">Select a day to view details</p>
      </div>
    );
  } else if (selectedDay.length > 0) {
    resultJsx = (
      <div>
        <h2 className="text-center font-bold text-blue-400 text-xl">
          {selectedDay[0]["event_date"]}
        </h2>

        <table className="w-full text-left mt-4">
          <thead>
            <tr>
              <th>Event</th>
              <th>Time</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {selectedDay.map((s) => (
              <tr key={selectedDay[0]["invite_id"]}>
                <td>{eventType}</td>
                <td>
                  {s.time < 1000
                    ? "0" +
                      s.time.toString()[0] +
                      ":" +
                      s.time.toString()[1] +
                      s.time.toString()[2]
                    : s.time.toString()[0] +
                      s.time.toString()[1] +
                      ":" +
                      s.time.toString()[2] +
                      s.time.toString()[3]}
                </td>
                <td>
                  {s.name.length > 9
                    ? s.name.slice(0, 9).padEnd(11, ".")
                    : s.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-1/2 mx-auto my-6">
          <button
            onClick={() => handleSelectedDay("")}
            className="w-full text-center border-2 border-blue-500 rounded-md hover:bg-blue-500 p-2 font-bold"
          >
            Done
          </button>
        </div>
        <Link
          to="/calendar"
          className="text-sm text-slate-400 hover:text-blue-500"
        >
          View list for detailed information
        </Link>
      </div>
    );
  }

  return (
    <div className="w-1/4 bg-black text-white rounded-md p-2">{resultJsx}</div>
  );
}
export default CalendarSelectedDay;
