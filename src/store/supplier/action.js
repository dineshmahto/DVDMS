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

export const getPoInfoById = (id) => {
  return {
    type: GET_PO_INFO_BY_ID,
    payload: id,
  };
};

export const getPoInfoByIdResponse = (poInfoIdResponse) => {
  return {
    type: GET_PO_INFO_BY_ID_RESPONSE,
    payload: poInfoIdResponse,
  };
};

export const rejectPoInfo = (poDetails) => {
  return {
    type: REJECT_PO_INFO,
    payload: poDetails,
  };
};

export const rejectPoInfoResponse = (rejectPoInfoResp) => {
  return {
    type: REJECT_PO_INFO_RESPONSE,
    payload: rejectPoInfoResp,
  };
};

export const approvePoInfo = (poDetails) => {
  return {
    type: APPROVE_PO_INFO,
    payload: poDetails,
  };
};

export const approvePoInfoResponse = (approvePoInfoResp) => {
  return {
    type: APPROVE_PO_INFO_RESPONSE,
    payload: approvePoInfoResp,
  };
};

export const dispatchPoInfo = (poDetails) => {
  return {
    type: DISPATCH_PO,
    payload: poDetails,
  };
};

export const dispatchPoInfoResponse = (dispatchPoResponse) => {
  return {
    type: DISPATCH_PO_RESPONSE,
    payload: dispatchPoResponse,
  };
};
