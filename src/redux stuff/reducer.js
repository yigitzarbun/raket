import {
  key,
  getUserFromLs,
  LOGIN_PLAYER,
  LOGOUT,
  LOGIN_CLUB,
  GET_PLAYERS,
  GET_USER,
  GET_CLUBS,
  GET_GENDERS,
  GET_LEVELS,
  ADD_INVITE,
  DELETE_INVITE,
  GET_INVITES,
  GET_COURTS,
  UPDATE_INVITE,
  ADD_PLAYER_PAYMENT,
} from "./actions";

const initialState = {
  user: getUserFromLs(),
  userType: "",
  clubs: [],
  districts: [],
  genders: [],
  levels: [],
  invites: [],
  challenges: [],
  courts: [],
  playerPayments: [],
  players: [],
  courtAvailability: [],
  leaderboard: [],
};

export function myReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_PLAYER:
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
    case LOGIN_CLUB:
      localStorage.setItem(key, JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case GET_PLAYERS:
      return {
        ...state,
        players: [...action.payload],
      };
    case GET_USER:
      return {
        ...state,
        user: state.user,
      };
    case GET_CLUBS:
      return {
        ...state,
        clubs: [...action.payload],
      };
    case GET_GENDERS:
      return {
        ...state,
        genders: [...action.payload],
      };
    case GET_LEVELS:
      return {
        ...state,
        levels: [...action.payload],
      };
    case ADD_INVITE:
      return {
        ...state,
        invites: [action.payload, ...(state.invites || [])],
      };
    case DELETE_INVITE:
      const copyInvites = [...(state.invites || [])];
      const newInvites = copyInvites.filter(
        (invite) => invite.invite_id != action.payload
      );
      return {
        ...state,
        invites: [...newInvites],
      };
    case GET_INVITES:
      return {
        ...state,
        invites: [...action.payload],
      };
    case GET_COURTS:
      return {
        ...state,
        courts: [...action.payload],
      };
    case UPDATE_INVITE:
      const copyInvites2 = [...(state.invites || [])];
      const oldInvite = copyInvites2.filter(
        (invite) => invite.invite_id === action.payload.invite_id
      );
      const index = copyInvites2.indexOf(oldInvite);
      copyInvites2.splice(index, 1, action.payload);
      return {
        ...state,
        invites: [...copyInvites2],
      };
    case ADD_PLAYER_PAYMENT:
      return {
        ...state,
        playerPayments: [action.payload, ...(state.playerPayments || [])],
      };
    default:
      return state;
  }
}
