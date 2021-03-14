import { StringUtil } from '../../utils/StringUtil'
import { Utils } from '../../utils/Utils'

export type TextStyleAlign = 'left' | 'center' | 'right' | 'justify'
export type TextStyleFill = string | string[] | number | number[] | CanvasGradient | CanvasPattern
export type TextStyleFontStyle = 'normal' | 'italic' | 'oblique'
export type TextStyleFontVariant = 'normal' | 'small-caps'
export type TextStyleFontWeight =
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
export type TextStyleLineJoin = 'miter' | 'round' | 'bevel'
export type TextStyleTextBaseline =
  | 'alphabetic'
  | 'top'
  | 'hanging'
  | 'middle'
  | 'ideographic'
  | 'bottom'
export type TextStyleWhiteSpace = 'normal' | 'pre' | 'pre-line'

export enum TEXT_GRADIENT {
  LINEAR_VERTICAL = 0,
  LINEAR_HORIZONTAL = 1
}

export interface ITextStyle {
  align: TextStyleAlign
  breakWords: boolean
  dropShadow: boolean
  dropShadowOffsetX: number
  dropShadowOffsetY: number
  dropShadowAlpha: number
  dropShadowAngle: number
  dropShadowBlur: number
  dropShadowColor: string | number
  dropShadowDistance: number
  fill: TextStyleFill
  fillGradientType: TEXT_GRADIENT
  fillGradientStops: number[]
  fontFamily: string | string[]
  fontSize: number | string
  fontStyle: TextStyleFontStyle
  fontVariant: TextStyleFontVariant
  fontWeight: TextStyleFontWeight
  letterSpacing: number
  lineHeight: number
  lineJoin: TextStyleLineJoin
  miterLimit: number
  padding: number
  stroke: string | number
  strokeThickness: number
  textBaseline: TextStyleTextBaseline
  trim: boolean
  whiteSpace: TextStyleWhiteSpace
  wordWrap: boolean
  wordWrapWidth: number
  leading: number
}

const defaultStyle: ITextStyle = {
  align: 'left',
  breakWords: false,
  dropShadow: false,
  dropShadowAlpha: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowBlur: 0,
  dropShadowColor: 'black',
  dropShadowDistance: 5,
  dropShadowOffsetX: 0,
  dropShadowOffsetY: 0,
  fill: 'black',
  fillGradientType: TEXT_GRADIENT.LINEAR_VERTICAL,
  fillGradientStops: [],
  fontFamily: 'Arial',
  fontSize: 26,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  letterSpacing: 0,
  lineHeight: 0,
  lineJoin: 'miter',
  miterLimit: 10,
  padding: 0,
  stroke: 'black',
  strokeThickness: 0,
  textBaseline: 'alphabetic',
  trim: false,
  whiteSpace: 'pre',
  wordWrap: false,
  wordWrapWidth: 100,
  leading: 0
}

const genericFontFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui']

export class TextStyle implements ITextStyle {
  public styleID: number

  protected _align: TextStyleAlign
  protected _breakWords: boolean
  protected _dropShadow: boolean
  protected _dropShadowAlpha: number
  protected _dropShadowAngle: number
  protected _dropShadowBlur: number
  protected _dropShadowColor: string | number
  protected _dropShadowOffsetX: number
  protected _dropShadowOffsetY: number
  protected _dropShadowDistance: number
  protected _fill: TextStyleFill
  protected _fillGradientType: TEXT_GRADIENT
  protected _fillGradientStops: number[]
  protected _fontFamily: string | string[]
  protected _fontSize: number | string
  protected _fontStyle: TextStyleFontStyle
  protected _fontVariant: TextStyleFontVariant
  protected _fontWeight: TextStyleFontWeight
  protected _letterSpacing: number
  protected _lineHeight: number
  protected _lineJoin: TextStyleLineJoin
  protected _miterLimit: number
  protected _padding: number
  protected _stroke: string
  protected _strokeThickness: number
  protected _textBaseline: TextStyleTextBaseline
  protected _trim: boolean
  protected _whiteSpace: TextStyleWhiteSpace
  protected _wordWrap: boolean
  protected _wordWrapWidth: number
  protected _leading: number

  constructor(style: Partial<ITextStyle>) {
    this.styleID = 0

    this.reset()

    Utils.deepCopyProperties(this, style, style)
  }

  public clone(): TextStyle {
    const clonedProperties: Partial<ITextStyle> = {}

    Utils.deepCopyProperties(clonedProperties, this, defaultStyle)

    return new TextStyle(clonedProperties)
  }

