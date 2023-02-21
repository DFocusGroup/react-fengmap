import { grabNumbers } from './object'

export function getFloors(map) {
  try {
    return map.listGroups.map(g => {
      if(!g.gname.match(/\d+/)) {
        return g.gname
      }
      if (g.gname.toLowerCase().indexOf('f') > -1) {
        return +g.gname.match(/\d+/)[0]
      }
      return +g.gname.match(/\d+/)[0] * -1
    })
  } catch (error) {
    return false
  }
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

const STYLE_LEFT_TOP = { position: 'absolute', top: '15px', left: '15px' }
const STYLE_LEFT_BOTTOM = { position: 'absolute', bottom: '60px', left: '15px' }
const STYLE_RIGHT_TOP = { position: 'absolute', top: '15px', right: '10px' }
const STYLE_RIGHT_BOTTOM = { position: 'absolute', bottom: '60px', right: '10px' }

export function mergeWithOffset(ctrlOptions, POSITIONS, baseStyle) {
  // LEFT_BOTTOM
  if (ctrlOptions.position === POSITIONS[0]) {
    if (!ctrlOptions.offset) {
      return Object.assign({}, baseStyle, STYLE_LEFT_BOTTOM)
    }
    return Object.assign({}, baseStyle, {
      ...STYLE_LEFT_BOTTOM,
      bottom: `${grabNumbers(STYLE_LEFT_BOTTOM.bottom) + ctrlOptions.offset.y}px`,
      left: `${grabNumbers(STYLE_LEFT_BOTTOM.left) + ctrlOptions.offset.x}px`
    })
  }
  // LEFT_TOP
  if (ctrlOptions.position === POSITIONS[1]) {
    if (!ctrlOptions.offset) {
      return Object.assign({}, baseStyle, STYLE_LEFT_TOP)
    }
    return Object.assign({}, baseStyle, {
      ...STYLE_LEFT_TOP,
      top: `${grabNumbers(STYLE_LEFT_TOP.top) + ctrlOptions.offset.y}px`,
      left: `${grabNumbers(STYLE_LEFT_TOP.left) + ctrlOptions.offset.x}px`
    })
  }
  // RIGHT_BOTTOM
  if (ctrlOptions.position === POSITIONS[2]) {
    if (!ctrlOptions.offset) {
      return Object.assign({}, baseStyle, STYLE_RIGHT_BOTTOM)
    }
    return Object.assign({}, baseStyle, {
      ...STYLE_RIGHT_BOTTOM,
      bottom: `${grabNumbers(STYLE_RIGHT_BOTTOM.bottom) + ctrlOptions.offset.y}px`,
      right: `${grabNumbers(STYLE_RIGHT_BOTTOM.right) + ctrlOptions.offset.x}px`
    })
  }
  // RIGHT_TOP
  if (ctrlOptions.position === POSITIONS[3]) {
    if (!ctrlOptions.offset) {
      return Object.assign({}, baseStyle, STYLE_RIGHT_TOP)
    }
    return Object.assign({}, baseStyle, {
      ...STYLE_RIGHT_TOP,
      top: `${grabNumbers(STYLE_RIGHT_TOP.top) + ctrlOptions.offset.y}px`,
      right: `${grabNumbers(STYLE_RIGHT_TOP.right) + ctrlOptions.offset.x}px`
    })
  }
}
