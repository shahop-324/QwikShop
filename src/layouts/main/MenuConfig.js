// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../routes/paths';
// components
import { PATH_AFTER_LOGIN } from '../../config';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  
  {
    title: 'Features',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: '/features',
  },
  {
    title: 'Pricing',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: '/pricing',
  },
  {
    title: 'Login',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: '/auth/login',
  },
];

export default menuConfig;
