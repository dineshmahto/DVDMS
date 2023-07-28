import {
  APPROVE_PO_INFO,
  APPROVE_PO_INFO_RESPONSE,
  DISPATCH_PO,
  DISPATCH_PO_RESPONSE,
  GET_PO_APPROVED_LIST,
  GET_PO_APPROVED_LIST_RESPONSE,
  GET_PO_INFO_BY_ID,
  GET_PO_INFO_BY_ID_RESPONSE,
  REJECT_PO_INFO,
  REJECT_PO_INFO_RESPONSE,
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

    case GET_PO_INFO_BY_ID:
      state = {
        ...state,
      };
      break;
    case GET_PO_INFO_BY_ID_RESPONSE:
      state = {
        ...state,
        poInfoIdResp: action?.payload,
      };
      break;
    case REJECT_PO_INFO:
      state = {
        ...state,
      };
      break;
    case REJECT_PO_INFO_RESPONSE:
      state = {
        ...state,
        rejectPoInfoResp: action?.payload,
      };
      break;

    case APPROVE_PO_INFO:
      state = {
        ...state,
      };
      break;
    case APPROVE_PO_INFO_RESPONSE:
      state = {
        ...state,
        approvePoInfoResp: action?.payload,
      };
      break;

    case DISPATCH_PO:
      state = {
        ...state,
      };
      break;
    case DISPATCH_PO_RESPONSE:
      state = {
        ...state,
        dispatchPoResp: action?.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default supplier;
