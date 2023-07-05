import {
  GET_INTENT_DRUGS_LIST,
  GET_INTENT_DRUGS_LIST_RESPONSE,
  GET_TRANSFER_LIST,
  GET_TRANSFER_LIST_RESPONSE,
} from "./actionTypes";

const initialState = {
  loading: false,
};

const requisition = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTENT_DRUGS_LIST:
      state = {
        ...state,
      };
      break;
    case GET_INTENT_DRUGS_LIST_RESPONSE:
      state = {
        ...state,
        intentDrugsListResponse: action?.payload,
      };
      break;
    case GET_TRANSFER_LIST:
      state = {
        ...state,
      };
      break;
    case GET_TRANSFER_LIST_RESPONSE:
      state = {
        ...state,
        transferListResponse: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default requisition;
