/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { authActions } from '../reducers/authSlice';
import { snackbarActions } from '../reducers/snackbarSlice';
import { notificationActions } from '../reducers/notificationSlice';
import { userActions } from '../reducers/userSlice';
import { storeActions } from '../reducers/storeSlice';
import { orderActions } from '../reducers/orderSlice';
import { appActions } from '../reducers/appSlice';
import { categoryActions } from '../reducers/categorySlice';
import { productActions } from '../reducers/productSlice';
import { subCategoryActions } from '../reducers/subCategorySlice';
import { deliveryActions } from '../reducers/deliverySlice';
import { shipmentActions } from '../reducers/shipmentSlice';
import { transactionActions } from '../reducers/transactionSlice';
import { discountActions } from '../reducers/discountSlice';

const { REACT_APP_MY_ENV } = process.env;
const BaseURL = REACT_APP_MY_ENV ? 'http://localhost:8000/v1/' : 'https://api.letstream.live/api-eureka/eureka/v1/';

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'ap-south-1',
  accessKeyId: 'AKIA3EQQNGREDXST6CHF',
  secretAccessKey: '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',
});

export const showSnackbar = (severity, message) => async (dispatch, _getState) => {
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

export const showNotification = (message) => async (dispatch, _getState) => {
  dispatch(
    notificationActions.setNotification({
      message,
    })
  );
};

export const register = (formValues, email, location) => async (dispatch, _getState) => {
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

export const verifyEmail = (email, otp) => async (dispatch, _getState) => {
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

export const login = (email, password) => async (dispatch, _getState) => {
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

export const logout = () => async (dispatch, _getState) => {
  dispatch(authActions.SignOut());
  // dispatch(showSnackbar('success', 'Logged out successfully!'));
  window.location.href = `/auth/login`;
};

export const resendEmailOTP = (email) => async (dispatch, _getState) => {
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

export const stopLoginBtnLoader = () => async (dispatch, _getState) => {
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

// ********************************************* Categories ********************************************* //

export const fetchCategory = (term) => async (dispatch, getState) => {
  let message;

  try {
    const fullLocation = `${BaseURL}category/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
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
      categoryActions.FetchCategories({
        categories: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const createCategory = (file, name, handleClose) => async (dispatch, getState) => {
  let message;

  const key = `category/${getState().store.store._id}/${uuidv4()}.${file.type}`;

  dispatch(categoryActions.SetIsCreating({ state: true }));

  try {
    // Upload image then send data to backend

    s3.getSignedUrl(
      'putObject',
      { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
      async (_err, presignedURL) => {
        await fetch(presignedURL, {
          method: 'PUT',

          body: file,

          headers: {
            'Content-Type': file.type,
          },
        });

        // Send category name and image with auth token to backend

        const res = await fetch(`${BaseURL}category/create`, {
          method: 'POST',

          body: JSON.stringify({
            image: key,
            name,
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
            throw new Error(message);
          } else {
            throw new Error(res.message);
          }
        }

        console.log(result);

        dispatch(
          categoryActions.CreateCategory({
            category: result.data,
          })
        );

        dispatch(showSnackbar('success', message));

        handleClose();

        dispatch(categoryActions.SetIsCreating({ state: false }));
      }
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(categoryActions.SetIsCreating({ state: false }));
  }
};

export const updateCategory = (file, name, id, handleClose) => async (dispatch, getState) => {
  let message;

  const key = `category/${getState().store.store._id}/${uuidv4()}.${file.type}`;

  dispatch(categoryActions.SetIsUpdating({ state: true }));

  try {
    if (file) {
      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: file,

            headers: {
              'Content-Type': file.type,
            },
          });

          // Send category name and image with auth token to backend

          const res = await fetch(`${BaseURL}category/update/${id}`, {
            method: 'PATCH',

            body: JSON.stringify({
              image: key,
              name,
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
              throw new Error(message);
            } else {
              throw new Error(res.message);
            }
          }

          console.log(result);

          dispatch(
            categoryActions.UpdateCategory({
              category: result.data,
            })
          );

          dispatch(showSnackbar('success', message));

          handleClose();

          dispatch(categoryActions.SetIsUpdating({ state: false }));
        }
      );
    } else {
      const res = await fetch(`${BaseURL}category/update/${id}`, {
        method: 'PATCH',

        body: JSON.stringify({
          name,
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
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        categoryActions.UpdateCategory({
          category: result.data,
        })
      );

      dispatch(showSnackbar('success', message));

      handleClose();

      dispatch(categoryActions.SetIsUpdating({ state: false }));
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(categoryActions.SetIsUpdating({ state: false }));
  }
};

export const deleteCategory = (categoryId, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(categoryActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}category/delete/${categoryId}`, {
      method: 'DELETE',

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
      categoryActions.DeleteCategory({
        categoryId,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
    dispatch(categoryActions.SetIsDeleting({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(categoryActions.SetIsDeleting({ state: false }));
  }
};

export const deleteMultipleCategories = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}category/deleteMultiple`, {
      method: 'DELETE',

      body: JSON.stringify({
        categoryIds: ids,
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      categoryActions.DeleteMultipleCategory({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateCategoryStock = (id, formValues, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}category/update/${id}`, {
      method: 'PATCH',

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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      categoryActions.UpdateCategory({
        category: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const reorderCategories = (items) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}category/reorder/`, {
      method: 'POST',

      body: JSON.stringify({
        categories: items,
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      categoryActions.FetchCategories({
        categories: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ********************************************* Product ********************************************* //

export const createNewProduct = (formValues, images, videos, handleClose) => async (dispatch, getState) => {
  const imageKeys = [];
  const videoKeys = [];

  dispatch(productActions.SetIsCreating({ state: true }));

  let message;

  try {
    // Upload images

    for (const _element of images) {
      const key = `product/image/${getState().store.store._id}/${uuidv4()}.${_element.type}`;
      imageKeys.push(key);

      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${_element.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: _element,

            headers: {
              'Content-Type': _element.type,
            },
          });
        }
      );
    }

    for (const _element of videos) {
      const key = `product/video/${getState().store.store._id}/${uuidv4()}.${_element.type}`;
      videoKeys.push(key);
      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${_element.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: _element,

            headers: {
              'Content-Type': _element.type,
            },
          });
        }
      );
    }

    // Upload videos
    // Send data back to api

    const res = await fetch(`${BaseURL}product/create/`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
        images: imageKeys,
        videos: videoKeys,
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.CreateProduct({
        product: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(productActions.SetIsCreating({ state: false }));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(productActions.SetIsCreating({ state: false }));
  }
};

export const updateProduct = (
  productId,
  formValues,
  images,
  videos,
  excludedImages,
  excludedVideos,
  handleClose
) => async (dispatch, getState) => {
  let message;
  const imageKeys = [];
  const videoKeys = [];
  dispatch(productActions.SetIsUpdating({ state: true }));
  try {
    const newImages = images || [];
    for (const _element of newImages) {
      const key = `product/image/${getState().store.store._id}/${uuidv4()}.${_element.type}`;
      imageKeys.push(key);

      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${_element.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: _element,

            headers: {
              'Content-Type': _element.type,
            },
          });
        }
      );
    }

    const newVideos = videos || [];
    for (const _element of newVideos) {
      const key = `product/video/${getState().store.store._id}/${uuidv4()}.${_element.type}`;
      videoKeys.push(key);
      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${_element.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: _element,

            headers: {
              'Content-Type': _element.type,
            },
          });
        }
      );
    }

    // Upload videos
    // Send data back to api

    const res = await fetch(`${BaseURL}product/update/${productId}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
        imageKeys: imageKeys || [],
        videoKeys: videoKeys || [],
        excludedImages: excludedImages || [],
        excludedVideos: excludedVideos || [],
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.UpdateProduct({
        product: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(productActions.SetIsUpdating({ state: false }));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(productActions.SetIsUpdating({ state: false }));
  }
};

export const fetchProducts = (term) => async (dispatch, getState) => {
  let message;
  try {
    //
    const fullLocation = `${BaseURL}product/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
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
      productActions.FetchProducts({
        products: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateProductStock = (id, formValues, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}product/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
        imageKeys: [],
        videoKeys: [],
        excludedImages: [],
        excludedVideos: [],
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.UpdateProduct({
        product: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const reorderProducts = (items) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}product/reorder/`, {
      method: 'POST',

      body: JSON.stringify({
        products: items,
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.FetchProducts({
        products: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const deleteProduct = (productId, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(productActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}product/delete/${productId}`, {
      method: 'DELETE',

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
      productActions.DeleteProduct({
        productId,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
    dispatch(productActions.SetIsDeleting({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(productActions.SetIsDeleting({ state: false }));
    dispatch(showSnackbar('error', message));
  }
};

export const deleteMultipleProducts = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(productActions.SetIsDeleting({ state: true }));
  try {
    const res = await fetch(`${BaseURL}product/deleteMultiple`, {
      method: 'DELETE',

      body: JSON.stringify({
        productIds: ids,
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.DeleteMultipleProduct({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    handleClose();
    dispatch(productActions.SetIsDeleting({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(productActions.SetIsDeleting({ state: false }));
  }
};

// ********************************************* Sub categories ********************************************* //

export const fetchSubCategory = (term) => async (dispatch, getState) => {
  let message;

  try {
    const fullLocation = `${BaseURL}subCategory/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
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
      subCategoryActions.FetchSubCategories({
        subCategories: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const createSubCategory = (file, name, category, handleClose) => async (dispatch, getState) => {
  let message;

  const key = `subCategory/${category.value}/${getState().store.store._id}/${uuidv4()}.${file.type}`;

  dispatch(subCategoryActions.SetIsCreating({ state: true }));

  try {
    // Upload image then send data to backend

    s3.getSignedUrl(
      'putObject',
      { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
      async (_err, presignedURL) => {
        await fetch(presignedURL, {
          method: 'PUT',

          body: file,

          headers: {
            'Content-Type': file.type,
          },
        });

        // Send subCategory name and image with auth token to backend

        const res = await fetch(`${BaseURL}subCategory/create`, {
          method: 'POST',

          body: JSON.stringify({
            image: key,
            name,
            category,
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
            throw new Error(message);
          } else {
            throw new Error(res.message);
          }
        }

        console.log(result);

        dispatch(
          subCategoryActions.CreateSubCategory({
            subCategory: result.data,
          })
        );

        dispatch(showSnackbar('success', message));

        handleClose();

        dispatch(subCategoryActions.SetIsCreating({ state: false }));
      }
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(subCategoryActions.SetIsCreating({ state: false }));
  }
};

export const updateSubCategory = (file, name, category, id, handleClose) => async (dispatch, getState) => {
  let message;

  const key = `subCategory/${category.value}/${getState().store.store._id}/${uuidv4()}.${file.type}`;

  dispatch(subCategoryActions.SetIsUpdating({ state: true }));

  try {
    if (file) {
      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: file,

            headers: {
              'Content-Type': file.type,
            },
          });

          // Send category name and image with auth token to backend

          const res = await fetch(`${BaseURL}subCategory/update/${id}`, {
            method: 'PATCH',

            body: JSON.stringify({
              image: key,
              name,
              category,
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
              throw new Error(message);
            } else {
              throw new Error(res.message);
            }
          }

          console.log(result);

          dispatch(
            subCategoryActions.UpdateSubCategory({
              subCategory: result.data,
            })
          );

          dispatch(showSnackbar('success', message));

          handleClose();

          dispatch(subCategoryActions.SetIsUpdating({ state: false }));
        }
      );
    } else {
      const res = await fetch(`${BaseURL}subCategory/update/${id}`, {
        method: 'PATCH',

        body: JSON.stringify({
          name,
          category,
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
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        subCategoryActions.UpdateSubCategory({
          subCategory: result.data,
        })
      );

      dispatch(showSnackbar('success', message));

      handleClose();

      dispatch(subCategoryActions.SetIsUpdating({ state: false }));
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(subCategoryActions.SetIsUpdating({ state: false }));
  }
};

export const deleteSubCategory = (subCategoryId, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(subCategoryActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}subCategory/delete/${subCategoryId}`, {
      method: 'DELETE',

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
      subCategoryActions.DeleteSubCategory({
        subCategoryId,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
    dispatch(subCategoryActions.SetIsDeleting({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(subCategoryActions.SetIsDeleting({ state: false }));
  }
};

export const deleteMultipleSubCategories = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}subCategory/deleteMultiple`, {
      method: 'DELETE',

      body: JSON.stringify({
        subCategoryIds: ids,
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      subCategoryActions.DeleteMultipleSubCategory({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateSubCategoryStock = (id, formValues, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}subCategory/update/${id}`, {
      method: 'PATCH',

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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      subCategoryActions.UpdateSubCategory({
        subCategory: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const reorderSubCategories = (items) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}subCategory/reorder/`, {
      method: 'POST',

      body: JSON.stringify({
        subCategories: items,
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      subCategoryActions.FetchSubCategories({
        subCategories: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ********************************************* Delivery ********************************************* //

export const addPickupPoint = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(deliveryActions.SetIsCreatingPickupPoint({ state: true }));
  try {
    const res = await fetch(`${BaseURL}delivery/pickupPoint/create`, {
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      deliveryActions.CreatePickupPoint({
        pickupPoint: result.data,
      })
    );

    dispatch(deliveryActions.SetIsCreatingPickupPoint({ state: false }));
    if (handleClose) {
      handleClose();
    }

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(deliveryActions.SetIsCreatingPickupPoint({ state: false }));
  }
};

export const updatePickupPoint = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(deliveryActions.SetIsUpdatingPickupPoint({ state: true }));

  try {
    const res = await fetch(`${BaseURL}delivery/pickupPoint/update/${id}`, {
      method: 'PATCH',

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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      deliveryActions.UpdatePickupPoint({
        pickupPoint: result.data,
      })
    );

    dispatch(deliveryActions.SetIsUpdatingPickupPoint({ state: false }));
    handleClose();
    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(deliveryActions.SetIsUpdatingPickupPoint({ state: false }));
  }
};

export const deletePickupPoint = (id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(deliveryActions.SetIsUpdatingPickupPoint({ state: true }));

  try {
    const res = await fetch(`${BaseURL}delivery/pickupPoint/delete/${id}`, {
      method: 'DELETE',

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
      deliveryActions.DeletePickupPoint({
        pickupPointId: id,
      })
    );

    dispatch(deliveryActions.SetIsDeletingPickupPoint({ state: false }));
    handleClose();
    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(deliveryActions.SetIsDeletingPickupPoint({ state: false }));
  }
};

export const fetchPickupPoints = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}delivery/pickupPoint/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);
    const res = await fetch(newUrl, {
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
      deliveryActions.FetchPickupPoints({
        pickupPoints: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updatePickupPointStatus = (id, formValues) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}delivery/pickupPoint/update/${id}`, {
      method: 'PATCH',

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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      deliveryActions.UpdatePickupPoint({
        pickupPoint: result.data,
      })
    );
    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const deleteMultiplePickupPoint = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(deliveryActions.SetIsDeletingPickupPoint({ state: true }));
  try {
    const res = await fetch(`${BaseURL}delivery/pickupPoint/deleteMultiple`, {
      method: 'DELETE',

      body: JSON.stringify({
        pickupPointIds: ids,
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      deliveryActions.DeleteMultiplePickupPoints({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    handleClose();
    dispatch(deliveryActions.SetIsDeletingPickupPoint({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    handleClose();
    dispatch(deliveryActions.SetIsDeletingPickupPoint({ state: false }));
  }
};

// ********************************************************* Shipment ********************************************************* //

export const fetchShipments = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}delivery/shipment/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);
    const res = await fetch(newUrl, {
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
      shipmentActions.FetchShipments({
        shipments: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateShipment = (formValues, id) => async (dispatch, getState) => {
  let message;
  dispatch(shipmentActions.SetIsUpdating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}delivery/shipment/update/${id}`, {
      method: 'PATCH',

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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      shipmentActions.UpdateShipment({
        shipment: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(shipmentActions.SetIsUpdating({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(shipmentActions.SetIsUpdating({ state: false }));
  }
};

// ****************************************************** Transactions *************************************************** //

export const fetchTransactions = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}transaction/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);
    const res = await fetch(newUrl, {
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
      transactionActions.FetchTransactions({
        transactions: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ********************************************** Payment Settings ************************************************** //

export const updatePaymentSettings = (formValues) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingPaymentSettings({ state: true }));
  try {
    const res = await fetch(`${BaseURL}store/update/paymentSettings`, {
      method: 'PATCH',

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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingPaymentSettings({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingPaymentSettings({ state: false }));
  }
};

// ************************************************* Discount *************************************************** //

// Create, Update, Read, Delete

export const createNewDiscount = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(discountActions.SetIsCreating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}discount/create`, {
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      discountActions.CreateDiscount({
        discount: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(discountActions.SetIsCreating({ state: false }));

    if (handleClose) {
      handleClose();
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(discountActions.SetIsCreating({ state: false }));
    if (handleClose) {
      handleClose();
    }
  }
};

export const updateDiscount = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(discountActions.SetIsUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}discount/update/${id}`, {
      method: 'PATCH',

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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      discountActions.UpdateDiscount({
        discount: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(discountActions.SetIsUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(discountActions.SetIsUpdating({ state: false }));
    handleClose();
  }
};

export const fetchDiscounts = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}discount/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
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
      discountActions.FetchDiscounts({
        discounts: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const deleteDiscount = (id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(discountActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}discount/delete/${id}`, {
      method: 'DELETE',

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
      discountActions.DeleteDiscount({
        discountId: id,
      })
    );

    dispatch(discountActions.SetIsDeleting({ state: false }));
    handleClose();
    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(discountActions.SetIsDeleting({ state: false }));
    dispatch(showSnackbar('error', message));
    handleClose();
  }
};

// ********************************************* Manage Store *********************************** //

export const updateStoreFavicon = (file, handleClose) => async (dispatch, getState) => {
  let message;

  dispatch(storeActions.SetIsUpdatingFavicon({ state: true }));

  try {
    // Upload to aws and send to api

    const key = `store/favicon/${getState().store.store._id}/${uuidv4()}.${file.type}`;

    s3.getSignedUrl(
      'putObject',
      { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
      async (_err, presignedURL) => {
        await fetch(presignedURL, {
          method: 'PUT',

          body: file,

          headers: {
            'Content-Type': file.type,
          },
        });
      }
    );

    const res = await fetch(`${BaseURL}store/manage/favicon`, {
      method: 'PATCH',

      body: JSON.stringify({
        favicon: key,
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingFavicon({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingFavicon({ state: false }));
    handleClose();
  }
};

export const updateStoreSEO = (formValues, file, handleClose) => async (dispatch, getState) => {
  let message;
  let key;
  dispatch(storeActions.SetIsUpdatingStoreSEO({ state: true }));

  try {
    if (file) {
      key = `store/seo/${getState().store.store._id}/${uuidv4()}.${file.type}`;
      // Upload to aws

      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: file,

            headers: {
              'Content-Type': file.type,
            },
          });
        }
      );
    }

    const res = await fetch(`${BaseURL}store/manage/seo`, {
      method: 'PATCH',

      body: JSON.stringify({
        seoImagePreview: key,
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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingStoreSEO({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingStoreSEO({ state: false }));
    handleClose();
  }
};

export const updateSelfDeliveryZone = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingSelfDeliveryZone({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/manage/self-delivery-zone`, {
      method: 'PATCH',

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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingSelfDeliveryZone({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingSelfDeliveryZone({ state: false }));
    handleClose();
  }
};

export const updateManageCharges = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingManageCharges({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/manage/manage-charges`, {
      method: 'PATCH',

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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingManageCharges({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingManageCharges({ state: false }));
    handleClose();
  }
};

export const updateStoreTiming = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingStoreTimings({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/manage/store-timing`, {
      method: 'PATCH',

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
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingStoreTimings({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingStoreTimings({ state: false }));
    handleClose();
  }
};
