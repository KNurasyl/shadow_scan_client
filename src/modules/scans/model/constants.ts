import type { StatusFilter } from '../../../share/types/scans';

export const STATUS_OPTIONS: Array<{ label: string; value: StatusFilter }> = [
  { label: 'Все', value: 'ALL' },
  { label: 'RUNNING', value: 'RUNNING' },
  { label: 'FINISHED', value: 'FINISHED' },
];

export const LIMIT_OPTIONS = [10, 20, 50, 100] as const;
