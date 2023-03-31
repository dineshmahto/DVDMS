import { combineReducers } from "redux";
import loginReducer from "./login_reducer";
import loaderReducer from "../../store/loader/reducer";

export default combineReducers({ login: loginReducer, loader: loaderReducer });
