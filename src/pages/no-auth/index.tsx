import React from 'react'
import noPermission from '../../assets/no_permission.png'
import EmptyPage from '@/components/EmptyPage'

function Index() {
  const text = '您没有权限访问该页面'
  // const updateInfo = async () => {

  // }
  return (
    <>
      <EmptyPage imgUrl={noPermission} tipText={text} noAuth={true}></EmptyPage>
    </>
  )
}

export default Index
