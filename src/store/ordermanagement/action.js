import {
  GET_APPROVAL_DESK_LIST,
  GET_APPROVAL_DESK_LIST_RESPONSE,
  GET_APPROVAL_INTENT_APPROVAL_LIST,
  GET_APPROVAL_INTENT_APPROVAL_LIST_RESPONSE,
  GET_PURCHASE_ORDER_LIST_FOR_APPROVAL,
  GET_PURCHASE_ORDER_LIST_FOR_APPROVAL_RESPONSE,
  GET_TRANSFER_APPROVAL_LIST,
  GET_TRANSFER_APPROVAL_LIST_HQ,
  GET_TRANSFER_APPROVAL_LIST_HQ_RESPONSE,
  GET_TRANSFER_APPROVAL_LIST_RESPONSE,
  GET_MANUFACTURING_DESK_LIST,
  GET_MANUFACTURING_DESK_LIST_RESPONSE,
  GET_CENTRAL_PURCHASE_LIST,
  GET_CENTRAL_PURCHASE_LIST_RESPONSE,
  CREATE_MANUFACTURING,
  CREATE_MANUFACTURING_RESPONSE,
  EDIT_MANUFACTURING,
  EDIT_MANUFACTURING_RESPONSE,
} from "./actionTypes";

export const getManufactureDeskList = (pageDetails) => {
  return {
    type: GET_MANUFACTURING_DESK_LIST,
    payload: pageDetails,
  };
};

export const getManufactureDeskListResponse = (manufactureDeskListResponse) => {
  return {
    type: GET_MANUFACTURING_DESK_LIST_RESPONSE,
    payload: manufactureDeskListResponse,
  };
};

export const createManufacturing = (manufacturingDetails) => {
  return {
    type: CREATE_MANUFACTURING,
    payload: manufacturingDetails,
  };
};

export const createManufacturingResponse = (createMfgResp) => {
  return {
    type: CREATE_MANUFACTURING_RESPONSE,
    payload: createMfgResp,
  };
};
export const updateManufacturing = (manufactureDetails) => {
  return {
    type: EDIT_MANUFACTURING,
    payload: manufactureDetails,
  };
};

export const updateManufacturingResponse = (updateMfgResp) => {
  return {
    type: EDIT_MANUFACTURING_RESPONSE,
    payload: updateMfgResp,
  };
};

export const getApprovalDeskList = (pageDetails) => {
  return {
    type: GET_APPROVAL_DESK_LIST,
    payload: pageDetails,
  };
};

export const getApprovalDeskListResponse = (approvalDeskListResponse) => {
  return {
    type: GET_APPROVAL_DESK_LIST_RESPONSE,
    payload: approvalDeskListResponse,
  };
};
export const getPurchaseOrderList = (pageDetails) => {
  return {
    type: GET_PURCHASE_ORDER_LIST_FOR_APPROVAL,
    payload: pageDetails,
  };
};

export const getPurchaseOrderListResponse = (purchaseOrderListResponse) => {
  console.log("Purchase", purchaseOrderListResponse);
  return {
    type: GET_PURCHASE_ORDER_LIST_FOR_APPROVAL_RESPONSE,
    payload: purchaseOrderListResponse,
  };
};

export const getIntentforApprovalList = (pageDetails) => {
  return {
    type: GET_APPROVAL_INTENT_APPROVAL_LIST,
    payload: pageDetails,
  };
};

export const getIntentforApprovalListResponse = (
  intentListApprovalResponse
) => {
  console.log("IntentApproval", intentListApprovalResponse);
  return {
    type: GET_APPROVAL_INTENT_APPROVAL_LIST_RESPONSE,
    payload: intentListApprovalResponse,
  };
};

export const getTransferListForApproval = (pageDetails) => {
  return {
    type: GET_TRANSFER_APPROVAL_LIST,
    payload: pageDetails,
  };
};

export const getTransferListForApprovalResponse = (
  transferApprovalListResponse
) => {
  console.log("transferApprovalListResponse", transferApprovalListResponse);
  return {
    type: GET_TRANSFER_APPROVAL_LIST_RESPONSE,
    payload: transferApprovalListResponse,
  };
};

export const getTransferListForApprovalHq = (pageDetails) => {
  return {
    type: GET_TRANSFER_APPROVAL_LIST_HQ,
    payload: pageDetails,
  };
};

export const getTransferListForApprovalHqResponse = (
  transferApprovalHqListResponse
) => {
  return {
    type: GET_TRANSFER_APPROVAL_LIST_HQ_RESPONSE,
    payload: transferApprovalHqListResponse,
  };
};

export const getCentralpurchaseList = (pageDetails) => {
  return {
    type: GET_CENTRAL_PURCHASE_LIST,
    payload: pageDetails,
  };
};

export const getCentralpurchaseListResponse = (centralPurchaseListResponse) => {
  return {
    type: GET_CENTRAL_PURCHASE_LIST_RESPONSE,
    payload: centralPurchaseListResponse,
  };
};
