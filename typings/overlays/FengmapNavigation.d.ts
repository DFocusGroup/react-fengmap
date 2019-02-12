import { coord } from './FengmapNavigation.d'
import * as React from 'react'
import * as fengmap from 'fengmap'
import { Fengmap } from '../FengmapBase'

export interface FengmapNavigationPointOptions {
  x: number
  y: number
  groupID: number
  url: string
  size: number
  callback: Function
}

export interface Coord {
  x: number
  y: number
  groupID: number
}

export interface FengmapNavigationProps {
  naviOptions: {
    speed: number
    followPosition: boolean
    followAngle: boolean
    changeTiltAngle: boolean
    scaleLevel: number
    offsetHeight: number
    lineStyle: Object
  }
  start: {
    options: FengmapNavigationPointOptions
    noMarker: boolean
  }
  end: {
    options: FengmapNavigationPointOptions
    noMarker: boolean
  }
  events: FengmapNavigationEvents
  onDrawComplete: (navi: FMNavigation) => void
}

export interface FengmapNavigationState {}

export default class FengmapNavigation extends React.Component<FengmapNavigationProps, FengmapNavigationState> {
  load(map: Fengmap, fengmapSDK: any, parent: any): void
  render(): JSX.Element | null
}

interface EventCallback {
  (e: any, map: Fengmap): boolean
}

export interface FengmapNavigationEvents {
  complete: EventCallback
  crossGroup: EventCallback
  walking: EventCallback
}

export interface FMNavigation {
  clearAll(): void
  drawNaviLine(): void
  focusNaviLineSegment(index: int, options: { duration: number; callback: Function }): void
  setStartPoint(options: FengmapNavigationPointOptions, noMarker: boolean): void
  setEndPoint(options: FengmapNavigationPointOptions, noMarker: boolean): void
  simulate(): void
  stop(): void
  locate(coord: Coord, angle?: number): void
  locateNoConstraint(coord: Coord, cc: any, angle: number): void
  naviConstraint(coord: Coord): void
  pathConstraint(coord: Coord): void
  naviDescriptions: Array<string>
  naviDescriptionsData: Array<any>
  naviDistance: number
  naviGroupsDistance: any
  startMarker: {
    x: number
    y: number
    size: number
    height: number
    url: string
    callback(): void
  }
  endMarker: {
    x: number
    y: number
    size: number
    height: number
    url: string
    callback(): void
  }
  locationMarker: {
    x: number
    y: number
    groupID: number
    size: number
    height: number
    url: string
    callback(): void
  }
}
