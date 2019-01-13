import * as React from 'react'
import { Fengmap } from '../FengmapBase'

export interface Fengmap3DControlProps {
  ctrlOptions: {
    viewModeButtonNeeded: boolean
    groupsButtonNeeded: boolean
    init2D: boolean
    initGroups: boolean
    clickCallBack: boolean
    position: number
    offset: {
      x: number
      y: number
    }
    imgURL: string
  }
}

export interface Fengmap3DControlState {}

export default class Fengmap3DControl extends React.Component<Fengmap3DControlProps, Fengmap3DControlState> {
  load(map: Fengmap, fengmapSDK: any, parent: any): void
  render(): JSX.Element | null
}
