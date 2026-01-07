import type { GroupResultDto } from '../../../share/types/scans';
import { fmtTime } from '../../../share/utils/helpers';
import styles from '../Scan.module.css';
import { JsonViewer } from './JsonViewer';

type Props = {
  gpt?: GroupResultDto['gpt'];
  showJson: boolean;
  onToggleJson: () => void;
};

export const GptPanel = ({ gpt, showJson, onToggleJson }: Props) => {
  return (
    <div className={styles.sideCard}>
      <div className={styles.sideTitle}>GPT-анализ</div>

      {!gpt ? (
        <div className={styles.sideHint}>GPT-анализ появится после завершения всей группы.</div>
      ) : (
        <>
          <div className={styles.gptMeta}>
            <div className={styles.gptMetaRow}>
              <span className={styles.gptMetaLabel}>model</span>
              <span className={styles.gptMetaValue}>{gpt.model || '—'}</span>
            </div>
            <div className={styles.gptMetaRow}>
              <span className={styles.gptMetaLabel}>created</span>
              <span className={styles.gptMetaValue}>{fmtTime(gpt.createdAt)}</span>
            </div>
          </div>

          {gpt.analysisText ? (
            <div className={styles.gptTextBox}>
              <div className={styles.gptTextTitle}>Analysis</div>
              <div className={styles.gptText}>{gpt.analysisText}</div>
            </div>
          ) : (
            <div className={styles.sideHint}>analysisText отсутствует</div>
          )}

          <button type="button" className={styles.ghostBtn} onClick={onToggleJson}>
            {showJson ? 'Скрыть JSON' : 'Показать JSON'}
          </button>

          {showJson && (
            <div style={{ marginTop: 12 }}>
              <JsonViewer
                value={{ digest: gpt.digest, analysisJson: gpt.analysisJson, prompt: gpt.prompt }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
