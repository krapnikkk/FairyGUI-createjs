
import { GObject } from '../GObject'
import { IUIObject } from '../interface/IUIObject'

export class UIContainer extends createjs.Container implements IUIObject {
  protected $scrollRect: createjs.Rectangle
  protected $rectMask: createjs.Graphics

  public UIOwner: GObject

  public constructor(owner?: GObject) {
    super()
    this.UIOwner = owner
    this.mouseEnabled = true;
    this.mouseChildren = true;
  }

  public get scrollRect(): createjs.Rectangle {
    return this.$scrollRect
  }

  public set scrollRect(rect: createjs.Rectangle) {
    this.$scrollRect = rect
    if (rect != null) {
      if (!this.$rectMask) {
        this.$rectMask = new createjs.Graphics()
        var shape = new createjs.Shape(this.$rectMask)
        this.mask = shape;
      }
      this.$rectMask.clear()
      if (rect.width > 0 && rect.height > 0) {
        this.$rectMask.beginFill('#000')
        this.$rectMask.drawRect(
          this.$scrollRect.x,
          this.$scrollRect.y,
          this.$scrollRect.width,
          this.$scrollRect.height
        )
        this.$rectMask.endFill();
      }
    } else this.mask = null
  }
}
