import * as React from 'react'
import { FengmapBaseProps } from './FengmapBase.d'

export interface FengmapBaseFloorsProps extends FengmapBaseProps {
  floors: {
    availableValues: Array<number>
    value: number
  }
  onFloorChange: ({ floorLevel: Number, groupId: number }) => void
}
export interface FengmapBaseFloorsState {}

export default class FengmapBaseFloors extends React.Component<FengmapBaseFloorsProps, FengmapBaseFloorsState> {
  render(): JSX.Element | null
}
