import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { Box, Card, Grid, Dialog, DialogTitle, DialogActions, TextField, Autocomplete, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CustomPhoneNumber from '../forms/PhoneNumber';
// @mui
// Phone Input
import 'react-phone-number-input/style.css';

// eslint-disable-next-line react/prop-types
const AddNewCustomer = ({ open, handleClose }) => {
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Add customer</DialogTitle>
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
                  name="customerName"
                  label="Customer Name"
                  fullWidth
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                  }}
                />
                <TextField
                  name="customerCity"
                  label="Customer City"
                  fullWidth
                  value={customerCity}
                  onChange={(e) => {
                    setCustomerCity(e.target.value);
                  }}
                />

                <PhoneInput
                  name="phoneNumber"
                  placeholder="Customer phone number"
                  value={phone}
                  onChange={setPhone}
                  inputComponent={CustomPhoneNumber}
                  defaultCountry="IN"
                />
              </Box>
              <div className="d-flex flex-row align-items-center justify-content-end  mt-4">
                <LoadingButton onClick={() => {}} type="submit" variant="contained" loading={false}>
                  Create customer
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

export default AddNewCustomer;
