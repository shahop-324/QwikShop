// @mui
import { styled, alpha } from '@mui/material/styles';
import { Card, Stack, Typography, Button, OutlinedInput, CardContent, IconButton } from '@mui/material';

import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';

// components
import { useSelector } from 'react-redux';
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
  const { user } = useSelector((state) => state.user);

  const {referralCode} = user;

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
          You and your friend both gets Rs.100, whic can be used to get QwikShop Premium and marketing.
        </Typography>

        <span style={{}} className="mb-4">
          Your invite code
        </span>

        <Card sx={{ px: 2, py: 2, mt: 2 }}>
          <Typography variant="h5" color="grey">
            {referralCode}
          </Typography>
        </Card>
      </ContentStyle>
    </div>
  );
}
