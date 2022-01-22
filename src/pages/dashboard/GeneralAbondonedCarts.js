import React, { useState } from 'react';

import { Grid, Card, Stack, Typography, Box, Button, IconButton } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';

import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { ProductMoreMenu } from '../../sections/@dashboard/e-commerce/product-list';

const GeneralAbondonedCarts = () => {
  const [state, setState] = useState();

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
      width: 180,
      editable: false,
      renderCell: (params) => <Typography variant="subtitle2">{params.value}</Typography>,
    },

    {
      field: 'products',
      headerName: 'Products',
      width: 410,
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
            <Chip key={el.index} label={`${el.label} (${el.quantity})`} color="primary" variant="outlined" />
          ))}
        </Box>
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Chip sx={{ fontWeight: 500 }} label={`Rs.${params.value}`} color="primary" variant="filled" />
      ),
    },
    {
      field: 'lastVisited',
      headerName: 'Last Visited',
      width: 150,
      editable: false,
    },
    {
      field: 'action',
      headerName: '',
      width: 30,
      editable: false,
      renderCell: (params) => (
        // WhatsApp, Message, Mail, Discount
        <ProductMoreMenu onDelete={() => {}} productName="op" />
      ),
    },
  ];

  const rows = [
    {
      id: '17282-dhuiwi992-2hjj2729',
      name: 'Harsh Mishra',
      mobile: '+91 9770668454',
      email: 'shreyanshshah242@gmail.com',
      products: [
        { index: '1223', label: 'Nike', quantity: 2 },
        { index: '12727', label: 'Puma', quantity: 1 },
        { index: '3782', label: 'Woodland', quantity: 5 },
        { index: '28892', label: 'Hush Puppies', quantity: 12 },
        { index: '1382893', label: 'Yonex', quantity: 24 },
      ],
      amount: '239902',
      lastVisited: '2 days Ago',
    },
  ];

  return (
    <div>
      <Typography className="mb-4" variant="h6">
        Abondoned Carts
      </Typography>

      {/* Name, Mobile, Products, Amount, Added at, actions */}

      <Box sx={{ height: 650, width: '100%' }}>
        <DataGrid rowHeight={150} rows={rows} columns={columns} />
      </Box>
    </div>
  );
};

export default GeneralAbondonedCarts;
