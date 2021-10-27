import { type } from './type'

const isEle = type('Element')

type Callback = (...args: any[]) => void

type Options = {
  target: HTMLElement
  type: 'move' | 'resize'
  limit: {
    minX: number
    maxX: number
    minY: number
    maxY: number
  }
}

class Draggable {
  el: HTMLElement
  options: Options
  data: any
  store: Map<string, Set<Callback>>

  constructor (el: HTMLElement, options?: Options) {
    const defaultOptions = {
      target: el,
      type: 'move',
      limit: {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0
      }
    }
    this.options = Object.assign(defaultOptions, options)
    this.checkArgments(el, this.options)
    this.el = el
    this.data = null
    this.store = new Map()
    this.mounted()
  }

  checkArgments (el: HTMLElement, options: Options) {
    if (!isEle(el)) throw new Error('The el must be Element')
    if (options.target && !isEle(options.target)) {
      throw new Error('The target option must be Element')
    }
    const types = ['resize', 'move']
    if (options.type && !types.includes(options.type)) {
      throw new Error(`The type option must be ${types.join(' or ')}`)
    }
  }

  mounted () {
    this.start = this.start.bind(this)
    this.move = this.move.bind(this)
    this.stop = this.stop.bind(this)
    this.el.addEventListener('mousedown', this.start)
  }

  destroyed () {
    this.el.removeEventListener('mousedown', this.start)
  }

  start (event: MouseEvent) {
    event.preventDefault()
    const { clientX, clientY } = event
    const { left: elLeft, top: elTop, width: elWidth, height: elHeight } = this.options.target.getBoundingClientRect()
    const { top, left, width, height } = this.options.target.parentElement!.getBoundingClientRect()
    const { minX = 0, maxX = width - elWidth, minY = 0, maxY = height - elHeight } = this.options.limit
    this.data = {
      downX: clientX,
      downY: clientY,
      elX: elLeft - left,
      elY: elTop - top,
      elWidth,
      elHeight,
      minX,
      maxX,
      minY,
      maxY
    }
    document.addEventListener('mousemove', this.move)
    document.addEventListener('mouseup', this.stop)
  }

  move (event: MouseEvent) {
    event.preventDefault()
    const { clientX, clientY } = event
    const {
      downX,
      downY,
      elX,
      elY,
      elWidth,
      elHeight,
      minX,
      maxX,
      minY,
      maxY
    } = this.data
    if (this.options.type === 'move') {
      const top = this.limit(minY, elY + clientY - downY, maxY)
      const left = this.limit(minX, elX + clientX - downX, maxX)
      this.options.target.style.top = `${top}px`
      this.options.target.style.left = `${left}px`
      this.emit('change', { type: 'move', data: [left, top] })
    } else if (this.options.type === 'resize') {
      const width = this.limit(minX, clientX - downX + elWidth, maxX)
      const height = this.limit(minY, clientY - downY + elHeight, maxY)
      this.options.target.style.width = `${width}px`
      this.options.target.style.height = `${height}px`
      this.emit('change', { type: 'resize', data: [width, height] })
    }
  }

  stop () {
    document.removeEventListener('mousemove', this.move)
    document.removeEventListener('mouseup', this.stop)
  }

  limit (min: number, value: number, max: number) {
    return Math.max(min, Math.min(value, max))
  }

  on (eventName: string, callback: Callback) {
    if (this.store.has(eventName)) {
      this.store.get(eventName)?.add(callback)
      return
    }
    const set = new Set<Callback>()
    set.add(callback)
    this.store.set(eventName, set)
  }

  off (eventName: string, callback: Callback) {
    const events = this.store.get(eventName)
    if (!events) return
    if (callback) {
      events.forEach(event => {
        if (event !== callback) return
        events.delete(callback)
      })
      return
    }
    this.store.delete(eventName)
  }

  emit (eventName: string, ...args: any) {
    const events = this.store.get(eventName)
    if (!events) return
    events.forEach(callback => callback.apply(this, args))
  }
}

export const draggable = (el: HTMLElement, options: Options) => new Draggable(el, options)