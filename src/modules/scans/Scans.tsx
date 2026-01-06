import { Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { http } from '../../share/api/http';
import { showErrorMessage, showInfoMessage } from '../../share/functions';
import { userStore } from '../../share/store/user.store';
import styles from './Scans.module.css';

type GroupStatus = 'RUNNING' | 'FINISHED';

type SpiderfootGroupListItem = {
  groupId: string;
  originalTarget: string;
  createdAt: number;
  finishedAt?: number;
  maxParallelScans: number;
  status: GroupStatus;
};

type ListGroupsResponse = {
  items: SpiderfootGroupListItem[];
  total: number;
};

type StatusFilter = 'ALL' | GroupStatus;

function formatDate(ts?: number): string {
  if (!ts) return '—';
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export const Scans = () => {
  const navigate = useNavigate();
  const user = userStore((s) => s.user);

  const [status, setStatus] = useState<StatusFilter>('ALL');
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const [items, setItems] = useState<SpiderfootGroupListItem[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const page = useMemo(() => Math.floor(offset / limit) + 1, [offset, limit]);
  const pages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  const fetchGroups = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data } = await http.get<ListGroupsResponse>('/spiderfoot/groups', {
        params: {
          limit,
          offset,
          status: status === 'ALL' ? undefined : status,
        },
      });

      setItems(Array.isArray(data?.items) ? data.items : []);
      setTotal(typeof data?.total === 'number' ? data.total : 0);
    } catch {
      showErrorMessage('Не удалось загрузить список сканов');
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, status, limit, offset]);

  useEffect(() => {
    // если фильтр/лимит изменились — корректируем offset
    setOffset(0);
  }, [status, limit]);

  const onOpenGroup = (groupId: string) => {
    // ВАЖНО: чтобы типизация не ругалась, добавь роут /scans/$groupId в router.tsx
    navigate({ to: `/scans/${groupId}` });
  };

  const onCopy = (value: string) => {
    const p = navigator.clipboard?.writeText(value);
    if (!p) {
      showInfoMessage('Буфер обмена недоступен');
      return;
    }
    p.then(() => showInfoMessage('Скопировано')).catch(() =>
      showInfoMessage('Не удалось скопировать')
    );
  };

  const onPrev = () => setOffset((v) => Math.max(0, v - limit));
  const onNext = () => setOffset((v) => Math.min((pages - 1) * limit, v + limit));

  const canPrev = offset > 0;
  const canNext = offset + limit < total;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Сканы</h1>
            <p className={styles.subtitle}>История запусков групп сканирования (groupId).</p>
          </div>

          <div className={styles.headerActions}>
            <Link to="/dashboard" className={styles.primaryLink}>
              Запустить новый
            </Link>
          </div>
        </div>

        {!user ? (
          <div className={styles.card}>
            <div className={styles.emptyTitle}>Требуется авторизация</div>
            <div className={styles.emptyText}>
              Чтобы просматривать историю запусков, войдите в систему.
            </div>
            <Link to="/auth" className={styles.primaryLink}>
              Перейти к входу
            </Link>
          </div>
        ) : (
          <div className={styles.card}>
            <div className={styles.toolbar}>
              <div className={styles.filters}>
                <div className={styles.filterBlock}>
                  <div className={styles.filterLabel}>Статус</div>
                  <div className={styles.segment}>
                    <button
                      type="button"
                      className={`${styles.segmentBtn} ${
                        status === 'ALL' ? styles.segmentActive : ''
                      }`}
                      onClick={() => setStatus('ALL')}
                      disabled={loading}
                    >
                      Все
                    </button>
                    <button
                      type="button"
                      className={`${styles.segmentBtn} ${
                        status === 'RUNNING' ? styles.segmentActive : ''
                      }`}
                      onClick={() => setStatus('RUNNING')}
                      disabled={loading}
                    >
                      RUNNING
                    </button>
                    <button
                      type="button"
                      className={`${styles.segmentBtn} ${
                        status === 'FINISHED' ? styles.segmentActive : ''
                      }`}
                      onClick={() => setStatus('FINISHED')}
                      disabled={loading}
                    >
                      FINISHED
                    </button>
                  </div>
                </div>

                <div className={styles.filterBlock}>
                  <div className={styles.filterLabel}>Лимит</div>
                  <select
                    className={styles.select}
                    value={limit}
                    onChange={(e) => setLimit(clamp(Number(e.target.value), 5, 100))}
                    disabled={loading}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                className={styles.ghostBtn}
                onClick={() => void fetchGroups()}
                disabled={loading}
              >
                {loading ? 'Обновление…' : 'Обновить'}
              </button>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Статус</th>
                    <th className={styles.th}>Таргет</th>
                    <th className={styles.th}>groupId</th>
                    <th className={styles.th}>Создан</th>
                    <th className={styles.th}>Завершён</th>
                    <th className={styles.th}>Parallel</th>
                    <th className={styles.thRight}>Действия</th>
                  </tr>
                </thead>

                <tbody>
                  {!loading && items.length === 0 ? (
                    <tr>
                      <td colSpan={7} className={styles.emptyCell}>
                        <div className={styles.emptyTitle}>Пока пусто</div>
                        <div className={styles.emptyText}>
                          Запусти скан на <span className={styles.mono}>/dashboard</span>, и он
                          появится здесь.
                        </div>
                      </td>
                    </tr>
                  ) : null}

                  {items.map((g) => (
                    <tr
                      key={g.groupId}
                      className={styles.tr}
                      onClick={() => onOpenGroup(g.groupId)}
                    >
                      <td className={styles.td}>
                        <span
                          className={`${styles.statusPill} ${
                            g.status === 'RUNNING' ? styles.statusRunning : styles.statusFinished
                          }`}
                        >
                          {g.status}
                        </span>
                      </td>

                      <td className={styles.td}>
                        <span className={styles.targetText} title={g.originalTarget}>
                          {g.originalTarget}
                        </span>
                      </td>

                      <td className={styles.td}>
                        <span className={styles.mono} title={g.groupId}>
                          {g.groupId}
                        </span>
                      </td>

                      <td className={styles.td}>{formatDate(g.createdAt)}</td>
                      <td className={styles.td}>{formatDate(g.finishedAt)}</td>
                      <td className={styles.td}>{g.maxParallelScans}</td>

                      <td className={styles.tdRight} onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className={styles.ghostSmall}
                          onClick={() => onCopy(g.groupId)}
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          className={styles.primarySmall}
                          onClick={() => onOpenGroup(g.groupId)}
                        >
                          Открыть
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {loading ? <div className={styles.loadingOverlay}>Загрузка…</div> : null}
            </div>

            <div className={styles.pagination}>
              <div className={styles.paginationInfo}>
                Стр. <span className={styles.mono}>{page}</span> /{' '}
                <span className={styles.mono}>{pages}</span> · Всего:{' '}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Scans;
