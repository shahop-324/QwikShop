import { authActions } from "../reducers/authSlice";
import { snackbarActions } from "../reducers/snackbarSlice";
import { notificationActions } from "../reducers/notificationSlice";

export const showSnackbar =
  (severity, message) => async (dispatch, getState) => {
    dispatch(
      snackbarActions.openSnackBar({
        message,
        severity,
      })
    );

    setTimeout(() => {
      closeSnackbar();
    }, 6000);
  };

  export const closeSnackbar = () => async (dispatch, getState) => {
    dispatch(snackbarActions.closeSnackBar());
  };

  export const showNotification = (message) => async (dispatch, getState) => {
    dispatch(
      notificationActions.setNotification({
        message,
      })
    );
  };

export const register = (formValues) => async(dispatch, getState) => {
// Write logic for registering a user and handle any error case
}   