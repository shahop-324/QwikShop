import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';

import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';

// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, IconButton } from '@mui/material';
import { SeoIllustration } from '../../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string,
};

export default function AppWelcome({ displayName }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h4">
          Welcome back,
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          Here's your store link, <a href="#">qwikshop.online/vastralaya</a>
        </Typography>

        <span>Share via</span>

        <Stack direction="row" spacing={2}>
          <IconButton>
            {' '}
            <WhatsappRoundedIcon style={{ color: '#25D366' }} />{' '}
          </IconButton>
          <IconButton>
            <FacebookRoundedIcon style={{ color: '#4267B2' }} />
          </IconButton>
          <IconButton>
            <TwitterIcon style={{ color: '#1DA1F2' }} />
          </IconButton>
        </Stack>

        {/* <Button variant="contained" to="#" component={RouterLink}>
          Go Now
        </Button> */}
      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      />
    </RootStyle>
  );
}
