/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Card, Box, Button, Stack, Container, Typography, InputAdornment } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';
import AddStaffMember from '../../../../Dialogs/AddStaffMember';
import { ProductMoreMenu } from '../../e-commerce/product-list';
import UpdateStaffMember from '../../../../Dialogs/Staff/updateStaff';
import RemoveStaff from '../../../../Dialogs/Staff/removeStaff';

// hooks
import useCountdown from '../../../../hooks/useCountdown';
// components
import Page from '../../../../components/Page';
import InputStyle from '../../../../components/InputStyle';
import SocialsButton from '../../../../components/SocialsButton';
// assets
import { ComingSoonIllustration } from '../../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5),
  },
}));

// ----------------------------------------------------------------------

const AccountStaff = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [id, setId] = useState('');

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const { store } = useSelector((state) => state.store);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getStaffId(params) {
    return params.row.id;
  }

  const columns = [
    {
      field: 'id',
      hide: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
    },
    {
      field: 'mobile',
      headerName: 'Mobile Number',
      width: 200,
      editable: false,
      renderCell: (params) => <Typography variant="subtitle1">{params.value}</Typography>,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: false,
    },
    {
      field: 'permissions',
      headerName: 'Permissions',
      width: 350,
      editable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
          }}
        >
          {params.value?.map((el) => (
            <Chip label={el?.label || el} color="primary" variant="outlined" />
          ))}
        </Box>
      ),
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      editable: false,
      valueGetter: getStaffId,
      renderCell: (params) => (
        <ProductMoreMenu
          onDelete={() => {
            console.log(params.value);
            setId(params.value);
            handleOpenRemove();
          }}
          onEdit={() => {
            setId(params.value);
            handleOpenUpdate();
          }}
          productName=""
        />
      ),
    },
  ];

  const rows = store.team.map((el) => ({
    id: el.email,
    name: el.name,
    mobile: el.phone,
    permissions: el.permissions,
    email: el.email,
  }));

  const countdown = useCountdown(new Date('07/07/2022 21:30'));

  return (
    <>
      
      <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" paragraph>
              Coming Soon!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>We are currently working hard on this page!</Typography>

            <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

            <CountdownStyle>
              <div>
                <Typography variant="h2">{countdown.days}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Days</Typography>
              </div>

              <SeparatorStyle variant="h2">:</SeparatorStyle>

              <div>
                <Typography variant="h2">{countdown.hours}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Hours</Typography>
              </div>

              <SeparatorStyle variant="h2">:</SeparatorStyle>

              <div>
                <Typography variant="h2">{countdown.minutes}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Minutes</Typography>
              </div>

              <SeparatorStyle variant="h2">:</SeparatorStyle>

              <div>
                <Typography variant="h2">{countdown.seconds}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Seconds</Typography>
              </div>
            </CountdownStyle>

            <InputStyle
              fullWidth
              placeholder="Enter your email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained" size="large">
                      Notify Me
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{ my: 5, '& .MuiOutlinedInput-root': { pr: 0.5 } }}
            />

            <Stack alignItems="center">
              <SocialsButton size="large" initialColor />
            </Stack>
          </Box>
        </Container>
        {/* <Card sx={{ p: 3, position: 'relative' }}>
          <Stack sx={{ mb: 3 }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <div>
              {
                ""
              }
            </div>
            <Stack direction={'row'} spacing={3} alignItems={'center'}>
              <Button
                variant="contained"
                onClick={() => {
                  handleOpen();
                }}
              >
                Add Staff Member
              </Button>
            </Stack>
          </Stack>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid rowHeight={200} rows={rows} columns={columns} />
          </Box>
        </Card> */}
      

      {open && <AddStaffMember open={open} handleClose={handleClose} />}
      {openUpdate && <UpdateStaffMember open={openUpdate} handleClose={handleCloseUpdate} id={id} />}
      {openRemove && <RemoveStaff open={openRemove} handleClose={handleCloseRemove} id={id} />}
    </>
  );
};

export default AccountStaff;
