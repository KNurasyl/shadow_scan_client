import { useAuthForm } from '../../share/hooks/useAuthForm';
import styles from './Auth.module.css';
import { AuthCard } from './ui/AuthCard';
import { AuthForm } from './ui/AuthForm';
import { AuthModeSegment } from './ui/AuthModeSegment';

export const Auth = () => {
  const {
    mode,
    setMode,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    title,
    submitLabel,
    onSubmit,
  } = useAuthForm();

  return (
    <AuthCard styles={styles}>
      <AuthModeSegment styles={styles} mode={mode} onChange={setMode} />
      <h1 className={styles.title}>{title}</h1>

      <AuthForm
        styles={styles}
        email={email}
        password={password}
        loading={loading}
        submitLabel={submitLabel}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={onSubmit}
      />
    </AuthCard>
  );
};
