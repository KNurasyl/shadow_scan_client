import { Link } from '@tanstack/react-router';
import type { GroupResultDto, GroupStatus } from '../../../share/types/scans';
import { fmtTime, statusLabel } from '../../../share/utils/helpers';
import styles from '../Scan.module.css';

function statusBadgeClass(status: GroupStatus | GroupResultDto['scans'][number]['status']) {
  switch (status) {
    case 'FINISHED':
      return styles.badgeOk;
    case 'RUNNING':
      return styles.badgeRun;
    case 'PENDING':
      return styles.badgePending;
    case 'FAILED':
    case 'TIMEOUT':
      return styles.badgeErr;
    default:
      return styles.badgeNeutral;
  }
}

type Props = {
  group: GroupResultDto;
  groupStatus: GroupStatus;
  headerMeta: { createdAt: number; finishedAt?: number; scansTotal: number } | null;
  loadingStatuses: boolean;
  deleting: boolean;
  onCopyGroupId: () => void;
  onRefresh: () => void;
  onDelete: () => void;
};

export const ScanHeader = ({
  group,
  groupStatus,
  headerMeta,
  loadingStatuses,
  deleting,
  onCopyGroupId,
  onRefresh,
  onDelete,
}: Props) => {
  return (
    <div className={styles.pageHeader}>
      <div>
        <div className={styles.breadcrumbs}>
          <Link to="/scans" className={styles.breadcrumbLink}>
            Сканы
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>Группа</span>
        </div>

        <h1 className={styles.title}>Группа сканов</h1>

        <div className={styles.metaRow}>
          <span className={`${styles.badge} ${statusBadgeClass(groupStatus)}`}>
            {statusLabel(groupStatus)}
          </span>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>groupId</span>
            <button
              type="button"
              className={styles.monoBtn}
              onClick={onCopyGroupId}
              title="Скопировать groupId"
            >
              {group.groupId}
            </button>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Target</span>
            <span className={`${styles.metaValue} ${styles.mono}`}>{group.originalTarget}</span>
          </div>
        </div>

        {headerMeta && (
          <div className={styles.metaSubRow}>
            <div className={styles.metaSubItem}>
              <span className={styles.metaSubLabel}>Создано</span>
              <span className={styles.metaSubValue}>{fmtTime(headerMeta.createdAt)}</span>
            </div>
            <div className={styles.metaSubItem}>
              <span className={styles.metaSubLabel}>Завершено</span>
              <span className={styles.metaSubValue}>{fmtTime(headerMeta.finishedAt)}</span>
            </div>
            <div className={styles.metaSubItem}>
              <span className={styles.metaSubLabel}>Сканов</span>
              <span className={styles.metaSubValue}>{headerMeta.scansTotal}</span>
            </div>
            <div className={styles.metaSubItem}>
              <span className={styles.metaSubLabel}>Параллельность</span>
              <span className={styles.metaSubValue}>{group.maxParallelScans}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.headerActions}>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={onRefresh}
          disabled={loadingStatuses}
        >
          {loadingStatuses ? 'Обновляю…' : 'Обновить'}
        </button>

        <button
          type="button"
          className={styles.dangerBtn}
          onClick={onDelete}
          disabled={deleting}
          title="Удалить группу"
        >
          {deleting ? 'Удаление…' : 'Удалить'}
        </button>
      </div>
    </div>
  );
};
