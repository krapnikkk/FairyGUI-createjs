
import { PackageItem } from '../../res/PackageItem'
import { Sprite } from './Sprite'

export default class ScaleBitmap extends Sprite {
  scale9Grid: createjs.Rectangle
  snapToPixel: boolean

  constructor(item: PackageItem, scale9Grid: createjs.Rectangle) {
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
    this.scale9Grid = scale9Grid
    this.snapToPixel = true
  }

  draw(ctx: CanvasRenderingContext2D, ignoreCache: boolean): boolean {
    let flag = super.draw(ctx, ignoreCache)
    if (flag) {
      return true
    }
    var centerX = this.scale9Grid.width
    var centerY = this.scale9Grid.height
    var scaledCenterX: number
    var scaledCenterY: number
    var imageHeight = this.sourceRect.height
    var imageWidth = this.sourceRect.width
    if (centerX == 0) {
      //vertical
      if (centerY == 0) {
        throw 'One of scale9Grid width or height must be greater than zero.'
      }
      var scale3Region2 = this.textureRect.y + this.scale9Grid.y
      var scale3Region3 = this.textureRect.y + this.scale9Grid.y + this.scale9Grid.height
      var scaledFirstRegion = this.scale9Grid.y
      var scaledSecondRegion = this.scale9Grid.height
      var scaledThirdRegion = this.textureRect.height - scaledFirstRegion - scaledSecondRegion
      scaledCenterY = imageHeight - scaledFirstRegion - scaledThirdRegion

      ctx.drawImage(
        this.texture,
        this.textureRect.x,
        this.textureRect.y,
        this.textureRect.width,
        scaledFirstRegion,
        0,
        0,
        imageWidth,
        scaledFirstRegion
      )
      ctx.drawImage(
        this.texture,
        this.textureRect.x,
        scale3Region2,
        this.textureRect.width,
        scaledSecondRegion,
        0,
        scaledFirstRegion,
        imageWidth,
        scaledCenterY
      )
      ctx.drawImage(
        this.texture,
        this.textureRect.x,
        scale3Region3,
        this.textureRect.width,
        scaledThirdRegion,
        0,
        scaledCenterY + scaledFirstRegion,
        imageWidth,
        scaledThirdRegion
      )
    } else if (centerY == 0) {
      //horizontal
      var scale3Region2 = this.textureRect.x + this.scale9Grid.x
      var scale3Region3 = this.textureRect.x + this.scale9Grid.x + this.scale9Grid.width
      var scaledFirstRegion = this.scale9Grid.x
      var scaledSecondRegion = this.scale9Grid.width
      var scaledThirdRegion = this.textureRect.width - scaledFirstRegion - scaledSecondRegion
      scaledCenterX = imageWidth - scaledFirstRegion - scaledThirdRegion

      ctx.drawImage(
        this.texture,
        this.textureRect.x,
        this.textureRect.y,
        scaledFirstRegion,
        this.textureRect.height,
        0,
        0,
        scaledFirstRegion,
        imageHeight
      )
      ctx.drawImage(
        this.texture,
        scale3Region2,
        this.textureRect.y,
        scaledSecondRegion,
        this.textureRect.height,
        scaledFirstRegion,
        0,
        scaledCenterX,
        imageHeight
      )
      ctx.drawImage(
        this.texture,
        scale3Region3,
        this.textureRect.y,
        scaledThirdRegion,
        this.textureRect.height,
        scaledFirstRegion + scaledCenterX,
        0,
        scaledThirdRegion,
        imageHeight
      )
    } else {
      var left = this.scale9Grid.x
      var top = this.scale9Grid.y
      var right = this.textureRect.width - centerX - left
      var bottom = this.textureRect.height - centerY - top
      scaledCenterX = imageWidth - left - right
      scaledCenterY = imageHeight - top - bottom

      ctx.drawImage(
        this.texture,
        this.textureRect.x,
        this.textureRect.y,
        left,
        top,
        0,
        0,
        left,
        top
      )
      ctx.drawImage(
        this.texture,
        this.textureRect.x + left,
        this.textureRect.y,
        centerX,
        top,
        left,
        0,
        scaledCenterX,
        top
      )
      ctx.drawImage(
        this.texture,
        this.textureRect.x + left + centerX,
        this.textureRect.y,
        right,
        top,
        left + scaledCenterX,
        0,
        right,
        top
      )

      ctx.drawImage(
        this.texture,
        this.textureRect.x,
        this.textureRect.y + top,
        left,
        centerY,
        0,
        top,
        left,
        scaledCenterY
      )
      ctx.drawImage(
        this.texture,
        this.textureRect.x + left,
        this.textureRect.y + top,
        centerX,
        centerY,
        left,
        top,
        scaledCenterX,
        scaledCenterY
      )
      ctx.drawImage(
        this.texture,
        this.textureRect.x + left + centerX,
        this.textureRect.y + top,
        right,
        centerY,
        left + scaledCenterX,
        top,
        right,
        scaledCenterY
      )

      ctx.drawImage(
        this.texture,
        this.textureRect.x,
        this.textureRect.y + top + centerY,
        left,
        bottom,
        0,
        top + scaledCenterY,
        left,
        bottom
      )
      ctx.drawImage(
        this.texture,
        this.textureRect.x + left,
        this.textureRect.y + top + centerY,
        centerX,
        bottom,
        left,
        top + scaledCenterY,
        scaledCenterX,
        bottom
      )
      ctx.drawImage(
        this.texture,
        this.textureRect.x + left + centerX,
        this.textureRect.y + top + centerY,
        right,
        bottom,
        left + scaledCenterX,
        top + scaledCenterY,
        right,
        bottom
      )
    }
    return true
  }
}
