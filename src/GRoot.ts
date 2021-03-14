import { InteractiveEvents, RelationType, PopupDirection } from './config/Definitions'
import { UIConfig } from './config/UIConfig'
import { UIStage, UIStageOptions, StageOrientation } from './display/UIStage'
import { DisplayObjectEvent } from './events/DisplayObjectEvent'
import { GComponent } from './GComponent'
import { GGraph } from './GGraph'
import { Decls, GObject } from './GObject'
import { isUIObject } from './interface/IUIObject'
import { UIPackage } from './res/UIPackage'
import { DOMEventManager } from './utils/DOMEventManager'
import { Window } from './Window'
import { FocusEvent } from './events/FocusEvent'

let _inst: GRoot

export class GRootMouseStatus {
  public touchDown: boolean = false
  public mouseX: number = 0
  public mouseY: number = 0
}

export class GRoot extends GComponent {
  private static uniqueID: number = 0
  public static findFor(obj: GObject): GRoot {
    if (obj instanceof GRoot) return obj

    if (!obj) return _inst

    var p: GObject = obj.parent
    while (p) {
      if (p instanceof GRoot) return p
      p = p.parent
    }
    return _inst
  }

  private $uiStage: UIStage

  private $modalLayer: GGraph
  private $popupStack: GObject[]
  private $justClosedPopups: GObject[]
  private $modalWaitPane: GObject
  private $focusedObject: GObject
  private $tooltipWin: GObject
  private $defaultTooltipWin: GObject
  private $checkingPopups: boolean
  private $uid: number
  private $volumeScale: number = 1

  private static $gmStatus = new GRootMouseStatus()

  /**
   * the singleton instance of the GRoot object
   */
  public static get inst(): GRoot {
    if (_inst == null) _inst = new GRoot()
    return _inst
  }

  /**
   * the current mouse/pointer data
   */
  public static get globalMouseStatus(): GRootMouseStatus {
    return GRoot.$gmStatus
  }

  /**
   * the main entry to lauch the UI root, e.g.: GRoot.inst.attachTo(app, options)
   * @param app your createjs.Stage instance to be used in this GRoot instance
   * @param stageOptions stage rotation / resize options
   */
  public attachTo(stage: createjs.Stage, stageOptions?: UIStageOptions): void {
    createjs.Touch.enable(stage)
    stage.mouseEnabled = true
    stage.mouseChildren = true
    stage.enableMouseOver(50)

    // if (this.$uiStage) {
    //     this.$uiStage.off(DisplayObjectEvent.SIZE_CHANGED, this.$winResize);
    //     this.$uiStage.nativeStage.off(InteractiveEvents.Down, this.$stageDown);
    //     this.$uiStage.nativeStage.off(InteractiveEvents.Up, this.$stageUp);
    //     this.$uiStage.nativeStage.off(InteractiveEvents.Move, this.$stageMove);
    //     this.$uiStage.nativeStage.off(this.$displayObject);
    //     this.$uiStage.dispose();
    // }

    this.$uiStage = new UIStage(stage, stageOptions)
    this.$uiStage.on(DisplayObjectEvent.SIZE_CHANGED, this.$winResize, this)
    this.$uiStage.nativeStage.on(InteractiveEvents.Down, this.$stageDown, this)
    this.$uiStage.nativeStage.on(InteractiveEvents.Up, this.$stageUp, this)
    this.$uiStage.nativeStage.on(InteractiveEvents.Move, this.$stageMove, this)
    this.$uiStage.nativeStage.on(InteractiveEvents.Click, this.$click, this)
    this.$uiStage.nativeStage.addChild(this.$displayObject)

    this.$winResize(this.$uiStage)
    if (!this.$modalLayer) {
      this.$modalLayer = new GGraph()
      this.$modalLayer.setSize(this.width, this.height)
      this.$modalLayer.drawRect(0, '', UIConfig.modalLayerColor)
      this.$modalLayer.addRelation(this, RelationType.Size)
    }
  }

  public constructor() {
    super()
    if (_inst == null) _inst = this

    this.opaque = false
    this.$popupStack = []
    this.$justClosedPopups = []

    this.$uid = GRoot.uniqueID++

    DOMEventManager.inst.on(DisplayObjectEvent.MOUSE_WHEEL, this.dispatchMouseWheel, this)
  }

