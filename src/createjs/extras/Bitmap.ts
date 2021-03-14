
import { PackageItem } from '../../res/PackageItem'
import { Sprite } from './Sprite'

export class Bitmap extends Sprite {
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
    }
  }

  draw(ctx: CanvasRenderingContext2D, ignoreCache: boolean): boolean {
    let flag = super.draw(ctx, ignoreCache)
    if (flag) {
      return flag
    }
    if (this.sourceRect && this.textureRect) {
      let { x, y, width, height } = this.sourceRect
      x = this.$isTrim ? x : 0
      y = this.$isTrim ? y : 0
      ctx.drawImage(
        this.texture,
        this.textureRect.x,
        this.textureRect.y,
        this.textureRect.width,
        this.textureRect.height,
        x,
        y,
        width,
        height
      ) //GObject来控制位置坐标
    } else {
      ctx.drawImage(this.texture, 0, 0)
    }
    return true
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
}
