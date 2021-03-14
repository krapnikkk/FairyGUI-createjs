
import { FlipType, GearType, ParseFlipType } from './config/Definitions'
import { UIImage } from './display/UIImage'

import { GObject } from './GObject'
import { IColorGear } from './interface/IColorGear'
import { StringUtil } from './utils/StringUtil'
import { XmlNode } from './utils/XMLParser'

export class GImage extends GObject implements IColorGear {
  private $content: UIImage
  private $flip: FlipType

  public constructor() {
    super();
  }

  public get touchable(): boolean {
    return false
  }

  public set touchable(value: boolean) {
    this.$touchable = false //GImage has no interaction
  }

  public get color(): string {
    return this.$content.tint
  }

  public set color(value: string) {
    if (this.color != value) {
      this.updateGear(GearType.Color)
      this.$content.tint = value
      this.$content.setCache(0, 0, this.$width, this.$height)
    }
  }

  public get flip(): FlipType {
    return this.$flip
  }

  public set flip(value: FlipType) {
    if (this.$flip != value) {
      this.$flip = value
      this.$content.scaleX = this.$content.scaleY = 1
      if (this.$flip == FlipType.Horizontal || this.$flip == FlipType.Both) {
        this.$content.scaleX = -1
      }
      if (this.$flip == FlipType.Vertical || this.$flip == FlipType.Both) {
        this.$content.scaleY = -1
      }
      this.handleXYChanged()
    }
  }

  public get texture(): HTMLImageElement {
    return this.$content.texture
  }

  public set texture(value: HTMLImageElement) {
    if (value != null) {
      this.$sourceWidth = value.width
      this.$sourceHeight = value.height
    } else this.$sourceWidth = this.$sourceHeight = 0
    this.$initWidth = this.$sourceWidth
    this.$initHeight = this.$sourceHeight
    this.$content.texture = value
  }

  protected createDisplayObject(): void {
    this.$content = new UIImage(this)
    this.setDisplayObject(this.$content)
  }

  public dispose(): void {
    this.$content.destroy()
    super.dispose()
  }

  public constructFromResource(): void {
    this.$sourceWidth = this.packageItem.width
    this.$sourceHeight = this.packageItem.height
    this.$initWidth = this.$sourceWidth
    this.$initHeight = this.$sourceHeight
    this.$content.$initDisp(this.packageItem)
    this.setSize(this.$sourceWidth, this.$sourceHeight)
  }

  protected handleXYChanged(): void {
    super.handleXYChanged()
    if (this.$flip != FlipType.None) {
      if (this.$content.scaleX == -1) this.$content.x += this.width
      if (this.$content.scaleY == -1) this.$content.y += this.height
    }
  }

  protected handleSizeChanged(): void {
    this.$content.width = this.width
    this.$content.height = this.height
    let rect = new createjs.Rectangle(this.x, this.y, this.width, this.height)
    this.$content.sourceRect = rect
  }

  public setupBeforeAdd(xml: XmlNode): void {
    super.setupBeforeAdd(xml)

    let str: string
    str = xml.attributes.color
    if (str) {
      this.color = StringUtil.HEX2RGB(str)
    }
    str = xml.attributes.flip
    if (str) this.flip = ParseFlipType(str)
  }
}
