import { TextStyle, TextStyleWhiteSpace } from './TextStyle'

interface IFontMetrics {
  ascent: number
  descent: number
  fontSize: number
}

type CharacterWidthCache = { [key: string]: number }

export class TextMetrics {
  public text: string
  public style: TextStyle
  public width: number
  public height: number
  public lines: string[]
  public lineWidths: number[]
  public lineHeight: number
  public maxLineWidth: number
  public fontProperties: IFontMetrics

  public static METRICS_STRING: string
  public static BASELINE_SYMBOL: string
  public static BASELINE_MULTIPLIER: number

  // TODO: These should be protected but they're initialized outside of the class.
  public static _canvas: HTMLCanvasElement | OffscreenCanvas
  public static _context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  public static _fonts: { [font: string]: IFontMetrics }
  public static _newlines: number[]
  public static _breakingSpaces: number[]

  constructor(
    text: string,
    style: TextStyle,
    width: number,
    height: number,
    lines: string[],
    lineWidths: number[],
    lineHeight: number,
    maxLineWidth: number,
    fontProperties: IFontMetrics
  ) {
    this.text = text
    this.style = style
    this.width = width
    this.height = height
    this.lines = lines
    this.lineWidths = lineWidths
    this.lineHeight = lineHeight
    this.maxLineWidth = maxLineWidth
    this.fontProperties = fontProperties
  }

  public static measureText(
    text: string,
    style: TextStyle,
    wordWrap?: boolean,
    canvas = TextMetrics._canvas
  ): TextMetrics {
    wordWrap = wordWrap === undefined || wordWrap === null ? style.wordWrap : wordWrap
    const font = style.toFontString()
    const fontProperties = TextMetrics.measureFont(font)

    // fallback in case UA disallow canvas data extraction
    // (toDataURI, getImageData functions)
    if (fontProperties.fontSize === 0) {
      fontProperties.fontSize = style.fontSize as number
      fontProperties.ascent = style.fontSize as number
    }

    const context = canvas.getContext('2d')

    context.font = font

    const outputText = wordWrap ? TextMetrics.wordWrap(text, style, canvas) : text
    const lines = outputText.split(/(?:\r\n|\r|\n)/)
    const lineWidths = new Array<number>(lines.length)
    let maxLineWidth = 0

    for (let i = 0; i < lines.length; i++) {
      const lineWidth =
        context.measureText(lines[i]).width + (lines[i].length - 1) * style.letterSpacing

      lineWidths[i] = lineWidth
      maxLineWidth = Math.max(maxLineWidth, lineWidth)
    }
    let width = maxLineWidth + style.strokeThickness

    if (style.dropShadow) {
      width += style.dropShadowDistance
    }

    const lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness
    let height =
      Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness) +
      (lines.length - 1) * (lineHeight + style.leading)

    if (style.dropShadow) {
      height += style.dropShadowDistance
    }

