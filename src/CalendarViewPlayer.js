import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvites, GET_USER } from "./redux stuff/actions";
import CalendarSelectedDay from "./CalendarSelectedDay";
function CalendarViewPlayer() {
  const dispatch = useDispatch();
  let { user, invites } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  }
  let myEvents = [];
  if (user && invites && Array.isArray(invites) && invites.length > 0) {
    myEvents = invites.filter(
      (i) =>
        (i.inviter_id === user.player_id || i.invitee_id === user.player_id) &&
        i.status === "confirmed"
    );
  }
  let now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState("");
  const handleSelectedDay = (value) => {
    setSelectedDay(value);
  };
  const years = [];
  for (let y = 2023; y < 2053; y++) {
    years.push(y);
  }
  const handleYear = (e) => {
    setSelectedYear(e.target.value);
  };
  const months = [];
  for (let m = 1; m <= 12; m++) {
    months.push(m);
  }
  const handleMonths = (e) => {
    setSelectedMonth(e.target.value);
  };
  const firstDayOfWeek = new Date(selectedYear, selectedMonth - 1, 1).getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const adjustedDayNames = [
    ...dayNames.slice(firstDayOfWeek),
    ...dayNames.slice(0, firstDayOfWeek),
  ];
  let daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  let days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getInvites());
  }, []);
  return (
    <div>
      <div className="bg-heroCalendar bg-bottom bg-cover py-28 rounded-md mt-4"></div>
      <div className="flex justify-center text-white text-xl font-bold mt-4">
        <select
          onChange={handleYear}
          className="w-1/5 mx-auto bg-inherit text-slate-400 border-2 border-slate-400 rounded-md p-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
          defaultValue={selectedYear}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          onChange={handleMonths}
          className="w-1/5 mx-auto bg-inherit text-slate-400 border-2 border-slate-400 rounded-md p-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
          defaultValue={selectedMonth}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between mt-8">
        <div className="flex flex-wrap  bg-slate-800 text-white rounded-md p-4 w-3/4 mr-2">
          {adjustedDayNames.map((day) => (
            <div
              key={day}
              className="p-2 calendarWidth border-2 border-slate-600 bg-slate-950 text-white font-bold text-xl"
            >
              {day}
            </div>
          ))}
          {days.map((d) => (
            <div
              key={d}
              className="p-2 calendarWidth border-2 border-slate-600 bg-slate-900 text-white"
            >
              <p className="font-bold"> {d}</p>
              {myEvents.filter(
                (e) =>
                  e.event_date ===
                  `${selectedYear}-${String(selectedMonth).padStart(
                    2,
                    0
                  )}-${String(d).padStart(2, 0)}`
              ).length > 0 && (
                <p
                  onClick={() =>
                    handleSelectedDay(
                      myEvents.filter(
                        (e) =>
                          e.event_date ===
                          `${selectedYear}-${String(selectedMonth).padStart(
                            2,
                            0
                          )}-${String(d).padStart(2, 0)}`
                      )
                    )
                  }
                  className="text-sm text-blue-500 cursor-pointer"
                >
                  {myEvents.filter(
                    (e) =>
                      e.event_date ===
                      `${selectedYear}-${String(selectedMonth).padStart(
                        2,
                        0
                      )}-${String(d).padStart(2, 0)}`
                  ).length + " trainings"}
                </p>
              )}
            </div>
          ))}
        </div>
        <CalendarSelectedDay selectedDay={selectedDay} myEvents={myEvents} />
      </div>
    </div>
  );
}

export default CalendarViewPlayer;
