import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
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
    title: '风险管理',
    selected: false,
    path: '/cockpit/RM'
  }
]

function TopBar() {

  const history = useHistory()
  const pathname = history.location.pathname
  const [tabBar, settabBar] = useState(tabs)
  const changeTab = (index: number, path: string) => {
    settabBar(
      tabBar.map((tab, idx) => {
        tab.selected = index === idx
        return tab
      })
    )
    history.push(path)
  }
  const [hideTab, sethideTab] = useState(false)
  useEffect(() => {
    console.log();
    console.log('pathname', pathname, tabs.map(item => item.path).includes(pathname));
    sethideTab(!tabs.map(item => item.path).includes(pathname))
  }, [pathname])
  return (
    <div className='top-bar' style={{
      display: hideTab ? 'none' : 'flex'
    }}>
      {tabBar.map((item, index)=>
        <div key={item.path} className={`tab-item ${item.selected?'selected':''}`} onClick={()=>{changeTab(index, item.path)}}>{item.title}</div>
      )}
    </div> 
  )
}

export default withRouter(TopBar)