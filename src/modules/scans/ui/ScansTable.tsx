import type { SpiderfootGroupListItem } from '../../../share/types/scans';
import { cn } from '../../../share/utils/cn';
import { formatDate } from '../../../share/utils/date';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  items: SpiderfootGroupListItem[];
  loading: boolean;
  onOpen: (groupId: string) => void;
  onCopy: (value: string) => void;
};

export const ScansTable = ({ styles, items, loading, onOpen, onCopy }: Props) => {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Статус</th>
            <th className={styles.th}>Таргет</th>
            <th className={styles.th}>groupId</th>
            <th className={styles.th}>Создан</th>
            <th className={styles.th}>Завершён</th>
            <th className={styles.th}>Parallel</th>
            <th className={styles.thRight}>Действия</th>
          </tr>
        </thead>

        <tbody>
          {!loading && items.length === 0 && (
            <tr>
              <td colSpan={7} className={styles.emptyCell}>
                <div className={styles.emptyTitle}>Пока пусто</div>
                <div className={styles.emptyText}>
                  Запусти скан на <span className={styles.mono}>/dashboard</span>, и он появится
                  здесь.
                </div>
              </td>
            </tr>
          )}

          {items.map((g) => (
            <tr key={g.groupId} className={styles.tr} onClick={() => onOpen(g.groupId)}>
              <td className={styles.td}>
                <span
                  className={cn(
                    styles.statusPill,
                    g.status === 'RUNNING' ? styles.statusRunning : styles.statusFinished
                  )}
                >
                  {g.status}
                </span>
              </td>

              <td className={styles.td}>
                <span className={styles.targetText} title={g.originalTarget}>
                  {g.originalTarget}
                </span>
              </td>

              <td className={styles.td}>
                <span className={styles.mono} title={g.groupId}>
                  {g.groupId}
                </span>
              </td>

              <td className={styles.td}>{formatDate(g.createdAt)}</td>
              <td className={styles.td}>{formatDate(g.finishedAt)}</td>
              <td className={styles.td}>{g.maxParallelScans}</td>

              <td className={styles.tdRight} onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={styles.ghostSmall}
                  onClick={() => onCopy(g.groupId)}
                >
                  Copy
                </button>
                <button
                  type="button"
                  className={styles.primarySmall}
                  onClick={() => onOpen(g.groupId)}
                >
                  Открыть
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <div className={styles.loadingOverlay}>Загрузка…</div>}
    </div>
  );
};
