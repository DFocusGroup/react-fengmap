import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import { getRouteDefinition } from '../../routesConfig'

export default function withAPIDoc(APIDoc) {
  class Wrapper extends Component {
    static propTypes = {
      locationPathname: PropTypes.string
    }

    render() {
      const { locationPathname } = this.props
      const definition = getRouteDefinition(locationPathname)
      if (!definition) {
        return <div>路径是不是不对啊？</div>
      }
      return (
        <div>
          <h1>{definition.displayTitle}</h1>
          <p>{definition.description}</p>

          <APIDoc {...this.props} />
        </div>
      )
    }
  }

  return connect(({ app }) => {
    return {
      locationPathname: app.locationPathname
    }
  })(Wrapper)
}