  /**
   * Resets all properties to the defaults specified in TextStyle.prototype._default
   */
  public reset(): void {
    Utils.deepCopyProperties(this, defaultStyle, defaultStyle)
  }

  /**
   * Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
   *
   * @member {string}
   */
  get align(): TextStyleAlign {
    return this._align
  }
  set align(align: TextStyleAlign) {
    if (this._align !== align) {
      this._align = align
      this.styleID++
    }
  }

  /**
   * Indicates if lines can be wrapped within words, it needs wordWrap to be set to true
   *
   * @member {boolean}
   */
  get breakWords(): boolean {
    return this._breakWords
  }
  set breakWords(breakWords: boolean) {
    if (this._breakWords !== breakWords) {
      this._breakWords = breakWords
      this.styleID++
    }
  }

  /**
   * Set a drop shadow for the text
   *
   * @member {boolean}
   */
  get dropShadow(): boolean {
    return this._dropShadow
  }
  set dropShadow(dropShadow: boolean) {
    if (this._dropShadow !== dropShadow) {
      this._dropShadow = dropShadow
      this.styleID++
    }
  }

  /**
   * Set alpha for the drop shadow
   *
   * @member {number}
   */
  get dropShadowAlpha(): number {
    return this._dropShadowAlpha
  }
  set dropShadowAlpha(dropShadowAlpha: number) {
    if (this._dropShadowAlpha !== dropShadowAlpha) {
      this._dropShadowAlpha = dropShadowAlpha
      this.styleID++
    }
  }

  /**
   * Set a angle of the drop shadow
   *
   * @member {number}
   */
  get dropShadowAngle(): number {
    return this._dropShadowAngle
  }
  set dropShadowAngle(dropShadowAngle: number) {
    if (this._dropShadowAngle !== dropShadowAngle) {
      this._dropShadowAngle = dropShadowAngle
      this.styleID++
    }
  }

  /**
   * Set a shadow blur radius
   *
   * @member {number}
   */
  get dropShadowBlur(): number {
    return this._dropShadowBlur
  }
  set dropShadowBlur(dropShadowBlur: number) {
    if (this._dropShadowBlur !== dropShadowBlur) {
      this._dropShadowBlur = dropShadowBlur
      this.styleID++
    }
  }

  /**
   * A fill style to be used on the dropshadow e.g 'red', '#00FF00'
   *
   * @member {string|number}
   */
  get dropShadowColor(): string {
    return this._dropShadowColor as string
  }
  set dropShadowColor(dropShadowColor: string) {
    const outputColor = getColor(dropShadowColor) as string
    if (this._dropShadowColor !== outputColor) {
      this._dropShadowColor = outputColor
      this.styleID++
    }
  }

  /**
   * Set a distance of the drop shadow
   *
   * @member {number}
   */
  get dropShadowDistance(): number {
    return this._dropShadowDistance
  }
  set dropShadowDistance(dropShadowDistance: number) {
    if (this._dropShadowDistance !== dropShadowDistance) {
      this._dropShadowDistance = dropShadowDistance
      this.styleID++
    }
  }

  /**
   * Set a offsetX of the drop shadow
   *
   * @member {number}
   */
  get dropShadowOffsetX(): number {
    return this._dropShadowOffsetX
  }
  set dropShadowOffsetX(dropShadowOffsetX: number) {
    if (this._dropShadowOffsetX !== dropShadowOffsetX) {
      this._dropShadowOffsetX = dropShadowOffsetX
      this.styleID++
    }
  }

  /**
   * Set a offsetY of the drop shadow
   *
   * @member {number}
   */
  get dropShadowOffsetY(): number {
    return this._dropShadowOffsetY
  }
  set dropShadowOffsetY(dropShadowOffsetY: number) {
    if (this._dropShadowOffsetY !== dropShadowOffsetY) {
      this._dropShadowOffsetY = dropShadowOffsetY
      this.styleID++
    }
  }

  /**
   * A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'.
   * Can be an array to create a gradient eg ['#000000','#FFFFFF']
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
   *
   * @member {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */
  get fill(): TextStyleFill {
    return this._fill
  }
  set fill(fill: TextStyleFill) {
    const outputColor = getColor(fill as any)
    if (this._fill !== outputColor) {
      this._fill = outputColor
      this.styleID++
    }
  }
  get fillGradientType(): TEXT_GRADIENT {
    return this._fillGradientType
  }
  set fillGradientType(fillGradientType: TEXT_GRADIENT) {
    if (this._fillGradientType !== fillGradientType) {
      this._fillGradientType = fillGradientType
      this.styleID++
    }
  }

