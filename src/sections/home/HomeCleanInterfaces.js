// @mui
import 'react-phone-number-input/style.css';
import {useState} from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button, Stack} from '@mui/material';
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';

import PhoneInput from 'react-phone-number-input';
import CustomPhoneNumber from '../../forms/PhoneNumber';
// components
import Image from '../../components/Image';
// Phone Input

// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));


// ----------------------------------------------------------------------

export default function HomeCleanInterfaces() {
  
  const [phone, setPhone] = useState('');

  return (
    <RootStyle>
      <Container>
        
      <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 10, md: 15 },
          }}
        >
         
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              Built for all Business types
            </Typography>
         
         
            <Typography variant="h3">Beautiful, modern and powerful  Themes for your Business</Typography>
         
        </Box>
        

        <Box >
         
            
              <Image
                // disabledEffect
                // visibleByDefault
                alt={`clean`}
                src={`https://qwikshop.s3.ap-south-1.amazonaws.com/theme-preview.png`}
              />
           
          
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            mt: 10,
            
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={4}>
          <PhoneInput
          width={'400px'}
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={phone}
                  onChange={setPhone}
                  inputComponent={CustomPhoneNumber}
                  defaultCountry="IN"
                />
          <Button startIcon={<StoreMallDirectoryRoundedIcon />} variant='contained' size="large">Create my store</Button>
          </Stack>
           
        </Box>
      </Container>
    </RootStyle>
  );
}
