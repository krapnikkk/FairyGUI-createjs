
import { Bitmap } from '../createjs/extras/Bitmap'
import ScaleBitmap from '../createjs/extras/ScaleBitmap'
import { TilingBitmap } from '../createjs/extras/TilingBitmap'
import { GObject } from '../GObject'
import { IUIObject } from '../interface/IUIObject'
import { PackageItem } from '../res/PackageItem'

export class UIImage extends createjs.Container implements IUIObject {
  public UIOwner: GObject
  protected $disp: Bitmap | ScaleBitmap | TilingBitmap

  public constructor(owner?: GObject) {
    super()
    this.UIOwner = owner;
    // this.mouseEnabled = this.mouseChildren = false;
  }

  public set sourceRect(rect: createjs.Rectangle) {
    this.$disp.sourceRect = rect
  }

  public setCache(x: number, y: number, width: number, height: number) {
    this.$disp.cache(x, y, width, height)
  }

  /**@internal */
  $initDisp(item?: PackageItem): void {
    if (this.$disp) return

    if (item) {
      item.load()
      if (item.scaleByTile) {
        this.$disp = new TilingBitmap(item)
      } else if (item.scale9Grid) {
        let rect = new createjs.Rectangle(
          item.scale9Grid.x,
          item.scale9Grid.y,
          Math.max(0, item.scale9Grid.width),
          Math.max(0, item.scale9Grid.height)
        )
        this.$disp = new ScaleBitmap(item, rect)
      } else {
        this.$disp = new Bitmap(item)
      }
    } else {
      this.$disp = new Bitmap()
    }

    this.addChild(this.$disp)
  }

  public get tint(): string {
    return this.$disp.tint
  }

  public set tint(value: string) {
    this.$disp.tint = value
  }

  public get height(): number {
    return this.$disp.sourceRect.height
  }

  public set height(v: number) {
    this.$disp.sourceRect.height = v
  }

  public get width(): number {
    return this.$disp.sourceRect.width
  }

  public set width(v: number) {
    this.$disp.sourceRect.width = v
  }

  public get texture(): HTMLImageElement {
    return this.$disp.texture
  }

  public set texture(v: HTMLImageElement) {
    this.$disp.texture = v
  }

  /**
   * rect = x,y,w,h = l,t,r,b
   */
  public get scale9Grid(): createjs.Rectangle {
    if (this.$disp instanceof ScaleBitmap) {
      return this.$disp.scale9Grid
    }
    return null
  }

  /**
   * rect = x,y,w,h = l,t,r,b
   */
  public set scale9Grid(rect: createjs.Rectangle) {
    if (this.$disp instanceof ScaleBitmap) {
      this.$disp.scale9Grid = rect
    }
  }

  /**
   * todo
   */
  public destroy(): void {
    //     if(this.$disp) {
    //         this.$disp.destroy(options);
    //         this.$disp = null;
    //     }
    //     super.destroy(options);
  }
}
