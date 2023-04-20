import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerPlayer } from "./redux stuff/actions";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const handleRegister = (data) => {
    let dataWide = {
      ...data,
      user_type: "player",
      registry_date: Date.now(),
    };
    delete dataWide.password2;
    dispatch(registerPlayer(dataWide, navigate));
    reset();
  };
  return (
    <div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">
          Register as a <span className="text-blue-400">Player</span>
        </h2>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="registerForm flex flex-col mt-4"
        >
          <div className="registerFormContainer">
            <label>Email</label>
            <input
              placeholder="e.g. roger@tennis.com"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>First Name</label>
            <input
              placeholder="e.g. Roger"
              type="text"
              {...register("fname", {
                required: "First name is required",
              })}
            />
            {errors.fname && <span>{errors.fname.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="e.g. Federer"
              {...register("lname", {
                required: "Last name is required",
              })}
            />
            {errors.lname && <span>{errors.lname.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Gender</label>
            <select
              {...register("gender_id", {
                required: "Gender is required",
              })}
            >
              <option value="">-- Select gender --</option>
              <option value="1">Male </option>
              <option value="2">Female</option>
            </select>
            {errors.gender_id && <span>{errors.gender_id.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Year of Birth</label>
            <input
              placeholder="e.g. 1980"
              type="number"
              {...register("birth_year", {
                required: "Year of Birth is required",
                minLength: 4,
                maxLength: 4,
              })}
            />
            {errors.birth_year && <span>{errors.birth_year.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Level</label>
            <select
              {...register("level_id", {
                required: "Level is required",
              })}
            >
              <option value="">-- Select level --</option>
              <option value="1">Beginner </option>
              <option value="2">Intermediate</option>
              <option value="3">Advanced</option>
              <option value="4">Pro</option>
            </select>
            {errors.level_id && <span>{errors.level_id.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Club Preference 1</label>
            <select
              {...register("club_preference_1_id", {
                required: "Club preference required",
              })}
            >
              <option value="">-- Select club --</option>
              <option value="1">Wimbledon </option>
              <option value="2">Rolland Garros</option>
              <option value="3">
                USTA Billie Jean King National Tennis Center
              </option>
            </select>
            {errors.club_preference_1_id && (
              <span>{errors.club_preference_1_id.message}</span>
            )}
          </div>
          <div className="registerFormContainer">
            <label>Club Preference 2</label>
            <select
              {...register("club_preference_2_id", {
                required: "Club preference required",
              })}
            >
              <option value="">-- Select club --</option>
              <option value="1">Wimbledon </option>
              <option value="2">Rolland Garros</option>
              <option value="3">
                USTA Billie Jean King National Tennis Center
              </option>
            </select>
            {errors.club_preference_2_id && (
              <span>{errors.club_preference_2_id.message}</span>
            )}
          </div>
          <div className="registerFormContainer">
            <label>Club Preference 3</label>
            <select
              {...register("club_preference_3_id", {
                required: "Club preference required",
              })}
            >
              <option value="">-- Select club --</option>
              <option value="1">Wimbledon </option>
              <option value="2">Rolland Garros</option>
              <option value="3">
                USTA Billie Jean King National Tennis Center
              </option>
            </select>
            {errors.club_preference_3_id && (
              <span>{errors.club_preference_3_id.message}</span>
            )}
          </div>
          <div className="registerFormContainer  ">
            <label>Face Photo</label>
            <input
              type="text"
              className=""
              {...register("face_image", {
                required: "Photo of your face is required",
              })}
            />
            {errors.face_image && <span>{errors.face_image.message}</span>}
          </div>
          <div className="registerFormContainer  ">
            <label>Body Photo</label>
            <input
              type="text"
              className=""
              {...register("body_image", {
                required: "Photo of your full-body is required",
              })}
            />
            {errors.body_image && <span>{errors.body_image.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password length must be more than 4 characters",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Repeat Password</label>
            <input
              type="password"
              {...register("password2", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password length must be more than 4 characters",
                },
                validate: {
                  passEqual: (value) =>
                    value === getValues().password || "Passwords don't match",
                },
              })}
            />
            {errors.password2 && <span>{errors.password2.message}</span>}
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

export default Register;
