export const flatten = <T>(arr: T[]) => {
  let result: T[] = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item as T[]))
    } else {
      result.push(item)
    }
  })
  return result
}