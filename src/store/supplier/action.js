import {
  GET_PO_APPROVED_LIST,
  GET_PO_APPROVED_LIST_RESPONSE,
} from "./actionTypes";

export const getPoApprovedList = (pageDetails) => {
  return {
    type: GET_PO_APPROVED_LIST,
    payload: pageDetails,
  };
};

export const getPoApprovedListResponse = (poApporvedList) => {
  return {
    type: GET_PO_APPROVED_LIST_RESPONSE,
    payload: poApporvedList,
  };
};
