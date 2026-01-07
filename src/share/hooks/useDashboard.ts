import { useMemo, useState, type FormEvent } from 'react';
import { KIND_OPTIONS } from '../../modules/dashboard/model/constants';
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
import { normalizeTarget } from '../utils/normalizeTarget';

type ParallelValue = number | '';

function getHintByKind(kind: SfTargetKind | ''): string | undefined {
  if (!kind) return undefined;
  return KIND_OPTIONS.find((k) => k.value === kind)?.hint;
}

export function useDashboard() {
  const user = userStore((s) => s.user);

  const [target, setTarget] = useState('');
  const [speed, setSpeed] = useState<SpiderfootScanSpeed>('slow');
  const [mode, setMode] = useState<SpiderfootScanMode>('multi');
  const [kind, setKind] = useState<SfTargetKind | ''>('');
  const [maxParallelScans, setMaxParallelScans] = useState<ParallelValue>('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastRun, setLastRun] = useState<CreateSpiderfootScanResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const normalizedTarget = useMemo(() => normalizeTarget(target), [target]);
  const canSubmit = Boolean(user) && normalizedTarget.length > 0;

  const kindHint = useMemo(() => getHintByKind(kind), [kind]);

  const copyGroupId = async () => {
    const groupId = lastRun?.groupId;
    if (!groupId) return;

    const p = navigator.clipboard?.writeText(groupId);
    if (!p) {
      showInfoMessage('Буфер обмена недоступен');
      return;
    }

    try {
      await p;
      showInfoMessage('groupId скопирован');
    } catch {
      showInfoMessage('Не удалось скопировать');
    }
  };

  const submit = async (e: FormEvent) => {
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

  const reset = () => {
    setTarget('');
    setSpeed('slow');
    setMode('multi');
    setKind('');
    setMaxParallelScans('');
    setLastRun(null);
  };

  const setParallelFromInput = (raw: string) => {
    if (raw === '') return setMaxParallelScans('');
    const n = Number(raw);
    if (Number.isNaN(n)) return;
    setMaxParallelScans(n);
  };

  const applyExample = (value: string, exampleKind?: SfTargetKind) => {
    setTarget(value);
    if (exampleKind) setKind(exampleKind);
  };

  return {
    user,
    state: {
      target,
      speed,
      mode,
      kind,
      maxParallelScans,
      showAdvanced,
      lastRun,
      loading,
      normalizedTarget,
      canSubmit,
      kindHint,
    },
    actions: {
      setTarget,
      setSpeed,
      setMode,
      setKind,
      setShowAdvanced,
      setParallelFromInput,
      applyExample,
      submit,
      reset,
      copyGroupId,
    },
  };
}