  get fillGradientStops(): number[] {
    return this._fillGradientStops
  }
  set fillGradientStops(fillGradientStops: number[]) {
    if (!areArraysEqual(this._fillGradientStops, fillGradientStops)) {
      this._fillGradientStops = fillGradientStops
      this.styleID++
    }
  }

  get fontFamily(): string | string[] {
    return this._fontFamily
  }
  set fontFamily(fontFamily: string | string[]) {
    if (this.fontFamily !== fontFamily) {
      this._fontFamily = fontFamily
      this.styleID++
    }
  }

  get fontSize(): number | string {
    return this._fontSize
  }
  set fontSize(fontSize: number | string) {
    if (this._fontSize !== fontSize) {
      this._fontSize = fontSize
      this.styleID++
    }
  }

  get fontStyle(): TextStyleFontStyle {
    return this._fontStyle
  }
  set fontStyle(fontStyle: TextStyleFontStyle) {
    if (this._fontStyle !== fontStyle) {
      this._fontStyle = fontStyle
      this.styleID++
    }
  }

  /**
   * The font variant
   * ('normal' or 'small-caps')
   *
   * @member {string}
   */
  get fontVariant(): TextStyleFontVariant {
    return this._fontVariant
  }
  set fontVariant(fontVariant: TextStyleFontVariant) {
    if (this._fontVariant !== fontVariant) {
      this._fontVariant = fontVariant
      this.styleID++
    }
  }

  /**
   * The font weight
   * ('normal', 'bold', 'bolder', 'lighter' and '100', '200', '300', '400', '500', '600', '700', 800' or '900')
   *
   * @member {string}
   */
  get fontWeight(): TextStyleFontWeight {
    return this._fontWeight
  }
  set fontWeight(fontWeight: TextStyleFontWeight) {
    if (this._fontWeight !== fontWeight) {
      this._fontWeight = fontWeight
      this.styleID++
    }
  }

  /**
   * The amount of spacing between letters, default is 0
   *
   * @member {number}
   */
  get letterSpacing(): number {
    return this._letterSpacing
  }
  set letterSpacing(letterSpacing: number) {
    if (this._letterSpacing !== letterSpacing) {
      this._letterSpacing = letterSpacing
      this.styleID++
    }
  }

  /**
   * The line height, a number that represents the vertical space that a letter uses
   *
   * @member {number}
   */
  get lineHeight(): number {
    return this._lineHeight
  }
  set lineHeight(lineHeight: number) {
    if (this._lineHeight !== lineHeight) {
      this._lineHeight = lineHeight
      this.styleID++
    }
  }

  /**
   * The space between lines
   *
   * @member {number}
   */
  get leading(): number {
    return this._leading
  }
  set leading(leading: number) {
    if (this._leading !== leading) {
      this._leading = leading
      this.styleID++
    }
  }

  /**
   * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
   * Default is 'miter' (creates a sharp corner).
   *
   * @member {string}
   */
  get lineJoin(): TextStyleLineJoin {
    return this._lineJoin
  }
  set lineJoin(lineJoin: TextStyleLineJoin) {
    if (this._lineJoin !== lineJoin) {
      this._lineJoin = lineJoin
      this.styleID++
    }
  }

  /**
   * The miter limit to use when using the 'miter' lineJoin mode
   * This can reduce or increase the spikiness of rendered text.
   *
   * @member {number}
   */
  get miterLimit(): number {
    return this._miterLimit
  }
  set miterLimit(miterLimit: number) {
    if (this._miterLimit !== miterLimit) {
      this._miterLimit = miterLimit
      this.styleID++
    }
  }

  /**
   * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
   * by adding padding to all sides of the text.
   *
   * @member {number}
   */
  get padding(): number {
    return this._padding
  }
  set padding(padding: number) {
    if (this._padding !== padding) {
      this._padding = padding
      this.styleID++
    }
  }

  /**
   * A canvas fillstyle that will be used on the text stroke
   * e.g 'blue', '#FCFF00'
   *
   * @member {string}
   */
  get stroke(): string {
    return this._stroke
  }
  set stroke(stroke: string) {
    // TODO: Can't have different types for getter and setter. The getter shouldn't have the number type as
    //       the setter converts to string. See this thread for more details:
    //       https://github.com/microsoft/TypeScript/issues/2521
    const outputColor = getColor(stroke)
    if (this._stroke !== outputColor) {
      this._stroke = outputColor
      this.styleID++
    }
  }

  /**
   * A number that represents the thickness of the stroke.
   * Default is 0 (no stroke)
   *
   * @member {number}
   */
  get strokeThickness(): number {
    return this._strokeThickness
  }
  set strokeThickness(strokeThickness: number) {
    if (this._strokeThickness !== strokeThickness) {
      this._strokeThickness = strokeThickness
      this.styleID++
    }
  }

