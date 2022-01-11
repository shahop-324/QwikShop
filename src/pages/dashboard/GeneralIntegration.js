// @mui
import { Container, Grid, Typography, Button } from '@mui/material';
import styled from 'styled-components';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

// StyledComponent
const Card = styled.div`
  width: 100%;
  border-radius: 20px;
  border: 1px solid #21212126;
`;

const Logo = styled.img`
  height: 100px;
  border-radius: 20px;
`;

export default function GeneralIntegration() {
  const { user } = useAuth();
  const { themeStretch } = useSettings();

  return (
    <Page title="Integration">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://developers.google.com/analytics/images/terms/logo_lockup_analytics_icon_vertical_black_2x.png'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Google Analytics</Typography>
                  <Typography variant="p1">
                    Track your store visitors and improve your google ads conversion rate by targeting right customers
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Dunzo Hyperlocal delivery */}
            <Card className='p-2 mb-4'>
            <Grid container>
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://assets.dunzo.com/images/logo-512.png'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Dunzo Hyperlocal delivery</Typography>
                  <Typography variant="p1">
                    Ship your orders in your city without hassle with Dunzo
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://assets.website-files.com/5e6aa3e3f001fae105b8e1e7/60b3a2b884c6fc5ad9e08559_og-logo.png'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Drip campaign</Typography>
                  <Typography variant="p1">
                  Email and SMS marketing for growing ecommerce brands.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WhatsApp_logo-color-vertical.svg/2048px-WhatsApp_logo-color-vertical.svg.png'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">WhatsApp Chat Support</Typography>
                  <Typography variant="p1">
                   Allow your customers to talk to you directly through WhatsApp
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://www.drupal.org/files/project-images/MC_Logo.jpg'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Mailchmip</Typography>
                  <Typography variant="p1">
                  All-In-One integrated marketing platform for small businesses, to grow your business on your terms
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://avatars.githubusercontent.com/u/6585?s=280&v=4'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Intercom</Typography>
                  <Typography variant="p1">
                    Simple messenger for your online business
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://lh3.googleusercontent.com/nupo3HWMIUeuul9r2IBSfpBo568bL-STG9nA71dUuW97DnhAXFgm2WWjczhTFqRHQZRf5VA-_PmxIZaIAXhOUrzfr5unPjFuW9za=w0'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Google Adwords</Typography>
                  <Typography variant="p1">
                  Get in front of customers when they're searching for businesses like yours on Google everywhere.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://www.nopcommerce.com/images/thumbs/0015917_facebook-pixel-by-nopcommerce-team.png'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Facebook Pixel</Typography>
                  <Typography variant="p1">
                    Reach your target audience on Facebook and Instagram
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                style={{objectFit: "contain"}}
                className='me-3'
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRszSr2SP_0ucfNEHgzlNFyfYD1vlza3FKcMGUYqkbiIM5_9TxqCk-T9XKt1b6GwQFwfpE&usqp=CAU'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Privy</Typography>
                  <Typography variant="p1">
                    Track your store visitors and improve your google ads conversion rate by targeting right customers
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://cdn.worldvectorlogo.com/logos/google-merchant-center.svg'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Google Merchant Center</Typography>
                  <Typography variant="p1">
                    Track your store visitors and improve your google ads conversion rate by targeting right customers
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://cdn.worldvectorlogo.com/logos/google-search-console.svg'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Google Search Console</Typography>
                  <Typography variant="p1">
                    Track your store visitors and improve your google ads conversion rate by targeting right customers
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Google analytics */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Facebook domain verification</Typography>
                  <Typography variant="p1">
                    Track your store visitors and improve your google ads conversion rate by targeting right customers
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Pincode / Distance based delivery */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://qph.fs.quoracdn.net/main-qimg-4f15d8c9e38363aa8a518a834d8f733a'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Pincode / Distance based delivery</Typography>
                  <Typography variant="p1">
                    Track your store visitors and improve your google ads conversion rate by targeting right customers
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
              {/* Pincode / Distance based delivery */}
            <Card className='p-2 mb-4'>
            <Grid container >
              <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                <Logo
                className='me-3'
                  src={
                    'https://ps.w.org/hellobar/assets/icon-256x256.png?rev=1929259'
                  }
                />
                <div className="d-flex flex-column justify-content-center">
                  <Typography variant="h6">Hellobar</Typography>
                  <Typography variant="p1">
                    Track your store visitors and improve your google ads conversion rate by targeting right customers
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant='outlined' className='me-3'>Learn more</Button>
                  <Button variant='contained'>Install</Button>
              </Grid>
              </Grid>
            </Card>
             
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
