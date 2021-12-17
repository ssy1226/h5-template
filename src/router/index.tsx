import React, { Suspense } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { routes } from './routes'
import TopBar from '@/components/topbar'
import { LoadingElement } from '@/components/loading'

/* Use components to define routes */
const RouterView = () => (
  <BrowserRouter basename="">
    <TopBar />
    <Suspense fallback={LoadingElement}>
      <Switch>
        {routes.map(route => (
          <Route key={route.path} path={route.path} component={route.component} exact={route.exact}/>
        ))}
        <Redirect to='/cockpit'/>
      </Switch>
    </Suspense>
  </BrowserRouter>
)
export default RouterView
