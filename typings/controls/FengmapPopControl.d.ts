import * as React from 'react'
import { Fengmap } from '../FengmapBase'

export interface FengmapPopControlProps {
  ctrlOptions: {
    position: number
    offset: {
      x: number
      y: number
    }
    imgURL: string
  }
}

export interface FengmapPopControlState {}

export default class FengmapPopControl extends React.Component<FengmapPopControlProps, FengmapPopControlState> {
  load(map: Fengmap, fengmapSDK: any, parent: any): void
  render(): JSX.Element | null
}
