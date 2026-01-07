type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  email: string;
  password: string;
  loading: boolean;
  submitLabel: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export const AuthForm = ({
  styles,
  email,
  password,
  loading,
  submitLabel,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
        autoComplete="email"
      />

      <input
        className={styles.input}
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        required
        autoComplete="current-password"
      />

      <button className={styles.submit} disabled={loading}>
        {submitLabel}
      </button>
    </form>
  );
};
