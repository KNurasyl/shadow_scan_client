import { useDashboard } from '../../share/hooks/useDashboard';
import styles from './Dashboard.module.css';
import { CreateScanCard } from './ui/CreateScanCard';
import { DashboardHeader } from './ui/DashboardHeader';
import { LastRunCard } from './ui/LastRunCard';
import { PreviewCard } from './ui/PreviewCard';
import { SideTipsCard } from './ui/SideTipsCard';

export const Dashboard = () => {
  const { user, state, actions } = useDashboard();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <DashboardHeader styles={styles} user={user} />

        <div className={styles.grid}>
          <div className={styles.left}>
            <CreateScanCard
              styles={styles}
              user={user}
              target={state.target}
              speed={state.speed}
              mode={state.mode}
              kind={state.kind}
              maxParallelScans={state.maxParallelScans}
              showAdvanced={state.showAdvanced}
              canSubmit={state.canSubmit}
              loading={state.loading}
              lastRun={state.lastRun}
              kindHint={state.kindHint}
              onToggleAdvanced={() => actions.setShowAdvanced((v) => !v)}
              onPickExample={actions.applyExample}
              onTargetChange={actions.setTarget}
              onSpeedChange={actions.setSpeed}
              onModeChange={actions.setMode}
              onKindChange={actions.setKind}
              onParallelChange={actions.setParallelFromInput}
              onSubmit={actions.submit}
              onReset={actions.reset}
              onCopyGroupId={actions.copyGroupId}
            />

            {state.lastRun && (
              <LastRunCard
                styles={styles}
                lastRun={state.lastRun}
                onCopyGroupId={actions.copyGroupId}
              />
            )}
          </div>

          <div className={styles.right}>
            <SideTipsCard styles={styles} />
            <PreviewCard
              styles={styles}
              normalizedTarget={state.normalizedTarget}
              speed={state.speed}
              mode={state.mode}
              kind={state.kind}
              maxParallelScans={state.maxParallelScans}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
