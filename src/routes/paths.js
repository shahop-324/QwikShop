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
    order: path(ROOTS_DASHBOARD, '/order'),
    delivery: path(ROOTS_DASHBOARD, '/delivery'),
    customer: path(ROOTS_DASHBOARD, '/customer'),
    dining: path(ROOTS_DASHBOARD, '/dining'),
    marketing: path(ROOTS_DASHBOARD, '/marketing'),
    payment: path(ROOTS_DASHBOARD, '/payment'),
    discount: path(ROOTS_DASHBOARD, '/discount'),
    manage: path(ROOTS_DASHBOARD, '/manage'),
    integration: path(ROOTS_DASHBOARD, '/integration'),
  },

  design: {
    root: path(ROOTS_DASHBOARD, '/design'),
    businessCard: path(ROOTS_DASHBOARD, '/design/business-card'),
    storeBanner: path(ROOTS_DASHBOARD, '/design/store-banner'),
    whatsAppStory: path(ROOTS_DASHBOARD, '/design/whatsapp-story'),
  },

  catalouge: {
    root: path(ROOTS_DASHBOARD, '/catalouge'),
    product: path(ROOTS_DASHBOARD, '/catalouge/product'),
    category: path(ROOTS_DASHBOARD, '/catalouge/category'),
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