import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addInvite, GET_USER } from "./redux stuff/actions";

function TrainInvite(props) {
  let user = useSelector((store) => store.user);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const location = useLocation();
  const invitee_player_id = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const handleTrainInvite = (data) => {
    const dataWide = {
      ...data,
      inviter_id: user.player_id,
      invitee_id: invitee_player_id,
      court_id: Number(data.court_id),
      club_id: Number(data.club_id),
      date: Date.now(),
    };
    console.log(dataWide);
    dispatch(addInvite(dataWide, navigate));
    reset();
  };
  useEffect(() => {
    dispatch({ type: GET_USER });
  }, []);
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
              {...register("club_id", {
                required: "Training location is required",
              })}
            >
              <option value="">-- Choose a Location --</option>
              <option value="1">Dalyan Club</option>
              <option value="2">Optimum Tenis Akademisi</option>
              <option value="3">Miltaş Spor Tesisleri</option>
              <option value="4">Büyük Kulüp</option>
              <option value="5">İBB Maltepe Sahil Spor Tesisi</option>
              <option value="6">Caddebostan Raket Kulübü</option>
            </select>
            {errors.club_id && <span>{errors.club_id.message}</span>}
          </div>
          <div className="trainInviteFormContainer">
            <label>Date</label>
            <input
              type="date"
              {...register("event_date", {
                required: "Training date is required",
              })}
            />
            {errors.event_date && <span>{errors.event_date.message}</span>}
          </div>
          <div className="trainInviteFormContainer">
            <label>Court</label>
            <select
              {...register("court_id", {
                required: "Court is required",
              })}
            >
              <option value="">-- Choose a Court --</option>
              <option value="1">Court 1</option>
              <option value="2">Court 2</option>
              <option value="3">Court 3</option>
              <option value="4">Center Court</option>
              {errors.court_id && <span>{errors.court_id.message}</span>}
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
