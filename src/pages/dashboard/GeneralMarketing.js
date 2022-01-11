// import { MarketingWelcome } from './../../sections/@dashboard/general/marketing/index';
// @mui
import { Grid, Container } from '@mui/material';
// Icons
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { BookingDetails, BookingWidgetSummary } from '../../sections/@dashboard/general/booking';
// assets
import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from '../../assets';

// sections
import { AnalyticsWidgetSummary } from '../../sections/@dashboard/general/analytics';

import { MarketingLessons, MarketingWelcome } from '../../sections/@dashboard/general/marketing/index';

// ----------------------------------------------------------------------

export default function GeneralBooking() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <MarketingWelcome />
          </Grid>
          <Grid item xs={12} md={4}>
            <MarketingLessons />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Weekly Sales" total={'SMS'} icon={<MessageRoundedIcon />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="New Users" total={'WhatsApp'} color="success" icon={<WhatsAppIcon />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Item Orders" total={'Google Ads'} color="error" icon={<GoogleIcon />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Bug Reports" total={'Facebook Ads'} color="info" icon={<FacebookIcon />} />
          </Grid>
          <Grid item xs={12} md={3}>
            <BookingWidgetSummary title="Total orders from marketing" total={714000} icon={<BookingIllustration />} />
          </Grid>
          <Grid item xs={12} md={3}>
            <BookingWidgetSummary title="Total sales from marketing" total={311000} icon={<CheckInIllustration />} />
          </Grid>
          <Grid item xs={12} md={3}>
            <BookingWidgetSummary title="Marketing cost" total={124000} icon={<CheckOutIllustration />} />
          </Grid>
          <Grid item xs={12} md={3}>
            <BookingWidgetSummary title="SMS Messages sent" total={124000} icon={<CheckOutIllustration />} />
          </Grid>
          <Grid item xs={12} md={3}>
            <BookingWidgetSummary title="WhatsApp Message sent" total={124000} icon={<CheckOutIllustration />} />
          </Grid>
          <Grid item xs={12} md={3}>
            <BookingWidgetSummary title="Google Ads Impression" total={124000} icon={<CheckOutIllustration />} />
          </Grid>
          <Grid item xs={12} md={3}>
            <BookingWidgetSummary title="Facebook Ads Impression" total={124000} icon={<CheckOutIllustration />} />
          </Grid>
          <Grid item xs={12}>
            <BookingDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
