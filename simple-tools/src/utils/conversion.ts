export const byteToSize = (bytes: number, abbreviations = false, accuracy = 0) => {
  const base = 1024
  const sizes = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  const index = Math.floor(Math.log(bytes) / Math.log(base))
  const unit = abbreviations ? sizes[index] : index ? `${sizes[index]}B` : sizes[index]
  return `${(bytes / base ** index).toFixed(accuracy)} ${unit}`
}