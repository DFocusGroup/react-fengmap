import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fengmapSDK from 'fengmap'
import { FengmapBase, FengmapNavigation } from 'react-fengmap'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'
import CodeSnippet from '../../../Components/CodeSnippet'
import { resolvePublicPath } from '../../../helpers/env'

const startPointUrl =
  'https://www.fengmap.com/docs/js/v2.2.0_beta/classes/fengmap.FMNavigation.html#method_setStartPoint'
const endPointUrl = 'https://www.fengmap.com/docs/js/v2.2.0_beta/classes/fengmap.FMNavigation.html#method_setEndPoint'

class FengmapNavigationDoc extends Component {
  static propTypes = {
    screenWidth: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.state = {
      startPoint: null,
      endPoint: null
    }
    this.count = 0
  }

  render() {
    const { startPoint, endPoint } = this.state
    const { screenWidth } = this.props
    const contentWidth = screenWidth > 1000 ? screenWidth - 280 - 24 * 4 - 40 : screenWidth
    return (
      <React.Fragment>
        <Highlight language="jsx">
          {`<FengmapBase mapId={MapId} style={Style} fengmapSDK={SDK} mapOptions={MapOptions} >
  <FengmapNavigation
    naviOptions={NaviOptions}
    start={Start}
    end={End}
    events={Events}
    onDrawComplete={OnDrawComplete}
  />
</FengmapBase>
`}
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'naviOptions',
              type: 'Object',
              description: (
                <React.Fragment>
                  请参考
                  <a
                    href="https://www.fengmap.com/docs/js/v2.2.0_beta/classes/fengmap.NaviOptions.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    naviOptions
                  </a>
                </React.Fragment>
              )
            },
            {
              prop: 'start',
              type: 'Object',
              description: (
                <React.Fragment>
                  请参考
                  <a href={startPointUrl} target="_blank" rel="noopener noreferrer">
                    startPoint
                  </a>
                </React.Fragment>
              )
            },
            {
              prop: 'end',
              type: 'Object',
              description: (
                <React.Fragment>
                  请参考
                  <a href={endPointUrl} target="_blank" rel="noopener noreferrer">
                    endPoint
                  </a>
                </React.Fragment>
              )
            },
            {
              prop: 'events',
              type: 'Object',
              description: (
                <React.Fragment>
                  请参考
                  <a
                    href="https://www.fengmap.com/docs/js/v2.2.0_beta/classes/fengmap.FMNavigation.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    events
                  </a>
                  {/* , 键值组合，key的可用值： [complete, crossGroup, walking]，value是事件响应函数 */}
                  键值组合，key的可用值： [
                  {['complete', 'crossGroup', 'walking'].map((e, i) => {
                    return (
                      <span key={i}>
                        <CodeSnippet>{e}</CodeSnippet>
                        {i !== 2 ? ',' : ''}
                      </span>
                    )
                  })}
                  ], value是事件响应函数
                </React.Fragment>
              )
            },
            {
              prop: 'onDrawComplete',
              type: '(nav: FMNavigation) => void',
              description: '绘制路径完成后的回调函数'
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>

          <FengmapBase
            fengmapSDK={fengmapSDK}
            mapId="10347"
            mapOptions={{
              key: 'e843c6307e42ec8de24d14a10e07ca20',
              //开发者申请应用名称
              appName: 'github演示应用',
              mapServerURL: resolvePublicPath('/maps/10347'),
              mapThemeURL: resolvePublicPath('/maps/theme'),
              defaultMapScaleLevel: 20
            }}
            gestureEnableController={{
              enableMapPinch: false
            }}
            style={{
              width: `${contentWidth}px`,
              height: '550px'
            }}
            events={{
              mapClickNode: (e, map) => {
                if (!e.FID) {
                  return
                }
                if (this.count === 0) {
                  this.setState({
                    startPoint: {
                      options: {
                        x: e.x,
                        y: e.y,
                        groupID: map.focusGroupID,
                        url: resolvePublicPath('/assets/startPoint.png'),
                        size: 50,
                        height: 2
                      }
                    },
                    endPoint: null
                  })
                  this.count++
                } else if (this.count === 1) {
                  const { startPoint: start } = this.state
                  if (e.x === start.options.x && e.y === start.options.y) {
                    return
                  }
                  this.setState({
                    endPoint: {
                      options: {
                        x: e.x,
                        y: e.y,
                        groupID: map.focusGroupID,
                        url: resolvePublicPath('/assets/endPoint.png'),
                        size: 50,
                        height: 2
                      }
                    }
                  })
                  this.count = 0
                }
              }
            }}
          >
            <FengmapNavigation
              naviOptions={{
                lineStyle: {
                  lineType: fengmapSDK.FMLineType.FMARROW,
                  lineWidth: 6
                }
              }}
              start={startPoint}
              end={endPoint}
              events={{
                complete(e, navi) {
                  console.log('路径加载完毕', navi)
                }
              }}
              onDrawComplete={navi => {
                console.log('draw completed', navi)
              }}
            />
          </FengmapBase>

          <br />

          <Highlight language="jsx">
            {`import fengmapSDK from 'fengmap'
import { FengmapBase, Fengmap3DControl } from 'react-fengmap'

let count = 0

export default function Example(props) {
  return (
    <FengmapBase
      fengmapSDK={fengmapSDK}
      mapId="10347"
      mapOptions={{
        key: 'e843c6307e42ec8de24d14a10e07ca20',
        //开发者申请应用名称
        appName: 'github演示应用',
        mapServerURL: '/maps/10347',
        mapThemeURL: '/maps/theme',
        defaultMapScaleLevel: 20
      }}
      gestureEnableController={{
        enableMapPinch: false
      }}
      style={{
        width: '100%',
        height: '550px'
      }}
      events={{
        mapClickNode: (e, map) => {
          if (!e.FID) {
            return
          }
          if (count === 0) {
            props.onChange({
              startPoint: {
                options: {
                  x: e.x,
                  y: e.y,
                  groupID: map.focusGroupID,
                  url: '/assets/startPoint.png',
                  size: 50,
                  height: 2
                }
              },
              endPoint: null
            })
            count++
          } else if (count === 1) {
            const { startPoint } = props
            if (e.x === startPoint.options.x && e.y === startPoint.options.y) {
              return
            }
            props.onChange({
              endPoint: {
                options: {
                  x: e.x,
                  y: e.y,
                  groupID: map.focusGroupID,
                  url: '/assets/endPoint.png',
                  size: 50,
                  height: 2
                }
              }
            })
            count = 0
          }
        }
      }}
    >
      <FengmapNavigation
        naviOptions={{
          lineStyle: {
            lineType: fengmapSDK.FMLineType.FMARROW,
            lineWidth: 6
          }
        }}
        start={props.startPoint}
        end={props.endPoint}
      />
    </FengmapBase>
  )
}
`}
          </Highlight>
        </div>
      </React.Fragment>
    )
  }
}

export default withAPIDoc(FengmapNavigationDoc)
