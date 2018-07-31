import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import { Layout } from 'antd'

import Navigation from './Navigation'
import Sidebar from './Sidebar'

import { Routes } from './Routes'

import './index.css'

export default class Document extends Component {
  render() {
    return (
      <HashRouter>
        <Layout>
          <Navigation />
          <Layout>
            <Sidebar />
            <Layout style={{ padding: '0 24px 24px' }}>
              <Layout.Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 900 }}>
                <Routes />
              </Layout.Content>
            </Layout>
          </Layout>
        </Layout>
      </HashRouter>
    )
  }
}
