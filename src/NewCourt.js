import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addCourt,
  GET_USER,
  getCourtTypes,
  getIndoorOutdoor,
} from "./redux stuff/actions";
function NewCourt() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user, courtTypes, indoorOutdoor } = useSelector((store) => store);
  if (user.club) {
    user = user.club;
  } else {
    user = user;
  }
  let availableTimes = [];
  for (let i = 0; i < 2400; i += 100) {
    availableTimes.push(i);
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const handleNewCourt = (data) => {
    let dataWide = {
      court_name: data.name,
      opening: data.opening,
      closing: data.closing,
      price: data.price,
      club_id: user.club_id,
      indoor_outdoor_id: data.indoor_outdoor,
      court_type_id: data.court_type,
    };
    dispatch(addCourt(dataWide, navigate));
    reset();
  };
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getCourtTypes());
    dispatch(getIndoorOutdoor());
  }, []);
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
              {courtTypes &&
                courtTypes.map((t) => (
                  <option key={t.court_type_id} value={t.court_type_id}>
                    {t.court_type}
                  </option>
                ))}
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
              {indoorOutdoor &&
                indoorOutdoor
                  .filter((i) => i.indoor_outdoor !== "both")
                  .map((i) => (
                    <option
                      key={i.indoor_outdoor_id}
                      value={i.indoor_outdoor_id}
                    >
                      {i.indoor_outdoor}
                    </option>
                  ))}
            </select>
            {errors.indoor_outdoor && (
              <span>{errors.indoor_outdoor.message}</span>
            )}
          </div>
          <div className="newCourtContainer">
            <label>Opening Hour</label>
            <select
              {...register("opening", {
                required: "Time is required",
              })}
            >
              <option value="">-- Choose Time --</option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>
                  {t === 0
                    ? "00:00"
                    : t < 1000
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
            {errors.opening && <span>{errors.opening.message}</span>}
          </div>
          <div className="newCourtContainer">
            <label>Closing Hour</label>
            <select
              {...register("closing", {
                required: "Time is required",
              })}
            >
              <option value="">-- Choose Time --</option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>
                  {t === 0
                    ? "00:00"
                    : t < 1000
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
              to="/club-dashboard"
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
