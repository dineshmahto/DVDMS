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
import {} from "./actionTypes";

export const deleteRole = (roleId) => {
  return {
    type: DELETE_ROLE,
    payload: roleId,
  };
};
export const roleDeleteResponse = (issueList) => {
  return {
    type: ROLE_DELETED_SUCCESSFULL,
    payload: issueList,
  };
};

export const getUserList = (pageDetails) => {
  return {
    type: GET_USER_LIST,
    payload: pageDetails,
  };
};

export const getUserListResponse = (userListResponse) => {
  return {
    type: GET_USER_LIST_RESPONSE,
    payload: userListResponse,
  };
};

export const getRoleList = (pageDetails) => {
  return {
    type: GET_ROLE_LIST,
    payload: pageDetails,
  };
};

export const getRoleListResponse = (roleListResponse) => {
  return {
    type: GET_ROLE_LIST_RESPONSE,
    payload: roleListResponse,
  };
};

export const getProgramDeskList = (pageDetails) => {
  return {
    type: GET_PROGRAM_DESK_LIST,
    payload: pageDetails,
  };
};
export const getProgramDeskListResponse = (programeDeskListResponse) => {
  return {
    type: GET_PROGRAM_DESK_LIST_RESPONSE,
    payload: programeDeskListResponse,
  };
};

export const getStoreDeskList = (pageDetails) => {
  return {
    type: GET_STORE_DESK_LIST,
    payload: pageDetails,
  };
};

export const getStoreDeskListResponse = (storeDeskListResponse) => {
  return {
    type: GET_STORE_DESK_LIST_RESPONSE,
    payload: storeDeskListResponse,
  };
};

export const getPurchaseOrderList = (pageDetails) => {
  return {
    type: GET_PURCHASE_ORDER_LIST,
    payload: pageDetails,
  };
};

export const getPurchaseOrderListResponse = (purchaseOrderListResponse) => {
  return {
    type: GET_PURCHASE_ORDER_LIST_RESPONSE,
    payload: purchaseOrderListResponse,
  };
};
export const getSupplierList = (pageDetails) => {
  return {
    type: GET_SUPPLIER_LIST,
    payload: pageDetails,
  };
};
export const getSupplierListResponse = (supplierListResponse) => {
  return {
    type: GET_SUPPLIER_LIST_RESPONSE,
    payload: supplierListResponse,
  };
};
