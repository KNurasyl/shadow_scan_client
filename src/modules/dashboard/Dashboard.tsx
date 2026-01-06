import { Link } from '@tanstack/react-router';
import { useMemo, useState, type FormEvent } from 'react';
import { createSpiderfootScanRequest } from '../../share/api/spiderfoot';
import { showInfoMessage, showSuccessMessage } from '../../share/functions';
import { userStore } from '../../share/store/user.store';
import type {
  CreateSpiderfootScanDto,
  CreateSpiderfootScanResponse,
  SfTargetKind,
  SpiderfootScanMode,
  SpiderfootScanSpeed,
} from '../../share/types/spiderfoot';
import styles from './Dashboard.module.css';

type KindOption = {
  value: SfTargetKind;
  label: string;
  hint: string;
};

const KIND_OPTIONS: KindOption[] = [
  { value: 'EMAILADDR', label: 'Email', hint: 'user@example.com' },
  { value: 'DOMAIN_NAME', label: 'Домен', hint: 'example.com (без https://)' },
  { value: 'URL', label: 'URL', hint: 'https://example.com/profile' },
  { value: 'IP_ADDRESS', label: 'IPv4', hint: '8.8.8.8' },
  { value: 'IPV6_ADDRESS', label: 'IPv6', hint: '2001:db8::1' },
  { value: 'PHONE_NUMBER', label: 'Телефон', hint: '+77001234567' },
  { value: 'HUMAN_NAME', label: 'ФИО', hint: 'Иван Иванов' },
  { value: 'USERNAME', label: 'Username', hint: 'nickname' },
  { value: 'SOCIAL_MEDIA', label: 'Соцсеть', hint: '@nickname или ссылка' },
  { value: 'INTERNET_NAME', label: 'Internet name', hint: 'host.example.com' },
  { value: 'BGP_AS_OWNER', label: 'BGP AS', hint: 'только цифры (например 15169)' },
  { value: 'NETBLOCK_OWNER', label: 'Netblock owner', hint: 'описание/владелец' },
  { value: 'NETBLOCKV6_OWNER', label: 'Netblock v6 owner', hint: 'описание/владелец' },
  { value: 'BITCOIN_ADDRESS', label: 'BTC address', hint: '1BoatSLRHtKNngkdXEeobR76b53LETtpyT' },
  { value: 'RAW', label: 'Raw', hint: 'произвольная строка (осторожно)' },
];

const EXAMPLES: Array<{ label: string; value: string; kind?: SfTargetKind }> = [
  { label: 'Email', value: 'user@example.com', kind: 'EMAILADDR' },
  { label: 'Домен', value: 'example.com', kind: 'DOMAIN_NAME' },
  { label: 'IP', value: '8.8.8.8', kind: 'IP_ADDRESS' },
  { label: 'Телефон', value: '+77001234567', kind: 'PHONE_NUMBER' },
  { label: 'ФИО', value: 'Иван Иванов', kind: 'HUMAN_NAME' },
  { label: 'Username', value: 'nickname', kind: 'USERNAME' },
];

