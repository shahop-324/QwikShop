import React, { useState } from 'react';
import { Stack, Card, Grid, Box, Button, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { TwitterPicker } from 'react-color';

import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { updateStoreAmbience } from '../../../../actions';

const StoreAmbience = () => {
  const dispatch = useDispatch();

  const { store, isUpdatingAmbience } = useSelector((state) => state.store);

  const [mode, setMode] = useState(store?.mode || 'light');
  const [color, setColor] = useState(store?.primaryColor || '#2065D1');

  return (
    <div>
      <div style={{width: "100%"}} className='d-flex flex-row align-items-center justify-content-end mb-3' >
        <Button variant="contained" startIcon={<RemoveRedEyeIcon />}>
          Preview
        </Button>
      </div>

      
      <Typography variant="h6" className="mb-3">
        Primary Color
      </Typography>

      <Grid item xs={12} md={6} className="mb-4">
        <Card sx={{ p: 3, backgroundColor: color }} />
      </Grid>

      <TwitterPicker
        color={color}
        onChangeComplete={(color) => {
          setColor(color.hex);
        }}
      />
     <div style={{width: "100%"}} className='d-flex flex-row align-items-center justify-content-end mt-3' >
        <LoadingButton
        className='me-3'
          onClick={() => {
            dispatch(updateStoreAmbience({ mode: 'light', primaryColor: '#2065D1' }));
          }}
          loading={isUpdatingAmbience}
          variant="outlined"
          startIcon={<RestoreRoundedIcon />}
        >
          Restore to default
        </LoadingButton>
        <LoadingButton
          onClick={() => {
            dispatch(updateStoreAmbience({ mode, primaryColor: color }));
          }}
          loading={isUpdatingAmbience}
          variant="contained"
        >
          Save
        </LoadingButton>
      </div>
    </div>
  );
};

export default StoreAmbience;
