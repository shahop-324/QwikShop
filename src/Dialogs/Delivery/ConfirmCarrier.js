import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Typography, Drawer, Card, Button, IconButton, Grid, Stack, Dialog, Slide, Box, Portal } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ConfirmCarrier = ({ open, handleClose, id }) => (
  <>
    <Portal>
      <Dialog
        width="600px"
        maxWidth={'lg'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ p: 4, width: '600px' }}>
          <Typography variant="subtitle2">NOTE:</Typography>
          <Typography variant="body2" sx={{mb: 3}}>
            Please make sure you have selected right courier service, it cannot be changed once confirmed.
          </Typography>
          <Card sx={{p: 2, mb: 3}} >
              <Typography variant='subtitle2'>Rs. 155.32 /- Will be charged and deducted from your on QwikShop Wallet towards this shippment</Typography>
          </Card>
          <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
            <Button variant="contained" color="primary" startIcon={<LocalShippingRounded />}>
              Ship With Delhivery
            </Button>
            <Button variant="outlined" startIcon={<CloseRoundedIcon />}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Portal>
  </>
);

export default ConfirmCarrier;
