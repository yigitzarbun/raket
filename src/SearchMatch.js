import React from "react";
import { useForm } from "react-hook-form";

function SearchMatch() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const handleMatch = (data) => {
    console.log(data);
  };
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
            <option value="any">Doesn't matter</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="prop">Pro</option>
          </select>
        </div>
        <div className="SearchTrainFilterContainer">
          <label>Ranking</label>
          <select {...register("gender")}>
            <option value="top">Doesn't matter</option>
            <option value="top">1st Quartile</option>
            <option value="upper-intermediate">2nd Quartile</option>
            <option value="lower-intermediate">3rd Quartile</option>
            <option value="bottom">4th Quartile</option>
          </select>
        </div>
        <div className="SearchTrainFilterContainer">
          <label>Location</label>
          <select {...register("location")}>
            <option value="any">Doesn't matter</option>
            <option value="dalyan">Dalyan Club</option>
            <option value="optimum">Optimum Tenis Akademisi</option>
            <option value="miltas">Miltaş Spor Tesisleri</option>
            <option value="buyuk-kulub">Büyük Kulüp</option>
            <option value="ibb-maltepe">İBB Maltepe Sahil Spor Tesisi</option>
            <option value="raket">Caddebostan Raket Kulübü</option>
          </select>
        </div>
        <button
          className="mt-8 p-2 border-2 border-black rounded-md hover:bg-black hover:text-white"
          type="submit"
          disabled={!isValid}
        >
          <p className="font-bold"> Find an opponent</p>
        </button>
      </form>
    </div>
  );
}

export default SearchMatch;
