import * as React from 'react'
import * as fengmap from 'fengmap'
import { Fengmap } from '../FengmapBase'

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
    options: {
      x: number
      y: number
      groupID: number
      url: string
      size: number
      callback: Function
    }
    noMarker: boolean
  }
  end: {
    options: {
      x: number
      y: number
      groupID: number
      url: string
      size: number
      callback: Function
    }
    noMarker: boolean
  }
  events: FengmapNavigationEvents
  onDrawComplete: (map: Fengmap) => void
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
