import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Grid,
  Card,
  Stack,
  TextField,
} from '@mui/material';

import WalletPNG from '../../assets/wallet.png';
import RechargeWallet from './RechargeWallet';
import { WalletDetails } from '../../sections/@dashboard/general/booking';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const QwikWallet = ({ open, handleClose }) => {
  const [openRecharge, setOpenRecharge] = useState(false);

  const handleCloseRecharge = () => {
    setOpenRecharge(false);
  };

  return (
    <>
      <Dialog
        maxWidth="lg"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 2 }}>{'QwikWallet'}</DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 3, width: '900px' }}>
            <Card sx={{ p: 4 }}>
              <Stack direction="row" alignItems={'center'} justifyContent="space-between">
                <img src={WalletPNG} alt="QwikWallet" style={{ width: '150px', height: '150px' }} />
                <Stack direction="column" alignItems={'center'}>
                  <Stack sx={{ mb: 2 }} direction="column" alignItems={'center'} spacing={2}>
                    <Typography variant="h6">Balance</Typography>
                    <Typography variant="h3">Rs. 0</Typography>
                  </Stack>

                  <Button
                    onClick={() => {
                      setOpenRecharge(true);
                    }}
                    variant="contained"
                    size="large"
                  >
                    Recharge
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Box>

          {/* Recharge Wallet */}
          {/* Wallet Money */}
          {/* Wallet Transactions */}

          <WalletDetails />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {openRecharge && <RechargeWallet open={openRecharge} handleClose={handleCloseRecharge} />}
    </>
  );
};

export default QwikWallet;