function normalizeTarget(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

export const Dashboard = () => {
  const user = userStore((s) => s.user);

  const [target, setTarget] = useState('');
  const [speed, setSpeed] = useState<SpiderfootScanSpeed>('slow');
  const [mode, setMode] = useState<SpiderfootScanMode>('multi');
  const [kind, setKind] = useState<SfTargetKind | ''>('');
  const [maxParallelScans, setMaxParallelScans] = useState<number | ''>('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastRun, setLastRun] = useState<CreateSpiderfootScanResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const normalizedTarget = useMemo(() => normalizeTarget(target), [target]);
  const canSubmit = Boolean(user) && normalizedTarget.length > 0;

  const onCopyGroupId = () => {
    const groupId = lastRun?.groupId;
    if (!groupId) return;

    const p = navigator.clipboard?.writeText(groupId);
    if (!p) {
      showInfoMessage('Буфер обмена недоступен');
      return;
    }

    p.then(() => showInfoMessage('groupId скопирован')).catch(() =>
      showInfoMessage('Не удалось скопировать')
    );
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || loading) return;

    const dto: CreateSpiderfootScanDto = {
      target: normalizedTarget,
      speed,
      mode,
      kind: kind || undefined,
      maxParallelScans: typeof maxParallelScans === 'number' ? maxParallelScans : undefined,
    };

    try {
      setLoading(true);
      const data: CreateSpiderfootScanResponse = await createSpiderfootScanRequest(dto);
      setLastRun(data);
      showSuccessMessage('Скан запущен');
    } catch {
      showInfoMessage('Не удалось запустить скан');
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setTarget('');
    setSpeed('slow');
    setMode('multi');
    setKind('');
    setMaxParallelScans('');
    setLastRun(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Панель</h1>
            <p className={styles.subtitle}>
              Запускайте OSINT-сканы по таргету и получайте статус выполнения в реальном времени.
            </p>
          </div>
          <div className={styles.headerActions}>
            {user ? (
              <div className={styles.userPill}>
                <span className={styles.userDot} />
                {user.email}
              </div>
            ) : (
              <Link to="/auth" className={styles.headerLink}>
                Войти
              </Link>
            )}
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTag}>CREATE SCAN</div>
                  <h2 className={styles.cardTitle}>Новый запуск</h2>
                </div>
                <button
                  type="button"
                  className={styles.ghostBtn}
                  onClick={() => setShowAdvanced((v) => !v)}
                >
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
                  <div className={styles.examples}>
                    <div className={styles.examplesLabel}>Примеры:</div>
                    <div className={styles.examplesRow}>
                      {EXAMPLES.map((ex) => (
                        <button
                          key={ex.label}
                          type="button"
                          className={styles.chip}
                          onClick={() => {
                            setTarget(ex.value);
                            if (ex.kind) setKind(ex.kind);
                          }}
                        >
                          {ex.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={onSubmit} className={styles.form}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="target">
                        Таргет
                      </label>
                      <input
                        id="target"
                        className={styles.input}
                        placeholder="Email, домен, IP, username, ФИО..."
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        required
                      />
                      <div className={styles.hint}>
                        Для домена указывайте без протокола:{' '}
                        <span className={styles.mono}>example.com</span>
                      </div>
                    </div>

                    {showAdvanced && (
                      <div className={styles.advancedGrid}>
                        <div className={styles.field}>
                          <label className={styles.label}>Скорость</label>
                          <div className={styles.segment}>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${
                                speed === 'fast' ? styles.segmentActive : ''
                              }`}
                              onClick={() => setSpeed('fast')}
                            >
                              Fast
                            </button>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${
                                speed === 'slow' ? styles.segmentActive : ''
                              }`}
                              onClick={() => setSpeed('slow')}
                            >
                              Slow
                            </button>
                          </div>
                          <div className={styles.hint}>
                            Fast — меньше сценариев и мягче нагрузка; Slow — полный профиль.
                          </div>
                        </div>

                        <div className={styles.field}>
                          <label className={styles.label}>Режим</label>
                          <div className={styles.segment}>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${
                                mode === 'single' ? styles.segmentActive : ''
                              }`}
                              onClick={() => setMode('single')}
                            >
                              Single
                            </button>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${
                                mode === 'multi' ? styles.segmentActive : ''
                              }`}
                              onClick={() => setMode('multi')}
                            >
                              Multi
                            </button>
                          </div>
                          <div className={styles.hint}>
                            Single — один скан за раз; Multi — параллельные сценарии.
                          </div>
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
                              onChange={(e) => setKind(e.target.value as SfTargetKind | '')}
                            >
                              <option value="">Авто (по regex)</option>
                              {KIND_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label} ({opt.value})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className={styles.hint}>
                            {kind
                              ? KIND_OPTIONS.find((k) => k.value === kind)?.hint
                              : 'Backend сам определит сценарии и запустит группу.'}
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
                            onChange={(e) => {
                              const v = e.target.value;
                              if (v === '') return setMaxParallelScans('');
                              const n = Number(v);
                              if (Number.isNaN(n)) return;
                              setMaxParallelScans(n);
                            }}
                          />
                          <div className={styles.hint}>
                            В Fast режиме backend ограничит максимум до 2.
                          </div>
                        </div>
                      </div>
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

                      {lastRun?.groupId ? (
                        <button type="button" className={styles.ghostBtn} onClick={onCopyGroupId}>
                          Скопировать groupId
                        </button>
                      ) : null}
                    </div>
                  </form>
                </>
              )}
            </div>

            {lastRun && (
              <div className={styles.resultCard}>
                <div className={styles.resultHeader}>
                  <div>
                    <div className={styles.cardTag}>RUNNING</div>
                    <h3 className={styles.resultTitle}>Группа создана</h3>
                  </div>
                  <div className={styles.groupId}>
                    <span className={styles.groupIdLabel}>groupId</span>
                    <div className={styles.groupIdRow}>
                      <span className={styles.mono}>{lastRun.groupId}</span>
                      <button type="button" className={styles.copyBtn} onClick={onCopyGroupId}>
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.resultGrid}>
                  <div className={styles.resultBlock}>
                    <div className={styles.resultBlockTitle}>Запущенные сканы</div>
                    <div className={styles.scanList}>
                      {lastRun.scans.map((s) => (
                        <div key={s.scanId} className={styles.scanRow}>
                          <span className={styles.scanKind}>{s.kind}</span>
                          <span className={styles.scanTarget}>{s.target}</span>
                          <span className={styles.scanId} title={s.scanId}>
                            {s.scanId}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.resultBlock}>
                    <div className={styles.resultBlockTitle}>Socket канал</div>
                    <div className={styles.socketBox}>
                      <div className={styles.socketRow}>
                        <span className={styles.socketLabel}>namespace</span>
                        <span className={styles.mono}>{lastRun.socket.namespace}</span>
                      </div>
                      <div className={styles.socketRow}>
                        <span className={styles.socketLabel}>room</span>
                        <span className={styles.mono}>{lastRun.socket.room}</span>
                      </div>
                    </div>
                    <div className={styles.hint}>
                      Детали и результаты удобнее показывать на странице группы{' '}
                      <span className={styles.mono}>/scans/:groupId</span>.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.right}>
            <div className={styles.sideCard}>
              <div className={styles.sideTitle}>Рекомендации по вводу</div>
              <ul className={styles.sideList}>
                <li>
                  Домен указывайте без протокола: <span className={styles.mono}>example.com</span>
                </li>
                <li>
                  Для ФИО можно оставить авто-режим или выбрать{' '}
                  <span className={styles.mono}>HUMAN_NAME</span>
                </li>
                <li>
                  Если нужно “мягко” для демо-сервера — используйте{' '}
                  <span className={styles.mono}>Fast</span>
                </li>
              </ul>
            </div>

            <div className={styles.sideCard}>
              <div className={styles.sideTitle}>Предпросмотр настроек</div>
              <div className={styles.preview}>
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Target</span>
                  <span className={`${styles.previewValue} ${styles.mono}`}>
                    {normalizedTarget || '—'}
                  </span>
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
                В обычном режиме backend сам выберет сценарии (email/domain/ip/username и т.д.) и
                запустит группу.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
