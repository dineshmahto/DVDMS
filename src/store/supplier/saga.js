import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  APPROVE_PO_INFO,
  DISPATCH_PO,
  GET_PO_APPROVED_LIST,
  GET_PO_INFO_BY_ID,
  REJECT_PO_INFO,
} from "./actionTypes";
import {
  approvePoInfoResponse,
  dispatchPoInfoResponse,
  getPoApprovedListResponse,
  getPoInfoByIdResponse,
  rejectPoInfoResponse,
} from "./action";

function* getPoApprovedList({ payload: pageDetails }) {
  console.log("dinesh", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_PO_APPROVED_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getPoApprovedListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getPoApprovedListResponse(error));
  }
}

function* getPoInfoById({ payload: id }) {
  console.log("id", id);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_PO_INFO_BY_ID,
      {
        params: id,
      }
    );
    console.log("Response", response);
    yield put(getPoInfoByIdResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getPoInfoByIdResponse(error));
  }
}

function* rejectPoInfo({ payload: poDetails }) {
  console.log("poDetails", poDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.REJECT_PO_INFO,
      poDetails
    );
    console.log("Response", response);
    yield put(rejectPoInfoResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(rejectPoInfoResponse(error));
  }
}

function* approvePoInfo({ payload: poDetails }) {
  console.log("poDetails", poDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.APPROVE_PO_INFO,
      poDetails
    );
    console.log("Response", response);
    yield put(approvePoInfoResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(approvePoInfoResponse(error));
  }
}

function* dispatchPo({ payload: poDetails }) {
  console.log("poDetails", poDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.DISPATCH_PO_ITEM,
      poDetails
    );
    console.log("Response", response);
    yield put(dispatchPoInfoResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(dispatchPoInfoResponse(error));
  }
}

function* ReceivingSaga() {
  // GET
  yield takeEvery(GET_PO_APPROVED_LIST, getPoApprovedList);
  yield takeEvery(GET_PO_INFO_BY_ID, getPoInfoById);
  // post
  yield takeEvery(REJECT_PO_INFO, rejectPoInfo);
  yield takeEvery(APPROVE_PO_INFO, approvePoInfo);
  yield takeEvery(DISPATCH_PO, dispatchPo);
}
export default ReceivingSaga;
