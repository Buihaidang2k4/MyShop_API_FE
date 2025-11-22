import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import PrivateRouter from './PrivateRouter.jsx';
import HomePrivate from '@/pages/HomePrivate.jsx';
import HomePublic from '@/pages/HomePublic';
import Manager from '../pages/Manager.jsx';
import Manager_userInfo from '../components/manager/Manager_userInfo.jsx';
import Manager_overview from '../components/manager/Manager_overview.jsx';
import Manage_purchase_history from '../components/manager/Manager_purchase_history.jsx';
import Manage_membership_levels_and_benefits from '../components/manager/Manager_membership_levels_and_benefits.jsx';

export default function AppRouter() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route path="/" element={<Layout />}>
        {/* Public Home */}
        <Route index element={<HomePublic />} />

        {/* Private Home */}
        <Route path="home-private" element={<PrivateRouter><HomePrivate /></PrivateRouter>} />

        {/* Manager */}
        <Route path="manager" element={<PrivateRouter><Manager /></PrivateRouter>}>
          <Route path='manager-userinfo' element={<Manager_userInfo />} />
          <Route path='manager-overview' element={<Manager_overview />} />
          <Route path='manage-purchase-history' element={<Manage_purchase_history />} />
          <Route path='manage-membership-levels-and-benefits' element={<Manage_membership_levels_and_benefits />} />
        </Route>
      </Route>

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}