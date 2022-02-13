import PropTypes from 'prop-types';
import { useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider } from '../../../components/hook-form';

import { resetPassword } from '../../../actions';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get('token'));
  const isMountedRef = useIsMountedRef();

  const dispatch = useDispatch();

  const ResetPasswordSchema = Yup.object().shape({});

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleFormSubmit = async (values) => {
    console.log(values);
    dispatch(resetPassword(values, searchParams.get('token')));
  };

  const initialValues = {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ResetPasswordSchema}
      onSubmit={handleFormSubmit}
      // enableReinitialize={true}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              name="new_pass"
              value={values.new_pass}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.new_pass && !!errors.new_pass}
              helperText={touched.new_pass && errors.new_pass}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              variant="outlined"
              name="pass_confirm"
              value={values.pass_confirm}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.pass_confirm && !!errors.pass_confirm}
              helperText={touched.pass_confirm && errors.pass_confirm}
            />

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Update Password
            </LoadingButton>
          </Stack>
        </form>
      )}
    </Formik>
  );
}
