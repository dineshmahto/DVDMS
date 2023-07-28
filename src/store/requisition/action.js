import {
  GET_INTENT_DRUGS_LIST,
  GET_INTENT_DRUGS_LIST_RESPONSE,
  GET_TRANSFER_LIST,
  GET_TRANSFER_LIST_RESPONSE,
} from "./actionTypes";

export const getIntentDrugList = (pageDetails) => {
  return {
    type: GET_INTENT_DRUGS_LIST,
    payload: pageDetails,
  };
};
export const getIntentDrugListResponse = (intentDrugListResponse) => {
  return {
    type: GET_INTENT_DRUGS_LIST_RESPONSE,
    payload: intentDrugListResponse,
  };
};

export const getTransferList = (pageDetails) => {
  return {
    type: GET_TRANSFER_LIST,
    payload: pageDetails,
  };
};
export const getTransferListResponse = (transferListResponse) => {
  return {
    type: GET_TRANSFER_LIST_RESPONSE,
    payload: transferListResponse,
  };
};
