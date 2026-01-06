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

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/dashboard',
  component: lazyRouteComponent(() => import('./modules/dashboard')),
});

const scansRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/scans',
  component: lazyRouteComponent(() => import('./modules/scans')),
});

const scanRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/scans/$id',
  component: lazyRouteComponent(() => import('./modules/scan')),
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([indexRoute, dashboardRoute, scansRoute, scanRoute]),
  authRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
