import React, { useState } from "react";

function CalendarViewPlayer() {
  let now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
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
  let daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  let days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div>
      <div className="bg-heroCalendar bg-bottom bg-cover py-28 rounded-md mt-4"></div>
      <div className="flex flex-col text-center text-white text-2xl font-bold mt-4">
        <select
          onChange={handleYear}
          className="text-black w-1/5 mx-auto"
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
          className="text-black w-1/5 mx-auto"
          defaultValue={selectedMonth}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap mt-8">
        {days.map((d) => (
          <div
            key={d}
            className="p-2 calendarWidth border-2 border-blue-300 text-white"
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarViewPlayer;
