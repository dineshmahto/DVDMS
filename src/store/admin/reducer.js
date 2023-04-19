import {
  DELETE_ROLE,
  GET_PROGRAM_DESK_LIST,
  GET_PROGRAM_DESK_LIST_RESPONSE,
  GET_PURCHASE_ORDER_LIST,
  GET_PURCHASE_ORDER_LIST_RESPONSE,
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
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default admin;
