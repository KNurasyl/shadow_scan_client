import type { GroupResultDto } from '../../../share/types/scans';
import styles from '../Scan.module.css';
import { JsonViewer } from './JsonViewer';

type Props = {
  group: GroupResultDto;
  show: boolean;
  onToggle: () => void;
};

export const RawResults = ({ group, show, onToggle }: Props) => {
  return (
    <div id="raw-results" className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTag}>RAW</div>
          <h2 className={styles.cardTitle}>Сырые результаты</h2>
        </div>

        <button type="button" className={styles.ghostBtn} onClick={onToggle}>
          {show ? 'Скрыть' : 'Показать'}
        </button>
      </div>

      {!show ? (
        <div className={styles.hint}>Здесь raw-результаты (per scan). Может быть объёмно.</div>
      ) : (
        <div className={styles.rawGrid}>
          {group.scans.map((s, idx) => (
            <div key={`${s.kind}::${s.target}-raw-${idx}`} className={styles.rawCard}>
              <div className={styles.rawHeader}>
                <div className={styles.rawTitleRow}>
                  <span className={styles.rawKind}>{s.kind}</span>
                  <span className={styles.rawTarget}>{s.target}</span>
                </div>
              </div>

              <JsonViewer value={s.result} title="result" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
