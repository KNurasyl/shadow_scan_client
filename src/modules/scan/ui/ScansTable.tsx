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
  isFinished: boolean;
  onCopyScanId: (scanId: string) => void;
};

export const ScansTable = ({ group, isFinished, onCopyScanId }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTag}>SCANS</div>
          <h2 className={styles.cardTitle}>Список сканов</h2>
        </div>

        {!isFinished ? (
          <div className={styles.pollPill}>
            <span className={styles.pollDot} />
            realtime polling
          </div>
        ) : (
          <div className={styles.pollPillDone}>
            <span className={styles.pollDotDone} />
            completed
          </div>
        )}
      </div>

      <div className={styles.table}>
        <div className={styles.tHead}>
          <div>Kind</div>
          <div>Target</div>
          <div>Status</div>
          <div>Time</div>
        </div>

        <div className={styles.tBody}>
          {group.scans.map((s, idx) => (
            <div key={`${s.kind}::${s.target}-${idx}`} className={styles.tRow}>
              <div className={styles.kindCell}>
                <span className={styles.kind}>{s.kind}</span>
              </div>

              <div className={styles.targetCell}>
                <span className={styles.target}>{s.target}</span>
                {s.scanId ? (
                  <button
                    type="button"
                    className={styles.scanIdBtn}
                    onClick={() => onCopyScanId(s.scanId!)}
                    title="Скопировать scanId"
                  >
                    {s.scanId}
                  </button>
                ) : (
                  <span className={styles.scanIdMuted}>scanId: —</span>
                )}
              </div>

              <div className={styles.statusCell}>
                <span className={`${styles.badge} ${statusBadgeClass(s.status)}`}>
                  {statusLabel(s.status)}
                </span>

                {s.error ? <div className={styles.errorText}>{s.error}</div> : null}
              </div>

              <div className={styles.timeCell}>
                <div className={styles.timeLine}>
                  <span className={styles.timeLabel}>start</span>
                  <span className={styles.timeValue}>{fmtTime(s.startedAt)}</span>
                </div>
                <div className={styles.timeLine}>
                  <span className={styles.timeLabel}>end</span>
                  <span className={styles.timeValue}>{fmtTime(s.finishedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tableHint}>
        В процессе выполнения обновляются только статусы. Полные результаты подтягиваются после
        завершения группы.
      </div>
    </div>
  );
};
