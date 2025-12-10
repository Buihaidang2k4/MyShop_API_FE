import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import PrivateRouter from './PrivateRouter.jsx';
import HomePrivate from '@/pages/HomePrivate.jsx';
import HomePublic from '@/pages/HomePublic';
import Manager from '@/pages/Manager.jsx';
import Manager_userInfo from '@/components/manager/Manager_userInfo.jsx';
import Manager_overview from '@/components/manager/Manager_overview.jsx';
import Manage_purchase_history from '@/components/manager/Manager_purchase_history.jsx';
import Manage_membership_levels_and_benefits from '@/components/manager/Manager_membership_levels_and_benefits.jsx';
import SearchPageByCategory from '@/pages/SearchPageByCategory.jsx';
import ProductDetailsWrapper from '@/pages/ProductDetailsWrapper.jsx';
import CartPage from '@/pages/CartPage.jsx';
import { ToastContainer } from "react-toastify";
import OrderPage from '../pages/OrderPage.jsx';


export default function AppRouter() {
  return (
    <>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Layout />}>
          <Route path='/' element={<HomePublic />} />

        

          <Route element={<PrivateRouter />}>
            <Route path="home-private" element={<HomePrivate />} />
            <Route path="search-page-by-category" element={<SearchPageByCategory />} />
            <Route path="product-details" element={<ProductDetailsWrapper />} />
            <Route path="shop-cart" element={<CartPage />} />
            <Route path="order" element={<OrderPage />} />


            <Route path="manager" element={<Manager />}>
              <Route path="manager-userinfo" element={<Manager_userInfo />} />
              <Route path="manager-overview" element={<Manager_overview />} />
              <Route path="manage-purchase-history" element={<Manage_purchase_history />} />
              <Route path="manage-membership-levels-and-benefits" element={<Manage_membership_levels_and_benefits />} />
            </Route>
          </Route>
        </Route>

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Catch all: Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Toast container */}
      <ToastContainer />
    </>
  );
}
