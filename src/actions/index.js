/* eslint-disable prefer-destructuring */
import { authActions } from '../reducers/authSlice';
import { snackbarActions } from '../reducers/snackbarSlice';
import { notificationActions } from '../reducers/notificationSlice';
import history from '../history';
import { userActions } from '../reducers/userSlice';
import { storeActions } from '../reducers/storeSlice';
import { orderActions } from '../reducers/orderSlice';
import { appActions } from '../reducers/appSlice';

const { REACT_APP_MY_ENV } = process.env;
const BaseURL = REACT_APP_MY_ENV ? 'http://localhost:8000/v1/' : 'https://api.letstream.live/api-eureka/eureka/v1/';

export const showSnackbar = (severity, message) => async (dispatch, getState) => {
  dispatch(
    snackbarActions.openSnackBar({
      message,
      severity,
    })
  );

  setTimeout(() => {
    dispatch(snackbarActions.closeSnackBar());
  }, 6000);
};

export const showNotification = (message) => async (dispatch, getState) => {
  dispatch(
    notificationActions.setNotification({
      message,
    })
  );
};

export const register = (formValues, email, location) => async (dispatch, getState) => {
  // Write logic for registering a user and handle any error case

  let message;

  dispatch(
    authActions.SetIsSubmittingRegister({
      isSubmitting: true,
    })
  );

  try {
    const res = await fetch(
      `${BaseURL}auth/register`,

      {
        method: 'POST',

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error('Failed to register user. Please try again.');
      } else {
        throw new Error(res.message);
      }
    }

    window.location.href = `/auth/verify/?email=${email}&ref=${location}`;
    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsSubmittingRegister({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));

    dispatch(
      authActions.SetIsSubmittingRegister({
        isSubmitting: false,
      })
    );
  }
};

export const verifyEmail = (email, otp) => async (dispatch, getState) => {
  dispatch(
    authActions.SetIsSubmittingVerify({
      isSubmitting: true,
    })
  );

  let message;

  try {
    const res = await fetch(`${BaseURL}auth/verify-email`, {
      method: 'POST',

      body: JSON.stringify({
        email,
        otp,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error('Failed to register user. Please try again.');
      } else {
        throw new Error(res.message);
      }
    }

    dispatch(showSnackbar('success', message));

    // Store token in auth state => redux store

    // Store user and shop data also

    console.log(result);

    dispatch(
      authActions.SignIn({
        token: result.token,
      })
    );

    dispatch(
      userActions.FetchUser({
        user: result.user,
      })
    );

    dispatch(
      storeActions.FetchStore({
        store: result.store,
      })
    );

    dispatch(showSnackbar('success', message));

    // Send user to dashboard
    // window.location.href = `/dashboard/home`;

    dispatch(
      authActions.SetIsSubmittingVerify({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(showSnackbar('error', message));

    dispatch(
      authActions.SetIsSubmittingVerify({
        isSubmitting: false,
      })
    );
  }
};

export const login = (email, password) => async (dispatch, getState) => {
  dispatch(
    authActions.SetIsSubmittingLogin({
      isSubmitting: true,
    })
  );

  let message;

  try {
    let res = await fetch(`${BaseURL}auth/login`, {
      method: 'POST',

      body: JSON.stringify({
        email,
        password,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error('Failed to login. Please try again.');
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    message = res.message;

    // Store token in auth state => redux store

    dispatch(
      authActions.SignIn({
        token: res.token,
      })
    );

    // Send user to dashboard

    // window.location.href = `/dashboard/home`;

    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsSubmittingLogin({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(showSnackbar('error', message));

    dispatch(
      authActions.SetIsSubmittingLogin({
        isSubmitting: false,
      })
    );
  }
};

export const logout = () => async (dispatch, getState) => {
  dispatch(authActions.SignOut());
  // dispatch(showSnackbar('success', 'Logged out successfully!'));
  window.location.href = `/auth/login`;
};

export const resendEmailOTP = (email) => async (dispatch, getState) => {
  let message;

  try {
    let res = await fetch(`${BaseURL}auth/resend-email-otp`, {
      method: 'POST',

      body: JSON.stringify({
        email,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error('Failed to login. Please try again.');
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    message = res.message;

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);

    dispatch(showSnackbar('error', message));
  }
};

export const stopLoginBtnLoader = () => async (dispatch, getState) => {
  dispatch(
    authActions.SetIsSubmittingLogin({
      isSubmitting: false,
    })
  );
};

export const setupStore = (formValues, onNext, handleClose) => async (dispatch, getState) => {
  let message;

  dispatch(
    storeActions.SetIsSubmittingSteup({
      isSubmitting: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}store/setup`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error('Failed to setup store, Please try again!');
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    setTimeout(() => {
      dispatch(
        storeActions.UpdateStore({
          store: result.data,
        })
      );
    }, 6000);

    dispatch(showSnackbar('success', message));

    onNext();

    setTimeout(() => {
      handleClose();
    }, 6000);

    dispatch(
      storeActions.SetIsSubmittingSteup({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      storeActions.SetIsSubmittingSteup({
        isSubmitting: false,
      })
    );
    dispatch(showSnackbar('error', message));
  }
};

export const fetchUserDetails = () => async (dispatch, getState) => {
  let message;

  try {
    // Fetch current user details

    const res = await fetch(`${BaseURL}user/getDetails`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      userActions.FetchUser({
        user: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const fetchStoreDetails = () => async (dispatch, getState) => {
  let message;

  try {
    // Fetch current store details

    const res = await fetch(`${BaseURL}store/getDetails`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const fetchRecentOrder = () => async (dispatch, getState) => {
  let message;

  try {
    // fetch recent orders

    const res = await fetch(`${BaseURL}order/recent`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      orderActions.FetchRecentOrders({
        recentOrders: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const fetchSubnames = () => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}general/getSubnames`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      appActions.FetchSubnames({
        subname: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};
