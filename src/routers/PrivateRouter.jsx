import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

export default function PrivateRouter() {
  const { isLoggedIn, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;

  return isLoggedIn ? <Outlet />: <Navigate to="/login" replace />;
}