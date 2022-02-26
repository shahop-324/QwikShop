// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';
import ThemePreview from "../../assets/theme-preview.png";
// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));


// ----------------------------------------------------------------------

export default function HomeCleanInterfaces() {
  
  

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
