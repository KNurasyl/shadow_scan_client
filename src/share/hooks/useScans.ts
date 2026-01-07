import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { http } from '../../share/api/http';
import { showErrorMessage, showInfoMessage } from '../../share/functions';
import { userStore } from '../../share/store/user.store';
import type { ListGroupsResponse, SpiderfootGroupListItem, StatusFilter } from '../types/scans';

type UseScansState = {
  user: unknown | null;
  status: StatusFilter;
  limit: number;
  offset: number;
  items: SpiderfootGroupListItem[];
  total: number;
  loading: boolean;
  page: number;
  pages: number;
  canPrev: boolean;
  canNext: boolean;
};

export function useScans() {
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

  const canPrev = offset > 0;
  const canNext = offset + limit < total;

  const fetchGroups = useCallback(async () => {
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
  }, [user, limit, offset, status]);

  useEffect(() => {
    void fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    setOffset(0);
  }, [status, limit]);

  const openGroup = useCallback(
    (groupId: string) => {
      navigate({ to: `/scans/${groupId}` });
    },
    [navigate]
  );

  const copy = useCallback((value: string) => {
    const p = navigator.clipboard?.writeText(value);
    if (!p) {
      showInfoMessage('Буфер обмена недоступен');
      return;
    }
    p.then(() => showInfoMessage('Скопировано')).catch(() =>
      showInfoMessage('Не удалось скопировать')
    );
  }, []);

  const prev = useCallback(() => setOffset((v) => Math.max(0, v - limit)), [limit]);
  const next = useCallback(
    () => setOffset((v) => Math.min((pages - 1) * limit, v + limit)),
    [limit, pages]
  );

  const state: UseScansState = {
    user,
    status,
    limit,
    offset,
    items,
    total,
    loading,
    page,
    pages,
    canPrev,
    canNext,
  };

  const actions = {
    setStatus,
    setLimit,
    setOffset,
    fetchGroups,
    openGroup,
    copy,
    prev,
    next,
  };

  return { state, actions };
}
