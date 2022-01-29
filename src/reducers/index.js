import { combineReducers } from "redux";
import authSlice from "./authSlice";
import snackbarSlice from "./snackbarSlice";
import notificationSlice from "./notificationSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import storeSlice from "./storeSlice";
import orderSlice from "./orderSlice";
import appSlice from "./appSlice";
import categorySlice from "./categorySlice";
import subCategorySlice from "./subCategorySlice";
import deliverySlice from "./deliverySlice";
import shipmentSlice from "./shipmentSlice";
import transactionSlice from "./transactionSlice";
import discountSlice from "./discountSlice";

export default combineReducers({
    auth: authSlice.reducer,
    snackbar: snackbarSlice.reducer,
    notification: notificationSlice.reducer,
    product: productSlice.reducer,
    user: userSlice.reducer,
    store: storeSlice.reducer,
    order: orderSlice.reducer,
    app: appSlice.reducer,
    category: categorySlice.reducer,
    subCategory: subCategorySlice.reducer,
    delivery: deliverySlice.reducer,
    shipment: shipmentSlice.reducer,
    transaction: transactionSlice.reducer,
    discount: discountSlice.reducer,
});