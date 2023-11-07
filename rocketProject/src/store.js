import { configureStore } from "@reduxjs/toolkit";
import CouterReducer from "./component/features/couter/couterReducer";
import RecalApiLoading from "./component/features/apiSave/recalApiLoading"


export default configureStore({
    reducer: {
        apiSave: RecalApiLoading,
        counter: CouterReducer,
      },
})