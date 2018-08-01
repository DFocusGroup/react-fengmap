import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import { Layout } from 'antd'
import throttle from 'lodash/throttle'

import Navigation from './Navigation'
import Sidebar from './Sidebar'

import { Routes } from './Routes'

import './index.css'

export default class Document extends Component {
  constructor(props) {
    super(props)

    this._resizeHandler = throttle(this._resizeHandler.bind(this), 250)

    this.state = {
      screenWidth: 0
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resizeHandler)
    this._resizeHandler()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler)
  }

  _resizeHandler() {
    this.setState({
      screenWidth: window.innerWidth
    })
  }

  render() {
    const padding = this.state.screenWidth <= 1000 ? '5px' : '0 24px 24px'
    return (
      <HashRouter>
        <Layout>
          <Navigation />
          <Layout>
            <Sidebar />
            <Layout style={{ padding }}>
              <Layout.Content style={{ background: '#fff', padding, margin: 0, minHeight: 900 }}>
                <Routes />
              </Layout.Content>
            </Layout>
          </Layout>
        </Layout>
      </HashRouter>
    )
  }
}