    return new TextMetrics(
      text,
      style,
      width,
      height,
      lines,
      lineWidths,
      lineHeight + style.leading,
      maxLineWidth,
      fontProperties
    )
  }

  private static wordWrap(text: string, style: TextStyle, canvas = TextMetrics._canvas): string {
    const context = canvas.getContext('2d')

    let width = 0
    let line = ''
    let lines = ''

    const cache: CharacterWidthCache = Object.create(null)
    const { letterSpacing, whiteSpace } = style

    // How to handle whitespaces
    const collapseSpaces = TextMetrics.collapseSpaces(whiteSpace)
    const collapseNewlines = TextMetrics.collapseNewlines(whiteSpace)

    // whether or not spaces may be added to the beginning of lines
    let canPrependSpaces = !collapseSpaces

    const wordWrapWidth = style.wordWrapWidth + letterSpacing

    // break text into words, spaces and newline chars
    const tokens = TextMetrics.tokenize(text)

    for (let i = 0; i < tokens.length; i++) {
      // get the word, space or newlineChar
      let token = tokens[i]

      // if word is a new line
      if (TextMetrics.isNewline(token)) {
        // keep the new line
        if (!collapseNewlines) {
          lines += TextMetrics.addLine(line)
          canPrependSpaces = !collapseSpaces
          line = ''
          width = 0
          continue
        }

        // if we should collapse new lines
        // we simply convert it into a space
        token = ' '
      }

      // if we should collapse repeated whitespaces
      if (collapseSpaces) {
        // check both this and the last tokens for spaces
        const currIsBreakingSpace = TextMetrics.isBreakingSpace(token)
        const lastIsBreakingSpace = TextMetrics.isBreakingSpace(line[line.length - 1])

        if (currIsBreakingSpace && lastIsBreakingSpace) {
          continue
        }
      }

      // get word width from cache if possible
      const tokenWidth = TextMetrics.getFromCache(token, letterSpacing, cache, context)

      // word is longer than desired bounds
      if (tokenWidth > wordWrapWidth) {
        // if we are not already at the beginning of a line
        if (line !== '') {
          // start newlines for overflow words
          lines += TextMetrics.addLine(line)
          line = ''
          width = 0
        }

        // break large word over multiple lines
        if (TextMetrics.canBreakWords(token, style.breakWords)) {
          // break word into characters
          const characters = TextMetrics.wordWrapSplit(token)

          // loop the characters
          for (let j = 0; j < characters.length; j++) {
            let char = characters[j]

            let k = 1
            // we are not at the end of the token

            while (characters[j + k]) {
              const nextChar = characters[j + k]
              const lastChar = char[char.length - 1]

              // should not split chars
              if (!TextMetrics.canBreakChars(lastChar, nextChar, token, j, style.breakWords)) {
                // combine chars & move forward one
                char += nextChar
              } else {
                break
              }

              k++
            }

            j += char.length - 1

            const characterWidth = TextMetrics.getFromCache(char, letterSpacing, cache, context)

            if (characterWidth + width > wordWrapWidth) {
              lines += TextMetrics.addLine(line)
              canPrependSpaces = false
              line = ''
              width = 0
            }

            line += char
            width += characterWidth
          }
        }

        // run word out of the bounds
        else {
          // if there are words in this line already
          // finish that line and start a new one
          if (line.length > 0) {
            lines += TextMetrics.addLine(line)
            line = ''
            width = 0
          }

          const isLastToken = i === tokens.length - 1

          // give it its own line if it's not the end
          lines += TextMetrics.addLine(token, !isLastToken)
          canPrependSpaces = false
          line = ''
          width = 0
        }
      }

      // word could fit
      else {
        // word won't fit because of existing words
        // start a new line
        if (tokenWidth + width > wordWrapWidth) {
          // if its a space we don't want it
          canPrependSpaces = false

          // add a new line
          lines += TextMetrics.addLine(line)

          // start a new line
          line = ''
          width = 0
        }

        // don't add spaces to the beginning of lines
        if (line.length > 0 || !TextMetrics.isBreakingSpace(token) || canPrependSpaces) {
          // add the word to the current line
          line += token

          // update width counter
          width += tokenWidth
        }
      }
    }

    lines += TextMetrics.addLine(line, false)

    return lines
  }

  private static addLine(line: string, newLine = true): string {
    line = TextMetrics.trimRight(line)

    line = newLine ? `${line}\n` : line

    return line
  }

  private static getFromCache(
    key: string,
    letterSpacing: number,
    cache: CharacterWidthCache,
    context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): number {
    let width = cache[key]

    if (typeof width !== 'number') {
      const spacing = key.length * letterSpacing

      width = context.measureText(key).width + spacing
      cache[key] = width
    }

    return width
  }

  private static collapseSpaces(whiteSpace: TextStyleWhiteSpace): boolean {
    return whiteSpace === 'normal' || whiteSpace === 'pre-line'
  }

  private static collapseNewlines(whiteSpace: TextStyleWhiteSpace): boolean {
    return whiteSpace === 'normal'
  }

  private static trimRight(text: string): string {
    if (typeof text !== 'string') {
      return ''
    }

    for (let i = text.length - 1; i >= 0; i--) {
      const char = text[i]

      if (!TextMetrics.isBreakingSpace(char)) {
        break
      }

      text = text.slice(0, -1)
    }

    return text
  }

  private static isNewline(char: string): boolean {
    if (typeof char !== 'string') {
      return false
    }

    return TextMetrics._newlines.indexOf(char.charCodeAt(0)) >= 0
  }

  static isBreakingSpace(char: string, _nextChar?: string): boolean {
    if (typeof char !== 'string') {
      return false
    }

    return TextMetrics._breakingSpaces.indexOf(char.charCodeAt(0)) >= 0
  }

  private static tokenize(text: string): string[] {
    const tokens: string[] = []
    let token = ''

    if (typeof text !== 'string') {
      return tokens
    }

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const nextChar = text[i + 1]

      if (TextMetrics.isBreakingSpace(char, nextChar) || TextMetrics.isNewline(char)) {
        if (token !== '') {
          tokens.push(token)
          token = ''
        }

        tokens.push(char)

        continue
      }

      token += char
    }

    if (token !== '') {
      tokens.push(token)
    }

    return tokens
  }

  static canBreakWords(_token: string, breakWords: boolean): boolean {
    return breakWords
  }

  static canBreakChars(
    _char: string,
    _nextChar: string,
    _token: string,
    _index: number,
    _breakWords: boolean
  ): boolean {
    return true
  }

  static wordWrapSplit(token: string): string[] {
    return token.split('')
  }

  public static measureFont(font: string): IFontMetrics {
    // as this method is used for preparing assets, don't recalculate things if we don't need to
    if (TextMetrics._fonts[font]) {
      return TextMetrics._fonts[font]
    }

    const properties: IFontMetrics = {
      ascent: 0,
      descent: 0,
      fontSize: 0
    }

    const canvas = TextMetrics._canvas
    const context = TextMetrics._context

    context.font = font

    const metricsString = TextMetrics.METRICS_STRING + TextMetrics.BASELINE_SYMBOL
    const width = Math.ceil(context.measureText(metricsString).width)
    let baseline = Math.ceil(context.measureText(TextMetrics.BASELINE_SYMBOL).width)
    const height = 2 * baseline

    baseline = (baseline * TextMetrics.BASELINE_MULTIPLIER) | 0

    canvas.width = width
    canvas.height = height

    context.fillStyle = '#f00'
    context.fillRect(0, 0, width, height)

    context.font = font

    context.textBaseline = 'alphabetic'
    context.fillStyle = '#000'
    context.fillText(metricsString, 0, baseline)

    const imagedata = context.getImageData(0, 0, width, height).data
    const pixels = imagedata.length
    const line = width * 4

    let i = 0
    let idx = 0
    let stop = false

    // ascent. scan from top to bottom until we find a non red pixel
    for (i = 0; i < baseline; ++i) {
      for (let j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true
          break
        }
      }
      if (!stop) {
        idx += line
      } else {
        break
      }
    }

    properties.ascent = baseline - i

    idx = pixels - line
    stop = false

    // descent. scan from bottom to top until we find a non red pixel
    for (i = height; i > baseline; --i) {
      for (let j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true
          break
        }
      }

      if (!stop) {
        idx -= line
      } else {
        break
      }
    }

    properties.descent = i - baseline
    properties.fontSize = properties.ascent + properties.descent

    TextMetrics._fonts[font] = properties

    return properties
  }

  /**
   * Clear font metrics in metrics cache.
   *
   * @static
   * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
   */
  public static clearMetrics(font = ''): void {
    if (font) {
      delete TextMetrics._fonts[font]
    } else {
      TextMetrics._fonts = {}
    }
  }
}

