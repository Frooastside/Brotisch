import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "./interfaceSlice";
import socialReducer from "./socialSlice";

export default configureStore({
  reducer: {
    interface: interfaceReducer,
    social: socialReducer
  }
});
