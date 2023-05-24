import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerClub } from "./redux stuff/actions";
function RegisterClub() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm();
  const handleRegister = (data) => {
    let dataWide = {
      ...data,
      user_type: "club",
      registry_date: Date.now(),
    };
    delete dataWide.password2;
    dispatch(registerClub(dataWide, navigate));
    reset();
  };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [courts, setCourts] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [type3, setType3] = useState("");
  const [indoor, setIndoor] = useState("");
  const [logo, setLogo] = useState("");
  const [image, setImage] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  return (
    <div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <div className="flex justify-between">
          <div className={email !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={name !== "" ? "activeStep" : "inactiveStep"}></div>
          <div
            className={district !== "" ? "activeStep" : "inactiveStep"}
          ></div>
          <div className={courts !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={type1 !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={type2 !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={type3 !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={indoor !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={logo !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={image !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={pass1 !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={pass2 !== "" ? "activeStep" : "inactiveStep"}></div>
        </div>
        <h2 className="font-bold text-4xl mt-4">
          Register as <span className="text-blue-400">Tennis Club</span>
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
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Club Name</label>
            <input
              placeholder="e.g. Wimbledon Tennis Club"
              type="text"
              {...register("name", {
                required: "Club name is required",
              })}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>District</label>
            <select
              {...register("district_id", {
                required: "District is required",
              })}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">-- Select district --</option>
              <option value="1">Adalar </option>
              <option value="2">Ataşehir </option>
              <option value="3">Beşiktaş</option>
              <option value="4">Beykoz</option>
              <option value="5">Beylikdüzü</option>
              <option value="6">Beyoğlu</option>
              <option value="7">Çekmeköy</option>
              <option value="8">Kadıköy </option>{" "}
              <option value="9">Kartal</option>
              <option value="10">Maltepe</option>
              <option value="11">Pendik</option>
              <option value="12">Tuzla</option>
            </select>
            {errors.district_id && <span>{errors.district_id.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Number of Courts</label>
            <input
              type="number"
              {...register("court_quantity", {
                required: "Number of courts is required",
              })}
              onChange={(e) => setCourts(e.target.value)}
            />
            {errors.court_quantity && (
              <span>{errors.court_quantity.message}</span>
            )}
          </div>
          <div className="registerFormContainer">
            <label>Court Type 1</label>
            <select
              {...register("court_type_1_id", {
                required: "Court type required",
              })}
              onChange={(e) => setType1(e.target.value)}
            >
              <option value="">-- Select court type --</option>
              <option value="1">Hard </option>
              <option value="2">Clay</option>
              <option value="3">Grass</option>
              <option value="4">Artificial Grass</option>
              <option value="5">Other</option>
            </select>
            {errors.court_type_1_id && (
              <span>{errors.court_type_1_id.message}</span>
            )}
          </div>
          <div className="registerFormContainer">
            <label>Court Type 2</label>
            <select
              {...register("court_type_2_id", {
                required: "Court type required",
              })}
              onChange={(e) => setType2(e.target.value)}
            >
              <option value="">-- Select court type --</option>
              <option value="1">Hard </option>
              <option value="2">Clay</option>
              <option value="3">Grass</option>
              <option value="4">Artificial Grass</option>
              <option value="5">Other</option>
            </select>
            {errors.court_type_2_id && (
              <span>{errors.court_type_2_id.message}</span>
            )}
          </div>
          <div className="registerFormContainer">
            <label>Court Type 3</label>
            <select
              {...register("court_type_3_id", {
                required: "Court type required",
              })}
              onChange={(e) => setType3(e.target.value)}
            >
              <option value="">-- Select court type --</option>
              <option value="1">Hard </option>
              <option value="2">Clay</option>
              <option value="3">Grass</option>
              <option value="4">Artificial Grass</option>
              <option value="5">Other</option>
            </select>
            {errors.court_type_3_id && (
              <span>{errors.court_type_3_id.message}</span>
            )}
          </div>
          <div className="registerFormContainer">
            <label>Availability of Indoor / Outdoor Courts</label>
            <select
              {...register("indoor_outdoor_id", {
                required: "Indoor / Outdoor required",
              })}
              onChange={(e) => setIndoor(e.target.value)}
            >
              <option value="">-- Select indoor / outdoor --</option>
              <option value="1">Indoor-only </option>
              <option value="2">Outdoor-only</option>
              <option value="3">Both</option>
            </select>
            {errors.indoor_outdoor_id && (
              <span>{errors.indoor_outdoor_id.message}</span>
            )}
          </div>
          <div className="registerFormContainer ">
            <label>Club logo</label>
            <input
              type="input"
              {...register("logo_image", {
                required: "Club's logo is required",
              })}
              onChange={(e) => setLogo(e.target.value)}
            />
            {errors.logo_image && <span>{errors.logo_image.message}</span>}
          </div>
          <div className="registerFormContainer ">
            <label>Club Photo</label>
            <input
              type="input"
              {...register("club_image", {
                required:
                  "A photo that represents your club, courts etc. is required",
              })}
              onChange={(e) => setImage(e.target.value)}
            />
            {errors.club_image && <span>{errors.club_image.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              onChange={(e) => setPass1(e.target.value)}
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
              onChange={(e) => setPass2(e.target.value)}
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

export default RegisterClub;
