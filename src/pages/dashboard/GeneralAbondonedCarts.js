// React select
import React, { useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import { Container, Grid, Typography, Card, IconButton } from '@mui/material';

// hooks
import { useDispatch, useSelector } from 'react-redux';
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
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { AbondonedCartDetails } from '../../sections/@dashboard/general/booking';
import { fetchAbondonedCarts } from '../../actions';
import NoAbondonedCart from '../../assets/empty-cart.png';

export default function GeneralOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAbondonedCarts());
  }, []);

  const { abondonedCarts } = useSelector((state) => state.order);

  const { themeStretch } = useSettings();

  const { store } = useSelector((state) => state.store);

  const storeName = store.name;
  const link = `qwikshop.online/${store.subName}`;

  return (
    <Page title="Orders List">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" className="mb-4 d-flex flex-row align-items-center justify-content-between">
              <Typography variant="h6">Abondoned Carts</Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            {!(typeof abondonedCarts !== 'undefined' && abondonedCarts.length > 0) ? (
              <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                <Card sx={{ p: 3, my: 3 }}>
                  <img style={{ height: '150px', width: '150px' }} src={NoAbondonedCart} alt="no abondoned cart" />
                </Card>
                <Typography sx={{ mb: 3 }} variant="subtitle2">
                  There are no Abondoned carts in your store
                </Typography>
              </Stack>
            ) : (
              <AbondonedCartDetails />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
