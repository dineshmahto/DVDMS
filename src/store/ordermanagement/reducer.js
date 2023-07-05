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
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default ordermanagement;
