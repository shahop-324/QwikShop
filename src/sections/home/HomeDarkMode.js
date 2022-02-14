// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';
import AddProducts from "../../assets/add-products.png";
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(28, 0),
  backgroundColor: theme.palette.grey[900],
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
}));

// ----------------------------------------------------------------------

export default function HomeDarkMode() {
  return (
    <RootStyle>
      <Container sx={{ position: 'relative', pb: 10 }}>
        <Image
          visibleByDefault
          disabledEffect
          alt="image shape"
          src={"https://minimal-assets-api.vercel.app/assets/images/home/shape.svg"}
          sx={{
            top: 0,
            right: 0,
            bottom: 0,
            width: 720,
            height: 720,
            opacity: 0.48,
            my: 'auto',
            position: 'absolute',
            display: { xs: 'none', md: 'block' },
          }}
        />

        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <ContentStyle>
              <MotionInView variants={varFade().inUp}>
                <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
                  STEP 2
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Typography variant="h2" sx={{ mb: 3, color: 'common.white' }}>
                  Add Products
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Typography sx={{ color: 'common.white', mb: 5 }}>
                  Set pricing, Create Catalouge and share your store
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={7} sx={{ position: 'relative' }}>
            

            <MotionInView threshold={0.5} variants={varFade().inDown} sx={{ top: 0, left: 0, position: 'absolute' }}>
              <Image
              style={{height: "500px"}}
                disabledEffect
                alt="dark mode"
                src={AddProducts}
              />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
