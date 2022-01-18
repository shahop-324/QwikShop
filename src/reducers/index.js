import { combineReducers } from "redux";
import authSlice from "./authSlice";
import snackbarSlice from "./snackbarSlice";
import notificationSlice from "./notificationSlice";
import productSlice from "./productSlice";

export default combineReducers({
    auth: authSlice.reducer,
    snackbar: snackbarSlice.reducer,
    notification: notificationSlice.reducer,
    product: productSlice.reducer,
});