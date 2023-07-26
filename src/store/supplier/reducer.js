import {
  GET_PO_APPROVED_LIST,
  GET_PO_APPROVED_LIST_RESPONSE,
} from "./actionTypes";

const initialState = {
  loading: false,
};

const supplier = (state = initialState, action) => {
  switch (action.type) {
    case GET_PO_APPROVED_LIST:
      state = {
        ...state,
      };
      break;
    case GET_PO_APPROVED_LIST_RESPONSE:
      state = {
        ...state,
        poApprovedListResp: action?.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default supplier;
