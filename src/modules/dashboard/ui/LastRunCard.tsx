import type { CreateSpiderfootScanResponse } from '../../../share/types/spiderfoot';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  lastRun: CreateSpiderfootScanResponse;
  onCopyGroupId: () => void;
};

export const LastRunCard = ({ styles, lastRun, onCopyGroupId }: Props) => {
  return (
    <div className={styles.resultCard}>
      <div className={styles.resultHeader}>
        <div>
          <div className={styles.cardTag}>RUNNING</div>
          <h3 className={styles.resultTitle}>Группа создана</h3>
        </div>

        <div className={styles.groupId}>
          <span className={styles.groupIdLabel}>groupId</span>
          <div className={styles.groupIdRow}>
            <span className={styles.mono}>{lastRun.groupId}</span>
            <button type="button" className={styles.copyBtn} onClick={onCopyGroupId}>
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className={styles.resultGrid}>
        <div className={styles.resultBlock}>
          <div className={styles.resultBlockTitle}>Запущенные сканы</div>
          <div className={styles.scanList}>
            {lastRun.scans.map((s) => (
              <div key={s.scanId} className={styles.scanRow}>
                <span className={styles.scanKind}>{s.kind}</span>
                <span className={styles.scanTarget}>{s.target}</span>
                <span className={styles.scanId} title={s.scanId}>
                  {s.scanId}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.resultBlock}>
          <div className={styles.resultBlockTitle}>Socket канал</div>
          <div className={styles.socketBox}>
            <div className={styles.socketRow}>
              <span className={styles.socketLabel}>namespace</span>
              <span className={styles.mono}>{lastRun.socket.namespace}</span>
            </div>
            <div className={styles.socketRow}>
              <span className={styles.socketLabel}>room</span>
              <span className={styles.mono}>{lastRun.socket.room}</span>
            </div>
          </div>

          <div className={styles.hint}>
            Детали и результаты удобнее показывать на странице группы
            <span className={styles.mono}>/scans/:groupId</span>.
          </div>
        </div>
      </div>
    </div>
  );
};
