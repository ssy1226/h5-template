import React from 'react'
import noPermission from '../../assets/no_permission.png'
import './index.scss';

function Index() {
  const updateInfo = async () => {
    
  }
  return (
    <div className="no-auth">
        <div className="auth-detail">
          <img src={noPermission} alt="没有权限" />
          <p>您没有权限访问该页面</p>
        </div>
    </div>
  )
}

export default Index
