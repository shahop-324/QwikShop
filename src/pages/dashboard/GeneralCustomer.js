import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';

import Select from 'react-select';
// ----------------------------------------------------------------------
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// @mui
import { Grid, Container, Stack, IconButton, Button } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { BookingDetails } from '../../sections/@dashboard/general/booking';

import AddNewCustomer from '../../Dialogs/AddNewCustomer';
import ImportCustomers from '../../Dialogs/ImportCustomers';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#9C9C9C', 0.15),
  '&:hover': {
    backgroundColor: alpha('#9C9C9C', 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const options = [
  { value: 'Lifetime', label: 'Lifetime' },
  { value: 'Yesterday', label: 'Yesterday' },
  { value: 'Last 7 days', label: 'Last 7 days' },
  { value: 'Last 30 days', label: 'Last 30 days' },
  { value: 'This month', label: 'This month' },
  { value: 'Last month', label: 'Last month' },
  { value: 'Custom range', label: 'Custom range' },
];

export default function GeneralCustomer() {
  const [openAddCustomer, setOpenAddCustomer] = useState(false);
  const [openImportCustomers, setOpenImportCustomers] = useState(false);

  const handleCloseAddCustomer = () => {
    setOpenAddCustomer(false);
  };

  const handleOpenAddCustomer = () => {
    setOpenAddCustomer(true);
  };

  const handleCloseImportCustomers = () => {
    setOpenImportCustomers(false);
  };

  const handleOpenImportCustomers = () => {
    setOpenImportCustomers(true);
  };

  const { themeStretch } = useSettings();

  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <>
      <Page title="Customers">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" className="mb-4 d-flex flex-row align-items-center justify-content-between">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                </Search>

                <div className="d-flex flex-row align-items-center">
                  <IconButton>
                    <CloudDownloadRoundedIcon />
                  </IconButton>
                  <Button
                    onClick={() => {
                      handleOpenImportCustomers();
                    }}
                    className="mx-3"
                    variant="outlined"
                  >
                    Import customers
                  </Button>
                  <Button
                    onClick={() => {
                      handleOpenAddCustomer();
                    }}
                    variant="contained"
                  >
                    Add customer
                  </Button>
                </div>
              </Stack>
            </Grid>

            <div style={{ width: '100%' }} className="mx-4 d-flex flex-row align-items-center justify-content-between">
              <Stack direction="row" spacing={2}>
                <Chip label="All customers" component="a" href="#basic-chip" clickable />
                <Chip label="New" component="a" href="#basic-chip" variant="outlined" clickable />
                <Chip label="Returning" component="a" href="#basic-chip" variant="outlined" clickable />
                <Chip label="Imported" component="a" href="#basic-chip" variant="outlined" clickable />
                <Chip label="Fans" component="a" href="#basic-chip" variant="outlined" clickable />
              </Stack>
              <div style={{ width: '200px' }}>
                <Select defaultValue={options[0]} value={selectedOption} onChange={handleChange} options={options} />
              </div>
            </div>
            <Grid item xs={12}>
              <BookingDetails />
            </Grid>
          </Grid>
        </Container>
      </Page>

      {openAddCustomer && <AddNewCustomer open={openAddCustomer} handleClose={handleCloseAddCustomer} />}
      {openImportCustomers && <ImportCustomers open={openImportCustomers} handleClose={handleCloseImportCustomers} />}
    </>
  );
}
