import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  addInvite,
  getClubs,
  getCourts,
  GET_USER,
  getMyCard,
  getBookings,
  addBooking,
} from "./redux stuff/actions";

function TrainInvite(props) {
  let { user, clubs, courts, myCard, bookings } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const location = useLocation();
  const invitee_player = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const handleTrainInvite = (data) => {
    const dataWide = {
      ...data,
      inviter_id: user.player_id,
      invitee_id: invitee_player.player_id,
      court_id: Number(data.court_id),
      club_id: Number(data.club_id),
      date: Date.now(),
    };
    const bookingData = {
      status: "pending",
      date: Date.now(),
      event_date: data.event_date,
      time: data.time,
      club_id: Number(data.club_id),
      court_id: Number(data.court_id),
    };
    dispatch(addInvite(dataWide, navigate));
    dispatch(addBooking(bookingData));
    reset();
  };
  const [selectedClub, setSelectedClub] = useState("");
  const handleSelectedClub = (event) => {
    setSelectedClub(event.target.value);
  };
  let opening = null;
  let closing = null;
  let availableTimes = [];
  let bookedTimes = [];
  const [selectedCourt, setSelectedCourt] = useState("");
  const handleSelectedCourt = (event) => {
    setSelectedCourt(event.target.value);
  };
  const [selectedDate, setSelectedDate] = useState("");
  const handleSelectedDate = (event) => {
    setSelectedDate(event.target.value);
  };
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

  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getClubs());
    dispatch(getCourts());
    dispatch(getMyCard(user.player_id));
    dispatch(getBookings());
  }, []);
  return (
    <>
      <div className="bg-heroTrain bg-center bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">Invite {invitee_player["fname"]}</h2>

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
              onChange={handleSelectedClub}
            >
              <option value="">-- Choose a Location --</option>
              {clubs &&
                clubs.map((club) => (
                  <option key={club.club_id} value={club.club_id}>
                    {club.name}
                  </option>
                ))}
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
              onChange={handleSelectedDate}
            />
            {errors.event_date && <span>{errors.event_date.message}</span>}
          </div>
          <div className="trainInviteFormContainer">
            <label>Court</label>
            <select
              {...register("court_id", {
                required: "Court is required",
              })}
              onChange={handleSelectedCourt}
            >
              <option value="">-- Choose a Court --</option>
              {courts &&
                courts
                  .filter(
                    (court) => Number(court.club_id) === Number(selectedClub)
                  )
                  .map((court) => (
                    <option key={court.court_id} value={court.court_id}>
                      {"Court " +
                        court.court_name +
                        " -- (Hourly price: TL " +
                        court.price +
                        " )"}
                    </option>
                  ))}
              {errors.court_id && <span>{errors.court_id.message}</span>}
            </select>
          </div>
          <div className=" flex flex-wrap mt-0">
            <label className="mt-4">Time</label>
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
          <div className="trainInviteFormContainer">
            <label>Message</label>
            <textarea
              type="input"
              {...register("message")}
              placeholder="Hey there, are you up for a training game?"
              className="px-2 py-4"
            />
            {errors.message && <span>{errors.message.message}</span>}
          </div>
          <div>
            {!myCard && (
              <p className="text-yellow-400 font-bold">
                You'll need to add a valid card before sending an invitation
              </p>
            )}
            {myCard ? (
              <button
                className="mt-4 p-2 border-2 cursor-pointer border-green-500 rounded-md hover:bg-green-500 hover:text-white"
                disabled={!isValid}
                type="submit"
              >
                <p className="font-bold"> Invite {invitee_player["fname"]}</p>
              </button>
            ) : (
              <Link to="/add-player-card">
                <button className="font-bold mt-4 p-2 border-2 border-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white">
                  Add Card
                </button>
              </Link>
            )}

            <Link to="/train">
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

export default TrainInvite;
