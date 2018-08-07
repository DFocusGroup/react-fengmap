import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import throttle from 'lodash/throttle'
import { Layout, Menu, Icon } from 'antd'

import './index.css'

import components from '../Routes/Components'
import controls from '../Routes/Controls'

class Sidebar extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

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

  getOpenKeys = () => {
    const { location } = this.props
    const full = [...components, ...controls]
    const found = full.find(c => c.url === location.pathname)
    if (!found) {
      return {
        selectKey: components[0].url,
        openKey: 'Components'
      }
    }
    if (components.includes(found)) {
      return {
        selectKey: found.url,
        openKey: 'Components'
      }
    }
    if (controls.includes(found)) {
      return {
        selectKey: found.url,
        openKey: 'Controls'
      }
    }
  }

  render() {
    if (this.state.screenWidth <= 1000) {
      return null
    }
    const openKey = this.getOpenKeys()
    return (
      <Layout.Sider width={280} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[openKey.selectKey]}
          defaultOpenKeys={[openKey.openKey]}
          style={{ height: '100%' }}
        >
          <Menu.SubMenu
            key="Components"
            title={
              <span>
                <Icon type="profile" />
                Components
              </span>
            }
          >
            {components.map(c => {
              return (
                <Menu.Item key={c.url}>
                  <Link to={c.url}>{c.displayTitle}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
          <Menu.SubMenu
            key="Controls"
            title={
              <span>
                <Icon type="code-o" />
                Controls
              </span>
            }
          >
            {controls.map(c => {
              return (
                <Menu.Item key={c.url}>
                  <Link to={c.url}>{c.displayTitle}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
    )
  }
}

export default withRouter(Sidebar)
