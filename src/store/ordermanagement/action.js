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
} from "./actionTypes";
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
