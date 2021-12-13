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
    path: '/qcc',
    component:loadable(() => import('@/pages/qcc')),
    exact: true
  },
  {
    path: '/relatedParty',
    component: loadable(() => import('@/pages/relatedParty')),
    exact: true
  },
  {
    path: '/detail',
    component: loadable(() => import('@/pages/detail')),
    exact: true
  }
]
