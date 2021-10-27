type Procedure = (...args: any[]) => void

class Emitter {
  private store: Map<string, Set<Procedure>>

  constructor () {
    this.store = new Map()
  }

  on (name: string, callback: Procedure) {
    if (this.store.has(name)) {
      this.store.get(name)?.add(callback)
      return
    }
    const events = new Set<Procedure>()
    events.add(callback)
    this.store.set(name, events)
  }

  emit (name: string, ...args: any[]) {
    this.store.get(name)?.forEach(callback => {
      callback.apply(this, args)
    })
  }

  off (name: string, callback?: Procedure) {
    if (callback === undefined) {
      this.store.delete(name)
      return
    }
    const events = this.store.get(name)
    events?.forEach(cb => {
      if (callback !== cb) return
      events.delete(cb)
    })
  }
}

export const emitter = new Emitter()