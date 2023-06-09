import { SHOW_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from "./actionTypes";

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
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default login;
