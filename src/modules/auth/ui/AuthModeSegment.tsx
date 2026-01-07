import type { AuthMode } from '../../../share/types/auth';
import { cn } from '../../../share/utils/cn';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
};

export const AuthModeSegment = ({ styles, mode, onChange }: Props) => {
  return (
    <div className={styles.segment} role="tablist" aria-label="Режим авторизации">
      <button
        type="button"
        className={cn(styles.segmentBtn, mode === 'login' && styles.segmentActive)}
        onClick={() => onChange('login')}
        role="tab"
        aria-selected={mode === 'login'}
      >
        Вход
      </button>

      <button
        type="button"
        className={cn(styles.segmentBtn, mode === 'register' && styles.segmentActive)}
        onClick={() => onChange('register')}
        role="tab"
        aria-selected={mode === 'register'}
      >
        Регистрация
      </button>
    </div>
  );
};
