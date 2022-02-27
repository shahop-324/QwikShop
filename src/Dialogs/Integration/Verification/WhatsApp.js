/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {

  Typography,
 
  Button,
  TextField,
 Drawer, 
 Stack,
 IconButton,
 
  Box,
} from '@mui/material';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { useDispatch } from 'react-redux';
import { verifyWhatsAppNumber } from '../../../actions';

const WhatsAppVerification = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState();

 

  return (
    <>
     <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={handleClose}>
          <Box sx={{ my: 3, mx: 4, width: '400px' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">WhatsApp Chat</Typography>

              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseRounded />
              </IconButton>
            </Stack>
      
       
          <Box sx={{ width: '400px', p: 4 }}>
           
              {/*  */}
              <Typography variant="body2" sx={{ mb: 2 }}>
                Please Enter OTP Sent to your mobile number
              </Typography>
            
            <TextField
              name="otp"
              label="OTP"
              fullWidth
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
          </Box>
        
      
          <Button onClick={handleClose}>Close</Button>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={() => {
              dispatch(verifyWhatsAppNumber(otp, handleClose));
            }}
          >
            Verify
          </Button>
       
      </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default WhatsAppVerification;
