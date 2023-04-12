import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
function ManageAvailabilty() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const handleNewBooking = (data) => {
    let dataWide = {
      ...data,
      id: Date.now(),
    };
    console.log(dataWide);
    navigate("/club-account");
    reset();
  };
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
              {...register("court", {
                required: "Court is required",
              })}
            >
              <option value="">-- Choose a Court --</option>
              <option value="1">Court 1</option>
              <option value="2">Court 2</option>
              <option value="3">Court 3</option>
              <option value="center">Center Court</option>
              {errors.court && <span>{errors.court.message}</span>}
            </select>
          </div>
          <div className="newCourtContainer">
            <label>Date</label>
            <input
              type="date"
              {...register("date", {
                required: "Dete is required",
              })}
            />
            {errors.date && <span>{errors.date.message}</span>}
          </div>
          <div className="newCourtContainer">
            <label>Time</label>
            <input
              type="time"
              {...register("time", {
                required: "Time hour is required",
              })}
            />
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
