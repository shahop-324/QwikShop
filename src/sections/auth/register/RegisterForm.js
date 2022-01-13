/* eslint-disable react/prop-types */
import { useState } from 'react';
// form
import { reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Stack, TextField, IconButton, InputAdornment, } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Phone Input
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------
// import CustomPhoneNumber from '../../../forms/PhoneNumber';

import { register } from '../../../actions';

const RegisterForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const { isSubmittingRegister } = useSelector((state) => state.auth);

  // const [phone, setPhone] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shopName, setShopName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {

    const currentLocation = window.location.href;

    const formValues = {
      firstName,
      lastName,
      shopName,
      email,
      password,
    };

    console.log(formValues);
    dispatch(register(formValues, email, currentLocation));
  };

  return (
    <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            label="First name"
            variant="outlined"
            name="firstName"
          />
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            label="Last name"
            variant="outlined"
            name="lastName"
          />
        </Stack>

        <TextField
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          fullWidth
          label="Shop name"
          variant="outlined"
          name="shopName"
        />

        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
        />

        <TextField
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
          name="mobile"
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
          inputComponent={CustomPhoneNumber}
          defaultCountry="IN"
        /> */}

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmittingRegister}>
          Register
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default reduxForm({
  form: 'register',
})(RegisterForm);
