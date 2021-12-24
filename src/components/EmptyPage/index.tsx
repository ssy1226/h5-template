import React from 'react'
import './index.scss'

interface IProps {
  imgUrl?: string,
  tipText?: string,
  // 无权限页面设置为 true
  noAuth?: Boolean
}
// 空页面组件
const EmptyPage = (props: IProps) => {
  const {
    imgUrl,
    tipText = '',
    noAuth = false
  } = props;
  return (
    <div className="empty-page">
      <div className="content">
        <img src={imgUrl} alt="no-data" />
        <p>{tipText}</p>
        {noAuth && (
          <p className='tips-text'>
            查看权限申请，请联系驾驶舱PO <span className='tips-name'>朱婷、夏娴</span>若需要其他技术支持 请联系IT <span className='tips-name'>仇新洋</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default EmptyPage;