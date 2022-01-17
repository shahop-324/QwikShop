import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {
  Typography,
  Box,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  TextField,
  Autocomplete,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const StoreTimings = ({ open, handleClose }) => {
  const [timing, setTiming] = useState([
    { index: '0', day: 'Sunday', open: true, openTime: '12:00 AM', closeTime: '12:30 AM', allDay: true },
    { index: '1', day: 'Monday', open: true, openTime: '12:00 AM', closeTime: '12:30 AM', allDay: true },
    { index: '2', day: 'Tuesday', open: true, openTime: '12:00 AM', closeTime: '12:30 AM', allDay: true },
    { index: '3', day: 'Wednesday', open: true, openTime: '12:00 AM', closeTime: '12:30 AM', allDay: true },
    { index: '4', day: 'Thrusday', open: true, openTime: '12:00 AM', closeTime: '12:30 AM', allDay: true },
    { index: '5', day: 'Friday', open: true, openTime: '12:00 AM', closeTime: '12:30 AM', allDay: true },
    { index: '6', day: 'Saturday', open: true, openTime: '12:00 AM', closeTime: '12:30 AM', allDay: true },
  ]);

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>Setup Timings</DialogTitle>

        <Typography variant="p3" className="px-4 mt-2">
          Your store will be automatically switched open/close based on the hours you choose.
        </Typography>

        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              {timing.map((el) => (
                <div key={el.index} className="my-3">
                  <Box
                    className="mb-3"
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      alignItems: "center",
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '1fr 1fr 1.5fr 0.1fr 1.5fr' },
                    }}
                  >
                    <Typography>{el.day}</Typography>
                    <Stack direction="row" spacing={4} alignItems="center">
                      <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                      <Typography>Open</Typography>
                    </Stack>

                    <Autocomplete
                      // value={country}
                      // onChange={(e, value) => {
                      //   setCountry(value);
                      // }}
                      fullWidth
                      id="select-time"
                      options={timingOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose time"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    <Typography>-</Typography>
                    <Autocomplete
                      // value={country}
                      // onChange={(e, value) => {
                      //   setCountry(value);
                      // }}
                      fullWidth
                      id="select-time"
                      options={timingOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose time"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Divider />
                </div>
              ))}
            </Card>
          </Grid>
        </Grid>

        <div className="d-flex flex-row align-items-center justify-content-end px-4 my-4">
          <LoadingButton onClick={() => {}} type="submit" variant="contained" loading={false}>
            Save
          </LoadingButton>
          <Button
            className="ms-3"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default StoreTimings;

const timingOptions = [
  { label: '24 Hours' },
  { label: '12:00 AM' },
  { label: '12:30 AM' },
  { label: '01:00 AM' },
  { label: '01:30 AM' },
  { label: '02:00 AM' },
  { label: '02:30 AM' },
  { label: '03:00 AM' },
  { label: '03:30 AM' },
  { label: '04:00 AM' },
  { label: '04:30 AM' },
  { label: '05:00 AM' },
  { label: '05:30 AM' },
  { label: '06:00 AM' },
  { label: '06:30 AM' },
  { label: '07:00 AM' },
  { label: '07:30 AM' },
  { label: '08:00 AM' },
  { label: '08:30 AM' },
  { label: '09:00 AM' },
  { label: '09:30 AM' },
  { label: '10:00 AM' },
  { label: '10:30 AM' },
  { label: '11:30 AM' },
  { label: '12:00 PM' },
  { label: '12:30 PM' },
  { label: '01:00 PM' },
  { label: '01:30 PM' },
  { label: '02:00 PM' },
  { label: '02:30 PM' },
  { label: '03:00 PM' },
  { label: '03:30 PM' },
  { label: '04:00 PM' },
  { label: '04:30 PM' },
  { label: '05:00 PM' },
  { label: '05:30 PM' },
  { label: '06:00 PM' },
  { label: '06:30 PM' },
  { label: '07:00 PM' },
  { label: '07:30 PM' },
  { label: '08:00 PM' },
  { label: '08:30 PM' },
  { label: '09:00 PM' },
  { label: '09:30 PM' },
  { label: '10:00 PM' },
  { label: '10:30 PM' },
  { label: '11:00 PM' },
  { label: '11:30 PM' },
];
