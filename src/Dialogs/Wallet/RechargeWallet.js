import React, { useState } from 'react';
import {
  Chip,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  TextField,
  Card,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const RechargeWallet = ({open, handleClose}) => {
  const [amount, setAmount] = useState();

  return (
    <>
      <Dialog
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 2 }}>{'Recharge Wallet'}</DialogTitle>

        <DialogContent>
          <Box sx={{ width: '500px' }}>
            <Stack direction={'row'} alignItems="center" spacing={2}>
              <Chip
              onClick={() => {}}
                icon={<AddIcon style={{ fontSize: '20px' }} />}
                label={'Rs.100'}
                variant="outlined"
                color="primary"
              />
              <Chip
              onClick={() => {}}
                icon={<AddIcon style={{ fontSize: '20px' }} />}
                label={'Rs.300'}
                variant="outlined"
                color="primary"
              />
              <Chip
               onClick={() => {}}
                icon={<AddIcon style={{ fontSize: '20px' }} />}
                label={'Rs.500'}
                variant="outlined"
                color="primary"
              />
              <Chip
               onClick={() => {}}
                icon={<AddIcon style={{ fontSize: '20px' }} />}
                label={'Rs.1000'}
                variant="outlined"
                color="primary"
              />
            </Stack>

            <Card sx={{ p: 3, my: 2 }}>
              <TextField
                name="rechargeAmount"
                label="Recharge Amount"
                fullWidth
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </Card>

            <Button fullWidth startIcon={<CurrencyRupeeIcon />} variant="outlined" size="large" color="primary">
              Add Money
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RechargeWallet;
