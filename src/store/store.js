import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "../store/loader/reducer"
import loginReducer from "../store/login/reducer"
import activemenuReducer from "../store/activemenu/reducer";
const store = configureStore({
    reducer:{
        loader: loaderReducer,
        login: loginReducer,
        activemenu: activemenuReducer
    }

});

export default store;
