
import { PackageItem } from '../../res/PackageItem'
import { Sprite } from './Sprite'

export class TilingBitmap extends Sprite {
  private _pattern: CanvasPattern
  public constructor(item?: PackageItem) {
    super()
    if (item) {
      let { width, height, texture, id } = item
      this.$frameId = id
      if (typeof texture == 'string') {
        this.texture = document.createElement('img')
        this.texture.src = texture
      } else {
        this.texture = (texture as createjs.SpriteSheetFrame).image
      }
      this.sourceRect = new createjs.Rectangle(0, 0, width, height)
      this.textureRect = (texture as createjs.SpriteSheetFrame).rect
      let offsetCanvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement
      let offsetCanvasContext: CanvasRenderingContext2D = offsetCanvas.getContext('2d')
      offsetCanvas.width = this.textureRect.width
      offsetCanvas.height = this.textureRect.height
      offsetCanvasContext.drawImage(
        this.texture,
        this.textureRect.x,
        this.textureRect.y,
        this.textureRect.width,
        this.textureRect.height,
        0,
        0,
        this.textureRect.width,
        this.textureRect.height
      )
      this._pattern = offsetCanvasContext.createPattern(offsetCanvas, 'repeat')
    }
  }

  draw(ctx: CanvasRenderingContext2D, ignoreCache: boolean): boolean {
    let flag = super.draw(ctx, ignoreCache)
    if (flag) {
      return flag
    }
    // ctx.save();
    let { width, height } = this.sourceRect
    ctx.fillStyle = this._pattern
    ctx.fillRect(0, 0, width, height)
    // ctx.restore();
    return true
  }
}
