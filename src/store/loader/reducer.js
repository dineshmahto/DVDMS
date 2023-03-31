import { SHOW_LOADER, HIDE_LOADER } from "./actionTypes";

const initialState = {
  loading: false,
};

const loader = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case HIDE_LOADER:
      state = {
        ...state,
        loading: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default loader;
