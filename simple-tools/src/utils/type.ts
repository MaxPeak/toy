enum Types {
  'Infinity',
  'NaN',

  'Undefined',
  'Null',
  'Boolean',
  'Number',
  'String',
  'Symbol',
  'BigInt',

  'Function',
  'Array',
  'Object',
  'Date',
  'Map',
  'WeakMap',
  'Set',
  'WeakSet',
  'RegExp',
  'Promise',
  'Blob',

  'Element'
}
type MapKey = 'NaN' | 'Infinity'

export const type = (type: keyof typeof Types) => {
  return (target: any) => {
    const originType = Object.prototype.toString.call(target).replace(/\[object (.*)\]/, '$1')
    const map = {
      NaN: () => Number.isNaN(target),
      Infinity: () => !Number.isFinite(target),
      Element: () => target && (target as HTMLElement).nodeType === 1
    }
    return map[type as MapKey] ? map[type as MapKey]() : originType === type
  }
}