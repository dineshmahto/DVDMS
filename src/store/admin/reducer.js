import { DELETE_ROLE, ROLE_DELETED_SUCCESSFULL } from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
};

const roleDesk = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ROLE:
      state = {
        ...state,  
      };
      break;
    case ROLE_DELETED_SUCCESSFULL:
      state = {
        ...state,
        deleteResponse: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default roleDesk;
