import React, { useState } from 'react';
import { Grid, Card, Stack, Typography, Box, Button, IconButton } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import AddStaffMember from '../../../../Dialogs/AddStaffMember';

const AccountStaff = () => {
  const [state, setState] = useState('');

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      width: 250,
      editable: false,
      renderCell: (params) => <Typography variant="subtitle1">{params.value}</Typography>,
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
          {params.value.map((el) => (
            <Chip key={el.index} label={el.label} color="primary" variant="outlined" />
          ))}
        </Box>
      ),
    },
    {
      field: 'lastLoggedIn',
      headerName: 'Last Logged In',
      width: 200,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      editable: false,
      renderCell: (params) => (
        <IconButton>
          <DeleteRoundedIcon />
        </IconButton>
      ),
    },
  ];

  const rows = [
    {
      id: '17282-dhuiwi992-2hjj2729',
      name: 'Harsh Mishra',
      mobile: '+91 9770668454',
      permissions: [
        { index: '1223', label: 'Orders' },
        { index: '12727', label: 'Marketing' },
        { index: '3782', label: 'Management' },
        { index: '28892', label: 'Delivery' },
        { index: '1382893', label: 'Payments' },
      ],
      lastLoggedIn: '12 min Ago',
    },
  ];

  return (
    <>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3, position: 'relative' }}>
          <Stack sx={{ mb: 3 }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Button variant="outlined">Export in Excel</Button>
            <Stack direction={'row'} spacing={3} alignItems={'center'}>
              <Button variant="outlined">Import Staff</Button>
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
        </Card>
      </Grid>

      {open && <AddStaffMember open={open} handleClose={handleClose} />}
    </>
  );
};

export default AccountStaff;
