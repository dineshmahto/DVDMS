import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import { getIntentDrugListResponse, getTransferListResponse } from "./action";
import { GET_INTENT_DRUGS_LIST, GET_TRANSFER_LIST } from "./actionTypes";

function* getIntentDrugsList({ payload: pageDetails }) {
  console.log("dinesh", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_INTENT_DRUG,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getIntentDrugListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getIntentDrugListResponse(error));
  }
}

function* getTransferList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_TRANSFER_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getTransferListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getTransferListResponse(error));
  }
}
function* RequisitionSaga() {
  yield takeEvery(GET_INTENT_DRUGS_LIST, getIntentDrugsList);
  yield takeEvery(GET_TRANSFER_LIST, getTransferList);
}
export default RequisitionSaga;
