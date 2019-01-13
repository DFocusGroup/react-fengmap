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
    url: '/api/fengmap-floorcontrol',
    displayTitle: '<FengmapFloorControl />',
    description: '地图楼层切换控件'
  },
  {
    url: '/api/fengmap-3dcontrol',
    displayTitle: '<Fengmap3DControl />',
    description: '地图楼层切换控件'
  }
]

export function getRouteDefinition(pathname) {
  const found = [...componentRoutes, ...controlRoutes].find(r => r.url === pathname)

  if (!found) {
    return null
  }
  return found
}
