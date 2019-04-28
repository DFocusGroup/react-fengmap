export const componentRoutes = [
  {
    url: '/api/fengmap-base',
    displayTitle: '<FengmapBase />',
    description: '基础地图组件'
  },
  {
    url: '/api/fengmap-floors',
    displayTitle: '<FengmapFloors />',
    description: '带楼层控制的地图组件'
  }
]

export const controlRoutes = [
  {
    url: '/api/fengmap-zoomcontrol',
    displayTitle: '<FengmapZoomControl />',
    description: '地图缩放控件'
  },
  {
    url: '/api/fengmap-rotatecontrol',
    displayTitle: '<FengmapRotateControl />',
    description: '地图旋转控件'
  },
  {
    url: '/api/fengmap-resetcontrol',
    displayTitle: '<FengmapResetControl />',
    description: '地图重置控件'
  },
  {
    url: '/api/fengmap-floorcontrol',
    displayTitle: '<FengmapFloorControl />',
    description: '地图楼层切换控件'
  },
  {
    url: '/api/fengmap-3dcontrol',
    displayTitle: '<Fengmap3DControl />',
    description: '地图楼层切换控件'
  },
  {
    url: '/api/fengmap-compasscontrol',
    displayTitle: '<FengmapCompassControl />',
    description: '指北针控件'
  }
]

export const overlayRoutes = [
  {
    url: '/api/fengmap-imagemarker',
    displayTitle: '<FengmapImageMarker />',
    description: 'FMImageMarker 自定义图片标注组件，为自定义图层'
  },
  {
    url: '/api/fengmap-navigation',
    displayTitle: '<FengmapNavigation />',
    description: 'FengmapNavigation 导航组件,封装了自动设置起始点标注，路径分析，模拟导航，导航动画的功能'
  }
]

export function getRouteDefinition(pathname) {
  const found = [...componentRoutes, ...controlRoutes, ...overlayRoutes].find(r => r.url === pathname)

  if (!found) {
    return null
  }
  return found
}
