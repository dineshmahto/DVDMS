import {
  GET_ALL_CHALLAN_LIST,
  GET_ALL_CHALLAN_LIST_RESPONSE,
  GET_RECEIVED_DRUG_LIST,
  GET_RECEIVED_DRUG_LIST_RESPONSE,
  GET_RECEIVED_PO_CHALLAN_LIST,
  GET_RECEIVED_PO_CHALLAN_LIST_RESPONSE,
} from "./actionTypes";

const initialState = {
  loading: false,
};

const receiving = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECEIVED_DRUG_LIST:
      state = {
        ...state,
      };
      break;
    case GET_RECEIVED_DRUG_LIST_RESPONSE:
      state = {
        ...state,
        receivedDrugListResp: action?.payload,
      };
      break;
    case GET_RECEIVED_PO_CHALLAN_LIST:
      state = {
        ...state,
      };
      break;
    case GET_RECEIVED_PO_CHALLAN_LIST_RESPONSE:
      state = {
        ...state,
        receivedPoChallanListResp: action?.payload,
      };
      break;
    case GET_ALL_CHALLAN_LIST:
      state = {
        ...state,
      };
      break;
    case GET_ALL_CHALLAN_LIST_RESPONSE:
      state = {
        ...state,
        allChallanListResp: action?.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default receiving;
