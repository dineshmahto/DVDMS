import {
  SHOW_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  LOGIN,
  LOGIN_RESPONSE,
  LOGOUT,
  LOGOUT_RESPONSE,
} from "./actionTypes";

export const showLoginModal = () => {
  return {
    type: SHOW_LOGIN_MODAL,
  };
};

export const closeLoginModal = () => {
  return {
    type: CLOSE_LOGIN_MODAL,
  };
};

export const login = (loginDetails) => {
  return {
    type: LOGIN,
    payload: loginDetails,
  };
};
export const loginResponse = (loginResponse) => {
  return {
    type: LOGIN_RESPONSE,
    payload: loginResponse,
  };
};

export const logout = (logoutDetails) => {
  return {
    type: LOGOUT,
    payload: logoutDetails,
  };
};
export const logoutResponse = (logoutResponse) => {
  return {
    type: LOGOUT_RESPONSE,
    payload: logoutResponse,
  };
};
