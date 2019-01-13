export function isArrayEquals(arr1, arr2) {
  if (arr1 && !arr2) {
    return false
  }
  if (!arr1 && arr2) {
    return false
  }
  if (!arr1 && !arr2) {
    return true
  }
  if (arr1.length !== arr2.length) {
    return false
  }
  return arr1.every(a => arr2.includes(a))
}
