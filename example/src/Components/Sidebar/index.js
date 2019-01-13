import React from 'react'
import PropTypes from 'prop-types'
import Link from 'umi/link'
import { connect } from 'dva'
import { Layout, Menu, Icon } from 'antd'

import { componentRoutes, controlRoutes } from '../../routesConfig'

class Sidebar extends React.Component {
  static propTypes = {
    screenWidth: PropTypes.number,
    locationPathname: PropTypes.string
  }

  getOpenKeys = () => {
    const { locationPathname } = this.props
    const full = [...componentRoutes, ...controlRoutes]
    const found = full.find(c => c.url === locationPathname)
    if (!found) {
      return {
        selectKey: componentRoutes[0].url,
        openKey: 'Components'
      }
    }
    if (componentRoutes.includes(found)) {
      return {
        selectKey: found.url,
        openKey: 'Components'
      }
    }
    if (controlRoutes.includes(found)) {
      return {
        selectKey: found.url,
        openKey: 'Controls'
      }
    }
  }

  render() {
    const { screenWidth } = this.props
    if (screenWidth <= 1000) {
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
            {componentRoutes.map(c => {
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
            {controlRoutes.map(c => {
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

export default connect(({ app }) => {
  return {
    screenWidth: app.screenWidth,
    locationPathname: app.locationPathname
  }
})(Sidebar)
