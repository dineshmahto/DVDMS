import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import { getReceivedDrugListResponse } from "./action";
import { GET_RECEIVED_DRUG_LIST } from "./actionTypes";

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

function* ReceivingSaga() {
  yield takeEvery(GET_RECEIVED_DRUG_LIST, getReceivedDrugList);
}
export default ReceivingSaga;