  public get uniqueID(): number {
    return this.$uid
  }

  public get stageWidth(): number {
    return this.$uiStage.stageWidth
  }

  public get stageHeight(): number {
    return this.$uiStage.stageHeight
  }

  public get contentScaleFactor(): number {
    return this.$uiStage.resolution
  }

  public get applicationContext(): createjs.Stage {
    return this.$uiStage.applicationContext
  }

  public get nativeStage(): createjs.Container {
    return this.$uiStage.nativeStage
  }

  public get orientation(): StageOrientation {
    return this.$uiStage.orientation
  }

  public get stageWrapper(): UIStage {
    return this.$uiStage
  }

  protected dispatchMouseWheel(evt: any): void {
    let event = evt.data.event
    let childUnderMouse = this.getObjectUnderPoint(
      GRoot.globalMouseStatus.mouseX,
      GRoot.globalMouseStatus.mouseY
    )
    if (childUnderMouse != null) {
      //bubble
      while (childUnderMouse.parent && childUnderMouse.parent != this) {
        let mouseWheelEvent = new createjs.Event(DisplayObjectEvent.MOUSE_WHEEL, true, false)
        mouseWheelEvent.data = { event }
        childUnderMouse.dispatchEvent(mouseWheelEvent)
        childUnderMouse = childUnderMouse.parent
      }
    }
  }

  /**
   * get the objects which are placed underneath the given stage coordinate
   * @param globalX the stage X
   * @param globalY the stage Y
   */
  public getObjectUnderPoint(globalX: number, globalY: number): GObject {
    GRoot.sHelperPoint.setValues(globalX, globalY);
    (window['test'] as any) = true;
    let ret: createjs.DisplayObject = this.$uiStage.applicationContext.getObjectUnderPoint(
      GRoot.sHelperPoint.x,
      GRoot.sHelperPoint.y,
      0
    )
    return GObject.castFromNativeObject(ret)
  }

  public showWindow(win: Window): void {
    this.addChild(win)
    win.requestFocus()

    if (win.x > this.width) win.x = this.width - win.width
    else if (win.x + win.width < 0) win.x = 0

    if (win.y > this.height) win.y = this.height - win.height
    else if (win.y + win.height < 0) win.y = 0

    this.adjustModalLayer()
  }

  public hideWindow(win: Window): void {
    win.hide()
  }

  public hideWindowImmediately(win: Window): void {
    if (win.parent == this) this.removeChild(win)

    this.adjustModalLayer()
  }

  public bringToFront(win: Window): void {
    let i: number
    if (this.$modalLayer.parent != null && !win.modal) i = this.getChildIndex(this.$modalLayer) - 1
    else i = this.numChildren - 1

    for (; i >= 0; i--) {
      let g: GObject = this.getChildAt(i)
      if (g == win) return
      if (g instanceof Window) break
    }

    if (i >= 0) this.setChildIndex(win, i)
  }

  public showModalWait(msg: string = null): void {
    if (UIConfig.globalModalWaiting != null) {
      if (this.$modalWaitPane == null) {
        this.$modalWaitPane = UIPackage.createObjectFromURL(UIConfig.globalModalWaiting)
        this.$modalWaitPane.addRelation(this, RelationType.Size)
      }
      this.$modalWaitPane.setSize(this.width, this.height)
      this.addChild(this.$modalWaitPane)
      this.$modalWaitPane.text = msg
    }
  }

  public closeModalWait(): void {
    if (this.$modalWaitPane != null && this.$modalWaitPane.parent != null)
      this.removeChild(this.$modalWaitPane)
  }

  public closeAllExceptModals(): void {
    let arr: GObject[] = this.$children.slice()
    arr.forEach(g => {
      if (g instanceof Window && !(g as Window).modal) g.hide()
    }, this)
  }

  public closeAllWindows(): void {
    let arr: GObject[] = this.$children.slice()
    arr.forEach(g => {
      if (g instanceof Window) g.hide()
    }, this)
  }

