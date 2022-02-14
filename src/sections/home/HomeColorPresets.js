import { capitalCase } from 'change-case';
import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Stack,
  Radio,
  Tooltip,
  Container,
  Typography,
  RadioGroup,
  CardActionArea,
  FormControlLabel,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';
import SellOnline from "../../assets/sell-online.png";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
}));

// ----------------------------------------------------------------------

export default function HomeColorPresets() {
  const { themeColorPresets, onChangeColor, colorOption } = useSettings();

  return (
    <RootStyle>
      <Container sx={{ position: 'relative', textAlign: 'center' }}>
        <MotionInView variants={varFade().inUp}>
          <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
           STEP 3
          </Typography>
        </MotionInView>

        <MotionInView variants={varFade().inUp}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Start Selling Online
          </Typography>
        </MotionInView>

        <MotionInView variants={varFade().inUp}>
          <Typography
            sx={{
              color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary'),
            }}
          >
            Boost your business with Best in class Ecommerce store
          </Typography>
        </MotionInView>

       

        <Box sx={{ position: 'relative' }}>
          <Image
          style={{height: "500px"}}
            disabledEffect
            alt="grid"
            src="https://minimal-assets-api.vercel.app/assets/images/home/theme-color/grid.png"
          />

          <Box sx={{ position: 'absolute', top: "50%", left: "50%", transform: 'translate(-50%, -50%)'  }}>
            <MotionInView variants={varFade().inUp}>
              <Image
              
                disabledEffect
                alt="screen"
                src={SellOnline}
              />
            </MotionInView>
          </Box>

          

          
        </Box>
      </Container>
    </RootStyle>
  );
}
