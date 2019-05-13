import * as React from 'react'
import { Fengmap } from '../FengmapBase'

export interface FengmapResetControlProps {
  ctrlOptions: {
    position: number
    offset: {
      x: number
      y: number
    }
  }
}

export interface FengmapResetControlState {}

export default class FengmapResetControl extends React.Component<FengmapResetControlProps, FengmapResetControlState> {
  load(map: Fengmap, fengmapSDK: any, parent: any): void
  render(): JSX.Element | null
}
