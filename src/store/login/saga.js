import { call, put, takeEvery } from "redux-saga/effects";
import { loginResponse } from "./actions";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import { LOGIN } from "./actionTypes";

function* login({ payload: loginDetails }) {
  console.log("loginDetails", loginDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.LOGIN,
      loginDetails
    );
    console.log("Response", response);
    yield put(loginResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(loginResponse(error));
  }
}

function* RoleDeskSaga() {
  yield takeEvery(LOGIN, login);
}
export default RoleDeskSaga;
