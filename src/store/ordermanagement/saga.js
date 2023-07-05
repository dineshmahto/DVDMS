import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  GET_MANUFACTURING_DESK_LIST,
  GET_APPROVAL_DESK_LIST,
  GET_APPROVAL_INTENT_APPROVAL_LIST,
  GET_PURCHASE_ORDER_LIST_FOR_APPROVAL,
  GET_TRANSFER_APPROVAL_LIST,
  GET_TRANSFER_APPROVAL_LIST_HQ,
  GET_CENTRAL_PURCHASE_LIST,
  CREATE_MANUFACTURING,
  CREATE_MANUFACTURING_RESPONSE,
  EDIT_MANUFACTURING,
  EDIT_MANUFACTURING_RESPONSE,
} from "./actionTypes";
import {
  getManufactureDeskListResponse,
  getApprovalDeskListResponse,
  getIntentforApprovalListResponse,
  getPurchaseOrderListResponse,
  getTransferListForApprovalHqResponse,
  getTransferListForApprovalResponse,
  getCentralpurchaseListResponse,
  createManufacturing,
  createManufacturingResponse,
  updateManufacturingResponse,
} from "./action";

function* getManufacturingDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_MANUFACTURING_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getManufactureDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getManufactureDeskListResponse(error));
  }
}

function* getApporvalDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.APPROVAL_DESK_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getApprovalDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getApprovalDeskListResponse(error));
  }
}

function* getPurchaseOrderListForApproval({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.APPROVAL_PURCHASE_ORDER_LIST,
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

function* getAllIndentForApprovalList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.APPROVAL_INTENT_APPROVAL_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getIntentforApprovalListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getIntentforApprovalListResponse(error));
  }
}

function* getTransferListForApproval({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.TRANSFER_APPROVAL_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getTransferListForApprovalResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getTransferListForApprovalResponse(error));
  }
}

function* getTransferListHqForApproval({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.TRANSFER_APPROVAL_LIST_HQ,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getTransferListForApprovalHqResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getTransferListForApprovalHqResponse(error));
  }
}

function* getCentralPurchaseList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_CENTRAL_PURCHASE,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getCentralpurchaseListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getCentralpurchaseListResponse(error));
  }
}

function* createManufacture({ payload: manufacturingDetails }) {
  console.log("programDetails", manufacturingDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_DRUG_MANUFACTURE,
      manufacturingDetails
    );
    console.log("Response", response);
    yield put(createManufacturingResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createManufacturingResponse(error));
  }
}
function* updateManufacture({ payload: manufactureDetails }) {
  console.log("programDetails", manufactureDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.UPDATE_DRUG_MANUFACTURE,
      manufactureDetails
    );
    console.log("Response", response);
    yield put(updateManufacturingResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(updateManufacturingResponse(error));
  }
}
function* AdminSaga() {
  yield takeEvery(GET_MANUFACTURING_DESK_LIST, getManufacturingDeskList);
  yield takeEvery(GET_APPROVAL_DESK_LIST, getApporvalDeskList);
  yield takeEvery(
    GET_PURCHASE_ORDER_LIST_FOR_APPROVAL,
    getPurchaseOrderListForApproval
  );
  yield takeEvery(
    GET_APPROVAL_INTENT_APPROVAL_LIST,
    getAllIndentForApprovalList
  );
  yield takeEvery(GET_TRANSFER_APPROVAL_LIST, getTransferListForApproval);
  yield takeEvery(GET_TRANSFER_APPROVAL_LIST_HQ, getTransferListHqForApproval);
  yield takeEvery(GET_CENTRAL_PURCHASE_LIST, getCentralPurchaseList);
  yield takeEvery(CREATE_MANUFACTURING, createManufacture);
  yield takeEvery(EDIT_MANUFACTURING, updateManufacture);
}
export default AdminSaga;
