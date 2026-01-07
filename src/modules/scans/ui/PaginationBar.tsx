type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  page: number;
  pages: number;
  total: number;
  canPrev: boolean;
  canNext: boolean;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export const PaginationBar = ({
  styles,
  page,
  pages,
  total,
  canPrev,
  canNext,
  loading,
  onPrev,
  onNext,
}: Props) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        Стр. <span className={styles.mono}>{page}</span> /
        <span className={styles.mono}>{pages}</span> · Всего:
        <span className={styles.mono}>{total}</span>
      </div>

      <div className={styles.paginationActions}>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={onPrev}
          disabled={!canPrev || loading}
        >
          Назад
        </button>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={onNext}
          disabled={!canNext || loading}
        >
          Вперёд
        </button>
      </div>
    </div>
  );
};
