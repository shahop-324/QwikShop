// @mui
import { styled } from '@mui/material/styles';
import HomeTagLine from '../sections/home/HomeTagLine';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
} from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Create your online business in 15 Seconds">
      <RootStyle>
        <HomeHero />
        <ContentStyle>
          <HomeTagLine />

          <HomeHugePackElements />

          <HomeDarkMode />

          <HomeColorPresets />

          <HomeMinimal id="features" />

          <HomeCleanInterfaces />

          <HomePricingPlans />

          <HomeAdvertisement />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
