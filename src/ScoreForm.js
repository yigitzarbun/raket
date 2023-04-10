import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
function ScoreForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const handleScoreForm = (data) => {
    console.log(data);
    navigate("/scores");
  };
  return (
    <>
      <div className="bg-heroScores bg-center bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">Score</h2>

        <form
          onSubmit={handleSubmit(handleScoreForm)}
          className="scoreForm flex flex-col mt-4"
        >
          <div className="scoreFormContainer">
            <label>Winner</label>
            <select
              {...register("winner", {
                required: "Winner is required",
              })}
            >
              <option value="">-- Announce the Winner --</option>
              <option value="rafael-nadal">Rafael Nadal (myself) </option>
              <option value="novak-djokovic">Novak Djokovic</option>
            </select>
            {errors.winner && <span>{errors.winner.message}</span>}
          </div>
          <div className="scoreFormContainer">
            <label>Score</label>
            <div className=" flex justify-between">
              <div>
                <p className="italic font-sm mt-2 text-slate-400">
                  Set 1 - Rafael Nadal (myself)
                </p>
                <input
                  type="number"
                  {...register("set1-rafael-nadal", {
                    required: "Set 1 score is required",
                    max: 6,
                    min: 0,
                  })}
                />
              </div>
              <div>
                <p className="italic font-sm mt-2 text-slate-400">
                  Set 1 - Novak Djokovic
                </p>
                <input
                  type="number"
                  {...register("set1-novak-djokovic", {
                    required: "Set 1 score is required",
                    max: 6,
                    min: 0,
                  })}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="italic font-sm mt-2 text-slate-400">
                  Set 2 - Rafael Nadal (myself)
                </p>
                <input
                  type="number"
                  {...register("set2-rafael-nadal", {
                    required: "Set 2 score is required",
                    max: 6,
                    min: 0,
                  })}
                />
              </div>
              <div>
                <p className="italic font-sm mt-2 text-slate-400">
                  {" "}
                  Set 2 - Novak Djokovic
                </p>
                <input
                  type="number"
                  {...register("set2-novak-djokovic", {
                    required: "Set 2 score is required",
                    max: 6,
                    min: 0,
                  })}
                />
              </div>
              {errors.set1 && <span>{errors.set1.message}</span>}
            </div>
          </div>
          <div className="scoreFormContainer">
            <label>Evaluation</label>
            <textarea
              type="input"
              {...register("message")}
              placeholder="Novak is a brilliant tennis player with a positvie attitude"
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
              <p className="font-bold"> Done</p>
            </button>
            <Link to="/scores">
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

export default ScoreForm;
