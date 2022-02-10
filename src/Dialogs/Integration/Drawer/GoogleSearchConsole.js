import CloseRounded from '@mui/icons-material/CloseRounded';
import { IconButton, Drawer, Stack, Grid, Box, Card, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { Link } from 'react-router-dom';

const GoogleSearchConsole = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);

  const [verificationCode, setVerificationCode] = useState();

  return (
    <>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={handleClose}>
          <Box sx={{ my: 3, mx: 4, width: '400px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Google Search Console</Typography>

              <IconButton>
                <CloseRounded />
              </IconButton>
            </Stack>
            <Box sx={{ my: 4 }}>
              <Box
                className="mb-3"
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
                }}
              >
                <TextField
                  required
                  name="verificationCode"
                  label="Verification Code"
                  fullWidth
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                  }}
                />
              </Box>

              <Button sx={{ my: 2 }} variant="contained" fullWidth>
                Connect
              </Button>
              <Typography sx={{ my: 3 }} variant="subtitle2">
                Need Help?
              </Typography>
              <PlayCircleRoundedIcon sx={{ mr: 1 }} />
              <Link to="/">
                <Typography variant="caption">See How to obtain Verification Code</Typography>
              </Link>
            </Box>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default GoogleSearchConsole;