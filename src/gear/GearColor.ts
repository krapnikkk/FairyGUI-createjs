import { GObject } from '../GObject'
import GearBase from './GearBase'
import { IColorGear } from '../interface/IColorGear'
import { StringUtil } from '../utils/StringUtil'

export default class GearColor extends GearBase {
  private $storage: { [key: string]: string }
  private $default: string = '#ffffff'

  public constructor(owner: GObject & IColorGear) {
    super(owner)
  }

  protected init(): void {
    this.$default = this.$owner['color']
    this.$storage = {}
  }

  protected addStatus(pageId: string, value: string): void {
    if (value == '-') return

    let col: string = value
    if (pageId == null) this.$default = col
    else this.$storage[pageId] = col
  }

  public apply(): void {
    this.$owner.$gearLocked = true

    let data: string = this.$storage[this.$controller.selectedPageId]
    if (data != undefined) this.$owner['color'] = StringUtil.HEX2RGB(data)
    else this.$owner['color'] = StringUtil.HEX2RGB(this.$default)

    this.$owner.$gearLocked = false
  }

  public updateState(): void {
    if (this.$controller == null || this.$owner.$gearLocked || this.$owner.$inProgressBuilding)
      return

    this.$storage[this.$controller.selectedPageId] = this.$owner['color']
  }
}
