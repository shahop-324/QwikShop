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
    subheader: 'general',
    items: [
      { title: 'Home', path: PATH_DASHBOARD.general.home, icon: <HomeRoundedIcon /> },
      { title: 'Order', path: PATH_DASHBOARD.general.order, icon: <ShoppingBagRoundedIcon /> },
      { title: 'Delivery', path: PATH_DASHBOARD.general.delivery, icon: <LocalShippingRoundedIcon /> },
      { title: 'Customer', path: PATH_DASHBOARD.general.customer, icon: <GroupsRoundedIcon /> },
      { title: 'Marketing', path: PATH_DASHBOARD.general.marketing, icon: <CampaignRoundedIcon /> },
      { title: 'Payment', path: PATH_DASHBOARD.general.payment, icon: <AccountBalanceWalletRoundedIcon /> },
      { title: 'Discount', path: PATH_DASHBOARD.general.discount, icon: <LocalOfferRoundedIcon /> },
      { title: 'Manage', path: PATH_DASHBOARD.general.manage, icon: <ManageAccountsRoundedIcon /> },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : Catalouge
      {
        title: 'Catalouge',
        path: PATH_DASHBOARD.catalouge.root,
        icon: <CategoryRoundedIcon />,
        children: [
          { title: 'product', path: PATH_DASHBOARD.catalouge.product },
          { title: 'category', path: PATH_DASHBOARD.catalouge.category },
        ],

      },

       // MANAGEMENT : BLOG
      // {
      //   title: 'Store theme',
      //   path: PATH_DASHBOARD.store.root,
      //   icon: <StoreRoundedIcon />,
      //   children: [
      //     { title: 'settings', path: PATH_DASHBOARD.store.settings },
      //     { title: 'theme', path: PATH_DASHBOARD.store.theme },
      //     { title: 'pages', path: PATH_DASHBOARD.store.pages },
      //     { title: 'menus', path: PATH_DASHBOARD.store.menus },
      //   ],
      // },

      // MANAGEMENT : E-COMMERCE
      // {
      //   title: 'Integrations',
      //   path: PATH_DASHBOARD.integration.root,
      //   icon: <ExtensionRoundedIcon />,
      //   children: [
      //     { title: 'plugins', path: PATH_DASHBOARD.integration.plugins },
      //   ],
      // },
    ],
  }, 
];

export default navConfig;
