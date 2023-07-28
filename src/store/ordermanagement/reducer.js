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
  INACTIVE_RATE_CONTRACT_RESPONSE,
  POST_RENEW_RATE_CONTRACT,
  POST_RENEW_RATE_CONTRACT_RESPONSE,
  GET_FREEZE_NOTI_DETAILS,
  GET_FREEZE_NOTI_DETAILS_RESPONSE,
  CREATE_PO,
  CREATE_PO_RESPONSE,
  PROCESS_PO,
  PROCESS_PO_RESPONSE,
  GET_PROCESS_ORDER_PROCESS_INFO,
  GET_PROCESS_ORDER_PROCESS_INFO_RESPONSE,
  PROCESS_LOCAL_PO,
  PROCESS_LOCAL_PO_RESPOSNE,
  GET_LOCAL_PO_INFO,
  GET_LOCAL_PO_INFO_RESPOSNE,
  CREATE_LOCAL_PO,
  CREATE_LOCAL_PO_RESPONSE,
  CANCEL_PO_RESPONSE,
  CANCEL_PO,
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
};

const ordermanagement = (state = initialState, action) => {
  switch (action.type) {
    case GET_MANUFACTURING_DESK_LIST:
      state = {
        ...state,
      };
      break;
    case GET_MANUFACTURING_DESK_LIST_RESPONSE:
      state = {
        ...state,
        manufactureDeskList: action.payload,
      };
      break;
    case GET_APPROVAL_DESK_LIST:
      state = {
        ...state,
      };
      break;
    case GET_APPROVAL_DESK_LIST_RESPONSE:
      state = {
        ...state,
        approvalDeskListResponse: action.payload,
      };
      break;
    case GET_PURCHASE_ORDER_LIST_FOR_APPROVAL:
      state = {
        ...state,
      };
      break;
    case GET_PURCHASE_ORDER_LIST_FOR_APPROVAL_RESPONSE:
      console.log("Action payload", action?.payload);
      state = {
        ...state,
        purchaseOrderListResponse: action?.payload,
      };
      break;
    case GET_APPROVAL_INTENT_APPROVAL_LIST:
      state = {
        ...state,
      };
      break;
    case GET_APPROVAL_INTENT_APPROVAL_LIST_RESPONSE:
      console.log("Action payload", action.payload);
      state = {
        ...state,
        intentApprovalListResponse: action?.payload,
      };
      break;
    case GET_TRANSFER_APPROVAL_LIST:
      state = {
        ...state,
      };
      break;
    case GET_TRANSFER_APPROVAL_LIST_RESPONSE:
      state = {
        ...state,
        transferApprovalListResponse: action?.payload,
      };
      break;
    case GET_TRANSFER_APPROVAL_LIST_HQ:
      state = {
        ...state,
      };
      break;
    case GET_TRANSFER_APPROVAL_LIST_HQ_RESPONSE:
      console.log("Action payload", action.payload);
      state = {
        ...state,
        transferApprovalListHqResponse: action?.payload,
      };
      break;
    case GET_CENTRAL_PURCHASE_LIST:
      state = {
        ...state,
      };
      break;
    case GET_CENTRAL_PURCHASE_LIST_RESPONSE:
      console.log("Action payload", action.payload);
      state = {
        ...state,
        centralPurchaseListResponse: action?.payload,
      };
      break;
    case CREATE_MANUFACTURING:
      state = {
        ...state,
      };
      break;
    case CREATE_MANUFACTURING_RESPONSE:
      console.log("Action payload", action.payload);
      state = {
        ...state,
        createManufacturingResponse: action?.payload,
      };
      break;
    case EDIT_MANUFACTURING:
      state = {
        ...state,
      };
      break;
    case EDIT_MANUFACTURING_RESPONSE:
      console.log("Action payload", action.payload);
      state = {
        ...state,
        updateManufacturingResponse: action?.payload,
      };
      break;
    case GET_ANNUAL_DEMAND_BY_NOTIFICATION_ID:
      state = {
        ...state,
      };
      break;
    case GET_ANNUAL_DEMAND_BY_NOTIFICATION_ID_RESPONSE:
      state = {
        ...state,
        annualDemandNotiByIdResp: action?.payload,
      };
      break;

    case APPROVE_ANNUAL_DEMAND:
      state = {
        ...state,
      };
      break;
    case APPROVE_ANNUAL_DEMAND_RESPONSE:
      state = {
        ...state,
        annualDemandApprovalResp: action?.payload,
      };
      break;

    case GET_NEW_RATE_CONTRACT_LIST:
      state = {
        ...state,
      };
      break;
    case GET_NEW_RATE_CONTRACT_LIST_RESPONSE:
      state = {
        ...state,
        newRateContractListResp: action?.payload,
      };
      break;

    case ADD_NEW_CONTRACT_RATE:
      state = {
        ...state,
      };
      break;
    case ADD_NEW_CONTRACT_RATE_RESPONSE:
      state = {
        ...state,
        addNewContractRateResp: action?.payload,
      };
      break;

    case RENEW_RATE_CONTRACT:
      state = {
        ...state,
      };
      break;
    case RENEW_RATE_CONTRACT_RESPONSE:
      state = {
        ...state,
        renewRateContrctResp: action?.payload,
      };
      break;
    case INACTIVE_RATE_CONTRACT:
      state = {
        ...state,
      };
      break;
    case INACTIVE_RATE_CONTRACT_RESPONSE:
      state = {
        ...state,
        inactiveRateContrctResp: action?.payload,
      };
      break;

    case POST_RENEW_RATE_CONTRACT:
      state = {
        ...state,
      };
      break;
    case POST_RENEW_RATE_CONTRACT_RESPONSE:
      state = {
        ...state,
        postRenewRateContractResp: action?.payload,
      };
      break;

    case GET_FREEZE_NOTI_DETAILS:
      state = {
        ...state,
      };
      break;
    case GET_FREEZE_NOTI_DETAILS_RESPONSE:
      state = {
        ...state,
        getFreezeNotiDetailsResp: action?.payload,
      };
      break;

    case CREATE_PO:
      state = {
        ...state,
      };
      break;
    case CREATE_PO_RESPONSE:
      state = {
        ...state,
        createPoResp: action?.payload,
      };
      break;

    case PROCESS_PO:
      state = {
        ...state,
      };
      break;
    case PROCESS_PO_RESPONSE:
      state = {
        ...state,
        processPoResp: action?.payload,
      };
      break;

    case GET_PROCESS_ORDER_PROCESS_INFO:
      state = {
        ...state,
      };
      break;
    case GET_PROCESS_ORDER_PROCESS_INFO_RESPONSE:
      state = {
        ...state,
        processOrderInfoResp: action?.payload,
      };
      break;

    case GET_LOCAL_PO_INFO:
      state = {
        ...state,
      };
      break;
    case GET_LOCAL_PO_INFO_RESPOSNE:
      state = {
        ...state,
        getLocalPORespInfo: action?.payload,
      };
      break;

    case CREATE_LOCAL_PO:
      state = {
        ...state,
      };
      break;
    case CREATE_LOCAL_PO_RESPONSE:
      state = {
        ...state,
        createLocalPoResp: action?.payload,
      };
      break;

    case CANCEL_PO:
      state = {
        ...state,
      };
      break;
    case CANCEL_PO_RESPONSE:
      state = {
        ...state,
        cancelPoResp: action?.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default ordermanagement;
