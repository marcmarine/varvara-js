export type TokenType =
  | 'comment'
  | 'string'
  | 'keyword'
  | 'boolean'
  | 'number'
  | 'function'
  | 'identifier'
  | 'punctuation'
  | 'tag'
  | 'attr-name'
  | 'attr-value'
  | 'selector'
  | 'property'
  | 'value'
  | 'plain'

export interface Token {
  type: TokenType
  value: string
}

const JS_KEYWORDS = new Set([
  'const',
  'let',
  'var',
  'function',
  'return',
  'if',
  'else',
  'for',
  'while',
  'do',
  'switch',
  'case',
  'break',
  'continue',
  'class',
  'extends',
  'super',
  'import',
  'export',
  'from',
  'default',
  'new',
  'this',
  'async',
  'await',
  'try',
  'catch',
  'finally',
  'throw',
  'typeof',
  'instanceof',
  'in',
  'of',
  'interface',
  'type',
  'enum',
  'implements',
  'private',
  'public',
  'protected',
  'readonly',
  'static',
  'as',
  'void',
  'yield',
  'delete',
])

const JS_BOOLEANS = new Set(['true', 'false', 'null', 'undefined'])

const isIdentStart = (c: string) => /[a-zA-Z_$]/.test(c)
const isIdentPart = (c: string) => /[a-zA-Z0-9_$]/.test(c)
const isDigit = (c: string) => /[0-9]/.test(c)
const isSpace = (c: string) => /\s/.test(c)

function scanJs(code: string): Token[] {
  const tokens: Token[] = []
  const push = (type: TokenType, value: string) => value.length > 0 && tokens.push({ type, value })
  let i = 0
  const n = code.length

  while (i < n) {
    const c = code[i]!

    if (c === '/' && code[i + 1] === '/') {
      const start = i
      while (i < n && code[i] !== '\n') i++
      push('comment', code.slice(start, i))
      continue
    }

    if (c === '/' && code[i + 1] === '*') {
      const start = i
      i += 2
      while (i < n && !(code[i] === '*' && code[i + 1] === '/')) i++
      i = Math.min(i + 2, n)
      push('comment', code.slice(start, i))
      continue
    }

    if (c === '"' || c === "'" || c === '`') {
      const quote = c
      const start = i
      i++
      while (i < n && code[i] !== quote) {
        if (code[i] === '\\') i++
        i++
      }
      i = Math.min(i + 1, n)
      push('string', code.slice(start, i))
      continue
    }

    if (isDigit(c) || (c === '.' && isDigit(code[i + 1] ?? ''))) {
      const start = i
      while (i < n && /[0-9.eExXa-fA-F_]/.test(code[i]!)) i++
      push('number', code.slice(start, i))
      continue
    }

    if (isIdentStart(c)) {
      const start = i
      while (i < n && isIdentPart(code[i]!)) i++
      const word = code.slice(start, i)

      let j = i
      while (j < n && isSpace(code[j]!)) j++
      const isCall = code[j] === '('

      if (JS_KEYWORDS.has(word)) push('keyword', word)
      else if (JS_BOOLEANS.has(word)) push('boolean', word)
      else if (isCall) push('function', word)
      else push('identifier', word)
      continue
    }

    if (/[{}()[\];,.:?<>=+\-*/%!&|^~]/.test(c)) {
      const start = i
      i++
      while (i < n && /[<>=+\-*/%!&|^~]/.test(code[i]!)) i++
      push('punctuation', code.slice(start, i))
      continue
    }

    const start = i
    i++
    while (i < n && isSpace(code[i]!)) i++
    push('plain', code.slice(start, i))
  }

  return tokens
}

