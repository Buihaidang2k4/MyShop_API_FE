import { Navigate } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

export default function PrivateRouter({ children }) {
  const { isLoggedIn, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}