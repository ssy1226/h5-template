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
        <p className='tips-text'>
          查看权限申请，请联系驾驶舱PO <span className='tips-name'>朱婷、夏娴</span>若需要其他技术支持 请联系IT <span className='tips-name'>仇新洋</span>
        </p>
      </div>
    </div>
  )
}

export default Index
