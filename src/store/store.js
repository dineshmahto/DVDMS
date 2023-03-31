import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "../store/loader/reducer"
import loginReducer from "../store/login/reducer"
const store = configureStore({
    reducer:{
        loader: loaderReducer,
        login: loginReducer
    }

});

export default store;
