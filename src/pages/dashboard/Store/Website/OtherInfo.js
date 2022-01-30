/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import {
  Stack,
  Button,
  Typography,
  Grid,
  Card,
  Box,
  InputAdornment,
  TextField,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  Slider,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';

import { styled } from '@mui/material/styles';

import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { updateStoreOtherInfo } from '../../../../actions';

function valuetext(value) {
  return value;
}

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

const StoreOtherInfo = () => {
  const dispatch = useDispatch();

  const { isUpdatingOtherInfo, store } = useSelector((state) => state.store);

  const [freeDeliveryAbove, setFreeDeliveryAbove] = useState(store.freeDeliveryAbove);
  const [shipmentTime, setShipmentTime] = useState(store.orderIsShippedIn);
  const [returnAccepted, setReturnAccepted] = useState(store.returnAccepted);
  const [replacementAccepted, setReplacementAccepted] = useState(store.replacementAccepted);
  const [deliveryHappensWithin, setDeliveryHappensWithin] = useState(store.deliveryHappensWithin);
  const [state, setState] = useState(store.deliveryState);
  const [city, setCity] = useState(store.deliveryCity);
  const [replacementPeriod, setReplacementPeriod] = useState(store.replacementPeriod);
  const [returnPeriod, setReturnPeriod] = useState(store.returnPeriod);
  const [minRange, setMinRange] = useState(store.minDeliveryDistance);
  const [maxRange, setMaxRange] = useState(store.maxDeliveryDistance);
  const [showShopInDeliveryZoneOnly, setShowShopInDeliveryZoneOnly] = useState(store.showShopInsideDeliveryZoneOnly);

  const onSubmit = () => {
    const formValues = {
      freeDeliveryAbove,
      orderIsShippedIn: shipmentTime,
      returnAccepted,
      replacementAccepted,
      replacementPeriod,
      returnPeriod,
      deliveryHappensWithin,
      deliveryState: state,
      deliveryCity: city,
      minDeliveryDistance: minRange,
      maxDeliveryDistance: maxRange,
      showShopInsideDeliveryZoneOnly: showShopInDeliveryZoneOnly,
    };

    dispatch(updateStoreOtherInfo(formValues));
  };

  return (
    <div>
      <div style={{width: "100%"}} className='d-flex flex-row align-items-center justify-content-end mb-2' >
        <Button variant="contained" startIcon={<RemoveRedEyeIcon />}>
          Preview
        </Button>
      </div>

      <Grid className="px-4 pt-3" container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                mb: 4,
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <TextField
                name="freeDeliveryAbove"
                label="Free Delivery Above"
                fullWidth
                value={freeDeliveryAbove}
                onChange={(e) => {
                  setFreeDeliveryAbove(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <CurrencyRupeeRoundedIcon sx={{ fontSize: '20px' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Autocomplete
                value={shipmentTime}
                onChange={(e, value) => {
                  setShipmentTime(value);
                }}
                id=""
                fullWidth
                options={shipedInTime}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Order is shipped in"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: '', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Is Return accepted (on applicable products)?
                </FormLabel>
                <RadioGroup
                  value={returnAccepted}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
                        onClick={() => {
                          setReturnAccepted(true);
                        }}
                      />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
                        onClick={() => {
                          setReturnAccepted(false);
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Is Replacement accepted (on applicable products)?
                </FormLabel>
                <RadioGroup
                  value={replacementAccepted}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
                        onClick={() => {
                          setReplacementAccepted(true);
                        }}
                      />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
                        onClick={() => {
                          setReplacementAccepted(false);
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
              <Autocomplete
                value={returnPeriod}
                onChange={(e, value) => {
                  setReturnPeriod(value);
                }}
                id=""
                fullWidth
                options={timeline}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Return Period"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: '', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <Autocomplete
                value={replacementPeriod}
                onChange={(e, value) => {
                  setReplacementPeriod(value);
                }}
                id=""
                fullWidth
                options={timeline}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Replacement Period"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: '', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Box>
            <FormControl sx={{ mb: 3 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">Delivery Happens within ?</FormLabel>
              <RadioGroup
                value={deliveryHappensWithin}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="international"
                  control={
                    <Radio
                      onClick={() => {
                        setDeliveryHappensWithin('international');
                      }}
                    />
                  }
                  label="International"
                />
                <FormControlLabel
                  value="india"
                  control={
                    <Radio
                      onClick={() => {
                        setDeliveryHappensWithin('india');
                      }}
                    />
                  }
                  label="India"
                />
                <FormControlLabel
                  value="state"
                  control={
                    <Radio
                      onClick={() => {
                        setDeliveryHappensWithin('state');
                      }}
                    />
                  }
                  label="State"
                />
                <FormControlLabel
                  value="city"
                  control={
                    <Radio
                      onClick={() => {
                        setDeliveryHappensWithin('city');
                      }}
                    />
                  }
                  label="City"
                />
                <FormControlLabel
                  value="distanceRange"
                  control={
                    <Radio
                      onClick={() => {
                        setDeliveryHappensWithin('distanceRange');
                      }}
                    />
                  }
                  label="In a fixed Distance"
                />
              </RadioGroup>
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <TextField
                name="deliveryState"
                label="State"
                fullWidth
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <TextField
                name="city"
                label="City"
                fullWidth
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </Box>

            <Slider
              sx={{ my: 3, px: 4 }}
              getAriaLabel={() => 'Distannce Range'}
              value={[minRange, maxRange]}
              min={1}
              max={100}
              onChange={(e, newValue) => {
                setMinRange(newValue[0]);
                setMaxRange(newValue[1]);
              }}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
            />
            <Box
              sx={{
                mb: 4,
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <TextField
                name="minRange"
                label="Minimum Distance"
                fullWidth
                value={minRange}
                onChange={(e) => {
                  setMinRange(e.target.value);
                }}
              />
              <TextField
                name="maxRange"
                label="Maximum Distance"
                fullWidth
                value={maxRange}
                onChange={(e) => {
                  setMaxRange(e.target.value);
                }}
              />
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Show my shop only to visitors in my delivery zone?</Typography>
              <AntSwitch
                checked={showShopInDeliveryZoneOnly}
                onClick={(e) => {
                  setShowShopInDeliveryZoneOnly(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'ant design' }}
              />
            </Stack>
          </Card>
          <div style={{width: "100%"}} className='d-flex flex-row align-items-center justify-content-end mt-3' >
            <LoadingButton
              onClick={() => {
                onSubmit();
              }}
              loading={isUpdatingOtherInfo}
              variant="contained"
            >
              Save
            </LoadingButton>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default StoreOtherInfo;

const shipedInTime = [
  { label: '10-30 min' },
  { label: '1-3 hr' },
  { label: '4-10 hr' },
  { label: '1-2 day' },
  { label: '2-4 day' },
  { label: '4-6 day' },
  { label: '6-8 day' },
  { label: '8-10 day' },
  { label: '10+ days' },
];

const timeline = [
  { label: '2 days' },
  { label: '3 days' },
  { label: '5 days' },
  { label: '7 days' },
  { label: '12 days' },
  { label: '15 days' },
  { label: '30 days' },
  { label: '60 days' },
];