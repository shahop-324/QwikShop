import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// @mui
import { useFormik } from 'formik';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import { login, resetLoginFormLoading } from '../../../actions';
// ----------------------------------------------------------------------
// import CustomPhoneNumber from '../../../forms/PhoneNumber';

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email must be a valid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      dispatch(login(values.email, values.password));
    },
  });

  useEffect(() => {
    dispatch(resetLoginFormLoading());
  }, []);

  const dispatch = useDispatch();

  const { isSubmittingLogin } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
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
          className="mb-4"
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
      </Stack>

      <LoadingButton
        disabled={!(formik.isValid && formik.dirty)}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmittingLogin}
      >
        Login
      </LoadingButton>
    </form>
  );
}
