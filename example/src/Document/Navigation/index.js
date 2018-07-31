import React, { Component } from 'react'
import { Layout } from 'antd'

import './index.css'
import logoURL from '../../assets/logo.png'

export default class Navigation extends Component {
  render() {
    return (
      <Layout.Header className="header">
        <img src={logoURL} className="headerLogo" alt="" />
        <span className="headerTitle">蜂鸟地图-react</span>
      </Layout.Header>
    )
  }
}
