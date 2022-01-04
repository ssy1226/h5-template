import loadable from '@loadable/component';

export interface RouteConfig {
  path: string
  component?: any
  exact?: boolean
}

export const routes: RouteConfig[] = [
  {
    path: '/detail',
    component: loadable(() => import('@/pages/detail')),
    exact: true
  }
]
