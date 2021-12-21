import React from 'react'
import './index.scss'
import noData from '@/assets/no-data.png';

function BI() {
  return (
    <div className="BI-page">
      <div className="content">
        <img src={noData} alt="no-data" />
        <p>没有数据</p>
      </div>
    </div>
  )
}

export default BI