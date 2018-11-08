import FengmapZoomControlDoc from './FengmapZoomControlDoc'
import FengmapRotateControlDoc from './FengmapRotateControlDoc'
import FengmapFloorControlDoc from './FengmapFloorControlDoc'

export default [
  {
    url: '/fengmap-zoomcontrol',
    displayTitle: '<FengmapZoomControl />',
    description: '地图缩放控件',
    component: FengmapZoomControlDoc
  },
  {
    url: '/fengmap-rotatecontrol',
    displayTitle: '<FengmapRotateControl />',
    description: '地图旋转控件',
    component: FengmapRotateControlDoc
  },
  {
    url: '/fengmap-floorcontrol',
    displayTitle: '<FengmapFloorControl />',
    description: '地图楼层切换控件',
    component: FengmapFloorControlDoc
  }
]
