import { call, cancelled, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  ADD_DRUG_CONDEMNATION,
  ADD_STOCK_ENTRY,
  ADD_STOCK_VERIFICATION,
  GET_ADD_DRUG_CONDEMNATION_LIST,
  GET_ADD_STOCK_VERIFICATION_LIST,
  GET_DRUG_CONDEMNATION_LSIT,
  GET_STOCK_DESK_LIST,
  GET_STOCK_ENTRY_DESK,
  GET_STOCK_VERIFICATION_LIST,
  GET_UPDATE_STOCK_RACK_LIST,
} from "./actionTypes";
import {
  addDrugCondemnationResponse,
  addStockEntryResponse,
  addStockVerificationResponse,
  getAddDrugCondemnationListResponse,
  getAddStockVerificationListResponse,
  getDrugCondemnationListResponse,
  getStockDeskListResponse,
  getStockEntryDeskResponse,
  getStockUpdateRackListResponse,
  getStockVerificationListResponse,
} from "./action";

function* getStockDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  const abortController = new AbortController();
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.STOCK_DESK_LISTING,
      {
        signal: abortController.signal,
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getStockDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStockDeskListResponse(error));
  } finally {
    if (yield cancelled()) {
      abortController.abort();
    }
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
      CONSTANTS.GET_STORE_RACK_LIST,
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
      CONSTANTS.GET_STOCK_VERIFICATION,
      null
    );
    console.log("Response", response);
    yield put(getStockVerificationListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStockVerificationListResponse(error));
  }
}

function* getAddStockVerificationList() {
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_ADD_STOCK_VERIFICATION_LIST,
      null
    );
    console.log("Response", response);
    yield put(getAddStockVerificationListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getAddStockVerificationListResponse(error));
  }
}

function* addStockVerification({ payload: addDetails }) {
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.ADD_STOCK_VERIFICATION,
      addDetails
    );
    console.log("Response", response);
    yield put(addStockVerificationResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(addStockVerificationResponse(error));
  }
}

function* getDrugCondemnationList({ payload: pageDetails }) {
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_DRUG_CONDEMNATION_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getDrugCondemnationListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getDrugCondemnationListResponse(error));
  }
}

function* getAddDrugCondemnationList({ payload: pageDetails }) {
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_ADD_DRUG_CONDEMNATION_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getAddDrugCondemnationListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getAddDrugCondemnationListResponse(error));
  }
}

function* addDrugCondemnation({ payload: addDetails }) {
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.GET_DRUG_CONDEMNATION_LIST,
      addDetails
    );
    console.log("Response", response);
    yield put(addDrugCondemnationResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(addDrugCondemnationResponse(error));
  }
}

function* StockSaga() {
  yield takeEvery(GET_STOCK_DESK_LIST, getStockDeskList);
  yield takeEvery(ADD_STOCK_ENTRY, addStockEntry);
  yield takeEvery(GET_STOCK_ENTRY_DESK, getStockEntryDesk);
  yield takeEvery(GET_STOCK_VERIFICATION_LIST, getStockVerificationList);
  yield takeEvery(GET_ADD_STOCK_VERIFICATION_LIST, getAddStockVerificationList);
  yield takeEvery(ADD_STOCK_VERIFICATION, addStockVerification);
  yield takeEvery(GET_DRUG_CONDEMNATION_LSIT, getDrugCondemnationList);
  yield takeEvery(GET_ADD_DRUG_CONDEMNATION_LIST, getAddDrugCondemnationList);
  yield takeEvery(ADD_DRUG_CONDEMNATION, addDrugCondemnation);
  yield takeEvery(GET_UPDATE_STOCK_RACK_LIST, getUpdateStockRackList);
}
export default StockSaga;
