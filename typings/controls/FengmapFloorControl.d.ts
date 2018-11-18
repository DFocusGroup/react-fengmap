import * as React from 'react'
import { Fengmap } from '../FengmapBase'

export interface FengmapFloorControlProps {
  ctrlOptions: {
    allLayer: boolean
    showBtnCount: number
    position: number
    offset: {
      x: number
      y: number
    }
    imgURL: string
  }
  onFloorChange: ({ floorLevel: Number, groupId: number }) => void
}

export interface FengmapFloorControlState {}

export default class FengmapFloorControl extends React.Component<FengmapFloorControlProps, FengmapFloorControlState> {
  load(map: Fengmap, fengmapSDK: any, parent: any): void
  render(): JSX.Element | null
}
