import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { http } from '../../share/api/http';
import { showInfoMessage, showSuccessMessage } from '../../share/functions';
import { userStore } from '../../share/store/user.store';
import type { SfTargetKind } from '../../share/types/spiderfoot';
import styles from './Scan.module.css';

type GroupStatus = 'RUNNING' | 'FINISHED';
type ScanStatus = 'PENDING' | 'RUNNING' | 'FINISHED' | 'FAILED' | 'TIMEOUT';

type GroupResultDto = {
  groupId: string;
  originalTarget: string;
  createdAt: number;
  finishedAt?: number;
  maxParallelScans: number;
  scans: Array<{
    scanId?: string;
    kind: SfTargetKind;
    target: string;
    status: ScanStatus;
    sfStatus?: string;
    result?: unknown;
    error?: string;
    startedAt?: number;
    finishedAt?: number;
  }>;
  gpt?: {
    model?: string;
    prompt?: string;
    analysisText?: string;
    analysisJson?: unknown;
    digest?: unknown;
    createdAt?: number;
  };
};

type GroupStatusesDto = {
  groupId: string;
  originalTarget: string;
  createdAt: number;
  finishedAt?: number;
  maxParallelScans: number;
  status: GroupStatus;
  scans: Array<{
    scanId?: string;
    kind: SfTargetKind;
    target: string;
    status: ScanStatus;
    sfStatus?: string;
    error?: string;
    startedAt?: number;
    finishedAt?: number;
    lastPolledAt?: number;
  }>;
};

const POLL_INTERVAL_MS = 2500;

function fmtTime(ts?: number) {
  if (!ts) return '—';
  try {
    return new Date(ts).toLocaleString('ru-RU');
  } catch {
    return String(ts);
  }
}

function statusLabel(status: GroupStatus | ScanStatus) {
  switch (status) {
    case 'RUNNING':
      return 'В работе';
    case 'PENDING':
      return 'В очереди';
    case 'FINISHED':
      return 'Готово';
    case 'FAILED':
      return 'Ошибка';
    case 'TIMEOUT':
      return 'Таймаут';
    default:
      return status;
  }
}

function statusBadgeClass(status: GroupStatus | ScanStatus) {
  switch (status) {
    case 'FINISHED':
      return styles.badgeOk;
    case 'RUNNING':
      return styles.badgeRun;
    case 'PENDING':
      return styles.badgePending;
    case 'FAILED':
    case 'TIMEOUT':
      return styles.badgeErr;
    default:
      return styles.badgeNeutral;
  }
}

function scanKey(s: { kind: SfTargetKind; target: string }) {
  return `${s.kind}::${s.target}`;
}

