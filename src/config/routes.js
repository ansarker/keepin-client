import ForgotPassword from "../components/auth/ForgotPassword";
import Profile from "../components/auth/Profile";
import ResetPassword from "../components/auth/ResetPassword";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";
import Dashboard from "../components/credentials/Dashboard";
import NotFound from "../components/libs/NotFound";
import PrivateRoute from "../components/routing/PrivateRoute";
import Wrapper from '../components/libs/Wrapper';
import PasswordListing from '../components/credentials/PasswordListing';
import CardListing from '../components/credentials/CardListing';
import IdentityListing from '../components/credentials/IdentityListing';
import Favorites from '../components/credentials/Favorites';
import Details from "../components/credentials/Details";

export default [
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgotpassword',
    element: <ForgotPassword />
  },
  {
    path: '/resetpassword/:resetToken',
    element: <ResetPassword />
  },
  {
    path: '/*',
    element: <NotFound />
  },
  {
    path: '/',
    element:
      <Wrapper>
        <PrivateRoute />
      </Wrapper>,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'passwords',
        element: <PasswordListing />
      },
      {
        path: 'cards',
        element: <CardListing />
      },
      {
        path: 'identities',
        element: <IdentityListing />
      },
      {
        path: 'favorites',
        element: <Favorites />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'details/:detailId',
        element: <Details />
      }
    ]
  }
]