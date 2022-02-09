// React select
import React, { useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import { Container, Grid, Typography } from '@mui/material';

// hooks
import { useDispatch } from 'react-redux';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { AbondonedCartDetails } from '../../sections/@dashboard/general/booking';
import { fetchAbondonedCarts } from '../../actions';

export default function GeneralOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAbondonedCarts());
  }, []);

  const { themeStretch } = useSettings();

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
            <AbondonedCartDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
