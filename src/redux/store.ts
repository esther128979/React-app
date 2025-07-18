import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import userReducer from "./userSlice";;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    // נוסיף אחר כך גם user
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
