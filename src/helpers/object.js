export function isNil(obj) {
  return obj === undefined || obj === null
}

export function isNumber(obj) {
  return Object.prototype.toString.call(obj) === '[object Number]'
}

export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

export function isFunction(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]'
}

export function grabNumbers(str) {
  if (!str) {
    return 0
  }
  return +str.match(/\d+/)[0]
}

export function pick(obj, keys) {
  const newObj = {}

  keys.forEach(key => {
    newObj[key] = obj[key]
  })

  return newObj
}

export function flatten(arr) {
  if (!arr || !arr.length) {
    return []
  }
  if (!isArray(arr)) {
    return [arr]
  }
  return arr.reduce((pre, next) => pre.concat(flatten(next)), [])
}

export function uuid() {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
