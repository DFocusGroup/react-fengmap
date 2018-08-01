# react-fengmap

[![NPM version][npm-image]][npm-url]
![][david-url]
![][dt-url]
![][license-url]

## Install

```bash
npm install --save react-fengmap
```

完整 API 使用文档，请[这边走](https://dfocusfe.github.io/react-fengmap)

## Usage

```jsx
// 基础地图
import React, { Component } from 'react'
import fengmapSDK from 'fengmap'

import { FengmapBase } from 'react-fengmap'

class Example extends Component {
  render() {
    return (
      <FengmapBase
        fengmapSDK={fengmapSDK}
        mapId="10347"
        mapOptions={{
          key: '你的key',
          //开发者申请应用名称
          appName: '你的应用',
          mapServerURL: '/maps/10347',
          defaultMapScaleLevel: 20,
          defaultTiltAngle: 45
        }}
        style={{
          width: '800px',
          height: '550px'
        }}
      />
    )
  }
}
```

```jsx
// 带楼层控制的地图
import React, { Component } from 'react'
import fengmapSDK from 'fengmap'

import { FengmapFloors } from 'react-fengmap'

class Example extends Component {
  render() {
    return (
      <FengmapFloors
        fengmapSDK={fengmapSDK}
        mapId="10347"
        mapOptions={{
          key: '你的key',
          //开发者申请应用名称
          appName: '你的应用',
          mapServerURL: '/maps/10347',
          defaultMapScaleLevel: 20,
          defaultTiltAngle: 45
        }}
        style={{
          width: '800px',
          height: '550px'
        }}
      />
    )
  }
}
```

## LICENSE

[MIT License](https://raw.githubusercontent.com/DFocusFE/react-fengmap/master/LICENSE)

[npm-url]: https://npmjs.org/package/react-fengmap
[npm-image]: https://badge.fury.io/js/react-fengmap.png
[david-url]: https://david-dm.org/DFocusFE/react-fengmap.png
[dt-url]: https://img.shields.io/npm/dt/react-fengmap.svg
[license-url]: https://img.shields.io/npm/l/react-fengmap.svg
