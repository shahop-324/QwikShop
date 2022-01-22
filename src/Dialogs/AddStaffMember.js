/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { Box, Card, Grid, Dialog, DialogTitle, DialogActions, TextField, Autocomplete, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CustomPhoneNumber from '../forms/PhoneNumber';
// @mui
// Phone Input
import 'react-phone-number-input/style.css';

const AddStaffMember = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [permissionList, setPermissionList] = useState([]);

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Add Staff Member</DialogTitle>
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
                  name="staffName"
                  label="Staff Name"
                  fullWidth
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                <PhoneInput
                  name="phoneNumber"
                  placeholder="Staff phone number"
                  value={phone}
                  onChange={setPhone}
                  inputComponent={CustomPhoneNumber}
                  defaultCountry="IN"
                />
                <Autocomplete
                  multiple
                  value={permissionList}
                  onChange={(e, value) => {
                    setPermissionList(value);
                  }}
                  id=""
                  fullWidth
                  options={permissions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Permissions"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Box>
              <div className="d-flex flex-row align-items-center justify-content-end  mt-4">
                <LoadingButton onClick={() => {}} type="submit" variant="contained" loading={false}>
                  Add Member
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

export default AddStaffMember;

const permissions = [
  { label: 'Order' },
  { label: 'Catalouge' },
  { label: 'Delivery' },
  { label: 'Customer' },
  { label: 'Dining' },
  { label: 'Marketing' },
  { label: 'Payment' },
  { label: 'Discount' },
  { label: 'Manage' },
  { label: 'Design' },
  { label: 'Integration' },
  { label: 'Reports' },
];
