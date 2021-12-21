import React, { useState, useEffect } from 'react';
import { useHistory, withRouter, NavLink  } from 'react-router-dom';
import "./index.scss";

const tabs = [
  {
    title: '财务',
    selected: true,
    path: '/cockpit/FI'
  },
  {
    title: '业务',
    selected: false,
    path: '/cockpit/BI'
  },
  {
    title: '网点及人员',
    selected: false,
    path: '/qcc'
  },
  {
    title: '风险管理',
    selected: false,
    path: '/cockpit/RM'
  }
]

function TopBar() {
  const history = useHistory()
  const pathname = history.location.pathname;
  const [hideTab, sethideTab] = useState(false);
  useEffect(() => {
    sethideTab(!tabs.map(item => item.path).includes(pathname))
  }, [pathname]);
  return (
    <div className='top-bar' style={{
      display: hideTab ? 'none' : 'flex'
    }}>
      {tabs.map((item, index)=>
      <NavLink to={item.path} replace activeClassName="selected" className='tab-item' key={item.path}>
        {item.title}
      </NavLink>
      )}
    </div> 
  )
}

export default withRouter(TopBar)