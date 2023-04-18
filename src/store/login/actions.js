import {
  SHOW_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  LOGIN,
  LOGIN_RESPONSE,
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
