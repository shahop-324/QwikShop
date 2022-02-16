import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  DialogContentText,
  Button,
  TextField,
  Stack,
  Grid,
  Card,
  Slide,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { verifyWhatsAppNumber } from '../../../actions';

const WhatsAppVerification = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState();

  const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Verify your number'}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '400px', p: 4 }}>
            <DialogContentText id="alert-dialog-slide-description">
              {/*  */}
              <Typography variant="body2" sx={{ mb: 2 }}>
                Please Enter OTP Sent to your mobile number
              </Typography>
            </DialogContentText>
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
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WhatsAppVerification;
