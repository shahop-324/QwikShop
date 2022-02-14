// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import LanguageIcon from '@mui/icons-material/Language';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BoltIcon from '@mui/icons-material/Bolt';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneAndroidRounded from '@mui/icons-material/PhoneAndroidRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import { MotionInView, varFade } from '../../components/animate';
import Image from '../../components/Image';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_design.svg',
    title: 'Custom Marketing',
    description:
      'Using Qwikshop you can send custom marketing SMS and emails to your customers, which is a proven way to increase your sales by 65%.',
  },
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_code.svg',
    title: 'Unique Themes',
    description:
      'Get your Business a theme which suits it Best. QwikShop Gives you the power to choose your theme based on your type of Business.',
  },
  {
    isIcon: true,
    icon: (
      <LanguageIcon
        sx={{
          mb: 10,
          mx: 'auto',
          width: 40,
          height: 40,
        }}
      />
    ),
    title: 'Custom Domain & Email',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    isIcon: true,
    icon: (
      <CurrencyRupeeIcon
        sx={{
          mb: 10,
          mx: 'auto',
          width: 40,
          height: 40,
        }}
      />
    ),
    title: 'Online Payments',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {

    isIcon: true,
    icon: (
      <BoltIcon
        sx={{
          mb: 10,
          mx: 'auto',
          width: 40,
          height: 40,
        }}
      />
    ),
    title: 'Integrations',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    isIcon: true,
    icon: (
      <CategoryIcon sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
      }} />
    ),
    title: 'Product Catalouge',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    isIcon: true,
    icon: (
      <LocalShippingRounded sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
      }} />
    ),
    title: 'Delivery',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    isIcon: true,
    icon: (
      <MonetizationOnIcon sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
      }} />
    ),
    title: 'Super cash',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    
    isIcon: true,
    icon: (
      <LocalOfferIcon sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
      }} />
    ),
    title: 'Discount Coupons',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    isIcon: true,
    icon: (
      <PeopleIcon sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
      }} />
    ),
    title: 'Referral',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    icon: (
      <RateReviewIcon sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
      }} />
    ),
    isIcon: true,
    title: 'Reviews & Questions',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    isIcon: true,
    icon: (
      <ShoppingCartIcon sx={{mb: 10, mx: 'auto', width: 40, height: 40,}} />
    ),
    title: 'Variant Based Pricing',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    isIcon: true,
    icon: (
      <WebRoundedIcon sx={{mb: 10, mx: 'auto', width: 40, height: 40,}} />
    ),
    title: 'Website Builder',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    isIcon: true,
    icon: (
      <RemoveShoppingCartRoundedIcon sx={{mb: 10, mx: 'auto', width: 40, height: 40,}} />
    ),
    title: 'Abondoned Cart',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
  {
    isIcon: true,
    icon: (
      <PhoneAndroidRounded sx={{mb: 10, mx: 'auto', width: 40, height: 40,}} />
    ),
    title: 'Mobile APK',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to QwikShop Premium.',
  },
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: theme.customShadows.z12,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 },
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

// ----------------------------------------------------------------------

export default function HomeMinimal() {
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
              QwikShop
            </Typography>
          </MotionInView>
          <MotionInView variants={varFade().inDown}>
            <Typography variant="h2">Easiest and Powerful way to sell online</Typography>
          </MotionInView>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 5, lg: 10 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {CARDS.map((card, index) => (
            <MotionInView variants={varFade().inUp} key={card.title}>
              <CardStyle className={(index === 0 && 'cardLeft') || (index === 1 && 'cardCenter') || ''}>
                {card.isIcon ? (
                  card.icon
                ) : (
                  <Image
                    src={card.icon}
                    alt={card.title}
                    sx={{
                      mb: 10,
                      mx: 'auto',
                      width: 40,
                      height: 40,
                      filter: (theme) => shadowIcon(theme.palette.primary.main),
                      ...(index === 0 && {
                        filter: (theme) => shadowIcon(theme.palette.info.main),
                      }),
                      ...(index === 1 && {
                        filter: (theme) => shadowIcon(theme.palette.error.main),
                      }),
                    }}
                  />
                )}

                <Typography variant="h5" paragraph>
                  {card.title}
                </Typography>
                <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>{card.description}</Typography>
              </CardStyle>
            </MotionInView>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
