import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fengmapSDK from 'fengmap'
import { FengmapBase, FengmapPopControl, FengmapResetControl } from 'react-fengmap'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'
import { resolvePublicPath } from '../../../helpers/env'
import styles from './index.less'

const positionArr = [
  {
    x: 12961692.505,
    y: 4861851.9350000005,
    visible: true,
    FID: '903690116'
  },
  {
    x: 12961582.555,
    y: 4861820.195,
    visible: true,
    FID: '90369017'
  }
]

class FengmapPopControlDoc extends Component {
  static propTypes = {
    screenWidth: PropTypes.number
  }

  mapClickNode = e => {
    if (!e.FID) {
      return
    }
    console.log('fid', e.FID)
  }

  _onMapLoaded = (e, map) => {
    const request = {
      types: ['model']
    }
    const groupId = map.focusGroupID
    fengmapSDK.MapUtil.search(map, groupId, request, function(result) {
      var models = result
      if (models.length <= 0) return
      for (let model of models) {
        const { FID } = model
        for (let value of positionArr) {
          if (value.FID === FID) {
            map.storeSelect(model, true, true)
          }
        }
      }
    })
  }

  render() {
    const { screenWidth } = this.props
    const contentWidth = screenWidth > 1000 ? screenWidth - 280 - 24 * 4 - 40 : screenWidth

    return (
      <React.Fragment>
        <Highlight language="jsx">
          {`// 基础地图
<FengmapBase mapId={MapId} style={Style} fengmapSDK={SDK} mapOptions={MapOptions} >
  <FengmapResetControl ctrlOptions={CtrlOptions} />
</FengmapBase>

// 带Pop的地图
<FengmapPopControl positionArr={positionArr} className={styles.popModal}>
<div className={styles.content}>
  <div>我是pop</div>
</div>
</FengmapPopControl>
`}
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'fidPosition',
              type: 'object',
              description: (
                <React.Fragment>
                  {` {
                      x: 12961582.555, 
                      y: 4861820.195, 
                    }`}
                </React.Fragment>
              )
            },
            {
              prop: 'visible',
              type: 'boolean',
              description: <React.Fragment>{`显示为true，不显示fasle`}</React.Fragment>
            },
            {
              prop: 'topNumber',
              type: 'number',
              description: <React.Fragment>{`topNumber 可选类型，调整pop离顶部的高度`}</React.Fragment>
            },
            {
              prop: 'leftNumber',
              type: 'number',
              description: <React.Fragment>{` leftNumber  可选类型，调整pop离左边的高度`}</React.Fragment>
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
            events={{
              loadComplete: this._onMapLoaded,
              mapClickNode: this.mapClickNode
            }}
            gestureEnableController={{
              enableMapPinch: false
            }}
            style={{
              width: `${contentWidth}px`,
              height: '750px'
            }}
          >
            {positionArr.map((value, index) => {
              return (
                <FengmapPopControl
                  fidPosition={value}
                  key={index}
                  className={styles.popModal}
                  topNumber={700}
                  visible={true}
                >
                  <div className={styles.content}>
                    <div>我是pop</div>
                  </div>
                </FengmapPopControl>
              )
            })}

            <FengmapResetControl
              ctrlOptions={{
                position: fengmapSDK.controlPositon.RIGHT_BOTTOM,
                imgURL: resolvePublicPath('/assets/reset.png')
              }}
            />
          </FengmapBase>

          <br />

          <Highlight language="jsx">
            {`
           
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fengmapSDK from 'fengmap'
import { FengmapBase, FengmapPopControl, FengmapResetControl } from 'react-fengmap'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'
import { resolvePublicPath } from '../../../helpers/env'
import styles from './index.less'

const positionArr = [
  {
    x: 12961692.505,
    y: 4861851.9350000005,
    visible: true,
    FID: '903690116'
  },
  {
    x: 12961582.555,
    y: 4861820.195,
    visible: true,
    FID: '90369017'
  }
]

class FengmapPopControlDoc extends Component {
  static propTypes = {
    screenWidth: PropTypes.number
  }

  mapClickNode = e => {
    if (!e.FID) {
      return
    }
    console.log('fid', e.FID)
  }

  _onMapLoaded = (e, map) => {
    const request = {
      types: ['model']
    }
    const groupId = map.focusGroupID
    fengmapSDK.MapUtil.search(map, groupId, request, function(result) {
      var models = result
      if (models.length <= 0) return
      for (let model of models) {
        const { FID } = model
        for (let value of positionArr) {
          if (value.FID === FID) {
            map.storeSelect(model, true, true)
          }
        }
      }
    })
  }

  render() {
    const { screenWidth } = this.props
    const contentWidth = screenWidth > 1000 ? screenWidth - 280 - 24 * 4 - 40 : screenWidth

    return(
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
      events={{
        loadComplete: this._onMapLoaded,
        mapClickNode: this.mapClickNode
      }}
      gestureEnableController={{
        enableMapPinch: false
      }}
      style={{
        width: '200px',
        height: '750px'
      }}
    >
    {positionArr.map((value, index) => {
      return (
        <FengmapPopControl
          fidPosition={value}
          key={index}
          className={styles.popModal}
          topNumber={800}
          visible={true}
        >
          <div className={styles.content}>
            <div>我是pop</div>
          </div>
        </FengmapPopControl>
      )
    })}
      <FengmapResetControl
        ctrlOptions={{
          position: fengmapSDK.controlPositon.RIGHT_BOTTOM,
          imgURL: resolvePublicPath('/assets/reset.png')
        }}
      />
    </FengmapBase>
    )


}

export default withAPIDoc(FengmapPopControlDoc)

`}
          </Highlight>
        </div>
      </React.Fragment>
    )
  }
}

export default withAPIDoc(FengmapPopControlDoc)
