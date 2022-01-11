

// @mui
import { styled, alpha } from '@mui/material/styles';
import { Card, Stack, Typography, Button, OutlinedInput, CardContent, IconButton } from '@mui/material';

import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';

// components
import Image from '../../../../components/Image';



// ----------------------------------------------------------------------

const ContentStyle = styled(Card)(({ theme }) => ({
  marginTop: -120,
  boxShadow: 'none',
  padding: theme.spacing(5),
  paddingTop: theme.spacing(16),
  color: theme.palette.common.white,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
}));

// ----------------------------------------------------------------------

export default function BankingInviteFriends() {
  return (
    <div>
      <Image
        visibleByDefault
        disabledEffect
        src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_invite.png"
        sx={{
          left: 40,
          zIndex: 9,
          width: 140,
          position: 'relative',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
        }}
      />
      <ContentStyle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">
            Invite friends <br /> and earn
          </Typography>
          <Typography variant="h2">Rs.100</Typography>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
          You get Rs. 100 when your friend makes sales worth Rs. 10,000
        </Typography>

        <span>Invite via</span>

        <Stack direction="row" spacing={2}>
          <IconButton>
            {' '}
            <WhatsappRoundedIcon style={{ color: '#FFFFFF' }} />{' '}
          </IconButton>
          <IconButton>
            <FacebookRoundedIcon style={{ color: '#FFFFFF' }} />
          </IconButton>
          <IconButton>
            <TwitterIcon style={{ color: '#FFFFFF' }} />
          </IconButton>
        </Stack>

      </ContentStyle>
    </div>
  );
}
