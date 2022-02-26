/* eslint-disable react/prop-types */
import { useState } from 'react';
import * as Yup from 'yup';

// @mui
import { useFormik } from 'formik';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// form
import { useDispatch, useSelector } from 'react-redux';

// Phone Input
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------
// import CustomPhoneNumber from '../../../forms/PhoneNumber';

import { register } from '../../../actions';

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      shopName: '',
      email: '',
      password: '',
      referralCode: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('First name is required'),
      shopName: Yup.string().required('Shop name is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
      referralCode: Yup.string(),
    }),
    onSubmit: (values) => {
      const currentLocation = window.location.href;
      console.log(values);
      dispatch(register(values, values.email, currentLocation));
    },
  });


  const dispatch = useDispatch();
  const { isSubmittingRegister } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullWidth
            label="First name"
            variant="outlined"
            name="firstName"
            error={!!formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullWidth
            label="Last Name"
            variant="outlined"
            name="lastName"
            error={!!formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Stack>

        <TextField
          value={formik.values.shopName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
          label="Shop Name"
          variant="outlined"
          name="shopName"
          error={!!formik.touched.shopName && !!formik.errors.shopName}
          helperText={formik.touched.shopName && formik.errors.shopName}
        />

        <TextField
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          error={!!formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
          label="Password"
          variant="outlined"
          name="password"
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          value={formik.values.referralCode}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
          label="Referral Code (Optional)"
          variant="outlined"
          name="referralCode"
          error={!!formik.touched.referralCode && !!formik.errors.referralCode}
          helperText={formik.touched.referralCode && formik.errors.referralCode}
        />

        <LoadingButton
          disabled={!(formik.isValid && formik.dirty)}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmittingRegister}
        >
          Register
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default RegisterForm;
