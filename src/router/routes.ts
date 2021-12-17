import loadable from '@loadable/component';

export interface RouteConfig {
  path: string
  component?: any
  exact?: boolean
}

export const routes: RouteConfig[] = [
  {
    path: '/cockpit',
    component:loadable(() => import('@/pages/cockpit/index.jsx')),
    exact: true
  },
  {
    path: '/cockpit/FI',
    component:loadable(() => import('@/pages/cockpit/FI')),
    exact: true
  },
  {
    path: '/cockpit/BI',
    component:loadable(() => import('@/pages/cockpit/BI')),
    exact: true
  },
  {
    path: '/cockpit/RM',
    component: loadable(() => import('@/pages/cockpit/RM')),
    exact: true
  },
  {
    path: '/detail',
    component: loadable(() => import('@/pages/detail')),
    exact: true
  }
]
