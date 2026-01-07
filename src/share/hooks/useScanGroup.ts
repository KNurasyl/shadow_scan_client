import { useNavigate, useParams } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { http } from '../../share/api/http';
import { showInfoMessage, showSuccessMessage } from '../../share/functions';
import { userStore } from '../../share/store/user.store';
import type { GroupResultDto, GroupStatus, GroupStatusesDto } from '../types/scans';
import { POLL_INTERVAL_MS, scanKey } from '../utils/helpers';

async function copyToClipboard(text: string, okMsg: string) {
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
}

export function useScanGroup() {
  const navigate = useNavigate();
  const user = userStore((s) => s.user);

  const { id } = useParams({ from: '/layout/scans/$id' });
  const groupId = id;

  const [loading, setLoading] = useState(true);
  const [loadingStatuses, setLoadingStatuses] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [group, setGroup] = useState<GroupResultDto | null>(null);
  const [groupStatus, setGroupStatus] = useState<GroupStatus>('RUNNING');

  const [showRaw, setShowRaw] = useState(false);
  const [showGptJson, setShowGptJson] = useState(false);

  const pollTimerRef = useRef<number | null>(null);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      window.clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const fetchGroup = useCallback(async () => {
    const { data } = await http.get<GroupResultDto>(`/spiderfoot/groups/${groupId}`);
    setGroup(data);
  }, [groupId]);

  const fetchStatuses = useCallback(async (): Promise<GroupStatus> => {
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
  }, [groupId]);

  const startPolling = useCallback(() => {
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
  }, [fetchGroup, fetchStatuses, stopPolling]);

  const hardRefresh = useCallback(async () => {
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
  }, [fetchGroup, fetchStatuses]);

  const onDeleteGroup = useCallback(async () => {
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
  }, [groupId, navigate]);

  const headerMeta = useMemo(() => {
    if (!group) return null;
    return {
      createdAt: group.createdAt,
      finishedAt: group.finishedAt,
      scansTotal: group.scans.length,
    };
  }, [group]);

  const isFinished = groupStatus === 'FINISHED' || Boolean(group?.finishedAt);

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
  }, [user, fetchGroup, fetchStatuses, startPolling, stopPolling]);

  const actions = {
    copyGroupId: () => group?.groupId && copyToClipboard(group.groupId, 'groupId скопирован'),
    copyScanId: (scanId: string) => copyToClipboard(scanId, 'scanId скопирован'),
    hardRefresh,
    onDeleteGroup,
    toggleRaw: () => setShowRaw((v) => !v),
    toggleGptJson: () => setShowGptJson((v) => !v),
    setShowRaw,
    setShowGptJson,
  };

  return {
    user,
    groupId,
    state: {
      loading,
      loadingStatuses,
      deleting,
      group,
      groupStatus,
      isFinished,
      headerMeta,
      showRaw,
      showGptJson,
    },
    actions,
  };
}
