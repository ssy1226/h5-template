import React, { useState, useEffect } from 'react';
import { useHistory, withRouter, NavLink  } from 'react-router-dom';
import "./index.scss";

const tabs = [
  {
    title: 'title1',
    selected: true,
    path: '/path'
  },
  {
    title: 'title2',
    selected: false,
    path: '/path'
  },
  {
    title: 'title3',
    selected: false,
    path: '/path
  },
  {
    title: 'title4',
    selected: false,
    path: '/path'
  }
]

function TopBar() {
  const history = useHistory()
  const pathname = history.location.pathname.split('?')[0];
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
