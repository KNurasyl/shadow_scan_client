import { Link } from '@tanstack/react-router';
import type {
  CreateSpiderfootScanResponse,
  SfTargetKind,
  SpiderfootScanMode,
  SpiderfootScanSpeed,
} from '../../../share/types/spiderfoot';
import { EXAMPLES, KIND_OPTIONS } from '../model/constants';
import { AdvancedSettings } from './AdvancedSettings';
import { ExamplesBar } from './ExamplesBar';
import { TargetField } from './TargetField';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  user: { email: string } | null;
  target: string;
  speed: SpiderfootScanSpeed;
  mode: SpiderfootScanMode;
  kind: SfTargetKind | '';
  maxParallelScans: number | '';
  showAdvanced: boolean;
  canSubmit: boolean;
  loading: boolean;
  lastRun: CreateSpiderfootScanResponse | null;
  kindHint?: string;
  onToggleAdvanced: () => void;
  onPickExample: (value: string, kind?: SfTargetKind) => void;
  onTargetChange: (v: string) => void;
  onSpeedChange: (v: SpiderfootScanSpeed) => void;
  onModeChange: (v: SpiderfootScanMode) => void;
  onKindChange: (v: SfTargetKind | '') => void;
  onParallelChange: (raw: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  onCopyGroupId: () => void;
};

export const CreateScanCard = ({
  styles,
  user,
  target,
  speed,
  mode,
  kind,
  maxParallelScans,
  showAdvanced,
  canSubmit,
  loading,
  lastRun,
  kindHint,
  onToggleAdvanced,
  onPickExample,
  onTargetChange,
  onSpeedChange,
  onModeChange,
  onKindChange,
  onParallelChange,
  onSubmit,
  onReset,
  onCopyGroupId,
}: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTag}>CREATE SCAN</div>
          <h2 className={styles.cardTitle}>Новый запуск</h2>
        </div>

        <button type="button" className={styles.ghostBtn} onClick={onToggleAdvanced}>
          {showAdvanced ? 'Скрыть настройки' : 'Расширенные настройки'}
        </button>
      </div>

      {!user ? (
        <div className={styles.authRequired}>
          <div className={styles.authTitle}>Требуется авторизация</div>
          <div className={styles.authText}>Чтобы запустить скан, войдите в систему.</div>
          <Link to="/auth" className={styles.primaryBtn}>
            Перейти к входу
          </Link>
        </div>
      ) : (
        <>
          <ExamplesBar styles={styles} examples={EXAMPLES} onPick={onPickExample} />

          <form onSubmit={onSubmit} className={styles.form}>
            <TargetField styles={styles} value={target} onChange={onTargetChange} />

            {showAdvanced && (
              <AdvancedSettings
                styles={styles}
                speed={speed}
                mode={mode}
                kind={kind}
                maxParallelScans={maxParallelScans}
                kindOptions={KIND_OPTIONS}
                kindHint={kindHint}
                onSpeedChange={onSpeedChange}
                onModeChange={onModeChange}
                onKindChange={onKindChange}
                onParallelChange={onParallelChange}
              />
            )}

            <div className={styles.actions}>
              <button className={styles.primaryBtn} disabled={!canSubmit || loading}>
                {loading ? 'Запуск…' : 'Запустить скан'}
              </button>

              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={onReset}
                disabled={loading}
              >
                Сброс
              </button>

              {lastRun?.groupId && (
                <button type="button" className={styles.ghostBtn} onClick={onCopyGroupId}>
                  Скопировать groupId
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};
