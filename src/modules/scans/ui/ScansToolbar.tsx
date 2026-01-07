import type { StatusFilter } from '../../../share/types/scans';
import { cn } from '../../../share/utils/cn';
import { clamp } from '../../../share/utils/number';
import { LIMIT_OPTIONS, STATUS_OPTIONS } from '../model/constants';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  status: StatusFilter;
  limit: number;
  loading: boolean;
  onStatusChange: (v: StatusFilter) => void;
  onLimitChange: (v: number) => void;
  onRefresh: () => void;
};

export const ScansToolbar = ({
  styles,
  status,
  limit,
  loading,
  onStatusChange,
  onLimitChange,
  onRefresh,
}: Props) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.filters}>
        <div className={styles.filterBlock}>
          <div className={styles.filterLabel}>Статус</div>

          <div className={styles.segment}>
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={cn(styles.segmentBtn, status === opt.value && styles.segmentActive)}
                onClick={() => onStatusChange(opt.value)}
                disabled={loading}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterBlock}>
          <div className={styles.filterLabel}>Лимит</div>

          <select
            className={styles.select}
            value={limit}
            onChange={(e) => onLimitChange(clamp(Number(e.target.value), 5, 100))}
            disabled={loading}
          >
            {LIMIT_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="button" className={styles.ghostBtn} onClick={onRefresh} disabled={loading}>
        {loading ? 'Обновление…' : 'Обновить'}
      </button>
    </div>
  );
};
