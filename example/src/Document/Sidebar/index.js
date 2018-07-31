import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Layout, Menu, Icon } from 'antd'

import './index.css'

import components from '../Routes/Components'

class Sidebar extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
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
