import { lazy } from 'react'
const Qcc = lazy(() => import(/* webpackChunkName: "Index" */ '@/pages/qcc'))
const RelatedParty = lazy(() => import(/* webpackChunkName: "About" */ '@/pages/relatedParty'))
const Detail = lazy(() => import(/* webpackChunkName: "Detail" */ '@/pages/detail'))

export interface RouteConfig {
  path: string
  component?: any
  exact?: boolean
}

export const routes: RouteConfig[] = [
  {
    path: '/qcc',
    component: Qcc,
    exact: true
  },
  {
    path: '/relatedParty',
    component: RelatedParty,
    exact: true
  },
  {
    path: '/detail',
    component: Detail,
    exact: true
  }
]
