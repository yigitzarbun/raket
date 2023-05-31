import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER,
  getLevels,
  updatePlayerDetails,
  getGenders,
  getClubs,
  getPlayers,
} from "./redux stuff/actions";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
function EditPersonalDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let { user, levels, genders, clubs, players } = useSelector((store) => store);
  if (user.player) {
    user = user.player;
  }
  let player = location.state.player;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fname: player.fname,
      lname: player.lname,
      email: player.email,
      birth_year: player.birth_year,
      face_image: player.face_image,
      body_image: player.body_image,
      level_id: player.level_id,
      gender_id: player.gender_id,
      club_preference_1_id: player.club_preference_1_id,
      club_preference_2_id: player.club_preference_2_id,
      club_preference_3_id: player.club_preference_3_id,
    },
  });
  const handleEditPlayer = (data) => {
    let dataWide = {
      ...data,
      player_id: user.player_id,
    };
    dispatch(updatePlayerDetails(dataWide, navigate));
    reset();
  };
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getClubs());
    dispatch(getLevels());
    dispatch(getGenders());
    dispatch(getPlayers());
  }, []);

  return (
    <div>
      <div className="bg-heroCourts bg-center bg-auto py-28 rounded-md mt-4"></div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto">
        <h2 className="font-bold text-4xl">Edit Player</h2>
        <form
          onSubmit={handleSubmit(handleEditPlayer)}
          className="registerForm flex flex-col mt-4"
        >
          <div className="registerFormContainer">
            <label>First Name</label>
            <input
              placeholder="e.g. Roger"
              type="name"
              {...register("fname", {
                required: "First name is required",
              })}
            />
            {errors.fname && <span>{errors.fname.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Last Name</label>
            <input
              placeholder="e.g. Federer"
              type="name"
              {...register("lname", {
                required: "Last name is required",
              })}
            />
            {errors.lname && <span>{errors.lname.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Email</label>
            <input
              placeholder="e.g. roger@federer.com"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Birth Year</label>
            <input
              placeholder="e.g. 1990"
              type="number"
              {...register("birth_year", {
                required: "Birth year is required",
              })}
            />
            {errors.birth_year && <span>{errors.birth_year.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Face Image</label>
            <input
              type="text"
              {...register("face_image", {
                required: "Face image is required",
              })}
            />
            {errors.face_image && <span>{errors.face_image.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Body Image</label>
            <input
              type="text"
              {...register("body_image", {
                required: "Body image is required",
              })}
            />
            {errors.body_image && <span>{errors.body_image.message}</span>}
          </div>
          <div className="registerFormContainer">
            <label>Level</label>
            <select
              {...register("level_id", {
                required: "Level is required",
              })}
            >
              <option value="">-- Select Level --</option>
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
            <label>Gender</label>
            <select
              {...register("gender_id", {
                required: "Gender is required",
              })}
            >
              <option value="">-- Select Gender --</option>
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
            <label>Club Preference 1</label>
            <select
              {...register("club_preference_1_id", {
                required: "Club preference required",
              })}
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
          <div className="flex">
            <button
              className="mt-4 mr-2  border-2 w-1/2 cursor-pointer border-green-500 rounded-md hover:bg-green-500 hover:text-white p-2"
              disabled={!isValid}
              type="submit"
            >
              <p className="font-bold">Edit Player</p>
            </button>
            <Link
              to="/account"
              className="font-bold mt-4 ml-2 w-1/2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white p-2 text-center"
            >
              <button>
                <p>Discard</p>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPersonalDetails;
