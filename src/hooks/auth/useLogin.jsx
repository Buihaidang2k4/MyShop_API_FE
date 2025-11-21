import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

export default function useLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/home-private');
    }
    else {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin tài khoản mật khẩu.');
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    loading,
    handleLogin
  }
}
