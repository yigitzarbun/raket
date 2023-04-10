import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function TrainInvite(props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const handleTrainInvite = (data) => {
    console.log(data);
    navigate("/invite-booking");
  };

  return (
    <>
      <div className="bg-heroTrain bg-center bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">Invite</h2>

        <form
          onSubmit={handleSubmit(handleTrainInvite)}
          className="trainInviteForm flex flex-col mt-4"
        >
          <div className="trainInviteFormContainer">
            <label>Location</label>
            <select
              {...register("location", {
                required: "Training location is required",
              })}
            >
              <option value="">-- Choose a Location --</option>
              <option value="dalyan">Dalyan Club</option>
              <option value="optimum">Optimum Tenis Akademisi</option>
              <option value="miltas">Miltaş Spor Tesisleri</option>
              <option value="buyuk-kulub">Büyük Kulüp</option>
              <option value="ibb-maltepe">İBB Maltepe Sahil Spor Tesisi</option>
              <option value="raket">Caddebostan Raket Kulübü</option>
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
            />
            {errors.date && <span>{errors.date.message}</span>}
          </div>
          <div className="trainInviteFormContainer">
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
          <label className="mt-4">Time</label>
          <div className=" flex flex-wrap mt-0">
            <input
              type="time"
              {...register("time", { required: "Training time is required" })}
            />
            {errors.time && <span>{errors.time.message}</span>}
          </div>
          <div className="trainInviteFormContainer">
            <label>Message</label>
            <textarea
              type="input"
              {...register("message")}
              placeholder="Hey Roger, are you up for a training game?"
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
              <p className="font-bold"> Invite Roger</p>
            </button>
            <Link to="/train">
              <button>
                <button className="font-bold mt-4 p-2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white ml-4">
                  {" "}
                  Discard
                </button>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default TrainInvite;