  /**
   * The baseline of the text that is rendered.
   *
   * @member {string}
   */
  get textBaseline(): TextStyleTextBaseline {
    return this._textBaseline
  }
  set textBaseline(textBaseline: TextStyleTextBaseline) {
    if (this._textBaseline !== textBaseline) {
      this._textBaseline = textBaseline
      this.styleID++
    }
  }

  /**
   * Trim transparent borders
   *
   * @member {boolean}
   */
  get trim(): boolean {
    return this._trim
  }
  set trim(trim: boolean) {
    if (this._trim !== trim) {
      this._trim = trim
      this.styleID++
    }
  }

  /**
   * How newlines and spaces should be handled.
   * Default is 'pre' (preserve, preserve).
   *
   *  value       | New lines     |   Spaces
   *  ---         | ---           |   ---
   * 'normal'     | Collapse      |   Collapse
   * 'pre'        | Preserve      |   Preserve
   * 'pre-line'   | Preserve      |   Collapse
   *
   * @member {string}
   */
  get whiteSpace(): TextStyleWhiteSpace {
    return this._whiteSpace
  }
  set whiteSpace(whiteSpace: TextStyleWhiteSpace) {
    if (this._whiteSpace !== whiteSpace) {
      this._whiteSpace = whiteSpace
      this.styleID++
    }
  }

  /**
   * Indicates if word wrap should be used
   *
   * @member {boolean}
   */
  get wordWrap(): boolean {
    return this._wordWrap
  }
  set wordWrap(wordWrap: boolean) {
    if (this._wordWrap !== wordWrap) {
      this._wordWrap = wordWrap
      this.styleID++
    }
  }

  /**
   * The width at which text will wrap, it needs wordWrap to be set to true
   *
   * @member {number}
   */
  get wordWrapWidth(): number {
    return this._wordWrapWidth
  }
  set wordWrapWidth(wordWrapWidth: number) {
    if (this._wordWrapWidth !== wordWrapWidth) {
      this._wordWrapWidth = wordWrapWidth
      this.styleID++
    }
  }

  /**
   * Generates a font style string to use for `TextMetrics.measureFont()`.
   *
   * @return {string} Font style string, for passing to `TextMetrics.measureFont()`
   */
  public toFontString(): string {
    // build canvas api font setting from individual components. Convert a numeric this.fontSize to px
    const fontSizeString = typeof this.fontSize === 'number' ? `${this.fontSize}px` : this.fontSize

    // Clean-up fontFamily property by quoting each font name
    // this will support font names with spaces
    let fontFamilies: string | string[] = this.fontFamily

    if (!Array.isArray(this.fontFamily)) {
      fontFamilies = this.fontFamily.split(',')
    }

    for (let i = fontFamilies.length - 1; i >= 0; i--) {
      // Trim any extra white-space
      let fontFamily = fontFamilies[i].trim()

      // Check if font already contains strings
      if (!/([\"\'])[^\'\"]+\1/.test(fontFamily) && genericFontFamilies.indexOf(fontFamily) < 0) {
        fontFamily = `"${fontFamily}"`
      }
      ;(fontFamilies as string[])[i] = fontFamily
    }

    return `${this.fontStyle} ${this.fontVariant} ${
      this.fontWeight
    } ${fontSizeString} ${(fontFamilies as string[]).join(',')}`
  }
}

function getSingleColor(color: string | number): string {
  if (typeof color === 'number') {
    return StringUtil.convertToHtmlColor(color)
    // // todo
    // return color
  } else if (typeof color === 'string') {
    if (color.indexOf('0x') === 0) {
      color = color.replace('0x', '#')
    }
  }

  return color
}

/**
 * Utility function to convert hexadecimal colors to strings, and simply return the color if it's a string.
 * This version can also convert array of colors
 * @private
 * @param {string|number|number[]} color
 * @return {string} The color as a string.
 */
function getColor(color: (string | number)[]): string[]
function getColor(color: string | number): string
function getColor(color: string | number | (string | number)[]): string | string[] {
  if (!Array.isArray(color)) {
    return getSingleColor(color)
  } else {
    for (let i = 0; i < color.length; ++i) {
      color[i] = getSingleColor(color[i])
    }

    return color as string[]
  }
}

function areArraysEqual<T>(array1: T[], array2: T[]): boolean {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return false
  }

  if (array1.length !== array2.length) {
    return false
  }

  for (let i = 0; i < array1.length; ++i) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }

  return true
}
