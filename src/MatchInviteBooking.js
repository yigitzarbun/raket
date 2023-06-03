import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getChallenges,
  getPlayers,
  GET_USER,
  updateChallenge,
  updateBooking,
  getBookings,
} from "./redux stuff/actions";
function MatchInviteBooking() {
  const eventType = "Match";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { challenges, user, players, bookings } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  }
  const { challenge_id } = useParams();
  let selectedChallenge = null;
  if (challenges) {
    selectedChallenge = challenges.find(
      (c) => Number(c.challenge_id) === Number(challenge_id)
    );
  }
  let opponent = null;
  if (players && user && selectedChallenge) {
    opponent = players.find(
      (p) => p.player_id === selectedChallenge.challengee_id
    );
  }
  const handleCancelChallenge = (challenge) => {
    const challengeData = {
      challenge_id: challenge.challenge_id,
      status: "cancelled",
    };
    dispatch(updateChallenge(challengeData));
    let bookingId = null;
    if (bookings) {
      bookingId = bookings.find(
        (b) =>
          (b.status === "pending" || b.status === "confirmed") &&
          b.event_date === selectedChallenge.event_date &&
          b.time === selectedChallenge.time &&
          b.court_id === selectedChallenge.court_id
      )["booking_id"];
      if (bookingId) {
        const bookingData = {
          booking_id: bookingId,
          status: "cancelled",
        };
        dispatch(updateBooking(bookingData));
      }
    }
    navigate("/");
  };
  useEffect(() => {
    dispatch(getChallenges());
    dispatch(getPlayers());
    dispatch({ type: GET_USER });
    dispatch(getBookings());
  }, []);
  return (
    <div>
      <div className="bg-heroChallenge bg-center bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md">
        <h2 className="font-bold text-4xl text-white">Booking Details</h2>
        <table className="w-full text-left mt-4 bg-slate-800 rounded-md px-4 py-14 ">
          <thead>
            <tr className="h-12 text-blue-400">
              <th>Event</th>
              <th>Status</th>
              <th>Player Name</th>
              <th>Level</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Court</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {challenges && user && players && selectedChallenge && opponent && (
              <tr className="h-12">
                <td>{eventType}</td>
                <td className="text-yellow-400">
                  {selectedChallenge && selectedChallenge.status}
                </td>
                <td>{opponent && `${opponent.fname} ${opponent.lname}`}</td>
                <td>{opponent && opponent.level}</td>
                <td>{opponent && opponent.gender}</td>
                <td>{selectedChallenge && selectedChallenge.name}</td>
                <td>{selectedChallenge && selectedChallenge.event_date}</td>
                {selectedChallenge && selectedChallenge.time && (
                  <td>
                    {selectedChallenge &&
                    selectedChallenge.time &&
                    selectedChallenge.time < 1000
                      ? "0" +
                        selectedChallenge.time.toString()[0] +
                        ":" +
                        selectedChallenge.time.toString()[1] +
                        selectedChallenge.time.toString()[2]
                      : selectedChallenge.time.toString()[0] +
                        selectedChallenge.time.toString()[1] +
                        ":" +
                        selectedChallenge.time.toString()[2] +
                        selectedChallenge.time.toString()[3]}
                  </td>
                )}

                <td>{selectedChallenge && selectedChallenge.court_name}</td>
                <td>
                  <button
                    onClick={() => handleCancelChallenge(selectedChallenge)}
                    className="p-2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white ml-2"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Link to="/requests">
          <p className="text-blue-500 text-sm italic mt-5 cursor-pointer hover:text-blue-400">
            Check out all incoming and outgoing requests
          </p>
        </Link>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-8 mt-8 rounded-md shadow-md flex flex-col ">
        <h3 className="font-bold italic text-xl mt-4">
          {opponent &&
            `Your challenge to ${opponent.fname} ${opponent.lname} was sent successufly.`}
        </h3>
        <div className="flex items-center mt-4">
          <img src="/images/time.png" alt="time" className="w-8 h-8 mr-2" />
          <p>
            {opponent &&
              `${opponent.fname} ${opponent.lname} has 30 mins to accept your challenge.`}
          </p>
        </div>
        <div className="flex items-center mt-4">
          <img
            src="/images/approve.png"
            alt="approve"
            className="w-8 h-8 mr-2"
          />
          <p>
            {opponent &&
              `If ${opponent.fname} ${opponent.lname} accepts your challenge within 30 mins, your court
            booking will be made automatically and the court fee will be
            deducted from your balance.`}
          </p>
        </div>
        <div className="flex items-center mt-4">
          <img
            src="/images/decline.png"
            alt="approve"
            className="w-8 h-8 mr-2"
          />
          <p>
            {opponent &&
              `If ${opponent.fname} ${opponent.lname} doesn't accept your challenge within 30 mins or
            declines your challenge, your court reservation will automatically
            be canceled and you will not be charged any fees.`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MatchInviteBooking;
