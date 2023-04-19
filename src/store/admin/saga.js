import { call, put, takeEvery } from "redux-saga/effects";
import {
  getProgramDeskListResponse,
  getPurchaseOrderListResponse,
  getRoleListResponse,
  getStoreDeskListResponse,
  getSupplierListResponse,
  getUserListResponse,
  roleDeleteResponse,
} from "./action";
import { Service } from "../../config/commonFetch";

import {
  DELETE_ROLE,
  GET_PROGRAM_DESK_LIST,
  GET_PURCHASE_ORDER_LIST,
  GET_ROLE_LIST,
  GET_STORE_DESK_LIST,
  GET_SUPPLIER_LIST,
  GET_USER_LIST,
  ROLE_DELETED_SUCCESSFULL,
} from "./actionTypes";
import * as CONSTANTS from "../../common/constant/constants";

function* deleteRoleById({ payload: roleId }) {
  console.log("RoleId", roleId);
  try {
    const response = yield call(
      Service.commonFetch,
      `issue/issueList/${roleId}`,
      null
    );
    console.log("Response", response);
    yield put(roleDeleteResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(roleDeleteResponse(error));
  }
}

function* getUserList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.USER_LISTING,
      pageDetails
    );
    console.log("Response", response);
    yield put(getUserListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getUserListResponse(error));
  }
}

function* getRoleList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.ROLE_LISTING,
      pageDetails
    );
    console.log("Response", response);
    yield put(getRoleListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getRoleListResponse(error));
  }
}

function* getProgramDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.PROGRAME_DESK_LISTING,
      pageDetails
    );
    console.log("Response", response);
    yield put(getProgramDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getProgramDeskListResponse(error));
  }
}

function* getStoreDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.STORE_DESK_LISTING,
      pageDetails
    );
    console.log("Response", response);
    yield put(getStoreDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStoreDeskListResponse(error));
  }
}

function* getPurchaseOrderList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.PURCHASE_ORDER_LIST,
      pageDetails
    );
    console.log("Response", response);
    yield put(getPurchaseOrderListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getPurchaseOrderListResponse(error));
  }
}

function* getSupplierList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.SUPPLIER_LIST,
      pageDetails
    );
    console.log("Response", response);
    yield put(getSupplierListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getSupplierListResponse(error));
  }
}

function* AdminSaga() {
  yield takeEvery(DELETE_ROLE, deleteRoleById);
  yield takeEvery(GET_USER_LIST, getUserList);
  yield takeEvery(GET_ROLE_LIST, getRoleList);
  yield takeEvery(GET_PROGRAM_DESK_LIST, getProgramDeskList);
  yield takeEvery(GET_STORE_DESK_LIST, getStoreDeskList);
  yield takeEvery(GET_PURCHASE_ORDER_LIST, getPurchaseOrderList);
  yield takeEvery(GET_SUPPLIER_LIST, getSupplierList);
}
export default AdminSaga;
