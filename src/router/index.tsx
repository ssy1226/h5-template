import React, { Suspense, useState, useEffect } from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import noAuth from '@/pages/no-auth';
import TopBar from '@/components/topbar';
import { LoadingElement } from '@/components/loading';
import { cookie, getQuery } from "@/utils/tools";
import Api from "@/api/index/index";
import envConfig from '@/config'
import { routes } from './routes'

const Layout = (props)=>{
  const [routesDom, setRoutesDom] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserInfo = ()=>{
    // 处理登录
    const routesDom = rendeRoutes(routes);
    setRoutesDom(routesDom);
  }

  useEffect(() => {
    getUserInfo()
  }, []); // eslint-disable-line

  const rendeRoutes = (routes) => {
    if (!routes.length) {
      return <Redirect to="/noAuth" />;
    }
    return( routes.map((routeItem) => {
      const { path } = routeItem;
      return (
        <Route
          key={routeItem.path}
          render={
              (props) => (
                <routeItem.component
                  {...props}
                />
              )
            }
          exact={routeItem.exact !== undefined ? routeItem.exact : true}
          path={path}
        />
      );
    }));
  }
  return routesDom;
}


const RouterGuard =()=> {
  const code = getQuery('code');
  return (
    <BrowserRouter basename="">
      <TopBar />
      <Suspense fallback={LoadingElement}>
          <Switch>
            <Route
              component={noAuth}
              exact
              path="/noAuth"
            />
            <Route path='/' exact render={()=> (
               <Redirect to={`/detail${code?`?code=${code}`: ''}`}/>
            )}/>
            <Route
             // @ts-ignore
              component={Layout}
              path="*"
            />
          </Switch>
        </Suspense>
    </BrowserRouter>
  );
}
export default RouterGuard
