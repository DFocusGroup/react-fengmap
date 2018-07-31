import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { darcula } from 'react-syntax-highlighter/styles/prism'

import fengmapSDK from 'fengmap/build/fengmap.min-v2.1.23'
import { FengmapBase } from 'react-fengmap'

import { getRouteDefinition } from '../../../helpers/view'

class FengmapBaseDoc extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  render() {
    const { location } = this.props
    const definition = getRouteDefinition(location.pathname)
    if (!definition) {
      return
    }

    return (
      <div>
        <h1>{definition.displayTitle}</h1>
        <p>{definition.description}</p>

        <h3>用法</h3>

        <SyntaxHighlighter language="jsx" style={darcula}>
          {`<FengmapBase mapOptions={MapOptions} events={Events} />`}
        </SyntaxHighlighter>

        <br />

        <div className="mapExample">
          <h3>实例</h3>
          <FengmapBase
            fengmapSDK={fengmapSDK}
            mapId="10347"
            mapOptions={{
              key: 'e843c6307e42ec8de24d14a10e07ca20',
              //开发者申请应用名称
              appName: 'github演示应用',
              mapServerURL: '/maps/10347',
              defaultMapScaleLevel: 20,
              defaultTiltAngle: 45
            }}
            style={{
              width: '100%',
              height: '550px'
            }}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(FengmapBaseDoc)
