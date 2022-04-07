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
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Home', path: PATH_DASHBOARD.general.home, icon: <HomeRoundedIcon /> },
      {
        title: 'Order',
        path: PATH_DASHBOARD.order.root,
        icon: <ShoppingBagRoundedIcon />,
        children: [
          { title: 'list', path: PATH_DASHBOARD.order.list },
          { title: 'abondoned carts', path: PATH_DASHBOARD.order.abondonedCarts },
        ],
      },
      {
        title: 'Catalouge',
        path: PATH_DASHBOARD.catalouge.root,
        icon: <CategoryRoundedIcon />,
        children: [
          { title: 'product', path: PATH_DASHBOARD.catalouge.product },
          { title: 'category', path: PATH_DASHBOARD.catalouge.category },
          { title: 'sub category', path: PATH_DASHBOARD.catalouge.subcategory },
          // { title: 'division', path: PATH_DASHBOARD.catalouge.division },
          // { title: 'Catalouge Builder', path: PATH_DASHBOARD.catalouge.builder },
        ],
      },
      { title: 'Delivery', path: PATH_DASHBOARD.general.delivery, icon: <LocalShippingRoundedIcon /> },
      { title: 'Customer', path: PATH_DASHBOARD.general.customer, icon: <GroupsRoundedIcon /> },
      { title: 'Marketing', path: PATH_DASHBOARD.general.marketing, icon: <CampaignRoundedIcon /> },
      { title: 'Payment', path: PATH_DASHBOARD.general.payment, icon: <AccountBalanceWalletRoundedIcon /> },
      { title: 'Discount', path: PATH_DASHBOARD.general.discount, icon: <LocalOfferRoundedIcon /> },
      { title: 'Manage', path: PATH_DASHBOARD.general.manage, icon: <ManageAccountsRoundedIcon /> },
      { title: 'Questions', path: PATH_DASHBOARD.general.questions, icon: <QuestionMarkRoundedIcon /> },
      { title: 'Refferal', path: PATH_DASHBOARD.general.referral, icon: <ConnectWithoutContactRoundedIcon /> },
      //  **************** Marketing Design Pages **************** //
      {
        title: 'Store',
        path: PATH_DASHBOARD.store.root,
        icon: <StoreRoundedIcon />,
        children: [
          { title: 'Profile', path: PATH_DASHBOARD.store.settings },
          { title: 'Website', path: PATH_DASHBOARD.store.theme },
          { title: 'Pages', path: PATH_DASHBOARD.store.pages },
          { title: 'Menus', path: PATH_DASHBOARD.store.menus },
        ],
      },
     
      {
        title: 'Integrations',
        path: PATH_DASHBOARD.general.integration,
        icon: <ExtensionRoundedIcon />,
      },
      {
        title: 'Reviews',
        path: PATH_DASHBOARD.general.reviews,
        icon: <ReviewsRoundedIcon />,
      },
      // {
      //   title: 'Academy',
      //   path: PATH_DASHBOARD.general.academy,
      //   icon: <SchoolRoundedIcon />,
      // },
      // MANAGEMENT : E-COMMERCE
    ],
  },
];

export default navConfig;
