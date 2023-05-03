import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  GET_APPROVAL_DESK_LIST,
  GET_APPROVAL_INTENT_APPROVAL_LIST,
  GET_PURCHASE_ORDER_LIST_FOR_APPROVAL,
  GET_TRANSFER_APPROVAL_LIST,
  GET_TRANSFER_APPROVAL_LIST_HQ,
} from "./actionTypes";
import {
  getApprovalDeskListResponse,
  getIntentforApprovalListResponse,
  getPurchaseOrderListResponse,
  getTransferListForApprovalHqResponse,
  getTransferListForApprovalResponse,
} from "./action";

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
function* AdminSaga() {
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
}
export default AdminSaga;
