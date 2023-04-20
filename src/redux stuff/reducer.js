import { key, getUserFromLs, LOGIN_PLAYER, LOGOUT } from "./actions";

const initialState = {
  user: getUserFromLs(),
  userType: "",
  clubs: [],
  districts: [],
  invites: [],
  challenges: [],
  courts: [],
  payments: [],
  players: [],
  courtAvailability: [],
  leaderboard: [],
};

export function myReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_PLAYER:
      console.log(action.payload);
      localStorage.setItem(key, JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem(key);
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
