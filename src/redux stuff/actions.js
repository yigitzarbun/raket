import axios from "axios";
import { toast } from "react-toastify";

export const key = "raket";
export function getUserFromLs() {
  let user = null;
  const userString = JSON.parse(localStorage.getItem(key));
  if (userString) {
    user = userString.player;
  }
  return user;
}

let developmentUrl = "http://localhost:9000/";
let productionUrl = "";
let url = developmentUrl;

export const LOGIN_PLAYER = "LOGIN_PLAYER";
export const LOGOUT = "LOGOUT";

const axiosWithAuth = () => {
  const tokenObj = JSON.parse(localStorage.getItem(key));
  const token = tokenObj.token;
  return axios.create({
    headers: {
      Authorization: token,
    },
  });
};

export const registerPlayer = (formData, navigate) => (dispatch) => {
  axios
    .post(url + "api/playersAuth/register", formData)
    .then((res) => {
      if (res.status === 201) {
        toast.success("Registered successfully!");
        navigate("/login");
      }
    })
    .catch((err) => console.log(err));
};

export const loginPlayer = (formData, navigate) => (dispatch) => {
  axios
    .post(url + "api/playersAuth/login", formData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: LOGIN_PLAYER, payload: res.data });
        toast.success(`Welcome to Raket, ${res.data.player.fname}`);
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};
