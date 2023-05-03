import { all, fork } from "redux-saga/effects";
import AdminSaga from "./admin/saga";
import LoginSaga from "./login/saga";
import StockSaga from "./stock/saga";
import DemandSaga from "./demand/saga";
import OrderManagementSaga from "./ordermanagement/saga";
import IssueReturnSaga from "./issue/saga";
export default function* rootSaga() {
  yield all([
    AdminSaga(),
    LoginSaga(),
    StockSaga(),
    DemandSaga(),
    OrderManagementSaga(),
    IssueReturnSaga(),
  ]);
}
