export const unique = <T>(arr: T[], callback: (value: T) => any): T[] => {
  const map = new Map()
  const result = []
  for (const item of arr) {
    const cbResult = callback(item)
    if (cbResult === undefined || cbResult === null || map.get(cbResult)) continue
    map.set(cbResult, item)
    result.push(item)
  }
  return result
}