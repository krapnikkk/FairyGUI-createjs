
import { InputElement } from '../display/InputElement'
import { GObject } from '../GObject'
import { GRoot } from '../GRoot'
import { GTextInput, InputType } from '../GTextInput'
import { GTimer } from '../GTimer'
import { FocusEvent } from '../events/FocusEvent'
import { TextEvent } from '../events/TextEvent'
import { InteractiveEvents } from '../config/Definitions'

export class InputDelegate {
  protected $inited: boolean = false
  protected $textField: GTextInput
  protected $input: InputElement
  protected $restrictString: string = null
  protected $restrictRegex: RegExp = null
  protected $type: InputType

  private $focused: boolean = false

  public constructor(tf: GTextInput) {
    this.$textField = tf
    this.$input = new InputElement(tf)
  }

  public initialize(): void {
    if (this.$inited) return

    this.$input.$addToStage()

    this.$input.on('updateText', this.updateText, this)
    this.$input.on(FocusEvent.CHANGED, this.focusHandler, this)
    this.$textField.on(InteractiveEvents.Down, this.textFieldDownHandler, this)
    this.$inited = true
  }

  private textFieldDownHandler(): void {
    this.$onFocus()
  }

  public destroy(): void {
    if (!this.$inited) return

    this.$input.$removeFromStage()

    this.$textField.off(InteractiveEvents.Down, this.textFieldDownHandler)
    GRoot.inst.off(InteractiveEvents.Down, this.onStageDown)

    this.$input.off('updateText', this.updateText)
    this.$input.off(FocusEvent.CHANGED, this.focusHandler)

    this.$inited = false
  }

  public get text(): string {
    return this.$input.text
  }

  public set text(v: string) {
    this.$input.text = v
  }

  public setColor(v: string) {
    return this.$input.setColor(v)
  }

  private updateText(): void {
    let textValue = this.$input.text
    let isChanged: boolean = false
    if (this.$restrictRegex != null) {
      let result: string[] = textValue.match(this.$restrictRegex)
      if (result) textValue = result.join('')
      else textValue = ''
      isChanged = true
    }

    if (isChanged && this.$input.text != textValue) this.$input.text = textValue

    this.$textField.text = this.$input.text
    let evt = new createjs.Event(TextEvent.Change, true, false)
    evt.data = { textField: this.$textField }
    this.$textField.dispatchEvent(evt, this)
  }

  private onStageDown(e: createjs.Event): void {
    let target = GObject.castFromNativeObject(e.currentTarget)
    if (target != this.$textField) this.$input.$hide()
  }

  private focusHandler(evt: createjs.Event): void {
    let { data } = evt
    if (data == 'focus') {
      if (!this.$focused) {
        this.$focused = true
        this.$textField.$isTyping = true
        this.$textField.alpha = 0.01
        this.$textField.dispatchEvent(FocusEvent.CHANGED, 'focus')
        this.$textField.dispatchEvent(TextEvent.FocusIn, this.$textField)
      }
    } else if (data == 'blur') {
      if (this.$focused) {
        this.$focused = false
        GRoot.inst.off(InteractiveEvents.Down, this.onStageDown)
        this.$textField.$isTyping = false
        this.$textField.alpha = 1
        this.$input.$onBlur()
        this.$textField.dispatchEvent(FocusEvent.CHANGED, 'blur')
        this.$textField.dispatchEvent(TextEvent.FocusOut, this.$textField)
      }
    }
  }

  public get isFocused(): boolean {
    return this.$focused
  }

  /**@internal */
  $getProperty(name: string): string {
    return (this.$inited && this.$input.getAttribute(name)) || null
  }

  /**@internal */
  $setProperty(name: string, value: string): void {
    if (!this.$inited) return
    this.$input.setAttribute(name, value)
  }

  get $restrict(): string {
    return this.$restrictString
  }

  set $restrict(v: string) {
    this.$restrictString = v
    if (this.$restrictString != null && this.$restrictString.length > 0)
      this.$restrictRegex = new RegExp(this.$restrictString)
    else this.$restrictRegex = null
  }

  public get type(): InputType {
    return this.$type
  }

  public set type(v: InputType) {
    if (v != this.$type) this.$type = v
  }

  private tryHideInput(): void {
    if (!this.$textField.visible && this.$input) this.$input.$removeFromStage()
  }

  /**@internal */
  $updateProperties(): void {
    if (this.isFocused) {
      this.$input.resetInput()
      this.tryHideInput()
      return
    }

    this.$input.text = this.$textField.text
    this.$input.resetInput()
    this.tryHideInput()
  }

  /**@internal */
  $onFocus(): void {
    if (!this.$textField.visible || this.$focused) return

    GRoot.inst.off(InteractiveEvents.Down, this.onStageDown)
    GTimer.inst.callLater(() => {
      GRoot.inst.on(InteractiveEvents.Down, this.onStageDown, this)
    }, this)

    this.$input.$show()
  }
}
