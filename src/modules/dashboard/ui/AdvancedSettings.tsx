import type {
  SfTargetKind,
  SpiderfootScanMode,
  SpiderfootScanSpeed,
} from '../../../share/types/spiderfoot';
import type { KindOption } from '../model/constants';
import { SegmentedToggle } from './SegmentedToggle';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  speed: SpiderfootScanSpeed;
  mode: SpiderfootScanMode;
  kind: SfTargetKind | '';
  maxParallelScans: number | '';
  kindOptions: KindOption[];
  kindHint?: string;
  onSpeedChange: (v: SpiderfootScanSpeed) => void;
  onModeChange: (v: SpiderfootScanMode) => void;
  onKindChange: (v: SfTargetKind | '') => void;
  onParallelChange: (raw: string) => void;
};

export const AdvancedSettings = ({
  styles,
  speed,
  mode,
  kind,
  maxParallelScans,
  kindOptions,
  kindHint,
  onSpeedChange,
  onModeChange,
  onKindChange,
  onParallelChange,
}: Props) => {
  return (
    <div className={styles.advancedGrid}>
      <div className={styles.field}>
        <label className={styles.label}>Скорость</label>
        <SegmentedToggle
          styles={styles}
          value={speed}
          left={{ label: 'Fast', value: 'fast' }}
          right={{ label: 'Slow', value: 'slow' }}
          onChange={onSpeedChange}
        />
        <div className={styles.hint}>
          Fast — меньше сценариев и мягче нагрузка; Slow — полный профиль.
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Режим</label>
        <SegmentedToggle
          styles={styles}
          value={mode}
          left={{ label: 'Single', value: 'single' }}
          right={{ label: 'Multi', value: 'multi' }}
          onChange={onModeChange}
        />
        <div className={styles.hint}>Single — один скан за раз; Multi — параллельные сценарии.</div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="kind">
          Тип таргета
        </label>
        <div className={styles.selectWrap}>
          <select
            id="kind"
            className={styles.select}
            value={kind}
            onChange={(e) => onKindChange(e.target.value as SfTargetKind | '')}
          >
            <option value="">Авто (по regex)</option>
            {kindOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} ({opt.value})
              </option>
            ))}
          </select>
        </div>
        <div className={styles.hint}>
          {kind ? kindHint : 'Backend сам определит сценарии и запустит группу.'}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="parallel">
          Параллельность
        </label>
        <input
          id="parallel"
          className={styles.input}
          type="number"
          min={1}
          max={20}
          placeholder="Например 2"
          value={maxParallelScans}
          onChange={(e) => onParallelChange(e.target.value)}
        />
        <div className={styles.hint}>В Fast режиме backend ограничит максимум до 2.</div>
      </div>
    </div>
  );
};
