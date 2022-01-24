import { combineReducers } from "redux";
import authSlice from "./authSlice";
import snackbarSlice from "./snackbarSlice";
import notificationSlice from "./notificationSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import storeSlice from "./storeSlice";
import orderSlice from "./orderSlice";
import appSlice from "./appSlice";

export default combineReducers({
    auth: authSlice.reducer,
    snackbar: snackbarSlice.reducer,
    notification: notificationSlice.reducer,
    product: productSlice.reducer,
    user: userSlice.reducer,
    store: storeSlice.reducer,
    order: orderSlice.reducer,
    app: appSlice.reducer,
});