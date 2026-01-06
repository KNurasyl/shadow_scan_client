import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { loginRequest, registerRequest } from '../../share/api/auth';
import { showErrorMessage, showSuccessMessage } from '../../share/functions';
import { userStore } from '../../share/store/user.store';
import type { AuthPayload, LoginResponse } from '../../share/types/api';
import styles from './Auth.module.css';

type AuthMode = 'login' | 'register';

export const Auth = () => {
  const navigate = useNavigate();
  const setAuth = userStore((s) => s.setAuth);

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = mode === 'login';

  const { mutate, isPending } = useMutation<LoginResponse, unknown, AuthPayload>({
    mutationFn: async (payload) => {
      return isLogin ? loginRequest(payload) : registerRequest(payload);
    },
    onSuccess: ({ user, accessToken }) => {
      setAuth(user, accessToken);
      showSuccessMessage(isLogin ? 'Вы вошли в систему' : 'Аккаунт создан');
      navigate({ to: '/' });
    },
    onError: () => {
      showErrorMessage(isLogin ? 'Неверный email или пароль' : 'Ошибка регистрации');
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>{isLogin ? 'Вход в Shadow Scan' : 'Регистрация'}</h1>

        <form onSubmit={onSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className={styles.submit} disabled={isPending}>
            {isPending ? 'Подождите…' : isLogin ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>

        <div className={styles.bottomText}>
          <span className={styles.bottomSubText}>
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          </span>
          <button
            type="button"
            className={styles.link}
            onClick={() => setMode(isLogin ? 'register' : 'login')}
          >
            {isLogin ? 'Зарегистрируйтесь' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};
