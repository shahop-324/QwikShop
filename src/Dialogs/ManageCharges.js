/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// @mui
import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Autocomplete,
  InputAdornment,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);

const ManageCharges = ({ open, handleClose }) => {
  const [deliveryChargePerOrder, setDeliveryChargePerOrder] = useState();
  const [freeDeliveryAbove, setFreeDeliveryAbove] = useState();
  const [diffDeliveryChargeForOnlinePaidOrder, setDiffDeliveryChargeForOnlinePaidOrder] = useState();

  const [deliveryChargeForOnlinePaidOrder, setDeliveryChargeForOnlinePaidOrder] = useState();

  const [gstEnabled, setGSTEnabled] = useState(false);
  const [gstNumber, setGSTNumber] = useState();
  const [gstPercentage, setGSTPercentage] = useState();

  const [extraCharges, setExtraCharges] = useState([
    { index: '', name: '', type: 'flat', percentage: '', flatFees: '' },
  ]);

  const addChargeRow = () => {
    setExtraCharges((prev) => [
      ...prev,
      { index: uuidv4(), name: '', type: 'percentage', percentage: '', flatFees: '' },
    ]);
  };

  const deleteChargeRow = (index) => {
    setExtraCharges((prev) => prev.filter((el) => el.index !== index));
  };

  const updateChargeRow = (value, index, field) => {
    setExtraCharges((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }

        el[field] = value;
        return el;
      })
    );
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <DialogTitle>Manage charges</DialogTitle>

          <Button
            onClick={() => {
              handleClose();
            }}
            variant="contained"
            className="me-4"
          >
            Save
          </Button>
        </div>

        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }} className="mb-4">
              <div className="mb-3">
                <Typography variant="h8" className="">
                  Delivery Charges
                </Typography>
              </div>

              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField
                  type="number"
                  name="deliveryChargePerOrder"
                  label="Delivery charge per order"
                  fullWidth
                  value={deliveryChargePerOrder}
                  onChange={(e) => {
                    setDeliveryChargePerOrder(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  type="number"
                  name="freeDeliveryAbove"
                  label="Free Delivery above"
                  fullWidth
                  value={freeDeliveryAbove}
                  onChange={(e) => {
                    setFreeDeliveryAbove(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <FormGroup className="my-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={diffDeliveryChargeForOnlinePaidOrder}
                      onChange={(e, value) => {
                        setDiffDeliveryChargeForOnlinePaidOrder(value);
                      }}
                    />
                  }
                  label="Offer different charges for online paid orders."
                />
              </FormGroup>
              {diffDeliveryChargeForOnlinePaidOrder && (
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  }}
                >
                  <TextField
                    type="number"
                    name="deliveryChargeForOnlinePaidOrder"
                    label="Delivery charge for online paid order"
                    fullWidth
                    value={deliveryChargeForOnlinePaidOrder}
                    onChange={(e) => {
                      setDeliveryChargeForOnlinePaidOrder(e.target.value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment>
                          <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              )}
            </Card>
            <Card sx={{ p: 3 }} className="mb-4">
              <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                <Typography variant="h8" className="mb-3">
                  GST
                </Typography>

                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={gstEnabled}
                      onChange={(e, value) => {
                        setGSTEnabled(value);
                      }}
                    />
                  }
                  label=""
                />
              </div>
              {gstEnabled && (
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  }}
                >
                  <TextField
                    type="text"
                    name="gstNumber"
                    label="GSTIN Number"
                    fullWidth
                    value={gstNumber}
                    onChange={(e) => {
                      setGSTNumber(e.target.value);
                    }}
                  />

                  <TextField
                    type="number"
                    name="gstPercentage"
                    label="GST Percentage"
                    fullWidth
                    value={gstPercentage}
                    onChange={(e) => {
                      setGSTPercentage(e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <PercentRoundedIcon style={{ fontSize: '20px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              )}
            </Card>
            <Card sx={{ p: 3 }} className="mb-4">
              <div variant="h8" className="mb-3">
                <Typography>Extra charges</Typography>
              </div>

              {extraCharges.map((el, index) => (
                <div key={el.index} className="mb-3">
                  <FormControl className="mb-3" component="fieldset">
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                      <FormControlLabel
                        value="percentage"
                        label={'Percentage'}
                        control={
                          <Radio
                            checked={el.type === 'percentage'}
                            onClick={() => {
                              updateChargeRow('percentage', el.index, 'type');
                            }}
                          />
                        }
                      />
                      <FormControlLabel
                        value="flat"
                        label="Flat"
                        control={
                          <Radio
                            checked={el.type === 'flat'}
                            onClick={() => {
                              updateChargeRow('flat', el.index, 'type');
                            }}
                          />
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                  <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '2fr 1fr' },
                    }}
                  >
                    <TextField
                      type="text"
                      name="gstNumber"
                      label="GSTIN Number"
                      fullWidth
                      value={gstNumber}
                      onChange={(e) => {
                        setGSTNumber(e.target.value);
                      }}
                    />

                    {el.type === 'flat' && (
                      <TextField
                        type="number"
                        name="gstPercentage"
                        label="GST Percentage"
                        fullWidth
                        value={gstPercentage}
                        onChange={(e) => {
                          setGSTPercentage(e.target.value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment>
                              <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}

                    {el.type === 'percentage' && (
                      <TextField
                        type="number"
                        name="gstPercentage"
                        label="GST Percentage"
                        fullWidth
                        value={gstPercentage}
                        onChange={(e) => {
                          setGSTPercentage(e.target.value);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <PercentRoundedIcon style={{ fontSize: '20px' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Box>
                  <div className="d-flex flex-row align-items-center justify-content-end mt-3">
                    <Button
                      onClick={() => {
                        deleteChargeRow(el.index);
                      }}
                      color="error"
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                  <Divider />
                </div>
              ))}

              <div className="d-flex flex-row align-items-center justify-content-center">
                <Button
                  onClick={() => {
                    addChargeRow();
                  }}
                  variant="outlined"
                >
                  Add charges
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
        <div className="d-flex flex-row align-items-center justify-content-end my-3">
          <Button
            onClick={() => {
              handleClose();
            }}
            variant="contained"
            className="me-4"
          >
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default ManageCharges;