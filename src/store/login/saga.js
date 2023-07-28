import { call, put, takeEvery } from "redux-saga/effects";
import { loginResponse, logoutResponse } from "./actions";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import { LOGIN, LOGOUT } from "./actionTypes";

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

function* logout({ payload: logoutDetails }) {
  console.log("logoutDetails", logoutDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.LOGOUT,
      logoutDetails
    );
    console.log("Response", response);
    yield put(logoutResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(logoutResponse(error));
  }
}

function* LoginSaga() {
  yield takeEvery(LOGIN, login);
  yield takeEvery(LOGOUT, logout);
}
export default LoginSaga;
