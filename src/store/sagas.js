import { all, fork } from "redux-saga/effects";
import AdminSaga from "./admin/saga";
import LoginSaga from "./login/saga";
export default function* rootSaga() {
  yield all([AdminSaga(), LoginSaga()]);
}
