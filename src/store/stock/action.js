import {
  ADD_STOCK_ENTRY,
  ADD_STOCK_ENTRY_RESPONSE,
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
