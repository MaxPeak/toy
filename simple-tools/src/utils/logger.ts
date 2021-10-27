enum Colors {
  black = '\x1B[30m',
  red = '\x1B[31m',
  green = '\x1B[32m',
  yellow = '\x1B[33m',
  blue = '\x1B[34m',
  magenta = '\x1B[35m',
  cyan = '\x1B[36m',
  white = '\x1B[37m'
}

type DebugFn = {
  (...args: any[]): void
  enabled: boolean
  color: keyof typeof Colors
}

export const logger = (namespace: string) => {
  const resetFlag = '\x1B[0m'
  const debug: DebugFn = (...args: any[]) => {
    if (!debug.enabled) return
    console.log(`${Colors[debug.color]}${namespace}${resetFlag}`, ...args)
  }
  debug.enabled = true
  debug.color = 'blue'
  return debug
}