const canvas = ((): HTMLCanvasElement | OffscreenCanvas => {
  try {
    // OffscreenCanvas2D measureText can be up to 40% faster.
    const c = new OffscreenCanvas(0, 0)
    const context = c.getContext('2d')

    if (context && context.measureText) {
      return c
    }

    return document.createElement('canvas')
  } catch (ex) {
    return document.createElement('canvas')
  }
})()

canvas.width = canvas.height = 10

TextMetrics._canvas = canvas

TextMetrics._context = canvas.getContext('2d')

TextMetrics._fonts = {}

TextMetrics.METRICS_STRING = '|ÉqÅ'

TextMetrics.BASELINE_SYMBOL = 'M'

TextMetrics.BASELINE_MULTIPLIER = 1.4

TextMetrics._newlines = [
  0x000a, // line feed
  0x000d // carriage return
]

TextMetrics._breakingSpaces = [
  0x0009, // character tabulation
  0x0020, // space
  0x2000, // en quad
  0x2001, // em quad
  0x2002, // en space
  0x2003, // em space
  0x2004, // three-per-em space
  0x2005, // four-per-em space
  0x2006, // six-per-em space
  0x2008, // punctuation space
  0x2009, // thin space
  0x200a, // hair space
  0x205f, // medium mathematical space
  0x3000 // ideographic space
]
