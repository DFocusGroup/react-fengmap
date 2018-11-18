import * as React from 'react'

export interface FMNodeType {
  ALL: string
  FACILITY: number
  IMAGE_MARKER: number
  LABEL: number
  LINE: number
  LOCATION_MARKER: number
  MODEL: number
  NONE: number
  TEXT_MARKER: number
}

export interface FMGroup {
  groupAlias: string
  groupDesc: string
  groupID: number
  groupName: string
  height: number
  mapCoord: FMMapCoord
  nodeType: FMNodeType
  show: boolean
  x: number
  y: number
  z: number
}

export interface FMScreenCoordConstructor {
  new (x: number, y: number): FMScreenCoord
}

export interface FMScreenCoord {
  x: number
  y: number
}

export interface FMMapCoordConstructor {
  new (x: number, y: number, z: number): FMMapCoord
}

export interface FMMapCoord {
  x: number
  y: number
  z: number
}

export interface FMSegmentConstructor {
  new (): FMSegment
}

export interface FMSegment {
  groupId: number
  points: Array<FMMapCoord>
}

export interface FMLineMarkerConstructor {
  new (): FMLineMarker
}

export interface FMLineMarker {
  addSegment(sg: FMSegment): void
}

export interface FMLocationMarkerConstructorOpts {
  x: number
  y: number
  groupID: number
  size: number
  url: string
  height: number
  callback: () => void
}

export interface FMLocationMarkerConstructor {
  new (opts: FMLocationMarkerConstructorOpts): FMLocationMarker
}

export interface FMLocationMarker {
  rotateTo(params: { to: number; duration: number; callback: Function }): void
  setPosition(x: number, y: number, groupID: number, offset: number): void
  direction: number
  groupID: number
  height: number
  ID: number
  mapCoord: object
  name: string
  nodeType: FMNodeType
  show: boolean
  x: number
  y: number
  z: number
}

export interface MapUtil {
  search(
    map: Fengmap,
    gids: number | Array<number>,
    query: {
      nodeType?: FMNodeType
      name?: string
      keyword?: string
      FID?: string
      ID?: string
      typeID?: string
      types?: Array<string>
    },
    callback: Function
  ): void
}

export interface Fengmap {
  addLocationMarker(ls: FMLocationMarker): void
  callAllLayersByAlias(layerAlias: string | Array<string>, callback: Function): void
  clearLineMark(lm: FMLineMarker): void
  coordMapToScreen(x: number, y: number, z: number): FMMapCoord
  coordScreenToMap(x: number, y: number, z: number): FMScreenCoord
  drawLineMark(lm: FMLineMarker, style: object): object
  fullScreenAvaliable(): boolean
  getDatasByAlias(groupID: number, alias: string | Array<string>, filter: Function): Array<object>
  getFMGroup(groupID: number): FMGroup
  moveTo(opts: { x: number; y: number; z: number; groupID: number; time: number; callback: Function }): void
  moveToCenter(data: { x: number; y: number; groupID: number; duration: Function; callback: Function }): void

  openMapById(mapId: string, failed: Function): void
  pickFilterFunction(e: object): void

  removeLocationMarker(lm: FMLocationMarker): void
  rotateTo(params: { to: number; duration: number; callback: Function }): void

  MapUtil: MapUtil

  setBackgroundColor(color: string, alpha: number): void
  setMapScaleLevelRange(min: number, max: number): void
  setMapScaleRange(min: number, max: number): void
  setModelSelectColor(color: string, alpha: number): void
  setScaleLevelLimit(minLevel: number, maxLevel: number): void
  tiltTo(params: { to: number; duration: number; callback: Function }): void
  zoomIn(): void
  zoomOut(): void
  backgroundColor: string
  center: any
  focusGroupID: number
  fullScreen: boolean
  groupIDs: Array<number>
  groupSpace: number
  labelLanguage: FMLanguageType
  layerLocalHeight: number
  lineStyle: object
  mapScale: number
  mapScaleLevel: number
  maxTitleAngle: number
  maxX: number
  maxY: number
  minScaleLevel: number
  minX: number
  minY: number
  options: FengmapBaseMapOptions
  rotateAngle: number
  scaleLevel: number
  showCompass: boolean
  themeName: string
  tiltAngle: number
  viewMode: FMViewMode
  visibleGroupIDs: Array<number>
}

export enum FMViewMode {
  MODE_3D = '3d',
  MODE_2D = 'top'
}

export interface FengmapBaseMapOptions {
  appName: string
  key: string
  lazyCreateMode: boolean
  mapServerURL: string
  mapThemeURL: string
  defaultThemeName: string
  useStoreApply: boolean
  defaultVisibleGroups: Array<number>
  defaultFocusGroup: number
  modelSelectedEffect: boolean
  modelHoverEffect: boolean
  modelHoverTime: boolean
  focusAlphaMode: boolean
  focusAlpha: number
  focusAnimateMode: boolean
  defaultViewMode: FMViewMode
  moveToAnimateMode: boolean
  defaultControlsPose: 'e' | 'n' | 'ne' | 'nw' | 's' | 'se' | 'sw' | 'w'
  defaultMapScaleLevel: number
  mapScaleLevelRange: Array<number>
  defaultMapScale: number
  mapScaleRange: Array<number>
  compassOffset: Array<number>
  compassSize: number
  defaultGroupSpace: number
  enabledPanRange: boolean
  defaultBackgroundColor: string
  defaultBackgroundAlpha: number
  noSideFaces: boolean
  defaultLabelLanguage: FMLanguageType
}

export enum FMLanguageType {
  CHN = 'chn',
  EN = 'en'
}

interface EventCallback {
  (e: any, map: Fengmap): boolean
}

export interface FengmapBaseMapEvents {
  focusGroupIDChanged: EventCallback
  loadComplete: EventCallback
  mapClickNode: EventCallback
  mapHoverNode: EventCallback
  mapScaleLevelChanged: EventCallback
  scaleLevelChanged: EventCallback
  visibleGroupIDsChanged: EventCallback
}

export interface FengmapBaseProps {
  ref?: any
  mapOptions: FengmapBaseMapOptions
  events?: FengmapBaseMapEvents
  mapId: string
  style?: object
  fengmapSDK: any
  loadingTxt?: string
  supportTxt?: string
  gestureEnableController?: {
    enableMapPan?: boolean
    enableMapPinch?: boolean
    enableMapRotate?: boolean
    enableMapIncline?: boolean
  }
  children: any
}
export interface FengmapBaseState {}

export default class FengmapBase extends React.Component<FengmapBaseProps, FengmapBaseState> {
  render(): JSX.Element | null
}
