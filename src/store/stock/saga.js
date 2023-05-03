import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  ADD_STOCK_ENTRY,
  GET_STOCK_DESK_LIST,
  GET_STOCK_ENTRY_DESK,
} from "./actionTypes";
import {
  addStockEntryResponse,
  getStockDeskListResponse,
  getStockEntryDeskResponse,
  getStockUpdateRackListResponse,
  getStockVerificationListResponse,
} from "./action";

function* getStockDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.STOCK_DESK_LISTING,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getStockDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStockDeskListResponse(error));
  }
}

function* addStockEntry({ payload: stockDetails }) {
  console.log("stockDetails", stockDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.ADD_STOCK_ENTRY,
      stockDetails
    );
    console.log("Response", response);
    yield put(addStockEntryResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(addStockEntryResponse(error));
  }
}

function* getStockEntryDesk() {
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_STOCK_ENTRY_DESK,
      null
    );
    console.log("Response", response);
    yield put(getStockEntryDeskResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStockEntryDeskResponse(error));
  }
}
function* getUpdateStockRackList() {
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_STOCK_ENTRY_DESK,
      null
    );
    console.log("Response", response);
    yield put(getStockUpdateRackListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStockUpdateRackListResponse(error));
  }
}
function* getStockVerificationList() {
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_STOCK_ENTRY_DESK,
      null
    );
    console.log("Response", response);
    yield put(getStockVerificationListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStockVerificationListResponse(error));
  }
}
function* StockSaga() {
  yield takeEvery(GET_STOCK_DESK_LIST, getStockDeskList);
  yield takeEvery(ADD_STOCK_ENTRY, addStockEntry);
  yield takeEvery(GET_STOCK_ENTRY_DESK, getStockEntryDesk);
}
export default StockSaga;
