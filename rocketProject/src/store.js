import { configureStore } from "@reduxjs/toolkit";
import CouterReducer from "./component/features/couter/couterReducer";

export default configureStore({
    reducer:{
        counter: CouterReducer
    }
})