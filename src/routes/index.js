import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const storeSlugs = ['uncle-store', 'pal-store'];

  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'home', element: <GeneralHome /> },
        { path: 'order', element: <GeneralOrders /> },
        { path: 'delivery', element: <GeneralDelivery /> },
        { path: 'customer', element: <GeneralCustomer /> },
        { path: 'dining', element: <GeneralDining /> },
        { path: 'marketing', element: <GeneralMarketing /> },
        { path: 'payment', element: <GeneralPayment /> },
        { path: 'discount', element: <GeneralDiscount /> },
        { path: 'manage', element: <GeneralManage /> },
        { path: 'integration', element: <GeneralIntegration /> },
        {
          path: 'catalouge',
          children: [
            { element: <Navigate to="/dashboard/catalouge/product" replace />, index: true },
            { path: 'product', element: <EcommerceProductList /> },
            { path: 'category', element: <EcommerceProductList /> },
          ],
        },
        {
          path: 'design',
          children: [
            { element: <Navigate to="/design/business-card" replace />, index: true },
            { path: 'business-card', element: <GeneralBusinessCard /> },
            { path: 'store-banner', element: <GeneralStoreBanner /> },
            { path: 'whatsapp-story', element: <GeneralWhatsAppStory /> },
          ],
        },
        {
          path: 'store',
          children: [
            { element: <Navigate to="/dashboard/store/settings" replace />, index: true },
            { path: 'settings', element: <BlogPosts /> },
            { path: 'theme', element: <BlogPost /> },
            { path: 'pages', element: <BlogNewPost /> },
            { path: 'menus', element: <BlogNewPost /> },
          ],
        },
      ],
    },
    // Store Routes
    {
      path: '*',
      element: <StoreHeader />,
      children: storeSlugs.map((el) => ({
        path: el,
        children: [
          { element: <Navigate to={`home`} replace />, index: true },
          { path: '*', element: <StoreHome /> },
          { path: 'catalouge', element: <StoreCatalouge /> },
          { path: 'bag', element: <EcommerceCheckout /> },
          { path: 'product/*', element: <EcommerceProductDetails /> },
          { path: 'account', element: <StoreAccount /> },
          { path: 'wishlist', element: <StoreWishlist /> },
          {path: 'offers', element: <StoreOffers />},
        ],
      })),
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// Dashboard
const GeneralHome = Loadable(lazy(() => import('../pages/dashboard/GeneralHome')));

const GeneralBusinessCard = Loadable(lazy(() => import('../pages/dashboard/GeneralBusinessCardDesign')));
const GeneralStoreBanner = Loadable(lazy(() => import('../pages/dashboard/GeneralStoreBannerDesign')));
const GeneralWhatsAppStory = Loadable(lazy(() => import('../pages/dashboard/GeneralWhatsAppStoryDesign')));

const GeneralOrders = Loadable(lazy(() => import('../pages/dashboard/GeneralOrders')));
const GeneralDelivery = Loadable(lazy(() => import('../pages/dashboard/GeneralDelivery')));
const GeneralCustomer = Loadable(lazy(() => import('../pages/dashboard/GeneralCustomer')));
const GeneralMarketing = Loadable(lazy(() => import('../pages/dashboard/GeneralMarketing')));
const GeneralPayment = Loadable(lazy(() => import('../pages/dashboard/GeneralPayment')));
const GeneralDiscount = Loadable(lazy(() => import('../pages/dashboard/GeneralDiscount')));
const GeneralDining = Loadable(lazy(() => import('../pages/dashboard/GeneralDining')));
const GeneralManage = Loadable(lazy(() => import('../pages/dashboard/GeneralManage')));
const GeneralIntegration = Loadable(lazy(() => import('../pages/dashboard/GeneralIntegration')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// Store
const StoreHeader = Loadable(lazy(() => import('../layouts/store/storeHeader')));
const StoreCatalouge = Loadable(lazy(() => import('../layouts/store/StoreCatalouge')));
const StoreHome = Loadable(lazy(() => import('../layouts/store/storeHome')));
const StoreAccount = Loadable(lazy(() => import('../layouts/store/storeAccount')));
const StoreWishlist = Loadable(lazy(() => import('../layouts/store/storeWishlist')));
const StoreOffers = Loadable(lazy(() => import('../layouts/store/storeOffers')));
