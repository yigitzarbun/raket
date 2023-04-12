const initialState = {
  user: null,
  userType: null,
  clubs: null,
  districts: null,
  invites: null,
  challenges: null,
  courts: null,
  payments: null,
  courtAvailability: null,
  leaderboard: null,
};

export function myReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
