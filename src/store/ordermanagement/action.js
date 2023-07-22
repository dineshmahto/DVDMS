import { GET_LOCAL_PURCHASE_ORDER_INFO } from "../../common/constant/constants";
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
  GET_ANNUAL_DEMAND_BY_NOTIFICATION_ID,
  GET_ANNUAL_DEMAND_BY_NOTIFICATION_ID_RESPONSE,
  APPROVE_ANNUAL_DEMAND,
  APPROVE_ANNUAL_DEMAND_RESPONSE,
  GET_NEW_RATE_CONTRACT_LIST,
  GET_NEW_RATE_CONTRACT_LIST_RESPONSE,
  ADD_NEW_CONTRACT_RATE,
  ADD_NEW_CONTRACT_RATE_RESPONSE,
  RENEW_RATE_CONTRACT,
  RENEW_RATE_CONTRACT_RESPONSE,
  INACTIVE_RATE_CONTRACT,
  POST_RENEW_RATE_CONTRACT,
  POST_RENEW_RATE_CONTRACT_RESPONSE,
  INACTIVE_RATE_CONTRACT_RESPONSE,
  GET_FREEZE_NOTI_DETAILS_RESPONSE,
  GET_FREEZE_NOTI_DETAILS,
  CREATE_PO,
  CREATE_PO_RESPONSE,
  PROCESS_PO,
  GET_PROCESS_ORDER_PROCESS_INFO,
  GET_PROCESS_ORDER_PROCESS_INFO_RESPONSE,
  PROCESS_LOCAL_PO,
  PROCESS_LOCAL_PO_RESPOSNE,
  GET_LOCAL_PO_INFO_RESPOSNE,
  GET_LOCAL_PO_INFO,
  CREATE_LOCAL_PO,
  CREATE_LOCAL_PO_RESPONSE,
  CANCEL_PO_RESPONSE,
  CANCEL_PO,
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

export const getAnnualDemandByNotifId = (notificationId) => {
  return {
    type: GET_ANNUAL_DEMAND_BY_NOTIFICATION_ID,
    payload: notificationId,
  };
};

export const getAnnualDemandByNotifIdResp = (annualDemandListByIdResp) => {
  return {
    type: GET_ANNUAL_DEMAND_BY_NOTIFICATION_ID_RESPONSE,
    payload: annualDemandListByIdResp,
  };
};

export const approveAnnualDemand = (approvalDetails) => {
  return {
    type: APPROVE_ANNUAL_DEMAND,
    payload: approvalDetails,
  };
};

export const approveAnnualDemandResponse = (annualDemandApprovalResp) => {
  return {
    type: APPROVE_ANNUAL_DEMAND_RESPONSE,
    payload: annualDemandApprovalResp,
  };
};

export const getNewRateContractList = (pageDetails) => {
  return {
    type: GET_NEW_RATE_CONTRACT_LIST,
    payload: pageDetails,
  };
};

export const getNewRateContractListResp = (newRateContractListResp) => {
  return {
    type: GET_NEW_RATE_CONTRACT_LIST_RESPONSE,
    payload: newRateContractListResp,
  };
};

export const addNewContractRate = (addDetails) => {
  return {
    type: ADD_NEW_CONTRACT_RATE,
    payload: addDetails,
  };
};

export const addNewContractRateResponse = (addNewContractRateResp) => {
  return {
    type: ADD_NEW_CONTRACT_RATE_RESPONSE,
    payload: addNewContractRateResp,
  };
};

export const renewRateContract = (id) => {
  return {
    type: RENEW_RATE_CONTRACT,
    payload: id,
  };
};

export const renewRateContractResponse = (renewRateContrtResp) => {
  return {
    type: RENEW_RATE_CONTRACT_RESPONSE,
    payload: renewRateContrtResp,
  };
};

export const inactiveRateContract = (id) => {
  return {
    type: INACTIVE_RATE_CONTRACT,
    payload: id,
  };
};

export const inactiveRateContractResponse = (inactiveRateContrctResp) => {
  return {
    type: INACTIVE_RATE_CONTRACT_RESPONSE,
    payload: inactiveRateContrctResp,
  };
};

export const postRenewRateContract = (id) => {
  return {
    type: POST_RENEW_RATE_CONTRACT,
    payload: id,
  };
};

export const postRenewRateContractResponse = (postRenewRateContractResp) => {
  return {
    type: POST_RENEW_RATE_CONTRACT_RESPONSE,
    payload: postRenewRateContractResp,
  };
};

export const getFreezeNotiDetails = (id) => {
  return {
    type: GET_FREEZE_NOTI_DETAILS,
    payload: id,
  };
};

export const getFreezeNotiDetailsResponse = (freezeNotiDetailsResp) => {
  return {
    type: GET_FREEZE_NOTI_DETAILS_RESPONSE,
    payload: freezeNotiDetailsResp,
  };
};

export const createPO = (poDetails) => {
  return {
    type: CREATE_PO,
    payload: poDetails,
  };
};

export const createPoResponse = (createPoResp) => {
  return {
    type: CREATE_PO_RESPONSE,
    payload: createPoResp,
  };
};

export const processPO = (id) => {
  return {
    type: PROCESS_PO,
    payload: id,
  };
};

export const processPOResponse = (processPoResp) => {
  return {
    type: CREATE_PO_RESPONSE,
    payload: processPoResp,
  };
};

export const getPrcessOrderInfo = (processDetail) => {
  return {
    type: GET_PROCESS_ORDER_PROCESS_INFO,
    payload: processDetail,
  };
};

export const getProcessOrderInfoResponse = (processOrderInfoResp) => {
  return {
    type: GET_PROCESS_ORDER_PROCESS_INFO_RESPONSE,
    payload: processOrderInfoResp,
  };
};

export const getLocalPoInfo = () => {
  return {
    type: GET_LOCAL_PO_INFO,
  };
};

export const getLocalPoInfoResponse = (processLocalPoResp) => {
  return {
    type: GET_LOCAL_PO_INFO_RESPOSNE,
    payload: processLocalPoResp,
  };
};

export const createLocalPo = (details) => {
  return {
    type: CREATE_LOCAL_PO,
    payload: details,
  };
};

export const createLocalPoResponse = (createLocalPoResponse) => {
  return {
    type: CREATE_LOCAL_PO_RESPONSE,
    payload: createLocalPoResponse,
  };
};

export const cancelPo = (poId) => {
  return {
    type: CANCEL_PO,
    payload: poId,
  };
};

export const cancelPoResponse = (cancelPoResp) => {
  return {
    type: CANCEL_PO_RESPONSE,
    payload: cancelPoResp,
  };
};
