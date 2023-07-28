import { call, put, takeEvery } from "redux-saga/effects";

import {
  getStockLedgerResponse,
  getClasswiseDrugResponse,
  postStockReportResponse,
  postStockReport,
  getStockStatusResponse,
  getStorewiseSubStoreResponse,
  postStatusReportResponse,
} from "./action";

import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";

import {
  GET_STOCK_LEDGER,
  GET_CLASSWISE_DRUG,
  POST_STOCK_REPORT,
  GET_STOCK_STATUS,
  GET_SUBSTORE_BY_STOREID,
  POST_STATUS_REPORT,
} from "./actionType";

function* getStockledger({ payload: inputdata }) {
  console.log("inputdata", inputdata);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_STOCK_LEDGER_REPORTS,
      inputdata
    );
    console.log("Response", response);
    yield put(getStockLedgerResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStockLedgerResponse(error));
  }
}
function* getStockStatusRes({ payload: inputdata }) {
  console.log("inputdata", inputdata);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_STOCK_STATUS_REPORT,
      inputdata
    );
    console.log("Response", response);
    yield put(getStockStatusResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStockStatusResponse(error));
  }
}

function* getClasswiseDrug({ payload: inputdata }) {
  console.log("inputdata", inputdata);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_CLASS_WISE_DRUG,
      {
        params: inputdata,
      }
    );
    console.log("Response", response);
    yield put(getClasswiseDrugResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStockLedgerResponse(error));
  }
}
function* postStockReportRes({ payload: inputdata }) {
  console.log("inputdata", inputdata);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.POST_REPORT_SERVICE,
      inputdata
    );
    console.log("Response", response);
    yield put(postStockReportResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(postStockReportResponse(error));
  }
}
function* postStockStatusRes({ payload: inputdata }) {
  console.log("inputdata", inputdata);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.POST_STOCK_STATUS_REPORT,
      inputdata
    );
    console.log("Response", response);
    yield put(postStatusReportResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(postStatusReportResponse(error));
  }
}

function* getStoreWiseSubstore({ payload: inputdata }) {
  console.log("inputdata", inputdata);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_SUBSTORE_BY_STORE,
      {
        params: inputdata,
      }
    );
    console.log("Response", response);
    yield put(getStorewiseSubStoreResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStorewiseSubStoreResponse(error));
  }
}

function* ReportSaga() {
  yield takeEvery(GET_STOCK_LEDGER, getStockledger);
  yield takeEvery(GET_CLASSWISE_DRUG, getClasswiseDrug);
  yield takeEvery(POST_STOCK_REPORT, postStockReportRes);
  yield takeEvery(GET_STOCK_STATUS, getStockStatusRes);
  yield takeEvery(GET_SUBSTORE_BY_STOREID, getStoreWiseSubstore);
  yield takeEvery(POST_STATUS_REPORT, postStockStatusRes);
}

export default ReportSaga;
