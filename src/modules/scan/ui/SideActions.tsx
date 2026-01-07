import { Link } from '@tanstack/react-router';
import styles from '../Scan.module.css';

type Props = {
  onCopyGroupId: () => void;
};

export const SideActions = ({ onCopyGroupId }: Props) => {
  return (
    <div className={styles.sideCard}>
      <div className={styles.sideTitle}>Действия</div>

      <div className={styles.sideActions}>
        <Link to="/scans" className={styles.secondaryBtn}>
          К списку
        </Link>

        <Link to="/dashboard" className={styles.ghostBtn}>
          Новый запуск
        </Link>

        <button type="button" className={styles.ghostBtn} onClick={onCopyGroupId}>
          Скопировать groupId
        </button>
      </div>

      <div className={styles.sideHint}>
        Удаление группы также удалит результаты и GPT-анализ на backend.
      </div>
    </div>
  );
};
