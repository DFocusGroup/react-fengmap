import { isArray } from './object'
import { VALID_SUB_COMPONENTS } from '../bases'

export function isChildrenValid(children) {
  if (!children || (isArray(children) && !children.length)) {
    return true
  }

  if (!isArray(children)) {
    if (VALID_SUB_COMPONENTS.every(c => !(children.type.prototype instanceof c))) {
      throw new Error(`${children} is not a valid child for <FengmapBase />`)
    }
    return true
  }
  const newChildren = getChildren(children)
  const child = newChildren.find(child => VALID_SUB_COMPONENTS.every(c => !(child.type.prototype instanceof c)))
  if (child) {
    throw new Error(`${child} is not a valid child for <FengmapBase />`)
  }
  return true
}

function getChildren(children) {
  return children.reduce((pre, next) => {
    if (!isArray(next)) {
      return [...pre, next]
    }
    return [...pre, ...getChildren(next)]
  }, [])
}
