import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER, getLevels, getClubs } from "./redux stuff/actions";
function SearchMatch(props) {
  const { handleMatch } = props;
  const dispatch = useDispatch();
  let { user, levels, clubs } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getLevels());
    dispatch(getClubs());
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  return (
    <div className="bg-gradient-to-r from-blue-400 to-emerald-400 p-8 ml-4 mt-8 rounded-md shadow-md w-1/3">
      <h2 className="font-bold text-4xl">Search</h2>
      <form
        onSubmit={handleSubmit(handleMatch)}
        className="searchTrainFilter flex flex-col mt-4"
      >
        <div className="SearchTrainFilterContainer">
          <label>Level</label>
          <select {...register("level")}>
            <option value="0">Doesn't matter</option>
            {levels &&
              levels.map((l) => (
                <option key={l.level_id} value={l.level_id}>
                  {l.level}
                </option>
              ))}
          </select>
        </div>
        <div className="SearchTrainFilterContainer">
          <label>Ranking</label>
          <select {...register("ranking")}>
            <option value="0">Doesn't matter</option>
            <option value="1">1st Quartile</option>
            <option value="2">2nd Quartile</option>
            <option value="3">3rd Quartile</option>
            <option value="4">4th Quartile</option>
          </select>
        </div>
        <div className="SearchTrainFilterContainer">
          <label>Location</label>
          <select {...register("location")}>
            <option value="0">Doesn't matter</option>
            {clubs &&
              clubs.map((c) => (
                <option key={c.club_id} value={c.club_id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <button
          className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white"
          type="submit"
          disabled={!isValid}
        >
          <p className="font-bold"> Find an opponent</p>
        </button>
        <button
          onClick={() => reset()}
          className="text-sm italic text-center mt-4 cursor-pointer hover:text-slate-800"
        >
          Clear search
        </button>
      </form>
    </div>
  );
}

export default SearchMatch;
