
// @mui
import { Grid, Container, Stack, IconButton } from '@mui/material';

// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {PaymentsLessons, PaymentsWelcome} from '../../sections/@dashboard/general/payments/index';
// sections
import { AnalyticsWidgetSummary } from '../../sections/@dashboard/general/analytics';

import QwikPay from "../../assets/QwikPay.png";
import COD from "../../assets/COD.png";
import Razorpay from "../../assets/Razorpay.svg";


export default function GeneralPayment() {
  const { themeStretch } = useSettings();

 

  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          

        <Grid item xs={12} md={8}>
            <PaymentsWelcome />
          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentsLessons />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Store working timings"
              action="Edit timings"
              total={'QwikPay'}
              icon={<img src={QwikPay} alt="QwikPay" />}
              // img={QwikPay}
              color={"success"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Store working timings"
              action="Edit timings"
              total={'Razorpay'}
              icon={<img src={Razorpay} alt="Razorpay" />}
              // img={Razorpay}
              color={"info"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Store working timings"
              action="Edit timings"
              total={'Cash on delivery'}
              icon={<img src={COD} alt="cash on delivery" />}
              
              color={"warning"}
            />
          </Grid>
          
         
        </Grid>
      </Container>
    </Page>
  );
}
