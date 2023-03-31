const loginInitState = {
  token: null,
  userID: null,
  isLoggedIn: null,
};

const loginReducer = (state = loginInitState, action) => {
  switch (action.type) {
    case "logged_action":
      let newState = {
        ...state,
        userID: action.payload.userID,
        token: action.payload.token,
      };
      return newState;
    // return { ...state };
    default:
      return state;
  }
};

export default loginReducer;
