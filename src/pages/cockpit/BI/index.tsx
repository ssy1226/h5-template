import React from 'react'
import noData from '@/assets/empty.png';
import EmptyPage from '@/components/EmptyPage';

function BI() {
  const str = '暂无数据';
  return (
    <>
      <EmptyPage imgUrl={noData} tipText={str}></EmptyPage>
    </>
  )
}

export default BI