import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout } from 'antd'
import { withRouter } from 'dva/router'

import Navigation from '../Components/Navigation'
import Sidebar from '../Components/Sidebar'

import { destoryGlobalSpinner } from '../helpers/view'
import styles from './index.less'

class DefaultLayout extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    locationPathname: PropTypes.string,
    screenWidth: PropTypes.number
  }

  componentDidMount() {
    destoryGlobalSpinner()
  }

  render() {
    const { locationPathname, children, screenWidth } = this.props
    const padding = screenWidth <= 1000 ? '5px' : '0 24px 24px'
    return (
      <Layout className={styles.mainContainer}>
        <Navigation />
        <Layout>
          {locationPathname.startsWith('/api/') && <Sidebar />}
          <Layout style={{ padding, background: '#fff' }}>
            <Layout.Content style={{ padding, margin: 0, minHeight: 900 }}>{children}</Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(
  connect(({ app }) => {
    return {
      screenWidth: app.screenWidth,
      locationPathname: app.locationPathname
    }
  })(DefaultLayout)
)
