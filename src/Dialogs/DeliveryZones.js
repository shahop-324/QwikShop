/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LoadingButton from '@mui/lab/LoadingButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
// @mui
import { Box, Card, Grid, Dialog, DialogTitle, TextField, Button, Typography, DialogActions, InputAdornment } from '@mui/material';

import Slider from '@mui/material/Slider';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelfDeliveryZone } from '../actions';

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 50;

const marks = [
  {
    value: 0,
    label: '0(km)',
  },
  {
    value: 100,
    label: '100',
  },
  {
    value: 200,
    label: '200',
  },
  {
    value: 300,
    label: '300',
  },
  {
    value: 400,
    label: '400',
  },
  {
    value: 500,
    label: '500',
  },
  {
    value: 600,
    label: '600',
  },
  {
    value: 700,
    label: '700',
  },
  {
    value: 800,
    label: '800',
  },
  {
    value: 900,
    label: '900',
  },
  {
    value: 1000,
    label: '1000',
  },
  {
    value: 1100,
    label: '1100',
  },
  {
    value: 1200,
    label: '1200',
  },
  {
    value: 1300,
    label: '1300',
  },
  {
    value: 1400,
    label: '1400',
  },
  {
    value: 1500,
    label: '1500',
  },
  {
    value: 1600,
    label: '1600',
  },
  {
    value: 1700,
    label: '1700',
  },
  {
    value: 1800,
    label: '1800',
  },
  {
    value: 1900,
    label: '1900',
  },
  {
    value: 2000,
    label: '2000',
  },
];

const DeliveryZones = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store, isUpadtingSelfDeliveryZone } = useSelector((state) => state.store);
  const [storePincode, setStorePincode] = useState(store.pincode);
  const [pricePer100gm, setPricePer100gm] = useState(store.pricePer100gm)
  const [pricePer5km, setPricePer5km] = useState(store.pricePer5km);
  const [value, setValue] = React.useState([0, 300]);

  const handleChange = (event, newValue, activeThumb, index) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
        updateDeliveryZone([clamped, clamped + minDistance], index, 'distance');
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
        updateDeliveryZone([clamped - minDistance, clamped], index, 'distance');
      }
    } else {
      setValue(newValue);
      updateDeliveryZone(newValue, index, 'distance');
    }
  };

  const [deliveryZones, setDeliveryZones] = useState( store.deliveryZones.map((el) => ({ ...el})));

  const addDeliveryZone = () => {
    setDeliveryZones((prev) => [
      ...prev,
      {
        index: uuidv4(),
        differentChargeForOnlinePaidOrders: false,
        chargeForOnlinePaidOrders: '',
        deliveryCharge: '',
        distance: [],
        pincodes: [],
        type: 'distance',
      },
    ]);
  };

  const deleteDeliveryZone = (index) => {
    setDeliveryZones((prev) => prev.filter((el) => el.index !== index));
  };

  const updateDeliveryZone = (value, index, field) => {
    setDeliveryZones((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const onSubmit = () => {
    const formValues = {
      storePincode,
      pricePer100gm,
      pricePer5km,
      deliveryZones,
    };

    dispatch(updateSelfDeliveryZone(formValues, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <div className="d-flex flex-row align-items-center justify-content-between mx-3">
          <DialogTitle className="me-3">Pincode / Distance Based Delivery</DialogTitle>
          <div className="d-flex flex-row align-items-center">
            <LoadingButton onClick={onSubmit} loading={isUpadtingSelfDeliveryZone} variant="contained" className="me-3">
              Save
            </LoadingButton>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
          </div>
        </div>
        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }} className="mb-4">
              <Typography variant='body2' className="mb-3">
                All delivery distances will be calculated from your store pincode.
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField
                disabled
                helperText={"You can change your store pincode by updating store profile"}
                  name="storePincode"
                  label="Store Pincode"
                  fullWidth
                  value={storePincode}
                  onChange={(e) => {
                    setStorePincode(e.target.value);
                  }}
                />
              </Box>
            </Card>
            <Card sx={{ p: 3 }} className="mb-4">

            <Typography className="mb-3">
               Delivery Price per 100gm Weight
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField
                  name="pricePer100gm"
                  label="Price per 100gm weight"
                  fullWidth
                  value={pricePer100gm}
                  onChange={(e) => {
                    setPricePer100gm(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment>
                    <CurrencyRupeeRoundedIcon />
                    </InputAdornment>
                  }}
                />
              </Box>

            </Card>
            <Card sx={{ p: 3 }} className="mb-4">

            <Typography className="mb-3">
               Delivery Price per 5km
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField
                  name="pricePer100gm"
                  label="Price per 5km"
                  fullWidth
                  value={pricePer5km}
                  onChange={(e) => {
                    setPricePer5km(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment>
                    <CurrencyRupeeRoundedIcon />
                    </InputAdornment>
                  }}
                />
              </Box>

            </Card>
           
          </Grid>
        </Grid>
        <DialogActions>
        <div className="d-flex flex-row align-items-center">
            <LoadingButton onClick={onSubmit} loading={isUpadtingSelfDeliveryZone} variant="contained" className="me-3">
              Save
            </LoadingButton>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeliveryZones;
