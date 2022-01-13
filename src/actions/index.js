import { authActions } from '../reducers/authSlice';
import { snackbarActions } from '../reducers/snackbarSlice';
import { notificationActions } from '../reducers/notificationSlice';
import history from '../history';

const { REACT_APP_MY_ENV } = process.env;
const BaseURL = REACT_APP_MY_ENV ? 'http://localhost:5000/v1/' : 'https://api.letstream.live/api-eureka/eureka/v1/';

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

  dispatch(
    authActions.SetIsSubmittingRegister({
      isSubmitting: true,
    })
  );

  try {
    let res = await fetch(
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

    if (!res.ok) {
      if (!res.message) {
        throw new Error('Failed to register user. Please try again.');
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    if (res.alreadyUsedPhone) {
      dispatch(showSnackbar('error', 'This phone number is already registered. Use another number.'));
    } else {
      window.location.href = `/auth/verify/?email=${email}&ref=${location}`;
    }

    dispatch(
      authActions.SetIsSubmittingRegister({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', 'Failed to register user. Please try again.'));

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
  try {
    let res = await fetch(`${BaseURL}auth/verify-email`, {
      method: 'POST',

      body: JSON.stringify({
        email,
        otp,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      if (!res.message) {
        throw new Error('Failed to register user. Please try again.');
      } else {
        throw new Error(res.message);
      }
    }

    res = await res.json();

    dispatch(showSnackbar('success', res.message));

    // Store token in auth state => redux store

    dispatch(
      authActions.SignIn({
        token: res.token,
      })
    );

    // Send user to dashboard

    window.location.href = `/dashboard/home`;

    dispatch(
      authActions.SetIsSubmittingVerify({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(showSnackbar('error', 'Failed to verify email. Please try again.'));

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

    // Store token in auth state => redux store

    dispatch(
      authActions.SignIn({
        token: res.token,
      })
    );

    // Send user to dashboard

    window.location.href = `/dashboard/home`;

    dispatch(
      authActions.SetIsSubmittingLogin({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(showSnackbar('error', 'Failed to login. Please try again.'));

    dispatch(
      authActions.SetIsSubmittingLogin({
        isSubmitting: false,
      })
    );
  }
};

export const logout = () => async(dispatch, getState) => {
  dispatch(authActions.SignOut());
  window.location.href = `/auth/login`;
}

export const resendEmailOTP = (email) => async (dispatch, getState) => {
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

    dispatch(showSnackbar('success', 'OTP sent to email successfully!'));
  } catch (error) {
    console.log(error);

    dispatch(showSnackbar('error', 'Failed to send OTP. Please try again.'));
  }
};

export const stopLoginBtnLoader = () => async(dispatch, getState) => {
  dispatch(
    authActions.SetIsSubmittingLogin({
      isSubmitting: false,
    })
  );
}