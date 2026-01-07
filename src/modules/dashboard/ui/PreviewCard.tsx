import type {
  SfTargetKind,
  SpiderfootScanMode,
  SpiderfootScanSpeed,
} from '../../../share/types/spiderfoot';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  normalizedTarget: string;
  speed: SpiderfootScanSpeed;
  mode: SpiderfootScanMode;
  kind: SfTargetKind | '';
  maxParallelScans: number | '';
};

export const PreviewCard = ({
  styles,
  normalizedTarget,
  speed,
  mode,
  kind,
  maxParallelScans,
}: Props) => {
  return (
    <div className={styles.sideCard}>
      <div className={styles.sideTitle}>Предпросмотр настроек</div>

      <div className={styles.preview}>
        <div className={styles.previewRow}>
          <span className={styles.previewLabel}>Target</span>
          <span className={`${styles.previewValue} ${styles.mono}`}>{normalizedTarget || '—'}</span>
        </div>

        <div className={styles.previewRow}>
          <span className={styles.previewLabel}>Speed</span>
          <span className={styles.previewValue}>{speed}</span>
        </div>

        <div className={styles.previewRow}>
          <span className={styles.previewLabel}>Mode</span>
          <span className={styles.previewValue}>{mode}</span>
        </div>

        <div className={styles.previewRow}>
          <span className={styles.previewLabel}>Kind</span>
          <span className={styles.previewValue}>{kind || 'auto'}</span>
        </div>

        <div className={styles.previewRow}>
          <span className={styles.previewLabel}>Parallel</span>
          <span className={styles.previewValue}>
            {typeof maxParallelScans === 'number' ? maxParallelScans : 'default'}
          </span>
        </div>
      </div>

      <div className={styles.previewHint}>
        В обычном режиме backend сам выберет сценарии (email/domain/ip/username и т.д.) и запустит
        группу.
      </div>
    </div>
  );
};
