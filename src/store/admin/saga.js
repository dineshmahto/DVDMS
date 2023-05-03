import { call, put, takeEvery } from "redux-saga/effects";
import {
  getBudgetIterfaceListResponse,
  getDrugDeksListResponse,
  getEdlMappingListResponse,
  getFundingSourceListResponse,
  getProgramDeskListResponse,
  getProgrameFundingSourceListResponse,
  getPurchaseOrderListResponse,
  getRateContractDeskListResponse,
  getRoleListResponse,
  getStoreDeskListResponse,
  getSupplierListResponse,
  getUserListResponse,
  roleDeleteResponse,
} from "./action";
import { Service } from "../../config/commonFetch";

import {
  DELETE_ROLE,
  GET_BUDGET_INTERFACE_LIST,
  GET_DRUG_DESK_LIST,
  GET_EDL_MAPPING,
  GET_FUNDING_SOURCE_LIST,
  GET_PROGRAM_DESK_LIST,
  GET_PROGRAM_FUNDING_SOURCE,
  GET_PURCHASE_ORDER_LIST,
  GET_RATE_CONTRACT_DESK_LIST,
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
    const response = yield call(Service.commonFetch, CONSTANTS.ROLE_LISTING, {
      params: pageDetails,
    });
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
      {
        params: pageDetails,
      }
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
      {
        params: pageDetails,
      }
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
      {
        params: pageDetails,
      }
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
    const response = yield call(Service.commonFetch, CONSTANTS.SUPPLIER_LIST, {
      params: pageDetails,
    });
    console.log("Response", response);
    yield put(getSupplierListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getSupplierListResponse(error));
  }
}

function* getRateContractList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.RATE_CONTRACT_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getRateContractDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getRateContractDeskListResponse(error));
  }
}

function* getFundingSourceList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.FUNDING_DESK_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getFundingSourceListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getFundingSourceListResponse(error));
  }
}

function* getBudgetInterfaceList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.BUDGET_INTERFACE_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getBudgetIterfaceListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getBudgetIterfaceListResponse(error));
  }
}

function* getDrugDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.DRUG_DESK_LISTING,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getDrugDeksListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getDrugDeksListResponse(error));
  }
}

function* getEdlMappingList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_EDL_MAPPING_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getEdlMappingListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getEdlMappingListResponse(error));
  }
}

function* getProgrameFundingSourceList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_PROGRAME_FUNDING_MAPPING,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getProgrameFundingSourceListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getProgrameFundingSourceListResponse(error));
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
  yield takeEvery(GET_RATE_CONTRACT_DESK_LIST, getRateContractList);
  yield takeEvery(GET_FUNDING_SOURCE_LIST, getFundingSourceList);
  yield takeEvery(GET_BUDGET_INTERFACE_LIST, getBudgetInterfaceList);
  yield takeEvery(GET_DRUG_DESK_LIST, getDrugDeskList);
  yield takeEvery(GET_EDL_MAPPING, getEdlMappingList);
  yield takeEvery(GET_PROGRAM_FUNDING_SOURCE, getProgrameFundingSourceList);
}
export default AdminSaga;
