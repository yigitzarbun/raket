import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GET_USER,
  getBookings,
  getClubs,
  getCourts,
} from "./redux stuff/actions";
function MatchInvite() {
  let { user, clubs, courts, bookings } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const opponent = location.state;
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const handleSelectedClub = (e) => {
    setSelectedClub(e.target.value);
  };
  const handleSelectedDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleSelectedCourt = (e) => {
    setSelectedCourt(e.target.value);
  };
  const openCourtTimes = [];
  let opening = 0;
  let closing = 0;

  if (
    courts &&
    clubs &&
    selectedClub !== "" &&
    courts.filter((c) => Number(c.court_id) === Number(selectedCourt))[0]
  ) {
    opening = courts.filter(
      (c) => Number(c.court_id) === Number(selectedCourt)
    )[0]["opening"];
    closing = courts.filter(
      (c) => Number(c.court_id) === Number(selectedCourt)
    )[0]["closing"];
    for (let i = opening; i < closing; i += 100) {
      openCourtTimes.push(i);
    }
  }

  let bookedTimes = [];
  if (
    courts &&
    bookings &&
    clubs &&
    selectedClub !== "" &&
    selectedCourt !== "" &&
    selectedDate !== ""
  ) {
    bookings
      .filter(
        (b) =>
          b.event_date === selectedDate &&
          Number(b.court_id) === Number(selectedCourt) &&
          (b.status === "confirmed" || b.status === "pending")
      )
      .map((b) => bookedTimes.push(b.time));
  }
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  if (String(month).length === 1) {
    month = String(month).padStart(2, "0");
  }
  if (String(date).length === 1) {
    date = String(date).padStart(2, "0");
  }
  const currDate = `${year}-${month}-${date}`;
  const hour = today.getHours();
  let minute = today.getMinutes();
  if (String(minute).length === 1) {
    minute = String(minute).padStart(2, "0");
  }
  const time = Number(String(hour) + String(minute));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const handleChallenge = (data) => {
    // prepare send challenge dataWide
    // ****
    // add challenge to db
    // ****
    // add booking

    navigate("/challenge-booking");
  };
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getClubs());
    dispatch(getCourts());
    dispatch(getBookings());
  }, []);
  return (
    <>
      <div className="bg-heroMatch bg-center bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">{`Challenge ${opponent.fname}`}</h2>

        <form
          onSubmit={handleSubmit(handleChallenge)}
          className="trainInviteForm flex flex-col mt-4"
        >
          <div className="trainInviteFormContainer">
            <label>Location</label>
            <select
              {...register("location", {
                required: "Training location is required",
              })}
              onChange={handleSelectedClub}
            >
              <option value="">-- Choose a Location --</option>
              {clubs &&
                clubs.map((c) => (
                  <option key={c.club_id} value={c.club_id}>
                    {c.name}
                  </option>
                ))}
            </select>
            {errors.location && <span>{errors.location.message}</span>}
          </div>
          <div className="trainInviteFormContainer">
            <label>Date</label>
            <input
              type="date"
              {...register("date", {
                required: "Training date is required",
              })}
              onChange={handleSelectedDate}
            />
            {errors.date && <span>{errors.date.message}</span>}
          </div>
          <div className="trainInviteFormContainer">
            <label>Court</label>
            <select
              {...register("court", {
                required: "Court is required",
              })}
              onChange={handleSelectedCourt}
            >
              <option value="">-- Choose a Court --</option>
              {courts &&
                selectedClub &&
                courts
                  .filter((c) => Number(c.club_id) === Number(selectedClub))
                  .map((c) => (
                    <option key={c.court_id} value={c.court_id}>
                      {c.court_name}
                    </option>
                  ))}
              {errors.court && <span>{errors.court.message}</span>}
            </select>
          </div>
          <label className="mt-4">Time</label>
          <div className=" flex flex-wrap mt-0">
            <label>Court</label>
            <select
              {...register("time", {
                required: "Time is required",
              })}
            >
              <option value="">-- Pick a Time --</option>
              {openCourtTimes.length > 0 &&
                courts &&
                clubs &&
                bookings &&
                selectedClub !== "" &&
                selectedCourt !== "" &&
                selectedDate !== "" &&
                openCourtTimes
                  .filter((t) => {
                    if (!bookedTimes.includes(t) && selectedDate > currDate) {
                      return t;
                    } else if (
                      !bookedTimes.includes(t) &&
                      t > time &&
                      selectedDate === currDate
                    ) {
                      return t;
                    }
                  })
                  .map((t) => (
                    <option key={t} value={t}>
                      {t < 1000
                        ? "0" +
                          t.toString()[0] +
                          ":" +
                          t.toString()[1] +
                          t.toString()[2]
                        : t.toString()[0] +
                          t.toString()[1] +
                          ":" +
                          t.toString()[2] +
                          t.toString()[3]}
                    </option>
                  ))}
              {errors.court && <span>{errors.court.message}</span>}
            </select>
            {errors.time && <span>{errors.time.message}</span>}
          </div>
          <div className="trainInviteFormContainer">
            <label>Message</label>
            <textarea
              type="input"
              {...register("message")}
              placeholder={`Hey ${opponent.name}, are you up for a match?`}
              className="px-2 py-4"
            />
            {errors.message && <span>{errors.message.message}</span>}
          </div>
          <div>
            <button
              className="mt-4 p-2 border-2 cursor-pointer border-green-500 rounded-md hover:bg-green-500 hover:text-white"
              disabled={!isValid}
              type="submit"
            >
              <p className="font-bold"> {`Challenge ${opponent.fname}`}</p>
            </button>
            <Link to="/match">
              <button className="font-bold mt-4 p-2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white ml-4">
                Discard
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default MatchInvite;
