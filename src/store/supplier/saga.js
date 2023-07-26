import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import { GET_PO_APPROVED_LIST } from "./actionTypes";
import { getPoApprovedListResponse } from "./action";

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

function* ReceivingSaga() {
  yield takeEvery(GET_PO_APPROVED_LIST, getPoApprovedList);
}
export default ReceivingSaga;
