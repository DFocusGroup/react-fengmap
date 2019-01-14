export function getFloors(map) {
  return map.listGroups.map(g => {
    if (g.gname.toLowerCase().indexOf('f') > -1) {
      return +g.gname.match(/\d+/)[0]
    }
    return +g.gname.match(/\d+/)[0] * -1
  })
}

export function initFloorsToMapInstance(map) {
  if (!map) {
    return
  }

  Object.defineProperty(map, 'focusFloor', {
    get: function() {
      return getFloors(map)[map.groupIDs.indexOf(map.focusGroupID)]
    },
    set: function(floor) {
      const floors = getFloors(map)
      const focusGroupID = map.groupIDs[floors.indexOf(floor)]
      map.visibleGroupIDs = [focusGroupID]
      map.focusGroupID = focusGroupID
    },
    enumerable: true,
    configurable: true
  })

  Object.defineProperty(map, 'listFloors', {
    get: function() {
      return getFloors(map)
    },
    set: function(floor) {
      throw new Error('listFloors is not writable')
    },
    enumerable: true,
    configurable: true
  })
}

export function setFloorsByGroupId(map) {
  if (map.focusGroupID === -1) {
    return
  }
  const floors = getFloors(map)

  map.focusFloor = floors[map.groupIDs.indexOf(map.focusGroupID)]
}
