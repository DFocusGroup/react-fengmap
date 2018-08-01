import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import throttle from 'lodash/throttle'
import { Layout, Menu, Icon } from 'antd'

import './index.css'

import components from '../Routes/Components'

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
    const found = components.find(c => c.url === location.pathname)
    if (!found) {
      return [components[0].url]
    }
    return [found.url]
  }

  render() {
    if (this.state.screenWidth <= 1000) {
      return null
    }
    return (
      <Layout.Sider width={280} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={this.getOpenKeys()}
          defaultOpenKeys={['Components']}
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
        </Menu>
      </Layout.Sider>
    )
  }
}

export default withRouter(Sidebar)
