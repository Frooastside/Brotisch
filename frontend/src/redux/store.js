import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "./interfaceSlice";
import socialReducer from "./socialSlice";
import dictionaryReducer from "./dictionarySlice";

export default configureStore({
  reducer: {
    interface: interfaceReducer,
    social: socialReducer,
    dictionary: dictionaryReducer
  }
});
