import * as Yup from 'yup';
// Phone Input
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

import { FormProvider } from '../../../components/hook-form';
// ----------------------------------------------------------------------
import CustomPhoneNumber from '../../../forms/PhoneNumber';

export default function LoginForm() {


  const isMountedRef = useIsMountedRef();

  const [phone, setPhone] = useState();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
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
      // await login(data.email, data.password);
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

        <PhoneInput
          className="mb-4"
          name="mobile"
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
          inputComponent={CustomPhoneNumber}
          defaultCountry="IN"
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}