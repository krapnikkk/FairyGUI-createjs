
import { GObject } from '../GObject'
import { IUIObject } from '../interface/IUIObject'

export class UISprite extends createjs.Shape implements IUIObject {
  public UIOwner: GObject

  public constructor(owner?: GObject) {
    super()
    this.UIOwner = owner
    this.mouseEnabled = false;
    // this.interactive = false;
    // this.interactiveChildren = false;
  }
}
