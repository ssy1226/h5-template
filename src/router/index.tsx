import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { routes } from './routes'
import noAuth from '@/pages/no-auth';
import TopBar from '@/components/topbar'
import { cookie } from "@/utils/tools";
import { LoadingElement } from '@/components/loading'
import Layout from "./layout";
import Api from "@/api/index";

const RouterView = () => {
  // const [hasAuth, setAuth] = useState(false);
  // useEffect(() => {
  //   const token = cookie().get('token');
  //   if(!token){
  //     let code = '张乐乐'
  //     Api.getUserInfo(code).then((res)=>{
  //       if(res.code===200){
  //         const cookieSet = cookie().set;
  //         cookieSet('token', res.data, 10);
  //       }  
  //     })
  //   }else {
  //     setAuth(true)
  //   }
  // }, []);
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
      </Switch>
    </Suspense>
  </BrowserRouter>)
}
export default RouterView;
