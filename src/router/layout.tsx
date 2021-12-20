import React, { useEffect, useState } from 'react'
import {Route, Redirect } from 'react-router-dom'
import { routes } from './routes'
import { cookie } from "@/utils/tools";
import Api from "@/api/index";

const Layout = () => {
  const [hasAuth, setAuth] = useState(false);
  useEffect(() => {
    const token = cookie().get('token');
    if(!token){
      let code = '张乐乐'
      Api.getUserInfo(code).then((res)=>{
        if(res.code===200){
          const cookieSet = cookie().set;
          cookieSet('token', res.data, 10);
        }  
      })
    }else {
      setAuth(true)
    }
    console.log('useEffect', hasAuth);
  }, []);
  if (!hasAuth) {
    return <Redirect to="/noAuth" />;
  }
  return  routes.map(route => (
    <Route key={route.path} path={route.path} component={route.component} exact={route.exact}/>
  )) ;
}
export default Layout;
