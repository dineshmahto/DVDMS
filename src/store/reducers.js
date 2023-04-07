import { combineReducers } from "redux";
import loaderReducer from "../store/loader/reducer";
import activemenuReducer from "../store/activemenu/reducer"
export default combineReducers({ loader: loaderReducer, activemenu: activemenuReducer });
