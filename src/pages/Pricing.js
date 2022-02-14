// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Switch, Container, Typography, Stack } from '@mui/material';

// components
import Page from '../components/Page';
// sections
import { PricingPlanCard } from '../sections/pricing';

import Monthly from "../assets/Monthly.png";
import Yearly from "../assets/Yearly.png";
import Lifetime from "../assets/Lifetime.png";
import MainFooter from '../layouts/main/MainFooter';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const _pricingPlans = [
  {
    // plan_id: 'plan_IuHueHvdocQGNB',
    plan_id: 'plan_IuNPJh0qpUQ1G8',
    cycle: 'mo',
    subscription: 'Monthly',
    img: Monthly,
    price: 300,
    caption: 'Per month',
    lists: [
      { text: '15 Stores', isAvailable: true },
      { text: '25 Staff Member / Store', isAvailable: true },
      { text: 'Custom Domain & Email', isAvailable: true },
      { text: 'All Premium Themes', isAvailable: true },
      { text: 'Custom Marketing Messages', isAvailable: true },
      { text: 'Unlimited Discounts', isAvailable: true },
      { text: 'Customer Reviews', isAvailable: true },
      { text: 'Customer Questions', isAvailable: true },
      { text: 'Custom pages & Menus', isAvailable: true },
      { text: 'Super coins', isAvailable: true },
      { text: 'Unlimited Referrals', isAvailable: true },
      { text: 'Store Management', isAvailable: true },
      { text: 'Customer Management', isAvailable: true },
      { text: 'Unlimited Variants', isAvailable: true },
      { text: 'Wholesale pricing', isAvailable: true },
      { text: 'Unlimited Order', isAvailable: true },
      { text: 'Catalouge (Product, Category)', isAvailable: true },
      { text: 'Catalouge (Sub category, Division)', isAvailable: true },
      { text: 'Unlimited Products', isAvailable: true },
      { text: 'Delivery', isAvailable: true },
      { text: 'All Integrations', isAvailable: true },
      { text: 'Chat, Email & Call Support', isAvailable: true },
      
      { text: '3% Transaction Charge', isAvailable: true },
    ],
    labelAction: 'Choose Monthly',
  },
  {
    plan_id: 'plan_IuHvbpfEipw5i6',
    cycle: 'yr',
    subscription: 'Yearly',
    img: Yearly,
    price: 2400,
    caption: 'saving Rs. 1200 a year',
    lists: [
      { text: '15 Stores', isAvailable: true },
      { text: '25 Staff Member / Store', isAvailable: true },
      { text: 'Custom Domain & Email', isAvailable: true },
      { text: 'All Premium Themes', isAvailable: true },
      { text: 'Custom Marketing Messages', isAvailable: true },
      { text: 'Unlimited Discounts', isAvailable: true },
      { text: 'Customer Reviews', isAvailable: true },
      { text: 'Customer Questions', isAvailable: true },
      { text: 'Custom pages & Menus', isAvailable: true },
      { text: 'Super coins', isAvailable: true },
      { text: 'Unlimited Referrals', isAvailable: true },
      { text: 'Store Management', isAvailable: true },
      { text: 'Customer Management', isAvailable: true },
      { text: 'Unlimited Variants', isAvailable: true },
      { text: 'Wholesale pricing', isAvailable: true },
      { text: 'Unlimited Order', isAvailable: true },
      { text: 'Catalouge (Product, Category)', isAvailable: true },
      { text: 'Catalouge (Sub category, Division)', isAvailable: true },
      { text: 'Unlimited Products', isAvailable: true },
      { text: 'Delivery', isAvailable: true },
      { text: 'All Integrations', isAvailable: true },
      { text: 'Chat, Email & Call Support', isAvailable: true },
      { text: '1.5% Transaction Charge', isAvailable: true },
    ],
    labelAction: 'choose starter',
  },
  {
    plan_id: 'plan_IuHx2o2i0gKaUJ',
    cycle: 'lifetime',
    subscription: 'Lifetime',
    img: Lifetime,
    price: 15000,
    caption: 'Valid for 60 Years (0.68 Rs. / day)',
    lists: [
      { text: '15 Stores', isAvailable: true },
      { text: '25 Staff Member / Store', isAvailable: true },
      { text: 'Custom Domain & Email', isAvailable: true },
      { text: 'All Premium Themes', isAvailable: true },
      { text: 'Custom Marketing Messages', isAvailable: true },
      { text: 'Unlimited Discounts', isAvailable: true },
      { text: 'Customer Reviews', isAvailable: true },
      { text: 'Customer Questions', isAvailable: true },
      { text: 'Custom pages & Menus', isAvailable: true },
      { text: 'Super coins', isAvailable: true },
      { text: 'Unlimited Referrals', isAvailable: true },
      { text: 'Store Management', isAvailable: true },
      { text: 'Customer Management', isAvailable: true },
      { text: 'Unlimited Variants', isAvailable: true },
      { text: 'Wholesale pricing', isAvailable: true },
      { text: 'Unlimited Order', isAvailable: true },
      { text: 'Catalouge (Product, Category)', isAvailable: true },
      { text: 'Catalouge (Sub category, Division)', isAvailable: true },
      { text: 'Unlimited Products', isAvailable: true },
      { text: 'Delivery', isAvailable: true },
      { text: 'All Integrations', isAvailable: true },
      { text: 'Chat, Email & Call Support', isAvailable: true },
      { text: '1% Transaction Charge', isAvailable: true },
    ],
    labelAction: 'choose premium',
  },
];

// ----------------------------------------------------------------------

export default function Pricing() {
  return (
    <Page title="Pricing">
      <RootStyle>
        <Container>
          <Typography variant="h3" align="center" paragraph>
            Flexible plans for your
            <br /> Business&apos;s size and needs
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Choose your plan and experience modern online Ecommerce 
          </Typography>

          <Box sx={{ my: 5 }}>
            {/* {} */}
          </Box>

          <Grid container spacing={3} sx={{my:5}}>
            {_pricingPlans.map((card, index) => {
              console.log(card);
              return (
              <Grid item xs={12} md={4} key={card.subscription}>
                <PricingPlanCard isHome card={card} index={index} />
              </Grid>
            )})}
          </Grid>
          
        </Container>
        <MainFooter />
      </RootStyle>
    </Page>
  );
}