export const Scan = () => {
  const navigate = useNavigate();
  const user = userStore((s) => s.user);

  const { id } = useParams({ from: '/layout/scans/$id' });
  const groupId = id;

  const [loading, setLoading] = useState(true);
  const [loadingStatuses, setLoadingStatuses] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [group, setGroup] = useState<GroupResultDto | null>(null);
  const [groupStatus, setGroupStatus] = useState<GroupStatus>('RUNNING');

  const [showRawResults, setShowRawResults] = useState(false);
  const [showGptJson, setShowGptJson] = useState(false);

  const pollTimerRef = useRef<number | null>(null);
  const stopPolling = () => {
    if (pollTimerRef.current) {
      window.clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  };

  const headerMeta = useMemo(() => {
    if (!group) return null;
    return {
      created: fmtTime(group.createdAt),
      finished: fmtTime(group.finishedAt),
      scansTotal: group.scans.length,
    };
  }, [group]);

  const fetchGroup = async () => {
    const { data } = await http.get<GroupResultDto>(`/spiderfoot/groups/${groupId}`);
    setGroup(data);
  };

  const fetchStatuses = async () => {
    const { data } = await http.get<GroupStatusesDto>(`/spiderfoot/groups/${groupId}/status`);
    setGroupStatus(data.status);

    setGroup((prev) => {
      if (!prev) return prev;

      const map = new Map<string, GroupStatusesDto['scans'][number]>();
      for (const s of data.scans) map.set(scanKey(s), s);

      const mergedScans = prev.scans.map((s) => {
        const upd = map.get(scanKey(s));
        if (!upd) return s;
        return {
          ...s,
          scanId: upd.scanId ?? s.scanId,
          status: upd.status,
          sfStatus: upd.sfStatus,
          error: upd.error,
          startedAt: upd.startedAt ?? s.startedAt,
          finishedAt: upd.finishedAt ?? s.finishedAt,
        };
      });

      return {
        ...prev,
        finishedAt: data.finishedAt ?? prev.finishedAt,
        maxParallelScans: data.maxParallelScans ?? prev.maxParallelScans,
        scans: mergedScans,
      };
    });

    return data.status;
  };

  const hardRefresh = async () => {
    try {
      setLoadingStatuses(true);
      await fetchStatuses();
      await fetchGroup();
      showInfoMessage('Обновлено');
    } catch {
      showInfoMessage('Не удалось обновить');
    } finally {
      setLoadingStatuses(false);
    }
  };

  const startPolling = () => {
    stopPolling();
    pollTimerRef.current = window.setInterval(async () => {
      try {
        const st = await fetchStatuses();
        if (st === 'FINISHED') {
          stopPolling();
          await fetchGroup();
        }
      } catch {
        // тихо
      }
    }, POLL_INTERVAL_MS);
  };

  const onCopy = async (text: string, okMsg: string) => {
    const p = navigator.clipboard?.writeText(text);
    if (!p) {
      showInfoMessage('Буфер обмена недоступен');
      return;
    }
    try {
      await p;
      showInfoMessage(okMsg);
    } catch {
      showInfoMessage('Не удалось скопировать');
    }
  };

  const onDeleteGroup = async () => {
    if (!groupId) return;
    const ok = window.confirm('Удалить группу сканов? Действие необратимо.');
    if (!ok) return;

    try {
      setDeleting(true);
      await http.delete(`/spiderfoot/groups/${groupId}`);
      showSuccessMessage('Группа удалена');
      navigate({ to: '/scans' });
    } catch {
      showInfoMessage('Не удалось удалить группу');
    } finally {
      setDeleting(false);
    }
  };

  const goToRaw = () => {
    setShowRawResults(true);
    const el = document.getElementById('raw-results');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (!user) return;

    let alive = true;

    (async () => {
      try {
        setLoading(true);
        await fetchGroup();
        const st = await fetchStatuses();
        if (!alive) return;
        if (st !== 'FINISHED') startPolling();
      } catch {
        showInfoMessage('Не удалось загрузить группу');
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      stopPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, user?.id]);

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.cardTag}>AUTH REQUIRED</div>
                <h2 className={styles.cardTitle}>Требуется авторизация</h2>
              </div>
            </div>

            <div className={styles.authRequired}>
              <div className={styles.authTitle}>Войдите, чтобы открыть группу</div>
              <div className={styles.authText}>Детали сканов доступны только авторизованным.</div>
              <Link to="/auth" className={styles.primaryBtn}>
                Перейти к входу
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.skeleton}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonGrid}>
              <div className={styles.skeletonCard} />
              <div className={styles.skeletonCard} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.cardTag}>NOT FOUND</div>
                <h2 className={styles.cardTitle}>Группа не найдена</h2>
              </div>
              <Link to="/scans" className={styles.ghostBtn}>
                К списку
              </Link>
            </div>

            <div className={styles.hint}>
              Проверь groupId в URL или права доступа (ownership на backend).
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isFinished = groupStatus === 'FINISHED' || Boolean(group.finishedAt);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <div className={styles.breadcrumbs}>
              <Link to="/scans" className={styles.breadcrumbLink}>
                Сканы
              </Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>Группа</span>
            </div>

            <h1 className={styles.title}>Группа сканов</h1>

            <div className={styles.metaRow}>
              <span className={`${styles.badge} ${statusBadgeClass(groupStatus)}`}>
                {statusLabel(groupStatus)}
              </span>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>groupId</span>
                <button
                  type="button"
                  className={styles.monoBtn}
                  onClick={() => onCopy(group.groupId, 'groupId скопирован')}
                  title="Скопировать groupId"
                >
                  {group.groupId}
                </button>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Target</span>
                <span className={`${styles.metaValue} ${styles.mono}`}>{group.originalTarget}</span>
              </div>
            </div>

            {headerMeta ? (
              <div className={styles.metaSubRow}>
                <div className={styles.metaSubItem}>
                  <span className={styles.metaSubLabel}>Создано</span>
                  <span className={styles.metaSubValue}>{headerMeta.created}</span>
                </div>
                <div className={styles.metaSubItem}>
                  <span className={styles.metaSubLabel}>Завершено</span>
                  <span className={styles.metaSubValue}>{headerMeta.finished}</span>
                </div>
                <div className={styles.metaSubItem}>
                  <span className={styles.metaSubLabel}>Сканов</span>
                  <span className={styles.metaSubValue}>{headerMeta.scansTotal}</span>
                </div>
                <div className={styles.metaSubItem}>
                  <span className={styles.metaSubLabel}>Параллельность</span>
                  <span className={styles.metaSubValue}>{group.maxParallelScans}</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={hardRefresh}
              disabled={loadingStatuses}
            >
              {loadingStatuses ? 'Обновляю…' : 'Обновить'}
            </button>

            <button
              type="button"
              className={styles.dangerBtn}
              onClick={onDeleteGroup}
              disabled={deleting}
              title="Удалить группу"
            >
              {deleting ? 'Удаление…' : 'Удалить'}
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTag}>SCANS</div>
                  <h2 className={styles.cardTitle}>Список сканов</h2>
                </div>

                {!isFinished ? (
                  <div className={styles.pollPill}>
                    <span className={styles.pollDot} />
                    realtime polling
                  </div>
                ) : (
                  <div className={styles.pollPillDone}>
                    <span className={styles.pollDotDone} />
                    completed
                  </div>
                )}
              </div>

              <div className={styles.table}>
                <div className={styles.tHead}>
                  <div>Kind</div>
                  <div>Target</div>
                  <div>Status</div>
                  <div>Time</div>
                </div>

                <div className={styles.tBody}>
                  {group.scans.map((s, idx) => (
                    <div key={`${scanKey(s)}-${idx}`} className={styles.tRow}>
                      <div className={styles.kindCell}>
                        <span className={styles.kind}>{s.kind}</span>
                      </div>

                      <div className={styles.targetCell}>
                        <span className={styles.target}>{s.target}</span>
                        {s.scanId ? (
                          <button
                            type="button"
                            className={styles.scanIdBtn}
                            onClick={() => onCopy(s.scanId!, 'scanId скопирован')}
                            title="Скопировать scanId"
                          >
                            {s.scanId}
                          </button>
                        ) : (
                          <span className={styles.scanIdMuted}>scanId: —</span>
                        )}
                      </div>

                      <div className={styles.statusCell}>
                        <span className={`${styles.badge} ${statusBadgeClass(s.status)}`}>
                          {statusLabel(s.status)}
                        </span>

                        {s.error ? <div className={styles.errorText}>{s.error}</div> : null}

                        {s.result !== undefined ? (
                          <button
                            type="button"
                            className={styles.inlineMiniBtn}
                            onClick={goToRaw}
                            title="Показать raw result ниже"
                          >
                            Result
                          </button>
                        ) : null}
                      </div>

                      <div className={styles.timeCell}>
                        <div className={styles.timeLine}>
                          <span className={styles.timeLabel}>start</span>
                          <span className={styles.timeValue}>{fmtTime(s.startedAt)}</span>
                        </div>
                        <div className={styles.timeLine}>
                          <span className={styles.timeLabel}>end</span>
                          <span className={styles.timeValue}>{fmtTime(s.finishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.tableHint}>
                В процессе выполнения обновляются только статусы. Полные результаты подтягиваются
                после завершения группы.
              </div>
            </div>

            <div id="raw-results" className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTag}>RAW</div>
                  <h2 className={styles.cardTitle}>Сырые результаты</h2>
                </div>

                <button
                  type="button"
                  className={styles.ghostBtn}
                  onClick={() => setShowRawResults((v) => !v)}
                >
                  {showRawResults ? 'Скрыть' : 'Показать'}
                </button>
              </div>

              {!showRawResults ? (
                <div className={styles.hint}>
                  Здесь отображаются raw-результаты (per scan). Может быть объёмно.
                </div>
              ) : (
                <div className={styles.rawGrid}>
                  {group.scans.map((s, idx) => (
                    <div key={`${scanKey(s)}-raw-${idx}`} className={styles.rawCard}>
                      <div className={styles.rawHeader}>
                        <div className={styles.rawTitleRow}>
                          <span className={styles.rawKind}>{s.kind}</span>
                          <span className={styles.rawTarget}>{s.target}</span>
                        </div>
                        <span className={`${styles.badge} ${statusBadgeClass(s.status)}`}>
                          {statusLabel(s.status)}
                        </span>
                      </div>

                      <pre className={styles.code}>
                        {s.result === undefined ? '—' : JSON.stringify(s.result, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.sideCard}>
              <div className={styles.sideTitle}>Действия</div>

              <div className={styles.sideActions}>
                <Link to="/scans" className={styles.secondaryBtn}>
                  К списку
                </Link>

                <Link to="/dashboard" className={styles.ghostBtn}>
                  Новый запуск
                </Link>

                <button
                  type="button"
                  className={styles.ghostBtn}
                  onClick={() => onCopy(group.groupId, 'groupId скопирован')}
                >
                  Скопировать groupId
                </button>
              </div>

              <div className={styles.sideHint}>
                Удаление группы также удалит результаты и GPT-анализ на backend.
              </div>
            </div>

            <div className={styles.sideCard}>
              <div className={styles.sideTitle}>GPT-анализ</div>

              {!group.gpt ? (
                <div className={styles.sideHint}>
                  GPT-анализ появится после завершения всей группы.
                </div>
              ) : (
                <>
                  <div className={styles.gptMeta}>
                    <div className={styles.gptMetaRow}>
                      <span className={styles.gptMetaLabel}>model</span>
                      <span className={styles.gptMetaValue}>{group.gpt.model || '—'}</span>
                    </div>
                    <div className={styles.gptMetaRow}>
                      <span className={styles.gptMetaLabel}>created</span>
                      <span className={styles.gptMetaValue}>{fmtTime(group.gpt.createdAt)}</span>
                    </div>
                  </div>

                  {group.gpt.analysisText ? (
                    <div className={styles.gptTextBox}>
                      <div className={styles.gptTextTitle}>Analysis</div>
                      <div className={styles.gptText}>{group.gpt.analysisText}</div>
                    </div>
                  ) : (
                    <div className={styles.sideHint}>analysisText отсутствует</div>
                  )}

                  <button
                    type="button"
                    className={styles.ghostBtn}
                    onClick={() => setShowGptJson((v) => !v)}
                  >
                    {showGptJson ? 'Скрыть JSON' : 'Показать JSON'}
                  </button>

                  {showGptJson ? (
                    <pre className={styles.code}>
                      {JSON.stringify(
                        {
                          digest: group.gpt.digest,
                          analysisJson: group.gpt.analysisJson,
                          prompt: group.gpt.prompt,
                        },
                        null,
                        2
                      )}
                    </pre>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
