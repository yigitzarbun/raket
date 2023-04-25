import axios from "axios";
import { toast } from "react-toastify";

export const key = "raket";
export function getUserFromLs() {
  let user = null;
  const userString = JSON.parse(localStorage.getItem(key));
  if (userString) {
    if (userString.player) {
      user = userString.player;
    } else if (userString.club) {
      user = userString.club;
    }
  }
  return user;
}

let developmentUrl = "http://localhost:9000/";
let productionUrl = "";
let url = developmentUrl;

export const LOGIN_PLAYER = "LOGIN_PLAYER";
export const LOGIN_CLUB = "LOGIN_CLUB";
export const LOGOUT = "LOGOUT";
export const GET_PLAYERS = "GET_PLAYERS";
export const GET_USER = "GET_USER";
export const GET_CLUBS = "GET_CLUBS";
export const GET_GENDERS = "GET_GENDERS";
export const GET_LEVELS = "GET_LEVELS";
export const ADD_INVITE = "ADD_INVITE";
export const DELETE_INVITE = "DELETE_INVITE";
export const GET_INVITES = "GET_INVITES";
export const GET_COURTS = "GET_COURTS";
export const UPDATE_INVITE = "UPDATE_INVITE";
export const ADD_PLAYER_PAYMENT = "ADD_PLAYER_PAYMENT";

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

export const registerClub = (formData, navigate) => (dispatch) => {
  axios
    .post(url + "api/clubsAuth/register", formData)
    .then((res) => {
      if (res.status === 201) {
        toast.success("Registered successfully!");
        navigate("/login");
      }
    })
    .catch((err) => console.log(err));
};

export const loginClub = (formData, navigate) => (dispatch) => {
  axios
    .post(url + "api/clubsAuth/login", formData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: LOGIN_CLUB, payload: res.data });
        toast.success(`Welcome to Raket, ${res.data.club.name}`);
        navigate("/club-dashboard");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};

export const getPlayers = () => (dispatch) => {
  axiosWithAuth()
    .get(url + "api/players")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_PLAYERS, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const getClubs = () => (dispatch) => {
  axiosWithAuth()
    .get(url + "api/clubs")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_CLUBS, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const getGenders = () => (dispatch) => {
  axiosWithAuth()
    .get(url + "api/genders")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_GENDERS, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const getLevels = () => (dispatch) => {
  axiosWithAuth()
    .get(url + "api/levels")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_LEVELS, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const addInvite = (formData, navigate) => (dispatch) => {
  axiosWithAuth()
    .post(url + "api/invites", formData)
    .then((res) => {
      if (res.status === 201) {
        dispatch({ type: ADD_INVITE, payload: res.data });
        navigate("/" + `invite-booking/${res.data.invite_id}`);
      }
    })
    .catch((err) => console.log(err));
};

export const deleteInvite = (invite_id) => (dispatch) => {
  axiosWithAuth()
    .delete(url + `api/invites/${invite_id}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: DELETE_INVITE, payload: invite_id });
      }
    })
    .catch((err) => console.log(err));
};

export const getInvites = () => (dispatch) => {
  axiosWithAuth()
    .get(url + "api/invites")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_INVITES, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const getCourts = () => (dispatch) => {
  axiosWithAuth()
    .get(url + "api/courts")
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_COURTS, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const updateInvite = (changes) => (dispatch) => {
  axiosWithAuth()
    .put(url + `api/invites/${changes.invite_id}`, changes)
    .then((res) => {
      if (res.status === 201) {
        dispatch({ type: UPDATE_INVITE, payload: res.data });
      }
    })
    .catch((err) => console.log(err));
};

export const addPlayerPayment = (payment, navigate) => (dispatch) => {
  axiosWithAuth()
    .post(url + "api/player-payments", payment)
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        dispatch({ type: ADD_PLAYER_PAYMENT, payload: res.data });
        navigate("/account");
      }
    })
    .catch((err) => console.log(err));
};
