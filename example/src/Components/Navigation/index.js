import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'umi/link'
import { connect } from 'dva'
import { Layout, Drawer, Menu } from 'antd'
import { componentRoutes, controlRoutes, markerRoutes } from '../../routesConfig'

import styles from './index.css'
import logoURL from '../../assets/logo.png'

/* eslint-disable */
const githubURL =
  'https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67'
/* eslint-enable */

class Navigation extends Component {
  static propTypes = {
    screenWidth: PropTypes.number,
    locationPathname: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      openSmallScreenMenu: false
    }
  }

  _toggleSmallScreenMenu = () => {
    const { screenWidth } = this.props
    if (screenWidth > 1000) {
      return this.setState({
        openSmallScreenMenu: false
      })
    }

    this.setState({
      openSmallScreenMenu: !this.state.openSmallScreenMenu
    })
  }

  _selectMenu = ({ item, key, selectedKeys }) => {}

  render() {
    const { screenWidth, locationPathname } = this.props
    const inSmallScreen = screenWidth <= 470

    const selectedKey = locationPathname.startsWith('/api/') ? '/api/timerangepicker' : '/home'

    return (
      <Layout.Header
        className={styles.header}
        style={{
          padding: `0px ${inSmallScreen ? '10px' : '50px'}`
        }}
      >
        <a href="https://github.com/DFocusFE/react-fengmap">
          <img
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              border: 0
            }}
            src={githubURL}
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
          />
        </a>
        <div>
          <img src={logoURL} className={styles.headerLogo} alt="" onClick={this._toggleSmallScreenMenu} />
          <span className={styles.headerTitle}>{inSmallScreen ? '蜂鸟-react' : '蜂鸟地图-react'}</span>
        </div>
        <Menu
          mode="horizontal"
          style={{ marginLeft: inSmallScreen ? '10px' : '30px', lineHeight: '65px', borderBottom: '0' }}
          onSelect={this._selectMenu}
          selectedKeys={[selectedKey]}
        >
          <Menu.Item key="/home">
            <Link to="/home">入门</Link>
          </Menu.Item>
          <Menu.Item key="/api/fengmap-base">
            <Link to="/api/fengmap-base">文档</Link>
          </Menu.Item>
        </Menu>
        <Drawer
          title="文档"
          placement="left"
          closable
          onClose={() =>
            this.setState({
              openSmallScreenMenu: false
            })
          }
          visible={this.state.openSmallScreenMenu}
        >
          {componentRoutes.map(c => {
            return (
              <div key={c.url} className={styles.smallScreenMenuItem}>
                <Link
                  to={c.url}
                  onClick={() =>
                    this.setState({
                      openSmallScreenMenu: false
                    })
                  }
                >
                  {c.displayTitle}
                </Link>
              </div>
            )
          })}
          {controlRoutes.map(c => {
            return (
              <div key={c.url} className={styles.smallScreenMenuItem}>
                <Link
                  to={c.url}
                  onClick={() =>
                    this.setState({
                      openSmallScreenMenu: false
                    })
                  }
                >
                  {c.displayTitle}
                </Link>
              </div>
            )
          })}
          {markerRoutes.map(c => {
            return (
              <div key={c.url} className={styles.smallScreenMenuItem}>
                <Link
                  to={c.url}
                  onClick={() =>
                    this.setState({
                      openSmallScreenMenu: false
                    })
                  }
                >
                  {c.displayTitle}
                </Link>
              </div>
            )
          })}
        </Drawer>
      </Layout.Header>
    )
  }
}

export default connect(({ app }) => {
  return {
    screenWidth: app.screenWidth,
    locationPathname: app.locationPathname
  }
})(Navigation)
