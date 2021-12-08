import React from 'react'
import { useSelector } from 'react-redux'


import './index.scss'
import IndexApi from '@/api/index'
import { Toast } from 'antd-mobile'

type PageStateProps = {
  user: AppUserInfo
}

function Index() {
  const userInfo = useSelector((state: PageStateProps) => state.user)


  const updateInfo = async () => {
    // 测试 dispath action
    // dispath(
    //   setAppUserInfo({
    //     userId: '413',
    //     nickName: 'developer',
    //     sex: 1
    //   })
    // )
    //
    // // get 请求
    // const list = await IndexApi.getList({ type: 1 })
    // console.info(list[0].name)
    //
    // // post 请求
    // const update = await IndexApi.updateInfo({
    //   name: 'Jhon',
    //   phone: '18888888888',
    //   password: 'xxxxxxxx'
    // })
    // if (update) {
    //   Toast.info('更新成功')
    // }
  }

  return (
    <div className="index-page">
        <div className="title">企查查</div>
    </div>
  )
}

export default Index