  public getTopWindow(): Window {
    let cnt: number = this.numChildren
    for (let i: number = cnt - 1; i >= 0; i--) {
      let g: GObject = this.getChildAt(i)
      if (g instanceof Window) {
        return g as Window
      }
    }

    return null
  }

  public get hasModalWindow(): boolean {
    return this.$modalLayer.parent != null
  }

  public get modalWaiting(): boolean {
    return this.$modalWaitPane && this.$modalWaitPane.inContainer
  }

  public showPopup(
    popup: GObject,
    target: GObject = null,
    dir: PopupDirection = PopupDirection.Auto
  ): void {
    if (this.$popupStack.length > 0) {
      let k: number = this.$popupStack.indexOf(popup)
      if (k != -1) {
        for (let i: number = this.$popupStack.length - 1; i >= k; i--)
          this.removeChild(this.$popupStack.pop())
      }
    }
    this.$popupStack.push(popup)

    this.addChild(popup)
    this.adjustModalLayer()

    let pos: createjs.Point
    let sizeW: number = 0,
      sizeH: number = 0
    if (target) {
      pos = target.localToRoot()
      sizeW = target.width
      sizeH = target.height
    } else pos = this.globalToLocal(GRoot.$gmStatus.mouseX, GRoot.$gmStatus.mouseY)

    let xx: number, yy: number
    xx = pos.x
    if (xx + popup.width > this.width) xx = xx + sizeW - popup.width
    yy = pos.y + sizeH
    if (
      (dir == PopupDirection.Auto && yy + popup.height > this.height) ||
      dir == PopupDirection.Up
    ) {
      yy = pos.y - popup.height - 1
      if (yy < 0) {
        yy = 0
        xx += sizeW * 0.5
      }
    }

    popup.x = xx
    popup.y = yy
  }

  public togglePopup(popup: GObject, target: GObject = null, dir?: PopupDirection): void {
    if (this.$justClosedPopups.indexOf(popup) != -1) return
    this.showPopup(popup, target, dir)
  }

  public hidePopup(popup: GObject = null): void {
    let i: number
    if (popup != null) {
      let k: number = this.$popupStack.indexOf(popup)
      if (k != -1) {
        for (i = this.$popupStack.length - 1; i >= k; i--) this.closePopup(this.$popupStack.pop())
      }
    } else {
      let cnt: number = this.$popupStack.length
      for (i = cnt - 1; i >= 0; i--) this.closePopup(this.$popupStack[i])
      this.$popupStack.length = 0
    }
  }

  public get hasAnyPopup(): boolean {
    return this.$popupStack.length != 0
  }

  private closePopup(target: GObject): void {
    if (target.parent != null) {
      if (target instanceof Window) (target as Window).hide()
      else this.removeChild(target)
    }
  }

  public showTooltips(msg: string): void {
    if (this.$defaultTooltipWin == null) {
      let resourceURL: string = UIConfig.tooltipsWin
      if (!resourceURL) {
        console.error('UIConfig.tooltipsWin not defined')
        return
      }

      this.$defaultTooltipWin = UIPackage.createObjectFromURL(resourceURL)
    }

    this.$defaultTooltipWin.text = msg
    this.showTooltipsWin(this.$defaultTooltipWin)
  }

  public showTooltipsWin(tooltipWin: GObject, position: createjs.Point = null): void {
    this.hideTooltips()

    this.$tooltipWin = tooltipWin

    let xx: number = 0
    let yy: number = 0
    if (position == null) {
      xx = GRoot.$gmStatus.mouseX + 10
      yy = GRoot.$gmStatus.mouseY + 20
    } else {
      xx = position.x
      yy = position.y
    }
    let pt: createjs.Point = this.globalToLocal(xx, yy)
    xx = pt.x
    yy = pt.y

    if (xx + this.$tooltipWin.width > this.width) {
      xx = xx - this.$tooltipWin.width - 1
      if (xx < 0) xx = 10
    }
    if (yy + this.$tooltipWin.height > this.height) {
      yy = yy - this.$tooltipWin.height - 1
      if (xx - this.$tooltipWin.width - 1 > 0) xx = xx - this.$tooltipWin.width - 1
      if (yy < 0) yy = 10
    }

    this.$tooltipWin.x = xx
    this.$tooltipWin.y = yy
    this.addChild(this.$tooltipWin)
  }

