type Procedure = (...args: any[]) => void

export const debounce = <F extends Procedure>(fn: F, time = 200) => {
  let timer: ReturnType<typeof setTimeout>
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}