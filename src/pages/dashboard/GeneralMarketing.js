import React, { useState } from 'react';
// import { MarketingWelcome } from './../../sections/@dashboard/general/marketing/index';
// @mui
import { Grid, Container } from '@mui/material';
// Icons
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
// hooks
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { BookingWidgetSummary, MarketingCampaignDetails } from '../../sections/@dashboard/general/booking';
// assets
import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from '../../assets';

// sections
import { AnalyticsWidgetSummary } from '../../sections/@dashboard/general/analytics';

import { MarketingLessons, MarketingWelcome } from '../../sections/@dashboard/general/marketing/index';
import CreateSMSCampaign from '../../Dialogs/CreateSMSCampaign';
import CreateEmailCampaign from '../../Dialogs/CreateEmailCampaign';
import CreateGoogleAdsCampaign from '../../Dialogs/CreateGoogleAdsCampaign';
import CreateFacebookAdsCampaign from '../../Dialogs/CreateFacebookAdsCampaign';
import DesignEmailCampaign from '../../Dialogs/Marketing/DesignEmailCampaign';

// ----------------------------------------------------------------------

export default function GeneralBooking() {
  const { themeStretch } = useSettings();

  const [openCreateSMSCampaign, setOpenCreateSMSCampaign] = useState(false);
  const [openCreateEmailCampaign, setOpenCreateEmailCampaign] = useState(false);
  const [openCreateGoogleAdsCampaign, setOpenCreateGoogleAdsCampaign] = useState(false);
  const [openCreateFacebookAdsCampaign, setOpenCreateFacebookAdsCampaign] = useState(false);

  const handleOpenCreateSMSCampaign = () => {
    setOpenCreateSMSCampaign(true);
  };

  const handleCloseCreateSMSCampaign = () => {
    setOpenCreateSMSCampaign(false);
  };

  const handleOpenCreateEmailCampaign = () => {
    setOpenCreateEmailCampaign(true);
  };

  const handleCloseCreateEmailCampaign = () => {
    setOpenCreateEmailCampaign(false);
  };

  const handleOpenCreateGoogleAdsCampaign = () => {
    setOpenCreateGoogleAdsCampaign(true);
  };

  const handleCloseCreateGoogleAdsCampaign = () => {
    setOpenCreateGoogleAdsCampaign(false);
  };

  const handleOpenCreateFacebookAdsCampaign = () => {
    setOpenCreateFacebookAdsCampaign(true);
  };

  const handleCloseCreateFacebookAdsCampaign = () => {
    setOpenCreateFacebookAdsCampaign(false);
  };

  return (
    <div>
      <Page title="Marketing">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <MarketingWelcome />
            </Grid>
            <Grid item xs={12} md={4}>
              <MarketingLessons />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                action={handleOpenCreateSMSCampaign}
                title="Create Campaign"
                total={'SMS'}
                icon={<MessageRoundedIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                action={handleOpenCreateEmailCampaign}
                title="Create Campaign"
                total={'Email'}
                color="warning"
                icon={<MailRoundedIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                comingSoon
                action={handleOpenCreateGoogleAdsCampaign}
                title="Create Campaign"
                total={'Google Ads'}
                color="error"
                icon={<GoogleIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                comingSoon
                action={handleOpenCreateFacebookAdsCampaign}
                title="Create Campaign"
                total={'Facebook Ads'}
                color="info"
                icon={<FacebookIcon />}
              />
            </Grid>
           
          </Grid>

          <MarketingCampaignDetails />
        </Container>
      </Page>

      {openCreateSMSCampaign && (
        <CreateSMSCampaign open={openCreateSMSCampaign} handleClose={handleCloseCreateSMSCampaign} />
      )}
      {openCreateEmailCampaign && (
        // <CreateEmailCampaign open={openCreateEmailCampaign} handleClose={handleCloseCreateEmailCampaign} />
        <DesignEmailCampaign open={openCreateEmailCampaign} handleClose={handleCloseCreateEmailCampaign} />
      )}
      {openCreateGoogleAdsCampaign && (
        <CreateGoogleAdsCampaign open={openCreateGoogleAdsCampaign} handleClose={handleCloseCreateGoogleAdsCampaign} />
      )}
      {openCreateFacebookAdsCampaign && (
        <CreateFacebookAdsCampaign
          open={openCreateFacebookAdsCampaign}
          handleClose={handleCloseCreateFacebookAdsCampaign}
        />
      )}
    </div>
  );
}
