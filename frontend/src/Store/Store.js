import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Featues/UserSlice'
export const store = configureStore({
     reducer:userReducer
})