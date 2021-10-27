export type CookieOptions = Partial<{
  expires: number;
  'max-age': number;
  path: string;
  domain: string;
  secure: boolean;
}>

const encode = (value: string) => encodeURIComponent(value).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`)

const decode = (value: string) => decodeURIComponent(value)

const formatExpires = (expires: number) => {
  if (expires === Infinity) return 'Fri, 31 Dec 9999 23:59:59 GMT'
  const ms = 1000 * 60 * 60 * 24
  return new Date(Date.now() + expires * ms).toUTCString()
}

const formatMaxAge = (maxAge: number) => {
  const s = 60 * 60 * 24
  return Date.now() + maxAge * s
}

export const cookie =  {
  get (key: string) {
    if (!key) return
    const encodeKey = encode(key).replace(/[-.+*]/g, "\\$&")
    const reg = new RegExp(`(?:(?:^|.*;)\\s*${encodeKey}\\s*\\=\\s*([^;]*).*$)|^.*$`)
    const value = document.cookie.replace(reg, '$1')
    return decode(value) || null
  },

  set (key: string, value: any, options: CookieOptions = {}) {
    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return
    
    const attributes = Object.entries(options).reduce((acc, [key, value]) => {
      const map: Record<string, string> = {
        secure: value ? key : '',
        expires: `${key}=${formatExpires(value as number)}`,
        'max-age': `${key}=${formatMaxAge(value as number)}`
      }
      acc += `; ${map[key] !== undefined ? map[key] : `${key}=${value}`}`
      return acc
    }, '')
    
    document.cookie = `${encode(key)}=${encode(value)} ${attributes}`
  },

  remove (key: string, options: CookieOptions = {}) {
    this.set(key, '', Object.assign(options, { expires: -1 }))
  }
}