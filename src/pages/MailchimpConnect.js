// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Stack } from '@mui/material';

// components

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainFooter from '../layouts/main/MainFooter';
import Page from '../components/Page';
import { connectMailchimp } from '../actions';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function MailchimpConnect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

  const dispatch = useDispatch();

  const { store } = useSelector((state) => state.store);

  console.log(store);

  useEffect(() => {
      setTimeout(() => {
        dispatch(connectMailchimp(store._id, code));
      }, 2000);
    
  }, [store]);

  return (
    <Page title="Mailchimp">
      <RootStyle>
        <Container>
          <Typography variant="h3" align="center" paragraph>
            Connecting Mailchimp
            <br /> With QwikShop
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Please do not close this window...
          </Typography>

          <Stack alignItems="center" justifyContent="center" sx={{ my: 5 }}>
            {/* {} */}
            <img
              style={{ height: '400px' }}
              src="https://logos-world.net/wp-content/uploads/2021/02/Mailchimp-Logo.png"
              alt="mailchimp qwikshop integration"
            />
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}
