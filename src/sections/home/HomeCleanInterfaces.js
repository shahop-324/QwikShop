// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Container, Typography, useTheme } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';
import ThemePreview from "../../assets/theme-preview.png";
// ----------------------------------------------------------------------

const IMG = [...Array(10)].map(
  (_, index) => `https://minimal-assets-api.vercel.app/assets/images/home/clean-${index + 1}.png`
);

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    zIndex: 11,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function HomeCleanInterfaces() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container>
        
      <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 10, md: 25 },
          }}
        >
          <MotionInView variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              Website for your Business
            </Typography>
          </MotionInView>
          <MotionInView variants={varFade().inDown}>
            <Typography variant="h2">Beautiful, modern and powerful  Themes for your Business</Typography>
          </MotionInView>
        </Box>
        

        <Box sx={{ position: 'relative' }}>
         
            
              <Image
                disabledEffect
                visibleByDefault
                alt={`clean`}
                src={ThemePreview}
              />
           
          
        </Box>
      </Container>
    </RootStyle>
  );
}
