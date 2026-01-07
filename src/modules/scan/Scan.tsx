import { AuthRequired } from '../../components/AuthRequired';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { NotFound } from '../../components/NotFound';
import { useScanGroup } from '../../share/hooks/useScanGroup';
import styles from './Scan.module.css';
import { GptPanel } from './ui/GptPanel';
import { RawResults } from './ui/RawResults';
import { ScanHeader } from './ui/ScanHeader';
import { ScansTable } from './ui/ScansTable';
import { SideActions } from './ui/SideActions';

export const Scan = () => {
  const { user, state, actions } = useScanGroup();

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <AuthRequired styles={styles} />
        </div>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <LoadingSkeleton styles={styles} />
        </div>
      </div>
    );
  }

  if (!state.group) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <NotFound styles={styles} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ScanHeader
          group={state.group}
          groupStatus={state.groupStatus}
          headerMeta={state.headerMeta}
          loadingStatuses={state.loadingStatuses}
          deleting={state.deleting}
          onCopyGroupId={actions.copyGroupId}
          onRefresh={actions.hardRefresh}
          onDelete={actions.onDeleteGroup}
        />

        <div className={styles.grid}>
          <div className={styles.left}>
            <ScansTable
              group={state.group}
              isFinished={state.isFinished}
              onCopyScanId={actions.copyScanId}
            />

            <RawResults group={state.group} show={state.showRaw} onToggle={actions.toggleRaw} />
          </div>

          <div className={styles.right}>
            <SideActions onCopyGroupId={actions.copyGroupId} />
            <GptPanel
              gpt={state.group.gpt}
              showJson={state.showGptJson}
              onToggleJson={actions.toggleGptJson}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
