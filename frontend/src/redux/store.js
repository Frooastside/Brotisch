import { configureStore } from '@reduxjs/toolkit';
import interfaceReducer from './interfaceSlice';

export default configureStore({
  reducer: {
    interface: interfaceReducer
  },
});