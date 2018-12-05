export function getFloors(map) {
  return map.listGroups.map(g => {
    if (g.gname.toLowerCase().indexOf('f') > -1) {
      return +g.gname.match(/\d+/)[0]
    }
    return +g.gname.match(/\d+/)[0] * -1
  })
}

export function setFloorByGroupId(map) {
  if (map.focusGroupID === -1) {
    return
  }
  const floors = getFloors(map)

  map.focusFloor = floors[map.groupIDs.indexOf(map.focusGroupID)]
}
