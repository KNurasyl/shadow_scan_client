import type { PropsWithChildren } from 'react';
import { userStore } from '../share/store/user.store';

export function AuthHydrationGate({ children }: PropsWithChildren) {
  const hydrated = userStore((s) => s.hydrated);
  if (!hydrated) return null;
  return children;
}
