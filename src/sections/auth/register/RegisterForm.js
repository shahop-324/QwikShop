/* eslint-disable react/prop-types */
import { useState } from 'react';
// form
import { reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';
// @mui
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Phone Input
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
// ----------------------------------------------------------------------
import CustomPhoneNumber from '../../../forms/PhoneNumber';

const RegisterForm = ({ handleSubmit }) => {
  const { isSubmittingRegister } = useSelector((state) => state.auth);

  const [phone, setPhone] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [shopName, setShopName] = useState();

  const onSubmit = () => {
    const formValues = {
      firstName,
      lastName,
      shopName,
      phone,
    };

    console.log(formValues);
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

        <PhoneInput
          name="mobile"
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
          inputComponent={CustomPhoneNumber}
          defaultCountry="IN"
        />

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
