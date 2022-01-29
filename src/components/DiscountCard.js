import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  Typography,
  Stack,
  Switch,
  FormControl,
  Divider,
  IconButton,
  Grid,
  FormControlLabel,
} from '@mui/material';
import dateFormat, { masks } from 'dateformat';
import { ProductMoreMenu } from '../sections/@dashboard/e-commerce/product-list';
import EditDiscount from '../Dialogs/Discount/EditDiscount';
import DeleteDiscount from '../Dialogs/Discount/DeleteDiscount';

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

const DiscountCard = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <Card sx={{ px: 3, py: 2 }}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h6">{'HAPPY60'}</Typography>
          <ProductMoreMenu
            onDelete={() => {
              handleOpenDelete();
            }}
            onEdit={() => {
              handleOpenEdit();
            }}
            productName="discount"
          />
        </Stack>
        <Divider className="my-3" variant="dashed" />
        <Typography sx={{ textAlign: 'center' }} variant="subtitle2">
          15% off upto Rs.500 above Rs.4000
        </Typography>
        <Divider className="my-3" variant="dashed" />
        <Stack className="my-2" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="caption">Applicable From</Typography>
          <Typography variant="caption">{dateFormat(new Date(), 'ddd, mmm dS, yy, h:MM')}</Typography>
        </Stack>
        <Stack className="my-2" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="caption">Applicable till</Typography>
          <Typography variant="caption">{dateFormat(new Date(), 'ddd, mmm dS, yy, h:MM')}</Typography>
        </Stack>
        <Divider className="my-3" variant="dashed" />
        <Stack className="my-2" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="caption">Total coupons</Typography>
          <Typography variant="caption">{5000}</Typography>
        </Stack>
        <Stack className="my-2" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="caption">Total Remaining</Typography>
          <Typography variant="caption">{45}</Typography>
        </Stack>
        <Divider className="my-3" variant="dashed" />
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="subtitle2">Status</Typography>
          <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked />} label="" />
        </Stack>
      </Card>
      {openEdit && <EditDiscount open={openEdit} handleClose={handleCloseEdit} id={''} />}
      {openDelete && <DeleteDiscount open={openDelete} handleClose={handleCloseDelete} id={''} />}
    </>
  );
};

export default DiscountCard;

// Discount code DONE
// enable disable DONE
// more menu DONE
// Total Coupons DONE
// Remaining DONE
// Type
// 15% off upto Rs.500 above Rs.4000
// Type
// Applicable from DONE
// Applicable till DONE
