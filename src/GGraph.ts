
import { UISprite } from './display/UISprite'
import { GObject } from './GObject'
import { IColorGear } from './interface/IColorGear'
import { StringUtil } from './utils/StringUtil'
import { Utils } from './utils/Utils'
import { XmlNode } from './utils/XMLParser'

export class GGraph extends GObject implements IColorGear {
  private $type: number = 0
  private $lineSize: number = 1
  private $lineColor: string
  private $sides: number = 0
  private $fillColor: string
  private $corner: number[]
  private $startAngle: number = 0
  private $points: Array<number> = []

  public constructor() {
    super()
    this.$lineSize = 1
    this.$lineColor = '#000000'
    this.$fillColor = '#FFFFFF'
  }

  public drawRect(lineSize: number, lineColor: string, fillColor: string): void {
    this.$type = 1
    this.$lineSize = lineSize
    this.$lineColor = lineColor
    this.$fillColor = fillColor
    this.drawGraph()
  }

  public drawEllipse(lineSize: number, lineColor: string, fillColor: string): void {
    this.$type = 2
    this.$lineSize = lineSize
    this.$lineColor = lineColor
    this.$fillColor = fillColor
    this.drawGraph()
  }

  public get color(): string {
    return this.$fillColor
  }

  public set color(value: string) {
    this.$fillColor = value
    if (this.$type != 0) this.drawGraph()
  }

  private drawGraph(): void {
    let shape: createjs.Shape = this.$displayObject as createjs.Shape
    let g: createjs.Graphics = shape.graphics
    g.clear()

    let w: number = this.width
    let h: number = this.height
    if (w == 0 || h == 0) return

    g.beginStroke(this.$lineColor)

    if (this.$lineSize == 0) {
      g.setStrokeStyle(0.1) // see https://github.com/CreateJS/EaselJS/issues/734
    } else {
      g.setStrokeStyle(this.$lineSize)
      w -= this.$lineSize
      h -= this.$lineSize
    }
    g.beginFill(this.$fillColor)
    if (this.$type == 1) {
      if (this.$corner && this.$corner.length >= 1) {
        if (this.$corner.length == 1) {
          g.drawRoundRect(this.$lineSize / 2, this.$lineSize / 2, w, h, this.$corner[0])
        } else {
          g.drawRoundRectComplex(
            this.$lineSize / 2,
            this.$lineSize / 2,
            w,
            h,
            this.$corner[0],
            this.$corner[1],
            this.$corner[3],
            this.$corner[2]
          )
        }
      } else {
        g.drawRect(this.$lineSize / 2, this.$lineSize / 2, w, h)
      }
    } else if (this.$type == 2) {
      let halfW: number = w * 0.5
      if (w == h) g.drawCircle(halfW + this.$lineSize / 2, halfW + this.$lineSize / 2, halfW)
      else {
        w = w - this.$lineSize
        h = h - this.$lineSize
        g.drawEllipse(this.$lineSize / 2, this.$lineSize / 2, w, h)
      }
    } else if (this.$type == 3) {
      let radius = w > h ? w / 2 : h / 2
      g.drawPolyStar(0 + radius, 0 + radius, radius, this.$sides, 0, this.$startAngle)
    } else if (this.$type == 4) {
      Utils.fillPath(g, this.$points, 0, 0)
    }
    g.endFill()
    shape.cache(0, 0, this.$width, this.$height)
  }

  public replaceMe(target: GObject): void {
    if (!this.$parent) throw new Error('parent not set')

    target.name = this.name
    target.alpha = this.alpha
    target.rotation = this.rotation
    target.visible = this.visible
    target.touchable = this.touchable
    target.grayed = this.grayed
    target.setXY(this.x, this.y)
    target.setSize(this.width, this.height)

    let index: number = this.$parent.getChildIndex(this)
    this.$parent.addChildAt(target, index)
    target.relations.copyFrom(this.relations)

    this.$parent.removeChild(this, true)
  }

  public addBeforeMe(target: GObject): void {
    if (this.$parent == null) throw new Error('parent not set')

    let index: number = this.$parent.getChildIndex(this)
    this.$parent.addChildAt(target, index)
  }

  public addAfterMe(target: GObject): void {
    if (this.$parent == null) throw new Error('parent not set')

    let index: number = this.$parent.getChildIndex(this)
    index++
    this.$parent.addChildAt(target, index)
  }

  protected createDisplayObject(): void {
    this.$displayObject = new UISprite(this)
    this.$displayObject.mouseEnabled = true;
  }

  protected handleSizeChanged(): void {
    if (this.$type != 0) this.drawGraph()
  }

  public setupBeforeAdd(xml: XmlNode): void {
    super.setupBeforeAdd(xml)

    let type: string = xml.attributes.type
    if (type && type != 'empty') {
      let str: string
      str = xml.attributes.lineSize
      if (str) this.$lineSize = parseInt(str)

      let c: string
      str = xml.attributes.lineColor
      if (str) {
        c = StringUtil.convertToRGBA(str)
        this.$lineColor = c
      }

      str = xml.attributes.fillColor
      if (str) {
        c = StringUtil.convertToRGBA(str)
        this.$fillColor = c
      }

      let arr: string[]
      str = xml.attributes.corner
      if (str) {
        arr = str.split(',')
        if (arr.length > 1)
          this.$corner = [parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3])]
        else this.$corner = [parseInt(arr[0])]
      }

      if (type == 'rect') {
        this.$type = 1
      } else if (type == 'eclipse') {
        this.$type = 2
      } else if (type == 'regular_polygon') {
        this.$type = 3
        str = xml.attributes.sides
        if (str) {
          this.$sides = parseInt(str)
        }
        str = xml.attributes.startAngle
        if (str) {
          this.$startAngle = parseInt(str)
        }
      } else if (type == 'polygon') {
        this.$type = 4
        str = xml.attributes.points
        if (str) {
          arr = str.split(',')
          this.$points = arr.map(point => {
            return parseInt(point)
          })
        }
      }

      this.drawGraph()
    }
  }
}
