import * as React from 'react'
import { Fengmap } from '../FengmapBase'

export interface FengmapImageMarkerProps {
  opts: {
    x: number
    y: PropTypesnumber
    size: number
    height: number
    url: string
    callback: Function
  }
}

export interface FengmapImageMarkerState {}

export default class FengmapImageMarker extends React.Component<FengmapImageMarkerProps, FengmapImageMarkerState> {
  load(map: Fengmap, fengmapSDK: any, parent: any): void
  render(): JSX.Element | null
}
