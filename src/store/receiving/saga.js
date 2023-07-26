import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  getAllChallanListResponse,
  getReceivedDrugListResponse,
  getReceivedPoChallanListResponse,
} from "./action";
import {
  GET_ALL_CHALLAN_LIST,
  GET_RECEIVED_DRUG_LIST,
  GET_RECEIVED_PO_CHALLAN_LIST,
} from "./actionTypes";

function* getReceivedDrugList({ payload: pageDetails }) {
  console.log("dinesh", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_RECEIVED_DRUG_LISTS,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getReceivedDrugListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getReceivedDrugListResponse(error));
  }
}

function* getReceivedPoChallandList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_RECEIVED_DRUG_LISTS,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getReceivedPoChallanListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getReceivedPoChallanListResponse(error));
  }
}

function* getAllChallanList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_RECEIVED_DRUG_LISTS,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getAllChallanListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getAllChallanListResponse(error));
  }
}

function* ReceivingSaga() {
  yield takeEvery(GET_RECEIVED_DRUG_LIST, getReceivedDrugList);
  yield takeEvery(GET_RECEIVED_PO_CHALLAN_LIST, getReceivedPoChallandList);
  yield takeEvery(GET_ALL_CHALLAN_LIST, getAllChallanList);
}
export default ReceivingSaga;
