import { TextStyle } from './createjs/extras/TextStyle'
import { GTextField } from './GTextField'
import { XmlNode } from './utils/XMLParser'
import { TextEvent } from './events/TextEvent'
import { GearType } from './config/Definitions'


export class TextBlock {
  public text: string
  public style: TextStyle
}

//TOOD: impl
export class GRichTextField extends GTextField {
  protected $ubbEnabled: boolean
  protected $textFlow: TextBlock[]

  public set ubbEnabled(value: boolean) {
    if (this.$ubbEnabled != value) {
      this.$ubbEnabled = value
      this.render()
    }
  }

  public get ubbEnabled(): boolean {
    return this.$ubbEnabled
  }

  public setupBeforeAdd(xml: XmlNode): void {
    super.setupBeforeAdd(xml)
    this.$ubbEnabled = xml.attributes.ubb == 'true'
  }

  public constructor() {
    super()

    // this.$textField.interactive = true;
    // this.$textField.interactiveChildren = false;
    this.on(TextEvent.LinkClick, this.$clickLink, this)
  }

  public set textFlow(flow: TextBlock[]) {
    this.$textFlow = flow
    this.render()
  }

  public set text(value: string) {
    this.$text = value
    if (this.$text == null) this.$text = ''
    this.$textField.width = this.width
    // if(this.$ubbEnabled)
    // this.textFlow = StringUtil.parseUBB(this.$text);   //TODO: parser impl
    this.updateGear(GearType.Text)
    this.render()
  }

  private $clickLink(block: TextBlock) {
    let event = new createjs.Event(TextEvent.LinkClick, true, false)
    event.data = block.text
    this.dispatchEvent(event, this)
  }

  public dispose(): void {
    this.off(TextEvent.LinkClick, this.$clickLink)
    super.dispose()
  }
}
