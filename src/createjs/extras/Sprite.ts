
export class Sprite extends createjs.DisplayObject {
  protected $tint: string = '#fff'
  protected $frameId: string
  public texture: HTMLImageElement
  protected $sourceRect: createjs.Rectangle // tips:图片元件在组件中的坐标和宽高信息
  protected $textureRect: createjs.Rectangle // tips:绘制的图片在纹理集中的坐标和宽高信息
  protected $isTrim: boolean = false

  protected static $cachedTexturePool: {
    [key: string]: { refCount: number; texture: HTMLImageElement }
  } = {}

  public constructor() {
    super()
  }

  public get tint(): string {
    return this.$tint
  }

  public set tint(v: string) {
    this.$tint = v
    let rgb = v.split(',')
    this.filters = [
      new createjs.ColorFilter(+rgb[0] / 255, +rgb[1] / 255, +rgb[2] / 255, 1, 0, 0, 0, 1)
    ]
  }

  public set sourceRect(rect: createjs.Rectangle) {
    this.$sourceRect = rect
  }

  public get sourceRect(): createjs.Rectangle {
    return this.$sourceRect
  }

  public set textureRect(rect: createjs.Rectangle) {
    this.$textureRect = rect
  }

  public get textureRect(): createjs.Rectangle {
    return this.$textureRect
  }

  isVisible() {
    var hasContent =
      this.cacheCanvas ||
      (this.texture &&
        (this.texture['naturalWidth'] ||
          this.texture['getContext'] ||
          this.texture['readyState'] >= 2))
    return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent)
  }

  getBounds() {
    var rect = super.getBounds()
    if (rect) {
      return rect
    }
    var texture = this.texture,
      o = this.sourceRect || texture
    var hasContent =
      texture && (texture['naturalWidth'] || texture['getContext'] || texture['readyState'] >= 2)
    return hasContent ? this.sourceRect.setValues(0, 0, o.width, o.height) : null
  }

  public destroy(): void {
    //todo
  }
}
