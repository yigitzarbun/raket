import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
function RegisterClub() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const handleRegister = (data) => {
    let dataWide = {
      ...data,
      id: Date.now(),
      user_type: "club",
      registry_date: Date.now(),
    };
    console.log(dataWide);
    navigate("/login");
  };
  return (
    <div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">
          Register as a <span className="text-blue-400">Tennis Club</span>
        </h2>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="registerForm flex flex-col mt-4"
        >
          <div className="registerFormContainer">
            <label>Email</label>
            <input
              placeholder="e.g. wimbledon@club.com"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Club Name</label>
            <input
              placeholder="e.g. Wimbledon Tennis Club"
              type="text"
              {...register("club_name", {
                required: "Club name is required",
              })}
            />
            {errors.club_name && <span>{errors.club_name.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>District</label>
            <select
              {...register("district", {
                required: "District is required",
              })}
            >
              <option value="">-- Select district --</option>
              <option value="hard">Adalar </option>
              <option value="hard">Ataşehir </option>
              <option value="clay">Beşiktaş</option>
              <option value="grass">Beykoz</option>
              <option value="grass">Beylikdüzü</option>
              <option value="artificial_grass">Beyoğlu</option>
              <option value="artificial_grass">Çekmeköy</option>
              <option value="hard">Kadıköy </option>{" "}
              <option value="artificial_grass">Kartal</option>
              <option value="artificial_grass">Maltepe</option>
              <option value="artificial_grass">Pendik</option>
              <option value="artificial_grass">Tuzla</option>
            </select>
            {errors.district && <span>{errors.district.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Number of Courts</label>
            <input
              type="number"
              {...register("courts", {
                required: "Number of courts is required",
              })}
            />
            {errors.courts && <span>{errors.courts.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Court Type 1</label>
            <select
              {...register("court_type_1", {
                required: "Court type required",
              })}
            >
              <option value="">-- Select court type --</option>
              <option value="hard">Hard </option>
              <option value="clay">Clay</option>
              <option value="grass">Grass</option>
              <option value="artificial_grass">Artificial Grass</option>
              <option value="other">Other</option>
            </select>
            {errors.court1 && <span>{errors.court1.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Court Type 2</label>
            <select
              {...register("court_type_2", {
                required: "Court type required",
              })}
            >
              <option value="">-- Select court type --</option>
              <option value="hard">Hard </option>
              <option value="clay">Clay</option>
              <option value="grass">Grass</option>
              <option value="artificial_grass">Artificial Grass</option>
              <option value="other">Other</option>
            </select>
            {errors.court2 && <span>{errors.court2.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Court Type 3</label>
            <select
              {...register("court_type_1", {
                required: "Court type required",
              })}
            >
              <option value="">-- Select court type --</option>
              <option value="hard">Hard </option>
              <option value="clay">Clay</option>
              <option value="grass">Grass</option>
              <option value="artificial_grass">Artificial Grass</option>
              <option value="other">Other</option>
            </select>
            {errors.court3 && <span>{errors.court3.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Availability of Indoor / Outdoor Courts</label>
            <select
              {...register("indoor_outdoor", {
                required: "Court type required",
              })}
            >
              <option value="">-- Select court type --</option>
              <option value="indoor">Indoor-only </option>
              <option value="outdoor">Outdoor-only</option>
              <option value="both">Both</option>
            </select>
            {errors.indoor_outdoor && (
              <span>{errors.indoor_outdoor.message}</span>
            )}
          </div>
          <div className="registerFormContainer file-upload">
            <label>Club logo</label>
            <input
              type="file"
              {...register("logo", {
                required: "Club's logo is required",
              })}
            />
            {errors.logo && <span>{errors.logo.message}</span>}
          </div>
          <div className="registerFormContainer file-upload">
            <label>Club Photo</label>
            <input
              type="file"
              {...register("photo", {
                required:
                  "A photo that represents your club, courts etc. is required",
              })}
            />
            {errors.photo && <span>{errors.photo.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Password</label>
            <input
              type="text"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="flex">
            <button
              className="mt-4 mr-2  border-2 w-1/2 cursor-pointer border-green-500 rounded-md hover:bg-green-500 hover:text-white p-2"
              disabled={!isValid}
              type="submit"
            >
              <p className="font-bold">Register</p>
            </button>
            <Link
              to="/intro"
              className="font-bold mt-4 ml-2 w-1/2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white p-2 text-center"
            >
              <button>
                <p>Discard</p>
              </button>
            </Link>
          </div>
        </form>
        <Link to="/login">
          <p className="mt-8">
            Do you already have an account?{" "}
            <span className="text-blue-400 font-bold">Login</span>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default RegisterClub;
