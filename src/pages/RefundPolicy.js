// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Switch, Container, Typography, Stack } from '@mui/material';
// _mock_
import { _pricingPlans } from '../_mock';
// components
import Page from '../components/Page';
// sections
import { PricingPlanCard } from '../sections/pricing';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function RefundPolicy() {
  return (
    <Page title="Refund Policy">
      <RootStyle>
        <Container>
          <Typography sx={{mb: 5, pb: 5}} variant="h3" align="center" paragraph>
           Refund Policy
            
          </Typography>
          

          

          <Grid container spacing={3}>
            {/*  */}
            <Stack>
            <h1 style={{marginBottom: "30px"}}>Refund policy</h1>
<p>We’re so convinced you’ll absolutely love our services, that we’re willing to offer a 14 day risk-free money back guarantee. If you are not satisfied with the service for any reason you can get a refund within 14 days of making a purchase.</p>
            </Stack>
            
            <Stack>
            <h2 style={{marginBottom: "30px"}}>Additional services</h2>
<p>Please note that any additional services, custom work or technical support are non-refundable as our time cannot be recovered.</p>
            </Stack>

            <Stack>

            <h2 style={{marginBottom: "30px"}}>Contacting us</h2>
<p>If you have any questions, concerns, or complaints regarding this refund policy, we encourage you to contact us using the details below:</p>
<p><a target="_blank" rel="nofollow noreferrer" href="https://www.qwikshop.online/contact-us">contact-us</a><br/>s&#117;&#112;po&#114;t&#64;q&#119;&#105;kshop.&#111;&#110;l&#105;n&#101;<br/>EE 738 Deen dayal Nagar, Gwalior, M.P. 474020, India</p>
<p>This document was last updated on February 14, 2022</p>

            </Stack>


          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
