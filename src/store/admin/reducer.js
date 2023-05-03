import {
  DELETE_ROLE,
  GET_BUDGET_INTERFACE_LIST,
  GET_BUDGET_INTERFACE_LIST_RESPONSE,
  GET_DRUG_DESK_LIST,
  GET_DRUG_DESK_LIST_RESPONSE,
  GET_EDL_MAPPING,
  GET_EDL_MAPPING_RESPONSE,
  GET_FUNDING_SOURCE_LIST,
  GET_FUNDING_SOURCE_LIST_RESPONSE,
  GET_PROGRAM_DESK_LIST,
  GET_PROGRAM_DESK_LIST_RESPONSE,
  GET_PROGRAM_FUNDING_SOURCE,
  GET_PROGRAM_FUNDING_SOURCE_RESPONSE,
  GET_PURCHASE_ORDER_LIST,
  GET_PURCHASE_ORDER_LIST_RESPONSE,
  GET_RATE_CONTRACT_DESK_LIST,
  GET_RATE_CONTRACT_DESK_LIST_RESPONSE,
  GET_ROLE_LIST,
  GET_ROLE_LIST_RESPONSE,
  GET_STORE_DESK_LIST,
  GET_STORE_DESK_LIST_RESPONSE,
  GET_SUPPLIER_LIST,
  GET_SUPPLIER_LIST_RESPONSE,
  GET_USER_LIST,
  GET_USER_LIST_RESPONSE,
  ROLE_DELETED_SUCCESSFULL,
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ROLE:
      state = {
        ...state,
      };
      break;
    case ROLE_DELETED_SUCCESSFULL:
      state = {
        ...state,
        deleteResponse: action.payload,
      };
      break;
    case GET_USER_LIST:
      state = {
        ...state,
      };
      break;
    case GET_USER_LIST_RESPONSE:
      state = {
        ...state,
        userListResponse: action.payload,
      };
      break;
    case GET_ROLE_LIST:
      state = {
        ...state,
      };
      break;
    case GET_ROLE_LIST_RESPONSE:
      state = {
        ...state,
        roleListResponse: action.payload,
      };
      break;
    case GET_PROGRAM_DESK_LIST:
      state = {
        ...state,
      };
      break;
    case GET_PROGRAM_DESK_LIST_RESPONSE:
      state = {
        ...state,
        programeDeskListResponse: action.payload,
      };
      break;
    case GET_STORE_DESK_LIST:
      state = {
        ...state,
      };
      break;
    case GET_STORE_DESK_LIST_RESPONSE:
      state = {
        ...state,
        storeDeskListResponse: action.payload,
      };
      break;
    case GET_PURCHASE_ORDER_LIST:
      state = {
        ...state,
      };
      break;
    case GET_PURCHASE_ORDER_LIST_RESPONSE:
      state = {
        ...state,
        purchaseOrderListResponse: action.payload,
      };
      break;
    case GET_SUPPLIER_LIST:
      state = {
        ...state,
      };
      break;
    case GET_SUPPLIER_LIST_RESPONSE:
      state = {
        ...state,
        supplierListResponse: action.payload,
      };
      break;
    case GET_RATE_CONTRACT_DESK_LIST:
      state = {
        ...state,
      };
      break;
    case GET_RATE_CONTRACT_DESK_LIST_RESPONSE:
      state = {
        ...state,
        rateContractListResponse: action.payload,
      };
      break;
    case GET_FUNDING_SOURCE_LIST:
      state = {
        ...state,
      };
      break;
    case GET_FUNDING_SOURCE_LIST_RESPONSE:
      state = {
        ...state,
        fundingSourceListResponse: action.payload,
      };
      break;
    case GET_BUDGET_INTERFACE_LIST:
      state = {
        ...state,
      };
      break;
    case GET_BUDGET_INTERFACE_LIST_RESPONSE:
      state = {
        ...state,
        budgetInterfaceListResponse: action.payload,
      };
      break;
    case GET_DRUG_DESK_LIST:
      state = {
        ...state,
      };
      break;
    case GET_DRUG_DESK_LIST_RESPONSE:
      state = {
        ...state,
        drugDeskListResponse: action.payload,
      };
      break;
    case GET_EDL_MAPPING:
      state = {
        ...state,
      };
      break;
    case GET_EDL_MAPPING_RESPONSE:
      state = {
        ...state,
        edlMappingListResponse: action.payload,
      };
      break;
    case GET_PROGRAM_FUNDING_SOURCE:
      state = {
        ...state,
      };
      break;
    case GET_PROGRAM_FUNDING_SOURCE_RESPONSE:
      state = {
        ...state,
        programFundingSourceResponse: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default admin;
