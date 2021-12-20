import React, { Suspense, useEffect } from 'react'
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import noAuth from '@/pages/no-auth';
import TopBar from '@/components/topbar'
import { cookie } from "@/utils/tools";
import { LoadingElement } from '@/components/loading'
import Api from "@/api/index";

const RouterView = () => {
  useEffect(() => {
    const token = cookie().get('token');
    if(!token){
      window.location.href = '/noAuth'
      let code = '张乐乐'
      Api.getUserInfo(code).then((res)=>{
        if(res.code===200){
          const cookieSet = cookie().set;
          cookieSet('token', res.data, 10);
        } else {
          window.location.href = '/noAuth'
        }
      })
    }
  }, []);
  return (<BrowserRouter basename="">
    <TopBar />
    <Suspense fallback={LoadingElement}>
      <Switch>
        {routes.map(route => (
          <Route key={route.path} path={route.path} component={route.component} exact={route.exact}/>
        ))}
        <Route
          component={noAuth}
          exact
          path="/noAuth"
        />
        <Redirect to="/noAuth" />
      </Switch>
    </Suspense>
  </BrowserRouter>)
}
export default RouterView;
