import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addPlayerPayment, GET_USER } from "./redux stuff/actions";
function AddBalance() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector((store) => store.user);
  if (user.player) {
    user = user.player;
  } else {
    user = user;
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const handleAddBalance = (data) => {
    const dataWide = {
      amount: data.amount,
      date: Date.now(),
      player_id: user.player_id,
      payment_type_id: 1,
    };
    console.log(dataWide);
    dispatch(addPlayerPayment(dataWide, navigate));
    reset();
  };
  useEffect(() => {
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div>
      <div className="bg-heroBalance bg-bottom bg-cover py-28 rounded-md mt-4 "></div>
      <div className="bg-slate-800 text-white rounded-md p-4 mt-8 w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">Add Balance</h2>
        <form
          onSubmit={handleSubmit(handleAddBalance)}
          className="addBalanceForm flex flex-col mt-4"
        >
          <div className="addBalanceFormContainer">
            <label>Cardholder Name</label>
            <input
              placeholder="ROGER FEDERER"
              type="text"
              {...register("name", {
                required: "name is required",
              })}
            />
            {errors.name && (
              <span className="fieldError">{errors.name.message}</span>
            )}
          </div>
          <div className="addBalanceFormContainer">
            <label>Card Number</label>
            <input
              placeholder="1234 5678 9012 3456"
              type="number"
              {...register("number", {
                required: "Card number is required",
                minLength: 16,
                maxLength: 16,
              })}
            />
            {errors.number && (
              <span className="fieldError">{errors.number.message}</span>
            )}
          </div>
          <div className="flex justify-between">
            <div className="addBalanceFormContainer mr-2">
              <label>Expiration Month</label>
              <input
                placeholder="01"
                type="number"
                {...register("month", {
                  required: "Expiry month is required",
                  minLength: 2,
                  maxLength: 2,
                })}
              />
            </div>
            <div className="addBalanceFormContainer ml-2">
              <label>Expiration Year</label>
              <input
                placeholder="2025"
                type="number"
                {...register("year", {
                  required: "Expiry year is required",
                  minLength: 4,
                  maxLength: 4,
                })}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="addBalanceFormContainer mr-2">
              <label className="mt-4">CVC Code</label>
              <input
                placeholder="123"
                type="number"
                {...register("cvc", {
                  required: "CVC code is required",
                  minLength: 3,
                  maxLength: 3,
                })}
              />
              {errors.cvc && (
                <span className="fieldError">{errors.cvc.message}</span>
              )}
            </div>
            <div className="addBalanceFormContainer ml-2">
              <label>Amount</label>
              <input
                type="number"
                {...register("amount", {
                  required: "You must enter a valid amount",
                  min: 1,
                })}
              />
              {errors.amount && (
                <span className="fieldError">{errors.amount.message}</span>
              )}
            </div>
          </div>
          <div>
            <button
              className="mt-4 p-2 border-2 cursor-pointer border-green-500 rounded-md hover:bg-green-500 hover:text-white"
              disabled={!isValid}
              type="submit"
            >
              <p className="font-bold"> Add Balance</p>
            </button>
            <Link to="/account">
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
    </div>
  );
}

export default AddBalance;
