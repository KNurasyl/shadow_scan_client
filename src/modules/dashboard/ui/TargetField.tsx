type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  value: string;
  onChange: (v: string) => void;
};

export const TargetField = ({ styles, value, onChange }: Props) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="target">
        Таргет
      </label>
      <input
        id="target"
        className={styles.input}
        placeholder="Email, домен, IP, username, ФИО..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      <div className={styles.hint}>
        Для домена указывайте без протокола: <span className={styles.mono}>example.com</span>
      </div>
    </div>
  );
};
