import { SHOW_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from "./actionTypes";

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
