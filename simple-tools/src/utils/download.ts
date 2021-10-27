import { type } from './type'

const isBlob = type('Blob')

type Options = {
  url?: string
  content?: string | Blob
  name?: string
  disposition?: string
}

const checkOptions = (options: Options) => {
  if (!options) throw new Error('The parameter options is a must')
  if (!options.name && !options.disposition) throw new Error('Please set name or disposition')
  if (!options.url && !options.content) throw new Error('Please set url or content')
}

const getName = (disposition: string) => {
  const [name, filename, newFilename] = disposition.split(';')
  return (newFilename || filename).replace(/^[^=]*=/, '')
}

const getUrl = (content: string | Blob) => {
  return new Promise<string>(resolve => {
    if (!isBlob(content)) {
      content = new Blob([content])
    }
    if (URL.createObjectURL) {
      resolve(URL.createObjectURL(content))
    }
    const reader = new FileReader()
    reader.readAsDataURL(content as Blob)
    reader.addEventListener('load', () => {
      resolve(reader.result as string)
    })
  })
}

export const download = async (options: Options) => {
  checkOptions(options)
  const { name, disposition, url, content } = options
  const download = name ? name : getName(disposition!)
  const href = url ? url : await getUrl(content!)
  const a = document.createElement('a')
  a.download = download
  a.href = href
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}