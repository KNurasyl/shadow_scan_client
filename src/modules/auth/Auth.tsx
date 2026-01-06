import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { loginRequest, registerRequest } from '../../share/api/auth';
import { showInfoMessage, showSuccessMessage } from '../../share/functions';
import { userStore } from '../../share/store/user.store';
import styles from './Auth.module.css';

type AuthMode = 'login' | 'register';

export const Auth = () => {
  const navigate = useNavigate();
  const setAuth = userStore((s) => s.setAuth);

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';
  const apiCall = isLogin ? loginRequest : registerRequest;

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

          <button className={styles.submit} disabled={loading}>
            {loading ? 'Подождите…' : isLogin ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>

        <div className={styles.bottomText}>
          <span className={styles.bottomText}>
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
