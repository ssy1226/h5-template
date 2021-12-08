import React from 'react'
import { useHistory } from 'react-router-dom'

import './index.scss'

const About = () => {
  const history = useHistory()
  const toDetail = () => {
    history.push('/detail')
  }

  return (
    <div className="about-page">

      <div className="title">关联方查询</div>

    </div>
  )
}

export default About
