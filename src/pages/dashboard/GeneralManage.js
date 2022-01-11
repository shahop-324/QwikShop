import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';

// @mui
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { ManageWelcome, ManageLessons } from '../../sections/@dashboard/general/manage/index';
// sections
import { AnalyticsWidgetSummary } from '../../sections/@dashboard/general/analytics';

export default function GeneralManage() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
            <ManageWelcome  />
          </Grid>
          <Grid item xs={12} md={4}>
            <ManageLessons />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Store working timings"
              action="Edit timings"
              total={'Store timings'}
              icon={<AccessTimeRoundedIcon />}
              color={"info"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Store working timings"
              action="Edit timings"
              total={'Store QR Code'}
              icon={<QrCode2RoundedIcon />}
              color={"error"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Store working timings"
              action="Edit timings"
              total={'Manage Charges'}
              icon={<PointOfSaleRoundedIcon />}
              color={"success"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Store working timings"
              action="Edit timings"
              total={'Invoice Generator'}
              icon={<ReceiptRoundedIcon />}
              color={"secondary"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Store working timings"
              action="Edit timings"
              total={'Marketing Designs'}
              icon={<DesignServicesRoundedIcon />}
              color={"primary"}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
