import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
// hooks
import { useDispatch } from 'react-redux';
import StoreSetup from '../../Dialogs/StoreSetup';
import StoreImage from '../../Dialogs/StoreImage';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { AppWelcome, AppFeatured } from '../../sections/@dashboard/general/home';

// sections
import {
  BankingContacts,
  BankingInviteFriends,
  BankingRecentTransitions,
  BankingExpensesCategories,
} from '../../sections/@dashboard/general/banking';

import { EcommerceWidgetSummary } from '../../sections/@dashboard/general/orders';
import { stopLoginBtnLoader } from '../../actions';
import StoreCreated from '../../Dialogs/StoreCreated';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const [openStoreSetup, setOpenStoreSetup] = useState(true);

  const [openStoreImage, setOpenStoreImage] = useState(false);

  const [openStoreCreated, setOpenStoreCreated] = useState(false);

  const handleOpenStoreCreated = () => {
    setOpenStoreCreated(true);
  }

  const handleCloseStoreCreated = () => {
    setOpenStoreCreated(false);
  }

  const handleOpenStoreImage = () => {
    setOpenStoreImage(true);
  }

  const handleCloseStoreImage = () => {
    setOpenStoreImage(false);
  }

  const handleCloseStoreSetup = () => {
    setOpenStoreSetup(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stopLoginBtnLoader());
  }, []);

  let user;
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <>
      <Page title="General: App">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <AppWelcome displayName={user?.displayName} />
            </Grid>

            <Grid item xs={12} md={4}>
              <AppFeatured />
            </Grid>

            <Grid item xs={12} md={4}>
              <EcommerceWidgetSummary
                title="Product Sold"
                percent={2.6}
                total={765}
                chartColor={theme.palette.primary.main}
                chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <EcommerceWidgetSummary
                title="Total Balance"
                percent={-0.1}
                total={18765}
                chartColor={theme.palette.chart.green[0]}
                chartData={[56, 47, 40, 62, 73, 30, 23, 54, 67, 68]}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <EcommerceWidgetSummary
                title="Total customers"
                percent={0.6}
                total={4876}
                chartColor={theme.palette.chart.red[0]}
                chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <BankingRecentTransitions />

                <BankingExpensesCategories />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <BankingContacts />

                <BankingInviteFriends />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Page>
      {openStoreSetup && <StoreSetup open={openStoreSetup} handleClose={handleCloseStoreSetup} handleOpenStoreImage={handleOpenStoreImage} />}
      {openStoreImage && <StoreImage open={openStoreImage} handleClose={handleCloseStoreImage} handleOpenStoreCreated={handleOpenStoreCreated} />}
      {openStoreCreated && <StoreCreated open={openStoreCreated} handleClose={handleCloseStoreCreated}  />}
    </>
  );
}
