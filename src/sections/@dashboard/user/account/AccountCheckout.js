import React, { useState } from 'react';
import {
  Grid,
  Card,
  Stack,
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  MenuIte,
  IconButton,
  MenuItem,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import TextFormatRoundedIcon from '@mui/icons-material/TextFormatRounded';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import ArrowDropDownCircleRoundedIcon from '@mui/icons-material/ArrowDropDownCircleRounded';

import { styled } from '@mui/material/styles';

import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';
import AddCheckoutField from '../../../../Dialogs/AddCheckoutField';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);

const AccountCheckout = () => {
  const [state, setState] = useState('');

  const [guestCheckout, setGuestCheckout] = useState(true);

  const [openAddCheckoutField, setOpenAddCheckoutField] = useState(false);

  const handleOpenAddCheckoutField = () => {
    setOpenAddCheckoutField(true);
  }

  const handleCloseAddCheckoutField = () => {
    setOpenAddCheckoutField(false);
  }

  return (
    <>
      <Grid className="px-4 pt-3" container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, position: 'relative' }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'column'} spacing={1}>
                <Typography variant="subtitle1">Guest Checkout</Typography>
                <Typography variant="caption">
                  Customers will be able to place orders without verifying their mobile number.
                </Typography>
              </Stack>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={guestCheckout}
                    onChange={(e, value) => setGuestCheckout(value)}
                    sx={{ m: 1 }}
                    defaultChecked
                  />
                }
                label="Enabled"
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Stack direction="column" spacing={2}>
        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, position: 'relative' }}>
              <Stack className="mb-4" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant="subtitle1">Order Form</Typography>
                  <Typography variant="caption">Create custom form field for your store checkout.</Typography>
                </Stack>
              </Stack>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField disabled name="name" label="Name" fullWidth readOnly />
                <TextField disabled name="mobileNumber" label="Mobile Number" fullWidth readOnly />
                <TextField disabled name="address" label="Address" fullWidth readOnly />
                <TextField disabled name="city" label="City" fullWidth readOnly />
                <TextField disabled name="pincode" label="Pincode" fullWidth readOnly />
                {customFieldsList.map((el) => (
                  <Box
                    key={el.index}
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      alignItems: 'center',
                      gridTemplateColumns: { xs: '10fr 1fr' },
                    }}
                  >
                    <TextField
                      disabled
                      name={el.name}
                      label={el.label}
                      fullWidth
                      readOnly
                      InputProps={{
                        startAdornment: <InputAdornment>{el.icon}</InputAdornment>,
                      }}
                    />
                    <MoreMenuButton />
                  </Box>
                ))}
              </Box>
              <Stack className='mt-4' direction={"row"} alignItems={"center"} justifyContent={"center"}>
                <Button onClick={() => {handleOpenAddCheckoutField();}} variant="outlined">Add Field</Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Stack>
      {openAddCheckoutField && <AddCheckoutField open={openAddCheckoutField} handleClose={handleCloseAddCheckoutField} />}
    </>
  );
};

const customFieldsList = [
  { icon: <EmailRoundedIcon />, name: '', label: '', index: '123' },
  { icon: <EventRoundedIcon />, name: 'Date', label: 'Date', index: '567' },
  { icon: <AccessTimeRoundedIcon />, name: 'Time', label: 'Time', index: '399' },
  { icon: <TextFormatRoundedIcon />, name: 'Text', label: 'Text', index: '6627' },
  { icon: <PhotoRoundedIcon />, name: 'Image', label: 'Image', index: '2663' },
  { icon: <ArrowDropDownCircleRoundedIcon />, name: 'customDropdown', label: 'Custom Dropdown', index: '2772' },
];

export default AccountCheckout;

function MoreMenuButton() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton style={{ height: 'max-content' }} size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
          Print
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
