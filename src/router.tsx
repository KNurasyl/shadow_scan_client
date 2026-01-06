import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from '@tanstack/react-router';
import { AppLayout } from './core/AppLayout';

const rootRoute = createRootRoute();

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: lazyRouteComponent(() => import('./modules/home')),
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: lazyRouteComponent(() => import('./modules/auth')),
});

const routeTree = rootRoute.addChildren([layoutRoute.addChildren([indexRoute]), authRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
