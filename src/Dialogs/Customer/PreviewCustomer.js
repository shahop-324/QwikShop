import CancelRounded from '@mui/icons-material/CancelRounded';
import dateFormat, { masks } from 'dateformat';
import { Typography, Drawer, IconButton, Stack, Box, Card, Divider, Button, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Coin from '../../assets/coin.png';
import Label from '../../components/Label';
import AddCoins from './AddCoins';

const PreviewCustomer = ({ open, handleClose, id }) => {
  const { customers } = useSelector((state) => state.customer);

  const customer = customers.find((el) => el._id === id);

  const [openCoins, setOpenCoins] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {

  }, [count])

  const handleOpenCoins = () => {
    setOpenCoins(true);
  }

  const handleCloseCoins = () => {
      setCount((prev) => prev +1);
      setOpenCoins(false);
  }

  return (
    <>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={handleClose}>
          <Box sx={{ width: '400px', p: 3 }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="mb-3">
              <Typography variant="h6">Customer Details</Typography>
              <IconButton onClick={handleClose}>
                <CancelRounded />
              </IconButton>
            </Stack>
            <Card sx={{ p: 3, mb: 3 }}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="mb-2">
                <Typography variant="subtitle1">Name</Typography>
                <Typography variant="subtitle2">{customer.name}</Typography>
              </Stack>
              <Divider className="my-2" />
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="mb-2">
                <Typography variant="subtitle1">{'Email'}</Typography>
                <Typography variant="subtitle2">{customer.email}</Typography>
              </Stack>
              <Divider className="my-2" />
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="mb-2">
                <Typography variant="subtitle1">{'Phone'}</Typography>
                <Typography variant="subtitle2">{customer.phone}</Typography>
              </Stack>
              <Divider className="my-2" />
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="mb-2">
                <Typography variant="subtitle1">{'Pincode'}</Typography>
                <Typography variant="subtitle2">{customer.pincode}</Typography>
              </Stack>
              <Divider className="my-2" />
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="mb-2">
                <Typography variant="subtitle1">{'City'}</Typography>
                <Typography variant="subtitle2">{customer.city}</Typography>
              </Stack>
            </Card>
            <Card sx={{ p: 3, mb: 3 }}>
              <Stack direction={'row'} alignItems={'center'} spacing={4}>
                <img src={Coin} alt="coins" style={{ height: '50px', width: '50px' }} />
                <Stack>
                  <Typography variant="subtitle2">Coins</Typography>
                  <Typography variant="h6">{customer.coins}</Typography>
                </Stack>
                <Button onClick={handleOpenCoins} startIcon={<AddIcon />} variant="outlined">
                  Add Coins
                </Button>
              </Stack>
            </Card>

            <Typography variant='variant1' className='mb-3'>Orders</Typography>
            <Divider className="my-3" />

            <Card sx={{ p: 3, mb: 3 }}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="mb-3">
                <a href="#" style={{ textDecoration: 'none' }}>
                  <Typography color="#2A60CC" variant="subtitle2">
                    #1236JWH
                  </Typography>
                </a>
                <Typography variant="subtitle2">Rs. 455</Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="mb-4">
                <Typography variant="subtitle2">{dateFormat(new Date(), 'ddd, mmm dS, yy, h:MM TT')}</Typography>
                <Label
                  variant={'ghost'}
                  color={
                    'success'
                    //   'success' ||  'warning' || 'error'
                  }
                >
                  {'Delivered'}
                </Label>
              </Stack>
              <Divider className="my-3" />
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="mb-1">
                <Chip size="small" label="Prepaid" style={{ fontWeight: 500 }} color="primary" />
                <Button  variant="outlined" size="small" startIcon={<WhatsAppIcon />}>
                  Ask for review
                </Button>
              </Stack>
            </Card>
          </Box>
        </Drawer>
      </React.Fragment>
      {openCoins && <AddCoins open={openCoins} handleClose={handleCloseCoins} id={id} /> }
    </>
  );
};

export default PreviewCustomer;

// Info card
// Coins Give Coins button & Total purchase
// Orders

// Order Id, amount
// Date, status
// COD, prepaid