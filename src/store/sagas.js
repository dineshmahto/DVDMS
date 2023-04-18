import { all, fork } from "redux-saga/effects";
import AdminSaga from "./admin/saga";
export default function* rootSaga() {
  yield all([AdminSaga()]);
}
