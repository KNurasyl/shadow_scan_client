import type { SfTargetKind } from './spiderfoot';

export type GroupStatus = 'RUNNING' | 'FINISHED';
export type StatusFilter = 'ALL' | GroupStatus;

export type SpiderfootGroupListItem = {
  groupId: string;
  originalTarget: string;
  createdAt: number;
  finishedAt?: number;
  maxParallelScans: number;
  status: GroupStatus;
};

export type ListGroupsResponse = {
  items: SpiderfootGroupListItem[];
  total: number;
};

export type ScanStatus = 'PENDING' | 'RUNNING' | 'FINISHED' | 'FAILED' | 'TIMEOUT';

export type GroupResultDto = {
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

export type GroupStatusesDto = {
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
