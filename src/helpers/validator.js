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

  const child = children.find(child => VALID_SUB_COMPONENTS.every(c => !(child.type.prototype instanceof c)))
  if (child) {
    throw new Error(`${child} is not a valid child for <FengmapBase />`)
  }
  return true
}
