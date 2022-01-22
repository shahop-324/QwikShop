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

import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';

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
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const [replacementPeriod, setReplacementPeriod] = useState(null);
  const [returnPeriod, setReturnPeriod] = useState(null);

  const [shipmentTime, setShipmentTime] = useState(null);

  const [freeDeliveryAbove, setFreeDeliveryAbove] = useState('');

  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(20);

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="end">
        <Button variant="contained" startIcon={<RemoveRedEyeIcon />}>
          Preview
        </Button>
      </Stack>

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
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  <FormControlLabel value="yes" control={<Radio defaultChecked />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Is Replacement accepted (on applicable products)?
                </FormLabel>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  <FormControlLabel value="yes" control={<Radio defaultChecked />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="international" control={<Radio defaultChecked />} label="International" />
                <FormControlLabel value="india" control={<Radio />} label="India" />
                <FormControlLabel value="state" control={<Radio defaultChecked />} label="State" />
                <FormControlLabel value="city" control={<Radio />} label="City" />
                <FormControlLabel value="distanceRange" control={<Radio />} label="In a fixed Distance" />
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
              <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
            </Stack>
          </Card>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"end"} spacing={3} sx={{py: 3}}>
          <Button variant="outlined" startIcon={<RestoreRoundedIcon />}>
          Restore to default
        </Button>
        <Button variant="contained">Save</Button>
          </Stack>
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
