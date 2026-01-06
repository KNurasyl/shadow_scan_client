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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = isLogin
        ? await loginRequest(email, password)
        : await registerRequest(email, password);

      setAuth(data.user, data.accessToken);
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
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Пароль"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Подождите…' : isLogin ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>

        <div className={styles.bottomText}>
          {isLogin ? (
            <>
              Нет аккаунта?
              <button type="button" className={styles.link} onClick={() => setMode('register')}>
                Зарегистрируйтесь
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?
              <button type="button" className={styles.link} onClick={() => setMode('login')}>
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
