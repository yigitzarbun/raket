import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
function Register() {
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
      user_type: "player",
      registry_date: Date.now(),
    };
    console.log(dataWide);
    navigate("/login");
  };
  return (
    <div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">
          {" "}
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
              {...register("gender", {
                required: "Gender is required",
              })}
            >
              <option value="">-- Select gender --</option>
              <option value="male">Male </option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <span>{errors.gender.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Year of Birth</label>
            <input
              placeholder="e.g. 1980"
              type="number"
              {...register("year", {
                required: "Year of Birth is required",
                minLength: 4,
                maxLength: 4,
              })}
            />
            {errors.year && <span>{errors.year.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Level</label>
            <select
              {...register("level", {
                required: "Level is required",
              })}
            >
              <option value="">-- Select level --</option>
              <option value="beginner">Beginner </option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="prop">Pro</option>
            </select>
            {errors.level && <span>{errors.level.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Court Preference 1</label>
            <select
              {...register("court1", {
                required: "Court preference required",
              })}
            >
              <option value="">-- Select court --</option>
              <option value="male">Dalyan Club </option>
              <option value="female">Optimum Tenis Akademisi</option>
              <option value="female">Miltaş Spor Tesisleri</option>
              <option value="female">Büyük Kulüp</option>
              <option value="female">Caddebostan Raket Kulüp</option>
              <option value="female">İBB Maltepe Spor Tesisleri</option>
            </select>
            {errors.court1 && <span>{errors.court1.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Court Preference 1</label>
            <select
              {...register("court2", {
                required: "Court preference required",
              })}
            >
              <option value="">-- Select court --</option>
              <option value="male">Dalyan Club </option>
              <option value="female">Optimum Tenis Akademisi</option>
              <option value="female">Miltaş Spor Tesisleri</option>
              <option value="female">Büyük Kulüp</option>
              <option value="female">Caddebostan Raket Kulüp</option>
              <option value="female">İBB Maltepe Spor Tesisleri</option>
            </select>
            {errors.court2 && <span>{errors.court2.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Court Preference 3</label>
            <select
              {...register("court3", {
                required: "Court preference required",
              })}
            >
              <option value="">-- Select court --</option>
              <option value="male">Dalyan Club </option>
              <option value="female">Optimum Tenis Akademisi</option>
              <option value="female">Miltaş Spor Tesisleri</option>
              <option value="female">Büyük Kulüp</option>
              <option value="female">Caddebostan Raket Kulüp</option>
              <option value="female">İBB Maltepe Spor Tesisleri</option>
            </select>
            {errors.court3 && <span>{errors.court3.message}</span>}
          </div>
          <div className="registerFormContainer file-upload">
            <label>Face Photo</label>
            <input
              type="file"
              {...register("face", {
                required: "Photo of your face is required",
              })}
            />
            {errors.face && <span>{errors.face.message}</span>}
          </div>
          <div className="registerFormContainer file-upload">
            <label>Body Photo</label>
            <input
              type="file"
              {...register("body", {
                required: "Photo of your full-body is required",
              })}
            />
            {errors.body && <span>{errors.body.message}</span>}
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

export default Register;
