
import { Decls } from './GObject'
import { GTextField } from './GTextField'
import { InputDelegate } from './utils/InputDelegate'
import { XmlNode } from './utils/XMLParser'

export const enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
  EMAIL = 'email',
  TEL = 'tel',
  URL = 'url'
}

export class GTextInput extends GTextField {
  protected $editable: boolean
  protected $util: InputDelegate = null

  /**@internal */
  $isTyping: boolean = false

  public constructor() {
    super()
    this.focusable = true
    this.editable = true //init

    this.type = InputType.TEXT

    this.on('removed', this.removed, this)
    this.on('added', this.added, this)
    this.$util.initialize()
  }

  private $hitArea: createjs.Shape
  protected createDisplayObject(): void {
    super.createDisplayObject()
    this.$hitArea = new createjs.Shape()
    this.$hitArea.graphics.beginFill('#000').drawRect(0, 0, this.$width, this.$height)
    this.$displayObject.hitArea = this.$hitArea
  }

  protected handleSizeChanged(): void {
    super.handleSizeChanged()
    this.$hitArea.graphics.drawRect(0, 0, this.$width, this.$height)
    this.$displayObject.hitArea = this.$hitArea
  }

  private removed(disp: createjs.DisplayObject): void {
    if (this.$util) this.$util.destroy()
  }

  private added(disp: createjs.DisplayObject): void {
    if (this.$util) this.$util.initialize()
  }

  public requestFocus(): void {
    //tab or call actively
    Decls.GRoot.inst.focus = this
    this.$util.$onFocus()
  }

  public get editable(): boolean {
    return this.$editable
  }

  public set editable(v: boolean) {
    if (v != this.$editable) {
      this.$editable = v

      if (this.$editable) {
        if (!this.$util) this.$util = new InputDelegate(this)
        this.$util.initialize()
      } else {
        if (this.$util) this.$util.destroy()
      }

      this.touchable = this.$editable
    }
  }

  private changeToPassText(text: string): string {
    let passText: string = ''
    for (let i: number = 0, num = text.length; i < num; i++) {
      switch (text.charAt(i)) {
        case '\n':
          passText += '\n'
          break
        case '\r':
          break
        default:
          passText += '*'
      }
    }
    return passText
  }

  protected getText(): string {
    return this.$util.text
  }

  protected setText(value: string): void {
    if (value == null) value = ''
    if (this.$text == value) return
    this.$util.text = value
    super.setText(value)
  }

  protected setColor(value: string): void {
    super.setColor(value)
    this.$util.setColor(value)
  }

  public get promptText(): string {
    return this.$util.$getProperty('placeholder')
  }

  public set promptText(v: string) {
    if (v == null) v = ''
    this.$util.$setProperty('placeholder', v)
  }

  public get maxLength(): number {
    return parseInt(this.$util.$getProperty('maxlength')) || 0
  }

  public set maxLength(v: number) {
    this.$util.$setProperty('maxlength', String(v))
  }

  public get restrict(): string {
    return this.$util.$restrict
  }

  public set restrict(v: string) {
    this.$util.$restrict = v
  }

  public get password(): boolean {
    return this.type == InputType.PASSWORD
  }

  public set password(v: boolean) {
    this.type = InputType.PASSWORD
  }

  public get type(): InputType {
    return this.$util.type
  }

  public set type(t: InputType) {
    this.$util.type = t
  }

  public dispose(): void {
    super.dispose()
    this.off('removed', this.removed)
    this.off('added', this.added)
    this.$util.destroy()
    this.$util = null
  }

  protected renderNow(updateBounds: boolean = true): void {
    this.$requireRender = false
    this.$sizeDirty = false
    this.$util.$updateProperties()
    if (this.$isTyping) this.decorateInputbox()
    let origText = this.$text
    if (this.type == InputType.PASSWORD) this.$text = this.changeToPassText(this.$text)
    super.renderNow(updateBounds)
    this.$text = origText
  }

  private decorateInputbox(): void {
    //draw underlines?
  }

  public setupBeforeAdd(xml: XmlNode): void {
    super.setupBeforeAdd(xml)

    //this.promptText = xml.attributes.prompt;  //this will be available once UBB has implemented.
    var str: string = xml.attributes.maxLength
    if (str != null) this.maxLength = parseInt(str)
    str = xml.attributes.restrict
    if (str != null) this.restrict = str
    str = xml.attributes.password
    if (str == 'true') this.password = true
    else {
      str = xml.attributes.keyboardType
      if (str == '4') this.type = InputType.NUMBER
      else if (str == '3') this.type = InputType.URL
      else if (str == '5') this.type = InputType.TEL
      else if (str == '6') this.type = InputType.EMAIL
    }
  }

  /*public setupAfterAdd(xml: XmlNode): void {
        super.setupAfterAdd(xml);
        f (!this.$text && this.promptText) {
            if(this.type != InputType.PASSWORD) {
                this.$textField.text = this.promptText;  //take UBB into account
            }
        }
    }*/
}
