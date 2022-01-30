import React, { useState } from 'react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import orderBy from 'lodash/orderBy';

import { useForm } from 'react-hook-form';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import MUIStyled from 'styled-components';
import Rating from '@mui/material/Rating';

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import {
  Avatar,
  IconButton,
  Box,
  Badge,
  Grid,
  Divider,
  Typography,
  Stack,
  Tab,
  Tabs,
  InputAdornment,
  Autocomplete,
  TextField,
  Chip,
  Tooltip,
  Button,
} from '@mui/material';

import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';

import InputBase from '@mui/material/InputBase';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from '../../redux/store';
import { FormProvider } from '../../components/hook-form';
import useSettings from '../../hooks/useSettings';

import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
  ShopProductSearch,
} from '../../sections/@dashboard/e-commerce/shop';

const HeroImage = MUIStyled.img`
width: 100%;
height: 360px;
object-fit: cover;
`;

// @mui
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#909090', 0.15),
  '&:hover': {
    backgroundColor: alpha('#909090', 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StoreHome = () => {
  const { themeStretch } = useSettings();

  const [address, setAddress] = useState('');

  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);

  const { products, sortBy, filters } = useSelector((state) => state.product);

  const methods = useForm({});

  const { reset, watch } = methods;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeAddress = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleResetFilter = () => {};

  const values = watch();

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender?.length === 0 &&
    values.colors?.length === 0 &&
    values.category === 'All';

  const handleRemoveGender = () => {};

  const handleRemoveCategory = () => {};

  const handleRemoveColor = () => {};

  const handleRemovePrice = () => {};
  const handleRemoveRating = () => {};

  return (
    <>
      <div className="container my-4">
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <div>
            <Typography variant="h3">Neel Footwear</Typography>
            {/* <Typography>Shoes and Footwear Store</Typography> */}
            <Typography variant="caption">Deen Dayal Nagar, Gwalior</Typography>
            <div className="d-flex flex-row align-items-center mt-4 ">
              <Chip className="me-3" label="Open Now" variant="outlined" color="primary" size="small" />{' '}
              <Typography>10:00 am - 11:30 pm (Today)</Typography>
            </div>
          </div>

          <div className="d-flex align-items-end flex-column">
            <Chip
              className="mb-1"
              icon={<StarRoundedIcon style={{ color: '#ffffff' }} />}
              label="4.5"
              color="primary"
              variant="filled"
              style={{ color: '#ffffff' }}
            />
            <Typography variant="caption">4,509 Reviews</Typography>
            <div className="mt-3">
              <Button variant="outlined">
                {' '}
                <DirectionsRoundedIcon className="me-1" /> Direction
              </Button>
              <Button variant="outlined" className="mx-3">
                {' '}
                <ReplyRoundedIcon className="me-1" /> Share
              </Button>
              <Button variant="outlined">Reviews</Button>
            </div>
          </div>
        </Box>
      </div>

      <div className="container mt-3">
        <Tabs
          className="mb-4"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="All Categories" />
          <Tab label="Nike" />
          <Tab label="Addidas" />
          <Tab label="Clarks" />
          <Tab label="Seeandwear" />
          <Tab label="Woodland" />
          <Tab label="Lee Cooper" />
          <Tab label="Fila" />
          <Tab label="Puma" />
          <Tab label="Reebok" />
          <Tab label="Hush Puppies" />
          <Tab label="Crocs" />
          <Tab label="Prince" />
          <Tab label="Yonex" />
          <Tab label="Wilson" />
          <Tab label="Lotto" />
          <Tab label="New Balance" />
          <Tab label="Red tape" />
          <Tab label="Jack Wolfskin" />
          <Tab label="Lowa" />
          <Tab label="Sketchers" />
        </Tabs>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FormProvider methods={methods}>
              <ShopFilterSidebar
                onResetAll={handleResetFilter}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
              />
            </FormProvider>

            <ShopProductSort />
          </Stack>
        </Stack>

        <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{products.length}</strong>
                &nbsp;Products found
              </Typography>

              {/* <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                onRemoveGender={handleRemoveGender}
                onRemoveCategory={handleRemoveCategory}
                onRemoveColor={handleRemoveColor}
                onRemovePrice={handleRemovePrice}
                onRemoveRating={handleRemoveRating}
                onResetAll={handleResetFilter}
              /> */}
            </>
          )}
        </Stack>
        <ShopProductList products={products} loading={!products.length} />
      </div>
    </>
  );
};

export default StoreHome;
