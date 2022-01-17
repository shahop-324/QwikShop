/* eslint-disable react/prop-types */
import React from 'react';
import QRCode from 'react-qr-code';
import styled from 'styled-components';

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
import QwikShopLogo from '../assets/QwikShop_logo.png';

const QRUpper = styled.div`
  height: 90%;
  width: 100%;
  background-color: #2065d1;
`;

const StoreQRCode = ({ open, handleClose }) => (
  <>
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} className="d-flex flex-row align-items-center justify-content-center m-3">
          <Card sx={{ width: '300px', height: '500px' }}>
            <div className="layer-1" style={{ height: '50%', width: '100%', zIndex: '1000' }}>
              <QRUpper>{}</QRUpper>
            </div>

            <div
              style={{ height: '100%', width: '100%', zIndex: '100000', position: 'absolute', top: '0', left: '0' }}
              className="d-flex flex-column align-items-center justify-content-around"
            >
              <Typography variant="h4" color="white">
                Order Online!
              </Typography>
              <Typography color="white" style={{ fontSize: '16px' }}>
                Scan QR to check our products
              </Typography>
              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                }}
              >
                <QRCode value="https://www.bluemeet.in" size={120} />
              </div>
              <Typography variant="h7" style={{ fontSize: '16px' }}>
                Shree Ram Misthan Bhandar
              </Typography>
              <a href="#" style={{ fontSize: '15px' }}>
                qwikshop.online/shreeram
              </a>
              <img src={QwikShopLogo} alt="logo" style={{ height: '60px' }} />
            </div>
          </Card>
        </Grid>
        
        
      </Grid>
      <div className='d-flex flex-row align-items-center justify-content-center mb-4'>
        <Button variant='outlined'>Download</Button>
        </div>
    </Dialog>
  </>
);

export default StoreQRCode;
