import React, { Suspense, useState, useEffect } from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import noAuth from '@/pages/no-auth';
import TopBar from '@/components/topbar';
import { LoadingElement } from '@/components/loading';
import { cookie, getQuery } from "@/utils/tools";
import Api from "@/api/index/index";
import envConfig from '@/config'
import { routes } from './routes'

const Layout = ()=>{
  const [routesDom, setRoutesDom] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserInfo = ()=>{
    const code = getQuery('code');
    const token = cookie().get('token');
    const cookieSet = cookie().set;
    cookieSet('token', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IuW8oOS5kOS5kCIsImV4cCI6MTY0MDA1MTA3NiwiaWF0IjoxNjM5OTY0Njc2fQ.Gb8yF7Vs_RZeP3lmbtEK3Wb-5i3aFYrtqT4D_avCdQU', 1);
    const routesDom = rendeRoutes(routes);
    setRoutesDom(routesDom);
    // if(!token){
    //   if(code){
    //     Api.getUserInfo(code).then((res)=>{
    //       if(res.code===200){
    //         const cookieSet = cookie().set;
    //         cookieSet('token', res.data, 1);
    //         const routesDom = rendeRoutes(routes);
    //         setRoutesDom(routesDom);
    //       } else {
    //         const routesDom = rendeRoutes([]);
    //         setRoutesDom(routesDom);
    //       }
    //     })
    //     .catch(()=>{
    //       const routesDom = rendeRoutes([]);
    //       setRoutesDom(routesDom);
    //     })
    //   }else{
    //     window.location.replace(`${envConfig.WXORIGIN}/connect/oauth2/authorize?appid=${envConfig.APPID}&redirect_uri=${encodeURI(window.location.href)}&response_type=code&scope=snsapi_userinfo&agentid=${envConfig.AGENTID}&state=CICC#wechat_redirect`)
    //   }
      
    // } else {
    //   const routesDom = rendeRoutes(routes);
    //   setRoutesDom(routesDom);
    // }
  }

  useEffect(() => {
    getUserInfo()
  }, []);

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
               <Redirect to= '/cockpit/FI' />
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
