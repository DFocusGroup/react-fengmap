import * as React from 'react'

interface FengmapBaseMapOptions {
  container: HTMLElement
}

export interface FengmapBase<T> {
  ref?: React.LegacyRef<T>

  mapOptions: FengmapBaseMapOptions
}
export interface FengmapBaseState {}

export default class FengmapBase extends React.Component<FengmapBase, FengmapBaseState> {
  render(): JSX.Element | null
}
