import * as React from 'react'
import { Fengmap } from '../FengmapBase'

export interface FengmapZoomControlProps {
  ctrlOptions: {
    position: number
    offset: {
      x: number
      y: number
    }
    imgURL: string
  }
}

export interface FengmapZoomControlState {}

export default class FengmapZoomControl extends React.Component<FengmapZoomControlProps, FengmapZoomControlState> {
  load(map: Fengmap, fengmapSDK: any, parent: any): void
  render(): JSX.Element | null
}
