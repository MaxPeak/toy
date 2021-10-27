export const clipboard = async (value: string) => {
  if (navigator.clipboard.writeText) {
    return await navigator.clipboard.writeText(value).then(() => true).catch(() => false)
  }
  const textarea = document.createElement("textarea")
  textarea.style.width = "100px"
  textarea.style.height = "20px"
  textarea.style.margin = '0'
  textarea.style.padding = "0"
  textarea.style.outline = "0"
  textarea.style.border = "0"
  textarea.style.position = "fixed"
  textarea.style.left = "-100px"
  textarea.style.top = "-20px"
  textarea.style.resize = "none"
  textarea.style.opacity = "0"
  textarea.setAttribute("readonly", "readonly")
  textarea.value = value
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy')
  } catch (error) {
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}