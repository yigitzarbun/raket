import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getClubs,
  getGenders,
  getLevels,
  registerPlayer,
} from "./redux stuff/actions";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clubs, levels, genders } = useSelector((store) => store);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [level, setLevel] = useState("");
  const [club1, setClub1] = useState("");
  const [club2, setClub2] = useState("");
  const [club3, setClub3] = useState("");
  const [face, setFace] = useState("");
  const [body, setBody] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
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
  useEffect(() => {
    dispatch(getClubs());
    dispatch(getGenders());
    dispatch(getLevels());
  }, []);
  return (
    <div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <div className="flex justify-between">
          <div className={email !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={fname !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={lname !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={gender !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={birth !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={level !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={club1 !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={club2 !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={club3 !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={face !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={body !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={pass1 !== "" ? "activeStep" : "inactiveStep"}></div>
          <div className={pass2 !== "" ? "activeStep" : "inactiveStep"}></div>
        </div>
        <h2 className="font-bold text-4xl mt-4">
          Register as <span className="text-blue-400">Player</span>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setFname(e.target.value)}
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
              onChange={(e) => setLname(e.target.value)}
            />
            {errors.lname && <span>{errors.lname.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Gender</label>
            <select
              {...register("gender_id", {
                required: "Gender is required",
              })}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">-- Select gender --</option>
              {genders &&
                genders.map((g) => (
                  <option key={g.gender_id} value={g.gender_id}>
                    {g.gender}
                  </option>
                ))}
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
              onChange={(e) => setBirth(e.target.value)}
            />
            {errors.birth_year && <span>{errors.birth_year.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Level</label>
            <select
              {...register("level_id", {
                required: "Level is required",
              })}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">-- Select level --</option>
              {levels &&
                levels.map((l) => (
                  <option key={l.level_id} value={l.level_id}>
                    {l.level}
                  </option>
                ))}
            </select>
            {errors.level_id && <span>{errors.level_id.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Club Preference 1</label>
            <select
              {...register("club_preference_1_id", {
                required: "Club preference required",
              })}
              onChange={(e) => setClub1(e.target.value)}
            >
              <option value="">-- Select club --</option>
              {clubs &&
                clubs.map((c) => (
                  <option key={c.club_id} value={c.club_id}>
                    {c.name}
                  </option>
                ))}
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
              onChange={(e) => setClub2(e.target.value)}
            >
              <option value="">-- Select club --</option>
              {clubs &&
                clubs.map((c) => (
                  <option key={c.club_id} value={c.club_id}>
                    {c.name}
                  </option>
                ))}
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
              onChange={(e) => setClub3(e.target.value)}
            >
              <option value="">-- Select club --</option>
              {clubs &&
                clubs.map((c) => (
                  <option key={c.club_id} value={c.club_id}>
                    {c.name}
                  </option>
                ))}
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
              onChange={(e) => setFace(e.target.value)}
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
              onChange={(e) => setBody(e.target.value)}
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
              type="submit"
              disabled={!isValid}
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
