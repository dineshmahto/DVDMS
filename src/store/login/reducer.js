import {
  SHOW_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  LOGIN,
  LOGIN_RESPONSE,
  LOGOUT_RESPONSE,
  LOGOUT,
} from "./actionTypes";

const initialState = {
  show: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      state = {
        ...state,
        show: true,
      };
      break;
    case CLOSE_LOGIN_MODAL:
      state = {
        ...state,
        show: false,
      };
      break;
    case LOGIN:
      state = {
        ...state,
      };
      break;
    case LOGIN_RESPONSE:
      state = {
        ...state,
        loginResponse: action.payload,
      };
      break;
    case LOGOUT:
      state = {
        ...state,
      };
      break;
    case LOGOUT_RESPONSE:
      console.log("logoutResponse", action?.payload);
      state = {
        ...state,
        logoutResponse: action?.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default login;
