import { combineReducers } from "@reduxjs/toolkit";
import loaderReducer from "../store/loader/reducer";
import activemenuReducer from "../store/activemenu/reducer";
import adminReducer from "../store/admin/reducer";
export default combineReducers({
  loader: loaderReducer,
  activemenu: activemenuReducer,
  admin: adminReducer,
});