function scanCss(code: string): Token[] {
  const tokens: Token[] = []
  const push = (type: TokenType, value: string) => value.length > 0 && tokens.push({ type, value })
  let i = 0
  const n = code.length
  let depth = 0
  let buffer = ''

  const flushSelectorOrProperty = (type: TokenType) => {
    const trimmed = buffer.trim()
    if (trimmed.length > 0) {
      const leading = buffer.slice(0, buffer.indexOf(trimmed))
      const trailing = buffer.slice(buffer.indexOf(trimmed) + trimmed.length)
      if (leading) push('plain', leading)
      push(type, trimmed)
      if (trailing) push('plain', trailing)
    } else if (buffer.length > 0) {
      push('plain', buffer)
    }
    buffer = ''
  }

  while (i < n) {
    const c = code[i]!

    if (c === '/' && code[i + 1] === '*') {
      flushSelectorOrProperty(depth === 0 ? 'selector' : 'property')
      const start = i
      i += 2
      while (i < n && !(code[i] === '*' && code[i + 1] === '/')) i++
      i = Math.min(i + 2, n)
      push('comment', code.slice(start, i))
      continue
    }

    if (c === '"' || c === "'") {
      const quote = c
      const start = i
      i++
      while (i < n && code[i] !== quote) {
        if (code[i] === '\\') i++
        i++
      }
      i = Math.min(i + 1, n)
      buffer += code.slice(start, i)
      continue
    }

    if (c === '{') {
      flushSelectorOrProperty('selector')
      push('punctuation', '{')
      depth++
      i++
      continue
    }

    if (c === '}') {
      flushSelectorOrProperty('value')
      push('punctuation', '}')
      depth = Math.max(0, depth - 1)
      i++
      continue
    }

    if (c === ':' && depth > 0 && !buffer.includes(':')) {
      flushSelectorOrProperty('property')
      push('punctuation', ':')
      i++
      continue
    }

    if (c === ';') {
      flushSelectorOrProperty('value')
      push('punctuation', ';')
      i++
      continue
    }

    buffer += c
    i++
  }

  flushSelectorOrProperty(depth === 0 ? 'selector' : 'value')
  return tokens
}

function scanHtml(code: string): Token[] {
  const tokens: Token[] = []
  const push = (type: TokenType, value: string) => value.length > 0 && tokens.push({ type, value })
  let i = 0
  const n = code.length

  while (i < n) {
    const c = code[i]!

    if (c === '<' && code.slice(i, i + 4) === '<!--') {
      const start = i
      const end = code.indexOf('-->', i)
      i = end === -1 ? n : end + 3
      push('comment', code.slice(start, i))
      continue
    }

    if (c === '<') {
      const bracketStart = i
      i++
      push('punctuation', code.slice(bracketStart, i))

      if (code[i] === '/') {
        push('punctuation', '/')
        i++
      }

      const tagStart = i
      while (i < n && /[a-zA-Z0-9-]/.test(code[i]!)) i++
      push('tag', code.slice(tagStart, i))

      while (i < n && code[i] !== '>') {
        if (isSpace(code[i]!)) {
          const spaceStart = i
          while (i < n && isSpace(code[i]!)) i++
          push('plain', code.slice(spaceStart, i))
          continue
        }

        if (code[i] === '/' && code[i + 1] === '>') break

        const attrStart = i
        while (i < n && /[a-zA-Z0-9-]/.test(code[i]!)) i++
        if (i > attrStart) push('attr-name', code.slice(attrStart, i))

        if (isSpace(code[i]!)) {
          const spaceStart = i
          while (i < n && isSpace(code[i]!)) i++
          push('plain', code.slice(spaceStart, i))
        }

        if (code[i] === '=') {
          push('punctuation', '=')
          i++
          if (isSpace(code[i]!)) {
            const spaceStart = i
            while (i < n && isSpace(code[i]!)) i++
            push('plain', code.slice(spaceStart, i))
          }

          if (code[i] === '"' || code[i] === "'") {
            const quote = code[i]!
            const valStart = i
            i++
            while (i < n && code[i] !== quote) i++
            i = Math.min(i + 1, n)
            push('attr-value', code.slice(valStart, i))
          }
        } else if (i === attrStart) {
          i++
        }
      }

      if (code[i] === '/' && code[i + 1] === '>') {
        push('punctuation', '/>')
        i += 2
      } else if (code[i] === '>') {
        push('punctuation', '>')
        i++
      }
      continue
    }

    const start = i
    while (i < n && code[i] !== '<') i++
    push('plain', code.slice(start, i))
  }

  return tokens
}

const SCANNERS: Record<string, (code: string) => Token[]> = {
  javascript: scanJs,
  js: scanJs,
  typescript: scanJs,
  ts: scanJs,
  jsx: scanJs,
  tsx: scanJs,
  css: scanCss,
  html: scanHtml,
  markup: scanHtml,
  xml: scanHtml,
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function tokenize(code: string, language: string): Token[] {
  const scanner = SCANNERS[language]
  if (!scanner) return [{ type: 'plain', value: code }]
  return scanner(code)
}

export function highlight(code: string, language: string): string {
  const tokens = tokenize(code, language)
  return tokens
    .map((token) =>
      token.type === 'plain'
        ? escapeHtml(token.value)
        : `<span class="token token-${token.type}">${escapeHtml(token.value)}</span>`,
    )
    .join('')
}
