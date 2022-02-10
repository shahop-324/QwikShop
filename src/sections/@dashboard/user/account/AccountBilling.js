/* eslint-disable import/no-duplicates */
import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Box,
  Grid,
  Card,
  Button,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
//
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
import { PricingPlanCard } from '../../../pricing';
import Monthly from '../../../../assets/Monthly.png';
import Yearly from '../../../../assets/Yearly.png';
import Lifetime from '../../../../assets/Lifetime.png';

// ----------------------------------------------------------------------

AccountBilling.propTypes = {
  addressBook: PropTypes.array,
  cards: PropTypes.array,
  invoices: PropTypes.array,
};

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

export default function AccountBilling({ cards, addressBook, invoices }) {
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={5}>

<Grid container spacing={3} sx={{ mt: 3, mx: 2 }}>
<Card sx={{ p: 3, mx: 3, width:"100%" }}>
            <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
              Your Plan
            </Typography>
            <Stack direction="row" alignItems={"center"} justifyContent="space-between">
            <Typography variant="h4">Premium</Typography>
            <Typography variant="body2" sx={{ mr: 1 }}>Expires At: 24/07/22</Typography>
            </Stack>
           
            <Box
              sx={{
                mt: { xs: 2, sm: 0 },
                position: { sm: 'absolute' },
                top: { sm: 24 },
                right: { sm: 24 },
              }}
            >
              <Button size="small" color="inherit" variant="outlined" sx={{ mr: 1 }}>
                Cancel subscription
              </Button>
            </Box>
          </Card>
</Grid>

      <Grid container spacing={3} sx={{ mt: 3, mx: 2 }}>
        {_pricingPlans.map((card, index) => {
          console.log(card);
          return (
            <Grid item xs={12} md={4} key={card.subscription}>
              <PricingPlanCard card={card} index={index} />
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Typography variant="subtitle1" sx={{ width: 1 }}>
            Frequently Asked Questions
          </Typography>
          <div>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                  blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                  blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                <Typography>Disabled Accordion</Typography>
              </AccordionSummary>
            </Accordion>
          </div>
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
}
