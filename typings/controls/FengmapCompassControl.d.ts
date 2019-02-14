import * as React from 'react'
import { Fengmap } from '../FengmapBase'

export interface FengmapCompassControlProps {
  visible: boolean
  image?: {
    bg: string
    fg: string
  }
  onClick?: (mapInstance: Fengmap) => void
}

export interface FengmapCompassControlState {}

export default class FengmapFloorControl extends React.Component<
  FengmapCompassControlProps,
  FengmapCompassControlState
> {
  load(map: Fengmap, fengmapSDK: any, parent: any): void
  render(): JSX.Element | null
}
