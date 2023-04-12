import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
function NewCourt() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const handleNewCourt = (data) => {
    let dataWide = {
      ...data,
      id: Date.now(),
      registry_date: Date.now(),
    };
    console.log(dataWide);
    navigate("/");
    reset();
  };
  return (
    <div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">Add New Court</h2>
        <form
          onSubmit={handleSubmit(handleNewCourt)}
          className="newCourtForm flex flex-col mt-4"
        >
          <div className="newCourtContainer">
            <label>Court Name / Number</label>
            <input
              placeholder="e.g. Court 1"
              type="name"
              {...register("name", {
                required: "Court name / number is required",
              })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div className="newCourtContainer">
            <label>Surface</label>
            <select
              {...register("court_type", {
                required: "Surface type is required",
              })}
            >
              <option value="">-- Select surface --</option>
              <option value="hard">Hard </option>
              <option value="clay">Clay </option>
              <option value="grass">Grass</option>
              <option value="artificial_grass">Artificial Grass</option>
              <option value="other">Other</option>
            </select>
            {errors.court_type && <span>{errors.court_type.message}</span>}
          </div>
          <div className="newCourtContainer">
            <label>Indoor / Outdoor</label>
            <select
              {...register("indoor_outdoor", {
                required: "Indoor / Outdoor is required",
              })}
            >
              <option value="">-- Select type --</option>
              <option value="indoor">Indoor </option>
              <option value="outdoor">Outdoor </option>
            </select>
            {errors.indoor_outdoor && (
              <span>{errors.indoor_outdoor.message}</span>
            )}
          </div>
          <div className="newCourtContainer">
            <label>Opening Hour</label>
            <input
              type="time"
              {...register("opening", {
                required: "Opening hour is required",
              })}
            />
            {errors.opening && <span>{errors.opening.message}</span>}
          </div>
          <div className="newCourtContainer">
            <label>Closing Hour</label>
            <input
              type="time"
              {...register("closing", {
                required: "Closing hour is required",
              })}
            />
            {errors.closing && <span>{errors.closing.message}</span>}
          </div>
          <div className="newCourtContainer">
            <label>Price (TL) / hour</label>
            <input
              placeholder="e.g. 150"
              type="number"
              {...register("price", {
                required: "Court price per hour is required",
              })}
            />
            {errors.price && <span>{errors.price.message}</span>}
          </div>
          <div className="flex">
            <button
              className="mt-4 mr-2  border-2 w-1/2 cursor-pointer border-green-500 rounded-md hover:bg-green-500 hover:text-white p-2"
              disabled={!isValid}
              type="submit"
            >
              <p className="font-bold">Add Court</p>
            </button>
            <Link
              to="/"
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

export default NewCourt;
