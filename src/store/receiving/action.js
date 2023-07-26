import {
  GET_ALL_CHALLAN_LIST,
  GET_ALL_CHALLAN_LIST_RESPONSE,
  GET_RECEIVED_DRUG_LIST,
  GET_RECEIVED_DRUG_LIST_RESPONSE,
  GET_RECEIVED_PO_CHALLAN_LIST,
  GET_RECEIVED_PO_CHALLAN_LIST_RESPONSE,
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

export const getReceivedPoChallanList = (pageDetails) => {
  return {
    type: GET_RECEIVED_PO_CHALLAN_LIST,
    payload: pageDetails,
  };
};

export const getReceivedPoChallanListResponse = (receivedPoChallanListResp) => {
  return {
    type: GET_RECEIVED_PO_CHALLAN_LIST_RESPONSE,
    payload: receivedPoChallanListResp,
  };
};

export const getAllChallanList = (pageDetails) => {
  return {
    type: GET_ALL_CHALLAN_LIST,
    payload: pageDetails,
  };
};

export const getAllChallanListResponse = (allChallanListResp) => {
  return {
    type: GET_ALL_CHALLAN_LIST_RESPONSE,
    payload: allChallanListResp,
  };
};