  public hideTooltips(): void {
    if (this.$tooltipWin != null) {
      if (this.$tooltipWin.parent) this.removeChild(this.$tooltipWin)
      this.$tooltipWin = null
    }
  }

  public get focus(): GObject {
    if (this.$focusedObject && !this.$focusedObject.onStage) this.$focusedObject = null

    return this.$focusedObject
  }

  public set focus(value: GObject) {
    if (value && (!value.focusable || !value.onStage)) throw new Error('Invalid target to focus')

    this.setFocus(value)
  }

  private setFocus(value: GObject) {
    if (this.$focusedObject != value) {
      this.$focusedObject = value
      let evt = new createjs.Event(FocusEvent.CHANGED, true, false)
      this.dispatchEvent(evt, this)
    }
  }

  public get volumeScale(): number {
    return this.$volumeScale
  }

  public set volumeScale(value: number) {
    this.$volumeScale = value
  }

  public playOneShotSound(sound: createjs.AbstractSoundInstance, volumeScale: number = 1) {
    var vs: number = this.$volumeScale * volumeScale
    sound.play({ volume: vs })
  }

  private adjustModalLayer(): void {
    let cnt: number = this.numChildren

    if (this.$modalWaitPane != null && this.$modalWaitPane.parent != null)
      this.setChildIndex(this.$modalWaitPane, cnt - 1)

    for (let i: number = cnt - 1; i >= 0; i--) {
      let g: GObject = this.getChildAt(i)
      if (g instanceof Window && g.modal) {
        if (this.$modalLayer.parent == null) this.addChildAt(this.$modalLayer, i)
        else this.setChildIndexBefore(this.$modalLayer, i)
        return
      }
    }

    if (this.$modalLayer.parent != null) this.removeChild(this.$modalLayer)
  }

  private $stageDown(evt: any): void {
    // see Drag & Drop
    GRoot.$gmStatus.mouseX = evt.stageX
    GRoot.$gmStatus.mouseY = evt.stageY
    GRoot.$gmStatus.touchDown = true

    //check focus
    let mc: createjs.DisplayObject = evt.target as createjs.DisplayObject
    while (mc && mc != this.nativeStage) {
      if (isUIObject(mc)) {
        let g = mc.UIOwner
        if (g.touchable && g.focusable) {
          this.setFocus(g)
          break
        }
      }
      mc = mc.parent
    }

    if (this.$tooltipWin != null) this.hideTooltips()

    this.checkPopups(evt.target)
  }

  public checkPopups(target: createjs.DisplayObject): void {
    if (this.$checkingPopups) return

    this.$checkingPopups = true

    this.$justClosedPopups.length = 0
    if (this.$popupStack.length > 0) {
      let mc = target
      while (mc && mc != this.nativeStage) {
        if (isUIObject(mc)) {
          let pindex = this.$popupStack.indexOf(mc.UIOwner)
          if (pindex != -1) {
            let popup: GObject
            for (let i = this.$popupStack.length - 1; i > pindex; i--) {
              popup = this.$popupStack.pop()
              this.closePopup(popup)
              this.$justClosedPopups.push(popup)
            }
            return
          }
        }
        mc = mc.parent
      }

      let cnt = this.$popupStack.length
      let popup: GObject
      for (let i = cnt - 1; i >= 0; i--) {
        popup = this.$popupStack[i]
        this.closePopup(popup)
        this.$justClosedPopups.push(popup)
      }
      this.$popupStack.length = 0
    }
  }

  private $stageMove(evt: any): void {
    GRoot.$gmStatus.mouseX = evt.stageX
    GRoot.$gmStatus.mouseY = evt.stageY
  }

  private $stageUp(evt: createjs.Event): void {
    GRoot.$gmStatus.touchDown = false
    this.$checkingPopups = false
  }

  private $click(evt): void {}

  private $winResize(stage: UIStage): void {
    this.setSize(stage.stageWidth, stage.stageHeight)
  }
}

Decls.GRoot = GRoot
