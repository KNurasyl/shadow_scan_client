import { useScans } from '../../share/hooks/useScans';
import styles from './Scans.module.css';
import { AuthRequiredCard } from './ui/AuthRequiredCard';
import { PaginationBar } from './ui/PaginationBar';
import { ScansHeader } from './ui/ScansHeader';
import { ScansTable } from './ui/ScansTable';
import { ScansToolbar } from './ui/ScansToolbar';

export const Scans = () => {
  const { state, actions } = useScans();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ScansHeader styles={styles} />

        {!state.user ? (
          <AuthRequiredCard styles={styles} />
        ) : (
          <div className={styles.card}>
            <ScansToolbar
              styles={styles}
              status={state.status}
              limit={state.limit}
              loading={state.loading}
              onStatusChange={actions.setStatus}
              onLimitChange={actions.setLimit}
              onRefresh={() => void actions.fetchGroups()}
            />

            <ScansTable
              styles={styles}
              items={state.items}
              loading={state.loading}
              onOpen={actions.openGroup}
              onCopy={actions.copy}
            />

            <PaginationBar
              styles={styles}
              page={state.page}
              pages={state.pages}
              total={state.total}
              canPrev={state.canPrev}
              canNext={state.canNext}
              loading={state.loading}
              onPrev={actions.prev}
              onNext={actions.next}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Scans;
