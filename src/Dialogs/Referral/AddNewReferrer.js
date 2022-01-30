import React, { useState } from 'react';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import { Box, Card, Grid, Dialog, DialogTitle, TextField, Button, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CustomPhoneNumber from '../../forms/PhoneNumber';
// @mui
// Phone Input
import 'react-phone-number-input/style.css';
import { addNewReferrer } from '../../actions';

// eslint-disable-next-line react/prop-types
const AddNewReferrer = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { isCreating } = useSelector((state) => state.referral);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [referrerName, setReferrerName] = useState('');
  const [commission, setCommission] = useState(5);

  const onSubmit = () => {
    const formValues = { name: referrerName, phone, email, commission };
    dispatch(addNewReferrer(formValues, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Add Referrer</DialogTitle>
        <Grid className="px-4 py-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                }}
              >
                <TextField
                  name="referrerName"
                  label="Referrer Name"
                  fullWidth
                  value={referrerName}
                  onChange={(e) => {
                    setReferrerName(e.target.value);
                  }}
                />
                <TextField
                  name="commission"
                  label="Commission"
                  fullWidth
                  value={commission}
                  onChange={(e) => {
                    setCommission(e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <PercentRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="email"
                  label="Referrer Email"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <PhoneInput
                  name="phoneNumber"
                  placeholder="Referrer phone number"
                  value={phone}
                  onChange={setPhone}
                  inputComponent={CustomPhoneNumber}
                  defaultCountry="IN"
                />
              </Box>
              <div className="d-flex flex-row align-items-center justify-content-end  mt-4">
                <LoadingButton
                  onClick={() => {
                    onSubmit();
                  }}
                  type="submit"
                  variant="contained"
                  loading={isCreating}
                >
                  Create Referrer
                </LoadingButton>
                <Button
                  className="ms-3"
                  size="small"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default AddNewReferrer;