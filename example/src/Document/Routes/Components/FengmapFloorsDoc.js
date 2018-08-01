import React, { Component } from 'react'
import { Radio } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { darcula } from 'react-syntax-highlighter/styles/prism'

import fengmapSDK from 'fengmap/build/fengmap.min-v2.1.23'
import { FengmapFloors } from 'react-fengmap'

import PropsDoc from '../../../Components/PropsDoc'
import { getRouteDefinition } from '../../../helpers/view'

class FengmapFloorsDoc extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedFloor: null
    }
  }

  changeFloor = e => {
    this.setState({
      selectedFloor: +e.target.value
    })
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
          {`<FengmapFloors {...支持所有FengmapBase的props} floors={Floors} onFloorChange={onFloorChange}/>`}
        </SyntaxHighlighter>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'floors',
              type: 'Object',
              description: (
                <React.Fragment>
                  {`{ availableValues: Array<Number>, value: Number }`}。 可用楼层数组，和选中的楼层
                </React.Fragment>
              )
            },
            {
              prop: 'onFloorChange',
              type: 'Function',
              description: '楼层切换时的回调函数'
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>

          <Radio.Group value={`${this.state.selectedFloor}`} onChange={this.changeFloor}>
            <Radio.Button value="1">1</Radio.Button>
            <Radio.Button value="2">2</Radio.Button>
            <Radio.Button value="3">3</Radio.Button>
            <Radio.Button value="4">4</Radio.Button>
            <Radio.Button value="5">5</Radio.Button>
            <Radio.Button value="6">6</Radio.Button>
          </Radio.Group>

          <FengmapFloors
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
            floors={{
              availableValues: [1, 2, 3, 4, 5, 6],
              value: this.state.selectedFloor
            }}
            style={{
              width: '100%',
              height: '550px'
            }}
          />

          <br />

          <SyntaxHighlighter language="jsx" style={darcula}>
            {`import fengmapSDK from 'fengmap'
            
export default function Example(props) {
  return (
    <FengmapFloors
      fengmapSDK={fengmapSDK}
      mapId="10347"
      mapOptions={{
        //开发者申请应用名称
        appName: '应用名',
        key: 'appkey',
        mapServerURL: '/maps/10347',
        defaultMapScaleLevel: 20,
        defaultTiltAngle: 45
      }}
      floors={{
        availableValues: [1, 2, 3, 4, 5, 6],
        value: props.selectedFloor
      }}
      style={{
        width: '100%',
        height: '550px'
      }}
    />
  )
}
`}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  }
}

export default withRouter(FengmapFloorsDoc)
