import { POST_STOCK_STATUS_REPORT } from "../../common/constant/constants";
import {
  GET_STOCK_LEDGER,
  GET_STOCK_LEDGER_RESPONSE,
  GET_CLASSWISE_DRUG,
  GET_CLASSWISE_DRUG_RESPONSE,
  POST_STOCK_REPORT,
  POST_STOCK_REPORT_RESPONSE,
  GET_STOCK_STATUS,
  GET_STOCK_STATUS_RESPONSE,
  POST_STATUS_REPORT,
  POST_STATUS_REPORT_RESPONSE,
  GET_SUBSTORE_BY_STOREID,
  GET_SUBSTORE_BY_STOREID_RESPONSE,
} from "./actionType";

import {} from "./actionType";

export const getStockLedger = (inputdata) => {
  return {
    type: GET_STOCK_LEDGER,
    payload: inputdata,
  };
};

export const getStockLedgerResponse = (stockLedgerResponse) => {
  return {
    type: GET_STOCK_LEDGER_RESPONSE,
    payload: stockLedgerResponse,
  };
};
export const getStockStatus = (inputdata) => {
  return {
    type: GET_STOCK_STATUS,
    payload: inputdata,
  };
};

export const getStockStatusResponse = (stockStatusResponse) => {
  return {
    type: GET_STOCK_STATUS_RESPONSE,
    payload: stockStatusResponse,
  };
};

export const getClasswiseDrug = (inputdata) => {
  return {
    type: GET_CLASSWISE_DRUG,
    payload: inputdata,
  };
};

export const getClasswiseDrugResponse = (userListResponse) => {
  return {
    type: GET_CLASSWISE_DRUG_RESPONSE,
    payload: userListResponse,
  };
};
export const postStockReport = (inputdata) => {
  return {
    type: POST_STOCK_REPORT,
    payload: inputdata,
  };
};

export const postStockReportResponse = (postReportResponse) => {
  return {
    type: POST_STOCK_REPORT_RESPONSE,
    payload: postReportResponse,
  };
};
export const postStatusReport = (inputdata) => {
  return {
    type: POST_STATUS_REPORT,
    payload: inputdata,
  };
};

export const postStatusReportResponse = (postReportResponse) => {
  return {
    type: POST_STATUS_REPORT_RESPONSE,
    payload: postReportResponse,
  };
};
export const getStorewiseSubStore = (inputdata) => {
  return {
    type: GET_SUBSTORE_BY_STOREID,
    payload: inputdata,
  };
};

export const getStorewiseSubStoreResponse = (subStoreResponse) => {
  return {
    type: GET_SUBSTORE_BY_STOREID_RESPONSE,
    payload: subStoreResponse,
  };
};
