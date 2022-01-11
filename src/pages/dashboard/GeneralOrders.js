// React select
import { useState } from 'react';
import Select from 'react-select';
// @mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { styled, alpha } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';

// ----------------------------------------------------------------------
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { BookingDetails } from '../../sections/@dashboard/general/booking';

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

export default function GeneralEcommerce() {
  const { themeStretch } = useSettings();

  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <Page title="General: E-commerce">
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
              <div style={{width: "200px"}}>
              <Select defaultValue={options[0]} value={selectedOption} onChange={handleChange} options={options} />
              </div>
            </Stack>
          </Grid>

          <Stack direction="row" spacing={2} className="mx-4">
            <Chip label="All orders" component="a" href="#basic-chip" clickable />
            <Chip label="Pending" component="a" href="#basic-chip" variant="outlined" clickable />
            <Chip label="Accepted" component="a" href="#basic-chip" variant="outlined" clickable />
            <Chip label="Shipped" component="a" href="#basic-chip" variant="outlined" clickable />
            <Chip label="Delivered" component="a" href="#basic-chip" variant="outlined" clickable />
            <Chip label="Cancelled" component="a" href="#basic-chip" variant="outlined" clickable />
            <Chip label="Rejected" component="a" href="#basic-chip" variant="outlined" clickable />
            <Chip label="Paid online" component="a" href="#basic-chip" variant="outlined" clickable />
            <Chip label="COD" component="a" href="#basic-chip" variant="outlined" clickable />
          </Stack>
          <Grid item xs={12}>
            <BookingDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
