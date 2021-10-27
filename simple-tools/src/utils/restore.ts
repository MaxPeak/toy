export const restore = <T>(arr: T[], len: number) => {
  const result: T[][] = []
  let index = 0
  const num = arr.length / len
  for (let i = 0; i < num; i++) {
    result.push(arr.slice(index, index + len))
    index += len
  }
  return result
}