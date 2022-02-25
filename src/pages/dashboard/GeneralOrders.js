// React select
import { useState, useEffect } from 'react';
// @mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { styled, alpha } from '@mui/material/styles';
import { Container, Grid, Card, Typography, IconButton } from '@mui/material';

import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

// ----------------------------------------------------------------------
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// hooks
import { useDispatch, useSelector } from 'react-redux';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { OrderDetails } from '../../sections/@dashboard/general/booking';
import { fetchOrders } from '../../actions';

import NoOrder from '../../assets/shopping-basket.png';

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

export default function GeneralOrders() {
  const dispatch = useDispatch();

  const [term, setTerm] = useState('');
  const {store} = useSelector((state) => state.store);
  const {orders} = useSelector((state) => state.order);

  const storeName = store.name 
  const link = `qwikshop.online/${store.subName}`

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchOrders(term));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const { themeStretch } = useSettings();

  return (
    <Page title="Orders List">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" className="mb-4 d-flex flex-row align-items-center justify-content-between">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={(e) => {
                    setTerm(e.target.value);
                  }}
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Stack>
          </Grid>

          <Grid item xs={12}>
          {!(typeof orders !== 'undefined' && orders.length > 0) ? (
            <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
              <Card sx={{ p: 3, my: 3 }}>
                <img style={{ height: '150px', width: '150px' }} src={NoOrder} alt="no active order" />
              </Card>
              <Typography sx={{ mb: 3 }} variant="subtitle2">
                Please share your store to get orders
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <IconButton>
                  <WhatsappShareButton url={link} title={storeName} separator=":">
                    {' '}
                    <WhatsappIcon round size={35} />{' '}
                  </WhatsappShareButton>
                </IconButton>
                <IconButton>
                  <FacebookShareButton url={link} quote={storeName}>
                    <FacebookIcon round size={35} />
                  </FacebookShareButton>
                </IconButton>
                <IconButton>
                  <TelegramShareButton url={link} title={storeName}>
                    <TelegramIcon round size={35} />
                  </TelegramShareButton>
                </IconButton>
                <IconButton>
                  <TwitterShareButton url={link} title={storeName}>
                    <TwitterIcon round size={35} />
                  </TwitterShareButton>
                </IconButton>
              </Stack>
            </Stack>
          ) :  <OrderDetails /> }
           
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
