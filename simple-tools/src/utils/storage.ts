enum Storages {
  local = 'localStorage',
  session = 'sessionStorage'
}

export const storage = (type: keyof typeof Storages = 'local', namespace = '') => {
  const types = Object.keys(Storages)
  if (!types.includes(type)) {
    throw new Error(`The type must be ${types.join(' or ')}`)
  }
  const storage = window[Storages[type]]
  const getName = (name: string) => namespace ? `${namespace}-${name}` : name
  return {
    get: (name: string) => {
      try {
        const content = storage.getItem(getName(name))
        return content ? JSON.parse(content) : content
      } catch (error) {
        return undefined
      }
    },
  
    set: (name: string, value: any) => storage.setItem(getName(name), JSON.stringify(value)),
  
    remove: (name: string) => storage.removeItem(getName(name)),
  
    clear () {
      const reg = new RegExp(namespace)
      Object.keys(storage).filter(key => reg.test(key)).forEach(key => storage.removeItem(key))
    },

    clearAll: () => storage.clear()
  }
}