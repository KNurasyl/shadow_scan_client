import { useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { loginRequest, registerRequest } from '../../share/api/auth';
import { showInfoMessage, showSuccessMessage } from '../../share/functions';
import { userStore } from '../../share/store/user.store';
import type { AuthCredentials, AuthMode, AuthResponse } from '../types/auth';

type AuthApiCall = (dto: AuthCredentials) => Promise<AuthResponse>;

export function useAuthForm() {
  const navigate = useNavigate();
  const setAuth = userStore((s) => s.setAuth);

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';

  const apiCall = useMemo<AuthApiCall>(() => {
    return (isLogin ? loginRequest : registerRequest) as AuthApiCall;
  }, [isLogin]);

  const title = isLogin ? 'Вход в Shadow Scan' : 'Регистрация';
  const submitLabel = loading ? 'Подождите…' : isLogin ? 'Войти' : 'Создать аккаунт';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, accessToken } = await apiCall({ email, password });
      setAuth(user, accessToken);

      showSuccessMessage(isLogin ? 'Вы вошли в систему' : 'Аккаунт создан');
      navigate({ to: '/' });
    } catch {
      showInfoMessage(isLogin ? 'Неверный email или пароль' : 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return {
    mode,
    setMode,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    isLogin,
    title,
    submitLabel,
    onSubmit,
  };
}
