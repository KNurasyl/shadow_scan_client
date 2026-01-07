import type { SfTargetKind } from '../../share/types/spiderfoot';
import type { GroupStatus, ScanStatus } from '../types/scans';

export const POLL_INTERVAL_MS = 2500;

export function fmtTime(ts?: number) {
  if (!ts) return '—';
  try {
    return new Date(ts).toLocaleString('ru-RU');
  } catch {
    return String(ts);
  }
}

export function statusLabel(status: GroupStatus | ScanStatus) {
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

export function scanKey(s: { kind: SfTargetKind; target: string }) {
  return `${s.kind}::${s.target}`;
}
