import * as React from 'react'
import { Fengmap } from '../FengmapBase'

export interface FengmapRotateControlProps {
  ctrlOptions: {
    position: number
    offset: {
      x: number
      y: number
    }
  }

  angle: number
}

export interface FengmapRotateControlState {}

export default class FengmapRotateControl extends React.Component<
  FengmapRotateControlProps,
  FengmapRotateControlState
> {
  load(map: Fengmap, fengmapSDK: any, parent: any): void
  render(): JSX.Element | null
}
