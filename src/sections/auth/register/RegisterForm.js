import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Phone Input
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider } from '../../../components/hook-form';
// ----------------------------------------------------------------------
import CustomPhoneNumber from '../../../forms/PhoneNumber';

export default function RegisterForm() {
  

  const isMountedRef = useIsMountedRef();

  const [phone, setPhone] = useState();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // await register(data.email, data.password, data.firstName, data.lastName);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField fullWidth label="First name" variant="outlined" name="firstName" />
          <TextField fullWidth label="Last name" variant="outlined" name="lastName" />
        </Stack>

        <TextField fullWidth label="Shop name" variant="outlined" name="shopName" />

        <PhoneInput
          name="mobile"
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
          inputComponent={CustomPhoneNumber}
          defaultCountry="IN"
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
