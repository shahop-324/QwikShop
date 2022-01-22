// {/* 1. Theme */}
// {/* 2. Ambience */}
// {/* 3. Color */}
// {/* 4. Store banners */}
// {/* 5. Other Info */}

// Return Offered
// Return period
// Delivery happens within
// Free Delivery Above
// Store Banners

import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// hooks
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

// sections

// Icons
import FormatColorFillRoundedIcon from '@mui/icons-material/FormatColorFillRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

// components
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import useSettings from '../../../hooks/useSettings';
import StoreAppearance from './Website/Appearance';
import StoreOtherInfo from './Website/OtherInfo';
import StoreAmbience from "./Website/Ambience";

// ----------------------------------------------------------------------

export default function StoreWebsite() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Appearance');

  const ACCOUNT_TABS = [
    {
      value: 'Appearance',
      icon: <FormatColorFillRoundedIcon width={20} height={20} />,
      component: <StoreAppearance />,
    },
    {
      value: 'Ambience',
      icon: <LightModeRoundedIcon width={20} height={20} />,
      component: <StoreAmbience />,
    },
    {
      value: 'Other Info',
      icon: <InfoRoundedIcon width={20} height={20} />,
      component: <StoreOtherInfo />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
