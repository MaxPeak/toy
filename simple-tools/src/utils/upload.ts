import { type } from './type'

type Options = {
  accept?: string
  capture?: string
  multiple?: boolean
  strict?: boolean
  drag?: Element
  limit?: number
  exceed?: () => void
  typeError?: () => void
  customUpload?: (files: File[], options: Options) => File[]
}

const isFn = type('Function')
const isElement = type('Element')

export const upload = (options: Options = {}) => {
  const { accept, multiple, limit, capture, drag, strict = true, exceed, typeError, customUpload } = options

  const handler = (fileList: FileList, resolve: (files: File[]) => void) => {
    const files = Array.from(fileList)
    let result = [...files]
    if (customUpload && isFn(customUpload)) {
      return resolve(customUpload(result, options))
    }
    if (accept) {
      const acceptList = accept.split(',')
      const passList = files.filter(file => {
        const [suffix] = file.name.match(/[^\.]+(?!.*\.)/) || []
        return acceptList.includes(`.${suffix}`)
      })
      if (passList.length !== files.length) {
        typeError && isFn(typeError) && typeError()
        if (strict) resolve([])
        result = passList
      }
    }
    if (multiple && limit && result.length > limit) {
      exceed && isFn(exceed) && exceed()
      if (strict) resolve([])
      result = result.slice(0, limit)
    }
    resolve(result)
  }

  return new Promise<File[]>(resolve => {
    if (drag && isElement(drag)) {
      drag.addEventListener('drop', event => {
        event.preventDefault()
        event.stopPropagation()
        const { files } = (event as DragEvent).dataTransfer!
        handler(files, resolve)
      })
      drag.addEventListener('dragover', event => {
        event.preventDefault()
        event.stopPropagation()
      })
      return
    }
    const file = document.createElement('input');
    file.type = 'file'
    file.accept = accept || ''
    file.capture = capture || ''
    file.multiple = !!multiple
    file.click()
    file.addEventListener('change', () => {
      handler(file.files!, resolve)
    })
  })
}