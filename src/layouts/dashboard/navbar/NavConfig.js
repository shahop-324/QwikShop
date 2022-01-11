import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Home', path: PATH_DASHBOARD.general.home, icon: <HomeRoundedIcon /> },
      { title: 'Order', path: PATH_DASHBOARD.general.order, icon: <ShoppingBagRoundedIcon /> },
      {
        title: 'Catalouge',
        path: PATH_DASHBOARD.catalouge.root,
        icon: <CategoryRoundedIcon />,
        children: [
          { title: 'product', path: PATH_DASHBOARD.catalouge.product },
          { title: 'category', path: PATH_DASHBOARD.catalouge.category },
        ],
      },
      { title: 'Delivery', path: PATH_DASHBOARD.general.delivery, icon: <LocalShippingRoundedIcon /> },
      { title: 'Customer', path: PATH_DASHBOARD.general.customer, icon: <GroupsRoundedIcon /> },
      { title: 'Marketing', path: PATH_DASHBOARD.general.marketing, icon: <CampaignRoundedIcon /> },
      { title: 'Payment', path: PATH_DASHBOARD.general.payment, icon: <AccountBalanceWalletRoundedIcon /> },
      { title: 'Discount', path: PATH_DASHBOARD.general.discount, icon: <LocalOfferRoundedIcon /> },
      { title: 'Manage', path: PATH_DASHBOARD.general.manage, icon: <ManageAccountsRoundedIcon /> },
      {
        title: 'Store',
        path: PATH_DASHBOARD.store.root,
        icon: <StoreRoundedIcon />,
        children: [
          { title: 'settings', path: PATH_DASHBOARD.store.settings },
          { title: 'theme', path: PATH_DASHBOARD.store.theme },
          { title: 'pages', path: PATH_DASHBOARD.store.pages },
          { title: 'menus', path: PATH_DASHBOARD.store.menus },
        ],
      },
      {
        title: 'Integrations',
        path: PATH_DASHBOARD.general.integration,
        icon: <ExtensionRoundedIcon />,
      },
      // MANAGEMENT : E-COMMERCE
    ],
  },
];

export default navConfig;
