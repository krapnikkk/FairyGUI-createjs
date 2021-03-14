
import { TextStyle } from '../createjs/extras/TextStyle'
import { GObject, Decls } from '../GObject'
import { IUIObject } from '../interface/IUIObject'

export class UITextField extends createjs.Text implements IUIObject {
  public style: TextStyle
  public UIOwner: GObject
  public multiple: createjs.Text
  protected $minHeight: number
  protected $minHeightID: number = -1

  public constructor(owner?: GObject) {
    super()
    this.UIOwner = owner
    this.style = new TextStyle({})
    // this.mouseEnabled = false;
    // this.interactive = this.interactiveChildren = false;
    // this._texture.noFrame = false;
    // this._width = this._texture.frame.width;
    // this._height = this._texture.frame.height;
    // this.$minHeight = -1;
    // this._texture.on("update", this.updateFrame, this);
  }

  public get minHeight(): number {
    return this.$minHeight
  }

  public applyStyle() {
    let canvas = <HTMLCanvasElement>Decls.GRoot.inst.applicationContext.canvas
    this.font = this.style.toFontString()
    this.color = this.style.fill as string
    let letterSpacing = this.style.letterSpacing
    if (letterSpacing) {
      canvas.style.letterSpacing = `${letterSpacing}px`
    } else {
      canvas.style.letterSpacing = `0px`
    }
    let leading = this.style.leading
    if (leading) {
      this.lineHeight = this.getMeasuredLineHeight() + leading
    } else {
      this.lineHeight = this.getMeasuredLineHeight()
    }
    let strokeThickness = this.style.strokeThickness
    if (strokeThickness) {
      if (!this.multiple) {
        this.multiple = new createjs.Text(this.text, this.font, this.color);
        (this.UIOwner.parent.displayObject as createjs.Container).addChild(this.multiple);
      }

      this.multiple.outline = strokeThickness
      if (this.style.stroke != this.color) {
        this.multiple.color = this.style.stroke
      }
      this.multiple.lineHeight = this.lineHeight
      this.multiple.lineWidth = this.lineWidth
    }

    let shadow = new createjs.Shadow(
      this.style.dropShadowColor,
      this.style.dropShadowOffsetX,
      this.style.dropShadowOffsetY,
      this.style.dropShadowBlur
    )
    this.shadow = shadow
    let { x, y, width, height } = this
    this.setBounds(x, y, width, height)
  }

  /**@internal */
  $updateMinHeight(): void {
    this.$minHeight = this.getMeasuredLineHeight()
  }

  // protected updateFrame(): void {
  //     GTimer.inst.callLater(this.internalUpdateFrame, this);
  // }

  // private internalUpdateFrame(): void {
  // if(this._texture) {
  //     let frm = this._texture.frame;
  //     this._height = Math.max(this._height, this.$minHeight);
  //     let w = frm.x + this._width, h = frm.y + this._height;
  //     if(w > this._texture.baseTexture.width)
  //         w = this._texture.baseTexture.width - frm.x;
  //     if(h > this._texture.baseTexture.height)
  //         h = this._texture.baseTexture.height - frm.y;

  //     frm.width = w / this.resolution;
  //     frm.height = h / this.resolution;

  //     this._texture.trim.width = frm.width;
  //     this._texture.trim.height = frm.height;

  //     let padding = this._style.trim ? 0 : this._style.padding;
  //     this._texture.trim.x = -padding;
  //     this._texture.trim.y = -padding;

  //     this._texture.frame = frm;
  // }
  // }

  //cancel scaling update
  // protected _onTextureUpdate(): void {
  // this._textureID = -1;
  // this._textureTrimmedID = -1;
  // }

  public get width(): number {
    return this.getMetrics()['width']
  }

  public set width(v: number) {
    this.lineWidth = v
    if (this.multiple) {
      this.multiple.lineWidth = v
    }
  }

  public get height(): number {
    return this.lineHeight
  }

  public set height(v: number) {
    this.lineHeight = v;
    if (this.multiple) {
        this.multiple.lineHeight = v;
    }
  }

  public get textHeight(): number {
    return this.getMeasuredHeight()
  }

  public set textHeight(v: number) {}

  public get textWidth(): number {
    return this.getMeasuredWidth()
  }

  public set content(v: string) {
    this.text = v
    if (this.multiple) {
      this.multiple.text = v
    }
  }

  public get content(): string {
    return this.text
  }

  public updateMultiplePosition(x: number, y: number) {
    if (this.multiple) {
      this.multiple.x = x
      this.multiple.y = y
    }
  }
}
