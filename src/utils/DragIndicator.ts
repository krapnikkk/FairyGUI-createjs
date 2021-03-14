
import { AlignType, VertAlignType } from '../config/Definitions'
import { GLoader } from '../GLoader'
import { GObject } from '../GObject'
import { GRoot } from '../GRoot'
import { DragEvent } from '../events/DragEvent'

export class DragIndicator {
  protected $agent: GLoader
  protected $sourceData: any
  protected $sourceObject: GObject

  public constructor() {
    this.$agent = new GLoader()
    this.$agent.draggable = true
    this.$agent.touchable = false
    this.$agent.setSize(100, 100)
    this.$agent.setPivot(0.5, 0.5, true)
    this.$agent.align = AlignType.Center
    this.$agent.verticalAlign = VertAlignType.Middle
    this.$agent.sortingOrder = 1000000 //top most
    this.$agent.on(DragEvent.END, this.$dragEnd, this)
  }

  public get dragAgent(): GObject {
    return this.$agent
  }

  public get isDragging(): boolean {
    return this.$agent.parent != null
  }

  public get sourceObject(): GObject {
    return this.$sourceObject
  }

  public startDrag(
    source: GObject,
    icon: string,
    sourceData: any,
    touchPointID: number = -1
  ): void {
    if (this.isDragging) return

    this.$sourceObject = source
    this.$sourceData = sourceData
    this.$agent.url = icon
    GRoot.inst.addChild(this.$agent)
    const pt: createjs.Point = GRoot.inst.globalToLocal(
      GRoot.globalMouseStatus.mouseX,
      GRoot.globalMouseStatus.mouseY
    )
    this.$agent.setXY(pt.x, pt.y)
    this.$agent.startDrag(touchPointID)
  }

  public cancel(): void {
    if (this.$agent.parent != null) {
      this.$agent.stopDrag()
      GRoot.inst.removeChild(this.$agent)
      this.$sourceData = null
    }
  }

  private $dragEnd(evt: any): void {
    if (!this.isDragging) return

    GRoot.inst.removeChild(this.$agent)

    let sourceData: any = this.$sourceData
    this.$sourceData = null
    let obj: GObject = GRoot.inst.getObjectUnderPoint(evt.target.x, evt.target.y)
    while (obj != null) {
      if (obj.hasListener(DragEvent.DROP)) {
        obj.requestFocus()
        let currentTarget = obj.displayObject;
        let event = new createjs.Event(DragEvent.DROP, true, false)
        event.data = { currentTarget, sourceData }
        obj.dispatchEvent(event, this)
        return
      }
      obj = obj.parent
    }
  }
}
