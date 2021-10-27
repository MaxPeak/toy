type Procedure = (...args: any[]) => void

export const throttle = <F extends Procedure>(fn: F, time = 500) => {
  let startTime = Date.now()
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const time_ = Date.now() - startTime >= time
    if (!time_) return
    fn.apply(this, args)
    startTime = Date.now()
  }
}