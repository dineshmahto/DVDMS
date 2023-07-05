import {
  GET_RECEIVED_DRUG_LIST,
  GET_RECEIVED_DRUG_LIST_RESPONSE,
} from "./actionTypes";

export const getReceivedDrugList = (pageDetails) => {
  return {
    type: GET_RECEIVED_DRUG_LIST,
    payload: pageDetails,
  };
};

export const getReceivedDrugListResponse = (receivedDrugListResp) => {
  return {
    type: GET_RECEIVED_DRUG_LIST_RESPONSE,
    payload: receivedDrugListResp,
  };
};
