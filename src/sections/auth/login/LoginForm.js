import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
// Phone Input
import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, TextField, IconButton, InputAdornment, } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { FormProvider } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
import {login} from "../../../actions";
// ----------------------------------------------------------------------
// import CustomPhoneNumber from '../../../forms/PhoneNumber';

export default function LoginForm() {

  const dispatch = useDispatch();

  const {isSubmittingLogin} = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@qwikshop.online',
    password: 'demo1234',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async () => {
    dispatch(login(email, password));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}


        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
        />

        <TextField
        className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          label="Password"
          variant="outlined"
          name="password"
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

        {/* <PhoneInput
          className="mb-4"
          name="mobile"
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
          inputComponent={CustomPhoneNumber}
          defaultCountry="IN"
        /> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmittingLogin}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}