import {
  ADD_DRUG_CONDEMNATION,
  ADD_DRUG_CONDEMNATION_RESPONSE,
  ADD_STOCK_ENTRY,
  ADD_STOCK_ENTRY_RESPONSE,
  ADD_STOCK_VERIFICATION,
  ADD_STOCK_VERIFICATION_RESPONSE,
  GET_ADD_DRUG_CONDEMNATION_LIST,
  GET_ADD_DRUG_CONDEMNATION_LIST_RESPONSE,
  GET_ADD_STOCK_VERIFICATION_LIST,
  GET_ADD_STOCK_VERIFICATION_LIST_RESPONSE,
  GET_DRUG_CONDEMNATION_LSIT,
  GET_DRUG_CONDEMNATION_LSIT_RESPONSE,
  GET_STOCK_DESK_LIST,
  GET_STOCK_DESK_LIST_RESPONSE,
  GET_STOCK_ENTRY_DESK,
  GET_STOCK_ENTRY_DESK_RESPONSE,
  GET_STOCK_VERIFICATION_LIST,
  GET_STOCK_VERIFICATION_LIST_RESPONSE,
  GET_UPDATE_STOCK_RACK_LIST,
  GET_UPDATE_STOCK_RACK_LIST_RESPONSE,
} from "./actionTypes";

export const getStockDeskList = (pageDetails) => {
  return {
    type: GET_STOCK_DESK_LIST,
    payload: pageDetails,
  };
};

export const getStockDeskListResponse = (stockDeskListResponse) => {
  return {
    type: GET_STOCK_DESK_LIST_RESPONSE,
    payload: stockDeskListResponse,
  };
};

export const addStockEntry = (stockDetails) => {
  return {
    type: ADD_STOCK_ENTRY,
    payload: stockDetails,
  };
};
export const addStockEntryResponse = (stockEntryResponse) => {
  return {
    type: ADD_STOCK_ENTRY_RESPONSE,
    payload: stockEntryResponse,
  };
};

export const getStockEntryDesk = () => {
  return {
    type: GET_STOCK_ENTRY_DESK,
  };
};

export const getStockEntryDeskResponse = (stockEntryDeskResponse) => {
  return {
    type: GET_STOCK_ENTRY_DESK_RESPONSE,
    payload: stockEntryDeskResponse,
  };
};

export const getStockUpdateRackList = (pageDetails) => {
  return {
    type: GET_UPDATE_STOCK_RACK_LIST,
    payload: pageDetails,
  };
};

export const getStockUpdateRackListResponse = (stockUpdateRackListResponse) => {
  return {
    type: GET_UPDATE_STOCK_RACK_LIST_RESPONSE,
    payload: stockUpdateRackListResponse,
  };
};
export const getStockVerificationList = (pageDetails) => {
  return {
    type: GET_STOCK_VERIFICATION_LIST,
    payload: pageDetails,
  };
};
export const getStockVerificationListResponse = (
  stockVerificationListResponse
) => {
  return {
    type: GET_STOCK_VERIFICATION_LIST_RESPONSE,
    payload: stockVerificationListResponse,
  };
};

export const getAddStockVerificationList = (pageDetails) => {
  return {
    type: GET_ADD_STOCK_VERIFICATION_LIST,
    payload: pageDetails,
  };
};

export const getAddStockVerificationListResponse = (
  addStockVerificationListResponse
) => {
  return {
    type: GET_ADD_STOCK_VERIFICATION_LIST_RESPONSE,
    payload: addStockVerificationListResponse,
  };
};

export const addStockVerification = (addDetails) => {
  return {
    type: ADD_STOCK_VERIFICATION,
    payload: addDetails,
  };
};
export const addStockVerificationResponse = (addStockVerificationResponse) => {
  return {
    type: ADD_STOCK_VERIFICATION_RESPONSE,
    payload: addStockVerificationResponse,
  };
};

export const getDrugCondemnation = (pageDetails) => {
  return {
    type: GET_DRUG_CONDEMNATION_LSIT,
    payload: pageDetails,
  };
};

export const getDrugCondemnationListResponse = (
  drugCondemnationListResponse
) => {
  return {
    type: GET_DRUG_CONDEMNATION_LSIT_RESPONSE,
    payload: drugCondemnationListResponse,
  };
};

export const getAddDrugCondemnationList = (pageDetails) => {
  return {
    type: GET_ADD_DRUG_CONDEMNATION_LIST,
    payload: pageDetails,
  };
};
export const getAddDrugCondemnationListResponse = (
  addDrugCondemnationListResponse
) => {
  return {
    type: GET_ADD_DRUG_CONDEMNATION_LIST_RESPONSE,
    payload: addDrugCondemnationListResponse,
  };
};

export const addDrugCondemnation = (addDetails) => {
  return {
    type: ADD_DRUG_CONDEMNATION,
    payload: addDetails,
  };
};
export const addDrugCondemnationResponse = (addDrugCondemnationResponse) => {
  return {
    type: ADD_DRUG_CONDEMNATION_RESPONSE,
    payload: addDrugCondemnationResponse,
  };
};
