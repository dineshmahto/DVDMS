import { combineReducers } from "redux";
import loaderReducer from "../store/loader/reducer";
export default combineReducers({ loader: loaderReducer });
