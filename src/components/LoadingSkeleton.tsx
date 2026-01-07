type Styles = Record<string, string>;

export const LoadingSkeleton = ({ styles }: { styles: Styles }) => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonGrid}>
        <div className={styles.skeletonCard} />
        <div className={styles.skeletonCard} />
      </div>
    </div>
  );
};
