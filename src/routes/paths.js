// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    home: path(ROOTS_DASHBOARD, '/home'),
    delivery: path(ROOTS_DASHBOARD, '/delivery'),
    customer: path(ROOTS_DASHBOARD, '/customer'),

    marketing: path(ROOTS_DASHBOARD, '/marketing'),
    payment: path(ROOTS_DASHBOARD, '/payment'),
    discount: path(ROOTS_DASHBOARD, '/discount'),
    manage: path(ROOTS_DASHBOARD, '/manage'),
    // questions: path(ROOTS_DASHBOARD, '/questions'),
    referral: path(ROOTS_DASHBOARD, '/refferal'),
    integration: path(ROOTS_DASHBOARD, '/integration'),
    reviews: path(ROOTS_DASHBOARD, '/reviews'),
    academy: path(ROOTS_DASHBOARD, '/academy'),
  },

  order: {
    root: path(ROOTS_DASHBOARD, '/order'),
    list: path(ROOTS_DASHBOARD, '/order/list'),
    abondonedCarts: path(ROOTS_DASHBOARD, '/order/abondoned-carts'),
  },

  catalouge: {
    root: path(ROOTS_DASHBOARD, '/catalouge'),
    product: path(ROOTS_DASHBOARD, '/catalouge/product'),
    category: path(ROOTS_DASHBOARD, '/catalouge/category'),
    subcategory: path(ROOTS_DASHBOARD, '/catalouge/sub-category'),
    // builder: path(ROOTS_DASHBOARD, '/catalouge/builder'),
  },
  store: {
    root: path(ROOTS_DASHBOARD, '/store'),
    settings: path(ROOTS_DASHBOARD, '/store/settings'),
    theme: path(ROOTS_DASHBOARD, '/store/theme'),
    pages: path(ROOTS_DASHBOARD, '/store/pages'),
    menus: path(ROOTS_DASHBOARD, '/store/menus'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
