import { combineReducers } from "@reduxjs/toolkit";
import loaderReducer from "../store/loader/reducer";
import activemenuReducer from "../store/activemenu/reducer";
import adminReducer from "../store/admin/reducer";
import loginReducer from "../store/login/reducer";
import stockReducer from "../store/stock/reducer";
import demandReducer from "../store/demand/reducer";
import orderManagementReducer from "../store/ordermanagement/reducer";
import issueReturnReducer from "../store/issue/reducer";
import requisitionReducer from "../store/requisition/reducer";
import darkModeReducer from "./darkmode/reducer";
import receivingReducer from "../store/receiving/reducer";
import reportReducer from "../store/report/reducer";
import supplierReducer from "../store/supplier/reducer";
export default combineReducers({
  loader: loaderReducer,
  activemenu: activemenuReducer,
  admin: adminReducer,
  login: loginReducer,
  stock: stockReducer,
  demand: demandReducer,
  ordermanaagement: orderManagementReducer,
  issuereturn: issueReturnReducer,
  requisition: requisitionReducer,
  darkMode: darkModeReducer,
  receiving: receivingReducer,
  report: reportReducer,
  supplier: supplierReducer,
});
