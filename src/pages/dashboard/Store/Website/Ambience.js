import React, { useState } from 'react';
import { Stack, Card, Grid, Box, Button, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { TwitterPicker } from 'react-color';

import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';

const StoreAmbience = () => {
  const [mode, setMode] = useState('light');
  const [color, setColor] = useState('#538BF7');

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="end">
        <Button variant="contained" startIcon={<RemoveRedEyeIcon />}>
          Preview
        </Button>
      </Stack>

      <Typography variant="h6" className="mb-3">
        Mode
      </Typography>

      <RadioGroup
        value={mode}
        sx={{ width: '100%', mb: 4 }}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Card sx={{ p: 3, width: '400px' }}>
            {' '}
            <FormControlLabel
              value="light"
              control={
                <Radio
                  onClick={() => {
                    setMode('light');
                  }}
                />
              }
              label="Light"
            />
          </Card>
          <Card sx={{ p: 3, width: '400px' }}>
            {' '}
            <FormControlLabel
              value="dark"
              control={
                <Radio
                  onClick={() => {
                    setMode('light');
                  }}
                />
              }
              label="Dark"
            />
          </Card>
        </Box>
      </RadioGroup>
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
      <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={3}>
        <Button variant="outlined" startIcon={<RestoreRoundedIcon />}>
          Restore to default
        </Button>
        <Button variant="contained">Save</Button>
      </Stack>
    </div>
  );
};

export default StoreAmbience;
