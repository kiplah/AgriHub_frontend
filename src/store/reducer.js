import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/Auth/authSlice";
import productSlice from "@/reducers/product/productSlice";
import categorySlice from "@/reducers/Category/categorySlice";
import orderSlice from "@/reducers/Order/orderSlice.js";
import { reviewsReducer } from "@/reducers/Review/reviewSlice.js";
import chatReducer from "@/reducers/Chat/chatSlice";
import ContactReducter from "@/reducers/Contact/contactSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  product: productSlice,
  category: categorySlice,
  orders: orderSlice,
  reviews: reviewsReducer,
  chat: chatReducer,
  contact: ContactReducter,
});


export default rootReducer;

