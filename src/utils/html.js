const allowedTags = new Set([
  'B',
  'I',
  'U',
  'STRONG',
  'EM',
  'DIV',
  'P',
  'BR',
  'H1',
  'H2',
  'H3',
  'BLOCKQUOTE',
  'UL',
  'OL',
  'LI',
  'SPAN',
  'A',
])

const allowedStyles = new Set(['font-size', 'text-align'])

export function stripHtml(value = '') {
  if (typeof window === 'undefined') {
    return String(value)
      .replace(/<(br|\/p|\/div|\/h[1-6]|\/li)>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  const element = document.createElement('div')
  element.innerHTML = value

  function readNode(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent
    if (node.nodeType !== Node.ELEMENT_NODE) return ''

    const text = Array.from(node.childNodes).map(readNode).join('')
    if (['BR'].includes(node.tagName)) return '\n'
    if (['P', 'DIV', 'H1', 'H2', 'H3', 'BLOCKQUOTE', 'LI'].includes(node.tagName)) return `${text}\n`
    return text
  }

  return Array.from(element.childNodes)
    .map(readNode)
    .join('')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function sanitizeHtml(value = '') {
  if (typeof window === 'undefined') return value

  const template = document.createElement('template')
  template.innerHTML = value

  function cleanNode(node) {
    if (node.nodeType === Node.COMMENT_NODE) {
      node.remove()
      return
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return

    if (!allowedTags.has(node.tagName)) {
      const fragment = document.createDocumentFragment()
      const children = []
      while (node.firstChild) fragment.appendChild(node.firstChild)
      children.push(...Array.from(fragment.childNodes))
      node.replaceWith(fragment)
      children.forEach(cleanNode)
      return
    }

    Array.from(node.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase()

      if (name === 'href' && node.tagName === 'A') {
        const href = attribute.value.trim()
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
          node.setAttribute('target', '_blank')
          node.setAttribute('rel', 'noreferrer')
          return
        }
      }

      if (name === 'style') {
        const safeStyles = attribute.value
          .split(';')
          .map((style) => style.trim())
          .filter((style) => {
            const [property, rawValue] = style.split(':').map((part) => part?.trim().toLowerCase())
            if (!allowedStyles.has(property)) return false
            if (property === 'font-size') return ['0.875rem', '1rem', '1.125rem', '1.25rem'].includes(rawValue)
            if (property === 'text-align') return ['left', 'center', 'right'].includes(rawValue)
            return false
          })
          .join('; ')

        if (safeStyles) {
          node.setAttribute('style', safeStyles)
          return
        }
      }

      node.removeAttribute(attribute.name)
    })

    Array.from(node.childNodes).forEach(cleanNode)
  }

  Array.from(template.content.childNodes).forEach(cleanNode)
  return template.innerHTML
}
