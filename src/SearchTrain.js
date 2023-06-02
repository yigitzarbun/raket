import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getClubs, getGenders, getLevels } from "./redux stuff/actions";
function SearchTrain(props) {
  const { handleTrain } = props;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const { clubs, genders, levels } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getClubs());
    dispatch(getGenders());
    dispatch(getLevels());
  }, []);
  return (
    <div className="bg-gradient-to-r from-blue-400 to-emerald-400 p-8 ml-4 mt-8 rounded-md shadow-md w-1/3">
      <h2 className="font-bold text-4xl">Search</h2>
      <form
        onSubmit={handleSubmit(handleTrain)}
        className="searchTrainFilter flex flex-col mt-4"
      >
        <div className="SearchTrainFilterContainer">
          <label>Level</label>
          <select {...register("level_id")}>
            <option value="0">Doesn't matter</option>
            {levels.map((level) => (
              <option key={level.level_id} value={level.level_id}>
                {level.level}
              </option>
            ))}
          </select>
        </div>
        <div className="SearchTrainFilterContainer">
          <label>Gender</label>
          <select {...register("gender_id")}>
            <option value="0">Doesn't matter</option>
            {genders.map((gender) => (
              <option key={gender.gender_id} value={gender.gender_id}>
                {gender.gender}
              </option>
            ))}
          </select>
        </div>
        <div className="SearchTrainFilterContainer">
          <label>Location</label>
          <select {...register("club_preference_id")}>
            <option value="0">Doesn't matter</option>
            {clubs &&
              clubs.map((club) => (
                <option key={club.club_id} value={club.club_id}>
                  {club.name}
                </option>
              ))}
          </select>
        </div>
        <button
          className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white"
          type="submit"
        >
          <p className="font-bold"> Find a partner</p>
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

export default SearchTrain;
