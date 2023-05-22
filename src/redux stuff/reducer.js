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
  GET_MY_PAYMENTS,
  ADD_PLAYER_CARD,
  GET_MY_CARD,
  GET_BOOKINGS,
  ADD_BOOKING,
  UPDATE_BOOKING,
  ADD_COURT,
  GET_COURT_TYPES,
  GET_INDOOR_OUTDOOR,
  DELETE_COURT,
  UPDATE_COURT,
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
  myPayments: [],
  myCard: null,
  playerCards: [],
  players: [],
  courtAvailability: [],
  leaderboard: [],
  bookings: [],
  courtTypes: [],
  indoorOutdoor: [],
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
        clubs: action.payload,
      };
    case GET_GENDERS:
      return {
        ...state,
        genders: action.payload,
      };
    case GET_LEVELS:
      return {
        ...state,
        levels: action.payload,
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
        invites: newInvites,
      };
    case GET_INVITES:
      return {
        ...state,
        invites: action.payload,
      };
    case GET_COURTS:
      return {
        ...state,
        courts: action.payload,
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
        invites: copyInvites2,
      };
    case ADD_PLAYER_PAYMENT:
      return {
        ...state,
        playerPayments: [action.payload, ...(state.playerPayments || [])],
      };
    case GET_MY_PAYMENTS:
      return {
        ...state,
        myPayments: action.payload,
      };
    case ADD_PLAYER_CARD:
      return {
        ...state,
        playerCards: [action.payload, ...(state.playerCards || [])],
      };
    case GET_MY_CARD:
      return {
        ...state,
        myCard: action.payload,
      };
    case GET_BOOKINGS:
      return {
        ...state,
        bookings: [...action.payload],
      };
    case ADD_BOOKING:
      return {
        ...state,
        bookings: [action.payload, ...(state.bookings || [])],
      };
    case UPDATE_BOOKING:
      const copyBookings = [...(state.bookings || [])];
      const oldBooking = copyBookings.filter(
        (b) => b.booking_id === action.payload.booking_id
      )[0];
      const indexBooking = copyBookings.indexOf(oldBooking);
      const newBookings = copyBookings.splice(indexBooking, 1, action.payload);
      return {
        ...state,
        bookings: [...newBookings],
      };
    case ADD_COURT:
      return {
        ...state,
        courts: [action.payload, ...(state.courts || [])],
      };
    case GET_COURT_TYPES:
      return {
        ...state,
        courtTypes: action.payload,
      };
    case GET_INDOOR_OUTDOOR:
      return {
        ...state,
        indoorOutdoor: action.payload,
      };
    case DELETE_COURT:
      return {
        ...state,
        courts: state.courts.filter((c) => c.court_id !== action.payload),
      };
    case UPDATE_COURT:
      const copyCourts = [...(state.courts || [])];
      const oldCourt = copyCourts.filter(
        (c) => c.court_id === action.payload.court_id
      )[0];
      const indexCourt = copyCourts.indexOf(oldCourt);
      copyCourts.splice(indexCourt, 1, action.payload);
      return {
        ...state,
        courts: [...copyCourts],
      };
    default:
      return state;
  }
}
