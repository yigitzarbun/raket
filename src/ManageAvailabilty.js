import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  GET_USER,
  getCourts,
  getBookings,
  addBooking,
} from "./redux stuff/actions";
import { toast } from "react-toastify";
function ManageAvailabilty() {
  let { user, bookings, courts } = useSelector((store) => store);
  if (user.club) {
    user = user.club;
  } else {
    user = user;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const handleCourt = (e) => {
    setSelectedCourt(e.target.value);
  };
  const handleDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const availableTimes = [];
  let bookedTimes = [];
  let opening = null;
  let closing = null;

  if (selectedCourt !== "" && courts) {
    const court = courts.filter((c) => c.court_id === Number(selectedCourt))[0];
    if (court && court.opening && court.closing) {
      opening = court.opening;
      closing = court.closing;
      for (let t = opening; t <= closing - 1; t += 100) {
        availableTimes.push(t);
      }
    }
  }
  if (selectedCourt !== "" && selectedDate !== "" && courts && bookings) {
    let bookedTimesArr = bookings.filter(
      (b) =>
        b.court_id === Number(selectedCourt) &&
        b.event_date === selectedDate &&
        (b.status === "confirmed" || b.status === "pending")
    );
    if (bookedTimesArr.length > 0) {
      for (let i = 0; i < bookedTimesArr.length; i++) {
        bookedTimes.push(bookedTimesArr[i]["time"]);
      }
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const handleNewBooking = (data) => {
    let dataWide = {
      ...data,
      status: "confirmed",
      date: new Date(),
      event_date: data.event_date,
      time: data.time,
      club_id: user.club_id,
      court_id: data.court_id,
    };
    dispatch(addBooking(dataWide));
    toast.success("Booking added");
    navigate("/club-account");
    reset();
  };

  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getCourts());
    dispatch(getBookings());
  }, []);
  return (
    <div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">Add New Booking</h2>
        <p className="mt-4 italic text-sm text-slate-400">
          Book a court for your own members, so that Raket users cannot book
          that court at the specified date & time.
        </p>
        <form
          onSubmit={handleSubmit(handleNewBooking)}
          className="newCourtForm flex flex-col mt-4"
        >
          <div className="newCourtContainer">
            <label>Court</label>
            <select
              {...register("court_id", {
                required: "Court is required",
              })}
              onChange={handleCourt}
            >
              <option value="">-- Choose a Court --</option>
              {courts &&
                courts
                  .filter((c) => c.club_id === user.club_id)
                  .map((c) => (
                    <option key={c.court_id} value={c.court_id}>
                      {c.court_name}
                    </option>
                  ))}
              {errors.court_id && <span>{errors.court_id.message}</span>}
            </select>
          </div>
          <div className="newCourtContainer">
            <label>Date</label>
            <input
              type="date"
              {...register("event_date", {
                required: "Dete is required",
              })}
              onChange={handleDate}
            />
            {errors.event_date && <span>{errors.event_date.message}</span>}
          </div>
          <div className="newCourtContainer">
            <label>Time</label>
            <select
              {...register("time", {
                required: "Time is required",
              })}
            >
              <option value="">-- Choose Time --</option>
              {availableTimes
                .filter((t) => bookedTimes.includes(t) === false)
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
            </select>
            {errors.time && <span>{errors.time.message}</span>}
          </div>
          <div className="flex">
            <button
              className="mt-4 mr-2  border-2 w-1/2 cursor-pointer border-green-500 rounded-md hover:bg-green-500 hover:text-white p-2"
              disabled={!isValid}
              type="submit"
            >
              <p className="font-bold">Add Booking</p>
            </button>
            <Link
              to="/club-account"
              className="font-bold mt-4 ml-2 w-1/2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white p-2 text-center"
            >
              <button>
                <p>Discard</p>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManageAvailabilty;
