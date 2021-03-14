import isMobileCall from 'ismobilejs';

class UIContainer extends createjs.Container {
    constructor(owner) {
        super();
        this.UIOwner = owner;
        this.mouseEnabled = true;
        this.mouseChildren = true;
    }
    get scrollRect() {
        return this.$scrollRect;
    }
    set scrollRect(rect) {
        this.$scrollRect = rect;
        if (rect != null) {
            if (!this.$rectMask) {
                this.$rectMask = new createjs.Graphics();
                var shape = new createjs.Shape(this.$rectMask);
                this.mask = shape;
            }
            this.$rectMask.clear();
            if (rect.width > 0 && rect.height > 0) {
                this.$rectMask.beginFill('#000');
                this.$rectMask.drawRect(this.$scrollRect.x, this.$scrollRect.y, this.$scrollRect.width, this.$scrollRect.height);
                this.$rectMask.endFill();
            }
        }
        else
            this.mask = null;
    }
}

class InteractiveEvents {
}
InteractiveEvents.Down = createjs.Touch.isSupported() ? 'mousedown' : 'mousedown';
InteractiveEvents.Cancel = createjs.Touch.isSupported() ? 'mousecancel' : 'mousecancel';
InteractiveEvents.Up = createjs.Touch.isSupported() ? 'stagemouseup' : 'stagemouseup';
InteractiveEvents.Click = createjs.Touch.isSupported() ? 'click' : 'click';
InteractiveEvents.UpOutside = createjs.Touch.isSupported()
    ? 'mouseupoutside'
    : 'mouseupoutside';
InteractiveEvents.Move = createjs.Touch.isSupported() ? 'stagemousemove' : 'stagemousemove';
InteractiveEvents.Over = createjs.Touch.isSupported() ? 'mouseover' : 'mouseover';
InteractiveEvents.Out = createjs.Touch.isSupported() ? 'mouseout' : 'mouseout';
//mouse only
InteractiveEvents.RightDown = 'rightdown';
InteractiveEvents.RightUp = 'rightup';
InteractiveEvents.RightClick = 'rightclick';
InteractiveEvents.RightUpOutside = 'rightupoutside';
let GearXMLNodeNameMap = {
    gearDisplay: 0,
    gearXY: 1,
    gearSize: 2,
    gearLook: 3,
    gearColor: 4,
    gearAni: 5,
    gearText: 6,
    gearIcon: 7
};
let BlendModeMap = [
    'Normal',
    'Add',
    'Multiply',
    'Screen',
    'Overlay',
    'Darken',
    'Lighten',
    'ColorDodge',
    'ColorBurn',
    'HardLight',
    'SoftLight',
    'Difference',
    'Exclusion',
    'Hue',
    'Saturation',
    'Color',
    'Luminosity',
    'NormalNPM',
    'AddNPM',
    'ScreenNPM' //  SCREEN_NPM
];
function ParseOverflowType(value) {
    switch (value) {
        case 'visible':
            return 0 /* Visible */;
        case 'hidden':
            return 1 /* Hidden */;
        case 'scroll':
            return 2 /* Scroll */;
        case 'scale':
            return 3 /* Scale */;
        case 'scaleFree':
            return 4 /* ScaleFree */;
        default:
            return 0 /* Visible */;
    }
}
function ParseScrollType(value) {
    switch (value) {
        case 'horizontal':
            return 0 /* Horizontal */;
        case 'vertical':
            return 1 /* Vertical */;
        case 'both':
            return 2 /* Both */;
        default:
            return 1 /* Vertical */;
    }
}
function ParseLoaderFillType(value) {
    switch (value) {
        case 'none':
            return 0 /* None */;
        case 'scale':
            return 1 /* Scale */;
        case 'scaleMatchHeight':
            return 2 /* ScaleMatchHeight */;
        case 'scaleMatchWidth':
            return 3 /* ScaleMatchWidth */;
        case 'scaleFree':
            return 4 /* ScaleFree */;
        case 'scaleNoBorder':
            return 5 /* ScaleNoBorder */;
        default:
            return 0 /* None */;
    }
}
function ParseListLayoutType(value) {
    switch (value) {
        case 'column':
            return 0 /* SingleColumn */;
        case 'row':
            return 1 /* SingleRow */;
        case 'flow_hz':
            return 2 /* FlowHorizontal */;
        case 'flow_vt':
            return 3 /* FlowVertical */;
        case 'pagination':
            return 4 /* Pagination */;
        default:
            return 0 /* SingleColumn */;
    }
}
function ParseListSelectionMode(value) {
    switch (value) {
        case 'single':
            return 0 /* Single */;
        case 'multiple':
            return 1 /* Multiple */;
        case 'multipleSingleClick':
            return 2 /* Multiple_SingleClick */;
        case 'none':
            return 3 /* None */;
        default:
            return 0 /* Single */;
    }
}
function ParsePackageItemType(value) {
    switch (value) {
        case 'image':
            return 0 /* Image */;
        case 'movieclip':
            return 2 /* MovieClip */;
        case 'sound':
            return 3 /* Sound */;
        case 'component':
            return 4 /* Component */;
        case 'swf':
            return 1 /* Swf */;
        case 'font':
            return 6 /* Font */;
        case 'atlas':
            return 7 /* Atlas */;
        default:
            return 5 /* Misc */;
    }
}
function ParseProgressTitleType(value) {
    switch (value) {
        case 'percent':
            return 0 /* Percent */;
        case 'valueAndmax':
            return 1 /* ValueAndMax */;
        case 'value':
            return 2 /* Value */;
        case 'max':
            return 3 /* Max */;
        default:
            return 0 /* Percent */;
    }
}
function ParseScrollBarDisplayType(value) {
    switch (value) {
        case 'default':
            return 0 /* Default */;
        case 'visible':
            return 1 /* Visible */;
        case 'auto':
            return 2 /* Auto */;
        case 'hidden':
            return 3 /* Hidden */;
        default:
            return 0 /* Default */;
    }
}
function ParseFlipType(value) {
    switch (value) {
        case 'hz':
            return 1 /* Horizontal */;
        case 'vt':
            return 2 /* Vertical */;
        case 'both':
            return 3 /* Both */;
        default:
            return 0 /* None */;
    }
}
function ParseButtonMode(value) {
    switch (value) {
        case 'Common':
            return 0 /* Common */;
        case 'Check':
            return 1 /* Check */;
        case 'Radio':
            return 2 /* Radio */;
        default:
            return 0 /* Common */;
    }
}
function ParseAutoSizeType(value) {
    switch (value) {
        case 'none':
            return 0 /* None */;
        case 'both':
            return 1 /* Both */;
        case 'height':
            return 2 /* Height */;
        case 'shrink':
            return 3 /* Shrink */;
        default:
            return 0 /* None */;
    }
}
function ParseAlignType(value) {
    switch (value) {
        case 'left':
            return "left" /* Left */;
        case 'center':
            return "center" /* Center */;
        case 'right':
            return "right" /* Right */;
        default:
            return "left" /* Left */;
    }
}
function ParseVertAlignType(value) {
    switch (value) {
        case 'top':
            return 0 /* Top */;
        case 'middle':
            return 1 /* Middle */;
        case 'bottom':
            return 2 /* Bottom */;
        default:
            return 0 /* Top */;
    }
}
function ParseListChildrenRenderOrder(value) {
    switch (value) {
        case 'ascent':
            return 0 /* Ascent */;
        case 'descent':
            return 1 /* Descent */;
        case 'arch':
            return 2 /* Arch */;
        default:
            return 0 /* Ascent */;
    }
}
let easeMap = {
    Linear: createjs.Ease.linear,
    'Elastic.In': createjs.Ease.elasticIn,
    'Elastic.Out': createjs.Ease.elasticOut,
    'Elastic.InOut': createjs.Ease.elasticInOut,
    'Quad.In': createjs.Ease.quadIn,
    'Quad.Out': createjs.Ease.quadOut,
    'Quad.InOut': createjs.Ease.quadInOut,
    'Cube.In': createjs.Ease.cubicIn,
    'Cube.Out': createjs.Ease.cubicOut,
    'Cube.InOut': createjs.Ease.cubicInOut,
    'Quart.In': createjs.Ease.quartIn,
    'Quart.Out': createjs.Ease.quartOut,
    'Quart.InOut': createjs.Ease.quartInOut,
    'Quint.In': createjs.Ease.quintIn,
    'Quint.Out': createjs.Ease.quintOut,
    'Quint.InOut': createjs.Ease.quintInOut,
    'Sine.In': createjs.Ease.sineIn,
    'Sine.Out': createjs.Ease.sineOut,
    'Sine.InOut': createjs.Ease.sineInOut,
    'Bounce.In': createjs.Ease.bounceIn,
    'Bounce.Out': createjs.Ease.bounceOut,
    'Bounce.InOut': createjs.Ease.bounceInOut,
    'Circ.In': createjs.Ease.circIn,
    'Circ.Out': createjs.Ease.circOut,
    'Circ.InOut': createjs.Ease.circInOut,
    'Expo.In': createjs.Ease.quartIn,
    'Expo.Out': createjs.Ease.quartOut,
    'Expo.InOut': createjs.Ease.quartInOut,
    'Back.In': createjs.Ease.backIn,
    'Back.Out': createjs.Ease.backOut,
    'Back.InOut': createjs.Ease.backInOut
};
function ParseEaseType(name) {
    return easeMap[name] || easeMap['Linear'];
}

/**global ui configuration */
class UIConfig {
}
/**default font name of your project. */
UIConfig.defaultFont = "Arial";
/** modal layer background configuration. */
UIConfig.modalLayerColor = "#333333";
UIConfig.modalLayerAlpha = 0.2;
UIConfig.buttonSoundVolumeScale = 1;
/** scrolling distance per action in pixel*/
UIConfig.defaultScrollSpeed = 25;
/** default scrollbar display mode. It's recommended to set ScrollBarDisplayType.Visible for Desktop environment and ScrollBarDisplayType.Auto for mobile environment.*/
UIConfig.defaultScrollBarDisplay = 1 /* Visible */;
/** allow user to drag the content of a container. Set to true for mobile is recommended.*/
UIConfig.defaultScrollTouchEffect = true;
/** enable bounce effect when the scrolling reaches to the edge of a container. Set to true for mobile is recommended.*/
UIConfig.defaultScrollBounceEffect = true;
/** Deceleration ratio of scrollpane when its in touch dragging.*/
UIConfig.defaultScrollDecelerationRate = .967;
/** maximum count of items to be displayed in the visible viewport of the GCombobox.*/
UIConfig.defaultComboBoxVisibleItemCount = 10;
/** the finger moving threshold in pixel to trigger the scrolling action.*/
UIConfig.touchScrollSensitivity = 20;
/** the finger moving threshold in pixel to trigger the dragging event.*/
UIConfig.touchDragSensitivity = 10;
/** auto bring the window you clicked to the topmost level of the GRoot children list.*/
UIConfig.bringWindowToFrontOnClick = true;

class GearBase {
    constructor(owner) {
        this.$lockToken = 0;
        this.$owner = owner;
        this.$easeType = ParseEaseType('Quad.Out');
        this.$tweenTime = 0.3;
        this.$tweenDelay = 0;
    }
    get controller() {
        return this.$controller;
    }
    set controller(val) {
        if (val != this.$controller) {
            this.$controller = val;
            if (this.$controller)
                this.init();
        }
    }
    get tween() {
        return this.$tween;
    }
    set tween(val) {
        this.$tween = val;
    }
    get tweenDelay() {
        return this.$tweenDelay;
    }
    set tweenDelay(val) {
        this.$tweenDelay = val;
    }
    get tweenTime() {
        return this.$tweenTime;
    }
    set tweenTime(value) {
        this.$tweenTime = value;
    }
    get easeType() {
        return this.$easeType;
    }
    set easeType(value) {
        this.$easeType = value;
    }
    setup(xml) {
        this.$controller = this.$owner.parent.getController(xml.attributes.controller);
        if (this.$controller == null)
            return;
        this.init();
        let str;
        str = xml.attributes.tween;
        if (str)
            this.$tween = true;
        str = xml.attributes.ease;
        if (str)
            this.$easeType = ParseEaseType(str);
        str = xml.attributes.duration;
        if (str)
            this.$tweenTime = parseFloat(str);
        str = xml.attributes.delay;
        if (str)
            this.$tweenDelay = parseFloat(str);
        if (this['$vid'] != null) {
            str = xml.attributes.pages;
            if (str)
                this['pages'] = str.split(',');
        }
        else {
            let pages;
            let values;
            str = xml.attributes.pages;
            if (str)
                pages = str.split(',');
            str = xml.attributes.values;
            if (str)
                values = str.split('|');
            if (pages && values) {
                values.forEach((s, i) => {
                    this.addStatus(pages[i], s);
                });
            }
            str = xml.attributes.default;
            if (str)
                this.addStatus(null, str);
        }
    }
    updateFromRelations(dx, dy) { }
    addStatus(pageId, value) { }
    init() { }
    apply() { }
    updateState() { }
}
GearBase.disableAllTweenEffect = false;

class GearDisplay extends GearBase {
    constructor(owner) {
        super(owner);
        this.$vid = 0;
        this.$lockToken = 1;
    }
    init() {
        this.pages = null;
    }
    lock() {
        this.$vid++;
        return this.$lockToken;
    }
    release(token) {
        if (token == this.$lockToken)
            this.$vid--;
    }
    get connected() {
        return this.controller == null || this.$vid > 0;
    }
    apply() {
        this.$lockToken++;
        if (this.$lockToken <= 0)
            this.$lockToken = 1;
        if (this.pages == null ||
            this.pages.length == 0 ||
            this.pages.indexOf(this.$controller.selectedPageId) != -1)
            this.$vid = 1;
        else
            this.$vid = 0;
    }
}

class BMGlyph {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.width = 0;
        this.height = 0;
        this.advance = 0;
        this.lineHeight = 0;
        this.channel = 0;
    }
}
class BitmapFont {
    constructor() {
        this.size = 0;
        this.glyphs = {};
    }
}

class Frame {
    constructor() {
        this.addDelay = 0;
    }
}

class AssetLoader extends createjs.LoadQueue {
    constructor(preferXHR, basePath, crossOrigin) {
        super(preferXHR, basePath);
        this.on('complete', this._onComplete, this);
    }
    _onComplete(event) {
        var loader = event.target;
        var result = loader["_loadedResults"];
        AssetLoader.addResources(result);
    }
    ;
    static get resourcesPool() {
        return AssetLoader.$resources;
    }
    static destroyResource(key) {
        let res = AssetLoader.$resources[key];
        if (res) {
            delete AssetLoader.$resources[key];
        }
    }
    static addResources(res) {
        if (!res)
            return;
        for (let key in res) //override the item which has same key name
            AssetLoader.$resources[key] = res[key];
    }
}
AssetLoader.$resources = {};

class Endian {
}
Endian.LITTLE_ENDIAN = "littleEndian";
Endian.BIG_ENDIAN = "bigEndian";
class ByteArray {
    constructor(buffer, bufferExtSize = 0) {
        this.bufferExtSize = 0; //Buffer expansion size
        this.EOF_byte = -1;
        this.EOF_code_point = -1;
        if (bufferExtSize < 0) {
            bufferExtSize = 0;
        }
        this.bufferExtSize = bufferExtSize;
        let bytes, wpos = 0;
        if (buffer) { //有数据，则可写字节数从字节尾开始
            let uint8;
            if (buffer instanceof Uint8Array) {
                uint8 = buffer;
                wpos = buffer.length;
            }
            else {
                wpos = buffer.byteLength;
                uint8 = new Uint8Array(buffer);
            }
            if (bufferExtSize == 0) {
                bytes = new Uint8Array(wpos);
            }
            else {
                let multi = (wpos / bufferExtSize | 0) + 1;
                bytes = new Uint8Array(multi * bufferExtSize);
            }
            bytes.set(uint8);
        }
        else {
            bytes = new Uint8Array(bufferExtSize);
        }
        this.write_position = wpos;
        this._position = 0;
        this._bytes = bytes;
        this.data = new DataView(bytes.buffer);
        this.endian = Endian.BIG_ENDIAN;
    }
    get endian() {
        return this.$endian == 0 /* LITTLE_ENDIAN */ ? Endian.LITTLE_ENDIAN : Endian.BIG_ENDIAN;
    }
    set endian(value) {
        this.$endian = value == Endian.LITTLE_ENDIAN ? 0 /* LITTLE_ENDIAN */ : 1 /* BIG_ENDIAN */;
    }
    get readAvailable() {
        return this.write_position - this._position;
    }
    get buffer() {
        return this.data.buffer.slice(0, this.write_position);
    }
    get rawBuffer() {
        return this.data.buffer;
    }
    set buffer(value) {
        let wpos = value.byteLength;
        let uint8 = new Uint8Array(value);
        let bufferExtSize = this.bufferExtSize;
        let bytes;
        if (bufferExtSize == 0) {
            bytes = new Uint8Array(wpos);
        }
        else {
            let multi = (wpos / bufferExtSize | 0) + 1;
            bytes = new Uint8Array(multi * bufferExtSize);
        }
        bytes.set(uint8);
        this.write_position = wpos;
        this._bytes = bytes;
        this.data = new DataView(bytes.buffer);
    }
    get bytes() {
        return this._bytes;
    }
    get dataView() {
        return this.data;
    }
    set dataView(value) {
        this.buffer = value.buffer;
    }
    get bufferOffset() {
        return this.data.byteOffset;
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        if (value > this.write_position) {
            this.write_position = value;
        }
    }
    get length() {
        return this.write_position;
    }
    set length(value) {
        this.write_position = value;
        if (this.data.byteLength > value) {
            this._position = value;
        }
        this._validateBuffer(value);
    }
    _validateBuffer(value) {
        if (this.data.byteLength < value) {
            let be = this.bufferExtSize;
            let tmp;
            if (be == 0) {
                tmp = new Uint8Array(value);
            }
            else {
                let nLen = ((value / be >> 0) + 1) * be;
                tmp = new Uint8Array(nLen);
            }
            tmp.set(this._bytes);
            this._bytes = tmp;
            this.data = new DataView(tmp.buffer);
        }
    }
    get bytesAvailable() {
        return this.data.byteLength - this._position;
    }
    clear() {
        let buffer = new ArrayBuffer(this.bufferExtSize);
        this.data = new DataView(buffer);
        this._bytes = new Uint8Array(buffer);
        this._position = 0;
        this.write_position = 0;
    }
    readBoolean() {
        if (this.validate(1 /* SIZE_OF_BOOLEAN */))
            return !!this._bytes[this.position++];
    }
    readByte() {
        if (this.validate(1 /* SIZE_OF_INT8 */))
            return this.data.getInt8(this.position++);
    }
    readBytes(bytes, offset = 0, length = 0) {
        if (!bytes) { //由于bytes不返回，所以new新的无意义
            return;
        }
        let pos = this._position;
        let available = this.write_position - pos;
        if (available < 0) {
            // egret.$error(1025);
            return;
        }
        if (length == 0) {
            length = available;
        }
        else if (length > available) {
            // egret.$error(1025);
            return;
        }
        const position = bytes._position;
        bytes._position = 0;
        bytes.validateBuffer(offset + length);
        bytes._position = position;
        bytes._bytes.set(this._bytes.subarray(pos, pos + length), offset);
        this.position += length;
    }
    readDouble() {
        if (this.validate(8 /* SIZE_OF_FLOAT64 */)) {
            let value = this.data.getFloat64(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 8 /* SIZE_OF_FLOAT64 */;
            return value;
        }
    }
    readFloat() {
        if (this.validate(4 /* SIZE_OF_FLOAT32 */)) {
            let value = this.data.getFloat32(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 4 /* SIZE_OF_FLOAT32 */;
            return value;
        }
    }
    readInt() {
        if (this.validate(4 /* SIZE_OF_INT32 */)) {
            let value = this.data.getInt32(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 4 /* SIZE_OF_INT32 */;
            return value;
        }
    }
    readShort() {
        if (this.validate(2 /* SIZE_OF_INT16 */)) {
            let value = this.data.getInt16(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 2 /* SIZE_OF_INT16 */;
            return value;
        }
    }
    readUnsignedByte() {
        if (this.validate(1 /* SIZE_OF_UINT8 */))
            return this._bytes[this.position++];
    }
    readUnsignedInt() {
        if (this.validate(4 /* SIZE_OF_UINT32 */)) {
            let value = this.data.getUint32(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 4 /* SIZE_OF_UINT32 */;
            return value;
        }
    }
    readUnsignedShort() {
        if (this.validate(2 /* SIZE_OF_UINT16 */)) {
            let value = this.data.getUint16(this._position, this.$endian == 0 /* LITTLE_ENDIAN */);
            this.position += 2 /* SIZE_OF_UINT16 */;
            return value;
        }
    }
    readUTF() {
        let length = this.readUnsignedShort();
        if (length > 0) {
            return this.readUTFBytes(length);
        }
        else {
            return "";
        }
    }
    readUTFBytes(length) {
        if (!this.validate(length)) {
            return;
        }
        let data = this.data;
        let bytes = new Uint8Array(data.buffer, data.byteOffset + this._position, length);
        this.position += length;
        return this.decodeUTF8(bytes);
    }
    writeBoolean(value) {
        this.validateBuffer(1 /* SIZE_OF_BOOLEAN */);
        this._bytes[this.position++] = +value;
    }
    writeByte(value) {
        this.validateBuffer(1 /* SIZE_OF_INT8 */);
        this._bytes[this.position++] = value & 0xff;
    }
    writeBytes(bytes, offset = 0, length = 0) {
        let writeLength;
        if (offset < 0) {
            return;
        }
        if (length < 0) {
            return;
        }
        else if (length == 0) {
            writeLength = bytes.length - offset;
        }
        else {
            writeLength = Math.min(bytes.length - offset, length);
        }
        if (writeLength > 0) {
            this.validateBuffer(writeLength);
            this._bytes.set(bytes._bytes.subarray(offset, offset + writeLength), this._position);
            this.position = this._position + writeLength;
        }
    }
    writeDouble(value) {
        this.validateBuffer(8 /* SIZE_OF_FLOAT64 */);
        this.data.setFloat64(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
        this.position += 8 /* SIZE_OF_FLOAT64 */;
    }
    writeFloat(value) {
        this.validateBuffer(4 /* SIZE_OF_FLOAT32 */);
        this.data.setFloat32(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
        this.position += 4 /* SIZE_OF_FLOAT32 */;
    }
    writeInt(value) {
        this.validateBuffer(4 /* SIZE_OF_INT32 */);
        this.data.setInt32(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
        this.position += 4 /* SIZE_OF_INT32 */;
    }
    writeShort(value) {
        this.validateBuffer(2 /* SIZE_OF_INT16 */);
        this.data.setInt16(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
        this.position += 2 /* SIZE_OF_INT16 */;
    }
    writeUnsignedInt(value) {
        this.validateBuffer(4 /* SIZE_OF_UINT32 */);
        this.data.setUint32(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
        this.position += 4 /* SIZE_OF_UINT32 */;
    }
    writeUnsignedShort(value) {
        this.validateBuffer(2 /* SIZE_OF_UINT16 */);
        this.data.setUint16(this._position, value, this.$endian == 0 /* LITTLE_ENDIAN */);
        this.position += 2 /* SIZE_OF_UINT16 */;
    }
    writeUTF(value) {
        let utf8bytes = this.encodeUTF8(value);
        let length = utf8bytes.length;
        this.validateBuffer(2 /* SIZE_OF_UINT16 */ + length);
        this.data.setUint16(this._position, length, this.$endian == 0 /* LITTLE_ENDIAN */);
        this.position += 2 /* SIZE_OF_UINT16 */;
        this._writeUint8Array(utf8bytes, false);
    }
    writeUTFBytes(value) {
        this._writeUint8Array(this.encodeUTF8(value));
    }
    toString() {
        return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable;
    }
    _writeUint8Array(bytes, validateBuffer = true) {
        let pos = this._position;
        let npos = pos + bytes.length;
        if (validateBuffer) {
            this.validateBuffer(npos);
        }
        this.bytes.set(bytes, pos);
        this.position = npos;
    }
    validate(len) {
        let bl = this._bytes.length;
        if (bl > 0 && this._position + len <= bl) {
            return true;
        }
    }
    /*  PRIVATE METHODS   */
    validateBuffer(len) {
        this.write_position = len > this.write_position ? len : this.write_position;
        len += this._position;
        this._validateBuffer(len);
    }
    encodeUTF8(str) {
        let pos = 0;
        let codePoints = this.stringToCodePoints(str);
        let outputBytes = [];
        while (codePoints.length > pos) {
            let code_point = codePoints[pos++];
            if (this.inRange(code_point, 0xD800, 0xDFFF)) {
                this.encoderError(code_point);
            }
            else if (this.inRange(code_point, 0x0000, 0x007f)) {
                outputBytes.push(code_point);
            }
            else {
                let count, offset;
                if (this.inRange(code_point, 0x0080, 0x07FF)) {
                    count = 1;
                    offset = 0xC0;
                }
                else if (this.inRange(code_point, 0x0800, 0xFFFF)) {
                    count = 2;
                    offset = 0xE0;
                }
                else if (this.inRange(code_point, 0x10000, 0x10FFFF)) {
                    count = 3;
                    offset = 0xF0;
                }
                outputBytes.push(this.div(code_point, Math.pow(64, count)) + offset);
                while (count > 0) {
                    let temp = this.div(code_point, Math.pow(64, count - 1));
                    outputBytes.push(0x80 + (temp % 64));
                    count -= 1;
                }
            }
        }
        return new Uint8Array(outputBytes);
    }
    decodeUTF8(data) {
        let fatal = false;
        let pos = 0;
        let result = "";
        let code_point;
        let utf8_code_point = 0;
        let utf8_bytes_needed = 0;
        let utf8_bytes_seen = 0;
        let utf8_lower_boundary = 0;
        while (data.length > pos) {
            let _byte = data[pos++];
            if (_byte == this.EOF_byte) {
                if (utf8_bytes_needed != 0) {
                    code_point = this.decoderError(fatal);
                }
                else {
                    code_point = this.EOF_code_point;
                }
            }
            else {
                if (utf8_bytes_needed == 0) {
                    if (this.inRange(_byte, 0x00, 0x7F)) {
                        code_point = _byte;
                    }
                    else {
                        if (this.inRange(_byte, 0xC2, 0xDF)) {
                            utf8_bytes_needed = 1;
                            utf8_lower_boundary = 0x80;
                            utf8_code_point = _byte - 0xC0;
                        }
                        else if (this.inRange(_byte, 0xE0, 0xEF)) {
                            utf8_bytes_needed = 2;
                            utf8_lower_boundary = 0x800;
                            utf8_code_point = _byte - 0xE0;
                        }
                        else if (this.inRange(_byte, 0xF0, 0xF4)) {
                            utf8_bytes_needed = 3;
                            utf8_lower_boundary = 0x10000;
                            utf8_code_point = _byte - 0xF0;
                        }
                        else {
                            this.decoderError(fatal);
                        }
                        utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                        code_point = null;
                    }
                }
                else if (!this.inRange(_byte, 0x80, 0xBF)) {
                    utf8_code_point = 0;
                    utf8_bytes_needed = 0;
                    utf8_bytes_seen = 0;
                    utf8_lower_boundary = 0;
                    pos--;
                    code_point = this.decoderError(fatal, _byte);
                }
                else {
                    utf8_bytes_seen += 1;
                    utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                    if (utf8_bytes_seen !== utf8_bytes_needed) {
                        code_point = null;
                    }
                    else {
                        let cp = utf8_code_point;
                        let lower_boundary = utf8_lower_boundary;
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        if (this.inRange(cp, lower_boundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
                            code_point = cp;
                        }
                        else {
                            code_point = this.decoderError(fatal, _byte);
                        }
                    }
                }
            }
            //Decode string
            if (code_point !== null && code_point !== this.EOF_code_point) {
                if (code_point <= 0xFFFF) {
                    if (code_point > 0)
                        result += String.fromCharCode(code_point);
                }
                else {
                    code_point -= 0x10000;
                    result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                    result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                }
            }
        }
        return result;
    }
    encoderError(code_point) {
        // egret.$error(1026, code_point);
    }
    decoderError(fatal, opt_code_point) {
        return opt_code_point || 0xFFFD;
    }
    inRange(a, min, max) {
        return min <= a && a <= max;
    }
    div(n, d) {
        return Math.floor(n / d);
    }
    stringToCodePoints(string) {
        let cps = [];
        // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
        let i = 0, n = string.length;
        while (i < string.length) {
            let c = string.charCodeAt(i);
            if (!this.inRange(c, 0xD800, 0xDFFF)) {
                cps.push(c);
            }
            else if (this.inRange(c, 0xDC00, 0xDFFF)) {
                cps.push(0xFFFD);
            }
            else { // (inRange(c, 0xD800, 0xDBFF))
                if (i == n - 1) {
                    cps.push(0xFFFD);
                }
                else {
                    let d = string.charCodeAt(i + 1);
                    if (this.inRange(d, 0xDC00, 0xDFFF)) {
                        let a = c & 0x3FF;
                        let b = d & 0x3FF;
                        i += 1;
                        cps.push(0x10000 + (a << 10) + b);
                    }
                    else {
                        cps.push(0xFFFD);
                    }
                }
            }
            i += 1;
        }
        return cps;
    }
}

class RawByte {
    static inRange(a, min, max) {
        return min <= a && a <= max;
    }
    static decodeUTF8(data) {
        let pos = 0;
        let result = "";
        let code_point;
        let utf8_code_point = 0;
        let utf8_bytes_needed = 0;
        let utf8_bytes_seen = 0;
        let utf8_lower_boundary = 0;
        while (data.length > pos) {
            let _byte = data[pos++];
            if (_byte == -1 /* EOF_byte */) {
                if (utf8_bytes_needed != 0) {
                    code_point = 65533 /* Fatal_code_point */;
                }
                else {
                    code_point = -1 /* EOF_code_point */;
                }
            }
            else {
                if (utf8_bytes_needed == 0) {
                    if (RawByte.inRange(_byte, 0x00, 0x7F)) {
                        code_point = _byte;
                    }
                    else {
                        if (RawByte.inRange(_byte, 0xC2, 0xDF)) {
                            utf8_bytes_needed = 1;
                            utf8_lower_boundary = 0x80;
                            utf8_code_point = _byte - 0xC0;
                        }
                        else if (RawByte.inRange(_byte, 0xE0, 0xEF)) {
                            utf8_bytes_needed = 2;
                            utf8_lower_boundary = 0x800;
                            utf8_code_point = _byte - 0xE0;
                        }
                        else if (RawByte.inRange(_byte, 0xF0, 0xF4)) {
                            utf8_bytes_needed = 3;
                            utf8_lower_boundary = 0x10000;
                            utf8_code_point = _byte - 0xF0;
                        }
                        else {
                            throw new Error("failed to decode the raw binary data");
                        }
                        utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                        code_point = null;
                    }
                }
                else if (!RawByte.inRange(_byte, 0x80, 0xBF)) {
                    utf8_code_point = 0;
                    utf8_bytes_needed = 0;
                    utf8_bytes_seen = 0;
                    utf8_lower_boundary = 0;
                    pos--;
                    code_point = 65533 /* Fatal_code_point */;
                }
                else {
                    utf8_bytes_seen += 1;
                    utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                    if (utf8_bytes_seen !== utf8_bytes_needed) {
                        code_point = null;
                    }
                    else {
                        let cp = utf8_code_point;
                        let lower_boundary = utf8_lower_boundary;
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        if (RawByte.inRange(cp, lower_boundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
                            code_point = cp;
                        }
                        else {
                            code_point = _byte;
                        }
                    }
                }
            }
            //Decode string
            if (code_point !== null && code_point !== -1 /* EOF_code_point */) {
                if (code_point <= 0xFFFF) {
                    if (code_point > 0)
                        result += String.fromCharCode(code_point);
                }
                else {
                    code_point -= 0x10000;
                    result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                    result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                }
            }
        }
        return result;
    }
}

var BufferType;
(function (BufferType) {
    BufferType[BufferType["BLOCK"] = 0] = "BLOCK";
    BufferType[BufferType["ADAPTIVE"] = 1] = "ADAPTIVE";
})(BufferType || (BufferType = {}));
/** @define {number} buffer block size. */
const ZLIB_RAW_INFLATE_BUFFER_SIZE = 0x8000; // [ 0x8000 >= ZLIB_BUFFER_BLOCK_SIZE ]
const MaxBackwardLength = 32768;
const MaxCopyLength = 258;
const Order = new Uint16Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
const LengthCodeTable = new Uint16Array([
    0x0003, 0x0004, 0x0005, 0x0006, 0x0007, 0x0008, 0x0009, 0x000a, 0x000b,
    0x000d, 0x000f, 0x0011, 0x0013, 0x0017, 0x001b, 0x001f, 0x0023, 0x002b,
    0x0033, 0x003b, 0x0043, 0x0053, 0x0063, 0x0073, 0x0083, 0x00a3, 0x00c3,
    0x00e3, 0x0102, 0x0102, 0x0102
]);
const LengthExtraTable = new Uint8Array([
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5,
    5, 5, 0, 0, 0
]);
const DistCodeTable = new Uint16Array([
    0x0001, 0x0002, 0x0003, 0x0004, 0x0005, 0x0007, 0x0009, 0x000d, 0x0011,
    0x0019, 0x0021, 0x0031, 0x0041, 0x0061, 0x0081, 0x00c1, 0x0101, 0x0181,
    0x0201, 0x0301, 0x0401, 0x0601, 0x0801, 0x0c01, 0x1001, 0x1801, 0x2001,
    0x3001, 0x4001, 0x6001
]);
const DistExtraTable = new Uint8Array([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11,
    11, 12, 12, 13, 13
]);
const buildHuffmanTable = (lengths) => {
    /** @type {number} length list size. */
    var listSize = lengths.length;
    /** @type {number} max code length for table size. */
    var maxCodeLength = 0;
    /** @type {number} min code length for table size. */
    var minCodeLength = Number.POSITIVE_INFINITY;
    /** @type {number} table size. */
    var size;
    /** @type {!(Array|Uint8Array)} huffman code table. */
    var table;
    /** @type {number} bit length. */
    var bitLength;
    /** @type {number} huffman code. */
    var code;
    /**
     * サイズが 2^maxlength 個のテーブルを埋めるためのスキップ長.
     * @type {number} skip length for table filling.
     */
    var skip;
    /** @type {number} reversed code. */
    var reversed;
    /** @type {number} reverse temp. */
    var rtemp;
    /** @type {number} loop counter. */
    var i;
    /** @type {number} loop limit. */
    var il;
    /** @type {number} loop counter. */
    var j;
    /** @type {number} table value. */
    var value;
    // Math.max は遅いので最長の値は for-loop で取得する
    for (i = 0, il = listSize; i < il; ++i) {
        if (lengths[i] > maxCodeLength) {
            maxCodeLength = lengths[i];
        }
        if (lengths[i] < minCodeLength) {
            minCodeLength = lengths[i];
        }
    }
    size = 1 << maxCodeLength;
    table = new Uint32Array(size);
    // ビット長の短い順からハフマン符号を割り当てる
    for (bitLength = 1, code = 0, skip = 2; bitLength <= maxCodeLength;) {
        for (i = 0; i < listSize; ++i) {
            if (lengths[i] === bitLength) {
                // ビットオーダーが逆になるためビット長分並びを反転する
                for (reversed = 0, rtemp = code, j = 0; j < bitLength; ++j) {
                    reversed = (reversed << 1) | (rtemp & 1);
                    rtemp >>= 1;
                }
                // 最大ビット長をもとにテーブルを作るため、
                // 最大ビット長以外では 0 / 1 どちらでも良い箇所ができる
                // そのどちらでも良い場所は同じ値で埋めることで
                // 本来のビット長以上のビット数取得しても問題が起こらないようにする
                value = (bitLength << 16) | i;
                for (j = reversed; j < size; j += skip) {
                    table[j] = value;
                }
                ++code;
            }
        }
        // 次のビット長へ
        ++bitLength;
        code <<= 1;
        skip <<= 1;
    }
    return [table, maxCodeLength, minCodeLength];
};
const FixedLiteralLengthTable = (() => {
    let lengths = new Uint8Array(288);
    for (let i = 0, il = lengths.length; i < il; ++i) {
        lengths[i] =
            (i <= 143) ? 8 :
                (i <= 255) ? 9 :
                    (i <= 279) ? 7 :
                        8;
    }
    return buildHuffmanTable(lengths)[0];
})();
const FixedDistanceTable = (() => {
    let lengths = new Uint8Array(30);
    for (let i = 0, il = lengths.length; i < il; ++i) {
        lengths[i] = 5;
    }
    return buildHuffmanTable(lengths);
})();
class RawInflate {
    constructor(input, opt_params) {
        this.blocks = [];
        this.bufferSize = ZLIB_RAW_INFLATE_BUFFER_SIZE;
        this.totalpos = 0;
        this.ip = 0;
        this.bitsbuf = 0;
        this.bitsbuflen = 0;
        this.input = new Uint8Array(input);
        this.bfinal = false;
        this.bufferType = BufferType.ADAPTIVE;
        this.resize = false;
        // option parameters
        if (opt_params) {
            if (opt_params['index']) {
                this.ip = opt_params['index'];
            }
            if (opt_params['bufferSize']) {
                this.bufferSize = opt_params['bufferSize'];
            }
            if (opt_params['bufferType']) {
                this.bufferType = opt_params['bufferType'];
            }
            if (opt_params['resize']) {
                this.resize = opt_params['resize'];
            }
        }
        // initialize
        switch (this.bufferType) {
            case BufferType.BLOCK:
                this.op = MaxBackwardLength;
                this.output = new Uint8Array(MaxBackwardLength + this.bufferSize + MaxCopyLength);
                break;
            case BufferType.ADAPTIVE:
                this.op = 0;
                this.output = new Uint8Array(this.bufferSize);
                break;
            default:
                throw new Error('invalid inflate mode');
        }
    }
    decompress() {
        while (!this.bfinal) {
            this.parseBlock();
        }
        switch (this.bufferType) {
            case BufferType.BLOCK:
                return this.concatBufferBlock();
            case BufferType.ADAPTIVE:
                return this.concatBufferDynamic();
            default:
                throw new Error('invalid inflate mode');
        }
    }
    parseBlock() {
        let hdr = this.readBits(3);
        if (hdr & 0x1) {
            this.bfinal = true;
        }
        hdr >>>= 1;
        switch (hdr) {
            // uncompressed
            case 0:
                this.parseUncompressedBlock();
                break;
            // fixed huffman
            case 1:
                this.parseFixedHuffmanBlock();
                break;
            // dynamic huffman
            case 2:
                this.parseDynamicHuffmanBlock();
                break;
            // reserved or other
            default:
                throw new Error('unknown BTYPE: ' + hdr);
        }
    }
    ;
    readBits(length) {
        let bitsbuf = this.bitsbuf;
        let bitsbuflen = this.bitsbuflen;
        let input = this.input;
        let ip = this.ip;
        let inputLength = input.length;
        let octet;
        if (ip + ((length - bitsbuflen + 7) >> 3) >= inputLength) {
            throw new Error('input buffer is broken');
        }
        // not enough buffer
        while (bitsbuflen < length) {
            bitsbuf |= input[ip++] << bitsbuflen;
            bitsbuflen += 8;
        }
        // output byte
        octet = bitsbuf & /* MASK */ ((1 << length) - 1);
        bitsbuf >>>= length;
        bitsbuflen -= length;
        this.bitsbuf = bitsbuf;
        this.bitsbuflen = bitsbuflen;
        this.ip = ip;
        return octet;
    }
    ;
    readCodeByTable(table) {
        let bitsbuf = this.bitsbuf;
        let bitsbuflen = this.bitsbuflen;
        let input = this.input;
        let ip = this.ip;
        /** @type {number} */
        let inputLength = input.length;
        /** @type {!(Array.<number>|Uint8Array)} huffman code table */
        let codeTable = table[0];
        /** @type {number} */
        let maxCodeLength = table[1];
        /** @type {number} code length & code (16bit, 16bit) */
        let codeWithLength;
        /** @type {number} code bits length */
        let codeLength;
        // not enough buffer
        while (bitsbuflen < maxCodeLength) {
            if (ip >= inputLength) {
                break;
            }
            bitsbuf |= input[ip++] << bitsbuflen;
            bitsbuflen += 8;
        }
        // read max length
        codeWithLength = codeTable[bitsbuf & ((1 << maxCodeLength) - 1)];
        codeLength = codeWithLength >>> 16;
        if (codeLength > bitsbuflen) {
            throw new Error('invalid code length: ' + codeLength);
        }
        this.bitsbuf = bitsbuf >> codeLength;
        this.bitsbuflen = bitsbuflen - codeLength;
        this.ip = ip;
        return codeWithLength & 0xffff;
    }
    ;
    parseUncompressedBlock() {
        let input = this.input;
        let ip = this.ip;
        let output = this.output;
        let op = this.op;
        /** @type {number} */
        let inputLength = input.length;
        /** @type {number} block length */
        let len;
        /** @type {number} number for check block length */
        let nlen;
        /** @type {number} output buffer length */
        let olength = output.length;
        /** @type {number} copy counter */
        let preCopy;
        // skip buffered header bits
        this.bitsbuf = 0;
        this.bitsbuflen = 0;
        // len
        if (ip + 1 >= inputLength) {
            throw new Error('invalid uncompressed block header: LEN');
        }
        len = input[ip++] | (input[ip++] << 8);
        // nlen
        if (ip + 1 >= inputLength) {
            throw new Error('invalid uncompressed block header: NLEN');
        }
        nlen = input[ip++] | (input[ip++] << 8);
        // check len & nlen
        if (len === ~nlen) {
            throw new Error('invalid uncompressed block header: length verify');
        }
        // check size
        if (ip + len > input.length) {
            throw new Error('input buffer is broken');
        }
        // expand buffer
        switch (this.bufferType) {
            case BufferType.BLOCK:
                // pre copy
                while (op + len > output.length) {
                    preCopy = olength - op;
                    len -= preCopy;
                    output.set(input.subarray(ip, ip + preCopy), op);
                    op += preCopy;
                    ip += preCopy;
                    this.op = op;
                    output = this.expandBufferBlock();
                    op = this.op;
                }
                break;
            case BufferType.ADAPTIVE:
                while (op + len > output.length) {
                    output = this.expandBufferAdaptive({ fixRatio: 2 });
                }
                break;
            default:
                throw new Error('invalid inflate mode');
        }
        // copy
        output.set(input.subarray(ip, ip + len), op);
        op += len;
        ip += len;
        this.ip = ip;
        this.op = op;
        this.output = output;
    }
    ;
    parseFixedHuffmanBlock() {
        switch (this.bufferType) {
            case BufferType.ADAPTIVE:
                this.decodeHuffmanAdaptive(FixedLiteralLengthTable, FixedDistanceTable);
                break;
            case BufferType.BLOCK:
                this.decodeHuffmanBlock(FixedLiteralLengthTable, FixedDistanceTable);
                break;
            default:
                throw new Error('invalid inflate mode');
        }
    }
    parseDynamicHuffmanBlock() {
        /** @type {number} number of literal and length codes. */
        let hlit = this.readBits(5) + 257;
        /** @type {number} number of distance codes. */
        let hdist = this.readBits(5) + 1;
        /** @type {number} number of code lengths. */
        let hclen = this.readBits(4) + 4;
        /** @type {!(Uint8Array|Array.<number>)} code lengths. */
        let codeLengths = new Uint8Array(Order.length);
        /** @type {!Array} code lengths table. */
        let codeLengthsTable;
        /** @type {!(Uint8Array|Array.<number>)} literal and length code table. */
        let litlenTable;
        /** @type {!(Uint8Array|Array.<number>)} distance code table. */
        let distTable;
        /** @type {number} */
        let code;
        /** @type {number} */
        let prev;
        /** @type {number} */
        let repeat;
        /** @type {number} loop counter. */
        let i;
        /** @type {number} loop limit. */
        let il;
        // decode code lengths
        for (i = 0; i < hclen; ++i) {
            codeLengths[Order[i]] = this.readBits(3);
        }
        // decode length table
        codeLengthsTable = buildHuffmanTable(codeLengths);
        let lengthTable = new Uint8Array(hlit + hdist);
        for (i = 0, il = hlit + hdist; i < il;) {
            code = this.readCodeByTable(codeLengthsTable);
            switch (code) {
                case 16:
                    repeat = 3 + this.readBits(2);
                    while (repeat--) {
                        lengthTable[i++] = prev;
                    }
                    break;
                case 17:
                    repeat = 3 + this.readBits(3);
                    while (repeat--) {
                        lengthTable[i++] = 0;
                    }
                    prev = 0;
                    break;
                case 18:
                    repeat = 11 + this.readBits(7);
                    while (repeat--) {
                        lengthTable[i++] = 0;
                    }
                    prev = 0;
                    break;
                default:
                    lengthTable[i++] = code;
                    prev = code;
                    break;
            }
        }
        litlenTable = buildHuffmanTable(lengthTable.subarray(0, hlit));
        distTable = buildHuffmanTable(lengthTable.subarray(hlit));
        switch (this.bufferType) {
            case BufferType.ADAPTIVE:
                this.decodeHuffmanAdaptive(litlenTable, distTable);
                break;
            case BufferType.BLOCK:
                this.decodeHuffmanBlock(litlenTable, distTable);
                break;
            default:
                throw new Error('invalid inflate mode');
        }
    }
    decodeHuffmanBlock(litlen, dist) {
        let output = this.output;
        let op = this.op;
        this.currentLitlenTable = litlen;
        /** @type {number} output position limit. */
        let olength = output.length - MaxCopyLength;
        /** @type {number} huffman code. */
        let code;
        /** @type {number} table index. */
        let ti;
        /** @type {number} huffman code distination. */
        let codeDist;
        /** @type {number} huffman code length. */
        let codeLength;
        let lengthCodeTable = LengthCodeTable;
        let lengthExtraTable = LengthExtraTable;
        let distCodeTable = DistCodeTable;
        let distExtraTable = DistExtraTable;
        while ((code = this.readCodeByTable(litlen)) !== 256) {
            // literal
            if (code < 256) {
                if (op >= olength) {
                    this.op = op;
                    output = this.expandBufferBlock();
                    op = this.op;
                }
                output[op++] = code;
                continue;
            }
            // length code
            ti = code - 257;
            codeLength = lengthCodeTable[ti];
            if (lengthExtraTable[ti] > 0) {
                codeLength += this.readBits(lengthExtraTable[ti]);
            }
            // dist code
            code = this.readCodeByTable(dist);
            codeDist = distCodeTable[code];
            if (distExtraTable[code] > 0) {
                codeDist += this.readBits(distExtraTable[code]);
            }
            // lz77 decode
            if (op >= olength) {
                this.op = op;
                output = this.expandBufferBlock();
                op = this.op;
            }
            while (codeLength--) {
                output[op] = output[(op++) - codeDist];
            }
        }
        while (this.bitsbuflen >= 8) {
            this.bitsbuflen -= 8;
            this.ip--;
        }
        this.op = op;
    }
    ;
    decodeHuffmanAdaptive(litlen, dist) {
        let output = this.output;
        let op = this.op;
        this.currentLitlenTable = litlen;
        /** @type {number} output position limit. */
        let olength = output.length;
        /** @type {number} huffman code. */
        let code;
        /** @type {number} table index. */
        let ti;
        /** @type {number} huffman code distination. */
        let codeDist;
        /** @type {number} huffman code length. */
        let codeLength;
        let lengthCodeTable = LengthCodeTable;
        let lengthExtraTable = LengthExtraTable;
        let distCodeTable = DistCodeTable;
        let distExtraTable = DistExtraTable;
        while ((code = this.readCodeByTable(litlen)) !== 256) {
            // literal
            if (code < 256) {
                if (op >= olength) {
                    output = this.expandBufferAdaptive();
                    olength = output.length;
                }
                output[op++] = code;
                continue;
            }
            // length code
            ti = code - 257;
            codeLength = lengthCodeTable[ti];
            if (lengthExtraTable[ti] > 0) {
                codeLength += this.readBits(lengthExtraTable[ti]);
            }
            // dist code
            code = this.readCodeByTable(dist);
            codeDist = distCodeTable[code];
            if (distExtraTable[code] > 0) {
                codeDist += this.readBits(distExtraTable[code]);
            }
            // lz77 decode
            if (op + codeLength > olength) {
                output = this.expandBufferAdaptive();
                olength = output.length;
            }
            while (codeLength--) {
                output[op] = output[(op++) - codeDist];
            }
        }
        while (this.bitsbuflen >= 8) {
            this.bitsbuflen -= 8;
            this.ip--;
        }
        this.op = op;
    }
    expandBufferBlock() {
        let buffer = new Uint8Array(this.op - MaxBackwardLength);
        let backward = this.op - MaxBackwardLength;
        let output = this.output;
        // copy to output buffer
        buffer.set(output.subarray(MaxBackwardLength, buffer.length));
        this.blocks.push(buffer);
        this.totalpos += buffer.length;
        // copy to backward buffer
        output.set(output.subarray(backward, backward + MaxBackwardLength));
        this.op = MaxBackwardLength;
        return output;
    }
    expandBufferAdaptive(opt_param) {
        /** @type {!(Array.<number>|Uint8Array)} store buffer. */
        let buffer;
        /** @type {number} expantion ratio. */
        let ratio = (this.input.length / this.ip + 1) | 0;
        /** @type {number} maximum number of huffman code. */
        let maxHuffCode;
        /** @type {number} new output buffer size. */
        let newSize;
        /** @type {number} max inflate size. */
        let maxInflateSize;
        let input = this.input;
        let output = this.output;
        if (opt_param) {
            if (typeof opt_param.fixRatio === 'number') {
                ratio = opt_param.fixRatio;
            }
            if (typeof opt_param.addRatio === 'number') {
                ratio += opt_param.addRatio;
            }
        }
        // calculate new buffer size
        if (ratio < 2) {
            maxHuffCode =
                (input.length - this.ip) / this.currentLitlenTable[2];
            maxInflateSize = (maxHuffCode / 2 * 258) | 0;
            newSize = maxInflateSize < output.length ?
                output.length + maxInflateSize :
                output.length << 1;
        }
        else {
            newSize = output.length * ratio;
        }
        buffer = new Uint8Array(newSize);
        buffer.set(output);
        this.output = buffer;
        return this.output;
    }
    ;
    concatBufferBlock() {
        /** @type {number} buffer pointer. */
        let pos = 0;
        /** @type {number} buffer pointer. */
        let limit = this.totalpos + (this.op - MaxBackwardLength);
        /** @type {!(Array.<number>|Uint8Array)} output block array. */
        let output = this.output;
        /** @type {!Array} blocks array. */
        let blocks = this.blocks;
        /** @type {!(Array.<number>|Uint8Array)} output block array. */
        let block;
        /** @type {!(Array.<number>|Uint8Array)} output buffer. */
        let buffer = new Uint8Array(limit);
        /** @type {number} loop counter. */
        let i;
        /** @type {number} loop limiter. */
        let il;
        /** @type {number} loop counter. */
        let j;
        /** @type {number} loop limiter. */
        let jl;
        // single buffer
        if (blocks.length === 0) {
            return this.output.subarray(MaxBackwardLength, this.op);
        }
        // copy to buffer
        for (i = 0, il = blocks.length; i < il; ++i) {
            block = blocks[i];
            for (j = 0, jl = block.length; j < jl; ++j) {
                buffer[pos++] = block[j];
            }
        }
        // current buffer
        for (i = MaxBackwardLength, il = this.op; i < il; ++i) {
            buffer[pos++] = output[i];
        }
        this.blocks = [];
        this.buffer = buffer;
        return this.buffer;
    }
    ;
    concatBufferDynamic() {
        let buffer;
        let op = this.op;
        if (this.resize) {
            buffer = new Uint8Array(op);
            buffer.set(this.output.subarray(0, op));
        }
        else {
            buffer = this.output.subarray(0, op);
        }
        this.buffer = buffer;
        return this.buffer;
    }
}

class StringUtil {
    static encodeHTML(str) {
        if (!str)
            return "";
        else
            return str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("'", "&apos;");
    }
    static getFileName(source) {
        let i = source.lastIndexOf("/");
        if (i != -1)
            source = source.substr(i + 1);
        i = source.lastIndexOf("\\");
        if (i != -1)
            source = source.substr(i + 1);
        i = source.lastIndexOf(".");
        if (i != -1)
            return source.substring(0, i);
        else
            return source;
    }
    static startsWith(source, str, ignoreCase = false) {
        if (!source)
            return false;
        else if (source.length < str.length)
            return false;
        else {
            source = source.substring(0, str.length);
            if (!ignoreCase)
                return source == str;
            else
                return source.toLowerCase() == str.toLowerCase();
        }
    }
    static endsWith(source, str, ignoreCase = false) {
        if (!source)
            return false;
        else if (source.length < str.length)
            return false;
        else {
            source = source.substring(source.length - str.length);
            if (!ignoreCase)
                return source == str;
            else
                return source.toLowerCase() == str.toLowerCase();
        }
    }
    static trim(targetString) {
        return StringUtil.trimLeft(StringUtil.trimRight(targetString));
    }
    static trimLeft(targetString) {
        let tempChar = "";
        let i;
        for (i = 0; i < targetString.length; i++) {
            tempChar = targetString.charAt(i);
            if (tempChar != " " && tempChar != "\n" && tempChar != "\r")
                break;
        }
        return targetString.substr(i);
    }
    static trimRight(targetString) {
        let tempChar = "";
        let i;
        for (i = targetString.length - 1; i >= 0; i--) {
            tempChar = targetString.charAt(i);
            if (tempChar != " " && tempChar != "\n" && tempChar != "\r")
                break;
        }
        return targetString.substring(0, i + 1);
    }
    static convertToHtmlColor(argb, hasAlpha = false) {
        let alpha;
        if (hasAlpha)
            alpha = (argb >> 24 & 0xFF).toString(16);
        else
            alpha = "";
        let red = (argb >> 16 & 0xFF).toString(16);
        let green = (argb >> 8 & 0xFF).toString(16);
        let blue = (argb & 0xFF).toString(16);
        if (alpha.length == 1)
            alpha = `0${alpha}`;
        if (red.length == 1)
            red = `0${red}`;
        if (green.length == 1)
            green = `0${green}`;
        if (blue.length == 1)
            blue = `0${blue}`;
        return `#${alpha}${red}${green}${blue}`;
    }
    static convertFromHtmlColor(str, hasAlpha = false) {
        if (str.length < 1)
            return 0;
        if (str.charAt(0) == "#")
            str = str.substr(1);
        if (str.length == 8)
            return (parseInt(str.substr(0, 2), 16) << 24) + parseInt(str.substr(2), 16);
        else if (hasAlpha)
            return 0xFF000000 + parseInt(str, 16);
        else
            return parseInt(str, 16);
    }
    static convertToRGBA(str) {
        if (str.charAt(0) == "#")
            str = str.substr(1);
        let alpha = +(parseInt('0x' + str.slice(0, 2)) / 255).toFixed(2);
        str = str.substr(2);
        let r = parseInt(str.substring(0, 2), 16);
        let g = parseInt(str.substring(2, 4), 16);
        let b = parseInt(str.substring(4), 16);
        return createjs.Graphics.getRGB(r, g, b, alpha);
    }
    static HEX2RGB(hex) {
        if (hex.charAt(0) == "#")
            hex = hex.substr(1);
        if (hex.length === 3) {
            hex += hex;
        }
        return `${this.HEX2DEC(hex.substring(0, 2))},${this.HEX2DEC(hex.substring(2, 4))},${this.HEX2DEC(hex.substring(4))}`;
    }
    static HEX2DEC(hex) {
        return parseInt(hex, 16).toString();
    }
}

class Utils {
    static deepCopyProperties(target, source, propertyObj) {
        for (var prop in propertyObj) {
            if (Array.isArray(source[prop])) {
                target[prop] = source[prop].slice();
            }
            else {
                target[prop] = source[prop];
            }
        }
    }
    static fillPath(ctx, points, px, py) {
        var cnt = points.length;
        ctx.moveTo(points[0] + px, points[1] + py);
        for (var i = 2; i < cnt; i += 2) {
            ctx.lineTo(points[i] + px, points[i + 1] + py);
        }
        ctx.lineTo(points[0] + px, points[1] + py);
    }
}
Utils.TextureCache = {};

class XmlNode {
    constructor(ele) {
        this.nodeName = ele.nodeName;
        this.context = ele;
        this.type = ele.nodeType;
        this.text = (this.type == Node.COMMENT_NODE || this.type == Node.TEXT_NODE) ? this.context.textContent : null;
    }
    get children() {
        if (!this.$children)
            this.$children = XmlParser.getChildNodes(this);
        return this.$children;
    }
    get attributes() {
        if (!this.$attributes)
            this.$attributes = XmlParser.getNodeAttributes(this);
        return this.$attributes;
    }
}
class XmlParser {
    static tryParse(xmlstring, mimeType = "application/xml") {
        let doc = XmlParser.$parser.parseFromString(xmlstring, mimeType);
        if (doc && doc.childNodes && doc.childNodes.length >= 1)
            return new XmlNode(doc.firstChild);
        return null;
    }
    static getXmlRoot(xml) {
        if (!xml || !xml.context)
            throw new Error("Invalid xml node");
        let p = xml.context;
        while (p.parentNode != null)
            p = p.parentNode;
        return p == xml.context ? xml : new XmlNode(p);
    }
    static getChildNodes(xml, matchName = null) {
        let nodes = xml.context.childNodes;
        let ret = [];
        if (!nodes || nodes.length <= 0)
            return ret;
        let len = nodes.length;
        for (let i = 0; i < len; i++) {
            let n = nodes.item(i);
            if (n.nodeType == Node.TEXT_NODE)
                continue;
            if (!matchName || (matchName && matchName.length > 0 && n.nodeName.toLowerCase() == matchName.toLowerCase()))
                ret.push(new XmlNode(n));
        }
        return ret;
    }
    static getNodeAttributes(xml) {
        let context = xml.context;
        let asList = context.attributes;
        let ret = {};
        if (!asList || asList.length <= 0)
            return ret;
        let len = asList.length;
        for (let i = 0; i < len; i++) {
            let a = asList.item(i);
            ret[a.nodeName] = a.nodeValue;
        }
        return ret;
    }
}
XmlParser.$parser = new DOMParser();

class DisplayListItem {
    constructor(packageItem, type) {
        this.packageItem = packageItem;
        this.type = type;
    }
}

class PackageItem {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.tiledSlices = 0;
        //movieclip
        this.interval = 0;
        this.repeatDelay = 0;
    }
    load() {
        return this.owner.getItemAsset(this);
    }
    toString() {
        return this.name;
    }
}

class AtlasConfig {
    constructor(atlasName, frame, orig, trim, rotate) {
        this.atlasName = atlasName;
        this.frame = frame;
        this.orig = orig;
        this.trim = trim;
        this.rotate = rotate;
    }
}
class UIPackage {
    constructor() {
        this.$items = [];
        this.$atlasConfigs = {};
    }
    static getById(id) {
        return UIPackage.$packageInstById[id];
    }
    static getByName(name) {
        return UIPackage.$packageInstByName[name];
    }
    static addPackage(resKey) {
        let pkg = new UIPackage();
        pkg.$resKey = resKey;
        pkg.create(resKey);
        UIPackage.$packageInstById[pkg.id] = pkg;
        UIPackage.$packageInstByName[pkg.name] = pkg;
        pkg.customId = resKey;
        return pkg;
    }
    static removePackage(packageId) {
        let pkg = UIPackage.$packageInstById[packageId];
        pkg.dispose();
        delete UIPackage.$packageInstById[pkg.id];
        if (pkg.$customId != null)
            delete UIPackage.$packageInstById[pkg.$customId];
        delete UIPackage.$packageInstByName[pkg.name];
    }
    static createObject(pkgName, resName, userClass) {
        let pkg = UIPackage.getByName(pkgName);
        if (pkg)
            return pkg.createObject(resName, userClass);
        else
            return null;
    }
    static createObjectFromURL(url, userClass) {
        let pi = UIPackage.getItemByURL(url);
        if (pi)
            return pi.owner.internalCreateObject(pi, userClass);
        else
            return null;
    }
    static getItemURL(pkgName, resName) {
        let pkg = UIPackage.getByName(pkgName);
        if (!pkg)
            return null;
        let pi = pkg.$itemsByName[resName];
        if (!pi)
            return null;
        return `ui://${pkg.id}${pi.id}`;
    }
    static getItemByURL(url) {
        let pos1 = url.indexOf('//');
        if (pos1 == -1)
            return null;
        let pos2 = url.indexOf('/', pos1 + 2);
        let pkg;
        if (pos2 == -1) {
            if (url.length > 13) {
                let pkgId = url.substr(5, 8);
                pkg = UIPackage.getById(pkgId);
                if (pkg != null) {
                    let srcId = url.substr(13);
                    return pkg.getItemById(srcId);
                }
            }
        }
        else {
            let pkgName = url.substr(pos1 + 2, pos2 - pos1 - 2);
            pkg = UIPackage.getByName(pkgName);
            if (pkg != null) {
                let srcName = url.substr(pos2 + 1);
                return pkg.getItemByName(srcName);
            }
        }
        return null;
    }
    static getBitmapFontByURL(url) {
        return UIPackage.$bitmapFonts[url];
    }
    static setStringsSource(source) {
        UIPackage.$stringsSource = {};
        let xmlroot = XmlParser.tryParse(source);
        xmlroot.children.forEach(cxml => {
            if (cxml.nodeName == 'string') {
                let key = cxml.attributes.name;
                let i = key.indexOf('-');
                if (i == -1)
                    return;
                let text = cxml.children.length > 0 ? cxml.children[0].text : '';
                let key2 = key.substr(0, i);
                let key3 = key.substr(i + 1);
                let col = UIPackage.$stringsSource[key2];
                if (!col) {
                    col = {};
                    UIPackage.$stringsSource[key2] = col;
                }
                col[key3] = text;
            }
        });
    }
    /**
     * format the URL from old version to new version
     * @param url url with old version format
     */
    static normalizeURL(url) {
        if (url == null)
            return null;
        let pos1 = url.indexOf('//');
        if (pos1 == -1)
            return null;
        let pos2 = url.indexOf('/', pos1 + 2);
        if (pos2 == -1)
            return url;
        let pkgName = url.substr(pos1 + 2, pos2 - pos1 - 2);
        let srcName = url.substr(pos2 + 1);
        return UIPackage.getItemURL(pkgName, srcName);
    }
    create(resKey) {
        this.$resKey = resKey;
        let buf = AssetLoader.resourcesPool[this.$resKey];
        if (!buf) {
            buf = AssetLoader.resourcesPool[`${this.$resKey}_fui`];
        }
        if (!buf) {
            throw new Error(`Resource '${this.$resKey}' not found, please make sure that you use "new fgui.utils.AssetLoader" to load resources".`);
        }
        if (!buf || !(buf instanceof ArrayBuffer)) {
            throw new Error(`Resource '${this.$resKey}' is not a proper binary resource, please load it as binary format in manifest file add[{ id, src, type: "binary" }]`);
        }
        this.loadPackage(buf);
    }
    loadPackage(descData) {
        this.decompressPackage(descData);
        let str = this.getResDescriptor('sprites.bytes');
        str &&
            str.split(UIPackage.sep1).forEach((str, index) => {
                if (index >= 1 && str && str.length) {
                    let arr = str.split(UIPackage.sep2);
                    let texID;
                    let itemId = arr[0];
                    let binIndex = parseInt(arr[1]);
                    if (binIndex >= 0)
                        texID = `atlas${binIndex}`;
                    else {
                        let pos = itemId.indexOf('_');
                        if (pos == -1)
                            texID = `atlas_${itemId}`;
                        else
                            texID = `atlas_${itemId.substr(0, pos)}`;
                    }
                    let cfg = new AtlasConfig(texID);
                    cfg.frame = new createjs.Rectangle(parseInt(arr[2]), parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]));
                    cfg.rotate = arr[6] == '1' ? 6 : 0;
                    cfg.orig =
                        cfg.rotate != 0 ? new createjs.Rectangle(0, 0, cfg.frame.height, cfg.frame.width) : null;
                    /*
                          cfg.trim = trimed;  //ignored for now - editor not support
                          */
                    this.$atlasConfigs[itemId] = cfg;
                }
            });
        str = this.getResDescriptor('package.xml');
        let xml = XmlParser.tryParse(str);
        this.$id = xml.attributes.id;
        this.$name = xml.attributes.name;
        let resources = xml.children[0].children;
        this.$itemsById = {};
        this.$itemsByName = {};
        resources.forEach(cxml => {
            let pi = new PackageItem();
            pi.type = ParsePackageItemType(cxml.nodeName);
            pi.id = cxml.attributes.id;
            pi.name = cxml.attributes.name;
            pi.file = cxml.attributes.file;
            str = cxml.attributes.size;
            if (str) {
                let arr = str.split(UIPackage.sep0);
                pi.width = parseInt(arr[0]);
                pi.height = parseInt(arr[1]);
            }
            switch (pi.type) {
                case 0 /* Image */: {
                    str = cxml.attributes.scale;
                    if (str == '9grid') {
                        str = cxml.attributes.scale9grid;
                        if (str) {
                            let arr = str.split(UIPackage.sep0);
                            let rect = new createjs.Rectangle(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]));
                            pi.scale9Grid = rect;
                            str = cxml.attributes.gridTile;
                            if (str)
                                pi.tiledSlices = parseInt(str);
                        }
                    }
                    else if (str == 'tile')
                        pi.scaleByTile = true;
                    break;
                }
            }
            pi.owner = this;
            this.$items.push(pi);
            this.$itemsById[pi.id] = pi;
            if (pi.name != null)
                this.$itemsByName[pi.name] = pi;
        }, this);
        this.$items.forEach(pi => {
            if (pi.type == 6 /* Font */) {
                this.loadFont(pi);
                UIPackage.$bitmapFonts[pi.bitmapFont.id] = pi.bitmapFont;
            }
        }, this);
    }
    decompressPackage(buf) {
        this.$resData = {};
        var mark = new Uint8Array(buf.slice(0, 2));
        if (mark[0] == 0x50 && mark[1] == 0x4b) {
            this.decodeUncompressed(buf);
            return;
        }
        let inflater = new RawInflate(buf);
        let data = inflater.decompress();
        let source = RawByte.decodeUTF8(data);
        let curr = 0;
        let fn;
        let size;
        while (true) {
            let pos = source.indexOf('|', curr);
            if (pos == -1)
                break;
            fn = source.substring(curr, pos);
            curr = pos + 1;
            pos = source.indexOf('|', curr);
            size = parseInt(source.substring(curr, pos));
            curr = pos + 1;
            this.$resData[fn] = source.substr(curr, size);
            curr += size;
        }
    }
    /**
     * @param buf
     */
    decodeUncompressed(buf) {
        var ba = new ByteArray(buf);
        ba.endian = Endian.LITTLE_ENDIAN;
        var pos = ba.length - 22;
        ba.position = pos + 10;
        var entryCount = ba.readUnsignedShort();
        ba.position = pos + 16;
        pos = ba.readInt();
        for (var i = 0; i < entryCount; i++) {
            ba.position = pos + 28;
            var len = ba.readUnsignedShort();
            var len2 = ba.readUnsignedShort() + ba.readUnsignedShort();
            ba.position = pos + 46;
            var entryName = ba.readUTFBytes(len);
            if (entryName[entryName.length - 1] != '/' && entryName[entryName.length - 1] != '\\') {
                //not directory
                ba.position = pos + 20;
                var size = ba.readInt();
                ba.position = pos + 42;
                var offset = ba.readInt() + 30 + len;
                if (size > 0) {
                    ba.position = offset;
                    this.$resData[entryName] = ba.readUTFBytes(size);
                }
            }
            pos += 46 + len + len2;
        }
    }
    dispose() {
        this.$items.forEach(pi => {
            let cfg = this.$atlasConfigs[pi.id];
            if (cfg)
                AssetLoader.destroyResource(`${this.$resKey}@${cfg.atlasName}`);
        }, this);
    }
    get id() {
        return this.$id;
    }
    get name() {
        return this.$name;
    }
    get customId() {
        return this.$customId;
    }
    set customId(value) {
        if (this.$customId != null)
            delete UIPackage.$packageInstById[this.$customId];
        this.$customId = value;
        if (this.$customId != null)
            UIPackage.$packageInstById[this.$customId] = this;
    }
    createObject(resName, userClass) {
        let pi = this.$itemsByName[resName];
        if (pi)
            return this.internalCreateObject(pi, userClass);
        else
            return null;
    }
    internalCreateObject(item, userClass = null) {
        let g = item.type == 4 /* Component */ && userClass != null
            ? new userClass()
            : Decls.UIObjectFactory.newObject(item);
        if (g == null)
            return null;
        UIPackage.$constructingObjects++;
        g.packageItem = item;
        g.constructFromResource();
        UIPackage.$constructingObjects--;
        return g;
    }
    getItemById(itemId) {
        return this.$itemsById[itemId];
    }
    getItemByName(resName) {
        return this.$itemsByName[resName];
    }
    getItemAssetByName(resName) {
        let pi = this.$itemsByName[resName];
        if (pi == null)
            throw new Error(`Resource '${resName}' not found`);
        return this.getItemAsset(pi);
    }
    /**
     * todo
     */
    createSpriteTexture(cfgName, cfg) {
        let atlasItem = this.$itemsById[cfg.atlasName];
        if (atlasItem != null) {
            let atlasTexture = this.getItemAsset(atlasItem);
            if (!atlasTexture)
                return null;
            if (!cfg.texCacheID) {
                cfg.texCacheID = `${this.$resKey}@${cfg.atlasName}`;
            }
            let tex = Utils.TextureCache[cfg.texCacheID];
            //todo add to cache
            if (!tex) {
                tex = {
                    image: atlasTexture,
                    rect: cfg.frame
                };
            }
            return tex;
        }
        else
            return null;
    }
    getItemAsset(item) {
        switch (item.type) {
            case 0 /* Image */:
                if (!item.decoded) {
                    item.decoded = true;
                    let cfg = this.$atlasConfigs[item.id];
                    if (cfg != null)
                        item.texture = this.createSpriteTexture(item.id, cfg);
                }
                return item.texture;
            case 7 /* Atlas */:
                if (!item.decoded) {
                    item.decoded = true;
                    let fileName = item.file != null && item.file.length > 0 ? item.file : `${item.id}.png`;
                    let resName = `${this.$resKey}@${StringUtil.getFileName(fileName)}`;
                    let texture = AssetLoader.resourcesPool[resName];
                    if (!texture) {
                        throw new Error(`${resName} not found in fgui.AssetLoader.resourcesPool, please load assets first!`);
                    }
                    item.texture = texture;
                    if (!item.texture) {
                        texture = AssetLoader.resourcesPool[`${this.$resKey}@${fileName.replace('.', '_')}`];
                        item.texture = texture;
                    }
                }
                return item.texture;
            case 3 /* Sound */:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadAudio(item);
                }
                return item.sound;
            case 6 /* Font */:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadFont(item);
                }
                return item.bitmapFont;
            case 2 /* MovieClip */:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadMovieClip(item);
                }
                return item.frames;
            case 4 /* Component */:
                if (!item.decoded) {
                    item.decoded = true;
                    let str = this.getResDescriptor(`${item.id}.xml`);
                    let xml = XmlParser.tryParse(str);
                    item.componentData = xml;
                    this.loadComponentChildren(item);
                    this.loadComponentTranslation(item);
                }
                return item.componentData;
            default:
                return AssetLoader.resourcesPool[`${this.$resKey}@${item.id}`];
        }
    }
    loadComponentChildren(item) {
        let listNode = XmlParser.getChildNodes(item.componentData, 'displayList');
        if (listNode != null && listNode.length > 0) {
            item.displayList = [];
            listNode[0].children.forEach(cxml => {
                let tagName = cxml.nodeName;
                let di;
                let src = cxml.attributes.src;
                if (src) {
                    let pkgId = cxml.attributes.pkg;
                    let pkg;
                    if (pkgId && pkgId != item.owner.id)
                        pkg = UIPackage.getById(pkgId);
                    else
                        pkg = item.owner;
                    let pi = pkg != null ? pkg.getItemById(src) : null;
                    if (pi != null)
                        di = new DisplayListItem(pi, null);
                    else
                        di = new DisplayListItem(null, tagName);
                }
                else {
                    if (tagName == 'text' && cxml.attributes.input == 'true')
                        di = new DisplayListItem(null, 'inputtext');
                    else
                        di = new DisplayListItem(null, tagName);
                }
                di.desc = cxml;
                item.displayList.push(di);
            });
        }
        else
            item.displayList = [];
    }
    getResDescriptor(fn) {
        return this.$resData[fn];
    }
    loadComponentTranslation(item) {
        if (UIPackage.$stringsSource == null)
            return;
        let strings = UIPackage.$stringsSource[this.id + item.id];
        if (strings == null)
            return;
        let value;
        let cxml, dxml;
        let ename;
        let elementId;
        let str;
        item.displayList.forEach(item => {
            cxml = item.desc;
            ename = cxml.nodeName;
            elementId = cxml.attributes.id;
            str = cxml.attributes.tooltips;
            if (str) {
                value = strings[`${elementId}-tips`];
                if (value != undefined)
                    cxml.attributes.tooltips = value;
            }
            let cs = XmlParser.getChildNodes(cxml, 'gearText');
            dxml = cs && cs[0];
            if (dxml) {
                value = strings[`${elementId}-texts`];
                if (value != undefined)
                    dxml.attributes.values = value;
                value = strings[`${elementId}-texts_def`];
                if (value != undefined)
                    dxml.attributes.default = value;
            }
            if (ename == 'text' || ename == 'richtext') {
                value = strings[elementId];
                if (value != undefined)
                    cxml.attributes.text = value;
                value = strings[`${elementId}-prompt`];
                if (value != undefined)
                    cxml.attributes.prompt = value;
            }
            else if (ename == 'list') {
                cxml.children.forEach((exml, index) => {
                    if (exml.nodeName != 'item')
                        return;
                    value = strings[`${elementId}-${index}`];
                    if (value != undefined)
                        exml.attributes.title = value;
                });
            }
            else if (ename == 'component') {
                cs = XmlParser.getChildNodes(cxml, 'Button');
                dxml = cs && cs[0];
                if (dxml) {
                    value = strings[elementId];
                    if (value != undefined)
                        dxml.attributes.title = value;
                    value = strings[`${elementId}-0`];
                    if (value != undefined)
                        dxml.attributes.selectedTitle = value;
                    return;
                }
                cs = XmlParser.getChildNodes(cxml, 'Label');
                dxml = cs && cs[0];
                if (dxml) {
                    value = strings[elementId];
                    if (value != undefined)
                        dxml.attributes.title = value;
                    return;
                }
                cs = XmlParser.getChildNodes(cxml, 'ComboBox');
                dxml = cs && cs[0];
                if (dxml) {
                    value = strings[elementId];
                    if (value != undefined)
                        dxml.attributes.title = value;
                    dxml.children.forEach((exml, index) => {
                        if (exml.nodeName != 'item')
                            return;
                        value = strings[`${elementId}-${index}`];
                        if (value != undefined)
                            exml.attributes.title = value;
                    });
                    return;
                }
            }
        });
    }
    loadMovieClip(item) {
        let xml = XmlParser.tryParse(this.getResDescriptor(`${item.id}.xml`));
        let str;
        str = xml.attributes.interval;
        if (str != null)
            item.interval = parseInt(str);
        str = xml.attributes.swing;
        if (str != null)
            item.swing = str == 'true';
        str = xml.attributes.repeatDelay;
        if (str != null)
            item.repeatDelay = parseInt(str);
        item.frames = [];
        let frameNodes = xml.children[0].children;
        frameNodes.forEach((node, index) => {
            let frame = new Frame();
            str = node.attributes.rect;
            let arr = str.split(UIPackage.sep0);
            let trimRect = new createjs.Rectangle(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]));
            str = node.attributes.addDelay;
            if (str)
                frame.addDelay = parseInt(str);
            item.frames.push(frame);
            if (trimRect.width <= 0)
                return;
            str = node.attributes.sprite;
            if (str)
                str = `${item.id}_${str}`;
            else
                str = `${item.id}_${index}`;
            let cfg = this.$atlasConfigs[str];
            if (cfg != null) {
                frame.texture = this.createSpriteTexture(str, cfg);
                frame.texture.trim = trimRect;
            }
        });
    }
    loadFont(item) {
        let font = new BitmapFont();
        font.id = `ui://${this.id}${item.id}`;
        let str = this.getResDescriptor(`${item.id}.fnt`);
        let lines = str.split(UIPackage.sep1);
        let kv = {};
        let ttf = false;
        let size = 0;
        let xadvance = 0;
        let resizable = false;
        let colorable = false;
        let atlasOffsetX = 0, atlasOffsetY = 0;
        let charImg;
        let mainTexture;
        let lineHeight = 0;
        let maxCharHeight = 0;
        lines.forEach(line => {
            if (line && line.length) {
                str = StringUtil.trim(line);
                let arr = str.split(UIPackage.sep2);
                arr.forEach(v => {
                    let at = v.split(UIPackage.sep3);
                    kv[at[0]] = at[1];
                });
                str = arr[0];
                if (str == 'char') {
                    let bg = new BMGlyph();
                    bg.x = parseInt(kv.x) || 0;
                    bg.y = parseInt(kv.y) || 0;
                    bg.offsetX = parseInt(kv.xoffset) || 0;
                    bg.offsetY = parseInt(kv.yoffset) || 0;
                    bg.width = parseInt(kv.width) || 0;
                    bg.height = parseInt(kv.height) || 0;
                    maxCharHeight = Math.max(bg.height, maxCharHeight);
                    bg.advance = parseInt(kv.xadvance) || 0;
                    if (kv.chnl != undefined) {
                        bg.channel = parseInt(kv.chnl);
                        if (bg.channel == 15)
                            bg.channel = 4;
                        else if (bg.channel == 1)
                            bg.channel = 3;
                        else if (bg.channel == 2)
                            bg.channel = 2;
                        else
                            bg.channel = 1;
                    }
                    if (!ttf) {
                        if (kv.img) {
                            charImg = this.$itemsById[kv.img];
                            if (charImg != null) {
                                charImg.load();
                                bg.width = charImg.width;
                                bg.height = charImg.height;
                                bg.texture = charImg.texture;
                            }
                        }
                    }
                    else if (mainTexture != null) {
                        if (!bg.texture) {
                            bg.texture = { image: mainTexture, rect: {} };
                        }
                        bg.texture.rect = new createjs.Rectangle(bg.x + atlasOffsetX, bg.y + atlasOffsetY, bg.width, bg.height);
                    }
                    if (ttf)
                        bg.lineHeight = lineHeight;
                    else {
                        if (bg.advance == 0) {
                            if (xadvance == 0)
                                bg.advance = bg.offsetX + bg.width;
                            else
                                bg.advance = xadvance;
                        }
                        bg.lineHeight = bg.offsetY < 0 ? bg.height : bg.offsetY + bg.height;
                        if (size > 0 && bg.lineHeight < size)
                            bg.lineHeight = size;
                    }
                    font.glyphs[String.fromCharCode(+kv.id | 0)] = bg;
                }
                else if (str == 'info') {
                    ttf = kv.face != null;
                    if (kv.size)
                        size = parseInt(kv.size);
                    resizable = kv.resizable == 'true';
                    colorable = kv.colored == 'true';
                    if (ttf) {
                        let cfg = this.$atlasConfigs[item.id];
                        if (cfg != null) {
                            atlasOffsetX = cfg.frame.x;
                            atlasOffsetY = cfg.frame.y;
                            let atlasItem = this.$itemsById[cfg.atlasName];
                            if (atlasItem != null)
                                mainTexture = this.getItemAsset(atlasItem);
                        }
                    }
                }
                else if (str == 'common') {
                    if (kv.lineHeight)
                        lineHeight = parseInt(kv.lineHeight);
                    if (size == 0)
                        size = lineHeight;
                    else if (lineHeight == 0)
                        lineHeight = size;
                    if (kv.xadvance)
                        xadvance = parseInt(kv.xadvance);
                }
            }
        });
        if (size == 0 && maxCharHeight > 0)
            size = maxCharHeight;
        font.ttf = ttf;
        font.size = size;
        font.resizable = resizable;
        font.colorable = colorable;
        item.bitmapFont = font;
    }
    loadAudio(item) {
        let fileName = item.file != null && item.file.length > 0 ? item.file : `${item.id}.mp3`;
        let resName = `${this.$resKey}@${StringUtil.getFileName(fileName)}`;
        let sound = AssetLoader.resourcesPool[resName];
        if (sound) {
            item.sound = createjs.Sound.play(resName);
        }
        else {
            console.log("Resource '" + item.file + "' not found, please loadManifest first!");
        }
    }
}
/**@internal */
UIPackage.$constructingObjects = 0;
UIPackage.$packageInstById = {};
UIPackage.$packageInstByName = {};
UIPackage.$bitmapFonts = {};
UIPackage.$stringsSource = null;
UIPackage.sep0 = ',';
UIPackage.sep1 = '\n';
UIPackage.sep2 = ' ';
UIPackage.sep3 = '=';
let Decls = {};

class GearLook extends GearBase {
    constructor(owner) {
        super(owner);
    }
    init() {
        this.$default = new GearLookValue(this.$owner.alpha, this.$owner.rotation, this.$owner.grayed);
        this.$storage = {};
    }
    addStatus(pageId, value) {
        if (value == '-')
            return;
        let arr = value.split(',');
        let gv;
        if (pageId == null)
            gv = this.$default;
        else {
            gv = new GearLookValue();
            this.$storage[pageId] = gv;
        }
        gv.alpha = parseFloat(arr[0]);
        gv.rotation = parseInt(arr[1]);
        gv.grayed = arr[2] == '1' ? true : false;
    }
    apply() {
        let gv = this.$storage[this.$controller.selectedPageId];
        if (!gv)
            gv = this.$default;
        if (this.$tween && !UIPackage.$constructingObjects && !GearBase.disableAllTweenEffect) {
            this.$owner.$gearLocked = true;
            this.$owner.grayed = gv.grayed;
            this.$owner.$gearLocked = false;
            if (this.$tweener) {
                if (this.$tweenTarget.alpha === gv.alpha && this.$tweenTarget.rotation === gv.rotation)
                    return;
                this.$tweener.gotoAndStop(this.$tweener.duration); //set to end
                this.$tweener = null;
            }
            let a = gv.alpha != this.$owner.alpha;
            let b = gv.rotation != this.$owner.rotation;
            if (a || b) {
                if (this.$owner.hasGearController(0, this.$controller))
                    this.$lockToken = this.$owner.lockGearDisplay();
                this.$tweenTarget = gv;
                let vars = {
                    onChange: () => {
                        this.$owner.$gearLocked = true;
                        if (a)
                            this.$owner.alpha = this.$tweenValue.x;
                        if (b)
                            this.$owner.rotation = this.$tweenValue.y;
                        this.$owner.$gearLocked = false;
                    }
                };
                if (this.$tweenValue == null)
                    this.$tweenValue = new createjs.Point();
                this.$tweenValue.x = this.$owner.alpha;
                this.$tweenValue.y = this.$owner.rotation;
                this.$tweener = createjs.Tween.get(this.$tweenValue, vars)
                    .wait(this.$tweenDelay * 1000)
                    .to({ x: gv.alpha, y: gv.rotation }, this.$tweenTime * 1000, this.$easeType)
                    .call(this.tweenComplete, null, this);
            }
        }
        else {
            this.$owner.$gearLocked = true;
            this.$owner.grayed = gv.grayed;
            this.$owner.alpha = gv.alpha;
            this.$owner.rotation = gv.rotation;
            this.$owner.$gearLocked = false;
        }
    }
    tweenComplete() {
        if (this.$lockToken != 0) {
            this.$owner.releaseGearDisplay(this.$lockToken);
            this.$lockToken = 0;
        }
        this.$tweener = null;
        let evt = new createjs.Event("__gearStop" /* GEAR_STOP */, true, false);
        this.$owner.dispatchEvent(evt, this);
    }
    updateState() {
        if (this.$controller == null || this.$owner.$gearLocked || this.$owner.$inProgressBuilding)
            return;
        let gv = this.$storage[this.$controller.selectedPageId];
        if (!gv) {
            gv = new GearLookValue();
            this.$storage[this.$controller.selectedPageId] = gv;
        }
        gv.alpha = this.$owner.alpha;
        gv.rotation = this.$owner.rotation;
        gv.grayed = this.$owner.grayed;
    }
}
class GearLookValue {
    constructor(alpha = 0, rotation = 0, grayed = false) {
        this.alpha = alpha;
        this.rotation = rotation;
        this.grayed = grayed;
    }
}

class GearSize extends GearBase {
    constructor(owner) {
        super(owner);
    }
    init() {
        this.$default = new GearSizeValue(this.$owner.width, this.$owner.height, this.$owner.scaleX, this.$owner.scaleY);
        this.$storage = {};
    }
    addStatus(pageId, value) {
        if (value == '-')
            return;
        let arr = value.split(',');
        let gv;
        if (pageId == null)
            gv = this.$default;
        else {
            gv = new GearSizeValue();
            this.$storage[pageId] = gv;
        }
        gv.width = parseInt(arr[0]);
        gv.height = parseInt(arr[1]);
        if (arr.length > 2) {
            gv.scaleX = parseFloat(arr[2]);
            gv.scaleY = parseFloat(arr[3]);
        }
    }
    apply() {
        let gv = this.$storage[this.$controller.selectedPageId];
        if (!gv)
            gv = this.$default;
        if (this.$tween && !UIPackage.$constructingObjects && !GearBase.disableAllTweenEffect) {
            if (this.$tweener) {
                if (this.$tweenTarget.width != gv.width ||
                    this.$tweenTarget.height != gv.height ||
                    this.$tweenTarget.scaleX != gv.scaleX ||
                    this.$tweenTarget.scaleY != gv.scaleY) {
                    this.$tweener.gotoAndStop(this.$tweener.duration); //set to end
                    this.$tweener = null;
                }
                else
                    return;
            }
            let a = gv.width != this.$owner.width || gv.height != this.$owner.height;
            let b = gv.scaleX != this.$owner.scaleX || gv.scaleY != this.$owner.scaleY;
            if (a || b) {
                if (this.$owner.hasGearController(0, this.$controller))
                    this.$lockToken = this.$owner.lockGearDisplay();
                this.$tweenTarget = gv;
                let vars = {
                    onChange: () => {
                        this.$owner.$gearLocked = true;
                        if (a)
                            this.$owner.setSize(this.$tweenValue.width, this.$tweenValue.height, this.$owner.gearXY.controller == this.$controller);
                        if (b)
                            this.$owner.setScale(this.$tweenValue.scaleX, this.$tweenValue.scaleY);
                        this.$owner.$gearLocked = false;
                    }
                };
                if (this.$tweenValue == null)
                    this.$tweenValue = new GearSizeValue();
                this.$tweenValue.width = this.$owner.width;
                this.$tweenValue.height = this.$owner.height;
                this.$tweenValue.scaleX = this.$owner.scaleX;
                this.$tweenValue.scaleY = this.$owner.scaleY;
                this.$tweener = createjs.Tween.get(this.$tweenValue, vars)
                    .wait(this.$tweenDelay * 1000)
                    .to({ width: gv.width, height: gv.height, scaleX: gv.scaleX, scaleY: gv.scaleY }, this.$tweenTime * 1000, this.$easeType)
                    .call(this.tweenComplete, null, this);
            }
        }
        else {
            this.$owner.$gearLocked = true;
            this.$owner.setSize(gv.width, gv.height, this.$owner.gearXY.controller == this.$controller);
            this.$owner.setScale(gv.scaleX, gv.scaleY);
            this.$owner.$gearLocked = false;
        }
    }
    tweenComplete() {
        if (this.$lockToken != 0) {
            this.$owner.releaseGearDisplay(this.$lockToken);
            this.$lockToken = 0;
        }
        this.$tweener = null;
        let evt = new createjs.Event("__gearStop" /* GEAR_STOP */, true, false);
        this.$owner.dispatchEvent(evt, this);
    }
    updateState() {
        if (this.$controller == null || this.$owner.$gearLocked || this.$owner.$inProgressBuilding)
            return;
        let gv = this.$storage[this.$controller.selectedPageId];
        if (!gv) {
            gv = new GearSizeValue();
            this.$storage[this.$controller.selectedPageId] = gv;
        }
        gv.width = this.$owner.width;
        gv.height = this.$owner.height;
        gv.scaleX = this.$owner.scaleX;
        gv.scaleY = this.$owner.scaleY;
    }
    updateFromRelations(dx, dy) {
        if (this.$controller == null || this.$storage == null)
            return;
        for (let key in this.$storage) {
            let gv = this.$storage[key];
            gv.width += dx;
            gv.height += dy;
        }
        this.$default.width += dx;
        this.$default.height += dy;
        this.updateState();
    }
}
class GearSizeValue {
    constructor(width = 0, height = 0, scaleX = 0, scaleY = 0) {
        this.width = width;
        this.height = height;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }
}

class GearXY extends GearBase {
    constructor(owner) {
        super(owner);
    }
    init() {
        this.$default = new createjs.Point(this.$owner.x, this.$owner.y);
        this.$storage = {};
    }
    addStatus(pageId, value) {
        if (value == '-')
            return;
        let arr = value.split(',');
        let pt;
        if (pageId == null)
            pt = this.$default;
        else {
            pt = new createjs.Point();
            this.$storage[pageId] = pt;
        }
        pt.x = parseInt(arr[0]);
        pt.y = parseInt(arr[1]);
    }
    apply() {
        let pt = this.$storage[this.$controller.selectedPageId];
        if (!pt)
            pt = this.$default;
        if (this.$tween && !UIPackage.$constructingObjects && !GearBase.disableAllTweenEffect) {
            if (this.$tweener) {
                if (this.$tweenTarget.x === pt.x && this.$tweenTarget.y === pt.y)
                    return;
                this.$tweener.gotoAndStop(this.$tweener.duration); //set to end
                this.$tweener = null;
            }
            if (this.$owner.x != pt.x || this.$owner.y != pt.y) {
                this.$owner.hasGearController(0, this.$controller);
                this.$lockToken = this.$owner.lockGearDisplay();
                this.$tweenTarget = pt;
                let vars = {
                    onChange: () => {
                        this.$owner.$gearLocked = true;
                        this.$owner.setXY(this.$tweenValue.x, this.$tweenValue.y);
                        this.$owner.$gearLocked = false;
                    }
                };
                if (this.$tweenValue == null)
                    this.$tweenValue = new createjs.Point();
                this.$tweenValue.x = this.$owner.x;
                this.$tweenValue.y = this.$owner.y;
                this.$tweener = createjs.Tween.get(this.$tweenValue, vars)
                    .wait(this.$tweenDelay * 1000)
                    .to({ x: pt.x, y: pt.y }, this.$tweenTime * 1000, this.$easeType)
                    .call(this.tweenComplete, null, this);
            }
        }
        else {
            this.$owner.$gearLocked = true;
            this.$owner.setXY(pt.x, pt.y);
            this.$owner.$gearLocked = false;
        }
    }
    tweenComplete() {
        if (this.$lockToken != 0) {
            this.$owner.releaseGearDisplay(this.$lockToken);
            this.$lockToken = 0;
        }
        this.$tweener = null;
        let evt = new createjs.Event("__gearStop" /* GEAR_STOP */, true, false);
        this.$owner.dispatchEvent(evt, this);
    }
    updateState() {
        if (this.$controller == null || this.$owner.$gearLocked || this.$owner.$inProgressBuilding)
            return;
        let pt = this.$storage[this.$controller.selectedPageId];
        if (!pt) {
            pt = new createjs.Point();
            this.$storage[this.$controller.selectedPageId] = pt;
        }
        pt.x = this.$owner.x;
        pt.y = this.$owner.y;
    }
    updateFromRelations(dx, dy) {
        if (this.$controller == null || this.$storage == null)
            return;
        for (let key in this.$storage) {
            let pt = this.$storage[key];
            pt.x += dx;
            pt.y += dy;
        }
        this.$default.x += dx;
        this.$default.y += dy;
        this.updateState();
    }
}

let isUIObject = function (obj) {
    return obj && 'UIOwner' in obj && obj.UIOwner != null;
};

class RelationDef {
    copyFrom(source) {
        this.percent = source.percent;
        this.type = source.type;
    }
}
class RelationItem {
    constructor(owner) {
        this.$owner = owner;
        this.$defs = [];
    }
    get owner() {
        return this.$owner;
    }
    set target(value) {
        if (this.$target != value) {
            if (this.$target)
                this.releaseRefTarget(this.$target);
            this.$target = value;
            if (this.$target)
                this.addRefTarget(this.$target);
        }
    }
    get target() {
        return this.$target;
    }
    add(relationType, usePercent) {
        if (relationType == 24 /* Size */) {
            this.add(14 /* Width */, usePercent);
            this.add(15 /* Height */, usePercent);
            return;
        }
        let length = this.$defs.length;
        for (let i = 0; i < length; i++) {
            let def = this.$defs[i];
            if (def.type == relationType)
                return;
        }
        this.internalAdd(relationType, usePercent);
    }
    internalAdd(relationType, usePercent) {
        if (relationType == 24 /* Size */) {
            this.internalAdd(14 /* Width */, usePercent);
            this.internalAdd(15 /* Height */, usePercent);
            return;
        }
        let info = new RelationDef();
        info.percent = usePercent;
        info.type = relationType;
        this.$defs.push(info);
        //CENTER relation will cause float pixel, so enable the auto-pixel-snapping here
        if (usePercent ||
            relationType == 1 /* Left_Center */ ||
            relationType == 3 /* Center_Center */ ||
            relationType == 5 /* Right_Center */ ||
            relationType == 8 /* Top_Middle */ ||
            relationType == 10 /* Middle_Middle */ ||
            relationType == 12 /* Bottom_Middle */) {
            this.$owner.pixelSnapping = true;
        }
    }
    remove(relationType = 0) {
        if (relationType == 24 /* Size */) {
            this.remove(14 /* Width */);
            this.remove(15 /* Height */);
            return;
        }
        let dc = this.$defs.length;
        for (let k = dc - 1; k >= 0; k--) {
            if (this.$defs[k].type == relationType) {
                this.$defs.splice(k, 1);
                break;
            }
        }
    }
    copyFrom(source) {
        this.target = source.target;
        this.$defs.length = 0;
        source.$defs.forEach(info => {
            let info2 = new RelationDef();
            info2.copyFrom(info);
            this.$defs.push(info2);
        }, this);
    }
    dispose() {
        if (this.$target != null) {
            this.releaseRefTarget(this.$target);
            this.$target = null;
        }
    }
    get isEmpty() {
        return this.$defs.length == 0;
    }
    applyOnSelfResized(dWidth, dHeight) {
        let ox = this.$owner.x;
        let oy = this.$owner.y;
        this.$defs.forEach(info => {
            switch (info.type) {
                case 3 /* Center_Center */:
                case 5 /* Right_Center */:
                    this.$owner.x -= dWidth / 2;
                    break;
                case 4 /* Right_Left */:
                case 6 /* Right_Right */:
                    this.$owner.x -= dWidth;
                    break;
                case 10 /* Middle_Middle */:
                case 12 /* Bottom_Middle */:
                    this.$owner.y -= dHeight / 2;
                    break;
                case 11 /* Bottom_Top */:
                case 13 /* Bottom_Bottom */:
                    this.$owner.y -= dHeight;
                    break;
            }
        }, this);
        if (ox != this.$owner.x || oy != this.$owner.y) {
            ox = this.$owner.x - ox;
            oy = this.$owner.y - oy;
            this.$owner.updateGearFromRelations(1 /* XY */, ox, oy);
            if (this.$owner.parent != null && this.$owner.parent.$transitions.length > 0) {
                this.$owner.parent.$transitions.forEach(t => {
                    t.updateFromRelations(this.$owner.id, ox, oy);
                }, this);
            }
        }
    }
    applyOnXYChanged(info, dx, dy) {
        let tmp;
        switch (info.type) {
            case 0 /* Left_Left */:
            case 1 /* Left_Center */:
            case 2 /* Left_Right */:
            case 3 /* Center_Center */:
            case 4 /* Right_Left */:
            case 5 /* Right_Center */:
            case 6 /* Right_Right */:
                this.$owner.x += dx;
                break;
            case 7 /* Top_Top */:
            case 8 /* Top_Middle */:
            case 9 /* Top_Bottom */:
            case 10 /* Middle_Middle */:
            case 11 /* Bottom_Top */:
            case 12 /* Bottom_Middle */:
            case 13 /* Bottom_Bottom */:
                this.$owner.y += dy;
                break;
            case 14 /* Width */:
            case 15 /* Height */:
                break;
            case 16 /* LeftExt_Left */:
            case 17 /* LeftExt_Right */:
                tmp = this.$owner.x;
                this.$owner.x += dx;
                this.$owner.width = this.$owner.$rawWidth - (this.$owner.x - tmp);
                break;
            case 18 /* RightExt_Left */:
            case 19 /* RightExt_Right */:
                this.$owner.width = this.$owner.$rawWidth + dx;
                break;
            case 20 /* TopExt_Top */:
            case 21 /* TopExt_Bottom */:
                tmp = this.$owner.y;
                this.$owner.y += dy;
                this.$owner.height = this.$owner.$rawHeight - (this.$owner.y - tmp);
                break;
            case 22 /* BottomExt_Top */:
            case 23 /* BottomExt_Bottom */:
                this.$owner.height = this.$owner.$rawHeight + dy;
                break;
        }
    }
    applyOnSizeChanged(info) {
        let targetX, targetY;
        if (this.$target != this.$owner.parent) {
            targetX = this.$target.x;
            targetY = this.$target.y;
        }
        else {
            targetX = 0;
            targetY = 0;
        }
        let v, tmp;
        switch (info.type) {
            case 0 /* Left_Left */:
                break;
            case 1 /* Left_Center */:
                v = this.$owner.x - (targetX + this.$targetWidth / 2);
                if (info.percent)
                    v = (v / this.$targetWidth) * this.$target.$rawWidth;
                this.$owner.x = targetX + this.$target.$rawWidth / 2 + v;
                break;
            case 2 /* Left_Right */:
                v = this.$owner.x - (targetX + this.$targetWidth);
                if (info.percent)
                    v = (v / this.$targetWidth) * this.$target.$rawWidth;
                this.$owner.x = targetX + this.$target.$rawWidth + v;
                break;
            case 3 /* Center_Center */:
                v = this.$owner.x + this.$owner.$rawWidth / 2 - (targetX + this.$targetWidth / 2);
                if (info.percent)
                    v = (v / this.$targetWidth) * this.$target.$rawWidth;
                this.$owner.x = targetX + this.$target.$rawWidth / 2 + v - this.$owner.$rawWidth / 2;
                break;
            case 4 /* Right_Left */:
                v = this.$owner.x + this.$owner.$rawWidth - targetX;
                if (info.percent)
                    v = (v / this.$targetWidth) * this.$target.$rawWidth;
                this.$owner.x = targetX + v - this.$owner.$rawWidth;
                break;
            case 5 /* Right_Center */:
                v = this.$owner.x + this.$owner.$rawWidth - (targetX + this.$targetWidth / 2);
                if (info.percent)
                    v = (v / this.$targetWidth) * this.$target.$rawWidth;
                this.$owner.x = targetX + this.$target.$rawWidth / 2 + v - this.$owner.$rawWidth;
                break;
            case 6 /* Right_Right */:
                v = this.$owner.x + this.$owner.$rawWidth - (targetX + this.$targetWidth);
                if (info.percent)
                    v = (v / this.$targetWidth) * this.$target.$rawWidth;
                this.$owner.x = targetX + this.$target.$rawWidth + v - this.$owner.$rawWidth;
                break;
            case 7 /* Top_Top */:
                break;
            case 8 /* Top_Middle */:
                v = this.$owner.y - (targetY + this.$targetHeight / 2);
                if (info.percent)
                    v = (v / this.$targetHeight) * this.$target.$rawHeight;
                this.$owner.y = targetY + this.$target.$rawHeight / 2 + v;
                break;
            case 9 /* Top_Bottom */:
                v = this.$owner.y - (targetY + this.$targetHeight);
                if (info.percent)
                    v = (v / this.$targetHeight) * this.$target.$rawHeight;
                this.$owner.y = targetY + this.$target.$rawHeight + v;
                break;
            case 10 /* Middle_Middle */:
                v = this.$owner.y + this.$owner.$rawHeight / 2 - (targetY + this.$targetHeight / 2);
                if (info.percent)
                    v = (v / this.$targetHeight) * this.$target.$rawHeight;
                this.$owner.y = targetY + this.$target.$rawHeight / 2 + v - this.$owner.$rawHeight / 2;
                break;
            case 11 /* Bottom_Top */:
                v = this.$owner.y + this.$owner.$rawHeight - targetY;
                if (info.percent)
                    v = (v / this.$targetHeight) * this.$target.$rawHeight;
                this.$owner.y = targetY + v - this.$owner.$rawHeight;
                break;
            case 12 /* Bottom_Middle */:
                v = this.$owner.y + this.$owner.$rawHeight - (targetY + this.$targetHeight / 2);
                if (info.percent)
                    v = (v / this.$targetHeight) * this.$target.$rawHeight;
                this.$owner.y = targetY + this.$target.$rawHeight / 2 + v - this.$owner.$rawHeight;
                break;
            case 13 /* Bottom_Bottom */:
                v = this.$owner.y + this.$owner.$rawHeight - (targetY + this.$targetHeight);
                if (info.percent)
                    v = (v / this.$targetHeight) * this.$target.$rawHeight;
                this.$owner.y = targetY + this.$target.$rawHeight + v - this.$owner.$rawHeight;
                break;
            case 14 /* Width */:
                if (this.$owner.$inProgressBuilding && this.$owner == this.$target.parent)
                    v = this.$owner.sourceWidth - this.$target.$initWidth;
                else
                    v = this.$owner.$rawWidth - this.$targetWidth;
                if (info.percent)
                    v = (v / this.$targetWidth) * this.$target.$rawWidth;
                if (this.$target == this.$owner.parent)
                    this.$owner.setSize(this.$target.$rawWidth + v, this.$owner.$rawHeight, true);
                else
                    this.$owner.width = this.$target.$rawWidth + v;
                break;
            case 15 /* Height */:
                if (this.$owner.$inProgressBuilding && this.$owner == this.$target.parent)
                    v = this.$owner.sourceHeight - this.$target.$initHeight;
                else
                    v = this.$owner.$rawHeight - this.$targetHeight;
                if (info.percent)
                    v = (v / this.$targetHeight) * this.$target.$rawHeight;
                if (this.$target == this.$owner.parent)
                    this.$owner.setSize(this.$owner.$rawWidth, this.$target.$rawHeight + v, true);
                else
                    this.$owner.height = this.$target.$rawHeight + v;
                break;
            case 16 /* LeftExt_Left */:
                break;
            case 17 /* LeftExt_Right */:
                v = this.$owner.x - (targetX + this.$targetWidth);
                if (info.percent)
                    v = (v / this.$targetWidth) * this.$target.$rawWidth;
                tmp = this.$owner.x;
                this.$owner.x = targetX + this.$target.$rawWidth + v;
                this.$owner.width = this.$owner.$rawWidth - (this.$owner.x - tmp);
                break;
            case 18 /* RightExt_Left */:
                break;
            case 19 /* RightExt_Right */:
                if (this.$owner.$inProgressBuilding && this.$owner == this.$target.parent)
                    v = this.$owner.sourceWidth - (targetX + this.$target.$initWidth);
                else
                    v = this.$owner.width - (targetX + this.$targetWidth);
                if (this.$owner != this.$target.parent)
                    v += this.$owner.x;
                if (info.percent)
                    v = (v / this.$targetWidth) * this.$target.$rawWidth;
                if (this.$owner != this.$target.parent)
                    this.$owner.width = targetX + this.$target.$rawWidth + v - this.$owner.x;
                else
                    this.$owner.width = targetX + this.$target.$rawWidth + v;
                break;
            case 20 /* TopExt_Top */:
                break;
            case 21 /* TopExt_Bottom */:
                v = this.$owner.y - (targetY + this.$targetHeight);
                if (info.percent)
                    v = (v / this.$targetHeight) * this.$target.$rawHeight;
                tmp = this.$owner.y;
                this.$owner.y = targetY + this.$target.$rawHeight + v;
                this.$owner.height = this.$owner.$rawHeight - (this.$owner.y - tmp);
                break;
            case 22 /* BottomExt_Top */:
                break;
            case 23 /* BottomExt_Bottom */:
                if (this.$owner.$inProgressBuilding && this.$owner == this.$target.parent)
                    v = this.$owner.sourceHeight - (targetY + this.$target.$initHeight);
                else
                    v = this.$owner.$rawHeight - (targetY + this.$targetHeight);
                if (this.$owner != this.$target.parent)
                    v += this.$owner.y;
                if (info.percent)
                    v = (v / this.$targetHeight) * this.$target.$rawHeight;
                if (this.$owner != this.$target.parent)
                    this.$owner.height = targetY + this.$target.$rawHeight + v - this.$owner.y;
                else
                    this.$owner.height = targetY + this.$target.$rawHeight + v;
                break;
        }
    }
    addRefTarget(target) {
        if (target != this.$owner.parent)
            target.on("__xyChanged" /* XY_CHANGED */, this.$targetXYChanged, this);
        target.on("__sizeChanged" /* SIZE_CHANGED */, this.$targetSizeChanged, this);
        target.on("__sizeDelayChange" /* SIZE_DELAY_CHANGE */, this.$targetSizeWillChange, this);
        this.$targetX = this.$target.x;
        this.$targetY = this.$target.y;
        this.$targetWidth = this.$target.$rawWidth;
        this.$targetHeight = this.$target.$rawHeight;
    }
    releaseRefTarget(target) {
        target.off("__xyChanged" /* XY_CHANGED */, this.$targetXYChanged);
        target.off("__sizeChanged" /* SIZE_CHANGED */, this.$targetSizeChanged);
        target.off("__sizeDelayChange" /* SIZE_DELAY_CHANGE */, this.$targetSizeWillChange);
    }
    $targetXYChanged(evt) {
        if (this.$owner.relations.$dealing != null ||
            (this.$owner.group != null && this.$owner.group.$updating)) {
            this.$targetX = this.$target.x;
            this.$targetY = this.$target.y;
            return;
        }
        this.$owner.relations.$dealing = this.$target;
        let ox = this.$owner.x;
        let oy = this.$owner.y;
        let dx = this.$target.x - this.$targetX;
        let dy = this.$target.y - this.$targetY;
        this.$defs.forEach(info => {
            this.applyOnXYChanged(info, dx, dy);
        }, this);
        this.$targetX = this.$target.x;
        this.$targetY = this.$target.y;
        if (ox != this.$owner.x || oy != this.$owner.y) {
            ox = this.$owner.x - ox;
            oy = this.$owner.y - oy;
            this.$owner.updateGearFromRelations(1 /* XY */, ox, oy);
            if (this.$owner.parent != null && this.$owner.parent.$transitions.length > 0) {
                this.$owner.parent.$transitions.forEach(t => {
                    t.updateFromRelations(this.$owner.id, ox, oy);
                }, this);
            }
        }
        this.$owner.relations.$dealing = null;
    }
    $targetSizeChanged(evt) {
        if (this.$owner.relations.$dealing != null)
            return;
        this.$owner.relations.$dealing = this.$target;
        let ox = this.$owner.x;
        let oy = this.$owner.y;
        let ow = this.$owner.$rawWidth;
        let oh = this.$owner.$rawHeight;
        this.$defs.forEach(info => {
            this.applyOnSizeChanged(info);
        }, this);
        this.$targetWidth = this.$target.$rawWidth;
        this.$targetHeight = this.$target.$rawHeight;
        if (ox != this.$owner.x || oy != this.$owner.y) {
            ox = this.$owner.x - ox;
            oy = this.$owner.y - oy;
            this.$owner.updateGearFromRelations(1 /* XY */, ox, oy);
            if (this.$owner.parent != null && this.$owner.parent.$transitions.length > 0) {
                this.$owner.parent.$transitions.forEach(t => {
                    t.updateFromRelations(this.$owner.id, ox, oy);
                }, this);
            }
        }
        if (ow != this.$owner.$rawWidth || oh != this.$owner.$rawHeight) {
            ow = this.$owner.$rawWidth - ow;
            oh = this.$owner.$rawHeight - oh;
            this.$owner.updateGearFromRelations(2 /* Size */, ow, oh);
        }
        this.$owner.relations.$dealing = null;
    }
    $targetSizeWillChange(evt) {
        this.$owner.relations.sizeDirty = true;
    }
}

class Relations {
    constructor(owner) {
        this.sizeDirty = false;
        this.$owner = owner;
        this.$items = [];
    }
    add(target, relationType, usePercent = false) {
        let length = this.$items.length;
        for (let i = 0; i < length; i++) {
            let item = this.$items[i];
            if (item.target == target) {
                item.add(relationType, usePercent);
                return;
            }
        }
        let newItem = new RelationItem(this.$owner);
        newItem.target = target;
        newItem.add(relationType, usePercent);
        this.$items.push(newItem);
    }
    addItems(target, sidePairs) {
        let arr = sidePairs.split(',');
        let s;
        let usePercent;
        for (let i = 0; i < 2; i++) {
            s = arr[i];
            if (!s)
                continue;
            if (s.charAt(s.length - 1) == '%') {
                s = s.substr(0, s.length - 1);
                usePercent = true;
            }
            else
                usePercent = false;
            if (s.indexOf('-') == -1)
                s = `${s}-${s}`;
            let t = Relations.RELATION_NAMES.indexOf(s);
            if (t == -1)
                throw new Error('Invalid relation type');
            this.add(target, t, usePercent);
        }
    }
    remove(target, relationType = 0) {
        let cnt = this.$items.length;
        let i = 0;
        while (i < cnt) {
            let item = this.$items[i];
            if (item.target == target) {
                item.remove(relationType);
                if (item.isEmpty) {
                    item.dispose();
                    this.$items.splice(i, 1);
                    cnt--;
                }
                else
                    i++;
            }
            else
                i++;
        }
    }
    contains(target) {
        let length = this.$items.length;
        for (let i = 0; i < length; i++) {
            if (this.$items[i].target == target)
                return true;
        }
        return false;
    }
    clearFor(target) {
        let cnt = this.$items.length;
        let i = 0;
        while (i < cnt) {
            let item = this.$items[i];
            if (item.target == target) {
                item.dispose();
                this.$items.splice(i, 1);
                cnt--;
            }
            else
                i++;
        }
    }
    clearAll() {
        this.$items.forEach(item => {
            item.dispose();
        }, this);
        this.$items.length = 0;
    }
    copyFrom(source) {
        this.clearAll();
        source.$items.forEach(ri => {
            let item = new RelationItem(this.$owner);
            item.copyFrom(ri);
            this.$items.push(item);
        }, this);
    }
    dispose() {
        this.clearAll();
    }
    onOwnerSizeChanged(dWidth, dHeight) {
        if (this.$items.length <= 0)
            return;
        this.$items.forEach(item => {
            item.applyOnSelfResized(dWidth, dHeight);
        }, this);
    }
    ensureRelationsSizeCorrect() {
        if (this.$items.length == 0)
            return;
        this.sizeDirty = false;
        this.$items.forEach(item => {
            item.target.ensureSizeCorrect();
        }, this);
    }
    get empty() {
        return this.$items.length == 0;
    }
    setup(xml) {
        xml.children.forEach(cxml => {
            if (cxml.nodeName != 'relation')
                return;
            let targetId;
            let target;
            targetId = cxml.attributes.target;
            if (this.$owner.parent) {
                if (targetId)
                    target = this.$owner.parent.getChildById(targetId);
                else
                    target = this.$owner.parent;
            }
            else {
                //call from the component's constructor
                target = this.$owner.getChildById(targetId);
            }
            if (target)
                this.addItems(target, cxml.attributes.sidePair);
        }, this);
    }
}
Relations.RELATION_NAMES = [
    'left-left',
    'left-center',
    'left-right',
    'center-center',
    'right-left',
    'right-center',
    'right-right',
    'top-top',
    'top-middle',
    'top-bottom',
    'middle-middle',
    'bottom-top',
    'bottom-middle',
    'bottom-bottom',
    'width-width',
    'height-height',
    'leftext-left',
    'leftext-right',
    'rightext-left',
    'rightext-right',
    'topext-top',
    'topext-bottom',
    'bottomext-top',
    'bottomext-bottom' //23
];

let isColorGear = function (obj) {
    return obj && "color" in obj;
};

class GearColor extends GearBase {
    constructor(owner) {
        super(owner);
        this.$default = '#ffffff';
    }
    init() {
        this.$default = this.$owner['color'];
        this.$storage = {};
    }
    addStatus(pageId, value) {
        if (value == '-')
            return;
        let col = value;
        if (pageId == null)
            this.$default = col;
        else
            this.$storage[pageId] = col;
    }
    apply() {
        this.$owner.$gearLocked = true;
        let data = this.$storage[this.$controller.selectedPageId];
        if (data != undefined)
            this.$owner['color'] = StringUtil.HEX2RGB(data);
        else
            this.$owner['color'] = StringUtil.HEX2RGB(this.$default);
        this.$owner.$gearLocked = false;
    }
    updateState() {
        if (this.$controller == null || this.$owner.$gearLocked || this.$owner.$inProgressBuilding)
            return;
        this.$storage[this.$controller.selectedPageId] = this.$owner['color'];
    }
}

let isAnimationGear = function (obj) {
    return obj && "playing" in obj && "frame" in obj;
};

class GearAnimation extends GearBase {
    constructor(owner) {
        super(owner);
    }
    init() {
        this.$default = new GearAnimationValue(this.$owner['playing'], this.$owner['frame']);
        this.$storage = {};
    }
    addStatus(pageId, value) {
        if (value == '-')
            return;
        let gv;
        if (pageId == null)
            gv = this.$default;
        else {
            gv = new GearAnimationValue();
            this.$storage[pageId] = gv;
        }
        let arr = value.split(',');
        gv.frame = parseInt(arr[0]);
        gv.playing = arr[1] == 'p';
    }
    apply() {
        this.$owner.$gearLocked = true;
        let gv = this.$storage[this.$controller.selectedPageId];
        if (!gv)
            gv = this.$default;
        this.$owner['frame'] = gv.frame;
        this.$owner['playing'] = gv.playing;
        this.$owner.$gearLocked = false;
    }
    updateState() {
        if (this.$controller == null || this.$owner.$gearLocked || this.$owner.$inProgressBuilding)
            return;
        let gv = this.$storage[this.$controller.selectedPageId];
        if (!gv) {
            gv = new GearAnimationValue();
            this.$storage[this.$controller.selectedPageId] = gv;
        }
        gv.frame = this.$owner['frame'];
        gv.playing = this.$owner['playing'];
    }
}
class GearAnimationValue {
    constructor(playing = true, frame = 0) {
        this.playing = playing;
        this.frame = frame;
    }
}

class Sprite extends createjs.DisplayObject {
    constructor() {
        super();
        this.$tint = '#fff';
        this.$isTrim = false;
    }
    get tint() {
        return this.$tint;
    }
    set tint(v) {
        this.$tint = v;
        let rgb = v.split(',');
        this.filters = [
            new createjs.ColorFilter(+rgb[0] / 255, +rgb[1] / 255, +rgb[2] / 255, 1, 0, 0, 0, 1)
        ];
    }
    set sourceRect(rect) {
        this.$sourceRect = rect;
    }
    get sourceRect() {
        return this.$sourceRect;
    }
    set textureRect(rect) {
        this.$textureRect = rect;
    }
    get textureRect() {
        return this.$textureRect;
    }
    isVisible() {
        var hasContent = this.cacheCanvas ||
            (this.texture &&
                (this.texture['naturalWidth'] ||
                    this.texture['getContext'] ||
                    this.texture['readyState'] >= 2));
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
    }
    getBounds() {
        var rect = super.getBounds();
        if (rect) {
            return rect;
        }
        var texture = this.texture, o = this.sourceRect || texture;
        var hasContent = texture && (texture['naturalWidth'] || texture['getContext'] || texture['readyState'] >= 2);
        return hasContent ? this.sourceRect.setValues(0, 0, o.width, o.height) : null;
    }
    destroy() {
        //todo
    }
}
Sprite.$cachedTexturePool = {};

class GearIcon extends GearBase {
    constructor(owner) {
        super(owner);
    }
    init() {
        this.$default = this.$owner.icon;
        this.$storage = {};
    }
    addStatus(pageId, value) {
        if (pageId == null)
            this.$default = value;
        else
            this.$storage[pageId] = value;
    }
    apply() {
        this.$owner.$gearLocked = true;
        let data = this.$storage[this.$controller.selectedPageId];
        if (data != undefined)
            this.$owner.icon = data;
        else
            this.$owner.icon = this.$default;
        this.$owner.$gearLocked = false;
    }
    updateState() {
        if (this.$controller == null || this.$owner.$gearLocked || this.$owner.$inProgressBuilding)
            return;
        this.$storage[this.$controller.selectedPageId] = this.$owner.icon;
    }
}

class GearText extends GearBase {
    constructor(owner) {
        super(owner);
    }
    init() {
        this.$default = this.$owner.text;
        this.$storage = {};
    }
    addStatus(pageId, value) {
        if (pageId == null)
            this.$default = value;
        else
            this.$storage[pageId] = value;
    }
    apply() {
        this.$owner.$gearLocked = true;
        let data = this.$storage[this.$controller.selectedPageId];
        if (data != undefined)
            this.$owner.text = data;
        else
            this.$owner.text = this.$default;
        this.$owner.$gearLocked = false;
    }
    updateState() {
        if (this.$controller == null || this.$owner.$gearLocked || this.$owner.$inProgressBuilding)
            return;
        this.$storage[this.$controller.selectedPageId] = this.$owner.text;
    }
}

class GObject extends createjs.EventDispatcher {
    constructor() {
        super();
        this.$x = 0;
        this.$y = 0;
        this.$width = 0;
        this.$height = 0;
        this.$alpha = 1;
        this.$rotation = 0;
        this.$visible = true;
        this.$touchable = true;
        this.$grayed = false;
        this.$draggable = false;
        this.$scaleX = 1;
        this.$scaleY = 1;
        this.$skewX = 0;
        this.$skewY = 0;
        this.$pivot = new createjs.Point();
        this.$pivotAsAnchor = false;
        this.$pivotOffset = new createjs.Point();
        this.$sortingOrder = 0;
        this.$internalVisible = true;
        this.$focusable = false;
        this.$pixelSnapping = false;
        this.$handlingController = false;
        this.$lastColorComponents = null;
        this.$displayEventMap = {};
        /**@internal */
        this.$rawWidth = 0;
        /**@internal */
        this.$rawHeight = 0;
        /**@internal */
        this.$initWidth = 0;
        /**@internal */
        this.$initHeight = 0;
        this.$sourceWidth = 0;
        this.$sourceHeight = 0;
        this.$id = `${GObject.gInstanceCounter++}`;
        this.$name = '';
        this.createDisplayObject();
        this.$relations = new Relations(this);
        this.$gears = [];
        this.$touchable = true;
    }
    get id() {
        return this.$id;
    }
    get name() {
        return this.$name;
    }
    set name(value) {
        this.$name = value;
    }
    get x() {
        return this.$x;
    }
    set x(value) {
        this.setXY(value, this.$y);
    }
    get y() {
        return this.$y;
    }
    set y(value) {
        this.setXY(this.$x, value);
    }
    setXY(xv, yv) {
        if (this.$x != xv || this.$y != yv) {
            this.$x = xv;
            this.$y = yv;
            this.handleXYChanged();
            this.updateGear(1 /* XY */);
            if (this.$parent) {
                this.$parent.setBoundsChangedFlag();
                let evt = new createjs.Event("__xyChanged" /* XY_CHANGED */, true, false);
                this.$displayObject.dispatchEvent(evt, this);
            }
            if (GObject.draggingObject == this && !GObject.sUpdatingWhileDragging)
                this.localToGlobalRect(0, 0, this.width, this.height, GObject.sGlobalRect);
        }
    }
    get pixelSnapping() {
        return this.$pixelSnapping;
    }
    set pixelSnapping(value) {
        if (this.$pixelSnapping != value) {
            this.$pixelSnapping = value;
            this.handleXYChanged();
        }
    }
    center(restraint = false) {
        let r;
        if (this.$parent != null)
            r = this.parent;
        else
            r = Decls$1.GRoot.inst;
        this.setXY((r.width - this.width) / 2, (r.height - this.height) / 2);
        if (restraint) {
            this.addRelation(r, 3 /* Center_Center */);
            this.addRelation(r, 10 /* Middle_Middle */);
        }
    }
    get width() {
        this.ensureSizeCorrect();
        if (this.$relations.sizeDirty)
            this.$relations.ensureRelationsSizeCorrect();
        return this.$width;
    }
    set width(value) {
        this.setSize(value, this.$rawHeight);
    }
    get height() {
        this.ensureSizeCorrect();
        if (this.$relations.sizeDirty)
            this.$relations.ensureRelationsSizeCorrect();
        return this.$height;
    }
    set height(value) {
        this.setSize(this.$rawWidth, value);
    }
    setSize(wv, hv, ignorePivot = false) {
        if (this.$rawWidth != wv || this.$rawHeight != hv) {
            this.$rawWidth = wv;
            this.$rawHeight = hv;
            wv = Math.max(0, wv);
            hv = Math.max(0, hv);
            let diffw = wv - this.mapPivotWidth(1);
            let diffh = hv - this.mapPivotHeight(1);
            this.$width = wv;
            this.$height = hv;
            this.handleSizeChanged();
            if (this.$pivot.x != 0 || this.$pivot.y != 0) {
                if (!this.$pivotAsAnchor) {
                    if (!ignorePivot)
                        this.setXY(this.x - this.$pivot.x * diffw, this.y - this.$pivot.y * diffh);
                    this.updatePivotOffset();
                }
                else {
                    this.applyPivot();
                }
            }
            this.updateGear(2 /* Size */);
            if (this.$parent) {
                this.$relations.onOwnerSizeChanged(diffw, diffh);
                this.$parent.setBoundsChangedFlag();
            }
            let evt = new createjs.Event("__sizeChanged" /* SIZE_CHANGED */, true, false);
            this.$displayObject.dispatchEvent(evt, this);
        }
    }
    ensureSizeCorrect() { }
    get sourceHeight() {
        return this.$sourceHeight;
    }
    get sourceWidth() {
        return this.$sourceWidth;
    }
    get initHeight() {
        return this.$initHeight;
    }
    get initWidth() {
        return this.$initWidth;
    }
    get actualWidth() {
        return this.width * Math.abs(this.$scaleX);
    }
    get actualHeight() {
        return this.height * Math.abs(this.$scaleY);
    }
    get scaleX() {
        return this.$scaleX;
    }
    set scaleX(value) {
        this.setScale(value, this.$scaleY);
    }
    get scaleY() {
        return this.$scaleY;
    }
    set scaleY(value) {
        this.setScale(this.$scaleX, value);
    }
    setScale(sx, sy) {
        if (this.$scaleX != sx || this.$scaleY != sy) {
            this.$scaleX = sx;
            this.$scaleY = sy;
            this.handleScaleChanged();
            this.applyPivot();
            this.updateGear(2 /* Size */);
        }
    }
    get skewX() {
        return this.$skewX;
    }
    set skewX(value) {
        this.setSkew(value, this.$skewY);
    }
    get skewY() {
        return this.$skewY;
    }
    set skewY(value) {
        this.setSkew(this.$skewX, value);
    }
    setSkew(xv, yv) {
        if (this.$skewX != xv || this.$skewY != yv) {
            this.$skewX = xv;
            this.$skewY = yv;
            this.$displayObject.skewX = xv;
            this.$displayObject.skewY = yv;
            this.applyPivot();
        }
    }
    mapPivotWidth(scale) {
        return scale * this.$width;
    }
    mapPivotHeight(scale) {
        return scale * this.$height;
    }
    get pivotX() {
        return this.$pivot.x;
    }
    get pivotY() {
        return this.$pivot.y;
    }
    set pivotX(value) {
        this.setPivot(value, this.pivotY);
    }
    set pivotY(value) {
        this.setPivot(this.pivotX, value);
    }
    setPivot(xv, yv, asAnchor = false) {
        if (this.$pivot.x != xv || this.$pivot.y != yv || this.$pivotAsAnchor != asAnchor) {
            this.$pivot.setValues(xv, yv);
            this.$pivotAsAnchor = asAnchor;
            this.updatePivotOffset();
            this.handleXYChanged();
        }
    }
    internalSetPivot(xv, yv, asAnchor) {
        this.$pivot.setValues(xv, yv);
        this.$pivotAsAnchor = asAnchor;
        if (asAnchor)
            this.handleXYChanged();
    }
    updatePivotOffset() {
        let transform = this.$displayObject.getMatrix();
        if (this.$pivot.x != 0 || (this.$pivot.y != 0 && transform)) {
            let vx = this.mapPivotWidth(this.$pivot.x), vy = this.mapPivotHeight(this.$pivot.y);
            GObject.sHelperPoint.setValues(vx, vy);
            let p = transform.transformPoint(GObject.sHelperPoint.x, GObject.sHelperPoint.y);
            (p.x -= transform.tx), (p.y -= transform.ty);
            let offsetX = this.$pivot.x * this.$width - p.x;
            let offsetY = this.$pivot.y * this.$height - p.y;
            this.$pivotOffset.setValues(offsetX, offsetY);
        }
        else
            this.$pivotOffset.setValues(0, 0);
    }
    applyPivot() {
        if (this.$pivot.x != 0 || this.$pivot.y != 0) {
            this.updatePivotOffset();
            this.handleXYChanged();
        }
    }
    get touchable() {
        return this.$touchable;
    }
    set touchable(value) {
        this.$touchable = value;
        if (this.$touchable) {
            this.$displayObject.mouseEnabled = true;
        }
        else {
            this.$displayObject.mouseEnabled = false;
        }
    }
    get grayed() {
        return this.$grayed;
    }
    set grayed(value) {
        if (this.$grayed != value) {
            this.$grayed = value;
            this.handleGrayedChanged();
            this.updateGear(3 /* Look */);
        }
    }
    get enabled() {
        return !this.$grayed && this.$touchable;
    }
    set enabled(value) {
        this.grayed = !value;
        this.touchable = value;
    }
    get rotation() {
        return this.$rotation;
    }
    set rotation(value) {
        if (this.$rotation != value) {
            this.$rotation = value;
            if (this.$displayObject)
                this.$displayObject.rotation = value;
            this.applyPivot();
            this.updateGear(3 /* Look */);
        }
    }
    get normalizeRotation() {
        let rot = this.$rotation % 360;
        if (rot > 180)
            rot -= 360;
        else if (rot < -180)
            rot += 360;
        return rot;
    }
    get alpha() {
        return this.$alpha;
    }
    set alpha(value) {
        if (this.$alpha != value) {
            this.$alpha = value;
            this.updateAlpha();
        }
    }
    updateAlpha() {
        if (this.$displayObject)
            this.$displayObject.alpha = this.$alpha;
        this.updateGear(3 /* Look */);
    }
    get visible() {
        return this.$visible;
    }
    set visible(value) {
        if (this.$visible != value) {
            this.$visible = value;
            if (this.$displayObject)
                this.$displayObject.visible = this.$visible;
            if (this.$parent) {
                this.$parent.childStateChanged(this);
                this.$parent.setBoundsChangedFlag();
            }
            let event = new createjs.Event("__visibleChanged" /* VISIBLE_CHANGED */, true, false);
            event.data = { visible: this.$visible };
            this.dispatchEvent(event, this);
        }
    }
    /**@internal */
    set internalVisible(value) {
        if (value != this.$internalVisible) {
            this.$internalVisible = value;
            if (this.$parent)
                this.$parent.childStateChanged(this);
        }
    }
    /**@internal */
    get internalVisible() {
        return this.$internalVisible;
    }
    get finalVisible() {
        return this.$visible && this.$internalVisible && (!this.$group || this.$group.finalVisible);
    }
    get sortingOrder() {
        return this.$sortingOrder;
    }
    set sortingOrder(value) {
        if (value < 0)
            value = 0;
        if (this.$sortingOrder != value) {
            let old = this.$sortingOrder;
            this.$sortingOrder = value;
            if (this.$parent != null)
                this.$parent.childSortingOrderChanged(this, old, this.$sortingOrder);
        }
    }
    get focusable() {
        return this.$focusable;
    }
    set focusable(value) {
        this.$focusable = value;
    }
    get focused() {
        return Decls$1.GRoot.inst.focus == this;
    }
    requestFocus() {
        let p = this;
        while (p && !p.$focusable)
            p = p.parent;
        if (p != null)
            Decls$1.GRoot.inst.focus = p;
    }
    get tooltips() {
        return this.$tooltips;
    }
    set tooltips(value) {
        this.$tooltips = value;
    }
    get blendMode() {
        if (this.$displayObject && this.$displayObject instanceof Sprite)
            return BlendModeMap[this.$displayObject.compositeOperation] || 'None';
        return BlendModeMap[0]; //Normal
    }
    set blendMode(value) {
        if (!value || !value.length || !this.$displayObject || !(this.$displayObject instanceof Sprite))
            return;
        for (let i = 0; i < BlendModeMap.length; i++) {
            if (BlendModeMap[i].toLowerCase() === value.toLowerCase()) {
                this.$displayObject.compositeOperation = BlendModeMap[i];
                return;
            }
        }
    }
    get filters() {
        return this.$displayObject.filters;
    }
    set filters(value) {
        this.$displayObject.filters = value;
    }
    get inContainer() {
        return this.$displayObject.parent != null;
    }
    static isDisplayObjectOnStage(display) {
        if (!display || !display.parent)
            return false;
        let p = display;
        while (p != null) {
            if (p == Decls$1.GRoot.inst.nativeStage)
                return true;
            p = p.parent;
        }
        return false;
    }
    get onStage() {
        return GObject.isDisplayObjectOnStage(this.$displayObject);
    }
    get resourceURL() {
        if (this.packageItem != null)
            return `ui://${this.packageItem.owner.id}${this.packageItem.id}`;
        else
            return null;
    }
    set group(value) {
        this.$group = value;
    }
    get group() {
        return this.$group;
    }
    getGear(index) {
        let gear = this.$gears[index];
        if (gear == null) {
            switch (index) {
                case 0 /* Display */:
                    gear = new GearDisplay(this);
                    break;
                case 1 /* XY */:
                    gear = new GearXY(this);
                    break;
                case 2 /* Size */:
                    gear = new GearSize(this);
                    break;
                case 3 /* Look */:
                    gear = new GearLook(this);
                    break;
                case 4 /* Color */:
                    if (isColorGear(this))
                        gear = new GearColor(this);
                    else
                        throw new Error(`Invalid component type to add GearColor feature, please check the component named ${this.$name} in the Editor.`);
                    break;
                case 5 /* Animation */:
                    if (isAnimationGear(this))
                        gear = new GearAnimation(this);
                    else
                        throw new Error(`Invalid component type to add GearAnimation feature, please check the component named ${this.$name} in the Editor.`);
                    break;
                case 6 /* Text */:
                    gear = new GearText(this);
                    break;
                case 7 /* Icon */:
                    gear = new GearIcon(this);
                    break;
                default:
                    throw new Error('FGUI: invalid gear type');
            }
            this.$gears[index] = gear;
        }
        return gear;
    }
    updateGear(index) {
        if (this.$gears[index] != null)
            this.$gears[index].updateState();
    }
    updateGearFromRelations(index, dx, dy) {
        if (this.$gears[index] != null)
            this.$gears[index].updateFromRelations(dx, dy);
    }
    hasGearController(index, c) {
        return this.$gears[index] && this.$gears[index].controller == c;
    }
    /**@internal */
    lockGearDisplay() {
        let g = this.$gears[0];
        if (g && g.controller) {
            let ret = g.lock();
            this.checkGearVisible();
            return ret;
        }
        else
            return 0;
    }
    /**@internal */
    releaseGearDisplay(token) {
        let g = this.$gears[0];
        if (g && g.controller) {
            g.release(token);
            this.checkGearVisible();
        }
    }
    checkGearVisible() {
        if (this.$handlingController)
            return;
        let g = this.$gears[0];
        let v = !g || g.connected;
        if (v != this.$internalVisible) {
            this.$internalVisible = v;
            if (this.$parent)
                this.$parent.childStateChanged(this);
        }
    }
    get gearXY() {
        return this.getGear(1 /* XY */);
    }
    get gearSize() {
        return this.getGear(2 /* Size */);
    }
    get gearLook() {
        return this.getGear(3 /* Look */);
    }
    get relations() {
        return this.$relations;
    }
    addRelation(target, relationType, usePercent = false) {
        this.$relations.add(target, relationType, usePercent);
    }
    removeRelation(target, relationType = 0) {
        this.$relations.remove(target, relationType);
    }
    get displayObject() {
        return this.$displayObject;
    }
    createDisplayObject() { }
    setDisplayObject(value) {
        this.$displayObject = value;
    }
    get parent() {
        return this.$parent;
    }
    set parent(val) {
        this.$parent = val;
    }
    removeFromParent() {
        if (this.$parent)
            this.$parent.removeChild(this);
    }
    /** @virtual */
    get text() {
        return null;
    }
    /** @virtual */
    set text(value) { }
    /** @virtual */
    get icon() {
        return null;
    }
    /** @virtual */
    set icon(value) { }
    dispose() {
        this.removeFromParent();
        this.$relations.dispose();
        this.removeAllListeners();
        this.$mouseMoveEvent = Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Move, this.$moving);
        this.$mouseUpEvent = Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$end);
        this.$mouseMove2Event = Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Move, this.$moving2);
        this.$mouseUp2Event = Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$end2);
        // this.$displayObject.destroy();  //cjs not the destroy API
    }
    click(listener, thisObj) {
        this.on(InteractiveEvents.Click, listener, thisObj);
    }
    removeClick(listener) {
        this.off(InteractiveEvents.Click, listener);
    }
    hasClick(fn) {
        return this.hasListener(InteractiveEvents.Click);
    }
    on(type, listener, thisObject, once = false) {
        if (type == null)
            return this;
        let fn = this.$displayObject.on(type, listener, thisObject, once);
        this.$displayEventMap[type] = fn;
        return this;
    }
    off(type, listener) {
        if (this.$displayObject.hasEventListener(type)) {
            this.$displayObject.off(type, this.$displayEventMap[type]);
        }
    }
    once(type, listener, thisObject) {
        if (type == null)
            return this;
        this.on(type, listener, thisObject, true);
    }
    hasListener(event) {
        //do we need to also check the context?
        // super.hasEventListener(event)
        return this.$displayObject.hasEventListener(event);
    }
    dispatchEvent(event, ...args) {
        // super.dispatchEvent(event, args)
        if (!args || args.length <= 0)
            args = [event];
        else
            args.unshift(event);
        return this.$displayObject.dispatchEvent(event, this.$displayObject);
    }
    removeAllListeners(type) {
        this.removeAllEventListeners(type);
    }
    get draggable() {
        return this.$draggable;
    }
    set draggable(value) {
        if (this.$draggable != value) {
            this.$draggable = value;
            this.initDrag();
        }
    }
    get dragBounds() {
        return this.$dragBounds;
    }
    set dragBounds(value) {
        this.$dragBounds = value;
    }
    startDrag(touchPointID = -1) {
        if (!this.onStage)
            return;
        this.dragBegin();
    }
    stopDrag() {
        this.dragEnd();
    }
    get dragging() {
        return GObject.draggingObject == this;
    }
    localToGlobal(ax = 0, ay = 0, resultPoint) {
        if (this.$pivotAsAnchor) {
            ax += this.$pivot.x * this.$width;
            ay += this.$pivot.y * this.$height;
        }
        if (!resultPoint)
            resultPoint = GObject.sHelperPoint;
        resultPoint.x = ax;
        resultPoint.y = ay;
        return this.$displayObject.localToGlobal(resultPoint.x, resultPoint.y);
    }
    globalToLocal(ax = 0, ay = 0, resultPoint) {
        if (!resultPoint)
            resultPoint = GObject.sHelperPoint;
        resultPoint.setValues(ax, ay);
        resultPoint = this.$displayObject.globalToLocal(resultPoint.x, resultPoint.y);
        if (this.$pivotAsAnchor) {
            resultPoint.x -= this.$pivot.x * this.$width;
            resultPoint.y -= this.$pivot.y * this.$height;
        }
        return resultPoint;
    }
    localToRoot(ax = 0, ay = 0, resultPoint) {
        let pt = this.localToGlobal(ax, ay, resultPoint);
        pt.x /= Decls$1.GRoot.inst.contentScaleFactor;
        pt.y /= Decls$1.GRoot.inst.contentScaleFactor;
        return pt;
    }
    rootToLocal(ax = 0, ay = 0, resultPoint) {
        ax *= Decls$1.GRoot.inst.contentScaleFactor;
        ay *= Decls$1.GRoot.inst.contentScaleFactor;
        return this.globalToLocal(ax, ay, resultPoint);
    }
    localToGlobalRect(ax = 0, ay = 0, aWidth = 0, aHeight = 0, resultRect) {
        if (resultRect == null)
            resultRect = GObject.sDragHelperRect;
        let pt = this.localToGlobal(ax, ay);
        resultRect.x = pt.x;
        resultRect.y = pt.y;
        resultRect.width = aWidth;
        resultRect.height = aHeight;
        return resultRect;
    }
    globalToLocalRect(ax = 0, ay = 0, aWidth = 0, aHeight = 0, resultRect) {
        if (resultRect == null)
            resultRect = GObject.sDragHelperRect;
        let pt = this.globalToLocal(ax, ay);
        resultRect.x = pt.x;
        resultRect.y = pt.y;
        resultRect.width = aWidth;
        resultRect.height = aHeight;
        return resultRect;
    }
    handleControllerChanged(c) {
        this.$handlingController = true;
        for (let i = 0; i < 8 /* Count */; i++) {
            let gear = this.$gears[i];
            if (gear != null && gear.controller == c)
                gear.apply();
        }
        this.$handlingController = false;
        this.checkGearVisible();
    }
    switchDisplayObject(newObj) {
        if (newObj == this.$displayObject)
            return;
        let old = this.$displayObject;
        if (this.inContainer) {
            let i = this.$displayObject.parent.getChildIndex(this.$displayObject);
            this.$displayObject.parent.addChildAt(newObj, i);
            this.$displayObject.parent.removeChild(this.$displayObject);
        }
        this.$displayObject = newObj;
        this.$displayObject.x = old.x;
        this.$displayObject.y = old.y;
        this.$displayObject.rotation = old.rotation;
        this.$displayObject.alpha = old.alpha;
        this.$displayObject.visible = old.visible;
        this.$displayObject.scaleX = old.scaleX;
        this.$displayObject.scaleY = old.scaleY;
        this.$displayObject.mouseEnabled = old.mouseEnabled;
    }
    handleXYChanged() {
        if (this.$displayObject) {
            let xv = this.$x;
            let yv = this.$y;
            if (this.$pivotAsAnchor) {
                xv -= this.$pivot.x * this.$width;
                yv -= this.$pivot.y * this.$height;
            }
            if (this.$pixelSnapping) {
                xv = Math.round(xv);
                yv = Math.round(yv);
            }
            this.$displayObject.x = xv + this.$pivotOffset.x;
            this.$displayObject.y = yv + this.$pivotOffset.y;
        }
    }
    handleSizeChanged() { }
    handleScaleChanged() {
        if (this.$displayObject)
            this.$displayObject.scaleX = this.$scaleX;
        this.$displayObject.scaleY = this.$scaleY;
    }
    get colorFilter() {
        if (this.$colorFilter)
            return this.$colorFilter;
        /**
         * todo
         */
        var matrix = new createjs.ColorMatrix();
        this.$colorFilter = new createjs.ColorMatrixFilter(matrix);
        if (this.$displayObject) {
            let a = this.$displayObject.filters || [];
            a.push(this.$colorFilter);
            this.$displayObject.filters = a;
        }
        return this.$colorFilter;
    }
    /**
     * update color appearance
     * @param brightness value of the brigthness (-1 - 1, where -1 is black)
     * @param contrast value of the contrast (-1 - 1)
     * @param saturate The saturation amount (-1 - 1)
     * @param hue The hue property of the color in degress (-1 - 1, where 1 is 360deg)
     */
    updateColorComponents(brightness, contrast, saturate, hue) {
        var matrix = new createjs.ColorMatrix()
            .adjustBrightness(brightness)
            .adjustContrast(contrast * 100)
            .adjustHue(hue * 180)
            .adjustSaturation(saturate * 100);
        this.$displayObject.filters = [new createjs.ColorMatrixFilter(matrix)];
        this.$displayObject.cache(0, 0, this.$width, this.$height);
        if (!this.$lastColorComponents)
            this.$lastColorComponents = [];
        this.$lastColorComponents.length = 0;
        this.$lastColorComponents.push(brightness, contrast, saturate, hue);
    }
    handleGrayedChanged() {
        if (this.$displayObject) {
            if (this.$grayed) {
                var Grayscale = new createjs.ColorMatrixFilter([
                    0.3, 0.3, 0.3, 0, 0,
                    0.3, 0.3, 0.3, 0, 0,
                    0.3, 0.3, 0.3, 0, 0,
                    0, 0, 0, 1, 0 // alpha
                ]);
                this.$displayObject.filters = [Grayscale];
                this.$displayObject.cache(0, 0, this.$width, this.$height);
            }
            else {
                if (this.$lastColorComponents && this.$lastColorComponents.length >= 4)
                    this.updateColorComponents(this.$lastColorComponents[0], this.$lastColorComponents[1], this.$lastColorComponents[2], this.$lastColorComponents[3]);
                else
                    this.$displayObject.filters = [];
            }
        }
    }
    /**@internal */
    constructFromResource() {
    }
    setupBeforeAdd(xml) {
        let str;
        let arr;
        this.$id = xml.attributes.id;
        this.$name = xml.attributes.name;
        str = xml.attributes.xy;
        arr = str.split(',');
        this.setXY(parseInt(arr[0]), parseInt(arr[1]));
        str = xml.attributes.size;
        if (str) {
            arr = str.split(',');
            this.$initWidth = parseInt(arr[0]);
            this.$initHeight = parseInt(arr[1]);
            this.setSize(this.$initWidth, this.$initHeight, true);
        }
        str = xml.attributes.scale;
        if (str) {
            arr = str.split(',');
            this.setScale(parseFloat(arr[0]), parseFloat(arr[1]));
        }
        str = xml.attributes.rotation;
        if (str)
            this.rotation = parseInt(str);
        str = xml.attributes.skew;
        if (str) {
            arr = str.split(',');
            this.setSkew(parseFloat(arr[0]), parseFloat(arr[1]));
        }
        str = xml.attributes.pivot;
        if (str) {
            arr = str.split(',');
            let n1 = parseFloat(arr[0]), n2 = parseFloat(arr[1]);
            str = xml.attributes.anchor;
            this.setPivot(n1, n2, str == 'true');
        }
        str = xml.attributes.alpha;
        if (str)
            this.alpha = parseFloat(str);
        if (xml.attributes.touchable == 'false')
            this.touchable = false;
        if (xml.attributes.visible == 'false')
            this.visible = false;
        if (xml.attributes.grayed == 'true')
            this.grayed = true;
        this.tooltips = xml.attributes.tooltips;
        str = xml.attributes.blend;
        if (str)
            this.blendMode = str;
        str = xml.attributes.filter;
        if (str) {
            switch (str) {
                case 'color':
                    str = xml.attributes.filterData;
                    arr = str.split(',');
                    this.updateColorComponents(parseFloat(arr[0]), parseFloat(arr[1]), parseFloat(arr[2]), parseFloat(arr[3]));
                    break;
            }
        }
    }
    setupAfterAdd(xml) {
        let str = xml.attributes.group;
        if (str)
            this.$group = this.$parent.getChildById(str);
        let col = xml.children;
        col.forEach(cxml => {
            let index = GearXMLNodeNameMap[cxml.nodeName];
            if (index != void 0)
                this.getGear(index).setup(cxml);
        }, this);
    }
    static castFromNativeObject(disp) {
        if (isUIObject(disp))
            return disp.UIOwner;
        return null;
    }
    initDrag() {
        if (this.$draggable)
            this.on(InteractiveEvents.Down, this.$touchBegin, this);
        else
            this.off(InteractiveEvents.Down, this.$touchBegin);
    }
    dragBegin() {
        if (GObject.draggingObject != null)
            GObject.draggingObject.stopDrag();
        GObject.sGlobalDragStart.x = Decls$1.GRoot.globalMouseStatus.mouseX;
        GObject.sGlobalDragStart.y = Decls$1.GRoot.globalMouseStatus.mouseY;
        this.localToGlobalRect(0, 0, this.width, this.height, GObject.sGlobalRect);
        GObject.draggingObject = this;
        this.$mouseMove2Event = Decls$1.GRoot.inst.nativeStage.on(InteractiveEvents.Move, this.$moving2, this);
        this.$mouseUp2Event = Decls$1.GRoot.inst.nativeStage.on(InteractiveEvents.Up, this.$end2, this);
    }
    dragEnd() {
        if (GObject.draggingObject == this) {
            Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Move, this.$mouseMove2Event);
            Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseUp2Event);
            GObject.draggingObject = null;
        }
        GObject.$dragBeginCancelled = true;
    }
    reset() {
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Move, this.$mouseMoveEvent);
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseUpEvent);
    }
    $touchBegin(evt) {
        if (this.$touchDownPoint == null)
            this.$touchDownPoint = new createjs.Point();
        this.$touchDownPoint.x = evt.stageX;
        this.$touchDownPoint.y = evt.stageY;
        this.$mouseMoveEvent = Decls$1.GRoot.inst.nativeStage.on(InteractiveEvents.Move, this.$moving, this);
        this.$mouseUpEvent = Decls$1.GRoot.inst.nativeStage.on(InteractiveEvents.Up, this.$end, this);
    }
    $end(evt) {
        this.reset();
    }
    $moving(evt) {
        // console.log("moving");
        let sensitivity = UIConfig.touchDragSensitivity;
        if (this.$touchDownPoint != null &&
            Math.abs(this.$touchDownPoint.x - evt.stageX) < sensitivity &&
            Math.abs(this.$touchDownPoint.y - evt.stageY) < sensitivity)
            return;
        this.reset();
        GObject.$dragBeginCancelled = false;
        let event = new createjs.Event("__dragStart" /* START */, true, false);
        event.data = { currentTarget: this.$displayObject };
        this.$displayObject.dispatchEvent(event, this);
        if (!GObject.$dragBeginCancelled)
            //user may call obj.stopDrag in the DragStart event handler
            this.dragBegin();
    }
    $moving2(evt) {
        let xx = evt.stageX - GObject.sGlobalDragStart.x + GObject.sGlobalRect.x;
        let yy = evt.stageY - GObject.sGlobalDragStart.y + GObject.sGlobalRect.y;
        if (this.$dragBounds != null) {
            let rect = Decls$1.GRoot.inst.localToGlobalRect(this.$dragBounds.x, this.$dragBounds.y, this.$dragBounds.width, this.$dragBounds.height, GObject.sDragHelperRect);
            if (xx < rect.x)
                xx = rect.x;
            else if (xx + GObject.sGlobalRect.width > rect.x + rect.width) {
                xx = rect.x + rect.width - GObject.sGlobalRect.width;
                if (xx < rect.x)
                    xx = rect.x;
            }
            if (yy < rect.y)
                yy = rect.y;
            else if (yy + GObject.sGlobalRect.height > rect.y + rect.height) {
                yy = rect.y + rect.height - GObject.sGlobalRect.height;
                if (yy < rect.y)
                    yy = rect.y;
            }
        }
        GObject.sUpdatingWhileDragging = true;
        GObject.sHelperPoint.x = xx;
        GObject.sHelperPoint.y = yy;
        let pt = this.parent.globalToLocal(xx, yy, GObject.sHelperPoint);
        this.setXY(Math.round(pt.x), Math.round(pt.y));
        GObject.sUpdatingWhileDragging = false;
        let currentTarget = this.$displayObject;
        let event = new createjs.Event("__dragMoving" /* MOVING */, true, false);
        event.data = { currentTarget };
        this.$displayObject.dispatchEvent(event, this);
    }
    $end2(evt) {
        if (GObject.draggingObject == this) {
            this.stopDrag();
            let currentTarget = this.$displayObject;
            let event = new createjs.Event("__dragEnd" /* END */, true, false);
            event.data = { currentTarget };
            this.$displayObject.dispatchEvent(event, this);
        }
    }
}
GObject.gInstanceCounter = 0;
//dragging
//-------------------------------------------------------------------
GObject.sGlobalDragStart = new createjs.Point();
GObject.sGlobalRect = new createjs.Rectangle();
GObject.sHelperPoint = new createjs.Point();
GObject.sDragHelperRect = new createjs.Rectangle();
let Decls$1 = {};

class GGroup extends GObject {
    createDisplayObject() {
        let c = new UIContainer(this);
        /**
         * todo
         */
        // c.interactive = false;
        c.mouseEnabled = false;
        this.setDisplayObject(c);
    }
    updateBounds() {
        if (this.$updating || !this.parent)
            return;
        let cnt = this.$parent.numChildren;
        let i = 0;
        let ax = Number.POSITIVE_INFINITY, ay = Number.POSITIVE_INFINITY;
        let ar = Number.NEGATIVE_INFINITY, ab = Number.NEGATIVE_INFINITY;
        this.$empty = true;
        let child;
        let tmp = 0;
        for (i = 0; i < cnt; i++) {
            child = this.$parent.getChildAt(i);
            if (child.group == this) {
                tmp = child.x;
                if (tmp < ax)
                    ax = tmp;
                tmp = child.y;
                if (tmp < ay)
                    ay = tmp;
                tmp = child.x + child.width;
                if (tmp > ar)
                    ar = tmp;
                tmp = child.y + child.height;
                if (tmp > ab)
                    ab = tmp;
                this.$empty = false;
            }
        }
        this.$updating = true;
        if (!this.$empty) {
            this.setXY(ax, ay);
            this.setSize(ar - ax, ab - ay);
        }
        else
            this.setSize(0, 0);
        this.$updating = false;
    }
    setXY(xv, yv) {
        if (this.$x != xv || this.$y != yv) {
            let dx = xv - this.$x;
            let dy = yv - this.$y;
            super.setXY(xv, yv);
            this.moveChildren(dx, dy);
        }
    }
    moveChildren(dx, dy) {
        if (this.$updating || !this.$parent)
            return;
        this.$updating = true;
        let cnt = this.$parent.numChildren;
        let i = 0;
        let child;
        for (i = 0; i < cnt; i++) {
            child = this.$parent.getChildAt(i);
            if (child.group == this) {
                child.setXY(child.x + dx, child.y + dy);
            }
        }
        this.$updating = false;
    }
    updateAlpha() {
        super.updateAlpha();
        if (this.$inProgressBuilding)
            return;
        let cnt = this.$parent.numChildren;
        let i;
        let child;
        for (i = 0; i < cnt; i++) {
            child = this.$parent.getChildAt(i);
            if (child.group == this)
                child.alpha = this.alpha;
        }
    }
}

class UISprite extends createjs.Shape {
    constructor(owner) {
        super();
        this.UIOwner = owner;
        this.mouseEnabled = false;
        // this.interactive = false;
        // this.interactiveChildren = false;
    }
}

class GGraph extends GObject {
    constructor() {
        super();
        this.$type = 0;
        this.$lineSize = 1;
        this.$sides = 0;
        this.$startAngle = 0;
        this.$points = [];
        this.$lineSize = 1;
        this.$lineColor = '#000000';
        this.$fillColor = '#FFFFFF';
    }
    drawRect(lineSize, lineColor, fillColor) {
        this.$type = 1;
        this.$lineSize = lineSize;
        this.$lineColor = lineColor;
        this.$fillColor = fillColor;
        this.drawGraph();
    }
    drawEllipse(lineSize, lineColor, fillColor) {
        this.$type = 2;
        this.$lineSize = lineSize;
        this.$lineColor = lineColor;
        this.$fillColor = fillColor;
        this.drawGraph();
    }
    get color() {
        return this.$fillColor;
    }
    set color(value) {
        this.$fillColor = value;
        if (this.$type != 0)
            this.drawGraph();
    }
    drawGraph() {
        let shape = this.$displayObject;
        let g = shape.graphics;
        g.clear();
        let w = this.width;
        let h = this.height;
        if (w == 0 || h == 0)
            return;
        g.beginStroke(this.$lineColor);
        if (this.$lineSize == 0) {
            g.setStrokeStyle(0.1); // see https://github.com/CreateJS/EaselJS/issues/734
        }
        else {
            g.setStrokeStyle(this.$lineSize);
            w -= this.$lineSize;
            h -= this.$lineSize;
        }
        g.beginFill(this.$fillColor);
        if (this.$type == 1) {
            if (this.$corner && this.$corner.length >= 1) {
                if (this.$corner.length == 1) {
                    g.drawRoundRect(this.$lineSize / 2, this.$lineSize / 2, w, h, this.$corner[0]);
                }
                else {
                    g.drawRoundRectComplex(this.$lineSize / 2, this.$lineSize / 2, w, h, this.$corner[0], this.$corner[1], this.$corner[3], this.$corner[2]);
                }
            }
            else {
                g.drawRect(this.$lineSize / 2, this.$lineSize / 2, w, h);
            }
        }
        else if (this.$type == 2) {
            let halfW = w * 0.5;
            if (w == h)
                g.drawCircle(halfW + this.$lineSize / 2, halfW + this.$lineSize / 2, halfW);
            else {
                w = w - this.$lineSize;
                h = h - this.$lineSize;
                g.drawEllipse(this.$lineSize / 2, this.$lineSize / 2, w, h);
            }
        }
        else if (this.$type == 3) {
            let radius = w > h ? w / 2 : h / 2;
            g.drawPolyStar(0 + radius, 0 + radius, radius, this.$sides, 0, this.$startAngle);
        }
        else if (this.$type == 4) {
            Utils.fillPath(g, this.$points, 0, 0);
        }
        g.endFill();
        shape.cache(0, 0, this.$width, this.$height);
    }
    replaceMe(target) {
        if (!this.$parent)
            throw new Error('parent not set');
        target.name = this.name;
        target.alpha = this.alpha;
        target.rotation = this.rotation;
        target.visible = this.visible;
        target.touchable = this.touchable;
        target.grayed = this.grayed;
        target.setXY(this.x, this.y);
        target.setSize(this.width, this.height);
        let index = this.$parent.getChildIndex(this);
        this.$parent.addChildAt(target, index);
        target.relations.copyFrom(this.relations);
        this.$parent.removeChild(this, true);
    }
    addBeforeMe(target) {
        if (this.$parent == null)
            throw new Error('parent not set');
        let index = this.$parent.getChildIndex(this);
        this.$parent.addChildAt(target, index);
    }
    addAfterMe(target) {
        if (this.$parent == null)
            throw new Error('parent not set');
        let index = this.$parent.getChildIndex(this);
        index++;
        this.$parent.addChildAt(target, index);
    }
    createDisplayObject() {
        this.$displayObject = new UISprite(this);
        this.$displayObject.mouseEnabled = true;
    }
    handleSizeChanged() {
        if (this.$type != 0)
            this.drawGraph();
    }
    setupBeforeAdd(xml) {
        super.setupBeforeAdd(xml);
        let type = xml.attributes.type;
        if (type && type != 'empty') {
            let str;
            str = xml.attributes.lineSize;
            if (str)
                this.$lineSize = parseInt(str);
            let c;
            str = xml.attributes.lineColor;
            if (str) {
                c = StringUtil.convertToRGBA(str);
                this.$lineColor = c;
            }
            str = xml.attributes.fillColor;
            if (str) {
                c = StringUtil.convertToRGBA(str);
                this.$fillColor = c;
            }
            let arr;
            str = xml.attributes.corner;
            if (str) {
                arr = str.split(',');
                if (arr.length > 1)
                    this.$corner = [parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3])];
                else
                    this.$corner = [parseInt(arr[0])];
            }
            if (type == 'rect') {
                this.$type = 1;
            }
            else if (type == 'eclipse') {
                this.$type = 2;
            }
            else if (type == 'regular_polygon') {
                this.$type = 3;
                str = xml.attributes.sides;
                if (str) {
                    this.$sides = parseInt(str);
                }
                str = xml.attributes.startAngle;
                if (str) {
                    this.$startAngle = parseInt(str);
                }
            }
            else if (type == 'polygon') {
                this.$type = 4;
                str = xml.attributes.points;
                if (str) {
                    arr = str.split(',');
                    this.$points = arr.map(point => {
                        return parseInt(point);
                    });
                }
            }
            this.drawGraph();
        }
    }
}

class Bitmap extends Sprite {
    constructor(item) {
        super();
        if (item) {
            let { width, height, texture, id } = item;
            this.$frameId = id;
            if (typeof texture == 'string') {
                this.texture = document.createElement('img');
                this.texture.src = texture;
            }
            else {
                this.texture = texture.image;
            }
            this.sourceRect = new createjs.Rectangle(0, 0, width, height);
            this.textureRect = texture.rect;
        }
    }
    draw(ctx, ignoreCache) {
        let flag = super.draw(ctx, ignoreCache);
        if (flag) {
            return flag;
        }
        if (this.sourceRect && this.textureRect) {
            let { x, y, width, height } = this.sourceRect;
            x = this.$isTrim ? x : 0;
            y = this.$isTrim ? y : 0;
            ctx.drawImage(this.texture, this.textureRect.x, this.textureRect.y, this.textureRect.width, this.textureRect.height, x, y, width, height); //GObject来控制位置坐标
        }
        else {
            ctx.drawImage(this.texture, 0, 0);
        }
        return true;
    }
    getBounds() {
        var rect = super.getBounds();
        if (rect) {
            return rect;
        }
        var texture = this.texture, o = this.sourceRect || texture;
        var hasContent = texture && (texture['naturalWidth'] || texture['getContext'] || texture['readyState'] >= 2);
        return hasContent ? this.sourceRect.setValues(0, 0, o.width, o.height) : null;
    }
}

class ScaleBitmap extends Sprite {
    constructor(item, scale9Grid) {
        super();
        if (item) {
            let { width, height, texture, id } = item;
            this.$frameId = id;
            if (typeof texture == 'string') {
                this.texture = document.createElement('img');
                this.texture.src = texture;
            }
            else {
                this.texture = texture.image;
            }
            this.sourceRect = new createjs.Rectangle(0, 0, width, height);
            this.textureRect = texture.rect;
        }
        this.scale9Grid = scale9Grid;
        this.snapToPixel = true;
    }
    draw(ctx, ignoreCache) {
        let flag = super.draw(ctx, ignoreCache);
        if (flag) {
            return true;
        }
        var centerX = this.scale9Grid.width;
        var centerY = this.scale9Grid.height;
        var scaledCenterX;
        var scaledCenterY;
        var imageHeight = this.sourceRect.height;
        var imageWidth = this.sourceRect.width;
        if (centerX == 0) {
            //vertical
            if (centerY == 0) {
                throw 'One of scale9Grid width or height must be greater than zero.';
            }
            var scale3Region2 = this.textureRect.y + this.scale9Grid.y;
            var scale3Region3 = this.textureRect.y + this.scale9Grid.y + this.scale9Grid.height;
            var scaledFirstRegion = this.scale9Grid.y;
            var scaledSecondRegion = this.scale9Grid.height;
            var scaledThirdRegion = this.textureRect.height - scaledFirstRegion - scaledSecondRegion;
            scaledCenterY = imageHeight - scaledFirstRegion - scaledThirdRegion;
            ctx.drawImage(this.texture, this.textureRect.x, this.textureRect.y, this.textureRect.width, scaledFirstRegion, 0, 0, imageWidth, scaledFirstRegion);
            ctx.drawImage(this.texture, this.textureRect.x, scale3Region2, this.textureRect.width, scaledSecondRegion, 0, scaledFirstRegion, imageWidth, scaledCenterY);
            ctx.drawImage(this.texture, this.textureRect.x, scale3Region3, this.textureRect.width, scaledThirdRegion, 0, scaledCenterY + scaledFirstRegion, imageWidth, scaledThirdRegion);
        }
        else if (centerY == 0) {
            //horizontal
            var scale3Region2 = this.textureRect.x + this.scale9Grid.x;
            var scale3Region3 = this.textureRect.x + this.scale9Grid.x + this.scale9Grid.width;
            var scaledFirstRegion = this.scale9Grid.x;
            var scaledSecondRegion = this.scale9Grid.width;
            var scaledThirdRegion = this.textureRect.width - scaledFirstRegion - scaledSecondRegion;
            scaledCenterX = imageWidth - scaledFirstRegion - scaledThirdRegion;
            ctx.drawImage(this.texture, this.textureRect.x, this.textureRect.y, scaledFirstRegion, this.textureRect.height, 0, 0, scaledFirstRegion, imageHeight);
            ctx.drawImage(this.texture, scale3Region2, this.textureRect.y, scaledSecondRegion, this.textureRect.height, scaledFirstRegion, 0, scaledCenterX, imageHeight);
            ctx.drawImage(this.texture, scale3Region3, this.textureRect.y, scaledThirdRegion, this.textureRect.height, scaledFirstRegion + scaledCenterX, 0, scaledThirdRegion, imageHeight);
        }
        else {
            var left = this.scale9Grid.x;
            var top = this.scale9Grid.y;
            var right = this.textureRect.width - centerX - left;
            var bottom = this.textureRect.height - centerY - top;
            scaledCenterX = imageWidth - left - right;
            scaledCenterY = imageHeight - top - bottom;
            ctx.drawImage(this.texture, this.textureRect.x, this.textureRect.y, left, top, 0, 0, left, top);
            ctx.drawImage(this.texture, this.textureRect.x + left, this.textureRect.y, centerX, top, left, 0, scaledCenterX, top);
            ctx.drawImage(this.texture, this.textureRect.x + left + centerX, this.textureRect.y, right, top, left + scaledCenterX, 0, right, top);
            ctx.drawImage(this.texture, this.textureRect.x, this.textureRect.y + top, left, centerY, 0, top, left, scaledCenterY);
            ctx.drawImage(this.texture, this.textureRect.x + left, this.textureRect.y + top, centerX, centerY, left, top, scaledCenterX, scaledCenterY);
            ctx.drawImage(this.texture, this.textureRect.x + left + centerX, this.textureRect.y + top, right, centerY, left + scaledCenterX, top, right, scaledCenterY);
            ctx.drawImage(this.texture, this.textureRect.x, this.textureRect.y + top + centerY, left, bottom, 0, top + scaledCenterY, left, bottom);
            ctx.drawImage(this.texture, this.textureRect.x + left, this.textureRect.y + top + centerY, centerX, bottom, left, top + scaledCenterY, scaledCenterX, bottom);
            ctx.drawImage(this.texture, this.textureRect.x + left + centerX, this.textureRect.y + top + centerY, right, bottom, left + scaledCenterX, top + scaledCenterY, right, bottom);
        }
        return true;
    }
}

class TilingBitmap extends Sprite {
    constructor(item) {
        super();
        if (item) {
            let { width, height, texture, id } = item;
            this.$frameId = id;
            if (typeof texture == 'string') {
                this.texture = document.createElement('img');
                this.texture.src = texture;
            }
            else {
                this.texture = texture.image;
            }
            this.sourceRect = new createjs.Rectangle(0, 0, width, height);
            this.textureRect = texture.rect;
            let offsetCanvas = document.createElement('canvas');
            let offsetCanvasContext = offsetCanvas.getContext('2d');
            offsetCanvas.width = this.textureRect.width;
            offsetCanvas.height = this.textureRect.height;
            offsetCanvasContext.drawImage(this.texture, this.textureRect.x, this.textureRect.y, this.textureRect.width, this.textureRect.height, 0, 0, this.textureRect.width, this.textureRect.height);
            this._pattern = offsetCanvasContext.createPattern(offsetCanvas, 'repeat');
        }
    }
    draw(ctx, ignoreCache) {
        let flag = super.draw(ctx, ignoreCache);
        if (flag) {
            return flag;
        }
        // ctx.save();
        let { width, height } = this.sourceRect;
        ctx.fillStyle = this._pattern;
        ctx.fillRect(0, 0, width, height);
        // ctx.restore();
        return true;
    }
}

class UIImage extends createjs.Container {
    constructor(owner) {
        super();
        this.UIOwner = owner;
        // this.mouseEnabled = this.mouseChildren = false;
    }
    set sourceRect(rect) {
        this.$disp.sourceRect = rect;
    }
    setCache(x, y, width, height) {
        this.$disp.cache(x, y, width, height);
    }
    /**@internal */
    $initDisp(item) {
        if (this.$disp)
            return;
        if (item) {
            item.load();
            if (item.scaleByTile) {
                this.$disp = new TilingBitmap(item);
            }
            else if (item.scale9Grid) {
                let rect = new createjs.Rectangle(item.scale9Grid.x, item.scale9Grid.y, Math.max(0, item.scale9Grid.width), Math.max(0, item.scale9Grid.height));
                this.$disp = new ScaleBitmap(item, rect);
            }
            else {
                this.$disp = new Bitmap(item);
            }
        }
        else {
            this.$disp = new Bitmap();
        }
        this.addChild(this.$disp);
    }
    get tint() {
        return this.$disp.tint;
    }
    set tint(value) {
        this.$disp.tint = value;
    }
    get height() {
        return this.$disp.sourceRect.height;
    }
    set height(v) {
        this.$disp.sourceRect.height = v;
    }
    get width() {
        return this.$disp.sourceRect.width;
    }
    set width(v) {
        this.$disp.sourceRect.width = v;
    }
    get texture() {
        return this.$disp.texture;
    }
    set texture(v) {
        this.$disp.texture = v;
    }
    /**
     * rect = x,y,w,h = l,t,r,b
     */
    get scale9Grid() {
        if (this.$disp instanceof ScaleBitmap) {
            return this.$disp.scale9Grid;
        }
        return null;
    }
    /**
     * rect = x,y,w,h = l,t,r,b
     */
    set scale9Grid(rect) {
        if (this.$disp instanceof ScaleBitmap) {
            this.$disp.scale9Grid = rect;
        }
    }
    /**
     * todo
     */
    destroy() {
        //     if(this.$disp) {
        //         this.$disp.destroy(options);
        //         this.$disp = null;
        //     }
        //     super.destroy(options);
    }
}

class GImage extends GObject {
    constructor() {
        super();
    }
    get touchable() {
        return false;
    }
    set touchable(value) {
        this.$touchable = false; //GImage has no interaction
    }
    get color() {
        return this.$content.tint;
    }
    set color(value) {
        if (this.color != value) {
            this.updateGear(4 /* Color */);
            this.$content.tint = value;
            this.$content.setCache(0, 0, this.$width, this.$height);
        }
    }
    get flip() {
        return this.$flip;
    }
    set flip(value) {
        if (this.$flip != value) {
            this.$flip = value;
            this.$content.scaleX = this.$content.scaleY = 1;
            if (this.$flip == 1 /* Horizontal */ || this.$flip == 3 /* Both */) {
                this.$content.scaleX = -1;
            }
            if (this.$flip == 2 /* Vertical */ || this.$flip == 3 /* Both */) {
                this.$content.scaleY = -1;
            }
            this.handleXYChanged();
        }
    }
    get texture() {
        return this.$content.texture;
    }
    set texture(value) {
        if (value != null) {
            this.$sourceWidth = value.width;
            this.$sourceHeight = value.height;
        }
        else
            this.$sourceWidth = this.$sourceHeight = 0;
        this.$initWidth = this.$sourceWidth;
        this.$initHeight = this.$sourceHeight;
        this.$content.texture = value;
    }
    createDisplayObject() {
        this.$content = new UIImage(this);
        this.setDisplayObject(this.$content);
    }
    dispose() {
        this.$content.destroy();
        super.dispose();
    }
    constructFromResource() {
        this.$sourceWidth = this.packageItem.width;
        this.$sourceHeight = this.packageItem.height;
        this.$initWidth = this.$sourceWidth;
        this.$initHeight = this.$sourceHeight;
        this.$content.$initDisp(this.packageItem);
        this.setSize(this.$sourceWidth, this.$sourceHeight);
    }
    handleXYChanged() {
        super.handleXYChanged();
        if (this.$flip != 0 /* None */) {
            if (this.$content.scaleX == -1)
                this.$content.x += this.width;
            if (this.$content.scaleY == -1)
                this.$content.y += this.height;
        }
    }
    handleSizeChanged() {
        this.$content.width = this.width;
        this.$content.height = this.height;
        let rect = new createjs.Rectangle(this.x, this.y, this.width, this.height);
        this.$content.sourceRect = rect;
    }
    setupBeforeAdd(xml) {
        super.setupBeforeAdd(xml);
        let str;
        str = xml.attributes.color;
        if (str) {
            this.color = StringUtil.HEX2RGB(str);
        }
        str = xml.attributes.flip;
        if (str)
            this.flip = ParseFlipType(str);
    }
}

class GTimer {
    constructor() {
        this.$enumIdx = 0;
        this.$enumCount = 0;
        this.$curTime = Date.now();
        this.$items = [];
        this.$itemPool = [];
        // this.$lastTime = createjs.Ticker.getTime();
        // GTimer.time = this.$lastTime;
        createjs.Ticker.on('tick', this.advance, this);
    }
    getItem() {
        if (this.$itemPool.length)
            return this.$itemPool.pop();
        else
            return new TimerItem();
    }
    findItem(callback, thisObj) {
        let len = this.$items.length;
        for (let i = 0; i < len; i++) {
            let item = this.$items[i];
            if (item.callback == callback && item.thisObj == thisObj)
                return item;
        }
        return null;
    }
    //repeat <= 0 means loop
    add(delayInMs, repeat, callback, thisObj, callbackParam) {
        let item = this.findItem(callback, thisObj);
        if (!item) {
            item = this.getItem();
            item.callback = callback;
            item.thisObj = thisObj;
            this.$items.push(item);
        }
        item.delay = delayInMs;
        item.counter = 0;
        item.repeat = repeat;
        item.param = callbackParam;
        item.end = false;
    }
    addLoop(delayInMs, callback, thisObj, callbackParam) {
        this.add(delayInMs, 0, callback, thisObj, callbackParam);
    }
    callLater(callback, thisObj, callbackParam) {
        this.add(1, 1, callback, thisObj, callbackParam);
    }
    callDelay(delayInMs, callback, thisObj, callbackParam) {
        this.add(delayInMs, 1, callback, thisObj, callbackParam);
    }
    exists(callback, thisObj) {
        let item = this.findItem(callback, thisObj);
        return item != null;
    }
    remove(callback, thisObj) {
        let item = this.findItem(callback, thisObj);
        if (item) {
            let i = this.$items.indexOf(item);
            this.$items.splice(i, 1);
            if (i < this.$enumIdx)
                this.$enumIdx--;
            this.$enumCount--;
            item.callback = null;
            item.param = null;
            this.$itemPool.push(item);
        }
    }
    get ticker() {
        return this.$ticker;
    }
    get curTime() {
        return this.$curTime;
    }
    advance() {
        this.$enumIdx = 0;
        this.$enumCount = this.$items.length;
        while (this.$enumIdx < this.$enumCount) {
            let item = this.$items[this.$enumIdx];
            this.$enumIdx++;
            let ms = createjs.Ticker.interval;
            this.$curTime += ms;
            if (item.advance(ms)) {
                if (item.end) {
                    this.$enumIdx--;
                    this.$enumCount--;
                    this.$items.splice(this.$enumIdx, 1);
                    this.$itemPool.push(item);
                }
                if (item.callback) {
                    let args = [ms];
                    if (item.param && item.param instanceof Array)
                        args = item.param.concat(args);
                    else if (item.param !== void 0)
                        args.unshift(item.param);
                    item.callback.apply(item.thisObj, args);
                }
                if (item.end)
                    item.callback = item.thisObj = item.param = null;
            }
        }
    }
}
GTimer.inst = new GTimer();
class TimerItem {
    constructor() {
        this.delay = 0;
        this.counter = 0;
        this.repeat = 0;
    }
    advance(delta = 0) {
        this.counter += delta;
        if (this.counter >= this.delay) {
            this.counter -= this.delay;
            if (this.counter > this.delay)
                this.counter = this.delay;
            if (this.repeat > 0) {
                this.repeat--;
                if (this.repeat == 0)
                    this.end = true;
            }
            return true;
        }
        else
            return false;
    }
}

class MathUtil {
    static clamp(value, min, max) {
        if (value < min)
            value = min;
        else if (value > max)
            value = max;
        return value;
    }
    static clamp01(value) {
        if (value > 1)
            value = 1;
        else if (value < 0)
            value = 0;
        return value;
    }
    static isNumber(n) {
        if (typeof (n) != "number")
            return false;
        if (isNaN(n))
            return false;
        return true;
    }
    static sign(x) {
        x = Number(x);
        if (x === 0 || isNaN(x))
            return x;
        return x > 0 ? 1 : -1;
    }
    static angleToRadian(n) {
        return n * MathUtil.RADIAN;
    }
    static lerp(s, e, p) {
        return s + p * (e - s);
    }
}
MathUtil.RADIAN = Math.PI / 180;

class MovieClipData {
    constructor() {
        this.repeatedCount = 0;
        this.$curFrame = 0;
        this.$lastTime = 0;
        this.$curFrameDelay = 0;
        this.$lastTime = Date.now();
    }
    update(mc) {
        let t = Date.now();
        let elapsed = t - this.$lastTime;
        this.$lastTime = t;
        let cur = this.$curFrame;
        if (cur >= mc.frameCount)
            cur = mc.frameCount - 1;
        this.reachesEnd = false;
        this.$curFrameDelay += elapsed;
        let interval = mc.interval + mc.frames[cur].addDelay
            + ((cur == 0 && this.repeatedCount > 0) ? mc.repeatDelay : 0);
        if (this.$curFrameDelay < interval)
            return;
        this.$curFrameDelay -= interval;
        if (this.$curFrameDelay > mc.interval)
            this.$curFrameDelay = mc.interval;
        if (mc.swing) {
            if (this.reversed) {
                this.$curFrame--;
                if (this.$curFrame < 0) {
                    this.$curFrame = Math.min(1, mc.frameCount - 1);
                    this.repeatedCount++;
                    this.reversed = !this.reversed;
                }
            }
            else {
                this.$curFrame++;
                if (this.$curFrame > mc.frameCount - 1) {
                    this.$curFrame = Math.max(0, mc.frameCount - 2);
                    this.repeatedCount++;
                    this.reachesEnd = true;
                    this.reversed = !this.reversed;
                }
            }
        }
        else {
            this.$curFrame++;
            if (this.$curFrame > mc.frameCount - 1) {
                this.$curFrame = 0;
                this.repeatedCount++;
                this.reachesEnd = true;
            }
        }
    }
    get currentFrame() {
        return this.$curFrame;
    }
    set currentFrame(value) {
        this.$curFrame = value;
        this.$curFrameDelay = 0;
    }
    rewind() {
        this.$curFrame = 0;
        this.$curFrameDelay = 0;
        this.reversed = false;
        this.reachesEnd = false;
    }
    reset() {
        this.$curFrame = 0;
        this.$curFrameDelay = 0;
        this.repeatedCount = 0;
        this.reachesEnd = false;
        this.reversed = false;
    }
    copy(src) {
        this.$curFrame = src.$curFrame;
        this.$curFrameDelay = src.$curFrameDelay;
        this.repeatedCount = src.repeatedCount;
        this.reachesEnd = src.reachesEnd;
        this.reversed = src.reversed;
    }
}

class DefaultMovieClipSettings {
    constructor() {
        /**the first frame number to start to play */
        this.startFrame = 0;
        /**the end frame the playing will end at, -1 means to the tail */
        this.endFrame = -1;
        /**play count, 0 means endeless */
        this.repeatCount = 0;
        /**once the repeated playing completes, the playing will end at, -1 means to the tail */
        this.loopEndAt = -1;
        /**complete callback handler */
        this.endCallback = null;
        /**context object for the callback function */
        this.endCallbackContext = null;
    }
    /**modify the current settings without whole parameters provided */
    mix(other) {
        let ret = this;
        for (let key in other) {
            if (key == "mix")
                continue;
            ret[key] = other[key];
        }
        return this;
    }
}

class MovieClip extends Bitmap {
    constructor(owner) {
        super();
        this.interval = 0;
        this.repeatDelay = 0;
        this.$frameCount = 0;
        this.$currentFrame = 0;
        this.$status = 0 /* NORMAL */;
        this.UIOwner = owner;
        this.data = new MovieClipData();
        this.$playing = true;
        this.mouseEnabled = false;
        this.$settings = new DefaultMovieClipSettings();
        this.$isTrim = true;
        this.on('added', this.added, this);
        this.on('removed', this.removed, this);
    }
    // draw(ctx: CanvasRenderingContext2D, ignoreCache: boolean): boolean {
    //     // let flag = super.draw(ctx, ignoreCache);
    //     // if (flag) {
    //     //     return flag;
    //     // }
    //     if (this.sourceRect && this.textureRect) {
    //         let { x, y, width, height } = this.textureRect;
    //         ctx.drawImage(this.texture, x, y, width, height, this.sourceRect.x, this.sourceRect.y, this.sourceRect.width, this.sourceRect.height);//GObject来控制位置坐标
    //     } else {
    //         ctx.drawImage(this.texture, 0, 0);
    //     }
    //     return true;
    // }
    get frames() {
        return this.$frames;
    }
    set frames(value) {
        this.$frames = value;
        if (this.$frames != null)
            this.$frameCount = this.$frames.length;
        else
            this.$frameCount = 0;
        if (this.$settings.endFrame == -1 || this.$settings.endFrame > this.$frameCount - 1)
            this.$settings.endFrame = this.$frameCount - 1;
        if (this.$settings.loopEndAt == -1 || this.$settings.loopEndAt > this.$frameCount - 1)
            this.$settings.loopEndAt = this.$frameCount - 1;
        if (this.$currentFrame < 0 || this.$currentFrame > this.$frameCount - 1)
            this.$currentFrame = this.$frameCount - 1;
        if (this.$frameCount > 0) {
            this.setFrame(this.$frames[this.$currentFrame]);
        }
        else {
            this.setFrame(null);
        }
        this.data.rewind();
    }
    get frameCount() {
        return this.$frameCount;
    }
    // public get boundsRect(): createjs.Rectangle {
    //     return this.getBounds();
    //     // return this._boundsRect;
    // }
    set boundsRect(value) {
        // this._boundsRect = value;
        // this.sourceRect = value;
    }
    get currentFrame() {
        return this.$currentFrame;
    }
    set currentFrame(value) {
        if (this.$currentFrame != value) {
            this.$currentFrame = value;
            this.data.currentFrame = value;
            this.setFrame(this.$currentFrame < this.$frameCount ? this.$frames[this.$currentFrame] : null);
        }
    }
    get playing() {
        return this.$playing;
    }
    set playing(value) {
        this.$playing = value;
        if (value && GObject.isDisplayObjectOnStage(this))
            GTimer.inst.add(0, 0, this.update, this);
        else
            GTimer.inst.remove(this.update, this);
    }
    /**
       * Modify the playing settings for the current MovieClip object, there are two ways to call this method:
       * 1) pass whole parameters:
              startFrame: number;
              endFrame: number;
              repeatCount: number;
              loopEndAt: number;
              endCallback: (target?: MovieClip) => void;
              endCallbackContext: any;
       * 2) just pass 1 object which implements MovieClipSettings (recommended)
       */
    setPlaySettings(...args) {
        if (args.length == 1 && typeof args[0] == 'object')
            this.$settings.mix(args[0]);
        else {
            let s = args[0], e = args[1], r = args[2], l = args[3], ec = args[4], ecc = args[5];
            let o = {};
            if (MathUtil.isNumber(s))
                o.startFrame = s;
            if (MathUtil.isNumber(e))
                o.endFrame = e;
            if (MathUtil.isNumber(r))
                o.repeatCount = r;
            if (MathUtil.isNumber(l))
                o.loopEndAt = l;
            if (ec && typeof ec == 'function')
                o.endCallback = ec;
            if (ecc)
                o.endCallbackContext = ecc;
            this.$settings.mix(o);
        }
        if (this.$settings.endFrame == -1 || this.$settings.endFrame > this.$frameCount - 1)
            this.$settings.endFrame = this.$frameCount - 1;
        if (this.$settings.loopEndAt == -1)
            this.$settings.loopEndAt = this.$settings.endFrame;
        this.$status = 0 /* NORMAL */;
        this.currentFrame = this.$settings.startFrame;
    }
    update() {
        if (this.UIOwner.$inProgressBuilding)
            return;
        if (this.$playing && this.$frameCount != 0 && this.$status != 3 /* ENDED */) {
            this.data.update(this);
            if (this.$currentFrame != this.data.currentFrame) {
                if (this.$status == 1 /* LOOPING */) {
                    this.$currentFrame = this.$settings.startFrame;
                    this.data.currentFrame = this.$currentFrame;
                    this.$status = 0 /* NORMAL */;
                }
                else if (this.$status == 2 /* STOPPING */) {
                    this.$currentFrame = this.$settings.loopEndAt;
                    this.data.currentFrame = this.$currentFrame;
                    this.$status = 3 /* ENDED */;
                    //play end
                    if (this.$settings.endCallback != null)
                        GTimer.inst.callLater(this.$playEnd, this);
                }
                else {
                    this.$currentFrame = this.data.currentFrame;
                    if (this.$currentFrame == this.$settings.endFrame) {
                        if (this.$settings.repeatCount > 0) {
                            this.$settings.repeatCount--;
                            if (this.$settings.repeatCount == 0)
                                this.$status = 2 /* STOPPING */;
                            else
                                this.$status = 1 /* LOOPING */;
                        }
                    }
                }
                this.setFrame(this.$frames[this.$currentFrame]);
            }
        }
    }
    $playEnd() {
        if (this.$settings.endCallback != null) {
            let f = this.$settings.endCallback;
            let fObj = this.$settings.endCallbackContext;
            this.$settings.endCallback = this.$settings.endCallbackContext = null;
            this.$settings.endCallbackContext = null;
            if (f)
                f.call(fObj, this);
        }
    }
    setFrame(frame) {
        this.texture = frame == null ? null : frame.texture.image;
        this.textureRect = frame.texture.rect;
        this.sourceRect = frame.texture.trim;
        let { x, y, width, height } = this.sourceRect;
        this.cache(x, y, width, height);
        // this._textureID = -1;
    }
    added(disp) {
        if (this.$playing)
            GTimer.inst.add(0, 0, this.update, this);
    }
    removed(disp) {
        if (this.$playing)
            GTimer.inst.remove(this.update, this);
    }
    destroy() {
        GTimer.inst.remove(this.update, this);
        this.off('added', this.added);
        this.off('removed', this.removed);
        super.destroy();
    }
}

class GMovieClip extends GObject {
    constructor() {
        super();
    }
    mapPivotWidth(scale) {
        return scale * this.$sourceWidth;
    }
    mapPivotHeight(scale) {
        return scale * this.$sourceHeight;
    }
    handleSizeChanged() {
        if (this.$displayObject != null && this.$sourceWidth != 0 && this.$sourceHeight != 0)
            this.$displayObject.set({
                scaleX: (this.$width / this.$sourceWidth) * this.$scaleX,
                scaleY: (this.$height / this.$sourceHeight) * this.$scaleY
            });
    }
    handleScaleChanged() {
        if (this.$displayObject != null) {
            this.$displayObject.set({
                scaleX: (this.$width / this.$sourceWidth) * this.$scaleX,
                scaleY: (this.$height / this.$sourceHeight) * this.$scaleY
            });
        }
    }
    get touchable() {
        return false;
    }
    set touchable(value) {
        this.$touchable = false; //GMovieClip has no interaction
    }
    get color() {
        return this.$movieClip.tint;
    }
    set color(value) {
        this.$movieClip.tint = value;
    }
    createDisplayObject() {
        this.$movieClip = new MovieClip(this);
        this.setDisplayObject(this.$movieClip);
    }
    get playing() {
        return this.$movieClip.playing;
    }
    set playing(value) {
        if (this.$movieClip.playing != value) {
            this.$movieClip.playing = value;
            this.updateGear(5 /* Animation */);
        }
    }
    get frame() {
        return this.$movieClip.currentFrame;
    }
    set frame(value) {
        if (this.$movieClip.currentFrame != value) {
            this.$movieClip.currentFrame = value;
            this.updateGear(5 /* Animation */);
        }
    }
    /**
       * Modify the playing settings for the current MovieClip object, there are two ways to call this method:
       * 1) pass whole parameters:
              startFrame: number;
              endFrame: number;
              repeatCount: number;
              loopEndAt: number;
              endCallback: (target?: MovieClip) => void;
              endCallbackContext: any;
       * 2) just pass 1 object which implements MovieClipSettings (recommended)
       */
    setPlaySettings(...args) {
        this.$movieClip.setPlaySettings.apply(this.$movieClip, args);
    }
    constructFromResource() {
        this.$sourceWidth = this.packageItem.width;
        this.$sourceHeight = this.packageItem.height;
        this.$initWidth = this.$sourceWidth;
        this.$initHeight = this.$sourceHeight;
        this.setSize(this.$sourceWidth, this.$sourceHeight);
        this.packageItem.load();
        this.$movieClip.interval = this.packageItem.interval;
        this.$movieClip.swing = this.packageItem.swing;
        this.$movieClip.repeatDelay = this.packageItem.repeatDelay;
        this.$movieClip.frames = this.packageItem.frames;
        this.$movieClip.boundsRect = new createjs.Rectangle(0, 0, this.$sourceWidth, this.$sourceHeight);
    }
    setupBeforeAdd(xml) {
        super.setupBeforeAdd(xml);
        let str;
        str = xml.attributes.frame;
        if (str)
            this.$movieClip.currentFrame = parseInt(str);
        str = xml.attributes.playing;
        this.$movieClip.playing = str != 'false';
        str = xml.attributes.color;
        if (str) {
            this.color = StringUtil.HEX2RGB(str);
        }
    }
}

class DOMEventManager extends createjs.EventDispatcher {
    constructor() {
        super();
        this.retEvent = {};
        this.nullLowestDeltaTimeout = NaN;
        /*******************keys*******************/
        this.$pressedKeys = {};
        this.$releasedKeys = {};
        this.$downKeys = [];
        //resize
        window.addEventListener('resize', e => this.notifyResizeEvents(e), false);
        //modifer keys
        window.addEventListener('keydown', e => this.onWindowKeyDown(e), false);
        window.addEventListener('keyup', e => this.onWindowKeyUp(e), false);
        //mouse wheel
        const toBind = 'onwheel' in document || document['documentMode'] >= 9
            ? ['wheel']
            : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
        for (let i = toBind.length; i;) {
            window.addEventListener(toBind[--i], e => this.onMouseWheel(e), false);
        }
    }
    //resize
    notifyResizeEvents(e) {
        this.dispatchEvent('resize');
    }
    onMouseWheel(event) {
        let orgEvent = event || window.event, delta = 0, deltaX = 0, deltaY = 0, absDelta = 0;
        if ('detail' in orgEvent) {
            deltaY = orgEvent.detail * -1;
        }
        if ('wheelDelta' in orgEvent) {
            deltaY = orgEvent.wheelDelta;
        }
        if ('wheelDeltaY' in orgEvent) {
            deltaY = orgEvent.wheelDeltaY;
        }
        if ('wheelDeltaX' in orgEvent) {
            deltaX = orgEvent.wheelDeltaX * -1;
        }
        //FF DOMMouseScroll
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }
        delta = deltaY === 0 ? deltaX : deltaY;
        if ('deltaY' in orgEvent) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
            deltaX = orgEvent.deltaX;
            if (deltaY === 0) {
                delta = deltaX * -1;
            }
        }
        if (deltaY === 0 && deltaX === 0) {
            return;
        }
        // Delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if (orgEvent.deltaMode === 1) {
            const lineHeight = 16; //fontSize - line-height;
            delta *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        }
        else if (orgEvent.deltaMode === 2) {
            const pageHeight = 16; //dom.clientHeight = page-height
            delta *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if (!this.lowestDelta || absDelta < this.lowestDelta) {
            this.lowestDelta = absDelta;
            if (orgEvent.type === 'mousewheel' && absDelta % 120 === 0)
                this.lowestDelta /= 40;
        }
        if (orgEvent.type === 'mousewheel' && absDelta % 120 === 0) {
            delta /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / this.lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / this.lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / this.lowestDelta);
        this.retEvent.delta = delta;
        this.retEvent.deltaX = deltaX;
        this.retEvent.deltaY = deltaY;
        this.retEvent.deltaFactor = this.lowestDelta;
        this.retEvent.deltaMode = 0;
        if (this.nullLowestDeltaTimeout) {
            clearTimeout(this.nullLowestDeltaTimeout);
        }
        this.nullLowestDeltaTimeout = window.setTimeout(() => this.nullLowestDelta(), 200);
        let evt = new createjs.Event("__mouseWheel" /* MOUSE_WHEEL */, true, false);
        evt.data = { event: this.retEvent };
        this.dispatchEvent(evt, this);
    }
    nullLowestDelta() {
        this.lowestDelta = null;
    }
    isKeyDown(key) {
        return this.$downKeys.indexOf(key) >= 0;
    }
    isKeyPressed(key) {
        return !!this.$pressedKeys[key];
    }
    isKeyReleased(key) {
        return !!this.$releasedKeys[key];
    }
    onWindowKeyDown(evt) {
        let key = evt.which || evt.keyCode;
        if (!this.isKeyDown(key)) {
            this.$downKeys.push(key);
            this.$pressedKeys[key] = true;
            this.dispatchEvent('keyPressed', key);
        }
    }
    onWindowKeyUp(evt) {
        let key = evt.which || evt.keyCode;
        if (this.isKeyDown(key)) {
            this.$pressedKeys[key] = false;
            this.$releasedKeys[key] = true;
            let index = this.$downKeys.indexOf(key);
            if (index >= 0)
                this.$downKeys.splice(index, 1);
            this.dispatchEvent('keyReleased', key);
        }
    }
}
DOMEventManager.inst = new DOMEventManager();

class HTMLInput {
    constructor() {
        /**@internal */
        this.$requestToShow = false;
        /**@internal */
        this.$scaleX = 1;
        /**@internal */
        this.$scaleY = 1;
    }
    static get inst() {
        if (!HTMLInput.$instance)
            HTMLInput.$instance = new HTMLInput();
        return HTMLInput.$instance;
    }
    initialize(container, view) {
        this.$canvas = view;
        let div;
        if (!this.$delegateDiv) {
            div = document.createElement('div');
            this.$delegateDiv = div;
            div.id = '__delegateDiv';
            container.appendChild(div);
            this.initDomPos(div);
            this.$wrapper = document.createElement('div');
            this.initDomPos(this.$wrapper);
            this.$wrapper.style.width = '0px';
            this.$wrapper.style.height = '0px';
            this.$wrapper.style.left = '0px';
            this.$wrapper.style.top = '-100px';
            this.setTransform(this.$wrapper, '0% 0% 0px');
            div.appendChild(this.$wrapper);
            Decls$1.GRoot.inst.on(InteractiveEvents.Click, this.canvasClickHandler, this);
            this.initInputElement(true); //input
            this.initInputElement(false); //textarea
        }
    }
    isInputOn() {
        return this.$input != null;
    }
    canvasClickHandler(e) {
        if (this.$requestToShow) {
            this.$requestToShow = false;
            this.$input.onClickHandler(e);
            this.show();
        }
        else {
            if (this.$curEle) {
                this.clearInputElement();
                this.$curEle.blur();
                this.$curEle = null;
            }
        }
    }
    isInputShown() {
        return this.$input != null;
    }
    isCurrentInput(input) {
        return this.$input == input;
    }
    initDomPos(dom) {
        dom.style.position = 'absolute';
        dom.style.left = '0px';
        dom.style.top = '0px';
        dom.style.border = 'none';
        dom.style.padding = '0';
    }
    setTransform(el, origin, transform) {
        let style = el.style;
        style.transformOrigin = style.webkitTransformOrigin = style.msTransformOrigin = style.mozTransformOrigin = style.oTransformOrigin = origin;
        if (transform && transform.length > 0)
            style.transform = style.webkitTransform = style.msTransform = style.mozTransform = style.oTransform = transform;
    }
    /**@internal */
    updateSize(sx, sy) {
        if (!this.$canvas)
            return;
        this.$scaleX = sx;
        this.$scaleY = sy;
        this.$delegateDiv.style.left = this.$canvas.style.left;
        this.$delegateDiv.style.top = this.$canvas.style.top;
        let cvsStyle = this.$canvas.style;
        this.setTransform(this.$delegateDiv, '0% 0% 0px', cvsStyle.transform ||
            cvsStyle.webkitTransform ||
            cvsStyle.msTransform ||
            cvsStyle.mozTransform ||
            cvsStyle.oTransform);
    }
    initInputElement(multiline) {
        let inputElement;
        if (multiline) {
            inputElement = document.createElement('textarea');
            inputElement.style.resize = 'none';
            this.$multiLine = inputElement;
            inputElement.id = 'stageTextAreaEle';
        }
        else {
            inputElement = document.createElement('input');
            this.$singleLine = inputElement;
            inputElement.type = 'text';
            inputElement.id = 'stageInputEle';
        }
        this.$wrapper.appendChild(inputElement);
        inputElement.setAttribute('tabindex', '-1');
        inputElement.style.width = '1px';
        inputElement.style.height = '12px';
        this.initDomPos(inputElement);
        let style = inputElement.style;
        style.outline = 'thin';
        style.background = 'none';
        style.overflow = 'hidden';
        style.wordBreak = 'break-all';
        style.opacity = 0;
        inputElement.oninput = e => {
            if (this.$input)
                this.$input.onInputHandler();
        };
    }
    show() {
        GTimer.inst.callLater(() => {
            this.$curEle.style.opacity = '1';
        }, this);
    }
    disconnect(ele) {
        if (this.$input == null || this.$input == ele) {
            this.clearInputElement();
            if (this.$curEle)
                this.$curEle.blur();
        }
    }
    clearAttributes(obj) {
        if (this.$curEle) {
            for (let key in obj) {
                this.$curEle.removeAttribute(key);
            }
        }
    }
    clearInputElement() {
        if (this.$curEle) {
            this.$curEle.value = '';
            this.$curEle.onblur = null;
            let style = this.$curEle.style;
            style.width = '1px';
            style.height = '12px';
            style.left = '0px';
            style.top = '0px';
            style.opacity = '0';
            let el2;
            if (this.$singleLine == this.$curEle)
                el2 = this.$multiLine;
            else
                el2 = this.$singleLine;
            el2.style.display = 'block';
            this.$wrapper.style.left = '0px';
            this.$wrapper.style.top = '-100px';
            this.$wrapper.style.height = '0px';
            this.$wrapper.style.width = '0px';
        }
        if (this.$input) {
            this.$input.onDisconnect();
            this.$input = null;
            HTMLInput.isTyping = false;
        }
    }
    requestInput(ele) {
        this.clearInputElement();
        this.$input = ele;
        HTMLInput.isTyping = true;
        let el2;
        if (this.$input.textField.multipleLine) {
            this.$curEle = this.$multiLine;
            el2 = this.$singleLine;
        }
        else {
            this.$curEle = this.$singleLine;
            el2 = this.$multiLine;
        }
        el2.style.display = 'none';
        return this.$curEle;
    }
}
HTMLInput.isTyping = false;

class DefaultUIStageOptions {
    constructor() {
        this.scaleMode = "showAll" /* SHOW_ALL */;
        this.orientation = "auto" /* AUTO */;
        this.resolution = 1;
        this.designWidth = 800;
        this.designHeight = 600;
        this.alignV = 4 /* MIDDLE */;
        this.alignH = 1 /* CENTER */;
        this.fallbackWidth = 0;
        this.fallbackHeight = 0;
    }
}
class DefaultBoudingRectCalculator {
    getRect(view, fallbackWidth, fallbackHeight) {
        let p = view.parentElement;
        if (!p)
            //this should be impossible situation unless the user forget to append the view into the DOM.
            throw new Error("Your view of PIXI are still in memory but not appended to DOM yet? it's necessary that there is a parent element to wrap your view up.");
        let rect = p.getBoundingClientRect();
        let ret = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        if (!rect || rect.width <= 0 || rect.height <= 0) {
            console.warn('It seems that you did not set a explicit size for the parent element of your view, now fall back to window size instead.');
            ret.width = window.innerWidth;
            ret.height = window.innerHeight;
            ret.x = 0;
            ret.y = 0;
        }
        else {
            ret.x = rect.left;
            ret.y = rect.top;
            ret.width = rect.width;
            ret.height = rect.height;
        }
        //consider the worst situation: window does not have size!!
        if (ret.width <= 0 || ret.height <= 0) {
            console.warn('fetch container size to initialize PIXI in all ways have failed, now use default size (fallbackWidth / fallbackHeight) specified in the options instead.');
            ret.width = fallbackWidth;
            ret.height = fallbackHeight;
        }
        return ret;
    }
}
class UIStage extends createjs.EventDispatcher {
    constructor(app, stageOptions) {
        super();
        this.$width = 0;
        this.$height = 0;
        this.$scaleX = 1;
        this.$scaleY = 1;
        this.$canvasMatrix = new createjs.Matrix2D();
        this.offsetX = 0;
        this.offsetY = 0;
        this.$sizeCalcer = new DefaultBoudingRectCalculator();
        UIStageInst.push(this);
        this.$appContext = app;
        let opt;
        if (stageOptions instanceof DefaultUIStageOptions)
            opt = stageOptions;
        else {
            opt = new DefaultUIStageOptions();
            if (stageOptions != null) {
                for (let i in stageOptions) {
                    opt[i] = stageOptions[i];
                }
            }
        }
        if (!opt.designWidth || !opt.designHeight)
            throw new Error("Invalid designWidth / designHeight in the parameter 'stageOptions'.");
        this.$options = opt;
        this.$appContext.canvas.style.position = 'absolute';
        let container = this.$appContext.canvas.parentElement;
        let style = container.style;
        //if parent is not a DIV box, make one
        if (container.tagName != 'DIV') {
            container = document.createElement('DIV');
            style.position = 'relative';
            style.left = style.top = '0px';
            style.width = style.height = '100%'; //and set default full-screen
            style.overflow = 'hidden';
            // this.$appContext.view.parentElement.appendChild(container); //todo
            // container.appendChild(this.$appContext.view); //todo
        }
        let containerPosition;
        if (document.defaultView && document.defaultView.getComputedStyle)
            containerPosition = document.defaultView.getComputedStyle(container).position;
        else
            containerPosition = style.position;
        if (containerPosition == '' || containerPosition == 'static') {
            containerPosition = 'relative';
            container.style.position = containerPosition;
        }
        HTMLInput.inst.initialize(container, this.$appContext.canvas);
        this.updateScreenSize();
    }
    get orientation() {
        return this.$options.orientation;
    }
    get stageWidth() {
        return this.$width;
    }
    get stageHeight() {
        return this.$height;
    }
    get applicationContext() {
        return this.$appContext;
    }
    get nativeStage() {
        return this.$appContext;
    }
    get resolution() {
        return this.$options.resolution;
    }
    set resolution(v) {
        this.$options.resolution = v;
        this.updateScreenSize();
    }
    get scaleX() {
        return this.$scaleX;
    }
    get scaleY() {
        return this.$scaleY;
    }
    get designWidth() {
        return this.$options.designWidth;
    }
    get designHeight() {
        return this.$options.designHeight;
    }
    setDesignSize(width, height) {
        let option = this.$options;
        option.designWidth = width;
        option.designHeight = height;
        this.updateScreenSize();
    }
    calculateStageSize(scaleMode, screenWidth, screenHeight, contentWidth, contentHeight) {
        let displayWidth = screenWidth;
        let displayHeight = screenHeight;
        let stageWidth = contentWidth;
        let stageHeight = contentHeight;
        let scaleX = screenWidth / stageWidth || 0;
        let scaleY = screenHeight / stageHeight || 0;
        switch (scaleMode) {
            case "exactFit" /* EXACT_FIT */:
                break;
            case "fixedHeight" /* FIXED_HEIGHT */:
                stageWidth = Math.round(screenWidth / scaleY);
                break;
            case "fixedWidth" /* FIXED_WIDTH */:
                stageHeight = Math.round(screenHeight / scaleX);
                break;
            case "noBorder" /* NO_BORDER */:
                if (scaleX > scaleY)
                    displayHeight = Math.round(stageHeight * scaleX);
                else
                    displayWidth = Math.round(stageWidth * scaleY);
                break;
            case "showAll" /* SHOW_ALL */:
                if (scaleX > scaleY)
                    displayWidth = Math.round(stageWidth * scaleY);
                else
                    displayHeight = Math.round(stageHeight * scaleX);
                break;
            case "fixedAuto" /* FIXED_AUTO */:
                if (displayWidth / displayHeight < stageWidth / stageHeight) {
                    scaleY = scaleX;
                    stageHeight = Math.round(screenHeight / scaleX);
                }
                else {
                    scaleX = scaleY;
                    stageWidth = Math.round(screenWidth / scaleY);
                }
                break;
            default:
                stageWidth = screenWidth;
                stageHeight = screenHeight;
                break;
        }
        return {
            stageWidth: stageWidth,
            stageHeight: stageHeight,
            displayWidth: displayWidth,
            displayHeight: displayHeight
        };
    }
    /**@internal */
    updateScreenSize() {
        if (HTMLInput.isTyping)
            return; //todo
        let canvas = this.$appContext.canvas;
        let canvasStyle = canvas.style;
        // todo
        let rect = this.$sizeCalcer.getRect(canvas, this.$options.fallbackWidth, this.$options.fallbackHeight);
        let shouldRotate = false;
        let orientation = this.$options.orientation;
        if (orientation != "auto" /* AUTO */) {
            shouldRotate =
                (orientation != "portrait" /* PORTRAIT */ && rect.height > rect.width) ||
                    (orientation == "portrait" /* PORTRAIT */ && rect.width > rect.height);
        }
        let screenWidth = shouldRotate ? rect.height : rect.width;
        let screenHeight = shouldRotate ? rect.width : rect.height;
        let stageSize = this.calculateStageSize(this.$options.scaleMode, screenWidth, screenHeight, this.$options.designWidth, this.$options.designHeight);
        let stageWidth = stageSize.stageWidth;
        let stageHeight = stageSize.stageHeight;
        let displayWidth = stageSize.displayWidth;
        let displayHeight = stageSize.displayHeight;
        if (canvas.width !== stageWidth)
            canvas.width = stageWidth;
        if (canvas.height !== stageHeight)
            canvas.height = stageHeight;
        canvasStyle.transformOrigin = canvasStyle.webkitTransformOrigin = canvasStyle.msTransformOrigin = canvasStyle.mozTransformOrigin = canvasStyle.oTransformOrigin =
            '0px 0px 0px';
        canvasStyle.width = displayWidth + 'px';
        canvasStyle.height = displayHeight + 'px';
        let mat = this.$canvasMatrix.identity();
        let dispWidth = shouldRotate ? displayHeight : displayWidth;
        let dispHeight = shouldRotate ? displayWidth : displayHeight;
        let offx, offy;
        if (this.$options.alignH == 0 /* LEFT */)
            offx = 0;
        else if (this.$options.alignH == 2 /* RIGHT */)
            offx = rect.width - dispWidth;
        else
            offx = (rect.width - dispWidth) * 0.5;
        if (this.$options.alignV == 3 /* TOP */)
            offy = 0;
        else if (this.$options.alignV == 5 /* BOTTOM */)
            offy = rect.height - dispHeight;
        else
            offy = (rect.height - dispHeight) * 0.5;
        if (shouldRotate) {
            if (this.$options.orientation == "landscape" /* LANDSCAPE */) {
                mat.rotate(Math.PI / 2);
                mat.translate(screenHeight - offx, offy);
            }
            else {
                mat.rotate(-Math.PI / 2);
                mat.translate(offx, screenWidth - offy);
            }
        }
        else
            mat.translate(offx, offy);
        if (shouldRotate) {
            mat.tx += this.offsetY;
            mat.ty += this.offsetX;
        }
        else {
            mat.tx += this.offsetX;
            mat.ty += this.offsetY;
        }
        (mat.a = this.formatData(mat.a)),
            (mat.d = this.formatData(mat.d)),
            (mat.tx = this.formatData(mat.tx)),
            (mat.ty = this.formatData(mat.ty));
        canvasStyle.transformOrigin = canvasStyle.webkitTransformOrigin = canvasStyle.msTransformOrigin = canvasStyle.mozTransformOrigin = canvasStyle.oTransformOrigin =
            '0px 0px 0px';
        canvasStyle.transform = canvasStyle.webkitTransform = canvasStyle.msTransform = canvasStyle.mozTransform = canvasStyle.oTransform = `matrix(${mat.a},${mat.b},${mat.c},${mat.d},${mat.tx},${mat.ty})`;
        this.$width = stageWidth;
        this.$height = stageHeight;
        this.$scaleX = stageWidth / displayWidth;
        this.$scaleY = stageHeight / displayHeight;
        this.$appContext.set({ width: stageWidth, height: stageHeight });
        HTMLInput.inst.updateSize(displayWidth / stageWidth, displayHeight / stageHeight);
        let evt = new createjs.Event("__sizeChanged" /* SIZE_CHANGED */, true, false);
        this.dispatchEvent(evt, this);
    }
    formatData(value) {
        if (Math.abs(value) < 0.000001)
            return 0;
        if (Math.abs(1 - value) < 0.001)
            return value > 0 ? 1 : -1;
        return value;
    }
    dispose() {
        let i = UIStageInst.length;
        while (i-- >= 0) {
            if (UIStageInst[i] === this)
                UIStageInst.splice(i, 1);
        }
    }
}
let UIStageInst = [];
let resizeCheckTimer = NaN;
function resizeHandler() {
    UIStageInst.forEach(stage => {
        stage.updateScreenSize();
    });
}
DOMEventManager.inst.on('resize', function () {
    clearTimeout(resizeCheckTimer);
    resizeCheckTimer = window.setTimeout(resizeHandler, 300);
});

class Action {
    execute(controller, prevPage, curPage) {
        if ((!this.fromPage || this.fromPage.length == 0 || this.fromPage.indexOf(prevPage) != -1)
            && (!this.toPage || this.toPage.length == 0 || this.toPage.indexOf(curPage) != -1))
            this.enter(controller);
        else
            this.leave(controller);
    }
    enter(controller) {
    }
    leave(controller) {
    }
    setup(xml) {
        let str;
        str = xml.attributes.fromPage;
        if (str)
            this.fromPage = str.split(",");
        str = xml.attributes.toPage;
        if (str)
            this.toPage = str.split(",");
    }
}

class ChangePageAction extends Action {
    enter(controller) {
        if (!this.controllerName)
            return;
        let gcom;
        if (this.objectId)
            gcom = controller.parent.getChildById(this.objectId);
        else
            gcom = controller.parent;
        if (gcom) {
            let cc = gcom.getController(this.controllerName);
            if (cc && cc != controller && !cc.$updating)
                cc.selectedPageId = this.targetPage;
        }
    }
    setup(xml) {
        super.setup(xml);
        this.objectId = xml.attributes.objectId;
        this.controllerName = xml.attributes.controller;
        this.targetPage = xml.attributes.targetPage;
    }
}

class PlayTransitionAction extends Action {
    constructor() {
        super(...arguments);
        this.repeat = 1;
        this.delay = 0;
        this.stopOnExit = false;
    }
    enter(controller) {
        let trans = controller.parent.getTransition(this.transitionName);
        if (trans) {
            if (this.$currentTransition && this.$currentTransition.playing)
                trans.changeRepeat(this.repeat);
            else
                trans.play({
                    times: this.repeat,
                    delay: this.delay
                });
            this.$currentTransition = trans;
        }
    }
    leave() {
        if (this.stopOnExit && this.$currentTransition) {
            this.$currentTransition.stop();
            this.$currentTransition = null;
        }
    }
    /**@internal */
    setup(xml) {
        super.setup(xml);
        this.transitionName = xml.attributes.transition;
        let str;
        str = xml.attributes.repeat;
        if (str)
            this.repeat = parseInt(str);
        str = xml.attributes.delay;
        if (str)
            this.delay = parseFloat(str);
        this.stopOnExit = xml.attributes.stopOnExit == "true";
    }
}

class Controller extends createjs.EventDispatcher {
    constructor() {
        super();
        this.$selectedIndex = 0;
        this.$previousIndex = 0;
        this.$pageIds = [];
        this.$pageNames = [];
        this.$selectedIndex = -1;
        this.$previousIndex = -1;
    }
    get name() {
        return this.$name;
    }
    set name(value) {
        this.$name = value;
    }
    get parent() {
        return this.$parent;
    }
    get selectedIndex() {
        return this.$selectedIndex;
    }
    set selectedIndex(value) {
        if (this.$selectedIndex != value) {
            if (value > this.$pageIds.length - 1)
                throw new Error(`index out of range: ${value}`);
            this.$updating = true;
            this.$previousIndex = this.$selectedIndex;
            this.$selectedIndex = value;
            this.$parent.applyController(this);
            let event = new createjs.Event("__stateChanged" /* CHANGED */, true, false);
            this.dispatchEvent(event, this);
            this.$updating = false;
        }
    }
    //same effect as selectedIndex but without event emitted
    setSelectedIndex(value = 0) {
        if (this.$selectedIndex != value) {
            if (value > this.$pageIds.length - 1)
                throw new Error(`index out of range: ${value}`);
            this.$updating = true;
            this.$previousIndex = this.$selectedIndex;
            this.$selectedIndex = value;
            this.$parent.applyController(this);
            this.$updating = false;
        }
    }
    get previsousIndex() {
        return this.$previousIndex;
    }
    get selectedPage() {
        if (this.$selectedIndex == -1)
            return null;
        else
            return this.$pageNames[this.$selectedIndex];
    }
    set selectedPage(val) {
        this.selectedIndex = Math.max(0, this.$pageNames.indexOf(val));
    }
    setSelectedPage(value) {
        this.setSelectedIndex(Math.max(0, this.$pageNames.indexOf(value)));
    }
    get previousPage() {
        if (this.$previousIndex == -1)
            return null;
        else
            return this.$pageNames[this.$previousIndex];
    }
    get pageCount() {
        return this.$pageIds.length;
    }
    getPageName(index = 0) {
        return this.$pageNames[index];
    }
    addPage(name = '') {
        this.addPageAt(name, this.$pageIds.length);
    }
    addPageAt(name, index = 0) {
        let nid = `${Controller.$nextPageId++}`;
        if (index == this.$pageIds.length) {
            this.$pageIds.push(nid);
            this.$pageNames.push(name);
        }
        else {
            this.$pageIds.splice(index, 0, nid);
            this.$pageNames.splice(index, 0, name);
        }
    }
    removePage(name) {
        let i = this.$pageNames.indexOf(name);
        if (i != -1) {
            this.$pageIds.splice(i, 1);
            this.$pageNames.splice(i, 1);
            if (this.$selectedIndex >= this.$pageIds.length)
                this.selectedIndex = this.$selectedIndex - 1;
            else
                this.$parent.applyController(this);
        }
    }
    removePageAt(index = 0) {
        this.$pageIds.splice(index, 1);
        this.$pageNames.splice(index, 1);
        if (this.$selectedIndex >= this.$pageIds.length)
            this.selectedIndex = this.$selectedIndex - 1;
        else
            this.$parent.applyController(this);
    }
    clearPages() {
        this.$pageIds.length = 0;
        this.$pageNames.length = 0;
        if (this.$selectedIndex != -1)
            this.selectedIndex = -1;
        else
            this.$parent.applyController(this);
    }
    hasPage(aName) {
        return this.$pageNames.indexOf(aName) >= 0;
    }
    getPageIndexById(aId) {
        return this.$pageIds.indexOf(aId);
    }
    getPageIdByName(aName) {
        let i = this.$pageNames.indexOf(aName);
        if (i != -1)
            return this.$pageIds[i];
        else
            return null;
    }
    getPageNameById(aId) {
        let i = this.$pageIds.indexOf(aId);
        if (i != -1)
            return this.$pageNames[i];
        else
            return null;
    }
    getPageId(index = 0) {
        return this.$pageIds[index];
    }
    get selectedPageId() {
        if (this.$selectedIndex == -1)
            return null;
        else
            return this.$pageIds[this.$selectedIndex];
    }
    set selectedPageId(val) {
        this.selectedIndex = this.$pageIds.indexOf(val);
    }
    set oppositePageId(val) {
        let i = this.$pageIds.indexOf(val);
        if (i > 0)
            this.selectedIndex = 0;
        else if (this.$pageIds.length > 1)
            this.selectedIndex = 1;
    }
    get previousPageId() {
        if (this.$previousIndex == -1)
            return null;
        else
            return this.$pageIds[this.$previousIndex];
    }
    executeActions() {
        if (this.$actions && this.$actions.length > 0) {
            this.$actions.forEach(a => {
                a.execute(this, this.previousPageId, this.selectedPageId);
            });
        }
    }
    createAction(type) {
        switch (type) {
            case 'play_transition':
                return new PlayTransitionAction();
            case 'change_page':
                return new ChangePageAction();
        }
        return null;
    }
    setup(xml) {
        this.$name = xml.attributes.name;
        this.$autoRadioGroupDepth = xml.attributes.autoRadioGroupDepth == 'true';
        let str = xml.attributes.pages;
        if (str) {
            let arr = str.split(',');
            let cnt = arr.length;
            for (let i = 0; i < cnt; i += 2) {
                this.$pageIds.push(arr[i]);
                this.$pageNames.push(arr[i + 1]);
            }
        }
        let col = xml.children;
        if (col.length > 0) {
            this.$actions = this.$actions || [];
            col.forEach(cxml => {
                let action = this.createAction(cxml.attributes.type);
                action.setup(cxml);
                this.$actions.push(action);
            });
        }
        str = xml.attributes.transitions;
        if (str) {
            this.$actions = this.$actions || [];
            let k, e;
            str.split(',').forEach(str => {
                if (str && str.length) {
                    let pt = new PlayTransitionAction();
                    k = str.indexOf('=');
                    pt.transitionName = str.substr(k + 1);
                    str = str.substring(0, k);
                    k = str.indexOf('-');
                    e = parseInt(str.substring(k + 1));
                    if (e < this.$pageIds.length)
                        pt.toPage = [this.$pageIds[e]];
                    str = str.substring(0, k);
                    if (str != '*') {
                        e = parseInt(str);
                        if (e < this.$pageIds.length)
                            pt.fromPage = [this.$pageIds[e]];
                    }
                    pt.stopOnExit = true;
                    this.$actions.push(pt);
                }
            });
        }
        if (this.$parent && this.$pageIds.length > 0)
            this.$selectedIndex = 0;
        else
            this.$selectedIndex = -1;
    }
}
Controller.$nextPageId = 0;

class NumberUtil {
    static clamp(value, min, max) {
        if (value < min)
            value = min;
        else if (value > max)
            value = max;
        return value;
    }
    static clamp01(value) {
        if (value > 1)
            value = 1;
        else if (value < 0)
            value = 0;
        return value;
    }
    static isNumber(n) {
        if (typeof n != 'number')
            return false;
        if (isNaN(n))
            return false;
        return true;
    }
    static sign(x) {
        x = Number(x);
        if (x === 0 || isNaN(x))
            return x;
        return x > 0 ? 1 : -1;
    }
    static angleToRadian(n) {
        return n * NumberUtil.RADIAN;
    }
    static lerp(s, e, p) {
        return s + p * (e - s);
    }
}
NumberUtil.RADIAN = Math.PI / 180;

const isMobile = isMobileCall(window.navigator);

class ScrollPane extends createjs.EventDispatcher {
    constructor(owner, scrollType, scrollBarMargin, scrollBarDisplay, flags, vtScrollBarRes, hzScrollBarRes, headerRes, footerRes) {
        super();
        this.$isDragging = false;
        this.$owner = owner;
        this.$maskContainer = new UIContainer(null);
        this.$owner.$rootContainer.addChild(this.$maskContainer);
        this.$container = this.$owner.$container;
        this.$container.x = 0;
        this.$container.y = 0;
        this.$maskContainer.addChild(this.$container);
        this.$scrollBarMargin = scrollBarMargin;
        this.$scrollType = scrollType;
        this.$scrollSpeed = UIConfig.defaultScrollSpeed;
        this.$mouseWheelSpeed = this.$scrollSpeed * 2;
        this.$decelerationRate = UIConfig.defaultScrollDecelerationRate;
        this.$displayOnLeft = (flags & 1 /* DisplayOnLeft */) != 0;
        this.$snapToItem = (flags & 2 /* SnapToItem */) != 0;
        this.$displayOnDemand = (flags & 4 /* DisplayOnDemand */) != 0;
        this.$pageMode = (flags & 8 /* PageMode */) != 0;
        if (flags & 16 /* TouchEffect */)
            this.$touchEffect = true;
        else if (flags & 32 /* DisableTouchEffect */)
            this.$touchEffect = false;
        else
            this.$touchEffect = UIConfig.defaultScrollTouchEffect;
        if (flags & 64 /* BounceEffect */)
            this.$bouncebackEffect = true;
        else if (flags & 128 /* DisableBounceEffect */)
            this.$bouncebackEffect = false;
        else
            this.$bouncebackEffect = UIConfig.defaultScrollBounceEffect;
        this.$inertiaDisabled = (flags & 256 /* DisableInertia */) != 0;
        if ((flags & 512 /* DisableScissorRect */) == 0)
            this.$maskContainer.scrollRect = new createjs.Rectangle();
        this.$scrollBarVisible = true;
        this.$mouseWheelEnabled = true;
        this.$xPos = 0;
        this.$yPos = 0;
        this.$aniFlag = 0;
        this.$footerLockedSize = 0;
        this.$headerLockedSize = 0;
        if (scrollBarDisplay == 0 /* Default */)
            scrollBarDisplay = UIConfig.defaultScrollBarDisplay;
        this.$viewSize = new createjs.Point();
        this.$contentSize = new createjs.Point();
        this.$pageSize = new createjs.Point(1, 1);
        this.$overlapSize = new createjs.Point();
        this.$tweening = 0;
        this.$tweenTime = new createjs.Point();
        this.$tweenStart = new createjs.Point();
        this.$tweenDuration = new createjs.Point();
        this.$tweenChange = new createjs.Point();
        this.$velocity = new createjs.Point();
        this.$containerPos = new createjs.Point();
        this.$beginTouchPos = new createjs.Point();
        this.$lastTouchPos = new createjs.Point();
        this.$lastTouchGlobalPos = new createjs.Point();
        let res;
        if (scrollBarDisplay != 3 /* Hidden */) {
            if (this.$scrollType == 2 /* Both */ || this.$scrollType == 1 /* Vertical */) {
                const res = vtScrollBarRes ? vtScrollBarRes : UIConfig.verticalScrollBar;
                if (res) {
                    this.$vtScrollBar = UIPackage.createObjectFromURL(res);
                    if (!this.$vtScrollBar)
                        throw new Error(`Cannot create scrollbar from ${res}`);
                    this.$vtScrollBar.setScrollPane(this, true);
                    this.$owner.$rootContainer.addChild(this.$vtScrollBar.displayObject);
                }
            }
            if (this.$scrollType == 2 /* Both */ || this.$scrollType == 0 /* Horizontal */) {
                res = hzScrollBarRes ? hzScrollBarRes : UIConfig.horizontalScrollBar;
                if (res) {
                    this.$hzScrollBar = UIPackage.createObjectFromURL(res);
                    if (!this.$hzScrollBar)
                        throw new Error(`Cannot create scrollbar from ${res}`);
                    this.$hzScrollBar.setScrollPane(this, false);
                    this.$owner.$rootContainer.addChild(this.$hzScrollBar.displayObject);
                }
            }
            this.$scrollBarDisplayAuto = scrollBarDisplay == 2 /* Auto */;
            if (this.$scrollBarDisplayAuto) {
                this.$scrollBarVisible = false;
                if (this.$vtScrollBar)
                    this.$vtScrollBar.displayObject.visible = false;
                if (this.$hzScrollBar)
                    this.$hzScrollBar.displayObject.visible = false;
            }
        }
        else
            this.$mouseWheelEnabled = false;
        if (headerRes) {
            this.$header = UIPackage.createObjectFromURL(headerRes);
            if (this.$header == null)
                throw new Error(`Cannot create scrollPane.header from ${res}`);
        }
        if (footerRes) {
            this.$footer = UIPackage.createObjectFromURL(footerRes);
            if (this.$footer == null)
                throw new Error(`Cannot create scrollPane.footer from ${res}`);
        }
        if (this.$header != null || this.$footer != null)
            this.$refreshBarAxis =
                this.$scrollType == 2 /* Both */ || this.$scrollType == 1 /* Vertical */ ? 'y' : 'x';
        this.setSize(owner.width, owner.height);
        this.$owner.on(InteractiveEvents.Over, this.$rollOver, this);
        this.$owner.on(InteractiveEvents.Out, this.$rollOut, this);
        this.$owner.on(InteractiveEvents.Down, this.$mouseDown, this);
        this.$owner.on("__mouseWheel" /* MOUSE_WHEEL */, this.$mouseWheel, this);
    }
    get owner() {
        return this.$owner;
    }
    dispose() {
        if (this.$tweening != 0)
            GTimer.inst.remove(this.tweenUpdate, this);
        this.$pageController = null;
        if (this.$hzScrollBar != null)
            this.$hzScrollBar.dispose();
        if (this.$vtScrollBar != null)
            this.$vtScrollBar.dispose();
        if (this.$header != null)
            this.$header.dispose();
        if (this.$footer != null)
            this.$footer.dispose();
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Move, this.$mouseMoveEvent);
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseUpEvent);
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Click, this.$clickEvent);
        this.$owner.off(InteractiveEvents.Over, this.$rollOver);
        this.$owner.off(InteractiveEvents.Out, this.$rollOut);
        this.$owner.off(InteractiveEvents.Down, this.$mouseDown);
        this.$owner.off("__mouseWheel" /* MOUSE_WHEEL */, this.$mouseWheel);
    }
    get horzScrollBar() {
        return this.$hzScrollBar;
    }
    get vertScrollBar() {
        return this.$vtScrollBar;
    }
    get header() {
        return this.$header;
    }
    get footer() {
        return this.$footer;
    }
    get bouncebackEffect() {
        return this.$bouncebackEffect;
    }
    set bouncebackEffect(sc) {
        this.$bouncebackEffect = sc;
    }
    get touchEffect() {
        return this.$touchEffect;
    }
    set touchEffect(sc) {
        this.$touchEffect = sc;
    }
    set scrollSpeed(val) {
        this.$scrollSpeed = val;
        if (this.$scrollSpeed == 0)
            this.$scrollSpeed = UIConfig.defaultScrollSpeed;
        this.$mouseWheelSpeed = this.$scrollSpeed * 2;
    }
    get scrollSpeed() {
        return this.$scrollSpeed;
    }
    get snapToItem() {
        return this.$snapToItem;
    }
    set snapToItem(value) {
        this.$snapToItem = value;
    }
    get mouseWheelEnabled() {
        return this.$mouseWheelEnabled;
    }
    set mouseWheelEnabled(value) {
        this.$mouseWheelEnabled = value;
    }
    get decelerationRate() {
        return this.$decelerationRate;
    }
    set decelerationRate(value) {
        this.$decelerationRate = value;
    }
    get percX() {
        return this.$overlapSize.x == 0 ? 0 : this.$xPos / this.$overlapSize.x;
    }
    set percX(value) {
        this.setPercX(value, false);
    }
    setPercX(value, ani = false) {
        this.$owner.ensureBoundsCorrect();
        this.setPosX(this.$overlapSize.x * NumberUtil.clamp01(value), ani);
    }
    get percY() {
        return this.$overlapSize.y == 0 ? 0 : this.$yPos / this.$overlapSize.y;
    }
    set percY(value) {
        this.setPercY(value, false);
    }
    setPercY(value, ani = false) {
        this.$owner.ensureBoundsCorrect();
        this.setPosY(this.$overlapSize.y * NumberUtil.clamp01(value), ani);
    }
    get posX() {
        return this.$xPos;
    }
    set posX(value) {
        this.setPosX(value, false);
    }
    setPosX(value, ani = false) {
        this.$owner.ensureBoundsCorrect();
        if (this.$loop == 1)
            value = this.loopCheckingNewPos(value, 'x');
        value = NumberUtil.clamp(value, 0, this.$overlapSize.x);
        if (value != this.$xPos) {
            this.$xPos = value;
            this.posChanged(ani);
        }
    }
    get posY() {
        return this.$yPos;
    }
    set posY(value) {
        this.setPosY(value, false);
    }
    setPosY(value, ani = false) {
        this.$owner.ensureBoundsCorrect();
        if (this.$loop == 1)
            value = this.loopCheckingNewPos(value, 'y');
        value = NumberUtil.clamp(value, 0, this.$overlapSize.y);
        if (value != this.$yPos) {
            this.$yPos = value;
            this.posChanged(ani);
        }
    }
    get contentWidth() {
        return this.$contentSize.x;
    }
    get contentHeight() {
        return this.$contentSize.y;
    }
    get viewWidth() {
        return this.$viewSize.x;
    }
    set viewWidth(value) {
        value = value + this.$owner.margin.left + this.$owner.margin.right;
        if (this.$vtScrollBar != null)
            value += this.$vtScrollBar.width;
        this.$owner.width = value;
    }
    get viewHeight() {
        return this.$viewSize.y;
    }
    set viewHeight(value) {
        value = value + this.$owner.margin.top + this.$owner.margin.bottom;
        if (this.$hzScrollBar != null)
            value += this.$hzScrollBar.height;
        this.$owner.height = value;
    }
    get currentPageX() {
        if (!this.$pageMode)
            return 0;
        var page = Math.floor(this.$xPos / this.$pageSize.x);
        if (this.$xPos - page * this.$pageSize.x > this.$pageSize.x * 0.5)
            page++;
        return page;
    }
    set currentPageX(value) {
        if (this.$pageMode && this.$overlapSize.x > 0)
            this.setPosX(value * this.$pageSize.x, false);
    }
    get currentPageY() {
        if (!this.$pageMode)
            return 0;
        let page = Math.floor(this.$yPos / this.$pageSize.y);
        if (this.$yPos - page * this.$pageSize.y > this.$pageSize.y * 0.5)
            page++;
        return page;
    }
    set currentPageY(value) {
        if (this.$pageMode && this.$overlapSize.y > 0)
            this.setPosY(value * this.$pageSize.y, false);
    }
    get isBottomMost() {
        return this.$yPos == this.$overlapSize.y || this.$overlapSize.y == 0;
    }
    get isRightMost() {
        return this.$xPos == this.$overlapSize.x || this.$overlapSize.x == 0;
    }
    get pageController() {
        return this.$pageController;
    }
    set pageController(value) {
        this.$pageController = value;
    }
    get scrollingPosX() {
        return NumberUtil.clamp(-this.$container.x, 0, this.$overlapSize.x);
    }
    get scrollingPosY() {
        return NumberUtil.clamp(-this.$container.y, 0, this.$overlapSize.y);
    }
    scrollTop(ani = false) {
        this.setPercY(0, ani);
    }
    scrollBottom(ani = false) {
        this.setPercY(1, ani);
    }
    scrollUp(ratio = 1, ani = false) {
        if (this.$pageMode)
            this.setPosY(this.$yPos - this.$pageSize.y * ratio, ani);
        else
            this.setPosY(this.$yPos - this.$scrollSpeed * ratio, ani);
    }
    scrollDown(ratio = 1, ani = false) {
        if (this.$pageMode)
            this.setPosY(this.$yPos + this.$pageSize.y * ratio, ani);
        else
            this.setPosY(this.$yPos + this.$scrollSpeed * ratio, ani);
    }
    scrollLeft(ratio = 1, ani = false) {
        if (this.$pageMode)
            this.setPosX(this.$xPos - this.$pageSize.x * ratio, ani);
        else
            this.setPosX(this.$xPos - this.$scrollSpeed * ratio, ani);
    }
    scrollRight(ratio = 1, ani = false) {
        if (this.$pageMode)
            this.setPosX(this.$xPos + this.$pageSize.x * ratio, ani);
        else
            this.setPosX(this.$xPos + this.$scrollSpeed * ratio, ani);
    }
    scrollToView(target, ani = false, snapToFirst = false) {
        this.$owner.ensureBoundsCorrect();
        if (this.$needRefresh)
            this.refresh();
        let rect;
        if (target instanceof GObject) {
            if (target.parent != this.$owner) {
                target.parent.localToGlobalRect(target.x, target.y, target.width, target.height, ScrollPane.sHelperRect);
                rect = this.$owner.globalToLocalRect(ScrollPane.sHelperRect.x, ScrollPane.sHelperRect.y, ScrollPane.sHelperRect.width, ScrollPane.sHelperRect.height, ScrollPane.sHelperRect);
            }
            else {
                rect = ScrollPane.sHelperRect;
                rect.x = target.x;
                rect.y = target.y;
                rect.width = target.width;
                rect.height = target.height;
            }
        }
        else
            rect = target;
        if (this.$overlapSize.y > 0) {
            const bottom = this.$yPos + this.$viewSize.y;
            if (snapToFirst || rect.y <= this.$yPos || rect.height >= this.$viewSize.y) {
                if (this.$pageMode)
                    this.setPosY(Math.floor(rect.y / this.$pageSize.y) * this.$pageSize.y, ani);
                else
                    this.setPosY(rect.y, ani);
            }
            else if (rect.y + rect.height > bottom) {
                if (this.$pageMode)
                    this.setPosY(Math.floor(rect.y / this.$pageSize.y) * this.$pageSize.y, ani);
                else if (rect.height <= this.$viewSize.y / 2)
                    this.setPosY(rect.y + rect.height * 2 - this.$viewSize.y, ani);
                else
                    this.setPosY(rect.y + rect.height - this.$viewSize.y, ani);
            }
        }
        if (this.$overlapSize.x > 0) {
            let right = this.$xPos + this.$viewSize.x;
            if (snapToFirst || rect.x <= this.$xPos || rect.width >= this.$viewSize.x) {
                if (this.$pageMode)
                    this.setPosX(Math.floor(rect.x / this.$pageSize.x) * this.$pageSize.x, ani);
                else
                    this.setPosX(rect.x, ani);
            }
            else if (rect.x + rect.width > right) {
                if (this.$pageMode)
                    this.setPosX(Math.floor(rect.x / this.$pageSize.x) * this.$pageSize.x, ani);
                else if (rect.width <= this.$viewSize.x / 2)
                    this.setPosX(rect.x + rect.width * 2 - this.$viewSize.x, ani);
                else
                    this.setPosX(rect.x + rect.width - this.$viewSize.x, ani);
            }
        }
        if (!ani && this.$needRefresh)
            this.refresh();
    }
    isChildInView(obj) {
        if (this.$overlapSize.y > 0) {
            var dist = obj.y + this.$container.y;
            if (dist < -obj.height || dist > this.$viewSize.y)
                return false;
        }
        if (this.$overlapSize.x > 0) {
            dist = obj.x + this.$container.x;
            if (dist < -obj.width || dist > this.$viewSize.x)
                return false;
        }
        return true;
    }
    cancelDragging() {
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Move, this.$mouseMoveEvent);
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseUpEvent);
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Click, this.$clickEvent);
        if (ScrollPane.draggingPane == this)
            ScrollPane.draggingPane = null;
        ScrollPane.$gestureFlag = 0;
        this.$isDragging = false;
        this.$maskContainer.mouseEnabled = true;
    }
    get isDragging() {
        return this.$isDragging;
    }
    lockHeader(size) {
        if (this.$headerLockedSize == size)
            return;
        this.$headerLockedSize = size;
        if (!this.$refreshEventDispatching &&
            this.$container[this.$refreshBarAxis] >= 0) {
            this.$tweenStart.setValues(this.$container.x, this.$container.y);
            this.$tweenChange.setValues(0, 0);
            this.$tweenChange[this.$refreshBarAxis] =
                this.$headerLockedSize - this.$tweenStart[this.$refreshBarAxis];
            this.$tweenDuration.setValues(ScrollPane.TWEEN_DEFAULT_DURATION, ScrollPane.TWEEN_DEFAULT_DURATION);
            this.$tweenTime.setValues(0, 0);
            this.$tweening = 2;
            GTimer.inst.addLoop(1, this.tweenUpdate, this);
        }
    }
    lockFooter(size) {
        if (this.$footerLockedSize == size)
            return;
        this.$footerLockedSize = size;
        if (!this.$refreshEventDispatching &&
            this.$container[this.$refreshBarAxis] <=
                -this.$overlapSize[this.$refreshBarAxis]) {
            this.$tweenStart.setValues(this.$container.x, this.$container.y);
            this.$tweenChange.setValues(0, 0);
            let max = this.$overlapSize[this.$refreshBarAxis];
            if (max == 0)
                max = Math.max(this.$contentSize[this.$refreshBarAxis] +
                    this.$footerLockedSize -
                    this.$viewSize[this.$refreshBarAxis], 0);
            else
                max += this.$footerLockedSize;
            this.$tweenChange[this.$refreshBarAxis] =
                -max - this.$tweenStart[this.$refreshBarAxis];
            this.$tweenDuration.setValues(ScrollPane.TWEEN_DEFAULT_DURATION, ScrollPane.TWEEN_DEFAULT_DURATION);
            this.$tweenTime.setValues(0, 0);
            this.$tweening = 2;
            GTimer.inst.addLoop(1, this.tweenUpdate, this);
        }
    }
    /**
     * @internal
     */
    onOwnerSizeChanged() {
        this.setSize(this.$owner.width, this.$owner.height);
        this.posChanged(false);
    }
    /**
     * @internal
     */
    handleControllerChanged(c) {
        if (this.$pageController == c) {
            if (this.$scrollType == 0 /* Horizontal */)
                this.currentPageX = c.selectedIndex;
            else
                this.currentPageY = c.selectedIndex;
        }
    }
    updatePageController() {
        if (this.$pageController != null && !this.$pageController.$updating) {
            let index;
            if (this.$scrollType == 0 /* Horizontal */)
                index = this.currentPageX;
            else
                index = this.currentPageY;
            if (index < this.$pageController.pageCount) {
                const c = this.$pageController;
                this.$pageController = null; //prevent from handleControllerChanged calling
                c.selectedIndex = index;
                this.$pageController = c;
            }
        }
    }
    /**
     * @internal
     */
    adjustMaskContainer() {
        let x, y;
        if (this.$displayOnLeft && this.$vtScrollBar != null)
            x = Math.floor(this.$owner.margin.left + this.$vtScrollBar.width);
        else
            x = Math.floor(this.$owner.margin.left);
        y = Math.floor(this.$owner.margin.top);
        this.$maskContainer.set({ x, y });
        if (this.$owner.$alignOffset.x != 0 || this.$owner.$alignOffset.y != 0) {
            if (this.$alignContainer == null) {
                this.$alignContainer = new createjs.Container();
                this.$maskContainer.addChild(this.$alignContainer);
                this.$alignContainer.addChild(this.$container);
            }
            this.$alignContainer.set({ x: this.$owner.$alignOffset.x, y: this.$owner.$alignOffset.y });
        }
        else if (this.$alignContainer)
            this.$alignContainer.set({ x: 0, y: 0 });
    }
    setSize(width, height) {
        this.adjustMaskContainer();
        if (this.$hzScrollBar) {
            this.$hzScrollBar.y = height - this.$hzScrollBar.height;
            if (this.$vtScrollBar && !this.$vScrollNone) {
                this.$hzScrollBar.width =
                    width - this.$vtScrollBar.width - this.$scrollBarMargin.left - this.$scrollBarMargin.right;
                if (this.$displayOnLeft)
                    this.$hzScrollBar.x = this.$scrollBarMargin.left + this.$vtScrollBar.width;
                else
                    this.$hzScrollBar.x = this.$scrollBarMargin.left;
            }
            else {
                this.$hzScrollBar.width = width - this.$scrollBarMargin.left - this.$scrollBarMargin.right;
                this.$hzScrollBar.x = this.$scrollBarMargin.left;
            }
        }
        if (this.$vtScrollBar) {
            if (!this.$displayOnLeft)
                this.$vtScrollBar.x = width - this.$vtScrollBar.width;
            if (this.$hzScrollBar)
                this.$vtScrollBar.height =
                    height -
                        this.$hzScrollBar.height -
                        this.$scrollBarMargin.top -
                        this.$scrollBarMargin.bottom;
            else
                this.$vtScrollBar.height = height - this.$scrollBarMargin.top - this.$scrollBarMargin.bottom;
            this.$vtScrollBar.y = this.$scrollBarMargin.top;
        }
        this.$viewSize.x = width;
        this.$viewSize.y = height;
        if (this.$hzScrollBar && !this.$hScrollNone)
            this.$viewSize.y -= this.$hzScrollBar.height;
        if (this.$vtScrollBar && !this.$vScrollNone)
            this.$viewSize.x -= this.$vtScrollBar.width;
        this.$viewSize.x -= this.$owner.margin.left + this.$owner.margin.right;
        this.$viewSize.y -= this.$owner.margin.top + this.$owner.margin.bottom;
        this.$viewSize.x = Math.max(1, this.$viewSize.x);
        this.$viewSize.y = Math.max(1, this.$viewSize.y);
        this.$pageSize.x = this.$viewSize.x;
        this.$pageSize.y = this.$viewSize.y;
        this.handleSizeChanged();
    }
    setContentSize(w, h) {
        if (this.$contentSize.x == w && this.$contentSize.y == h)
            return;
        this.$contentSize.x = w;
        this.$contentSize.y = h;
        this.handleSizeChanged();
    }
    /**
     * @internal
     */
    changeContentSizeOnScrolling(deltaWidth, deltaHeight, deltaPosX, deltaPosY) {
        const isRightmost = this.$xPos == this.$overlapSize.x;
        const isBottom = this.$yPos == this.$overlapSize.y;
        this.$contentSize.x += deltaWidth;
        this.$contentSize.y += deltaHeight;
        this.handleSizeChanged();
        if (this.$tweening == 1) {
            //if the last scroll is CLINGING-SIDE, then just continue to cling
            if (deltaWidth != 0 && isRightmost && this.$tweenChange.x < 0) {
                this.$xPos = this.$overlapSize.x;
                this.$tweenChange.x = -this.$xPos - this.$tweenStart.x;
            }
            if (deltaHeight != 0 && isBottom && this.$tweenChange.y < 0) {
                this.$yPos = this.$overlapSize.y;
                this.$tweenChange.y = -this.$yPos - this.$tweenStart.y;
            }
        }
        else if (this.$tweening == 2) {
            //re-pos to ensure the scrolling will go on smooth
            if (deltaPosX != 0) {
                this.$container.x -= deltaPosX;
                this.$tweenStart.x -= deltaPosX;
                this.$xPos = -this.$container.x;
            }
            if (deltaPosY != 0) {
                this.$container.y -= deltaPosY;
                this.$tweenStart.y -= deltaPosY;
                this.$yPos = -this.$container.y;
            }
        }
        else if (this.$isDragging) {
            if (deltaPosX != 0) {
                this.$container.x -= deltaPosX;
                this.$containerPos.x -= deltaPosX;
                this.$xPos = -this.$container.x;
            }
            if (deltaPosY != 0) {
                this.$container.y -= deltaPosY;
                this.$containerPos.y -= deltaPosY;
                this.$yPos = -this.$container.y;
            }
        }
        else {
            //if the last scroll is CLINGING-SIDE, then just continue to cling
            if (deltaWidth != 0 && isRightmost) {
                this.$xPos = this.$overlapSize.x;
                this.$container.x = -this.$xPos;
            }
            if (deltaHeight != 0 && isBottom) {
                this.$yPos = this.$overlapSize.y;
                this.$container.y = -this.$yPos;
            }
        }
        if (this.$pageMode)
            this.updatePageController();
    }
    handleSizeChanged(onScrolling = false) {
        if (this.$displayOnDemand) {
            if (this.$vtScrollBar) {
                if (this.$contentSize.y <= this.$viewSize.y) {
                    if (!this.$vScrollNone) {
                        this.$vScrollNone = true;
                        this.$viewSize.x += this.$vtScrollBar.width;
                    }
                }
                else {
                    if (this.$vScrollNone) {
                        this.$vScrollNone = false;
                        this.$viewSize.x -= this.$vtScrollBar.width;
                    }
                }
            }
            if (this.$hzScrollBar) {
                if (this.$contentSize.x <= this.$viewSize.x) {
                    if (!this.$hScrollNone) {
                        this.$hScrollNone = true;
                        this.$viewSize.y += this.$hzScrollBar.height;
                    }
                }
                else {
                    if (this.$hScrollNone) {
                        this.$hScrollNone = false;
                        this.$viewSize.y -= this.$hzScrollBar.height;
                    }
                }
            }
        }
        if (this.$vtScrollBar) {
            if (this.$viewSize.y < this.$vtScrollBar.minSize)
                //use this.$vtScrollBar.displayObject.visible instead of this.$vtScrollBar.visible... ScrollBar actually is not in its owner's display tree, so vtScrollBar.visible will not work
                this.$vtScrollBar.displayObject.visible = false;
            else {
                this.$vtScrollBar.displayObject.visible = this.$scrollBarVisible && !this.$vScrollNone;
                if (this.$contentSize.y == 0)
                    this.$vtScrollBar.displayPerc = 0;
                else
                    this.$vtScrollBar.displayPerc = Math.min(1, this.$viewSize.y / this.$contentSize.y);
            }
        }
        if (this.$hzScrollBar) {
            if (this.$viewSize.x < this.$hzScrollBar.minSize)
                this.$hzScrollBar.displayObject.visible = false;
            else {
                this.$hzScrollBar.displayObject.visible = this.$scrollBarVisible && !this.$hScrollNone;
                if (this.$contentSize.x == 0)
                    this.$hzScrollBar.displayPerc = 0;
                else
                    this.$hzScrollBar.displayPerc = Math.min(1, this.$viewSize.x / this.$contentSize.x);
            }
        }
        const rect = this.$maskContainer.scrollRect;
        if (rect) {
            rect.width = this.$viewSize.x;
            rect.height = this.$viewSize.y;
            this.$maskContainer.scrollRect = rect;
        }
        if (this.$scrollType == 0 /* Horizontal */ || this.$scrollType == 2 /* Both */)
            this.$overlapSize.x = Math.ceil(Math.max(0, this.$contentSize.x - this.$viewSize.x));
        else
            this.$overlapSize.x = 0;
        if (this.$scrollType == 1 /* Vertical */ || this.$scrollType == 2 /* Both */)
            this.$overlapSize.y = Math.ceil(Math.max(0, this.$contentSize.y - this.$viewSize.y));
        else
            this.$overlapSize.y = 0;
        //bounds checking
        this.$xPos = NumberUtil.clamp(this.$xPos, 0, this.$overlapSize.x);
        this.$yPos = NumberUtil.clamp(this.$yPos, 0, this.$overlapSize.y);
        if (this.$refreshBarAxis != null) {
            var max = this.$overlapSize[this.$refreshBarAxis];
            if (max == 0)
                max = Math.max(this.$contentSize[this.$refreshBarAxis] +
                    this.$footerLockedSize -
                    this.$viewSize[this.$refreshBarAxis], 0);
            else
                max += this.$footerLockedSize;
            if (this.$refreshBarAxis == 'x') {
                this.$container.set({
                    x: NumberUtil.clamp(this.$container.x, -max, this.$headerLockedSize),
                    y: NumberUtil.clamp(this.$container.y, -this.$overlapSize.y, 0)
                });
            }
            else {
                this.$container.set({
                    x: NumberUtil.clamp(this.$container.x, -this.$overlapSize.x, 0),
                    y: NumberUtil.clamp(this.$container.y, -max, this.$headerLockedSize)
                });
            }
            if (this.$header != null) {
                if (this.$refreshBarAxis == 'x')
                    this.$header.height = this.$viewSize.y;
                else
                    this.$header.width = this.$viewSize.x;
            }
            if (this.$footer != null) {
                if (this.$refreshBarAxis == 'y')
                    this.$footer.height = this.$viewSize.y;
                else
                    this.$footer.width = this.$viewSize.x;
            }
        }
        else {
            this.$container.set({
                x: NumberUtil.clamp(this.$container.x, -this.$overlapSize.x, 0),
                y: NumberUtil.clamp(this.$container.y, -this.$overlapSize.y, 0)
            });
        }
        this.syncScrollBar();
        this.checkRefreshBar();
        if (this.$pageMode)
            this.updatePageController();
    }
    posChanged(ani) {
        if (this.$aniFlag == 0)
            this.$aniFlag = ani ? 1 : -1;
        else if (this.$aniFlag == 1 && !ani)
            this.$aniFlag = -1;
        this.$needRefresh = true;
        GTimer.inst.callLater(this.refresh, this);
    }
    refresh() {
        this.$needRefresh = false;
        GTimer.inst.remove(this.refresh, this);
        if (this.$pageMode || this.$snapToItem) {
            ScrollPane.sEndPos.setValues(-this.$xPos, -this.$yPos);
            this.alignPosition(ScrollPane.sEndPos, false);
            this.$xPos = -ScrollPane.sEndPos.x;
            this.$yPos = -ScrollPane.sEndPos.y;
        }
        this.refresh2();
        let evt = new createjs.Event("__scroll" /* SCROLL */, true, false);
        this.dispatchEvent(evt, this);
        if (this.$needRefresh) {
            //developer might modify position in the callback, so here refresh again to avoid flickering
            this.$needRefresh = false;
            GTimer.inst.remove(this.refresh, this);
            this.refresh2();
        }
        this.syncScrollBar();
        this.$aniFlag = 0;
    }
    refresh2() {
        if (this.$aniFlag == 1 && !this.$isDragging) {
            let posX;
            let posY;
            if (this.$overlapSize.x > 0)
                posX = -Math.floor(this.$xPos);
            else {
                if (this.$container.x != 0)
                    this.$container.x = 0;
                posX = 0;
            }
            if (this.$overlapSize.y > 0)
                posY = -Math.floor(this.$yPos);
            else {
                if (this.$container.y != 0)
                    this.$container.y = 0;
                posY = 0;
            }
            if (posX != this.$container.x || posY != this.$container.y) {
                this.$tweening = 1;
                this.$tweenTime.setValues(0, 0);
                this.$tweenDuration.setValues(ScrollPane.TWEEN_MANUALLY_SET_DURATION, ScrollPane.TWEEN_MANUALLY_SET_DURATION);
                this.$tweenStart.setValues(this.$container.x, this.$container.y);
                this.$tweenChange.setValues(posX - this.$tweenStart.x, posY - this.$tweenStart.y);
                GTimer.inst.addLoop(1, this.tweenUpdate, this);
            }
            else if (this.$tweening != 0)
                this.killTween();
        }
        else {
            if (this.$tweening != 0)
                this.killTween();
            this.$container.set({ x: Math.floor(-this.$xPos), y: Math.floor(-this.$yPos) });
            this.loopCheckingCurrent();
        }
        if (this.$pageMode)
            this.updatePageController();
    }
    syncScrollBar(end = false) {
        if (this.$vtScrollBar != null) {
            this.$vtScrollBar.scrollPerc =
                this.$overlapSize.y == 0
                    ? 0
                    : NumberUtil.clamp(-this.$container.y, 0, this.$overlapSize.y) / this.$overlapSize.y;
            if (this.$scrollBarDisplayAuto)
                this.showScrollBar(!end);
        }
        if (this.$hzScrollBar != null) {
            this.$hzScrollBar.scrollPerc =
                this.$overlapSize.x == 0
                    ? 0
                    : NumberUtil.clamp(-this.$container.x, 0, this.$overlapSize.x) / this.$overlapSize.x;
            if (this.$scrollBarDisplayAuto)
                this.showScrollBar(!end);
        }
        if (end)
            this.$maskContainer.mouseEnabled = true;
    }
    $mouseDown(e) {
        if (!this.$touchEffect)
            return;
        if (this.$tweening != 0) {
            this.killTween();
            this.$isDragging = true;
        }
        else
            this.$isDragging = false;
        const globalMouse = isMobile.any
            ? this.$owner.globalToLocal(e.localX, e.localY)
            : this.$owner.globalToLocal(Decls$1.GRoot.globalMouseStatus.mouseX, Decls$1.GRoot.globalMouseStatus.mouseY, ScrollPane.sHelperPoint);
        this.$containerPos.setValues(this.$container.x, this.$container.y);
        this.$beginTouchPos.copy(globalMouse);
        this.$lastTouchPos.copy(globalMouse);
        this.$lastTouchGlobalPos.copy(globalMouse);
        this.$isHoldAreaDone = false;
        this.$velocity.setValues(0, 0);
        this.$velocityScale = 1;
        this.$lastMoveTime = GTimer.inst.curTime / 1000;
        this.$mouseMoveEvent = Decls$1.GRoot.inst.nativeStage.on(InteractiveEvents.Move, this.$mouseMove, this);
        this.$mouseUpEvent = Decls$1.GRoot.inst.nativeStage.on(InteractiveEvents.Up, this.$mouseUp, this);
        this.$clickEvent = Decls$1.GRoot.inst.nativeStage.on(InteractiveEvents.Click, this.$click, this);
    }
    $mouseMove() {
        if (!this.$touchEffect)
            return;
        if ((ScrollPane.draggingPane != null && ScrollPane.draggingPane != this) ||
            GObject.draggingObject != null)
            return;
        let sensitivity = UIConfig.touchScrollSensitivity;
        const globalMouse = this.$owner.globalToLocal(Decls$1.GRoot.globalMouseStatus.mouseX, Decls$1.GRoot.globalMouseStatus.mouseY, ScrollPane.sHelperPoint);
        let diff, diff2;
        let sv, sh;
        if (this.$scrollType == 1 /* Vertical */) {
            if (!this.$isHoldAreaDone) {
                //gesture on vertical dir is being observed
                ScrollPane.$gestureFlag |= 1;
                diff = Math.abs(this.$beginTouchPos.y - globalMouse.y);
                if (diff < sensitivity)
                    return;
                if ((ScrollPane.$gestureFlag & 2) != 0) {
                    diff2 = Math.abs(this.$beginTouchPos.x - globalMouse.x);
                    if (diff < diff2)
                        return;
                }
            }
            sv = true;
        }
        else if (this.$scrollType == 0 /* Horizontal */) {
            if (!this.$isHoldAreaDone) {
                ScrollPane.$gestureFlag |= 2; //gesture on horz dir is being observed
                diff = Math.abs(this.$beginTouchPos.x - globalMouse.x);
                if (diff < sensitivity)
                    return;
                if ((ScrollPane.$gestureFlag & 1) != 0) {
                    diff2 = Math.abs(this.$beginTouchPos.y - globalMouse.y);
                    if (diff < diff2)
                        return;
                }
            }
            sh = true;
        }
        else {
            ScrollPane.$gestureFlag = 3; //both
            if (!this.$isHoldAreaDone) {
                diff = Math.abs(this.$beginTouchPos.y - globalMouse.y);
                if (diff < sensitivity) {
                    diff = Math.abs(this.$beginTouchPos.x - globalMouse.x);
                    if (diff < sensitivity)
                        return;
                }
            }
            sv = sh = true;
        }
        let newPosX = Math.floor(this.$containerPos.x + globalMouse.x - this.$beginTouchPos.x);
        let newPosY = Math.floor(this.$containerPos.y + globalMouse.y - this.$beginTouchPos.y);
        if (sv) {
            if (newPosY > 0) {
                if (!this.$bouncebackEffect)
                    this.$container.y = 0;
                else if (this.$header != null && this.$header.height != 0)
                    //TODO: height -> maxHeight
                    this.$container.y = Math.floor(Math.min(newPosY * 0.5, this.$header.height));
                else
                    this.$container.y = Math.floor(Math.min(newPosY * 0.5, this.$viewSize.y * ScrollPane.PULL_DIST_RATIO));
            }
            else if (newPosY < -this.$overlapSize.y) {
                if (!this.$bouncebackEffect)
                    this.$container.y = -this.$overlapSize.y;
                else if (this.$footer != null && this.$footer.height > 0)
                    //TODO: height -> maxHeight
                    this.$container.y = Math.floor(Math.max((newPosY + this.$overlapSize.y) * 0.5, -this.$footer.height) -
                        this.$overlapSize.y);
                else
                    this.$container.y = Math.floor(Math.max((newPosY + this.$overlapSize.y) * 0.5, -this.$viewSize.y * ScrollPane.PULL_DIST_RATIO) - this.$overlapSize.y);
            }
            else
                this.$container.y = newPosY;
        }
        if (sh) {
            if (newPosX > 0) {
                if (!this.$bouncebackEffect)
                    this.$container.x = 0;
                else if (this.$header != null && this.$header.width != 0)
                    //TODO: width -> maxWidth
                    this.$container.x = Math.floor(Math.min(newPosX * 0.5, this.$header.width));
                else
                    this.$container.x = Math.floor(Math.min(newPosX * 0.5, this.$viewSize.x * ScrollPane.PULL_DIST_RATIO));
            }
            else if (newPosX < 0 - this.$overlapSize.x) {
                if (!this.$bouncebackEffect)
                    this.$container.x = -this.$overlapSize.x;
                else if (this.$footer != null && this.$footer.width > 0)
                    //TODO: width -> maxWidth
                    this.$container.x = Math.floor(Math.max((newPosX + this.$overlapSize.x) * 0.5, -this.$footer.width) -
                        this.$overlapSize.x);
                else
                    this.$container.x = Math.floor(Math.max((newPosX + this.$overlapSize.x) * 0.5, -this.$viewSize.x * ScrollPane.PULL_DIST_RATIO) - this.$overlapSize.x);
            }
            else
                this.$container.x = newPosX;
        }
        //update acceleration
        const frameRate = createjs.Ticker.framerate;
        const now = GTimer.inst.curTime / 1000;
        const deltaTime = Math.max(now - this.$lastMoveTime, 1 / frameRate);
        let deltaPositionX = globalMouse.x - this.$lastTouchPos.x;
        let deltaPositionY = globalMouse.y - this.$lastTouchPos.y;
        if (!sh)
            deltaPositionX = 0;
        if (!sv)
            deltaPositionY = 0;
        if (deltaTime != 0) {
            const elapsed = deltaTime * frameRate - 1;
            if (elapsed > 1) {
                const factor = Math.pow(0.833, elapsed);
                this.$velocity.x = this.$velocity.x * factor;
                this.$velocity.y = this.$velocity.y * factor;
            }
            this.$velocity.x = NumberUtil.lerp(this.$velocity.x, (deltaPositionX * 60) / frameRate / deltaTime, deltaTime * 10);
            this.$velocity.y = NumberUtil.lerp(this.$velocity.y, (deltaPositionY * 60) / frameRate / deltaTime, deltaTime * 10);
        }
        //in the inertia scrolling we need the offset value to screen space, so here we need to reocrd the offset ratio
        const deltaGlobalPositionX = this.$lastTouchGlobalPos.x - globalMouse.x;
        const deltaGlobalPositionY = this.$lastTouchGlobalPos.y - globalMouse.y;
        if (deltaPositionX != 0)
            this.$velocityScale = Math.abs(deltaGlobalPositionX / deltaPositionX);
        else if (deltaPositionY != 0)
            this.$velocityScale = Math.abs(deltaGlobalPositionY / deltaPositionY);
        this.$lastTouchPos.copy(globalMouse);
        this.$lastTouchGlobalPos.copy(globalMouse);
        this.$lastMoveTime = now;
        //update position
        if (this.$overlapSize.x > 0)
            this.$xPos = NumberUtil.clamp(-this.$container.x, 0, this.$overlapSize.x);
        if (this.$overlapSize.y > 0)
            this.$yPos = NumberUtil.clamp(-this.$container.y, 0, this.$overlapSize.y);
        if (this.$loop != 0) {
            newPosX = this.$container.x;
            newPosY = this.$container.y;
            if (this.loopCheckingCurrent()) {
                this.$containerPos.x += this.$container.x - newPosX;
                this.$containerPos.y += this.$container.y - newPosY;
            }
        }
        ScrollPane.draggingPane = this;
        this.$isHoldAreaDone = true;
        this.$isDragging = true;
        // this.$maskContainer.interactive = false;
        this.syncScrollBar();
        this.checkRefreshBar();
        if (this.$pageMode)
            this.updatePageController();
        let evt = new createjs.Event("__scroll" /* SCROLL */, true, false);
        this.dispatchEvent(evt, this);
    }
    $mouseUp() {
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Move, this.$mouseMoveEvent);
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseMoveEvent);
        Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Click, this.$clickEvent);
        if (ScrollPane.draggingPane == this)
            ScrollPane.draggingPane = null;
        ScrollPane.$gestureFlag = 0;
        if (!this.$isDragging || !this.$touchEffect) {
            this.$isDragging = false;
            this.$maskContainer.mouseEnabled = true;
            return;
        }
        this.$isDragging = false;
        this.$maskContainer.mouseEnabled = true;
        this.$tweenStart.setValues(this.$container.x, this.$container.y);
        ScrollPane.sEndPos.setValues(this.$tweenStart.x, this.$tweenStart.y);
        let flag = false;
        if (this.$container.x > 0) {
            ScrollPane.sEndPos.x = 0;
            flag = true;
        }
        else if (this.$container.x < -this.$overlapSize.x) {
            ScrollPane.sEndPos.x = -this.$overlapSize.x;
            flag = true;
        }
        if (this.$container.y > 0) {
            ScrollPane.sEndPos.y = 0;
            flag = true;
        }
        else if (this.$container.y < -this.$overlapSize.y) {
            ScrollPane.sEndPos.y = -this.$overlapSize.y;
            flag = true;
        }
        if (flag) {
            this.$tweenChange.setValues(ScrollPane.sEndPos.x - this.$tweenStart.x, ScrollPane.sEndPos.y - this.$tweenStart.y);
            if (this.$tweenChange.x < -UIConfig.touchDragSensitivity ||
                this.$tweenChange.y < -UIConfig.touchDragSensitivity) {
                this.$refreshEventDispatching = true;
                let evt = new createjs.Event("__pullDownRelease" /* PULL_DOWN_RELEASE */, true, false);
                this.dispatchEvent(evt, this);
                this.$refreshEventDispatching = false;
            }
            else if (this.$tweenChange.x > UIConfig.touchDragSensitivity ||
                this.$tweenChange.y > UIConfig.touchDragSensitivity) {
                this.$refreshEventDispatching = true;
                let evt = new createjs.Event("__pullUpRelease" /* PULL_UP_RELEASE */, true, false);
                this.dispatchEvent(evt, this);
                this.$refreshEventDispatching = false;
            }
            if (this.$headerLockedSize > 0 &&
                ScrollPane.sEndPos[this.$refreshBarAxis] == 0) {
                ScrollPane.sEndPos[this.$refreshBarAxis] = this.$headerLockedSize;
                this.$tweenChange.x = ScrollPane.sEndPos.x - this.$tweenStart.x;
                this.$tweenChange.y = ScrollPane.sEndPos.y - this.$tweenStart.y;
            }
            else if (this.$footerLockedSize > 0 &&
                ScrollPane.sEndPos[this.$refreshBarAxis] ==
                    -this.$overlapSize[this.$refreshBarAxis]) {
                var max = this.$overlapSize[this.$refreshBarAxis];
                if (max == 0)
                    max = Math.max(this.$contentSize[this.$refreshBarAxis] +
                        this.$footerLockedSize -
                        this.$viewSize[this.$refreshBarAxis], 0);
                else
                    max += this.$footerLockedSize;
                ScrollPane.sEndPos[this.$refreshBarAxis] = -max;
                this.$tweenChange.x = ScrollPane.sEndPos.x - this.$tweenStart.x;
                this.$tweenChange.y = ScrollPane.sEndPos.y - this.$tweenStart.y;
            }
            this.$tweenDuration.setValues(ScrollPane.TWEEN_DEFAULT_DURATION, ScrollPane.TWEEN_DEFAULT_DURATION);
        }
        else {
            if (!this.$inertiaDisabled) {
                const frameRate = createjs.Ticker.framerate;
                const elapsed = (GTimer.inst.curTime / 1000 - this.$lastMoveTime) * frameRate - 1;
                if (elapsed > 1) {
                    const factor = Math.pow(0.833, elapsed);
                    this.$velocity.x = this.$velocity.x * factor;
                    this.$velocity.y = this.$velocity.y * factor;
                }
                //calc dist & duration by speed
                this.updateTargetAndDuration(this.$tweenStart, ScrollPane.sEndPos);
            }
            else
                this.$tweenDuration.setValues(ScrollPane.TWEEN_DEFAULT_DURATION, ScrollPane.TWEEN_DEFAULT_DURATION);
            ScrollPane.sOldChange.setValues(ScrollPane.sEndPos.x - this.$tweenStart.x, ScrollPane.sEndPos.y - this.$tweenStart.y);
            //adjust
            this.loopCheckingTarget(ScrollPane.sEndPos);
            if (this.$pageMode || this.$snapToItem)
                this.alignPosition(ScrollPane.sEndPos, true);
            this.$tweenChange.x = ScrollPane.sEndPos.x - this.$tweenStart.x;
            this.$tweenChange.y = ScrollPane.sEndPos.y - this.$tweenStart.y;
            if (this.$tweenChange.x == 0 && this.$tweenChange.y == 0) {
                if (this.$scrollBarDisplayAuto)
                    this.showScrollBar(false);
                return;
            }
            if (this.$pageMode || this.$snapToItem) {
                this.fixDuration('x', ScrollPane.sOldChange.x);
                this.fixDuration('y', ScrollPane.sOldChange.y);
            }
        }
        this.$tweening = 2;
        this.$tweenTime.setValues(0, 0);
        GTimer.inst.addLoop(1, this.tweenUpdate, this);
    }
    $click() {
        this.$isDragging = false;
    }
    $mouseWheel(evt) {
        let event = evt.data.event;
        if (!this.$mouseWheelEnabled)
            return;
        const delta = event.delta > 0 ? -1 : event.delta < 0 ? 1 : 0;
        if (this.$overlapSize.x > 0 && this.$overlapSize.y == 0) {
            if (this.$pageMode)
                this.setPosX(this.$xPos + this.$pageSize.x * delta, false);
            else
                this.setPosX(this.$xPos + this.$mouseWheelSpeed * delta, false);
        }
        else {
            if (this.$pageMode)
                this.setPosY(this.$yPos + this.$pageSize.y * delta, false);
            else
                this.setPosY(this.$yPos + this.$mouseWheelSpeed * delta, false);
        }
    }
    $rollOver() {
        this.showScrollBar(true);
    }
    $rollOut() {
        this.showScrollBar(false);
    }
    showScrollBar(visible) {
        if (visible) {
            GTimer.inst.remove(this.setScrollBarVisible, this);
            this.setScrollBarVisible(true);
        }
        else
            GTimer.inst.add(500, 1, this.setScrollBarVisible, this, visible);
    }
    setScrollBarVisible(visible) {
        this.$scrollBarVisible = visible && this.$viewSize.x > 0 && this.$viewSize.y > 0;
        if (this.$vtScrollBar)
            this.$vtScrollBar.displayObject.visible = this.$scrollBarVisible && !this.$vScrollNone;
        if (this.$hzScrollBar)
            this.$hzScrollBar.displayObject.visible = this.$scrollBarVisible && !this.$hScrollNone;
    }
    getLoopPartSize(division, axis) {
        let pad = 0;
        // if (this.$owner instanceof GList)
        //     pad = axis == "x" ? this.$owner.columnGap : this.$owner.lineGap;
        return (this.$contentSize[axis] + pad) / division;
    }
    loopCheckingCurrent() {
        let changed = false;
        if (this.$loop == 1 && this.$overlapSize.x > 0) {
            if (this.$xPos < 0.001) {
                this.$xPos += this.getLoopPartSize(2, 'x');
                changed = true;
            }
            else if (this.$xPos >= this.$overlapSize.x) {
                this.$xPos -= this.getLoopPartSize(2, 'x');
                changed = true;
            }
        }
        else if (this.$loop == 2 && this.$overlapSize.y > 0) {
            if (this.$yPos < 0.001) {
                this.$yPos += this.getLoopPartSize(2, 'y');
                changed = true;
            }
            else if (this.$yPos >= this.$overlapSize.y) {
                this.$yPos -= this.getLoopPartSize(2, 'y');
                changed = true;
            }
        }
        if (changed)
            this.$container.set({ x: Math.floor(-this.$xPos), y: Math.floor(-this.$yPos) });
        return changed;
    }
    loopCheckingTarget(endPos) {
        if (this.$loop == 1)
            this.loopCheckingTarget2(endPos, 'x');
        if (this.$loop == 2)
            this.loopCheckingTarget2(endPos, 'y');
    }
    loopCheckingTarget2(endPos, axis) {
        let halfSize;
        let tmp;
        if (endPos[axis] > 0) {
            halfSize = this.getLoopPartSize(2, axis);
            tmp = this.$tweenStart[axis] - halfSize;
            if (tmp <= 0 && tmp >= -this.$overlapSize[axis]) {
                endPos[axis] -= halfSize;
                this.$tweenStart[axis] = tmp;
            }
        }
        else if (endPos[axis] < -this.$overlapSize[axis]) {
            halfSize = this.getLoopPartSize(2, axis);
            tmp = this.$tweenStart[axis] + halfSize;
            if (tmp <= 0 && tmp >= -this.$overlapSize[axis]) {
                endPos[axis] += halfSize;
                this.$tweenStart[axis] = tmp;
            }
        }
    }
    loopCheckingNewPos(value, axis) {
        if (this.$overlapSize[axis] == 0)
            return value;
        let pos = axis == 'x' ? this.$xPos : this.$yPos;
        let changed = false;
        let v;
        if (value < 0.001) {
            value += this.getLoopPartSize(2, axis);
            if (value > pos) {
                v = this.getLoopPartSize(6, axis);
                v = Math.ceil((value - pos) / v) * v;
                pos = NumberUtil.clamp(pos + v, 0, this.$overlapSize[axis]);
                changed = true;
            }
        }
        else if (value >= this.$overlapSize[axis]) {
            value -= this.getLoopPartSize(2, axis);
            if (value < pos) {
                v = this.getLoopPartSize(6, axis);
                v = Math.ceil((pos - value) / v) * v;
                pos = NumberUtil.clamp(pos - v, 0, this.$overlapSize[axis]);
                changed = true;
            }
        }
        if (changed) {
            if (axis == 'x')
                this.$container.x = -Math.floor(pos);
            else
                this.$container.y = -Math.floor(pos);
        }
        return value;
    }
    alignPosition(pos, inertialScrolling) {
        if (this.$pageMode) {
            pos.x = this.alignByPage(pos.x, 'x', inertialScrolling);
            pos.y = this.alignByPage(pos.y, 'y', inertialScrolling);
        }
        else if (this.$snapToItem) {
            var pt = this.$owner.getSnappingPosition(-pos.x, -pos.y, ScrollPane.sHelperPoint);
            if (pos.x < 0 && pos.x > -this.$overlapSize.x)
                pos.x = -pt.x;
            if (pos.y < 0 && pos.y > -this.$overlapSize.y)
                pos.y = -pt.y;
        }
    }
    alignByPage(pos, axis, inertialScrolling) {
        let page;
        if (pos > 0)
            page = 0;
        else if (pos < -this.$overlapSize[axis])
            page =
                Math.ceil(this.$contentSize[axis] / this.$pageSize[axis]) - 1;
        else {
            page = Math.floor(-pos / this.$pageSize[axis]);
            var change = inertialScrolling
                ? pos - this.$containerPos[axis]
                : pos - this.$container[axis];
            var testPageSize = Math.min(this.$pageSize[axis], this.$contentSize[axis] -
                (page + 1) * this.$pageSize[axis]);
            var delta = -pos - page * this.$pageSize[axis];
            //page mode magnetic
            if (Math.abs(change) > this.$pageSize[axis]) {
                if (delta > testPageSize * 0.5)
                    page++;
            }
            else {
                if (delta > testPageSize * (change < 0 ? 0.3 : 0.7))
                    page++;
            }
            //re-calc dist
            const dst = this.$pageSize[axis];
            pos = -page * dst;
            if (pos < -dst)
                pos = -dst;
        }
        if (inertialScrolling) {
            var oldPos = this.$tweenStart[axis];
            var oldPage;
            if (oldPos > 0)
                oldPage = 0;
            else if (oldPos < -this.$overlapSize[axis])
                oldPage =
                    Math.ceil(this.$contentSize[axis] / this.$pageSize[axis]) - 1;
            else
                oldPage = Math.floor(-oldPos / this.$pageSize[axis]);
            var startPage = Math.floor(-this.$containerPos[axis] / this.$pageSize[axis]);
            if (Math.abs(page - startPage) > 1 && Math.abs(oldPage - startPage) <= 1) {
                if (page > startPage)
                    page = startPage + 1;
                else
                    page = startPage - 1;
                pos = -page * this.$pageSize[axis];
            }
        }
        return pos;
    }
    updateTargetAndDuration(orignPos, resultPos) {
        resultPos.x = this.updateTargetAndDuration2(orignPos.x, 'x');
        resultPos.y = this.updateTargetAndDuration2(orignPos.y, 'y');
    }
    updateTargetAndDuration2(pos, axis) {
        let v = this.$velocity[axis];
        var duration = 0;
        if (pos > 0)
            pos = 0;
        else if (pos < -this.$overlapSize[axis])
            pos = -this.$overlapSize[axis];
        else {
            let v2 = Math.abs(v) * this.$velocityScale;
            if (isMobile.any)
                v2 *=
                    Math.max(Decls$1.GRoot.inst.stageWrapper.designWidth, Decls$1.GRoot.inst.stageWrapper.designHeight) / Math.max(Decls$1.GRoot.inst.stageWidth, Decls$1.GRoot.inst.stageHeight);
            //threshold, if too slow, stop it
            let ratio = 0;
            if (this.$pageMode || !isMobile.any) {
                if (v2 > 500)
                    ratio = Math.pow((v2 - 500) / 500, 2);
            }
            else {
                if (v2 > 1000)
                    ratio = Math.pow((v2 - 1000) / 1000, 2);
            }
            if (ratio != 0) {
                if (ratio > 1)
                    ratio = 1;
                v2 *= ratio;
                v *= ratio;
                this.$velocity[axis] = v;
                duration = Math.log(60 / v2) / Math.log(this.$decelerationRate) / 60;
                const change = (v / 60 - 1) / (1 - this.$decelerationRate);
                //const change: number = Math.floor(v * duration * 0.4);
                pos += change;
            }
        }
        if (duration < ScrollPane.TWEEN_DEFAULT_DURATION)
            duration = ScrollPane.TWEEN_DEFAULT_DURATION;
        this.$tweenDuration[axis] = duration;
        return pos;
    }
    fixDuration(axis, oldChange) {
        if (this.$tweenChange[axis] == 0 ||
            Math.abs(this.$tweenChange[axis]) >= Math.abs(oldChange))
            return;
        let newDuration = Math.abs(this.$tweenChange[axis] / oldChange) *
            this.$tweenDuration[axis];
        if (newDuration < ScrollPane.TWEEN_DEFAULT_DURATION)
            newDuration = ScrollPane.TWEEN_DEFAULT_DURATION;
        this.$tweenDuration[axis] = newDuration;
    }
    killTween() {
        //tweening == 1: set to end immediately
        if (this.$tweening == 1) {
            this.$container.set({
                x: this.$tweenStart.x + this.$tweenChange.x,
                y: this.$tweenStart.y + this.$tweenChange.y
            });
            let evt = new createjs.Event("__scroll" /* SCROLL */, true, false);
            this.dispatchEvent(evt, this);
        }
        this.$tweening = 0;
        GTimer.inst.remove(this.tweenUpdate, this);
        let evt = new createjs.Event("__scrollEnd" /* SCROLL_END */, true, false);
        this.dispatchEvent(evt, this);
    }
    checkRefreshBar() {
        if (this.$header == null && this.$footer == null)
            return;
        const pos = this.$container[this.$refreshBarAxis];
        if (this.$header != null) {
            if (pos > 0) {
                if (this.$header.displayObject.parent == null)
                    this.$maskContainer.addChildAt(this.$header.displayObject, 0);
                const pt = ScrollPane.sHelperPoint;
                pt.setValues(this.$header.width, this.$header.height);
                pt[this.$refreshBarAxis] = pos;
                this.$header.setSize(pt.x, pt.y);
            }
            else {
                if (this.$header.displayObject.parent != null)
                    this.$maskContainer.removeChild(this.$header.displayObject);
            }
        }
        if (this.$footer != null) {
            var max = this.$overlapSize[this.$refreshBarAxis];
            if (pos < -max || (max == 0 && this.$footerLockedSize > 0)) {
                if (this.$footer.displayObject.parent == null)
                    this.$maskContainer.addChildAt(this.$footer.displayObject, 0);
                const pt = ScrollPane.sHelperPoint;
                pt.setValues(this.$footer.x, this.$footer.y);
                if (max > 0)
                    pt[this.$refreshBarAxis] =
                        pos + this.$contentSize[this.$refreshBarAxis];
                else
                    pt[this.$refreshBarAxis] = Math.max(Math.min(pos + this.$viewSize[this.$refreshBarAxis], this.$viewSize[this.$refreshBarAxis] - this.$footerLockedSize), this.$viewSize[this.$refreshBarAxis] -
                        this.$contentSize[this.$refreshBarAxis]);
                this.$footer.setXY(pt.x, pt.y);
                pt.setValues(this.$footer.width, this.$footer.height);
                if (max > 0)
                    pt[this.$refreshBarAxis] = -max - pos;
                else
                    pt[this.$refreshBarAxis] =
                        this.$viewSize[this.$refreshBarAxis] -
                            this.$footer[this.$refreshBarAxis];
                this.$footer.setSize(pt.x, pt.y);
            }
            else {
                if (this.$footer.displayObject.parent != null)
                    this.$maskContainer.removeChild(this.$footer.displayObject);
            }
        }
    }
    tweenUpdate() {
        var nx = this.runTween('x');
        var ny = this.runTween('y');
        this.$container.set({ x: nx, y: ny });
        if (this.$tweening == 2) {
            if (this.$overlapSize.x > 0)
                this.$xPos = NumberUtil.clamp(-nx, 0, this.$overlapSize.x);
            if (this.$overlapSize.y > 0)
                this.$yPos = NumberUtil.clamp(-ny, 0, this.$overlapSize.y);
            if (this.$pageMode)
                this.updatePageController();
        }
        if (this.$tweenChange.x == 0 && this.$tweenChange.y == 0) {
            this.$tweening = 0;
            GTimer.inst.remove(this.tweenUpdate, this);
            this.loopCheckingCurrent();
            this.syncScrollBar(true);
            this.checkRefreshBar();
            let scrollEvent = new createjs.Event("__scroll" /* SCROLL */, true, false);
            this.dispatchEvent(scrollEvent, this);
            let scrollEndEvent = new createjs.Event("__scrollEnd" /* SCROLL_END */, true, false);
            this.dispatchEvent(scrollEndEvent, this);
        }
        else {
            this.syncScrollBar(false);
            this.checkRefreshBar();
            let scrollEvent = new createjs.Event("__scroll" /* SCROLL */, true, false);
            this.dispatchEvent(scrollEvent, this);
        }
    }
    runTween(axis) {
        const delta = createjs.Ticker.interval;
        let newValue;
        if (this.$tweenChange[axis] != 0) {
            this.$tweenTime[axis] += delta * createjs.Ticker.framerate;
            if (this.$tweenTime[axis] >= this.$tweenDuration[axis]) {
                newValue =
                    this.$tweenStart[axis] + this.$tweenChange[axis];
                this.$tweenChange[axis] = 0;
            }
            else {
                const ratio = ScrollPane.$easeTypeFunc(this.$tweenTime[axis], this.$tweenDuration[axis]);
                newValue =
                    this.$tweenStart[axis] +
                        Math.floor(this.$tweenChange[axis] * ratio);
            }
            var threshold1 = 0;
            var threshold2 = -this.$overlapSize[axis];
            if (this.$headerLockedSize > 0 && this.$refreshBarAxis == axis)
                threshold1 = this.$headerLockedSize;
            if (this.$footerLockedSize > 0 && this.$refreshBarAxis == axis) {
                var max = this.$overlapSize[this.$refreshBarAxis];
                if (max == 0)
                    max = Math.max(this.$contentSize[this.$refreshBarAxis] +
                        this.$footerLockedSize -
                        this.$viewSize[this.$refreshBarAxis], 0);
                else
                    max += this.$footerLockedSize;
                threshold2 = -max;
            }
            if (this.$tweening == 2 && this.$bouncebackEffect) {
                if ((newValue > 20 + threshold1 && this.$tweenChange[axis] > 0) ||
                    (newValue > threshold1 && this.$tweenChange[axis] == 0)) {
                    this.$tweenTime[axis] = 0;
                    this.$tweenDuration[axis] = ScrollPane.TWEEN_DEFAULT_DURATION;
                    this.$tweenChange[axis] = -newValue + threshold1;
                    this.$tweenStart[axis] = newValue;
                }
                else if ((newValue < threshold2 - 20 && this.$tweenChange[axis] < 0) ||
                    (newValue < threshold2 && this.$tweenChange[axis] == 0)) {
                    this.$tweenTime[axis] = 0;
                    this.$tweenDuration[axis] = ScrollPane.TWEEN_DEFAULT_DURATION;
                    this.$tweenChange[axis] = threshold2 - newValue;
                    this.$tweenStart[axis] = newValue;
                }
            }
            else {
                if (newValue > threshold1) {
                    newValue = threshold1;
                    this.$tweenChange[axis] = 0;
                }
                else if (newValue < threshold2) {
                    newValue = threshold2;
                    this.$tweenChange[axis] = 0;
                }
            }
        }
        else
            newValue = this.$container[axis];
        return newValue;
    }
}
ScrollPane.$easeTypeFunc = (t, d) => {
    return (t = t / d - 1) * t * t + 1;
}; //cubic out
ScrollPane.$gestureFlag = 0;
ScrollPane.sHelperPoint = new createjs.Point();
ScrollPane.sHelperRect = new createjs.Rectangle();
ScrollPane.sEndPos = new createjs.Point();
ScrollPane.sOldChange = new createjs.Point();
ScrollPane.TWEEN_DEFAULT_DURATION = 0.4;
ScrollPane.TWEEN_MANUALLY_SET_DURATION = 0.5; //tween duration used when call setPos(useAni=true)
ScrollPane.PULL_DIST_RATIO = 0.5; //pulldown / pullup distance ratio of the whole viewport

class Binder {
    static create(func, context, ...args) {
        if (!context)
            return func;
        return (function () {
            let fullargs = arguments.length > 0 ? [].concat(Array.prototype.slice.call(arguments)).concat(args) : [].concat(args);
            func.apply(context, fullargs);
        });
    }
}

class Transition {
    constructor(owner) {
        this.autoPlayRepeat = 1;
        this.autoPlayDelay = 0;
        this.$ownerBaseX = 0;
        this.$ownerBaseY = 0;
        this.$totalTimes = 0;
        this.$startTime = 0;
        this.$totalTasks = 0;
        this.$playing = false;
        this.$options = 0;
        this.$maxTime = 0;
        this.$owner = owner;
        this.$items = [];
        this.$owner.on("__visibleChanged" /* VISIBLE_CHANGED */, this.$ownerVisibleChanged, this);
    }
    // private $ownerVisibleChanged(vis: boolean, owner: GComponent): void {
    $ownerVisibleChanged(event) {
        let vis = event.data;
        if ((this.$options & Transition.OPTION_AUTO_STOP_DISABLED) == 0 && vis === false)
            this.stop((this.$options & Transition.OPTION_AUTO_STOP_AT_END) != 0 ? true : false, false);
    }
    get autoPlay() {
        return this.$autoPlay;
    }
    set autoPlay(value) {
        if (this.$autoPlay != value) {
            this.$autoPlay = value;
            if (this.$autoPlay) {
                if (this.$owner.onStage)
                    this.play({
                        times: this.autoPlayRepeat,
                        delay: this.autoPlayDelay
                    });
            }
            else {
                if (!this.$owner.onStage)
                    this.stop(false, true);
            }
        }
    }
    changeRepeat(value) {
        this.$totalTimes = value | 0;
    }
    /**
       * Play transition by specified settings:
       * 1) pass whole parameters:
              onComplete?: (...args:any[]) => void,
              onCompleteObj?: any,
              onCompleteParam?: any,
              times: number,
              delay: number
       * 2) just pass 1 object which implements TransitionPlaySetting (recommended)
       */
    play(...args) {
        if (args.length && typeof args[0] == 'object') {
            let obj = args[0];
            this.$play(obj.onComplete, obj.onCompleteObj, obj.onCompleteParam, obj.times || 1, obj.delay || 0, false);
        }
        else
            this.$play(args[0], args[1], args[2], args[3] || 1, args[4] || 0, false);
    }
    /**
       * Play transition by specified settings:
       * 1) pass whole parameters:
              onComplete?: (...args:any[]) => void,
              onCompleteObj?: any,
              onCompleteParam?: any,
              times: number,
              delay: number
       * 2) just pass 1 object which implements TransitionPlaySetting (recommended)
       */
    playReverse(...args) {
        if (args.length && typeof args[0] == 'object') {
            let obj = args[0];
            this.$play(obj.onComplete, obj.onCompleteObj, obj.onCompleteParam, obj.times || 1, obj.delay || 0, true);
        }
        else
            this.$play(args[0], args[1], args[2], args[3] || 1, args[4] || 0, true);
    }
    $play(onComplete, onCompleteObj, onCompleteParam, times, delay, reversed = false) {
        this.stop();
        if (times == 0)
            times = 1;
        else if (times == -1)
            times = Number.MAX_VALUE;
        this.$totalTimes = times;
        this.$startTime = 0;
        this.$reversed = reversed;
        this.internalPlay(delay);
        this.$playing = this.$totalTasks > 0;
        if (this.$playing) {
            this.$onComplete = onComplete;
            this.$onCompleteParam = onCompleteParam;
            this.$onCompleteObj = onCompleteObj;
            if ((this.$options & Transition.OPTION_IGNORE_DISPLAY_CONTROLLER) != 0) {
                this.$items.forEach(item => {
                    if (item.target != null && item.target != this.$owner)
                        item.lockToken = item.target.lockGearDisplay();
                }, this);
            }
        }
        else if (onComplete != null) {
            onCompleteParam && onCompleteParam.length
                ? onComplete.apply(onCompleteObj, onCompleteParam)
                : onComplete.call(onCompleteObj, onCompleteParam);
        }
    }
    stop(setToComplete = true, processCallback = false) {
        if (this.$playing) {
            this.$playing = false;
            this.$totalTasks = 0;
            this.$totalTimes = 0;
            let func = this.$onComplete;
            let param = this.$onCompleteParam;
            let thisObj = this.$onCompleteObj;
            this.$onComplete = null;
            this.$onCompleteParam = null;
            this.$onCompleteObj = null;
            let cnt = this.$items.length;
            let item;
            if (this.$reversed) {
                for (let i = cnt - 1; i >= 0; i--) {
                    item = this.$items[i];
                    if (item.target == null)
                        continue;
                    this.stopItem(item, setToComplete);
                }
            }
            else {
                for (let i = 0; i < cnt; i++) {
                    item = this.$items[i];
                    if (item.target == null)
                        continue;
                    this.stopItem(item, setToComplete);
                }
            }
            if (processCallback && func != null)
                param && param.length > 0 ? func.apply(thisObj, param) : func.call(thisObj, param);
        }
    }
    stopItem(item, setToComplete) {
        if (item.lockToken != 0) {
            item.target.releaseGearDisplay(item.lockToken);
            item.lockToken = 0;
        }
        if (item.type == 12 /* ColorFilter */ && item.filterCreated)
            item.target.filters = null;
        if (item.completed)
            return;
        this.disposeTween(item);
        if (item.type == 10 /* Transition */) {
            let trans = item.target.getTransition(item.value.s);
            if (trans != null)
                trans.stop(setToComplete, false);
        }
        else if (item.type == 11 /* Shake */) {
            GTimer.inst.remove(item.$shake, item);
            item.target.$gearLocked = true;
            item.target.setXY(item.target.x - item.startValue.f1, item.target.y - item.startValue.f2);
            item.target.$gearLocked = false;
        }
        else {
            if (setToComplete) {
                if (item.tween) {
                    if (!item.yoyo || item.repeat % 2 == 0)
                        this.applyValue(item, this.$reversed ? item.startValue : item.endValue);
                    else
                        this.applyValue(item, this.$reversed ? item.endValue : item.startValue);
                }
                else if (item.type != 9 /* Sound */)
                    this.applyValue(item, item.value);
            }
        }
    }
    dispose() {
        GTimer.inst.remove(this.internalPlay, this);
        this.$owner.off("__visibleChanged" /* VISIBLE_CHANGED */, this.$ownerVisibleChanged);
        this.$playing = false;
        this.$items.forEach(item => {
            if (item.target == null || item.completed)
                return;
            this.disposeTween(item);
            if (item.type == 10 /* Transition */) {
                let trans = item.target.getTransition(item.value.s);
                if (trans != null)
                    trans.dispose();
            }
            else if (item.type == 11 /* Shake */)
                GTimer.inst.remove(item.$shake, item);
        }, this);
    }
    get playing() {
        return this.$playing;
    }
    setValue(label, ...args) {
        this.$items.forEach(item => {
            if (item.label == null && item.label2 == null)
                return;
            let value;
            if (item.label == label) {
                if (item.tween)
                    value = item.startValue;
                else
                    value = item.value;
            }
            else if (item.label2 == label)
                value = item.endValue;
            else
                return;
            switch (item.type) {
                case 0 /* XY */:
                case 1 /* Size */:
                case 3 /* Pivot */:
                case 2 /* Scale */:
                case 13 /* Skew */:
                    value.b1 = true;
                    value.b2 = true;
                    value.f1 = parseFloat(args[0]);
                    value.f2 = parseFloat(args[1]);
                    break;
                case 4 /* Alpha */:
                    value.f1 = parseFloat(args[0]);
                    break;
                case 5 /* Rotation */:
                    value.i = parseInt(args[0]);
                    break;
                case 6 /* Color */:
                    value.c = args[0];
                    break;
                case 7 /* Animation */:
                    value.i = parseInt(args[0]);
                    if (args.length > 1)
                        value.b = args[1];
                    break;
                case 8 /* Visible */:
                    value.b = args[0];
                    break;
                case 9 /* Sound */:
                    value.s = args[0];
                    if (args.length > 1)
                        value.f1 = parseFloat(args[1]);
                    break;
                case 10 /* Transition */:
                    value.s = args[0];
                    if (args.length > 1)
                        value.i = parseInt(args[1]);
                    break;
                case 11 /* Shake */:
                    value.f1 = parseFloat(args[0]);
                    if (args.length > 1)
                        value.f2 = parseFloat(args[1]);
                    break;
                case 12 /* ColorFilter */:
                    value.f1 = parseFloat(args[0]);
                    value.f2 = parseFloat(args[1]);
                    value.f3 = parseFloat(args[2]);
                    value.f4 = parseFloat(args[3]);
                    break;
            }
        }, this);
    }
    setHook(label, callback, thisObj) {
        let cnt = this.$items.length;
        for (let i = 0; i < cnt; i++) {
            let item = this.$items[i];
            if (item.label == label) {
                item.hook = callback;
                item.hookObj = thisObj;
                break;
            }
            else if (item.label2 == label) {
                item.hook2 = callback;
                item.hook2Obj = thisObj;
                break;
            }
        }
    }
    clearHooks() {
        this.$items.forEach(item => {
            item.hook = null;
            item.hookObj = null;
            item.hook2 = null;
            item.hook2Obj = null;
        }, this);
    }
    setTarget(label, newTarget) {
        this.$items.forEach(item => {
            if (item.label == label)
                item.targetId = newTarget.id;
        }, this);
    }
    setDuration(label, value) {
        this.$items.forEach(item => {
            if (item.tween && item.label == label)
                item.duration = value;
        }, this);
    }
    updateFromRelations(targetId, dx, dy) {
        this.$items.forEach(item => {
            if (item.type == 0 /* XY */ && item.targetId == targetId) {
                if (item.tween) {
                    item.startValue.f1 += dx;
                    item.startValue.f2 += dy;
                    item.endValue.f1 += dx;
                    item.endValue.f2 += dy;
                }
                else {
                    item.value.f1 += dx;
                    item.value.f2 += dy;
                }
            }
        }, this);
    }
    internalPlay(delay = 0) {
        this.$ownerBaseX = this.$owner.x;
        this.$ownerBaseY = this.$owner.y;
        this.$totalTasks = 0;
        this.$items.forEach(item => {
            if (item.targetId)
                item.target = this.$owner.getChildById(item.targetId);
            else
                item.target = this.$owner;
            if (item.target == null)
                return;
            let startTime;
            this.disposeTween(item);
            if (item.tween) {
                if (this.$reversed)
                    startTime = delay + this.$maxTime - item.time - item.duration;
                else
                    startTime = delay + item.time;
                if (startTime > 0) {
                    this.$totalTasks++;
                    item.completed = false;
                    item.tweener = createjs.Tween.get(item.value)
                        .wait(startTime * 1000)
                        .call(this.$delayCall, [item], this);
                }
                else
                    this.startTween(item);
            }
            else {
                if (this.$reversed)
                    startTime = delay + this.$maxTime - item.time;
                else
                    startTime = delay + item.time;
                if (startTime <= 0)
                    this.applyValue(item, item.value);
                else {
                    this.$totalTasks++;
                    item.completed = false;
                    item.tweener = createjs.Tween.get(item.value)
                        .wait(startTime * 1000)
                        .call(this.$delayCall2, [item], this);
                }
            }
        }, this);
    }
    prepareValue(item, toProps, reversed = false) {
        let startValue;
        let endValue;
        if (reversed) {
            startValue = item.endValue;
            endValue = item.startValue;
        }
        else {
            startValue = item.startValue;
            endValue = item.endValue;
        }
        switch (item.type) {
            case 0 /* XY */:
            case 1 /* Size */:
                if (item.type == 0 /* XY */) {
                    if (item.target == this.$owner) {
                        if (!startValue.b1)
                            startValue.f1 = 0;
                        if (!startValue.b2)
                            startValue.f2 = 0;
                    }
                    else {
                        if (!startValue.b1)
                            startValue.f1 = item.target.x;
                        if (!startValue.b2)
                            startValue.f2 = item.target.y;
                    }
                }
                else {
                    if (!startValue.b1)
                        startValue.f1 = item.target.width;
                    if (!startValue.b2)
                        startValue.f2 = item.target.height;
                }
                item.value.f1 = startValue.f1;
                item.value.f2 = startValue.f2;
                if (!endValue.b1)
                    endValue.f1 = item.value.f1;
                if (!endValue.b2)
                    endValue.f2 = item.value.f2;
                item.value.b1 = startValue.b1 || endValue.b1;
                item.value.b2 = startValue.b2 || endValue.b2;
                toProps.f1 = endValue.f1;
                toProps.f2 = endValue.f2;
                break;
            case 2 /* Scale */:
            case 13 /* Skew */:
                item.value.f1 = startValue.f1;
                item.value.f2 = startValue.f2;
                toProps.f1 = endValue.f1;
                toProps.f2 = endValue.f2;
                break;
            case 4 /* Alpha */:
                item.value.f1 = startValue.f1;
                toProps.f1 = endValue.f1;
                break;
            case 5 /* Rotation */:
                item.value.i = startValue.i;
                toProps.i = endValue.i;
                break;
            case 12 /* ColorFilter */:
                item.value.f1 = startValue.f1;
                item.value.f2 = startValue.f2;
                item.value.f3 = startValue.f3;
                item.value.f4 = startValue.f4;
                toProps.f1 = endValue.f1;
                toProps.f2 = endValue.f2;
                toProps.f3 = endValue.f3;
                toProps.f4 = endValue.f4;
                break;
        }
    }
    startTween(item) {
        let toProps = new TransitionValue();
        this.prepareValue(item, toProps, this.$reversed);
        this.applyValue(item, item.value);
        let completeHandler;
        if (item.repeat != 0) {
            item.tweenTimes = 0;
            completeHandler = Binder.create(this.$tweenRepeatComplete, this, item);
        }
        else
            completeHandler = Binder.create(this.$tweenComplete, this, item);
        this.$totalTasks++;
        item.completed = false;
        this.prepareValue(item, toProps, this.$reversed);
        item.tweener = createjs.Tween.get(item.value, {
            onChange: Binder.create(this.$tweenUpdate, this, item)
        })
            .to(toProps, item.duration * 1000, item.easeType)
            .call(completeHandler);
        if (item.hook != null)
            item.hook.call(item.hookObj);
    }
    $delayCall(item) {
        this.disposeTween(item);
        this.$totalTasks--;
        this.startTween(item);
    }
    $delayCall2(item) {
        this.disposeTween(item);
        this.$totalTasks--;
        item.completed = true;
        this.applyValue(item, item.value);
        if (item.hook != null)
            item.hook.call(item.hookObj);
        this.checkAllComplete();
    }
    $tweenUpdate(event, item) {
        this.applyValue(item, item.value);
    }
    $tweenComplete(event, item) {
        this.disposeTween(item);
        this.$totalTasks--;
        item.completed = true;
        if (item.hook2 != null)
            item.hook2.call(item.hook2Obj);
        this.checkAllComplete();
    }
    $tweenRepeatComplete(event, item) {
        item.tweenTimes++;
        if (item.repeat == -1 || item.tweenTimes < item.repeat + 1) {
            let toProps = new TransitionValue();
            let reversed;
            if (item.yoyo) {
                if (this.$reversed)
                    reversed = item.tweenTimes % 2 == 0;
                else
                    reversed = item.tweenTimes % 2 == 1;
            }
            else
                reversed = this.$reversed;
            this.prepareValue(item, toProps, reversed);
            this.disposeTween(item);
            item.tweener = createjs.Tween.get(item.value, {
                onChange: Binder.create(this.$tweenUpdate, this, item)
            })
                .to(toProps, item.duration * 1000, item.easeType)
                .call(this.$tweenRepeatComplete, [null, item], this);
        }
        else
            this.$tweenComplete(null, item);
    }
    disposeTween(item) {
        if (!item)
            return;
        if (item.tweener) {
            item.tweener.paused = true;
            item.tweener.removeAllEventListeners();
            createjs.Tween.removeTweens(item.value);
            item.tweener = null;
        }
    }
    $playTransComplete(item) {
        this.disposeTween(item);
        this.$totalTasks--;
        item.completed = true;
        this.checkAllComplete();
    }
    checkAllComplete() {
        if (this.$playing && this.$totalTasks == 0) {
            if (this.$totalTimes < 0) {
                //the reason we don't call 'internalPlay' immediately here is because of the onChange handler issue, the handler's been calling all the time even the tween is in waiting/complete status.
                GTimer.inst.callLater(this.internalPlay, this, 0);
            }
            else {
                this.$totalTimes--;
                if (this.$totalTimes > 0)
                    GTimer.inst.callLater(this.internalPlay, this, 0);
                else {
                    this.$playing = false;
                    this.$items.forEach(item => {
                        if (item.target != null) {
                            if (item.lockToken != 0) {
                                item.target.releaseGearDisplay(item.lockToken);
                                item.lockToken = 0;
                            }
                            if (item.filterCreated) {
                                item.filterCreated = false;
                                item.target.filters = null;
                            }
                            this.disposeTween(item);
                        }
                    });
                    if (this.$onComplete != null) {
                        let func = this.$onComplete;
                        let param = this.$onCompleteParam;
                        let thisObj = this.$onCompleteObj;
                        this.$onComplete = null;
                        this.$onCompleteParam = null;
                        this.$onCompleteObj = null;
                        param && param.length ? func.apply(thisObj, param) : func.call(thisObj, param);
                    }
                }
            }
        }
    }
    applyValue(item, value) {
        item.target.$gearLocked = true;
        switch (item.type) {
            case 0 /* XY */:
                if (item.target == this.$owner) {
                    let f1 = 0, f2 = 0;
                    if (!value.b1)
                        f1 = item.target.x;
                    else
                        f1 = value.f1 + this.$ownerBaseX;
                    if (!value.b2)
                        f2 = item.target.y;
                    else
                        f2 = value.f2 + this.$ownerBaseY;
                    item.target.setXY(f1, f2);
                }
                else {
                    if (!value.b1)
                        value.f1 = item.target.x;
                    if (!value.b2)
                        value.f2 = item.target.y;
                    item.target.setXY(value.f1, value.f2);
                }
                break;
            case 1 /* Size */:
                if (!value.b1)
                    value.f1 = item.target.width;
                if (!value.b2)
                    value.f2 = item.target.height;
                item.target.setSize(value.f1, value.f2);
                break;
            case 3 /* Pivot */:
                item.target.setPivot(value.f1, value.f2);
                break;
            case 4 /* Alpha */:
                item.target.alpha = value.f1;
                break;
            case 5 /* Rotation */:
                item.target.rotation = value.i;
                break;
            case 2 /* Scale */:
                item.target.setScale(value.f1, value.f2);
                break;
            case 13 /* Skew */:
                item.target.setSkew(value.f1, value.f2);
                break;
            case 6 /* Color */:
                if (isColorGear(item.target))
                    item.target.color = value.c;
                break;
            case 7 /* Animation */:
                if (isAnimationGear(item.target)) {
                    if (!value.b1)
                        value.i = item.target.frame;
                    item.target.frame = value.i;
                    item.target.playing = value.b;
                }
                break;
            case 8 /* Visible */:
                item.target.visible = value.b;
                break;
            case 10 /* Transition */:
                let trans = item.target.getTransition(value.s);
                if (trans != null) {
                    if (value.i == 0)
                        trans.stop(false, true);
                    else if (trans.playing)
                        trans.$totalTimes = value.i == -1 ? Number.MAX_VALUE : value.i;
                    else {
                        item.completed = false;
                        this.$totalTasks++;
                        if (this.$reversed)
                            trans.playReverse(this.$playTransComplete, this, item, item.value.i);
                        else
                            trans.play(this.$playTransComplete, this, item, item.value.i);
                    }
                }
                break;
            case 9 /* Sound */:
                if (this.$playing && item.time >= this.$startTime) {
                    if (!value.audioClip) {
                        var pi = UIPackage.getItemByURL(value.s);
                        if (pi)
                            value.audioClip = pi.owner.getItemAsset(pi);
                    }
                    if (value.audioClip) {
                        Decls$1.GRoot.inst.playOneShotSound(value.audioClip, value.f1);
                    }
                }
                break;
            case 11 /* Shake */:
                item.startValue.f1 = 0; //offsetX
                item.startValue.f2 = 0; //offsetY
                item.startValue.f3 = item.value.f2; //shakePeriod
                GTimer.inst.add(1, 0, item.$shake, item, [this]);
                this.$totalTasks++;
                item.completed = false;
                break;
            case 12 /* ColorFilter */:
                item.target.updateColorComponents(value.f1, value.f2, value.f3, value.f4);
                break;
        }
        item.target.$gearLocked = false;
    }
    /**@internal */
    $shakeItem(item, elapsedMS) {
        let r = Math.ceil((item.value.f1 * item.startValue.f3) / item.value.f2);
        let rx = (Math.random() * 2 - 1) * r;
        let ry = (Math.random() * 2 - 1) * r;
        rx = rx > 0 ? Math.ceil(rx) : Math.floor(rx);
        ry = ry > 0 ? Math.ceil(ry) : Math.floor(ry);
        item.target.$gearLocked = true;
        item.target.setXY(item.target.x - item.startValue.f1 + rx, item.target.y - item.startValue.f2 + ry);
        item.target.$gearLocked = false;
        item.startValue.f1 = rx;
        item.startValue.f2 = ry;
        item.startValue.f3 -= elapsedMS / 1000;
        if (item.startValue.f3 <= 0) {
            item.target.$gearLocked = true;
            item.target.setXY(item.target.x - item.startValue.f1, item.target.y - item.startValue.f2);
            item.target.$gearLocked = false;
            item.completed = true;
            this.$totalTasks--;
            GTimer.inst.remove(item.$shake, item);
            this.checkAllComplete();
        }
    }
    setup(xml) {
        this.name = xml.attributes.name;
        let str = xml.attributes.options;
        if (str)
            this.$options = parseInt(str);
        this.$autoPlay = xml.attributes.autoPlay == 'true';
        if (this.$autoPlay) {
            str = xml.attributes.autoPlayRepeat;
            if (str)
                this.autoPlayRepeat = parseInt(str);
            str = xml.attributes.autoPlayDelay;
            if (str)
                this.autoPlayDelay = parseFloat(str);
        }
        let col = xml.children;
        col.forEach(cxml => {
            if (cxml.nodeName != 'item')
                return;
            let item = new TransitionItem();
            this.$items.push(item);
            item.time = parseInt(cxml.attributes.time) / Transition.FRAME_RATE;
            item.targetId = cxml.attributes.target;
            str = cxml.attributes.type;
            switch (str) {
                case 'XY':
                    item.type = 0 /* XY */;
                    break;
                case 'Size':
                    item.type = 1 /* Size */;
                    break;
                case 'Scale':
                    item.type = 2 /* Scale */;
                    break;
                case 'Pivot':
                    item.type = 3 /* Pivot */;
                    break;
                case 'Alpha':
                    item.type = 4 /* Alpha */;
                    break;
                case 'Rotation':
                    item.type = 5 /* Rotation */;
                    break;
                case 'Color':
                    item.type = 6 /* Color */;
                    break;
                case 'Animation':
                    item.type = 7 /* Animation */;
                    break;
                case 'Visible':
                    item.type = 8 /* Visible */;
                    break;
                case 'Sound':
                    item.type = 9 /* Sound */;
                    break;
                case 'Transition':
                    item.type = 10 /* Transition */;
                    break;
                case 'Shake':
                    item.type = 11 /* Shake */;
                    break;
                case 'ColorFilter':
                    item.type = 12 /* ColorFilter */;
                    break;
                case 'Skew':
                    item.type = 13 /* Skew */;
                    break;
                default:
                    item.type = 14 /* Unknown */;
                    break;
            }
            item.tween = cxml.attributes.tween == 'true';
            item.label = cxml.attributes.label;
            if (item.tween) {
                item.duration = parseInt(cxml.attributes.duration) / Transition.FRAME_RATE;
                if (item.time + item.duration > this.$maxTime)
                    this.$maxTime = item.time + item.duration;
                str = cxml.attributes.ease;
                if (str)
                    item.easeType = ParseEaseType(str);
                str = cxml.attributes.repeat;
                if (str)
                    item.repeat = parseInt(str);
                item.yoyo = cxml.attributes.yoyo == 'true';
                item.label2 = cxml.attributes.label2;
                let v = cxml.attributes.endValue;
                if (v) {
                    this.decodeValue(item.type, cxml.attributes.startValue, item.startValue);
                    this.decodeValue(item.type, v, item.endValue);
                }
                else {
                    item.tween = false;
                    this.decodeValue(item.type, cxml.attributes.startValue, item.value);
                }
            }
            else {
                if (item.time > this.$maxTime)
                    this.$maxTime = item.time;
                this.decodeValue(item.type, cxml.attributes.value, item.value);
            }
        }, this);
    }
    decodeValue(type, str, value) {
        let arr;
        switch (type) {
            case 0 /* XY */:
            case 1 /* Size */:
            case 3 /* Pivot */:
            case 13 /* Skew */:
                arr = str.split(',');
                if (arr[0] == '-') {
                    value.b1 = false;
                }
                else {
                    value.f1 = parseFloat(arr[0]);
                    value.b1 = true;
                }
                if (arr[1] == '-') {
                    value.b2 = false;
                }
                else {
                    value.f2 = parseFloat(arr[1]);
                    value.b2 = true;
                }
                break;
            case 4 /* Alpha */:
                value.f1 = parseFloat(str);
                break;
            case 5 /* Rotation */:
                value.i = parseInt(str);
                break;
            case 2 /* Scale */:
                arr = str.split(',');
                value.f1 = parseFloat(arr[0]);
                value.f2 = parseFloat(arr[1]);
                break;
            case 6 /* Color */:
                value.c = StringUtil.HEX2RGB(str);
                break;
            case 7 /* Animation */:
                arr = str.split(',');
                if (arr[0] == '-') {
                    value.b1 = false;
                }
                else {
                    value.i = parseInt(arr[0]);
                    value.b1 = true;
                }
                value.b = arr[1] == 'p';
                break;
            case 8 /* Visible */:
                value.b = str == 'true';
                break;
            case 9 /* Sound */:
                arr = str.split(',');
                value.s = arr[0];
                if (arr.length > 1) {
                    let intv = parseInt(arr[1]);
                    if (intv == 0 || intv == 100)
                        value.f1 = 1;
                    else
                        value.f1 = intv / 100;
                }
                else
                    value.f1 = 1;
                break;
            case 10 /* Transition */:
                arr = str.split(',');
                value.s = arr[0];
                if (arr.length > 1)
                    value.i = parseInt(arr[1]);
                else
                    value.i = 1;
                break;
            case 11 /* Shake */:
                arr = str.split(',');
                value.f1 = parseFloat(arr[0]);
                value.f2 = parseFloat(arr[1]);
                break;
            case 12 /* ColorFilter */:
                arr = str.split(',');
                value.f1 = parseFloat(arr[0]);
                value.f2 = parseFloat(arr[1]);
                value.f3 = parseFloat(arr[2]);
                value.f4 = parseFloat(arr[3]);
                break;
        }
    }
}
Transition.OPTION_IGNORE_DISPLAY_CONTROLLER = 1;
Transition.OPTION_AUTO_STOP_DISABLED = 1 >> 1;
Transition.OPTION_AUTO_STOP_AT_END = 1 >> 2;
Transition.FRAME_RATE = 24;
class TransitionItem {
    constructor() {
        this.time = 0;
        this.type = 0;
        this.duration = 0;
        this.repeat = 0;
        this.yoyo = false;
        this.tween = false;
        this.tweenTimes = 0;
        this.completed = false;
        this.lockToken = 0;
        this.easeType = ParseEaseType('Quad.Out');
        this.value = new TransitionValue();
        this.startValue = new TransitionValue();
        this.endValue = new TransitionValue();
    }
    /**@internal */
    $shake(trans, elapsedMS) {
        trans.$shakeItem(this, elapsedMS);
    }
}
class TransitionValue {
    constructor() {
        this.f1 = 0;
        this.f2 = 0;
        this.f3 = 0;
        this.f4 = 0;
        this.i = 0;
        this.b = false;
        this.b1 = true;
        this.b2 = true;
    }
}

class Margin {
    constructor() {
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
    }
    parse(str) {
        if (!str) {
            this.left = this.right = this.top = this.bottom = 0;
            return;
        }
        let arr = str.split(",");
        if (arr.length == 1) {
            let k = parseInt(arr[0]);
            this.left = this.right = this.top = this.bottom = k;
        }
        else {
            this.top = parseInt(arr[0]);
            this.bottom = parseInt(arr[1]);
            this.left = parseInt(arr[2]);
            this.right = parseInt(arr[3]);
        }
    }
    copy(source) {
        this.top = source.top;
        this.bottom = source.bottom;
        this.left = source.left;
        this.right = source.right;
    }
}

class GComponent extends GObject {
    constructor() {
        super();
        this.$sortingChildCount = 0;
        this.$children = [];
        this.$controllers = [];
        this.$transitions = [];
        this.$margin = new Margin();
        this.$alignOffset = new createjs.Point();
    }
    createDisplayObject() {
        this.$rootContainer = new UIContainer(this);
        this.setDisplayObject(this.$rootContainer);
        this.$container = this.$rootContainer;
    }
    dispose() {
        GTimer.inst.remove(this.$validate, this);
        this.off('added', this.$added);
        this.off('removed', this.$removed);
        this.$transitions.forEach((trans) => {
            trans.dispose();
        });
        let numChildren = this.$children.length;
        for (let i = numChildren - 1; i >= 0; --i) {
            let obj = this.$children[i];
            obj.parent = null; //avoid removeFromParent call
            obj.dispose();
        }
        this.$boundsChanged = false;
        if (this.$scrollPane)
            this.$scrollPane.dispose();
        super.dispose();
    }
    get displayListContainer() {
        return this.$container;
    }
    addChild(child) {
        this.addChildAt(child, this.$children.length);
        return child;
    }
    addChildAt(child, index = 0) {
        if (!child)
            throw new Error('Invalid child');
        let numChildren = this.$children.length;
        if (index >= 0 && index <= numChildren) {
            if (child.parent == this)
                this.setChildIndex(child, index);
            else {
                child.removeFromParent();
                child.parent = this;
                let cnt = this.$children.length;
                if (child.sortingOrder != 0) {
                    this.$sortingChildCount++;
                    index = this.getInsertPosForSortingChild(child);
                }
                else if (this.$sortingChildCount > 0) {
                    if (index > cnt - this.$sortingChildCount)
                        index = cnt - this.$sortingChildCount;
                }
                if (index == cnt)
                    this.$children.push(child);
                else
                    this.$children.splice(index, 0, child);
                this.childStateChanged(child);
                this.setBoundsChangedFlag();
            }
            return child;
        }
        else
            throw new Error('Invalid child index');
    }
    getInsertPosForSortingChild(target) {
        let cnt = this.$children.length;
        let i = 0;
        for (i = 0; i < cnt; i++) {
            let child = this.$children[i];
            if (child == target)
                continue;
            if (target.sortingOrder < child.sortingOrder)
                break;
        }
        return i;
    }
    removeChild(child, dispose = false) {
        let childIndex = this.$children.indexOf(child);
        if (childIndex != -1)
            this.removeChildAt(childIndex, dispose);
        return child;
    }
    removeChildAt(index, dispose = false) {
        if (index >= 0 && index < this.numChildren) {
            let child = this.$children[index];
            child.parent = null;
            if (child.sortingOrder != 0)
                this.$sortingChildCount--;
            this.$children.splice(index, 1);
            if (child.inContainer)
                this.$container.removeChild(child.displayObject);
            if (dispose === true)
                child.dispose();
            this.setBoundsChangedFlag();
            return child;
        }
        else
            throw new Error('Invalid child index');
    }
    removeChildren(beginIndex = 0, endIndex = -1, dispose = false) {
        if (endIndex < 0 || endIndex >= this.numChildren)
            endIndex = this.numChildren - 1;
        for (let i = beginIndex; i <= endIndex; ++i)
            this.removeChildAt(beginIndex, dispose);
    }
    getChildAt(index = 0) {
        if (index >= 0 && index < this.numChildren)
            return this.$children[index];
        else
            throw new Error('Invalid child index');
    }
    getChild(name) {
        let cnt = this.$children.length;
        for (let i = 0; i < cnt; ++i) {
            if (this.$children[i].name == name)
                return this.$children[i];
        }
        return null;
    }
    getChildInGroup(name, group) {
        let cnt = this.$children.length;
        for (let i = 0; i < cnt; ++i) {
            let child = this.$children[i];
            if (child.group == group && child.name == name)
                return child;
        }
        return null;
    }
    getChildById(id) {
        let cnt = this.$children.length;
        for (let i = 0; i < cnt; ++i) {
            if (this.$children[i].id == id)
                return this.$children[i];
        }
        return null;
    }
    getChildIndex(child) {
        return this.$children.indexOf(child);
    }
    setChildIndex(child, index = 0) {
        let oldIndex = this.$children.indexOf(child);
        if (oldIndex == -1)
            throw new Error('no such child found');
        if (child.sortingOrder != 0)
            //no effect
            return;
        let cnt = this.$children.length;
        if (this.$sortingChildCount > 0) {
            if (index > cnt - this.$sortingChildCount - 1)
                index = cnt - this.$sortingChildCount - 1;
        }
        this.$setChildIndex(child, oldIndex, index);
    }
    setChildIndexBefore(child, index) {
        let oldIndex = this.$children.indexOf(child);
        if (oldIndex == -1)
            throw new Error('no such child found');
        if (child.sortingOrder != 0)
            //no effect
            return oldIndex;
        let cnt = this.$children.length;
        if (this.$sortingChildCount > 0) {
            if (index > cnt - this.$sortingChildCount - 1)
                index = cnt - this.$sortingChildCount - 1;
        }
        if (oldIndex < index)
            return this.$setChildIndex(child, oldIndex, index - 1);
        else
            return this.$setChildIndex(child, oldIndex, index);
    }
    $setChildIndex(child, oldIndex, index = 0) {
        let cnt = this.$children.length;
        if (index > cnt)
            index = cnt;
        if (oldIndex == index)
            return oldIndex;
        this.$children.splice(oldIndex, 1);
        this.$children.splice(index, 0, child);
        if (child.inContainer) {
            let displayIndex = 0;
            let childCount = this.$container.children.length;
            for (let i = 0; i < index; i++) {
                let g = this.$children[i];
                if (g.inContainer)
                    displayIndex++;
            }
            if (displayIndex == childCount)
                displayIndex--;
            this.$container.setChildIndex(child.displayObject, displayIndex);
            this.setBoundsChangedFlag();
        }
        return index;
    }
    swapChildren(child1, child2) {
        let index1 = this.$children.indexOf(child1);
        let index2 = this.$children.indexOf(child2);
        if (index1 == -1 || index2 == -1)
            throw new Error('no such child found');
        this.swapChildrenAt(index1, index2);
    }
    swapChildrenAt(index1, index2 = 0) {
        let child1 = this.$children[index1];
        let child2 = this.$children[index2];
        this.setChildIndex(child1, index2);
        this.setChildIndex(child2, index1);
    }
    get numChildren() {
        return this.$children.length;
    }
    isAncestorOf(child) {
        if (child == null)
            return false;
        let p = child.parent;
        while (p) {
            if (p == this)
                return true;
            p = p.parent;
        }
        return false;
    }
    addController(controller) {
        this.$controllers.push(controller);
        controller.$parent = this;
        this.applyController(controller);
    }
    getControllerAt(index) {
        return this.$controllers[index];
    }
    getController(name) {
        let cnt = this.$controllers.length;
        for (let i = 0; i < cnt; ++i) {
            let c = this.$controllers[i];
            if (c.name == name)
                return c;
        }
        return null;
    }
    removeController(c) {
        let index = this.$controllers.indexOf(c);
        if (index == -1)
            throw new Error('controller not exists');
        c.$parent = null;
        this.$controllers.splice(index, 1);
        this.$children.forEach(child => {
            child.handleControllerChanged(c);
        });
    }
    get controllers() {
        return this.$controllers;
    }
    childStateChanged(child) {
        if (this.$buildingDisplayList)
            return;
        if (child instanceof GGroup) {
            this.$children.forEach(g => {
                if (g.group == child)
                    this.childStateChanged(g);
            }, this);
            return;
        }
        if (!child.displayObject)
            return;
        if (child.finalVisible) {
            if (!child.displayObject.parent) {
                let index = 0;
                let len = this.$children.length;
                for (let i1 = 0; i1 < len; i1++) {
                    let g = this.$children[i1];
                    if (g == child)
                        break;
                    if (g.displayObject && g.displayObject.parent)
                        index++;
                }
                this.$container.addChildAt(child.displayObject, index);
            }
        }
        else {
            if (child.displayObject.parent)
                this.$container.removeChild(child.displayObject);
        }
    }
    applyController(c) {
        this.$applyingController = c;
        this.$children.forEach(child => {
            child.handleControllerChanged(c);
        });
        this.$applyingController = null;
        c.executeActions();
    }
    applyAllControllers() {
        this.$controllers.forEach(c => {
            this.applyController(c);
        }, this);
    }
    adjustRadioGroupDepth(obj, c) {
        let myIndex = -1, maxIndex = -1;
        this.$children.forEach((child, i) => {
            if (child == obj) {
                myIndex = i;
            }
            else if (("relatedController" in child) && child.relatedController == c) {
                if (i > maxIndex)
                    maxIndex = i;
            }
        });
        if (myIndex < maxIndex) {
            if (this.$applyingController != null)
                this.$children[maxIndex].handleControllerChanged(this.$applyingController); //TODO: twice
            this.swapChildrenAt(myIndex, maxIndex);
        }
    }
    getTransitionAt(index) {
        return this.$transitions[index];
    }
    getTransition(transName) {
        let cnt = this.$transitions.length;
        for (let i = 0; i < cnt; ++i) {
            let trans = this.$transitions[i];
            if (trans.name == transName)
                return trans;
        }
        return null;
    }
    isChildInView(child) {
        if (this.$rootContainer.scrollRect != null) {
            return (child.x + child.width >= 0 &&
                child.x <= this.width &&
                child.y + child.height >= 0 &&
                child.y <= this.height);
        }
        else if (this.$scrollPane != null) {
            return this.$scrollPane.isChildInView(child);
        }
        else
            return true;
    }
    getFirstChildInView() {
        let cnt = this.$children.length;
        for (let i = 0; i < cnt; ++i) {
            let child = this.$children[i];
            if (this.isChildInView(child))
                return i;
        }
        return -1;
    }
    get scrollPane() {
        return this.$scrollPane;
    }
    get opaque() {
        return this.$opaque;
    }
    set opaque(value) {
        if (this.$opaque != value) {
            this.$opaque = value;
            if (this.$opaque) {
                this.updateOpaque();
            }
            else {
                if (this.$rootContainer.hitArea &&
                    this.$rootContainer.hitArea instanceof createjs.DisplayObject) {
                    this.$rootContainer.hitArea = null;
                }
            }
        }
    }
    get margin() {
        return this.$margin;
    }
    set margin(value) {
        this.$margin.copy(value);
        if (this.$rootContainer.scrollRect != null) {
            this.$container.x = this.$margin.left + this.$alignOffset.x;
            this.$container.y = this.$margin.top + this.$alignOffset.y;
        }
        this.handleSizeChanged();
    }
    get mask() {
        return this.$rootContainer.mask;
    }
    set mask(obj) {
        if (!obj)
            return;
        if (obj instanceof createjs.Shape)
            this.$rootContainer.mask = obj;
    }
    updateOpaque() {
        // todo
        // If hitArea set on a Container, children of the Container will not receive mouse events.  
        // if (!this.$hitArea) {
        //     this.$hitArea = new createjs.Shape();
        // }
        // this.$hitArea.graphics.beginFill('#000').drawRect(0, 0, this.width, this.height); 
        // (<createjs.Shape>this.$rootContainer.hitArea) = this.$hitArea;
    }
    updateScrollRect() {
        let rect = this.$rootContainer.scrollRect;
        if (rect == null)
            rect = new createjs.Rectangle();
        let w = this.width - this.$margin.right;
        let h = this.height - this.$margin.bottom;
        rect.x = rect.y = 0;
        rect.width = w;
        rect.height = h;
        this.$rootContainer.scrollRect = rect;
    }
    setupScroll(scrollBarMargin, scroll, scrollBarDisplay, flags, vtScrollBarRes, hzScrollBarRes, headerRes, footerRes) {
        if (this.$rootContainer == this.$container) {
            this.$container = new createjs.Container();
            this.$rootContainer.addChild(this.$container);
        }
        this.$scrollPane = new ScrollPane(this, scroll, scrollBarMargin, scrollBarDisplay, flags, vtScrollBarRes, hzScrollBarRes, headerRes, footerRes);
    }
    setupOverflow(overflow) {
        if (overflow == 1 /* Hidden */) {
            if (this.$rootContainer == this.$container) {
                this.$container = new createjs.Container();
                this.$rootContainer.addChild(this.$container);
            }
            this.updateScrollRect();
            this.$container.x = this.$margin.left;
            this.$container.y = this.$margin.top;
        }
        else if (this.$margin.left != 0 || this.$margin.top != 0) {
            if (this.$rootContainer == this.$container) {
                this.$container = new createjs.Container();
                this.$rootContainer.addChild(this.$container);
            }
            this.$container.x = this.$margin.left;
            this.$container.y = this.$margin.top;
        }
        this.setBoundsChangedFlag();
    }
    handleSizeChanged() {
        if (this.$scrollPane)
            this.$scrollPane.onOwnerSizeChanged();
        else if (this.$rootContainer.scrollRect != null)
            this.updateScrollRect();
        if (this.$hitArea)
            this.$hitArea.graphics.drawRect(this.x, this.y, this.width, this.height);
        if (this.parent && this.parent.$hitArea) {
            console.log(1);
            this.parent.$displayObject.hitArea = null;
        }
        if (this.$opaque)
            this.updateOpaque();
    }
    handleGrayedChanged() {
        let c = this.getController('grayed');
        if (c != null)
            c.selectedIndex = this.grayed ? 1 : 0;
        else
            super.handleGrayedChanged();
    }
    setBoundsChangedFlag() {
        if (!this.$scrollPane && !this.$trackBounds)
            return;
        if (!this.$boundsChanged) {
            this.$boundsChanged = true;
            GTimer.inst.callLater(this.$validate, this);
        }
    }
    $validate(dt) {
        if (this.$boundsChanged)
            this.updateBounds();
    }
    ensureBoundsCorrect() {
        if (this.$boundsChanged)
            this.updateBounds();
    }
    updateBounds() {
        let ax = 0, ay = 0, aw = 0, ah = 0;
        let len = this.$children.length;
        if (len > 0) {
            (ax = Number.POSITIVE_INFINITY), (ay = Number.POSITIVE_INFINITY);
            let ar = Number.NEGATIVE_INFINITY, ab = Number.NEGATIVE_INFINITY;
            let tmp = 0;
            this.$children.forEach(child => {
                child.ensureSizeCorrect();
                tmp = child.x;
                if (tmp < ax)
                    ax = tmp;
                tmp = child.y;
                if (tmp < ay)
                    ay = tmp;
                tmp = child.x + child.actualWidth;
                if (tmp > ar)
                    ar = tmp;
                tmp = child.y + child.actualHeight;
                if (tmp > ab)
                    ab = tmp;
            });
            aw = ar - ax;
            ah = ab - ay;
        }
        this.setBounds(ax, ay, aw, ah);
    }
    setBounds(ax, ay, aw, ah = 0) {
        this.$boundsChanged = false;
        if (this.$scrollPane)
            this.$scrollPane.setContentSize(Math.round(ax + aw), Math.round(ay + ah));
    }
    get viewWidth() {
        if (this.$scrollPane != null)
            return this.$scrollPane.viewWidth;
        else
            return this.width - this.$margin.left - this.$margin.right;
    }
    set viewWidth(value) {
        if (this.$scrollPane != null)
            this.$scrollPane.viewWidth = value;
        else
            this.width = value + this.$margin.left + this.$margin.right;
    }
    get viewHeight() {
        if (this.$scrollPane != null)
            return this.$scrollPane.viewHeight;
        else
            return this.height - this.$margin.top - this.$margin.bottom;
    }
    set viewHeight(value) {
        if (this.$scrollPane != null)
            this.$scrollPane.viewHeight = value;
        else
            this.height = value + this.$margin.top + this.$margin.bottom;
    }
    getSnappingPosition(xValue, yValue, resultPoint) {
        if (!resultPoint)
            resultPoint = new createjs.Point();
        let cnt = this.$children.length;
        if (cnt <= 0) {
            resultPoint.x = 0;
            resultPoint.y = 0;
            return resultPoint;
        }
        this.ensureBoundsCorrect();
        let obj = null;
        let prev = null;
        let i = 0;
        if (yValue != 0) {
            for (; i < cnt; i++) {
                obj = this.$children[i];
                if (yValue < obj.y) {
                    if (i == 0) {
                        yValue = 0;
                        break;
                    }
                    else {
                        prev = this.$children[i - 1];
                        if (yValue < prev.y + prev.actualHeight / 2)
                            //top half part
                            yValue = prev.y;
                        //bottom half part
                        else
                            yValue = obj.y;
                        break;
                    }
                }
            }
            if (i == cnt)
                yValue = obj.y;
        }
        if (xValue != 0) {
            if (i > 0)
                i--;
            for (; i < cnt; i++) {
                obj = this.$children[i];
                if (xValue < obj.x) {
                    if (i == 0) {
                        xValue = 0;
                        break;
                    }
                    else {
                        prev = this.$children[i - 1];
                        if (xValue < prev.x + prev.actualWidth / 2)
                            //top half part
                            xValue = prev.x;
                        //bottom half part
                        else
                            xValue = obj.x;
                        break;
                    }
                }
            }
            if (i == cnt)
                xValue = obj.x;
        }
        resultPoint.x = xValue;
        resultPoint.y = yValue;
        return resultPoint;
    }
    childSortingOrderChanged(child, oldValue, newValue = 0) {
        if (newValue == 0) {
            this.$sortingChildCount--;
            this.setChildIndex(child, this.$children.length);
        }
        else {
            if (oldValue == 0)
                this.$sortingChildCount++;
            let oldIndex = this.$children.indexOf(child);
            let index = this.getInsertPosForSortingChild(child);
            if (oldIndex < index)
                this.$setChildIndex(child, oldIndex, index - 1);
            else
                this.$setChildIndex(child, oldIndex, index);
        }
    }
    /**@internal */
    constructFromResource() {
        this.constructInternal(null, 0);
    }
    constructInternal(objectPool, poolIndex) {
        let xml = this.packageItem.owner.getItemAsset(this.packageItem);
        this.$inProgressBuilding = true;
        let str;
        let arr;
        str = xml.attributes.size;
        arr = str.split(',');
        this.$sourceWidth = parseInt(arr[0]);
        this.$sourceHeight = parseInt(arr[1]);
        this.$initWidth = this.$sourceWidth;
        this.$initHeight = this.$sourceHeight;
        this.setSize(this.$sourceWidth, this.$sourceHeight);
        str = xml.attributes.pivot;
        if (str) {
            arr = str.split(',');
            str = xml.attributes.anchor;
            this.internalSetPivot(parseFloat(arr[0]), parseFloat(arr[1]), str == 'true');
        }
        str = xml.attributes.opaque; // default false
        this.opaque = str != 'false';
        let overflow;
        str = xml.attributes.overflow;
        if (str)
            overflow = ParseOverflowType(str);
        else
            overflow = 0 /* Visible */;
        str = xml.attributes.margin;
        if (str)
            this.$margin.parse(str);
        if (overflow == 2 /* Scroll */) {
            let scroll;
            str = xml.attributes.scroll;
            if (str)
                scroll = ParseScrollType(str);
            else
                scroll = 1 /* Vertical */;
            let scrollBarDisplay;
            str = xml.attributes.scrollBar;
            if (str)
                scrollBarDisplay = ParseScrollBarDisplayType(str);
            else
                scrollBarDisplay = 0 /* Default */;
            let scrollBarFlags;
            str = xml.attributes.scrollBarFlags;
            if (str)
                scrollBarFlags = parseInt(str);
            else
                scrollBarFlags = 0;
            let scrollBarMargin = new Margin();
            str = xml.attributes.scrollBarMargin;
            if (str)
                scrollBarMargin.parse(str);
            let vtScrollBarRes;
            let hzScrollBarRes;
            str = xml.attributes.scrollBarRes;
            if (str) {
                arr = str.split(',');
                vtScrollBarRes = arr[0];
                hzScrollBarRes = arr[1];
            }
            let headerRes, footerRes;
            str = xml.attributes.ptrRes;
            if (str) {
                arr = str.split(',');
                headerRes = arr[0];
                footerRes = arr[1];
            }
            this.setupScroll(scrollBarMargin, scroll, scrollBarDisplay, scrollBarFlags, vtScrollBarRes, hzScrollBarRes, headerRes, footerRes);
        }
        else
            this.setupOverflow(overflow);
        this.$buildingDisplayList = true;
        let col = xml.children;
        col.forEach(cxml => {
            if (cxml.nodeName == 'controller') {
                let c = new Controller();
                this.$controllers.push(c);
                c.$parent = this;
                c.setup(cxml);
            }
        });
        let displayList = this.packageItem.displayList;
        displayList.forEach((di, i) => {
            let child;
            if (objectPool != null)
                child = objectPool[poolIndex + i];
            else if (di.packageItem) {
                child = Decls.UIObjectFactory.newObject(di.packageItem);
                child.packageItem = di.packageItem;
                child.constructFromResource();
            }
            else
                child = Decls.UIObjectFactory.newObjectDirectly(di.type);
            child.$inProgressBuilding = true;
            child.setupBeforeAdd(di.desc);
            child.parent = this;
            this.$children.push(child);
            if (child instanceof GComponent) {
                if (child.mask) {
                    child.mask.set({ x: child.mask.x + child.x, y: child.mask.y + child.y });
                }
            }
        }, this);
        this.relations.setup(xml);
        this.$children.forEach((child, i) => {
            child.relations.setup(displayList[i].desc);
            child.setupAfterAdd(displayList[i].desc);
            child.$inProgressBuilding = false;
        });
        str = xml.attributes.mask;
        if (str) {
            let obj = this.getChildById(str);
            let maskObj = obj.displayObject;
            this.removeChild(obj);
            if (maskObj instanceof createjs.Shape) {
                this.mask = maskObj;
            }
            else if (maskObj['$disp'] instanceof Sprite) ;
            else
                throw new Error('only Sprite or Graphics can be applied as mask object');
        }
        col.forEach(cxml => {
            if (cxml.nodeName == 'transition') {
                let trans = new Transition(this);
                this.$transitions.push(trans);
                trans.setup(cxml);
            }
        }, this);
        if (this.$transitions.length > 0) {
            this.on('added', this.$added, this);
            this.on('removed', this.$removed, this);
        }
        this.applyAllControllers();
        this.$buildingDisplayList = false;
        this.$inProgressBuilding = false;
        this.appendChildrenList();
        this.setBoundsChangedFlag();
        this.constructFromXML(xml);
    }
    appendChildrenList() {
        this.$children.forEach(child => {
            if (child.displayObject != null && child.finalVisible)
                this.$container.addChild(child.displayObject);
        }, this);
    }
    constructFromXML(xml) { }
    $added(d) {
        this.$transitions.forEach(trans => {
            if (trans.autoPlay)
                trans.play({ times: trans.autoPlayRepeat, delay: trans.autoPlayDelay });
        });
    }
    $removed(d) {
        this.$transitions.forEach(trans => {
            trans.stop(false, false);
        });
    }
}

class Window extends GComponent {
    constructor() {
        super();
        this.$requestingCmd = 0;
        this.focusable = true;
        this.$uiSources = [];
        this.bringToFrontOnClick = UIConfig.bringWindowToFrontOnClick;
        this.on('added', this.$onShown, this);
        this.on('removed', this.$onHidden, this);
        this.on(InteractiveEvents.Down, this.$mouseDown, this);
    }
    addUISource(source) {
        this.$uiSources.push(source);
    }
    set contentPane(val) {
        if (this.$contentPane != val) {
            if (this.$contentPane != null)
                this.removeChild(this.$contentPane);
            this.$contentPane = val;
            if (this.$contentPane != null) {
                this.addChild(this.$contentPane);
                this.setSize(this.$contentPane.width, this.$contentPane.height);
                this.$contentPane.addRelation(this, 24 /* Size */);
                this.$frame = this.$contentPane.getChild('frame');
                if (this.$frame != null) {
                    this.closeButton = this.$frame.getChild('closeButton');
                    this.dragArea = this.$frame.getChild('dragArea');
                    this.contentArea = this.$frame.getChild('contentArea');
                }
            }
        }
    }
    get contentPane() {
        return this.$contentPane;
    }
    get frame() {
        return this.$frame;
    }
    get closeButton() {
        return this.$closeButton;
    }
    set closeButton(value) {
        if (this.$closeButton != null)
            this.$closeButton.removeClick(this.closeEventHandler);
        this.$closeButton = value;
        if (this.$closeButton != null)
            this.$closeButton.click(this.closeEventHandler, this);
    }
    get dragArea() {
        return this.$dragArea;
    }
    set dragArea(value) {
        if (this.$dragArea != value) {
            if (this.$dragArea != null) {
                this.$dragArea.draggable = false;
                this.$dragArea.off("__dragStart" /* START */, this.$dragStart);
            }
            this.$dragArea = value;
            if (this.$dragArea != null) {
                if (this.$dragArea instanceof GGraph)
                    this.$dragArea.drawRect(0, '#000', '#000');
                this.$dragArea.draggable = true;
                this.$dragArea.on("__dragStart" /* START */, this.$dragStart, this);
            }
        }
    }
    get contentArea() {
        return this.$contentArea;
    }
    set contentArea(value) {
        this.$contentArea = value;
    }
    show() {
        Decls$1.GRoot.inst.showWindow(this);
    }
    showOn(root) {
        root.showWindow(this);
    }
    hide() {
        if (this.isShowing)
            this.doHideAnimation();
    }
    hideImmediately() {
        Decls$1.GRoot.inst.hideWindowImmediately(this);
    }
    centerOn(r, autoUpdate = false) {
        this.setXY(Math.round((r.width - this.width) * 0.5), Math.round((r.height - this.height) * 0.5));
        if (autoUpdate) {
            this.addRelation(r, 3 /* Center_Center */);
            this.addRelation(r, 10 /* Middle_Middle */);
        }
    }
    toggleVisible() {
        if (this.isTop)
            this.hide();
        else
            this.show();
    }
    get isShowing() {
        return this.parent != null;
    }
    get isTop() {
        return this.parent != null && this.parent.getChildIndex(this) == this.parent.numChildren - 1;
    }
    get modal() {
        return this.$modal;
    }
    set modal(val) {
        this.$modal = val;
    }
    bringToFront() {
        Decls$1.GRoot.inst.bringToFront(this);
    }
    showModalWait(msg, cmd = 0) {
        if (cmd != 0)
            this.$requestingCmd = cmd;
        if (UIConfig.windowModalWaiting) {
            if (!this.$modalWaitPane)
                this.$modalWaitPane = UIPackage.createObjectFromURL(UIConfig.windowModalWaiting);
            this.layoutModalWaitPane(msg);
            this.addChild(this.$modalWaitPane);
        }
    }
    layoutModalWaitPane(msg) {
        if (this.$contentArea != null) {
            let pt = this.$frame.localToGlobal();
            pt = this.globalToLocal(pt.x, pt.y, pt);
            this.$modalWaitPane.setXY(pt.x + this.$contentArea.x, pt.y + this.$contentArea.y);
            this.$modalWaitPane.setSize(this.$contentArea.width, this.$contentArea.height);
            if (msg && msg.length)
                this.$modalWaitPane.text = msg;
        }
        else
            this.$modalWaitPane.setSize(this.width, this.height);
    }
    closeModalWait(cmd = 0) {
        if (cmd != 0) {
            if (this.$requestingCmd != cmd)
                return false;
        }
        this.$requestingCmd = 0;
        if (this.$modalWaitPane && this.$modalWaitPane.parent != null)
            this.removeChild(this.$modalWaitPane);
        return true;
    }
    get modalWaiting() {
        return this.$modalWaitPane && this.$modalWaitPane.parent != null;
    }
    init() {
        if (this.$inited || this.$loading)
            return;
        if (this.$uiSources.length > 0) {
            this.$loading = false;
            this.$uiSources.forEach(o => {
                if (!o.loaded) {
                    o.load(this.$uiLoadComplete, this);
                    this.$loading = true;
                }
            }, this);
            if (!this.$loading)
                this.$init();
        }
        else
            this.$init();
    }
    onInit() { }
    onShown() { }
    onHide() { }
    doShowAnimation() {
        this.onShown();
    }
    doHideAnimation() {
        this.hideImmediately();
    }
    $uiLoadComplete() {
        let cnt = this.$uiSources.length;
        for (let i = 0; i < cnt; i++) {
            if (!this.$uiSources[i].loaded)
                return;
        }
        this.$loading = false;
        this.$init();
    }
    $init() {
        this.$inited = true;
        this.onInit();
        if (this.isShowing)
            this.doShowAnimation();
    }
    dispose() {
        this.off('added', this.$onShown);
        this.off('removed', this.$onHidden);
        this.off(InteractiveEvents.Down, this.$mouseDown);
        if (this.$dragArea)
            this.$dragArea.off("__dragStart" /* START */, this.$dragStart);
        if (this.parent != null)
            this.hideImmediately();
        if (this.$modalWaitPane)
            this.$modalWaitPane.dispose();
        if (this.$contentPane)
            this.$contentPane.dispose();
        super.dispose();
    }
    closeEventHandler(evt) {
        this.hide();
    }
    $onShown(target) {
        if (!this.$inited)
            this.init();
        else
            this.doShowAnimation();
    }
    $onHidden(target) {
        this.closeModalWait();
        this.onHide();
    }
    $mouseDown(evt) {
        if (this.isShowing && this.bringToFrontOnClick)
            this.bringToFront();
    }
    $dragStart(evt) {
        let currentTarget = evt.data.currentTarget;
        GObject.castFromNativeObject(currentTarget).stopDrag();
        this.startDrag(evt.data.pointerID);
    }
}

let _inst;
class GRootMouseStatus {
    constructor() {
        this.touchDown = false;
        this.mouseX = 0;
        this.mouseY = 0;
    }
}
class GRoot extends GComponent {
    constructor() {
        super();
        this.$volumeScale = 1;
        if (_inst == null)
            _inst = this;
        this.opaque = false;
        this.$popupStack = [];
        this.$justClosedPopups = [];
        this.$uid = GRoot.uniqueID++;
        DOMEventManager.inst.on("__mouseWheel" /* MOUSE_WHEEL */, this.dispatchMouseWheel, this);
    }
    static findFor(obj) {
        if (obj instanceof GRoot)
            return obj;
        if (!obj)
            return _inst;
        var p = obj.parent;
        while (p) {
            if (p instanceof GRoot)
                return p;
            p = p.parent;
        }
        return _inst;
    }
    /**
     * the singleton instance of the GRoot object
     */
    static get inst() {
        if (_inst == null)
            _inst = new GRoot();
        return _inst;
    }
    /**
     * the current mouse/pointer data
     */
    static get globalMouseStatus() {
        return GRoot.$gmStatus;
    }
    /**
     * the main entry to lauch the UI root, e.g.: GRoot.inst.attachTo(app, options)
     * @param app your createjs.Stage instance to be used in this GRoot instance
     * @param stageOptions stage rotation / resize options
     */
    attachTo(stage, stageOptions) {
        createjs.Touch.enable(stage);
        stage.mouseEnabled = true;
        stage.mouseChildren = true;
        stage.enableMouseOver(50);
        // if (this.$uiStage) {
        //     this.$uiStage.off(DisplayObjectEvent.SIZE_CHANGED, this.$winResize);
        //     this.$uiStage.nativeStage.off(InteractiveEvents.Down, this.$stageDown);
        //     this.$uiStage.nativeStage.off(InteractiveEvents.Up, this.$stageUp);
        //     this.$uiStage.nativeStage.off(InteractiveEvents.Move, this.$stageMove);
        //     this.$uiStage.nativeStage.off(this.$displayObject);
        //     this.$uiStage.dispose();
        // }
        this.$uiStage = new UIStage(stage, stageOptions);
        this.$uiStage.on("__sizeChanged" /* SIZE_CHANGED */, this.$winResize, this);
        this.$uiStage.nativeStage.on(InteractiveEvents.Down, this.$stageDown, this);
        this.$uiStage.nativeStage.on(InteractiveEvents.Up, this.$stageUp, this);
        this.$uiStage.nativeStage.on(InteractiveEvents.Move, this.$stageMove, this);
        this.$uiStage.nativeStage.on(InteractiveEvents.Click, this.$click, this);
        this.$uiStage.nativeStage.addChild(this.$displayObject);
        this.$winResize(this.$uiStage);
        if (!this.$modalLayer) {
            this.$modalLayer = new GGraph();
            this.$modalLayer.setSize(this.width, this.height);
            this.$modalLayer.drawRect(0, '', UIConfig.modalLayerColor);
            this.$modalLayer.addRelation(this, 24 /* Size */);
        }
    }
    get uniqueID() {
        return this.$uid;
    }
    get stageWidth() {
        return this.$uiStage.stageWidth;
    }
    get stageHeight() {
        return this.$uiStage.stageHeight;
    }
    get contentScaleFactor() {
        return this.$uiStage.resolution;
    }
    get applicationContext() {
        return this.$uiStage.applicationContext;
    }
    get nativeStage() {
        return this.$uiStage.nativeStage;
    }
    get orientation() {
        return this.$uiStage.orientation;
    }
    get stageWrapper() {
        return this.$uiStage;
    }
    dispatchMouseWheel(evt) {
        let event = evt.data.event;
        let childUnderMouse = this.getObjectUnderPoint(GRoot.globalMouseStatus.mouseX, GRoot.globalMouseStatus.mouseY);
        if (childUnderMouse != null) {
            //bubble
            while (childUnderMouse.parent && childUnderMouse.parent != this) {
                let mouseWheelEvent = new createjs.Event("__mouseWheel" /* MOUSE_WHEEL */, true, false);
                mouseWheelEvent.data = { event };
                childUnderMouse.dispatchEvent(mouseWheelEvent);
                childUnderMouse = childUnderMouse.parent;
            }
        }
    }
    /**
     * get the objects which are placed underneath the given stage coordinate
     * @param globalX the stage X
     * @param globalY the stage Y
     */
    getObjectUnderPoint(globalX, globalY) {
        GRoot.sHelperPoint.setValues(globalX, globalY);
        window['test'] = true;
        let ret = this.$uiStage.applicationContext.getObjectUnderPoint(GRoot.sHelperPoint.x, GRoot.sHelperPoint.y, 0);
        return GObject.castFromNativeObject(ret);
    }
    showWindow(win) {
        this.addChild(win);
        win.requestFocus();
        if (win.x > this.width)
            win.x = this.width - win.width;
        else if (win.x + win.width < 0)
            win.x = 0;
        if (win.y > this.height)
            win.y = this.height - win.height;
        else if (win.y + win.height < 0)
            win.y = 0;
        this.adjustModalLayer();
    }
    hideWindow(win) {
        win.hide();
    }
    hideWindowImmediately(win) {
        if (win.parent == this)
            this.removeChild(win);
        this.adjustModalLayer();
    }
    bringToFront(win) {
        let i;
        if (this.$modalLayer.parent != null && !win.modal)
            i = this.getChildIndex(this.$modalLayer) - 1;
        else
            i = this.numChildren - 1;
        for (; i >= 0; i--) {
            let g = this.getChildAt(i);
            if (g == win)
                return;
            if (g instanceof Window)
                break;
        }
        if (i >= 0)
            this.setChildIndex(win, i);
    }
    showModalWait(msg = null) {
        if (UIConfig.globalModalWaiting != null) {
            if (this.$modalWaitPane == null) {
                this.$modalWaitPane = UIPackage.createObjectFromURL(UIConfig.globalModalWaiting);
                this.$modalWaitPane.addRelation(this, 24 /* Size */);
            }
            this.$modalWaitPane.setSize(this.width, this.height);
            this.addChild(this.$modalWaitPane);
            this.$modalWaitPane.text = msg;
        }
    }
    closeModalWait() {
        if (this.$modalWaitPane != null && this.$modalWaitPane.parent != null)
            this.removeChild(this.$modalWaitPane);
    }
    closeAllExceptModals() {
        let arr = this.$children.slice();
        arr.forEach(g => {
            if (g instanceof Window && !g.modal)
                g.hide();
        }, this);
    }
    closeAllWindows() {
        let arr = this.$children.slice();
        arr.forEach(g => {
            if (g instanceof Window)
                g.hide();
        }, this);
    }
    getTopWindow() {
        let cnt = this.numChildren;
        for (let i = cnt - 1; i >= 0; i--) {
            let g = this.getChildAt(i);
            if (g instanceof Window) {
                return g;
            }
        }
        return null;
    }
    get hasModalWindow() {
        return this.$modalLayer.parent != null;
    }
    get modalWaiting() {
        return this.$modalWaitPane && this.$modalWaitPane.inContainer;
    }
    showPopup(popup, target = null, dir = 0 /* Auto */) {
        if (this.$popupStack.length > 0) {
            let k = this.$popupStack.indexOf(popup);
            if (k != -1) {
                for (let i = this.$popupStack.length - 1; i >= k; i--)
                    this.removeChild(this.$popupStack.pop());
            }
        }
        this.$popupStack.push(popup);
        this.addChild(popup);
        this.adjustModalLayer();
        let pos;
        let sizeW = 0, sizeH = 0;
        if (target) {
            pos = target.localToRoot();
            sizeW = target.width;
            sizeH = target.height;
        }
        else
            pos = this.globalToLocal(GRoot.$gmStatus.mouseX, GRoot.$gmStatus.mouseY);
        let xx, yy;
        xx = pos.x;
        if (xx + popup.width > this.width)
            xx = xx + sizeW - popup.width;
        yy = pos.y + sizeH;
        if ((dir == 0 /* Auto */ && yy + popup.height > this.height) ||
            dir == 2 /* Up */) {
            yy = pos.y - popup.height - 1;
            if (yy < 0) {
                yy = 0;
                xx += sizeW * 0.5;
            }
        }
        popup.x = xx;
        popup.y = yy;
    }
    togglePopup(popup, target = null, dir) {
        if (this.$justClosedPopups.indexOf(popup) != -1)
            return;
        this.showPopup(popup, target, dir);
    }
    hidePopup(popup = null) {
        let i;
        if (popup != null) {
            let k = this.$popupStack.indexOf(popup);
            if (k != -1) {
                for (i = this.$popupStack.length - 1; i >= k; i--)
                    this.closePopup(this.$popupStack.pop());
            }
        }
        else {
            let cnt = this.$popupStack.length;
            for (i = cnt - 1; i >= 0; i--)
                this.closePopup(this.$popupStack[i]);
            this.$popupStack.length = 0;
        }
    }
    get hasAnyPopup() {
        return this.$popupStack.length != 0;
    }
    closePopup(target) {
        if (target.parent != null) {
            if (target instanceof Window)
                target.hide();
            else
                this.removeChild(target);
        }
    }
    showTooltips(msg) {
        if (this.$defaultTooltipWin == null) {
            let resourceURL = UIConfig.tooltipsWin;
            if (!resourceURL) {
                console.error('UIConfig.tooltipsWin not defined');
                return;
            }
            this.$defaultTooltipWin = UIPackage.createObjectFromURL(resourceURL);
        }
        this.$defaultTooltipWin.text = msg;
        this.showTooltipsWin(this.$defaultTooltipWin);
    }
    showTooltipsWin(tooltipWin, position = null) {
        this.hideTooltips();
        this.$tooltipWin = tooltipWin;
        let xx = 0;
        let yy = 0;
        if (position == null) {
            xx = GRoot.$gmStatus.mouseX + 10;
            yy = GRoot.$gmStatus.mouseY + 20;
        }
        else {
            xx = position.x;
            yy = position.y;
        }
        let pt = this.globalToLocal(xx, yy);
        xx = pt.x;
        yy = pt.y;
        if (xx + this.$tooltipWin.width > this.width) {
            xx = xx - this.$tooltipWin.width - 1;
            if (xx < 0)
                xx = 10;
        }
        if (yy + this.$tooltipWin.height > this.height) {
            yy = yy - this.$tooltipWin.height - 1;
            if (xx - this.$tooltipWin.width - 1 > 0)
                xx = xx - this.$tooltipWin.width - 1;
            if (yy < 0)
                yy = 10;
        }
        this.$tooltipWin.x = xx;
        this.$tooltipWin.y = yy;
        this.addChild(this.$tooltipWin);
    }
    hideTooltips() {
        if (this.$tooltipWin != null) {
            if (this.$tooltipWin.parent)
                this.removeChild(this.$tooltipWin);
            this.$tooltipWin = null;
        }
    }
    get focus() {
        if (this.$focusedObject && !this.$focusedObject.onStage)
            this.$focusedObject = null;
        return this.$focusedObject;
    }
    set focus(value) {
        if (value && (!value.focusable || !value.onStage))
            throw new Error('Invalid target to focus');
        this.setFocus(value);
    }
    setFocus(value) {
        if (this.$focusedObject != value) {
            this.$focusedObject = value;
            let evt = new createjs.Event("__focusChanged" /* CHANGED */, true, false);
            this.dispatchEvent(evt, this);
        }
    }
    get volumeScale() {
        return this.$volumeScale;
    }
    set volumeScale(value) {
        this.$volumeScale = value;
    }
    playOneShotSound(sound, volumeScale = 1) {
        var vs = this.$volumeScale * volumeScale;
        sound.play({ volume: vs });
    }
    adjustModalLayer() {
        let cnt = this.numChildren;
        if (this.$modalWaitPane != null && this.$modalWaitPane.parent != null)
            this.setChildIndex(this.$modalWaitPane, cnt - 1);
        for (let i = cnt - 1; i >= 0; i--) {
            let g = this.getChildAt(i);
            if (g instanceof Window && g.modal) {
                if (this.$modalLayer.parent == null)
                    this.addChildAt(this.$modalLayer, i);
                else
                    this.setChildIndexBefore(this.$modalLayer, i);
                return;
            }
        }
        if (this.$modalLayer.parent != null)
            this.removeChild(this.$modalLayer);
    }
    $stageDown(evt) {
        // see Drag & Drop
        GRoot.$gmStatus.mouseX = evt.stageX;
        GRoot.$gmStatus.mouseY = evt.stageY;
        GRoot.$gmStatus.touchDown = true;
        //check focus
        let mc = evt.target;
        while (mc && mc != this.nativeStage) {
            if (isUIObject(mc)) {
                let g = mc.UIOwner;
                if (g.touchable && g.focusable) {
                    this.setFocus(g);
                    break;
                }
            }
            mc = mc.parent;
        }
        if (this.$tooltipWin != null)
            this.hideTooltips();
        this.checkPopups(evt.target);
    }
    checkPopups(target) {
        if (this.$checkingPopups)
            return;
        this.$checkingPopups = true;
        this.$justClosedPopups.length = 0;
        if (this.$popupStack.length > 0) {
            let mc = target;
            while (mc && mc != this.nativeStage) {
                if (isUIObject(mc)) {
                    let pindex = this.$popupStack.indexOf(mc.UIOwner);
                    if (pindex != -1) {
                        let popup;
                        for (let i = this.$popupStack.length - 1; i > pindex; i--) {
                            popup = this.$popupStack.pop();
                            this.closePopup(popup);
                            this.$justClosedPopups.push(popup);
                        }
                        return;
                    }
                }
                mc = mc.parent;
            }
            let cnt = this.$popupStack.length;
            let popup;
            for (let i = cnt - 1; i >= 0; i--) {
                popup = this.$popupStack[i];
                this.closePopup(popup);
                this.$justClosedPopups.push(popup);
            }
            this.$popupStack.length = 0;
        }
    }
    $stageMove(evt) {
        GRoot.$gmStatus.mouseX = evt.stageX;
        GRoot.$gmStatus.mouseY = evt.stageY;
    }
    $stageUp(evt) {
        GRoot.$gmStatus.touchDown = false;
        this.$checkingPopups = false;
    }
    $click(evt) { }
    $winResize(stage) {
        this.setSize(stage.stageWidth, stage.stageHeight);
    }
}
GRoot.uniqueID = 0;
GRoot.$gmStatus = new GRootMouseStatus();
Decls$1.GRoot = GRoot;

var TEXT_GRADIENT;
(function (TEXT_GRADIENT) {
    TEXT_GRADIENT[TEXT_GRADIENT["LINEAR_VERTICAL"] = 0] = "LINEAR_VERTICAL";
    TEXT_GRADIENT[TEXT_GRADIENT["LINEAR_HORIZONTAL"] = 1] = "LINEAR_HORIZONTAL";
})(TEXT_GRADIENT || (TEXT_GRADIENT = {}));
const defaultStyle = {
    align: 'left',
    breakWords: false,
    dropShadow: false,
    dropShadowAlpha: 1,
    dropShadowAngle: Math.PI / 6,
    dropShadowBlur: 0,
    dropShadowColor: 'black',
    dropShadowDistance: 5,
    dropShadowOffsetX: 0,
    dropShadowOffsetY: 0,
    fill: 'black',
    fillGradientType: TEXT_GRADIENT.LINEAR_VERTICAL,
    fillGradientStops: [],
    fontFamily: 'Arial',
    fontSize: 26,
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 0,
    lineJoin: 'miter',
    miterLimit: 10,
    padding: 0,
    stroke: 'black',
    strokeThickness: 0,
    textBaseline: 'alphabetic',
    trim: false,
    whiteSpace: 'pre',
    wordWrap: false,
    wordWrapWidth: 100,
    leading: 0
};
const genericFontFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'];
class TextStyle {
    constructor(style) {
        this.styleID = 0;
        this.reset();
        Utils.deepCopyProperties(this, style, style);
    }
    clone() {
        const clonedProperties = {};
        Utils.deepCopyProperties(clonedProperties, this, defaultStyle);
        return new TextStyle(clonedProperties);
    }
    /**
     * Resets all properties to the defaults specified in TextStyle.prototype._default
     */
    reset() {
        Utils.deepCopyProperties(this, defaultStyle, defaultStyle);
    }
    /**
     * Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
     *
     * @member {string}
     */
    get align() {
        return this._align;
    }
    set align(align) {
        if (this._align !== align) {
            this._align = align;
            this.styleID++;
        }
    }
    /**
     * Indicates if lines can be wrapped within words, it needs wordWrap to be set to true
     *
     * @member {boolean}
     */
    get breakWords() {
        return this._breakWords;
    }
    set breakWords(breakWords) {
        if (this._breakWords !== breakWords) {
            this._breakWords = breakWords;
            this.styleID++;
        }
    }
    /**
     * Set a drop shadow for the text
     *
     * @member {boolean}
     */
    get dropShadow() {
        return this._dropShadow;
    }
    set dropShadow(dropShadow) {
        if (this._dropShadow !== dropShadow) {
            this._dropShadow = dropShadow;
            this.styleID++;
        }
    }
    /**
     * Set alpha for the drop shadow
     *
     * @member {number}
     */
    get dropShadowAlpha() {
        return this._dropShadowAlpha;
    }
    set dropShadowAlpha(dropShadowAlpha) {
        if (this._dropShadowAlpha !== dropShadowAlpha) {
            this._dropShadowAlpha = dropShadowAlpha;
            this.styleID++;
        }
    }
    /**
     * Set a angle of the drop shadow
     *
     * @member {number}
     */
    get dropShadowAngle() {
        return this._dropShadowAngle;
    }
    set dropShadowAngle(dropShadowAngle) {
        if (this._dropShadowAngle !== dropShadowAngle) {
            this._dropShadowAngle = dropShadowAngle;
            this.styleID++;
        }
    }
    /**
     * Set a shadow blur radius
     *
     * @member {number}
     */
    get dropShadowBlur() {
        return this._dropShadowBlur;
    }
    set dropShadowBlur(dropShadowBlur) {
        if (this._dropShadowBlur !== dropShadowBlur) {
            this._dropShadowBlur = dropShadowBlur;
            this.styleID++;
        }
    }
    /**
     * A fill style to be used on the dropshadow e.g 'red', '#00FF00'
     *
     * @member {string|number}
     */
    get dropShadowColor() {
        return this._dropShadowColor;
    }
    set dropShadowColor(dropShadowColor) {
        const outputColor = getColor(dropShadowColor);
        if (this._dropShadowColor !== outputColor) {
            this._dropShadowColor = outputColor;
            this.styleID++;
        }
    }
    /**
     * Set a distance of the drop shadow
     *
     * @member {number}
     */
    get dropShadowDistance() {
        return this._dropShadowDistance;
    }
    set dropShadowDistance(dropShadowDistance) {
        if (this._dropShadowDistance !== dropShadowDistance) {
            this._dropShadowDistance = dropShadowDistance;
            this.styleID++;
        }
    }
    /**
     * Set a offsetX of the drop shadow
     *
     * @member {number}
     */
    get dropShadowOffsetX() {
        return this._dropShadowOffsetX;
    }
    set dropShadowOffsetX(dropShadowOffsetX) {
        if (this._dropShadowOffsetX !== dropShadowOffsetX) {
            this._dropShadowOffsetX = dropShadowOffsetX;
            this.styleID++;
        }
    }
    /**
     * Set a offsetY of the drop shadow
     *
     * @member {number}
     */
    get dropShadowOffsetY() {
        return this._dropShadowOffsetY;
    }
    set dropShadowOffsetY(dropShadowOffsetY) {
        if (this._dropShadowOffsetY !== dropShadowOffsetY) {
            this._dropShadowOffsetY = dropShadowOffsetY;
            this.styleID++;
        }
    }
    /**
     * A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'.
     * Can be an array to create a gradient eg ['#000000','#FFFFFF']
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
     *
     * @member {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
     */
    get fill() {
        return this._fill;
    }
    set fill(fill) {
        const outputColor = getColor(fill);
        if (this._fill !== outputColor) {
            this._fill = outputColor;
            this.styleID++;
        }
    }
    get fillGradientType() {
        return this._fillGradientType;
    }
    set fillGradientType(fillGradientType) {
        if (this._fillGradientType !== fillGradientType) {
            this._fillGradientType = fillGradientType;
            this.styleID++;
        }
    }
    get fillGradientStops() {
        return this._fillGradientStops;
    }
    set fillGradientStops(fillGradientStops) {
        if (!areArraysEqual(this._fillGradientStops, fillGradientStops)) {
            this._fillGradientStops = fillGradientStops;
            this.styleID++;
        }
    }
    get fontFamily() {
        return this._fontFamily;
    }
    set fontFamily(fontFamily) {
        if (this.fontFamily !== fontFamily) {
            this._fontFamily = fontFamily;
            this.styleID++;
        }
    }
    get fontSize() {
        return this._fontSize;
    }
    set fontSize(fontSize) {
        if (this._fontSize !== fontSize) {
            this._fontSize = fontSize;
            this.styleID++;
        }
    }
    get fontStyle() {
        return this._fontStyle;
    }
    set fontStyle(fontStyle) {
        if (this._fontStyle !== fontStyle) {
            this._fontStyle = fontStyle;
            this.styleID++;
        }
    }
    /**
     * The font variant
     * ('normal' or 'small-caps')
     *
     * @member {string}
     */
    get fontVariant() {
        return this._fontVariant;
    }
    set fontVariant(fontVariant) {
        if (this._fontVariant !== fontVariant) {
            this._fontVariant = fontVariant;
            this.styleID++;
        }
    }
    /**
     * The font weight
     * ('normal', 'bold', 'bolder', 'lighter' and '100', '200', '300', '400', '500', '600', '700', 800' or '900')
     *
     * @member {string}
     */
    get fontWeight() {
        return this._fontWeight;
    }
    set fontWeight(fontWeight) {
        if (this._fontWeight !== fontWeight) {
            this._fontWeight = fontWeight;
            this.styleID++;
        }
    }
    /**
     * The amount of spacing between letters, default is 0
     *
     * @member {number}
     */
    get letterSpacing() {
        return this._letterSpacing;
    }
    set letterSpacing(letterSpacing) {
        if (this._letterSpacing !== letterSpacing) {
            this._letterSpacing = letterSpacing;
            this.styleID++;
        }
    }
    /**
     * The line height, a number that represents the vertical space that a letter uses
     *
     * @member {number}
     */
    get lineHeight() {
        return this._lineHeight;
    }
    set lineHeight(lineHeight) {
        if (this._lineHeight !== lineHeight) {
            this._lineHeight = lineHeight;
            this.styleID++;
        }
    }
    /**
     * The space between lines
     *
     * @member {number}
     */
    get leading() {
        return this._leading;
    }
    set leading(leading) {
        if (this._leading !== leading) {
            this._leading = leading;
            this.styleID++;
        }
    }
    /**
     * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
     * Default is 'miter' (creates a sharp corner).
     *
     * @member {string}
     */
    get lineJoin() {
        return this._lineJoin;
    }
    set lineJoin(lineJoin) {
        if (this._lineJoin !== lineJoin) {
            this._lineJoin = lineJoin;
            this.styleID++;
        }
    }
    /**
     * The miter limit to use when using the 'miter' lineJoin mode
     * This can reduce or increase the spikiness of rendered text.
     *
     * @member {number}
     */
    get miterLimit() {
        return this._miterLimit;
    }
    set miterLimit(miterLimit) {
        if (this._miterLimit !== miterLimit) {
            this._miterLimit = miterLimit;
            this.styleID++;
        }
    }
    /**
     * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
     * by adding padding to all sides of the text.
     *
     * @member {number}
     */
    get padding() {
        return this._padding;
    }
    set padding(padding) {
        if (this._padding !== padding) {
            this._padding = padding;
            this.styleID++;
        }
    }
    /**
     * A canvas fillstyle that will be used on the text stroke
     * e.g 'blue', '#FCFF00'
     *
     * @member {string}
     */
    get stroke() {
        return this._stroke;
    }
    set stroke(stroke) {
        // TODO: Can't have different types for getter and setter. The getter shouldn't have the number type as
        //       the setter converts to string. See this thread for more details:
        //       https://github.com/microsoft/TypeScript/issues/2521
        const outputColor = getColor(stroke);
        if (this._stroke !== outputColor) {
            this._stroke = outputColor;
            this.styleID++;
        }
    }
    /**
     * A number that represents the thickness of the stroke.
     * Default is 0 (no stroke)
     *
     * @member {number}
     */
    get strokeThickness() {
        return this._strokeThickness;
    }
    set strokeThickness(strokeThickness) {
        if (this._strokeThickness !== strokeThickness) {
            this._strokeThickness = strokeThickness;
            this.styleID++;
        }
    }
    /**
     * The baseline of the text that is rendered.
     *
     * @member {string}
     */
    get textBaseline() {
        return this._textBaseline;
    }
    set textBaseline(textBaseline) {
        if (this._textBaseline !== textBaseline) {
            this._textBaseline = textBaseline;
            this.styleID++;
        }
    }
    /**
     * Trim transparent borders
     *
     * @member {boolean}
     */
    get trim() {
        return this._trim;
    }
    set trim(trim) {
        if (this._trim !== trim) {
            this._trim = trim;
            this.styleID++;
        }
    }
    /**
     * How newlines and spaces should be handled.
     * Default is 'pre' (preserve, preserve).
     *
     *  value       | New lines     |   Spaces
     *  ---         | ---           |   ---
     * 'normal'     | Collapse      |   Collapse
     * 'pre'        | Preserve      |   Preserve
     * 'pre-line'   | Preserve      |   Collapse
     *
     * @member {string}
     */
    get whiteSpace() {
        return this._whiteSpace;
    }
    set whiteSpace(whiteSpace) {
        if (this._whiteSpace !== whiteSpace) {
            this._whiteSpace = whiteSpace;
            this.styleID++;
        }
    }
    /**
     * Indicates if word wrap should be used
     *
     * @member {boolean}
     */
    get wordWrap() {
        return this._wordWrap;
    }
    set wordWrap(wordWrap) {
        if (this._wordWrap !== wordWrap) {
            this._wordWrap = wordWrap;
            this.styleID++;
        }
    }
    /**
     * The width at which text will wrap, it needs wordWrap to be set to true
     *
     * @member {number}
     */
    get wordWrapWidth() {
        return this._wordWrapWidth;
    }
    set wordWrapWidth(wordWrapWidth) {
        if (this._wordWrapWidth !== wordWrapWidth) {
            this._wordWrapWidth = wordWrapWidth;
            this.styleID++;
        }
    }
    /**
     * Generates a font style string to use for `TextMetrics.measureFont()`.
     *
     * @return {string} Font style string, for passing to `TextMetrics.measureFont()`
     */
    toFontString() {
        // build canvas api font setting from individual components. Convert a numeric this.fontSize to px
        const fontSizeString = typeof this.fontSize === 'number' ? `${this.fontSize}px` : this.fontSize;
        // Clean-up fontFamily property by quoting each font name
        // this will support font names with spaces
        let fontFamilies = this.fontFamily;
        if (!Array.isArray(this.fontFamily)) {
            fontFamilies = this.fontFamily.split(',');
        }
        for (let i = fontFamilies.length - 1; i >= 0; i--) {
            // Trim any extra white-space
            let fontFamily = fontFamilies[i].trim();
            // Check if font already contains strings
            if (!/([\"\'])[^\'\"]+\1/.test(fontFamily) && genericFontFamilies.indexOf(fontFamily) < 0) {
                fontFamily = `"${fontFamily}"`;
            }
            fontFamilies[i] = fontFamily;
        }
        return `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${fontSizeString} ${fontFamilies.join(',')}`;
    }
}
function getSingleColor(color) {
    if (typeof color === 'number') {
        return StringUtil.convertToHtmlColor(color);
        // // todo
        // return color
    }
    else if (typeof color === 'string') {
        if (color.indexOf('0x') === 0) {
            color = color.replace('0x', '#');
        }
    }
    return color;
}
function getColor(color) {
    if (!Array.isArray(color)) {
        return getSingleColor(color);
    }
    else {
        for (let i = 0; i < color.length; ++i) {
            color[i] = getSingleColor(color[i]);
        }
        return color;
    }
}
function areArraysEqual(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        return false;
    }
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; ++i) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

class UITextField extends createjs.Text {
    constructor(owner) {
        super();
        this.$minHeightID = -1;
        this.UIOwner = owner;
        this.style = new TextStyle({});
        // this.mouseEnabled = false;
        // this.interactive = this.interactiveChildren = false;
        // this._texture.noFrame = false;
        // this._width = this._texture.frame.width;
        // this._height = this._texture.frame.height;
        // this.$minHeight = -1;
        // this._texture.on("update", this.updateFrame, this);
    }
    get minHeight() {
        return this.$minHeight;
    }
    applyStyle() {
        let canvas = Decls$1.GRoot.inst.applicationContext.canvas;
        this.font = this.style.toFontString();
        this.color = this.style.fill;
        let letterSpacing = this.style.letterSpacing;
        if (letterSpacing) {
            canvas.style.letterSpacing = `${letterSpacing}px`;
        }
        else {
            canvas.style.letterSpacing = `0px`;
        }
        let leading = this.style.leading;
        if (leading) {
            this.lineHeight = this.getMeasuredLineHeight() + leading;
        }
        else {
            this.lineHeight = this.getMeasuredLineHeight();
        }
        let strokeThickness = this.style.strokeThickness;
        if (strokeThickness) {
            if (!this.multiple) {
                this.multiple = new createjs.Text(this.text, this.font, this.color);
                this.UIOwner.parent.displayObject.addChild(this.multiple);
            }
            this.multiple.outline = strokeThickness;
            if (this.style.stroke != this.color) {
                this.multiple.color = this.style.stroke;
            }
            this.multiple.lineHeight = this.lineHeight;
            this.multiple.lineWidth = this.lineWidth;
        }
        let shadow = new createjs.Shadow(this.style.dropShadowColor, this.style.dropShadowOffsetX, this.style.dropShadowOffsetY, this.style.dropShadowBlur);
        this.shadow = shadow;
        let { x, y, width, height } = this;
        this.setBounds(x, y, width, height);
    }
    /**@internal */
    $updateMinHeight() {
        this.$minHeight = this.getMeasuredLineHeight();
    }
    // protected updateFrame(): void {
    //     GTimer.inst.callLater(this.internalUpdateFrame, this);
    // }
    // private internalUpdateFrame(): void {
    // if(this._texture) {
    //     let frm = this._texture.frame;
    //     this._height = Math.max(this._height, this.$minHeight);
    //     let w = frm.x + this._width, h = frm.y + this._height;
    //     if(w > this._texture.baseTexture.width)
    //         w = this._texture.baseTexture.width - frm.x;
    //     if(h > this._texture.baseTexture.height)
    //         h = this._texture.baseTexture.height - frm.y;
    //     frm.width = w / this.resolution;
    //     frm.height = h / this.resolution;
    //     this._texture.trim.width = frm.width;
    //     this._texture.trim.height = frm.height;
    //     let padding = this._style.trim ? 0 : this._style.padding;
    //     this._texture.trim.x = -padding;
    //     this._texture.trim.y = -padding;
    //     this._texture.frame = frm;
    // }
    // }
    //cancel scaling update
    // protected _onTextureUpdate(): void {
    // this._textureID = -1;
    // this._textureTrimmedID = -1;
    // }
    get width() {
        return this.getMetrics()['width'];
    }
    set width(v) {
        this.lineWidth = v;
        if (this.multiple) {
            this.multiple.lineWidth = v;
        }
    }
    get height() {
        return this.lineHeight;
    }
    set height(v) {
        this.lineHeight = v;
        if (this.multiple) {
            this.multiple.lineHeight = v;
        }
    }
    get textHeight() {
        return this.getMeasuredHeight();
    }
    set textHeight(v) { }
    get textWidth() {
        return this.getMeasuredWidth();
    }
    set content(v) {
        this.text = v;
        if (this.multiple) {
            this.multiple.text = v;
        }
    }
    get content() {
        return this.text;
    }
    updateMultiplePosition(x, y) {
        if (this.multiple) {
            this.multiple.x = x;
            this.multiple.y = y;
        }
    }
}

class TextMetrics {
    constructor(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties) {
        this.text = text;
        this.style = style;
        this.width = width;
        this.height = height;
        this.lines = lines;
        this.lineWidths = lineWidths;
        this.lineHeight = lineHeight;
        this.maxLineWidth = maxLineWidth;
        this.fontProperties = fontProperties;
    }
    static measureText(text, style, wordWrap, canvas = TextMetrics._canvas) {
        wordWrap = wordWrap === undefined || wordWrap === null ? style.wordWrap : wordWrap;
        const font = style.toFontString();
        const fontProperties = TextMetrics.measureFont(font);
        // fallback in case UA disallow canvas data extraction
        // (toDataURI, getImageData functions)
        if (fontProperties.fontSize === 0) {
            fontProperties.fontSize = style.fontSize;
            fontProperties.ascent = style.fontSize;
        }
        const context = canvas.getContext('2d');
        context.font = font;
        const outputText = wordWrap ? TextMetrics.wordWrap(text, style, canvas) : text;
        const lines = outputText.split(/(?:\r\n|\r|\n)/);
        const lineWidths = new Array(lines.length);
        let maxLineWidth = 0;
        for (let i = 0; i < lines.length; i++) {
            const lineWidth = context.measureText(lines[i]).width + (lines[i].length - 1) * style.letterSpacing;
            lineWidths[i] = lineWidth;
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
        }
        let width = maxLineWidth + style.strokeThickness;
        if (style.dropShadow) {
            width += style.dropShadowDistance;
        }
        const lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness;
        let height = Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness) +
            (lines.length - 1) * (lineHeight + style.leading);
        if (style.dropShadow) {
            height += style.dropShadowDistance;
        }
        return new TextMetrics(text, style, width, height, lines, lineWidths, lineHeight + style.leading, maxLineWidth, fontProperties);
    }
    static wordWrap(text, style, canvas = TextMetrics._canvas) {
        const context = canvas.getContext('2d');
        let width = 0;
        let line = '';
        let lines = '';
        const cache = Object.create(null);
        const { letterSpacing, whiteSpace } = style;
        // How to handle whitespaces
        const collapseSpaces = TextMetrics.collapseSpaces(whiteSpace);
        const collapseNewlines = TextMetrics.collapseNewlines(whiteSpace);
        // whether or not spaces may be added to the beginning of lines
        let canPrependSpaces = !collapseSpaces;
        const wordWrapWidth = style.wordWrapWidth + letterSpacing;
        // break text into words, spaces and newline chars
        const tokens = TextMetrics.tokenize(text);
        for (let i = 0; i < tokens.length; i++) {
            // get the word, space or newlineChar
            let token = tokens[i];
            // if word is a new line
            if (TextMetrics.isNewline(token)) {
                // keep the new line
                if (!collapseNewlines) {
                    lines += TextMetrics.addLine(line);
                    canPrependSpaces = !collapseSpaces;
                    line = '';
                    width = 0;
                    continue;
                }
                // if we should collapse new lines
                // we simply convert it into a space
                token = ' ';
            }
            // if we should collapse repeated whitespaces
            if (collapseSpaces) {
                // check both this and the last tokens for spaces
                const currIsBreakingSpace = TextMetrics.isBreakingSpace(token);
                const lastIsBreakingSpace = TextMetrics.isBreakingSpace(line[line.length - 1]);
                if (currIsBreakingSpace && lastIsBreakingSpace) {
                    continue;
                }
            }
            // get word width from cache if possible
            const tokenWidth = TextMetrics.getFromCache(token, letterSpacing, cache, context);
            // word is longer than desired bounds
            if (tokenWidth > wordWrapWidth) {
                // if we are not already at the beginning of a line
                if (line !== '') {
                    // start newlines for overflow words
                    lines += TextMetrics.addLine(line);
                    line = '';
                    width = 0;
                }
                // break large word over multiple lines
                if (TextMetrics.canBreakWords(token, style.breakWords)) {
                    // break word into characters
                    const characters = TextMetrics.wordWrapSplit(token);
                    // loop the characters
                    for (let j = 0; j < characters.length; j++) {
                        let char = characters[j];
                        let k = 1;
                        // we are not at the end of the token
                        while (characters[j + k]) {
                            const nextChar = characters[j + k];
                            const lastChar = char[char.length - 1];
                            // should not split chars
                            if (!TextMetrics.canBreakChars(lastChar, nextChar, token, j, style.breakWords)) {
                                // combine chars & move forward one
                                char += nextChar;
                            }
                            else {
                                break;
                            }
                            k++;
                        }
                        j += char.length - 1;
                        const characterWidth = TextMetrics.getFromCache(char, letterSpacing, cache, context);
                        if (characterWidth + width > wordWrapWidth) {
                            lines += TextMetrics.addLine(line);
                            canPrependSpaces = false;
                            line = '';
                            width = 0;
                        }
                        line += char;
                        width += characterWidth;
                    }
                }
                // run word out of the bounds
                else {
                    // if there are words in this line already
                    // finish that line and start a new one
                    if (line.length > 0) {
                        lines += TextMetrics.addLine(line);
                        line = '';
                        width = 0;
                    }
                    const isLastToken = i === tokens.length - 1;
                    // give it its own line if it's not the end
                    lines += TextMetrics.addLine(token, !isLastToken);
                    canPrependSpaces = false;
                    line = '';
                    width = 0;
                }
            }
            // word could fit
            else {
                // word won't fit because of existing words
                // start a new line
                if (tokenWidth + width > wordWrapWidth) {
                    // if its a space we don't want it
                    canPrependSpaces = false;
                    // add a new line
                    lines += TextMetrics.addLine(line);
                    // start a new line
                    line = '';
                    width = 0;
                }
                // don't add spaces to the beginning of lines
                if (line.length > 0 || !TextMetrics.isBreakingSpace(token) || canPrependSpaces) {
                    // add the word to the current line
                    line += token;
                    // update width counter
                    width += tokenWidth;
                }
            }
        }
        lines += TextMetrics.addLine(line, false);
        return lines;
    }
    static addLine(line, newLine = true) {
        line = TextMetrics.trimRight(line);
        line = newLine ? `${line}\n` : line;
        return line;
    }
    static getFromCache(key, letterSpacing, cache, context) {
        let width = cache[key];
        if (typeof width !== 'number') {
            const spacing = key.length * letterSpacing;
            width = context.measureText(key).width + spacing;
            cache[key] = width;
        }
        return width;
    }
    static collapseSpaces(whiteSpace) {
        return whiteSpace === 'normal' || whiteSpace === 'pre-line';
    }
    static collapseNewlines(whiteSpace) {
        return whiteSpace === 'normal';
    }
    static trimRight(text) {
        if (typeof text !== 'string') {
            return '';
        }
        for (let i = text.length - 1; i >= 0; i--) {
            const char = text[i];
            if (!TextMetrics.isBreakingSpace(char)) {
                break;
            }
            text = text.slice(0, -1);
        }
        return text;
    }
    static isNewline(char) {
        if (typeof char !== 'string') {
            return false;
        }
        return TextMetrics._newlines.indexOf(char.charCodeAt(0)) >= 0;
    }
    static isBreakingSpace(char, _nextChar) {
        if (typeof char !== 'string') {
            return false;
        }
        return TextMetrics._breakingSpaces.indexOf(char.charCodeAt(0)) >= 0;
    }
    static tokenize(text) {
        const tokens = [];
        let token = '';
        if (typeof text !== 'string') {
            return tokens;
        }
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];
            if (TextMetrics.isBreakingSpace(char, nextChar) || TextMetrics.isNewline(char)) {
                if (token !== '') {
                    tokens.push(token);
                    token = '';
                }
                tokens.push(char);
                continue;
            }
            token += char;
        }
        if (token !== '') {
            tokens.push(token);
        }
        return tokens;
    }
    static canBreakWords(_token, breakWords) {
        return breakWords;
    }
    static canBreakChars(_char, _nextChar, _token, _index, _breakWords) {
        return true;
    }
    static wordWrapSplit(token) {
        return token.split('');
    }
    static measureFont(font) {
        // as this method is used for preparing assets, don't recalculate things if we don't need to
        if (TextMetrics._fonts[font]) {
            return TextMetrics._fonts[font];
        }
        const properties = {
            ascent: 0,
            descent: 0,
            fontSize: 0
        };
        const canvas = TextMetrics._canvas;
        const context = TextMetrics._context;
        context.font = font;
        const metricsString = TextMetrics.METRICS_STRING + TextMetrics.BASELINE_SYMBOL;
        const width = Math.ceil(context.measureText(metricsString).width);
        let baseline = Math.ceil(context.measureText(TextMetrics.BASELINE_SYMBOL).width);
        const height = 2 * baseline;
        baseline = (baseline * TextMetrics.BASELINE_MULTIPLIER) | 0;
        canvas.width = width;
        canvas.height = height;
        context.fillStyle = '#f00';
        context.fillRect(0, 0, width, height);
        context.font = font;
        context.textBaseline = 'alphabetic';
        context.fillStyle = '#000';
        context.fillText(metricsString, 0, baseline);
        const imagedata = context.getImageData(0, 0, width, height).data;
        const pixels = imagedata.length;
        const line = width * 4;
        let i = 0;
        let idx = 0;
        let stop = false;
        // ascent. scan from top to bottom until we find a non red pixel
        for (i = 0; i < baseline; ++i) {
            for (let j = 0; j < line; j += 4) {
                if (imagedata[idx + j] !== 255) {
                    stop = true;
                    break;
                }
            }
            if (!stop) {
                idx += line;
            }
            else {
                break;
            }
        }
        properties.ascent = baseline - i;
        idx = pixels - line;
        stop = false;
        // descent. scan from bottom to top until we find a non red pixel
        for (i = height; i > baseline; --i) {
            for (let j = 0; j < line; j += 4) {
                if (imagedata[idx + j] !== 255) {
                    stop = true;
                    break;
                }
            }
            if (!stop) {
                idx -= line;
            }
            else {
                break;
            }
        }
        properties.descent = i - baseline;
        properties.fontSize = properties.ascent + properties.descent;
        TextMetrics._fonts[font] = properties;
        return properties;
    }
    /**
     * Clear font metrics in metrics cache.
     *
     * @static
     * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
     */
    static clearMetrics(font = '') {
        if (font) {
            delete TextMetrics._fonts[font];
        }
        else {
            TextMetrics._fonts = {};
        }
    }
}
const canvas = (() => {
    try {
        // OffscreenCanvas2D measureText can be up to 40% faster.
        const c = new OffscreenCanvas(0, 0);
        const context = c.getContext('2d');
        if (context && context.measureText) {
            return c;
        }
        return document.createElement('canvas');
    }
    catch (ex) {
        return document.createElement('canvas');
    }
})();
canvas.width = canvas.height = 10;
TextMetrics._canvas = canvas;
TextMetrics._context = canvas.getContext('2d');
TextMetrics._fonts = {};
TextMetrics.METRICS_STRING = '|ÉqÅ';
TextMetrics.BASELINE_SYMBOL = 'M';
TextMetrics.BASELINE_MULTIPLIER = 1.4;
TextMetrics._newlines = [
    0x000a,
    0x000d // carriage return
];
TextMetrics._breakingSpaces = [
    0x0009,
    0x0020,
    0x2000,
    0x2001,
    0x2002,
    0x2003,
    0x2004,
    0x2005,
    0x2006,
    0x2008,
    0x2009,
    0x200a,
    0x205f,
    0x3000 // ideographic space
];

class LineInfo {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.textHeight = 0;
        this.y = 0;
    }
    static get() {
        if (LineInfo.pool.length) {
            let ret = LineInfo.pool.pop();
            ret.width = 0;
            ret.height = 0;
            ret.textHeight = 0;
            ret.text = null;
            ret.y = 0;
            return ret;
        }
        else
            return new LineInfo();
    }
    static recycle(value) {
        LineInfo.pool.push(value);
    }
    static recycleMany(value) {
        if (value && value.length) {
            value.forEach(v => {
                LineInfo.pool.push(v);
            }, this);
        }
        value.length = 0;
    }
}
LineInfo.pool = [];
class GTextField extends GObject {
    constructor() {
        super();
        this.$verticalAlign = 0 /* Top */;
        this.$offset = new createjs.Point();
        this.$singleLine = true;
        this.$text = '';
        this.$textWidth = 0;
        this.$textHeight = 0;
        this.$style = new TextStyle({
            fontSize: 12,
            fontFamily: UIConfig.defaultFont,
            align: "left" /* Left */,
            leading: 3,
            fill: 0
        });
        this.$verticalAlign = 0 /* Top */;
        this.$text = '';
        this.$autoSize = 1 /* Both */;
        this.$widthAutoSize = true;
        this.$heightAutoSize = true;
        this.$bitmapPool = [];
        this.touchable = false; //base GTextField has no interaction
    }
    createDisplayObject() {
        this.$textField = new UITextField(this);
        this.setDisplayObject(this.$textField);
    }
    switchBitmapMode(val) {
        if (val && this.displayObject == this.$textField) {
            if (this.$btContainer == null)
                this.$btContainer = new UIContainer(this);
            this.switchDisplayObject(this.$btContainer);
        }
        else if (!val && this.displayObject == this.$btContainer)
            this.switchDisplayObject(this.$textField);
    }
    dispose() {
        GTimer.inst.remove(this.$render, this);
        this.$bitmapFont = null;
        this.$bitmapPool.length = 0;
        this.$bitmapPool = null;
        this.$style = null;
        super.dispose();
    }
    set text(value) {
        this.setText(value);
    }
    setText(value) {
        if (value == null)
            value = '';
        if (this.$text == value)
            return;
        this.$text = value;
        this.updateGear(6 /* Text */);
        if (this.parent && this.parent.$inProgressBuilding)
            this.renderNow();
        else
            this.render();
    }
    get text() {
        return this.getText();
    }
    getText() {
        return this.$text;
    }
    get color() {
        return this.getColor();
    }
    getColor() {
        return this.$color;
    }
    setColor(value) {
        if (this.$color != value) {
            this.$color = value;
            this.updateGear(4 /* Color */);
            this.$style.fill = this.$color;
            this.render();
        }
    }
    set color(value) {
        this.setColor(value);
    }
    get titleColor() {
        return this.color;
    }
    set titleColor(value) {
        this.color = value;
    }
    get lineHeight() {
        if (this.$style.lineHeight > 0)
            return this.$style.lineHeight;
        if (!this.$fontProperties)
            return +this.$style.fontSize + this.$style.strokeThickness; //rough value
        return this.$fontProperties.fontSize + this.$style.strokeThickness + this.$style.leading;
    }
    set lineHeight(lh) {
        this.$style.lineHeight = lh;
    }
    get font() {
        return this.$font || UIConfig.defaultFont;
    }
    set font(value) {
        if (this.$font != value) {
            this.$font = value;
            if (this.$font && StringUtil.startsWith(this.$font, 'ui://'))
                this.$bitmapFont = UIPackage.getBitmapFontByURL(this.$font);
            else
                this.$style.fontFamily = this.$font || UIConfig.defaultFont;
            this.render();
        }
    }
    get fontSize() {
        return +this.$style.fontSize;
    }
    set fontSize(value) {
        if (value <= 0)
            return;
        if (this.$style.fontSize != value) {
            this.$style.fontSize = value;
            this.render();
        }
    }
    get align() {
        return this.$style.align;
    }
    set align(value) {
        if (this.$style.align != value) {
            this.$style.align = value;
            this.render();
        }
    }
    get verticalAlign() {
        return this.$verticalAlign;
    }
    set verticalAlign(value) {
        if (this.$verticalAlign != value) {
            this.$verticalAlign = value;
            if (!this.$inProgressBuilding)
                this.layoutAlign();
        }
    }
    get leading() {
        return this.$style.leading;
    }
    set leading(value) {
        if (this.$style.leading != value) {
            this.$style.leading = value;
            this.render();
        }
    }
    get letterSpacing() {
        return this.$style.letterSpacing;
    }
    set letterSpacing(value) {
        if (this.$style.letterSpacing != value) {
            this.$style.letterSpacing = value;
            this.render();
        }
    }
    get underline() {
        return false; //TODO: not supported yet
    }
    set underline(value) {
        //TODO: not supported yet
    }
    get bold() {
        return this.$style.fontWeight == 'bold';
    }
    set bold(value) {
        let v = value === true ? 'bold' : 'normal';
        if (this.$style.fontWeight != v) {
            this.$style.fontWeight = v;
            this.render();
        }
    }
    get weight() {
        return this.$style.fontWeight;
    }
    set weight(v) {
        if (this.$style.fontWeight != v) {
            this.$style.fontWeight = v;
            this.render();
        }
    }
    get variant() {
        return this.$style.fontVariant;
    }
    set variant(v) {
        if (this.$style.fontVariant != v) {
            this.$style.fontVariant = v;
            this.render();
        }
    }
    get italic() {
        return this.$style.fontStyle == 'italic';
    }
    set italic(value) {
        let v = value === true ? 'italic' : 'normal';
        if (this.$style.fontStyle != v) {
            this.$style.fontStyle = v;
            this.render();
        }
    }
    get multipleLine() {
        return !this.$singleLine;
    }
    set multipleLine(value) {
        value = !value;
        if (this.$singleLine != value) {
            this.$singleLine = value;
            this.render();
        }
    }
    get stroke() {
        return +this.$style.strokeThickness;
    }
    set stroke(value) {
        if (this.$style.strokeThickness != value)
            this.$style.strokeThickness = value;
    }
    get strokeColor() {
        return this.$style.stroke;
    }
    set strokeColor(value) {
        if (this.$style.stroke != value)
            this.$style.stroke = value;
    }
    set autoSize(value) {
        if (this.$autoSize != value) {
            this.$autoSize = value;
            this.$widthAutoSize = value == 1 /* Both */ || value == 3 /* Shrink */;
            this.$heightAutoSize = value == 1 /* Both */ || value == 2 /* Height */;
            this.render();
        }
    }
    get autoSize() {
        return this.$autoSize;
    }
    get textWidth() {
        if (this.$requireRender)
            this.renderNow();
        return this.$textWidth;
    }
    get textHeight() {
        if (this.$requireRender)
            this.renderNow();
        return this.$textHeight;
    }
    ensureSizeCorrect() {
        if (this.$sizeDirty && this.$requireRender)
            this.renderNow();
    }
    render() {
        if (!this.$requireRender) {
            this.$requireRender = true;
            GTimer.inst.callLater(this.$render, this);
        }
        if (!this.$sizeDirty && (this.$widthAutoSize || this.$heightAutoSize)) {
            this.$sizeDirty = true;
            let evt = new createjs.Event("__sizeDelayChange" /* SIZE_DELAY_CHANGE */, true, false);
            this.dispatchEvent(evt, this);
        }
    }
    applyStyle() {
        this.$textField.style.stroke = this.$style.stroke;
        this.$textField.style.strokeThickness = this.$style.strokeThickness;
        this.$textField.style.fontStyle = this.$style.fontStyle;
        this.$textField.style.fontVariant = this.$style.fontVariant;
        this.$textField.style.fontWeight = this.$style.fontWeight;
        this.$textField.style.letterSpacing = this.$style.letterSpacing;
        this.$textField.style.align = this.$style.align;
        this.$textField.style.fontSize = this.$style.fontSize;
        this.$textField.style.fontFamily = this.$style.fontFamily;
        this.$textField.style.fill = this.$style.fill;
        this.$textField.style.dropShadowColor = this.$style.dropShadowColor;
        this.$textField.style.dropShadowOffsetX = this.$style.dropShadowOffsetX;
        this.$textField.style.dropShadowOffsetY = this.$style.dropShadowOffsetY;
        this.$textField.style.leading = this.$style.leading;
        this.$textField.applyStyle();
    }
    $render() {
        if (this.$requireRender)
            this.renderNow();
    }
    renderNow(updateBounds = true) {
        this.$requireRender = false;
        this.$sizeDirty = false;
        if (this.$bitmapFont != null) {
            this.renderWithBitmapFont(updateBounds);
            return;
        }
        this.switchBitmapMode(false);
        this.applyStyle();
        this.$textField.$updateMinHeight();
        let wordWrap = !this.$widthAutoSize && this.multipleLine;
        this.$textField.width = this.$textField.style.wordWrapWidth =
            wordWrap || this.autoSize == 0 /* None */ ? Math.ceil(this.width) : 10000;
        this.$textField.style.wordWrap = wordWrap;
        this.$textField.style.breakWords = wordWrap;
        this.$textField.content = this.$text; //trigger t.dirty = true
        this.$fontProperties = TextMetrics.measureFont(this.$style.toFontString());
        this.$textWidth = Math.ceil(this.$textField.textWidth);
        if (this.$textWidth > 0)
            this.$textWidth += GTextField.GUTTER_X * 2; //margin gap
        this.$textHeight = Math.ceil(this.$textField.textHeight);
        if (this.$textHeight > 0)
            this.$textHeight += GTextField.GUTTER_Y * 2; //margin gap
        let w = this.width, h = this.height;
        if (this.autoSize == 3 /* Shrink */) {
            this.shrinkTextField();
        }
        else {
            this.$textField.set({ scaleX: 1, scaleY: 1 });
            if (this.$widthAutoSize) {
                w = this.$textWidth;
                this.$textField.width = w;
            }
            if (this.$heightAutoSize) {
                h = this.$textHeight;
                if (this.$textField.height != this.$textHeight)
                    this.$textField.height = this.$textHeight;
            }
            else {
                h = this.height;
                if (this.$textHeight > h)
                    this.$textHeight = h;
            }
        }
        if (updateBounds) {
            this.$updatingSize = true;
            this.setSize(w, h);
            this.$updatingSize = false;
        }
        this.layoutAlign();
    }
    renderWithBitmapFont(updateBounds) {
        this.switchBitmapMode(true);
        /**
         * todo
         */
        this.$btContainer.children.forEach((c, i) => {
            this.$bitmapPool.push(this.$btContainer.getChildAt(i));
        }, this);
        this.$btContainer.removeAllChildren();
        if (!this.$lines)
            this.$lines = [];
        else
            LineInfo.recycleMany(this.$lines);
        let letterSpacing = this.letterSpacing;
        let lineSpacing = this.leading - 1;
        let rectWidth = this.width - GTextField.GUTTER_X * 2;
        let lineWidth = 0, lineHeight = 0, lineTextHeight = 0;
        let glyphWidth = 0, glyphHeight = 0;
        let wordChars = 0, wordStart = 0, wordEnd = 0;
        let lastLineHeight = 0;
        let lineBuffer = '';
        let lineY = GTextField.GUTTER_Y;
        let line;
        let wordWrap = !this.$widthAutoSize && this.multipleLine;
        let fontScale = this.$bitmapFont.resizable ? this.fontSize / this.$bitmapFont.size : 1;
        let glyph;
        this.$textWidth = 0;
        this.$textHeight = 0;
        let textLength = this.text.length;
        for (let offset = 0; offset < textLength; ++offset) {
            let ch = this.$text.charAt(offset);
            let cc = ch.charCodeAt(offset);
            if (ch == '\n') {
                lineBuffer += ch;
                line = LineInfo.get();
                line.width = lineWidth;
                if (lineTextHeight == 0) {
                    if (lastLineHeight == 0)
                        lastLineHeight = Math.ceil(this.fontSize * fontScale);
                    if (lineHeight == 0)
                        lineHeight = lastLineHeight;
                    lineTextHeight = lineHeight;
                }
                line.height = lineHeight;
                lastLineHeight = lineHeight;
                line.textHeight = lineTextHeight;
                line.text = lineBuffer;
                line.y = lineY;
                lineY += line.height + lineSpacing;
                if (line.width > this.$textWidth)
                    this.$textWidth = line.width;
                this.$lines.push(line);
                lineBuffer = '';
                lineWidth = 0;
                lineHeight = 0;
                lineTextHeight = 0;
                wordChars = 0;
                wordStart = 0;
                wordEnd = 0;
                continue;
            }
            if (cc > 256 || cc <= 32) {
                if (wordChars > 0)
                    wordEnd = lineWidth;
                wordChars = 0;
            }
            else {
                if (wordChars == 0)
                    wordStart = lineWidth;
                wordChars++;
            }
            if (ch == ' ') {
                glyphWidth = Math.ceil(this.fontSize / 2);
                glyphHeight = Math.ceil(this.fontSize);
            }
            else {
                glyph = this.$bitmapFont.glyphs[ch];
                if (glyph) {
                    glyphWidth = Math.ceil(glyph.advance * fontScale);
                    glyphHeight = Math.ceil(glyph.lineHeight * fontScale);
                }
                else if (ch == ' ') {
                    glyphWidth = Math.ceil((this.$bitmapFont.size * fontScale) / 2);
                    glyphHeight = Math.ceil(this.$bitmapFont.size * fontScale);
                }
                else {
                    glyphWidth = 0;
                    glyphHeight = 0;
                }
            }
            if (glyphHeight > lineTextHeight)
                lineTextHeight = glyphHeight;
            if (glyphHeight > lineHeight)
                lineHeight = glyphHeight;
            if (lineWidth != 0)
                lineWidth += letterSpacing;
            lineWidth += glyphWidth;
            if (!wordWrap || lineWidth <= rectWidth) {
                lineBuffer += ch;
            }
            else {
                line = LineInfo.get();
                line.height = lineHeight;
                line.textHeight = lineTextHeight;
                if (lineBuffer.length == 0) {
                    //the line cannt fit even a char
                    line.text = ch;
                }
                else if (wordChars > 0 && wordEnd > 0) {
                    //if word had broken, move it to new line
                    lineBuffer += ch;
                    let len = lineBuffer.length - wordChars;
                    line.text = StringUtil.trimRight(lineBuffer.substr(0, len));
                    line.width = wordEnd;
                    lineBuffer = lineBuffer.substr(len + 1);
                    lineWidth -= wordStart;
                }
                else {
                    line.text = lineBuffer;
                    line.width = lineWidth - (glyphWidth + letterSpacing);
                    lineBuffer = ch;
                    lineWidth = glyphWidth;
                    lineHeight = glyphHeight;
                    lineTextHeight = glyphHeight;
                }
                line.y = lineY;
                lineY += line.height + lineSpacing;
                if (line.width > this.$textWidth)
                    this.$textWidth = line.width;
                wordChars = 0;
                wordStart = 0;
                wordEnd = 0;
                this.$lines.push(line);
            }
        }
        if (lineBuffer.length > 0 ||
            (this.$lines.length > 0 &&
                StringUtil.endsWith(this.$lines[this.$lines.length - 1].text, '\n'))) {
            line = LineInfo.get();
            line.width = lineWidth;
            if (lineHeight == 0)
                lineHeight = lastLineHeight;
            if (lineTextHeight == 0)
                lineTextHeight = lineHeight;
            line.height = lineHeight;
            line.textHeight = lineTextHeight;
            line.text = lineBuffer;
            line.y = lineY;
            if (line.width > this.$textWidth)
                this.$textWidth = line.width;
            this.$lines.push(line);
        }
        if (this.$textWidth > 0)
            this.$textWidth += GTextField.GUTTER_X * 2;
        let count = this.$lines.length;
        if (count == 0) {
            this.$textHeight = 0;
        }
        else {
            line = this.$lines[this.$lines.length - 1];
            this.$textHeight = line.y + line.height + GTextField.GUTTER_Y;
        }
        let w, h = 0;
        if (this.$widthAutoSize) {
            if (this.$textWidth == 0)
                w = 0;
            else
                w = this.$textWidth;
        }
        else
            w = this.width;
        if (this.$heightAutoSize) {
            if (this.$textHeight == 0)
                h = 0;
            else
                h = this.$textHeight;
        }
        else
            h = this.height;
        if (updateBounds) {
            this.$updatingSize = true;
            this.setSize(w, h);
            this.$updatingSize = false;
        }
        if (w == 0 || h == 0)
            return;
        rectWidth = this.width - GTextField.GUTTER_X * 2;
        this.$lines.forEach(line => {
            let charX = GTextField.GUTTER_X;
            let lineIndent = 0;
            let charIndent = 0;
            if (this.align == "center" /* Center */)
                lineIndent = (rectWidth - line.width) / 2;
            else if (this.align == "right" /* Right */)
                lineIndent = rectWidth - line.width;
            else
                lineIndent = 0;
            textLength = line.text.length;
            for (let j = 0; j < textLength; j++) {
                let ch = line.text.charAt(j);
                glyph = this.$bitmapFont.glyphs[ch];
                if (glyph != null) {
                    charIndent = (line.height + line.textHeight) / 2 - Math.ceil(glyph.lineHeight * fontScale);
                    let bm;
                    if (this.$bitmapPool.length)
                        bm = this.$bitmapPool.pop();
                    else
                        bm = new Bitmap();
                    bm.x = charX + lineIndent + Math.ceil(glyph.offsetX * fontScale);
                    bm.y = line.y + charIndent + Math.ceil(glyph.offsetY * fontScale);
                    bm.texture = glyph.texture.image;
                    bm.textureRect = glyph.texture.rect;
                    let { x, y, width, height } = glyph;
                    bm.sourceRect = new createjs.Rectangle(x, y, width, height);
                    bm.set({ scaleX: fontScale, scaleY: fontScale });
                    bm.tint = this.$bitmapFont.colorable === true ? this.$color : '0xFFFFFF';
                    this.$btContainer.addChild(bm);
                    charX += letterSpacing + Math.ceil(glyph.advance * fontScale);
                }
                else if (ch == ' ') {
                    charX += letterSpacing + Math.ceil((this.$bitmapFont.size * fontScale) / 2);
                }
                else {
                    charX += letterSpacing;
                }
            }
        });
    }
    localToGlobal(ax = 0, ay = 0, resultPoint) {
        ax -= this.$offset.x;
        ay -= this.$offset.y;
        return super.localToGlobal(ax, ay, resultPoint);
    }
    globalToLocal(ax = 0, ay = 0, resultPoint) {
        let r = super.globalToLocal(ax, ay, resultPoint);
        r.x -= this.$offset.x;
        r.y -= this.$offset.y;
        return r;
    }
    handleSizeChanged() {
        if (this.$updatingSize)
            return;
        if (this.$bitmapFont != null) {
            if (!this.$widthAutoSize)
                this.render();
        }
        else {
            if (this.$inProgressBuilding) {
                this.$textField.width = this.width;
                this.$textField.height = this.height;
            }
            else {
                if (this.$autoSize == 3 /* Shrink */)
                    this.shrinkTextField();
                else {
                    if (!this.$widthAutoSize) {
                        if (!this.$heightAutoSize) {
                            this.$textField.width = this.width;
                            this.$textField.height = this.height;
                        }
                        else
                            this.$textField.width = this.width;
                    }
                }
            }
        }
        this.layoutAlign();
    }
    shrinkTextField() {
        let fitScale = Math.min(1, this.width / this.$textWidth);
        this.$textField.set({ scaleX: fitScale, scaleY: fitScale });
    }
    layoutAlign() {
        let tw = this.$textWidth, th = this.$textHeight;
        if (this.autoSize == 3 /* Shrink */) {
            tw *= this.displayObject.scaleX;
            th *= this.displayObject.scaleY;
        }
        if (this.$verticalAlign == 0 /* Top */ || th == 0)
            this.$offset.y = GTextField.GUTTER_Y;
        else {
            let dh = Math.max(0, this.height - th);
            if (this.$verticalAlign == 1 /* Middle */)
                this.$offset.y = dh * 0.5;
            else if (this.$verticalAlign == 2 /* Bottom */)
                this.$offset.y = dh;
        }
        let xPos = 0;
        switch (this.$style.align) {
            case 'center':
                xPos = (this.width - tw) * 0.5;
                break;
            case 'right':
                xPos = this.width - tw;
                break;
        }
        this.$offset.x = xPos;
        this.updatePosition();
    }
    updatePosition() {
        let x = Math.floor(this.x + this.$offset.x);
        let y = Math.floor(this.y + this.$offset.y);
        this.displayObject.set({ x, y });
        this.$textField.updateMultiplePosition(x, y);
    }
    handleXYChanged() {
        super.handleXYChanged();
        if (this.$displayObject)
            this.updatePosition();
    }
    setupBeforeAdd(xml) {
        super.setupBeforeAdd(xml);
        let str = xml.attributes.font;
        if (str)
            this.font = str;
        str = xml.attributes.vAlign;
        if (str)
            this.verticalAlign = ParseVertAlignType(str);
        str = xml.attributes.leading;
        if (str)
            this.$style.leading = parseInt(str);
        str = xml.attributes.letterSpacing;
        if (str)
            this.$style.letterSpacing = parseInt(str);
        str = xml.attributes.fontSize;
        if (str)
            this.$style.fontSize = parseInt(str);
        str = xml.attributes.color;
        if (str) {
            this.color = str;
        }
        str = xml.attributes.shadowColor;
        if (str) {
            this.$style.dropShadowColor = str;
        }
        let arr;
        str = xml.attributes.shadowOffset;
        if (str) {
            arr = str.split(',');
            if (arr.length > 1) {
                this.$style.dropShadowOffsetX = parseInt(arr[0]);
                this.$style.dropShadowOffsetY = parseInt(arr[1]);
            }
        }
        str = xml.attributes.align;
        if (str)
            this.align = ParseAlignType(str);
        str = xml.attributes.autoSize;
        if (str) {
            this.autoSize = ParseAutoSizeType(str);
            this.$widthAutoSize =
                this.$autoSize == 1 /* Both */ || this.$autoSize == 3 /* Shrink */;
            this.$heightAutoSize =
                this.$autoSize == 1 /* Both */ || this.$autoSize == 2 /* Height */;
        }
        this.underline = xml.attributes.underline == 'true';
        this.italic = xml.attributes.italic == 'true';
        this.bold = xml.attributes.bold == 'true';
        this.multipleLine = xml.attributes.singleLine != 'true';
        str = xml.attributes.strokeColor;
        if (str) {
            this.strokeColor = str;
            str = xml.attributes.strokeSize;
            if (str)
                this.stroke = parseInt(str);
            else
                this.stroke = 1;
        }
    }
    setupAfterAdd(xml) {
        super.setupAfterAdd(xml);
        let str = xml.attributes.text;
        if (str != null && str.length > 0)
            this.text = str;
        this.$sizeDirty = false;
    }
}
GTextField.GUTTER_X = 2;
GTextField.GUTTER_Y = 2;

//TOOD: impl
class GRichTextField extends GTextField {
    constructor() {
        super();
        // this.$textField.interactive = true;
        // this.$textField.interactiveChildren = false;
        this.on("__linkClick" /* LinkClick */, this.$clickLink, this);
    }
    set ubbEnabled(value) {
        if (this.$ubbEnabled != value) {
            this.$ubbEnabled = value;
            this.render();
        }
    }
    get ubbEnabled() {
        return this.$ubbEnabled;
    }
    setupBeforeAdd(xml) {
        super.setupBeforeAdd(xml);
        this.$ubbEnabled = xml.attributes.ubb == 'true';
    }
    set textFlow(flow) {
        this.$textFlow = flow;
        this.render();
    }
    set text(value) {
        this.$text = value;
        if (this.$text == null)
            this.$text = '';
        this.$textField.width = this.width;
        // if(this.$ubbEnabled)
        // this.textFlow = StringUtil.parseUBB(this.$text);   //TODO: parser impl
        this.updateGear(6 /* Text */);
        this.render();
    }
    $clickLink(block) {
        let event = new createjs.Event("__linkClick" /* LinkClick */, true, false);
        event.data = block.text;
        this.dispatchEvent(event, this);
    }
    dispose() {
        this.off("__linkClick" /* LinkClick */, this.$clickLink);
        super.dispose();
    }
}

class InputElement extends createjs.EventDispatcher {
    constructor(tf) {
        super();
        this.$requestToShow = false;
        //private $requestToHide:boolean = false;
        this.inputElement = null;
        this.inputDiv = null;
        this.$scaleX = 0;
        this.$scaleY = 0;
        this.textValue = '';
        this.colorValue = '0xffffff';
        this.$attrsCache = {};
        this.$textfield = tf;
    }
    /**@internal */
    $addToStage() {
        this.htmlInput = HTMLInput.inst; //take multiple canvas on webpage into account?
    }
    initElement() {
        let point = this.$textfield.localToGlobal(0, 0);
        let x = point.x;
        let y = point.y;
        let scaleX = this.htmlInput.$scaleX;
        let scaleY = this.htmlInput.$scaleY;
        if (!this.$textfield.multipleLine)
            this.inputElement.style.top = -this.$textfield.leading * scaleY + 'px';
        this.inputDiv.style.top = (y + 1) * scaleY + 'px';
        this.inputDiv.style.left = x * scaleX + 'px';
        let node = this.$textfield;
        let cX = 1;
        let cY = 1;
        let rotation = 0;
        while (node.parent) {
            cX *= node.scaleX;
            cY *= node.scaleY;
            rotation += node.rotation;
            node = node.parent;
        }
        let style = this.inputDiv.style;
        style.transform = style.webkitTransform = style.msTransform = style.mozTransform = style.oTransform =
            'rotate(' + rotation + 'deg)';
        this.$scaleX = scaleX * cX;
        this.$scaleY = scaleY * cY;
    }
    get textField() {
        return this.$textfield;
    }
    /**@internal */
    $show() {
        if (!this.htmlInput.isCurrentInput(this)) {
            this.inputElement = this.htmlInput.requestInput(this);
            if (!this.$textfield.multipleLine)
                this.inputElement.type = this.$textfield.type;
            for (let key in this.$attrsCache)
                this.inputElement.setAttribute(key, this.$attrsCache[key]);
            this.inputDiv = this.htmlInput.$wrapper;
        }
        else
            this.inputElement.onblur = null;
        this.htmlInput.$requestToShow = true;
        this.$requestToShow = true;
        this.initElement();
    }
    $hide() { }
    onBlurHandler() {
        this.htmlInput.clearInputElement();
        this.htmlInput.clearAttributes(this.$attrsCache);
        window.scrollTo(0, 0);
    }
    get text() {
        if (!this.textValue)
            this.textValue = '';
        return this.textValue;
    }
    set text(value) {
        this.textValue = value;
        if (this.inputElement)
            this.inputElement.value = this.textValue;
    }
    setColor(value) {
        this.colorValue = value;
        if (this.inputElement)
            this.setElementStyle('color', StringUtil.HEX2RGB(this.colorValue));
    }
    /**@internal */
    $onBlur() {
        // this.dispatchEvent("updateText");
    }
    onInputHandler() {
        window.setTimeout(() => {
            if (this.inputElement && this.inputElement.selectionStart == this.inputElement.selectionEnd) {
                this.textValue = this.inputElement.value;
                this.dispatchEvent('updateText');
            }
        }, 0);
    }
    setAreaHeight() {
        let tf = this.$textfield;
        if (tf.multipleLine) {
            let textheight = tf.textHeight;
            if (tf.height <= tf.fontSize) {
                this.setElementStyle('height', tf.fontSize * this.$scaleY + 'px');
                this.setElementStyle('padding', '0px');
                this.setElementStyle('lineHeight', tf.lineHeight * this.$scaleY + 'px');
            }
            else if (tf.height < textheight) {
                this.setElementStyle('height', tf.height * this.$scaleY + 'px');
                this.setElementStyle('padding', '0px');
                this.setElementStyle('lineHeight', tf.lineHeight * this.$scaleY + 'px');
            }
            else {
                this.setElementStyle('height', (textheight + tf.leading) * this.$scaleY + 'px');
                let rap = (tf.height - textheight) * this.$scaleY;
                let valign = this.getVAlignFactor(tf);
                let top = rap * valign;
                let bottom = rap - top;
                this.setElementStyle('padding', top + 'px 0px ' + bottom + 'px 0px');
                this.setElementStyle('lineHeight', tf.lineHeight * this.$scaleY + 'px');
            }
        }
    }
    getVAlignFactor(textfield) {
        let vao = 0;
        switch (textfield.verticalAlign) {
            case 0 /* Top */:
                break;
            case 1 /* Middle */:
                vao = 0.5;
                break;
            case 2 /* Bottom */:
                vao = 1;
                break;
        }
        return vao;
    }
    onClickHandler(e) {
        if (this.$requestToShow) {
            //e.stopImmediatePropagation();
            this.$requestToShow = false;
            this.inputElement.value = this.text;
            if (this.inputElement.onblur == null)
                this.inputElement.onblur = Binder.create(this.onBlurHandler, this);
            this.resetInput();
            if (this.$textfield.maxLength > 0)
                this.inputElement.setAttribute('maxlength', String(this.$textfield.maxLength));
            else
                this.inputElement.removeAttribute('maxlength');
            this.inputElement.selectionStart = this.inputElement.value.length;
            this.inputElement.selectionEnd = this.inputElement.value.length;
            this.inputElement.focus();
            let evt = new createjs.Event("__focusChanged" /* CHANGED */, true, false);
            evt.data = 'focus';
            this.dispatchEvent(evt);
        }
    }
    onDisconnect() {
        this.inputElement = null;
        let evt = new createjs.Event("__focusChanged" /* CHANGED */, true, false);
        evt.data = 'blur';
        this.dispatchEvent(evt);
    }
    setElementStyle(style, value) {
        if (value == null)
            return;
        if (this.inputElement) {
            let ss = this.inputElement.style;
            ss[style] = value;
        }
    }
    setAttribute(name, value) {
        if (name == null || value == null)
            return;
        this.$attrsCache[name] = value;
    }
    getAttribute(name) {
        return this.$attrsCache[name];
    }
    /**@internal */
    $removeFromStage() {
        if (this.inputElement)
            this.htmlInput.disconnect(this);
    }
    resetInput() {
        if (this.inputElement) {
            let textfield = this.$textfield;
            this.setElementStyle('fontFamily', textfield.font);
            this.setElementStyle('fontStyle', textfield.italic ? 'italic' : 'normal');
            this.setElementStyle('fontWeight', textfield.bold ? 'bold' : 'normal');
            this.setElementStyle('textAlign', textfield.align);
            this.setElementStyle('fontSize', textfield.fontSize * this.$scaleY + 'px');
            this.setElementStyle('color', StringUtil.convertToHtmlColor(+textfield.color));
            this.setElementStyle('width', textfield.width * this.$scaleX + 'px'); //take 'maxWidth' into account
            let va = 'middle', vao = 0;
            switch (textfield.verticalAlign) {
                case 0 /* Top */:
                    va = 'top';
                    break;
                case 1 /* Middle */:
                    va = 'middle';
                    vao = 0.5;
                    break;
                case 2 /* Bottom */:
                    va = 'bottom';
                    vao = 1;
                    break;
            }
            this.setElementStyle('verticalAlign', va);
            if (textfield.multipleLine)
                this.setAreaHeight();
            else {
                this.setElementStyle('lineHeight', textfield.lineHeight * this.$scaleY + 'px');
                if (textfield.height < textfield.fontSize) {
                    this.setElementStyle('height', textfield.fontSize * this.$scaleY + 'px');
                    this.setElementStyle('padding', '0px 0px ' + textfield.fontSize * 0.5 * this.$scaleX + 'px 0px');
                }
                else {
                    this.setElementStyle('height', textfield.fontSize * this.$scaleY + 'px');
                    let rap = (textfield.height - textfield.fontSize) * this.$scaleY;
                    let top = rap * vao;
                    let bottom = rap - top, fsy = textfield.fontSize * 0.5 * this.$scaleY;
                    if (bottom < fsy)
                        bottom = fsy;
                    this.setElementStyle('padding', top + 'px 0px ' + bottom + 'px 0px');
                }
            }
            this.inputDiv.style.clip =
                'rect(0px ' +
                    textfield.width * this.$scaleX +
                    'px ' +
                    textfield.height * this.$scaleY +
                    'px 0px)';
            this.inputDiv.style.height = textfield.height * this.$scaleY + 'px';
            this.inputDiv.style.width = textfield.width * this.$scaleX + 'px'; //take 'maxWidth' into account
        }
    }
}

class InputDelegate {
    constructor(tf) {
        this.$inited = false;
        this.$restrictString = null;
        this.$restrictRegex = null;
        this.$focused = false;
        this.$textField = tf;
        this.$input = new InputElement(tf);
    }
    initialize() {
        if (this.$inited)
            return;
        this.$input.$addToStage();
        this.$input.on('updateText', this.updateText, this);
        this.$input.on("__focusChanged" /* CHANGED */, this.focusHandler, this);
        this.$textField.on(InteractiveEvents.Down, this.textFieldDownHandler, this);
        this.$inited = true;
    }
    textFieldDownHandler() {
        this.$onFocus();
    }
    destroy() {
        if (!this.$inited)
            return;
        this.$input.$removeFromStage();
        this.$textField.off(InteractiveEvents.Down, this.textFieldDownHandler);
        GRoot.inst.off(InteractiveEvents.Down, this.onStageDown);
        this.$input.off('updateText', this.updateText);
        this.$input.off("__focusChanged" /* CHANGED */, this.focusHandler);
        this.$inited = false;
    }
    get text() {
        return this.$input.text;
    }
    set text(v) {
        this.$input.text = v;
    }
    setColor(v) {
        return this.$input.setColor(v);
    }
    updateText() {
        let textValue = this.$input.text;
        let isChanged = false;
        if (this.$restrictRegex != null) {
            let result = textValue.match(this.$restrictRegex);
            if (result)
                textValue = result.join('');
            else
                textValue = '';
            isChanged = true;
        }
        if (isChanged && this.$input.text != textValue)
            this.$input.text = textValue;
        this.$textField.text = this.$input.text;
        let evt = new createjs.Event("__textChange" /* Change */, true, false);
        evt.data = { textField: this.$textField };
        this.$textField.dispatchEvent(evt, this);
    }
    onStageDown(e) {
        let target = GObject.castFromNativeObject(e.currentTarget);
        if (target != this.$textField)
            this.$input.$hide();
    }
    focusHandler(evt) {
        let { data } = evt;
        if (data == 'focus') {
            if (!this.$focused) {
                this.$focused = true;
                this.$textField.$isTyping = true;
                this.$textField.alpha = 0.01;
                this.$textField.dispatchEvent("__focusChanged" /* CHANGED */, 'focus');
                this.$textField.dispatchEvent("__textFocusIn" /* FocusIn */, this.$textField);
            }
        }
        else if (data == 'blur') {
            if (this.$focused) {
                this.$focused = false;
                GRoot.inst.off(InteractiveEvents.Down, this.onStageDown);
                this.$textField.$isTyping = false;
                this.$textField.alpha = 1;
                this.$input.$onBlur();
                this.$textField.dispatchEvent("__focusChanged" /* CHANGED */, 'blur');
                this.$textField.dispatchEvent("__textFocusOut" /* FocusOut */, this.$textField);
            }
        }
    }
    get isFocused() {
        return this.$focused;
    }
    /**@internal */
    $getProperty(name) {
        return (this.$inited && this.$input.getAttribute(name)) || null;
    }
    /**@internal */
    $setProperty(name, value) {
        if (!this.$inited)
            return;
        this.$input.setAttribute(name, value);
    }
    get $restrict() {
        return this.$restrictString;
    }
    set $restrict(v) {
        this.$restrictString = v;
        if (this.$restrictString != null && this.$restrictString.length > 0)
            this.$restrictRegex = new RegExp(this.$restrictString);
        else
            this.$restrictRegex = null;
    }
    get type() {
        return this.$type;
    }
    set type(v) {
        if (v != this.$type)
            this.$type = v;
    }
    tryHideInput() {
        if (!this.$textField.visible && this.$input)
            this.$input.$removeFromStage();
    }
    /**@internal */
    $updateProperties() {
        if (this.isFocused) {
            this.$input.resetInput();
            this.tryHideInput();
            return;
        }
        this.$input.text = this.$textField.text;
        this.$input.resetInput();
        this.tryHideInput();
    }
    /**@internal */
    $onFocus() {
        if (!this.$textField.visible || this.$focused)
            return;
        GRoot.inst.off(InteractiveEvents.Down, this.onStageDown);
        GTimer.inst.callLater(() => {
            GRoot.inst.on(InteractiveEvents.Down, this.onStageDown, this);
        }, this);
        this.$input.$show();
    }
}

class GTextInput extends GTextField {
    constructor() {
        super();
        this.$util = null;
        /**@internal */
        this.$isTyping = false;
        this.focusable = true;
        this.editable = true; //init
        this.type = "text" /* TEXT */;
        this.on('removed', this.removed, this);
        this.on('added', this.added, this);
        this.$util.initialize();
    }
    createDisplayObject() {
        super.createDisplayObject();
        this.$hitArea = new createjs.Shape();
        this.$hitArea.graphics.beginFill('#000').drawRect(0, 0, this.$width, this.$height);
        this.$displayObject.hitArea = this.$hitArea;
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        this.$hitArea.graphics.drawRect(0, 0, this.$width, this.$height);
        this.$displayObject.hitArea = this.$hitArea;
    }
    removed(disp) {
        if (this.$util)
            this.$util.destroy();
    }
    added(disp) {
        if (this.$util)
            this.$util.initialize();
    }
    requestFocus() {
        //tab or call actively
        Decls$1.GRoot.inst.focus = this;
        this.$util.$onFocus();
    }
    get editable() {
        return this.$editable;
    }
    set editable(v) {
        if (v != this.$editable) {
            this.$editable = v;
            if (this.$editable) {
                if (!this.$util)
                    this.$util = new InputDelegate(this);
                this.$util.initialize();
            }
            else {
                if (this.$util)
                    this.$util.destroy();
            }
            this.touchable = this.$editable;
        }
    }
    changeToPassText(text) {
        let passText = '';
        for (let i = 0, num = text.length; i < num; i++) {
            switch (text.charAt(i)) {
                case '\n':
                    passText += '\n';
                    break;
                case '\r':
                    break;
                default:
                    passText += '*';
            }
        }
        return passText;
    }
    getText() {
        return this.$util.text;
    }
    setText(value) {
        if (value == null)
            value = '';
        if (this.$text == value)
            return;
        this.$util.text = value;
        super.setText(value);
    }
    setColor(value) {
        super.setColor(value);
        this.$util.setColor(value);
    }
    get promptText() {
        return this.$util.$getProperty('placeholder');
    }
    set promptText(v) {
        if (v == null)
            v = '';
        this.$util.$setProperty('placeholder', v);
    }
    get maxLength() {
        return parseInt(this.$util.$getProperty('maxlength')) || 0;
    }
    set maxLength(v) {
        this.$util.$setProperty('maxlength', String(v));
    }
    get restrict() {
        return this.$util.$restrict;
    }
    set restrict(v) {
        this.$util.$restrict = v;
    }
    get password() {
        return this.type == "password" /* PASSWORD */;
    }
    set password(v) {
        this.type = "password" /* PASSWORD */;
    }
    get type() {
        return this.$util.type;
    }
    set type(t) {
        this.$util.type = t;
    }
    dispose() {
        super.dispose();
        this.off('removed', this.removed);
        this.off('added', this.added);
        this.$util.destroy();
        this.$util = null;
    }
    renderNow(updateBounds = true) {
        this.$requireRender = false;
        this.$sizeDirty = false;
        this.$util.$updateProperties();
        if (this.$isTyping)
            this.decorateInputbox();
        let origText = this.$text;
        if (this.type == "password" /* PASSWORD */)
            this.$text = this.changeToPassText(this.$text);
        super.renderNow(updateBounds);
        this.$text = origText;
    }
    decorateInputbox() {
        //draw underlines?
    }
    setupBeforeAdd(xml) {
        super.setupBeforeAdd(xml);
        //this.promptText = xml.attributes.prompt;  //this will be available once UBB has implemented.
        var str = xml.attributes.maxLength;
        if (str != null)
            this.maxLength = parseInt(str);
        str = xml.attributes.restrict;
        if (str != null)
            this.restrict = str;
        str = xml.attributes.password;
        if (str == 'true')
            this.password = true;
        else {
            str = xml.attributes.keyboardType;
            if (str == '4')
                this.type = "number" /* NUMBER */;
            else if (str == '3')
                this.type = "url" /* URL */;
            else if (str == '5')
                this.type = "tel" /* TEL */;
            else if (str == '6')
                this.type = "email" /* EMAIL */;
        }
    }
}

class Recycler {
    constructor() {
        this.$count = 0;
        this.$pool = {};
    }
    get count() {
        return this.$count;
    }
    clear() {
        for (let key in this.$pool) {
            let arr = this.$pool[key];
            if (arr) {
                arr.length = 0;
                arr = null;
            }
        }
        this.$pool = {};
        this.$count = 0;
    }
    get(id) {
        let arr = this.$pool[id];
        if (arr == null) {
            arr = [];
            this.$pool[id] = arr;
        }
        if (arr.length) {
            this.$count--;
            return arr.shift();
        }
        return this.createObject(id);
    }
    recycle(id, obj) {
        if (!id)
            return;
        let arr = this.$pool[id];
        if (arr == null) {
            arr = [];
            this.$pool[id] = arr;
        }
        this.$count++;
        arr.push(obj);
    }
}

class GObjectRecycler extends Recycler {
    constructor() {
        super();
    }
    clear() {
        for (let key in this.$pool) {
            let arr = this.$pool[key];
            if (arr) {
                arr.forEach((v) => {
                    v.dispose();
                });
            }
        }
        super.clear();
    }
    createObject(id) {
        return UIPackage.createObjectFromURL(id); //id = url
    }
}

class GLoader extends GObject {
    constructor() {
        super();
        this.$frame = 0;
        this.$color = '#fff';
        this.$contentSourceWidth = 0;
        this.$contentSourceHeight = 0;
        this.$contentWidth = 0;
        this.$contentHeight = 0;
        this.$loadingTexture = null;
        this.$playing = true;
        this.$url = '';
        this.$fill = 0 /* None */;
        this.$align = "left" /* Left */;
        this.$verticalAlign = 0 /* Top */;
        this.$showErrorSign = true;
        this.$color = '#fff';
    }
    createDisplayObject() {
        this.$container = new UIContainer(this);
        this.$hitArea = new createjs.Shape();
        this.$hitArea.graphics.beginFill('#000').drawRect(0, 0, 0, 0);
        this.$container.hitArea = this.$hitArea;
        this.setDisplayObject(this.$container);
        // this.$container.mouseChildren = false
    }
    dispose() {
        this.clearContent();
        super.dispose();
    }
    get url() {
        return this.$url;
    }
    set url(value) {
        if (this.$url == value)
            return;
        this.$url = value;
        this.loadContent();
        this.updateGear(7 /* Icon */);
    }
    get icon() {
        return this.$url;
    }
    set icon(value) {
        this.url = value;
    }
    get align() {
        return this.$align;
    }
    set align(value) {
        if (this.$align != value) {
            this.$align = value;
            this.updateLayout();
        }
    }
    get verticalAlign() {
        return this.$verticalAlign;
    }
    set verticalAlign(value) {
        if (this.$verticalAlign != value) {
            this.$verticalAlign = value;
            this.updateLayout();
        }
    }
    get fill() {
        return this.$fill;
    }
    set fill(value) {
        if (this.$fill != value) {
            this.$fill = value;
            this.updateLayout();
        }
    }
    get autoSize() {
        return this.$autoSize;
    }
    set autoSize(value) {
        if (this.$autoSize != value) {
            this.$autoSize = value;
            this.updateLayout();
        }
    }
    get playing() {
        return this.$playing;
    }
    set playing(value) {
        if (this.$playing != value) {
            this.$playing = value;
            if (this.$content instanceof MovieClip)
                this.$content.playing = value;
            this.updateGear(5 /* Animation */);
        }
    }
    get frame() {
        return this.$frame;
    }
    set frame(value) {
        if (this.$frame != value) {
            this.$frame = value;
            if (this.$content instanceof MovieClip)
                this.$content.currentFrame = value;
            this.updateGear(5 /* Animation */);
        }
    }
    get color() {
        return this.$color;
    }
    set color(value) {
        if (this.$color != value) {
            this.$color = value;
            this.updateGear(4 /* Color */);
            this.applyColor();
        }
    }
    applyColor() {
        if (this.$content)
            this.$content.tint = this.$color;
    }
    get showErrorSign() {
        return this.$showErrorSign;
    }
    set showErrorSign(value) {
        this.$showErrorSign = value;
    }
    get content() {
        return this.$content;
    }
    get texture() {
        if (this.$content instanceof UIImage)
            return this.$content.texture;
        else
            return null;
    }
    set texture(value) {
        this.url = null;
        this.switchToMovieMode(false);
        if (this.$content instanceof UIImage)
            this.$content.texture = value;
        if (value) {
            this.$contentSourceWidth = value.width;
            this.$contentSourceHeight = value.height;
        }
        else
            this.$contentSourceWidth = this.$contentHeight = 0;
        this.updateLayout();
    }
    loadContent() {
        this.clearContent();
        if (!this.$url)
            return;
        if (StringUtil.startsWith(this.$url, 'ui://'))
            this.loadFromPackage(this.$url);
        else
            this.loadExternal();
    }
    loadFromPackage(itemURL) {
        this.$contentItem = UIPackage.getItemByURL(itemURL);
        if (this.$contentItem) {
            this.$contentItem.load();
            if (this.$contentItem.type == 0 /* Image */) {
                if (this.$contentItem.texture == null) {
                    this.setErrorState();
                }
                else {
                    this.switchToMovieMode(false);
                    this.$content.$initDisp(this.$contentItem);
                    this.$contentSourceWidth = this.$contentItem.width;
                    this.$contentSourceHeight = this.$contentItem.height;
                    this.updateLayout();
                }
            }
            else if (this.$contentItem.type == 2 /* MovieClip */) {
                this.switchToMovieMode(true);
                this.$contentSourceWidth = this.$contentItem.width;
                this.$contentSourceHeight = this.$contentItem.height;
                let mc = this.$content;
                mc.interval = this.$contentItem.interval;
                mc.swing = this.$contentItem.swing;
                mc.repeatDelay = this.$contentItem.repeatDelay;
                mc.frames = this.$contentItem.frames;
                mc.boundsRect = new createjs.Rectangle(0, 0, this.$contentSourceWidth, this.$contentSourceHeight);
                this.updateLayout();
            }
            else
                this.setErrorState();
        }
        else
            this.setErrorState();
    }
    switchToMovieMode(value) {
        this.$container.removeAllChildren();
        if (value) {
            if (!(this.$content instanceof MovieClip))
                this.$content = new MovieClip(this);
        }
        else {
            if (!(this.$content instanceof UIImage))
                this.$content = new UIImage(null);
        }
        this.$container.addChild(this.$content);
    }
    /**overwrite this method if you need to load resources by your own way*/
    loadExternal() {
        // let texture = Bitmap.fromImage(this.$url, true);
        let texture = new Bitmap();
        this.$loadingTexture = texture;
        //TODO: Texture does not have error event... monitor error event on baseTexture will casue cross-error-event problem.
        // texture.once("update", () => {
        //     if (!texture.width || !texture.height)
        //         this.$loadResCompleted(null);
        //     else
        //         this.$loadResCompleted(texture);
        // });
    }
    /**free the resource you loaded */
    freeExternal(texture) {
        // Bitmap.removeFromCache(texture);
        // texture.destroy(texture.baseTexture != null);
    }
    $loadResCompleted(res) {
        if (res)
            this.onExternalLoadSuccess(res);
        else {
            this.onExternalLoadFailed();
            // this.$loadingTexture.removeAllListeners();
            this.freeExternal(this.$loadingTexture);
            this.$loadingTexture = null;
        }
        this.$loadingTexture = null;
    }
    /**content loaded */
    onExternalLoadSuccess(texture) {
        this.$container.removeAllChildren();
        if (!this.$content || !(this.$content instanceof UIImage)) {
            this.$content = new UIImage(null);
            this.$content.$initDisp();
            this.$container.addChild(this.$content);
        }
        else
            this.$container.addChild(this.$content);
        //baseTexture loaded, so update frame info  // todo
        this.$content.texture = texture.texture;
        this.$contentSourceWidth = texture.sourceRect.width;
        this.$contentSourceHeight = texture.sourceRect.height;
        this.updateLayout();
    }
    onExternalLoadFailed() {
        this.setErrorState();
    }
    setErrorState() {
        if (!this.$showErrorSign)
            return;
        if (this.$errorSign == null) {
            if (UIConfig.loaderErrorSign) {
                this.$errorSign = GLoader.$errorSignPool.get(UIConfig.loaderErrorSign);
            }
        }
        if (this.$errorSign) {
            this.$errorSign.width = this.width;
            this.$errorSign.height = this.height;
            this.$container.addChild(this.$errorSign.displayObject);
        }
    }
    clearErrorState() {
        if (this.$errorSign) {
            this.$container.removeChild(this.$errorSign.displayObject);
            GLoader.$errorSignPool.recycle(this.$errorSign.resourceURL, this.$errorSign);
            this.$errorSign = null;
        }
    }
    updateLayout() {
        if (this.$content == null) {
            if (this.$autoSize) {
                this.$updatingLayout = true;
                this.setSize(50, 30);
                this.$updatingLayout = false;
            }
            return;
        }
        this.$content.set({ x: 0, y: 0 });
        this.$content.set({ scaleX: 1, scaleY: 1 });
        this.$contentWidth = this.$contentSourceWidth;
        this.$contentHeight = this.$contentSourceHeight;
        if (this.$autoSize) {
            this.$updatingLayout = true;
            if (this.$contentWidth == 0)
                this.$contentWidth = 50;
            if (this.$contentHeight == 0)
                this.$contentHeight = 30;
            this.setSize(this.$contentWidth, this.$contentHeight);
            this.$updatingLayout = false;
        }
        else {
            let sx = 1, sy = 1;
            if (this.$fill != 0 /* None */) {
                sx = this.width / this.$contentSourceWidth;
                sy = this.height / this.$contentSourceHeight;
                if (sx != 1 || sy != 1) {
                    if (this.$fill == 2 /* ScaleMatchHeight */)
                        sx = sy;
                    else if (this.$fill == 3 /* ScaleMatchWidth */)
                        sy = sx;
                    else if (this.$fill == 1 /* Scale */) {
                        if (sx > sy)
                            sx = sy;
                        else
                            sy = sx;
                    }
                    else if (this.$fill == 5 /* ScaleNoBorder */) {
                        if (sx > sy)
                            sy = sx;
                        else
                            sx = sy;
                    }
                    this.$contentWidth = this.$contentSourceWidth * sx;
                    this.$contentHeight = this.$contentSourceHeight * sy;
                }
            }
            if (this.$content instanceof UIImage) {
                this.$content.width = this.$contentWidth;
                this.$content.height = this.$contentHeight;
            }
            else
                this.$content.set({ scaleX: sx, scaleY: sy });
            if (this.$align == "center" /* Center */)
                this.$content.x = Math.floor((this.width - this.$contentWidth) / 2);
            else if (this.$align == "right" /* Right */)
                this.$content.x = this.width - this.$contentWidth;
            if (this.$verticalAlign == 1 /* Middle */)
                this.$content.y = Math.floor((this.height - this.$contentHeight) / 2);
            else if (this.$verticalAlign == 2 /* Bottom */)
                this.$content.y = this.height - this.$contentHeight;
        }
    }
    clearContent() {
        this.clearErrorState();
        if (this.$content && this.$content.parent)
            this.$container.removeChild(this.$content);
        if (this.$loadingTexture) {
            // this.$loadingTexture.removeAllListeners();// todo
            this.freeExternal(this.$loadingTexture);
            this.$loadingTexture = null;
        }
        // if (this.$contentItem == null && this.$content instanceof UIImage)
        //     this.freeExternal(this.$content.texture); // todo
        this.$content && this.$content.destroy();
        this.$content = null;
        this.$contentItem = null;
    }
    handleSizeChanged() {
        if (!this.$updatingLayout)
            this.updateLayout();
        this.$hitArea.graphics.drawRect(0, 0, this.width, this.height);
    }
    setupBeforeAdd(xml) {
        super.setupBeforeAdd(xml);
        let str;
        str = xml.attributes.url;
        if (str)
            this.$url = str;
        str = xml.attributes.align;
        if (str)
            this.$align = ParseAlignType(str);
        str = xml.attributes.vAlign;
        if (str)
            this.$verticalAlign = ParseVertAlignType(str);
        str = xml.attributes.fill;
        if (str)
            this.$fill = ParseLoaderFillType(str);
        this.$autoSize = xml.attributes.autoSize == 'true';
        str = xml.attributes.errorSign;
        if (str)
            this.$showErrorSign = str == 'true';
        this.$playing = xml.attributes.playing != 'false';
        str = xml.attributes.color;
        if (str)
            this.color = str;
        if (this.$url)
            this.loadContent();
    }
}
GLoader.$errorSignPool = new GObjectRecycler();

let isColorableTitle = function (obj) {
    return obj && "titleColor" in obj && "fontSize" in obj;
};

class GLabel extends GComponent {
    constructor() {
        super();
    }
    get icon() {
        if (this.$iconObject != null)
            return this.$iconObject.icon;
        return null;
    }
    set icon(value) {
        if (this.$iconObject != null)
            this.$iconObject.icon = value;
        this.updateGear(7 /* Icon */);
    }
    get title() {
        if (this.$titleObject)
            return this.$titleObject.text;
        else
            return null;
    }
    set title(value) {
        if (this.$titleObject)
            this.$titleObject.text = value;
        this.updateGear(6 /* Text */);
    }
    get text() {
        return this.title;
    }
    set text(value) {
        this.title = value;
    }
    get titleColor() {
        if (isColorableTitle(this.$titleObject))
            return this.$titleObject.titleColor;
        return '';
    }
    set titleColor(value) {
        if (isColorableTitle(this.$titleObject))
            this.$titleObject.titleColor = value;
    }
    get fontSize() {
        if (isColorableTitle(this.$titleObject))
            return this.$titleObject.fontSize;
        return 0;
    }
    set fontSize(value) {
        if (isColorableTitle(this.$titleObject))
            this.$titleObject.fontSize = value;
    }
    set editable(val) {
        if (this.$titleObject)
            this.$titleObject.editable = val;
    }
    get editable() {
        if (this.$titleObject && this.$titleObject instanceof GTextInput)
            return this.$titleObject.editable;
        else
            return false;
    }
    constructFromXML(xml) {
        super.constructFromXML(xml);
        this.$titleObject = this.getChild('title');
        this.$iconObject = this.getChild('icon');
    }
    setupAfterAdd(xml) {
        super.setupAfterAdd(xml);
        let cs = XmlParser.getChildNodes(xml, 'Label');
        if (cs && cs.length > 0) {
            xml = cs[0];
            let str;
            str = xml.attributes.title;
            if (str)
                this.text = str;
            str = xml.attributes.icon;
            if (str)
                this.icon = str;
            str = xml.attributes.titleColor;
            if (str)
                this.titleColor = str;
            if (this.$titleObject instanceof GTextInput) {
                str = xml.attributes.prompt;
                let ti = this.$titleObject;
                if (str)
                    ti.promptText = str;
                str = xml.attributes.maxLength;
                if (str)
                    ti.maxLength = parseInt(str);
                str = xml.attributes.restrict;
                if (str)
                    ti.restrict = str;
                str = xml.attributes.password;
                if (str)
                    ti.password = str == 'true';
            }
        }
    }
}

class PageOption {
    set controller(val) {
        this.$controller = val;
    }
    set name(pageName) {
        this.$id = this.$controller.getPageIdByName(pageName);
    }
    get name() {
        if (this.$id)
            return this.$controller.getPageNameById(this.$id);
        else
            return null;
    }
    set index(pageIndex) {
        this.$id = this.$controller.getPageId(pageIndex);
    }
    get index() {
        if (this.$id)
            return this.$controller.getPageIndexById(this.$id);
        else
            return -1;
    }
    clear() {
        this.$id = null;
    }
    set id(id) {
        this.$id = id;
    }
    get id() {
        return this.$id;
    }
}

class GButton extends GComponent {
    constructor() {
        super();
        this.$mode = 0 /* Common */;
        this.$title = '';
        this.$icon = '';
        this.$sound = UIConfig.buttonSound;
        this.$soundVolumeScale = UIConfig.buttonSoundVolumeScale;
        this.$pageOption = new PageOption();
        this.$changeStateOnClick = true;
        this.$downEffect = 0;
        this.$downEffectValue = 0.8;
        this.$container.cursor = 'pointer';
    }
    setDisplayObject(value) {
        super.setDisplayObject(value);
        // this.$displayObject.buttonMode = true; //todo
    }
    get icon() {
        return this.$icon;
    }
    set icon(value) {
        this.$icon = value;
        value = this.$selected && this.$selectedIcon ? this.$selectedIcon : this.$icon;
        if (this.$iconObject != null)
            this.$iconObject.icon = value;
        this.updateGear(7 /* Icon */);
    }
    get selectedIcon() {
        return this.$selectedIcon;
    }
    set selectedIcon(value) {
        this.$selectedIcon = value;
        value = this.$selected && this.$selectedIcon ? this.$selectedIcon : this.$icon;
        if (this.$iconObject != null)
            this.$iconObject.icon = value;
    }
    get title() {
        return this.$title;
    }
    set title(value) {
        this.$title = value;
        if (this.$titleObject)
            this.$titleObject.text =
                this.$selected && this.$selectedTitle ? this.$selectedTitle : this.$title;
        this.updateGear(6 /* Text */);
    }
    get text() {
        return this.title;
    }
    set text(value) {
        this.title = value;
    }
    get selectedTitle() {
        return this.$selectedTitle;
    }
    set selectedTitle(value) {
        this.$selectedTitle = value;
        if (this.$titleObject)
            this.$titleObject.text =
                this.$selected && this.$selectedTitle ? this.$selectedTitle : this.$title;
    }
    get titleColor() {
        if (isColorableTitle(this.$titleObject))
            return this.$titleObject.titleColor;
    }
    set titleColor(value) {
        if (isColorableTitle(this.$titleObject))
            this.$titleObject.titleColor = value;
    }
    get fontSize() {
        if (isColorableTitle(this.$titleObject))
            return this.$titleObject.fontSize;
        return 0;
    }
    set fontSize(value) {
        if (isColorableTitle(this.$titleObject))
            this.$titleObject.fontSize = value;
    }
    get sound() {
        return this.$sound;
    }
    set sound(val) {
        this.$sound = val;
    }
    get soundVolumeScale() {
        return this.$soundVolumeScale;
    }
    set soundVolumeScale(value) {
        this.$soundVolumeScale = value;
    }
    set selected(val) {
        if (this.$mode == 0 /* Common */)
            return;
        if (this.$selected != val) {
            this.$selected = val;
            if (this.grayed &&
                this.$buttonController &&
                this.$buttonController.hasPage(GButton.DISABLED)) {
                if (this.$selected)
                    this.setState(GButton.SELECTED_DISABLED);
                else
                    this.setState(GButton.DISABLED);
            }
            else {
                if (this.$selected)
                    this.setState(this.$over ? GButton.SELECTED_OVER : GButton.DOWN);
                else
                    this.setState(this.$over ? GButton.OVER : GButton.UP);
            }
            if (this.$selectedTitle && this.$titleObject)
                this.$titleObject.text = this.$selected ? this.$selectedTitle : this.$title;
            if (this.$selectedIcon) {
                let str = this.$selected ? this.$selectedIcon : this.$icon;
                if (this.$iconObject != null)
                    this.$iconObject.icon = str;
            }
            if (this.$relatedController && this.$parent && !this.$parent.$buildingDisplayList) {
                if (this.$selected) {
                    this.$relatedController.selectedPageId = this.$pageOption.id;
                    if (this.$relatedController.$autoRadioGroupDepth)
                        this.$parent.adjustRadioGroupDepth(this, this.$relatedController);
                }
                else if (this.$mode == 1 /* Check */ &&
                    this.$relatedController.selectedPageId == this.$pageOption.id)
                    this.$relatedController.oppositePageId = this.$pageOption.id;
            }
        }
    }
    get selected() {
        return this.$selected;
    }
    get mode() {
        return this.$mode;
    }
    set mode(value) {
        if (this.$mode != value) {
            if (value == 0 /* Common */)
                this.selected = false;
            this.$mode = value;
        }
    }
    get relatedController() {
        return this.$relatedController;
    }
    set relatedController(val) {
        if (val != this.$relatedController) {
            this.$relatedController = val;
            this.$pageOption.controller = val;
            this.$pageOption.clear();
        }
    }
    get pageOption() {
        return this.$pageOption;
    }
    get changeStateOnClick() {
        return this.$changeStateOnClick;
    }
    set changeStateOnClick(value) {
        this.$changeStateOnClick = value;
    }
    get linkedPopup() {
        return this.$linkedPopup;
    }
    set linkedPopup(value) {
        this.$linkedPopup = value;
    }
    addStateListener(listener, thisObj) {
        this.on("__stateChanged" /* CHANGED */, listener, thisObj);
    }
    removeStateListener(listener) {
        this.off("__stateChanged" /* CHANGED */, listener);
    }
    fireClick(downEffect = true) {
        if (downEffect && this.$mode == 0 /* Common */) {
            this.setState(GButton.OVER);
            GTimer.inst.add(100, 1, this.setState, this, GButton.DOWN);
            GTimer.inst.add(200, 1, this.setState, this, GButton.UP);
        }
        this.$click(null);
    }
    setState(val) {
        if (this.$buttonController)
            this.$buttonController.selectedPage = val;
        if (this.$downEffect == 1) {
            if (val == GButton.DOWN || val == GButton.SELECTED_OVER || val == GButton.SELECTED_DISABLED) {
                let r = this.$downEffectValue * 255;
                let color = (r << 16) + (r << 8) + r;
                this.$children.forEach(obj => {
                    if (isColorGear(obj))
                        obj.color = color;
                });
            }
            else {
                this.$children.forEach(obj => {
                    if (isColorGear(obj))
                        obj.color = 0xffffff;
                });
            }
        }
        else if (this.$downEffect == 2) {
            if (val == GButton.DOWN || val == GButton.SELECTED_OVER || val == GButton.SELECTED_DISABLED)
                this.setScale(this.$downEffectValue, this.$downEffectValue);
            else
                this.setScale(1, 1);
        }
    }
    handleControllerChanged(c) {
        super.handleControllerChanged(c);
        if (this.$relatedController == c)
            this.selected = this.$pageOption.id == c.selectedPageId;
    }
    handleGrayedChanged() {
        if (this.$buttonController && this.$buttonController.hasPage(GButton.DISABLED)) {
            if (this.grayed) {
                if (this.$selected && this.$buttonController.hasPage(GButton.SELECTED_DISABLED))
                    this.setState(GButton.SELECTED_DISABLED);
                else
                    this.setState(GButton.DISABLED);
            }
            else if (this.$selected)
                this.setState(GButton.DOWN);
            else
                this.setState(GButton.UP);
        }
        else
            super.handleGrayedChanged();
    }
    constructFromXML(xml) {
        super.constructFromXML(xml);
        xml = XmlParser.getChildNodes(xml, 'Button')[0];
        let str;
        str = xml.attributes.mode;
        if (str)
            this.$mode = ParseButtonMode(str);
        str = xml.attributes.sound;
        if (str != null)
            this.$sound = str;
        str = xml.attributes.volume;
        if (str)
            this.$soundVolumeScale = parseInt(str) / 100;
        str = xml.attributes.downEffect;
        if (str) {
            this.$downEffect = str == 'dark' ? 1 : str == 'scale' ? 2 : 0;
            str = xml.attributes.downEffectValue;
            this.$downEffectValue = parseFloat(str);
            if (this.$downEffect == 2)
                this.setPivot(0.5, 0.5);
        }
        this.$buttonController = this.getController('button');
        this.$titleObject = this.getChild('title');
        this.$iconObject = this.getChild('icon');
        if (this.$titleObject != null)
            this.$title = this.$titleObject.text;
        if (this.$iconObject != null)
            this.$icon = this.$iconObject.icon;
        if (this.$mode == 0 /* Common */)
            this.setState(GButton.UP);
        this.on(InteractiveEvents.Over, this.$rollover, this);
        this.on(InteractiveEvents.Out, this.$rollout, this);
        this.on(InteractiveEvents.Down, this.$mousedown, this);
        this.on(InteractiveEvents.Click, this.$click, this);
        this.$hitArea = new createjs.Shape();
        this.$hitArea.graphics.beginFill("#fff").drawRect(0, 0, this.width, this.height);
        this.$displayObject.hitArea = this.$hitArea;
    }
    setupAfterAdd(xml) {
        super.setupAfterAdd(xml);
        xml = XmlParser.getChildNodes(xml, 'Button')[0];
        if (xml) {
            let str;
            str = xml.attributes.title;
            if (str)
                this.title = str;
            str = xml.attributes.icon;
            if (str)
                this.icon = str;
            str = xml.attributes.selectedTitle;
            if (str)
                this.selectedTitle = str;
            str = xml.attributes.selectedIcon;
            if (str)
                this.selectedIcon = str;
            str = xml.attributes.titleColor;
            if (str)
                this.titleColor = StringUtil.HEX2RGB(str);
            str = xml.attributes.sound;
            if (str != null)
                this.$sound = str;
            str = xml.attributes.volume;
            if (str)
                this.$soundVolumeScale = parseInt(str) / 100;
            str = xml.attributes.titleFontSize;
            if (str)
                this.fontSize = parseInt(str);
            str = xml.attributes.controller;
            if (str)
                this.$relatedController = this.$parent.getController(str);
            else
                this.$relatedController = null;
            this.$pageOption.id = xml.attributes.page;
            this.selected = xml.attributes.checked == 'true';
        }
    }
    $rollover(evt) {
        if (!this.$buttonController || !this.$buttonController.hasPage(GButton.OVER))
            return;
        this.$over = true;
        if (this.$down)
            return;
        this.setState(this.$selected ? GButton.SELECTED_OVER : GButton.OVER);
    }
    $rollout(evt) {
        if (!this.$buttonController || !this.$buttonController.hasPage(GButton.OVER))
            return;
        this.$over = false;
        if (this.$down)
            return;
        this.setState(this.$selected ? GButton.DOWN : GButton.UP);
    }
    $mousedown(evt) {
        this.$down = true;
        this.$mouseUpEvent = Decls$1.GRoot.inst.nativeStage.on(InteractiveEvents.Up, this.$mouseup, this);
        if (this.$mode == 0 /* Common */) {
            if (this.grayed && this.$buttonController && this.$buttonController.hasPage(GButton.DISABLED))
                this.setState(GButton.SELECTED_DISABLED);
            else
                this.setState(GButton.DOWN);
        }
        if (this.$linkedPopup != null) {
            if (this.$linkedPopup instanceof Window)
                this.$linkedPopup.toggleVisible();
            else
                Decls$1.GRoot.inst.togglePopup(this.$linkedPopup, this);
        }
    }
    $mouseup(evt) {
        if (this.$down) {
            Decls$1.GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseUpEvent);
            this.$down = false;
            if (this.$mode == 0 /* Common */) {
                if (this.grayed &&
                    this.$buttonController &&
                    this.$buttonController.hasPage(GButton.DISABLED))
                    this.setState(GButton.DISABLED);
                else if (this.$over)
                    this.setState(GButton.OVER);
                else
                    this.setState(GButton.UP);
            }
        }
    }
    $click(evt) {
        if (this.$sound) {
            var pi = UIPackage.getItemByURL(this.$sound);
            if (pi) {
                var sound = pi.owner.getItemAsset(pi);
                if (sound)
                    Decls$1.GRoot.inst.playOneShotSound(sound, this.$soundVolumeScale);
            }
        }
        if (!this.$changeStateOnClick)
            return;
        if (this.$mode == 1 /* Check */) {
            this.selected = !this.$selected;
            let evt = new createjs.Event("__stateChanged" /* CHANGED */, true, false);
            evt.data = { selected: this.selected };
            this.dispatchEvent(evt, this);
        }
        else if (this.$mode == 2 /* Radio */) {
            if (!this.$selected) {
                this.selected = true;
                let evt = new createjs.Event("__stateChanged" /* CHANGED */, true, false);
                evt.data = { selected: this.selected };
                this.dispatchEvent(evt, this);
            }
        }
    }
    dispose() {
        GTimer.inst.remove(this.setState, this);
        GTimer.inst.remove(this.setState, this);
        Decls$1.GRoot.inst.off(InteractiveEvents.Up, this.$mouseup);
        super.dispose();
    }
}
GButton.UP = 'up';
GButton.DOWN = 'down';
GButton.OVER = 'over';
GButton.SELECTED_OVER = 'selectedOver';
GButton.DISABLED = 'disabled';
GButton.SELECTED_DISABLED = 'selectedDisabled';

class GComboBox extends GComponent {
    constructor() {
        super();
        this.$visibleItemCount = 0;
        this.$selectedIndex = 0;
        this.$popupDir = 1 /* Down */;
        this.$visibleItemCount = UIConfig.defaultComboBoxVisibleItemCount;
        this.$itemsUpdated = true;
        this.$selectedIndex = -1;
        this.$items = [];
        this.$values = [];
    }
    get text() {
        if (this.$titleObject)
            return this.$titleObject.text;
        else
            return null;
    }
    set text(value) {
        if (this.$titleObject)
            this.$titleObject.text = value;
        this.updateGear(6 /* Text */);
    }
    get icon() {
        if (this.$iconObject)
            return this.$iconObject.icon;
        else
            return null;
    }
    set icon(value) {
        if (this.$iconObject)
            this.$iconObject.icon = value;
        this.updateGear(7 /* Icon */);
    }
    get titleColor() {
        if (isColorableTitle(this.$titleObject))
            return this.$titleObject.titleColor;
        // return 0;
    }
    set titleColor(value) {
        if (isColorableTitle(this.$titleObject))
            this.$titleObject.titleColor = value;
    }
    get visibleItemCount() {
        return this.$visibleItemCount;
    }
    set visibleItemCount(value) {
        this.$visibleItemCount = value;
    }
    get popupDirection() {
        return this.$popupDir;
    }
    set popupDirection(value) {
        this.$popupDir = value;
    }
    get items() {
        return this.$items;
    }
    set items(value) {
        if (!value)
            this.$items.length = 0;
        else
            this.$items = value.concat();
        if (this.$items.length > 0) {
            if (this.$selectedIndex >= this.$items.length)
                this.$selectedIndex = this.$items.length - 1;
            else if (this.$selectedIndex == -1)
                this.$selectedIndex = 0;
            this.text = this.$items[this.$selectedIndex];
            if (this.$icons != null && this.$selectedIndex < this.$icons.length)
                this.icon = this.$icons[this.$selectedIndex];
        }
        else {
            this.text = '';
            if (this.$icons != null)
                this.icon = null;
            this.$selectedIndex = -1;
        }
        this.$itemsUpdated = true;
    }
    get icons() {
        return this.$icons;
    }
    set icons(value) {
        this.$icons = value;
        if (this.$icons != null &&
            this.$selectedIndex != -1 &&
            this.$selectedIndex < this.$icons.length)
            this.icon = this.$icons[this.$selectedIndex];
    }
    get values() {
        return this.$values;
    }
    set values(value) {
        if (!value)
            this.$values.length = 0;
        else
            this.$values = value.concat();
    }
    get selectedIndex() {
        return this.$selectedIndex;
    }
    set selectedIndex(val) {
        if (this.$selectedIndex == val)
            return;
        this.$selectedIndex = val;
        if (this.selectedIndex >= 0 && this.selectedIndex < this.$items.length) {
            this.text = this.$items[this.$selectedIndex];
            if (this.$icons != null && this.$selectedIndex < this.$icons.length)
                this.icon = this.$icons[this.$selectedIndex];
        }
        else {
            this.text = '';
            if (this.$icons != null)
                this.icon = null;
        }
    }
    get value() {
        return this.$values[this.$selectedIndex];
    }
    set value(val) {
        this.selectedIndex = this.$values.indexOf(val);
    }
    setState(val) {
        if (this.$buttonController)
            this.$buttonController.selectedPage = val;
    }
    constructFromXML(xml) {
        super.constructFromXML(xml);
        xml = XmlParser.getChildNodes(xml, 'ComboBox')[0];
        let str;
        this.$buttonController = this.getController('button');
        this.$titleObject = this.getChild('title');
        this.$iconObject = this.getChild('icon');
        str = xml.attributes.dropdown;
        if (str) {
            this.$dropdown = UIPackage.createObjectFromURL(str);
            if (!this.$dropdown)
                throw new Error("the 'dropdown' is not specified, it must be a component definied in the package pool");
            this.$dropdown.name = 'this.dropdown';
            this.$list = this.$dropdown.getChild('list');
            if (this.$list == null)
                throw new Error(`${this.resourceURL}: the dropdown component must have a GList child and named 'list'.`);
            this.$list.on("__itemClick" /* ItemClick */, this.$clickItem, this);
            this.$list.addRelation(this.$dropdown, 14 /* Width */);
            this.$list.removeRelation(this.$dropdown, 15 /* Height */);
            this.$dropdown.addRelation(this.$list, 15 /* Height */);
            this.$dropdown.removeRelation(this.$list, 14 /* Width */);
            this.$dropdown.on('removed', this.$popupWinClosed, this);
        }
        if (!isMobile.any) {
            this.on(InteractiveEvents.Over, this.$rollover, this);
            this.on(InteractiveEvents.Out, this.$rollout, this);
        }
        this.on(InteractiveEvents.Down, this.$mousedown, this);
    }
    dispose() {
        GTimer.inst.remove(this.delayedClickItem, this);
        this.$list.off("__itemClick" /* ItemClick */, this.$clickItem);
        this.$dropdown.off('removed', this.$popupWinClosed);
        GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseUpEvent);
        this.$popupWinClosed(null);
        if (this.$dropdown) {
            this.$dropdown.dispose();
            this.$dropdown = null;
        }
        super.dispose();
    }
    setupAfterAdd(xml) {
        super.setupAfterAdd(xml);
        xml = XmlParser.getChildNodes(xml, 'ComboBox')[0];
        if (xml) {
            let str;
            str = xml.attributes.titleColor;
            if (str)
                this.titleColor = str;
            str = xml.attributes.visibleItemCount;
            if (str)
                this.$visibleItemCount = parseInt(str);
            let col = xml.children;
            if (col) {
                col.forEach((x, i) => {
                    if (x.nodeName == 'item') {
                        this.$items.push(x.attributes.title);
                        this.$values.push(x.attributes.value);
                        str = x.attributes.icon;
                        if (str) {
                            if (!this.$icons)
                                this.$icons = new Array(length);
                            this.$icons[i] = str;
                        }
                    }
                });
            }
            str = xml.attributes.title;
            if (str) {
                this.text = str;
                this.$selectedIndex = this.$items.indexOf(str);
            }
            else if (this.$items.length > 0) {
                this.$selectedIndex = 0;
                this.text = this.$items[0];
            }
            else
                this.$selectedIndex = -1;
            str = xml.attributes.icon;
            if (str)
                this.icon = str;
            str = xml.attributes.direction;
            if (str) {
                if (str == 'up')
                    this.$popupDir = 2 /* Up */;
                else if (str == 'auto')
                    this.$popupDir = 0 /* Auto */;
            }
        }
    }
    showDropdown() {
        if (this.$itemsUpdated) {
            this.$itemsUpdated = false;
            this.$list.removeChildrenToPool();
            this.$items.forEach((o, i) => {
                let item = this.$list.addItemFromPool();
                item.name = i < this.$values.length ? this.$values[i] : '';
                item.text = this.$items[i];
                item.icon = this.$icons != null && i < this.$icons.length ? this.$icons[i] : null;
            }, this);
            this.$list.resizeToFit(this.$visibleItemCount);
        }
        this.$list.selectedIndex = -1;
        this.$dropdown.width = this.width;
        GRoot.findFor(this).togglePopup(this.$dropdown, this, this.$popupDir);
        if (this.$dropdown.parent)
            this.setState(GButton.DOWN);
    }
    $popupWinClosed(evt) {
        if (this.$over)
            this.setState(GButton.OVER);
        else
            this.setState(GButton.UP);
    }
    $clickItem(evt) {
        let item = evt.data.item;
        let index = this.$list.getChildIndex(item);
        GTimer.inst.add(100, 1, this.delayedClickItem, this, index);
    }
    delayedClickItem(index) {
        if (this.$dropdown.parent instanceof GRoot)
            this.$dropdown.parent.hidePopup();
        this.$selectedIndex = index;
        if (this.$selectedIndex >= 0)
            this.text = this.$items[this.$selectedIndex];
        else
            this.text = '';
        let evt = new createjs.Event("__stateChanged" /* CHANGED */, true, false);
        evt.data = { selectedIndex: this.$selectedIndex };
        this.dispatchEvent(evt, this);
    }
    $rollover(evt) {
        this.$over = true;
        if (this.$down || (this.$dropdown && this.$dropdown.parent))
            return;
        this.setState(GButton.OVER);
    }
    $rollout(evt) {
        this.$over = false;
        if (this.$down || (this.$dropdown && this.$dropdown.parent))
            return;
        this.setState(GButton.UP);
    }
    $mousedown(evt) {
        evt.stopPropagation();
        GRoot.inst.checkPopups(evt.target);
        this.$down = true;
        this.$mouseUpEvent = GRoot.inst.nativeStage.on(InteractiveEvents.Up, this.$mouseup, this);
        if (this.$dropdown)
            this.showDropdown();
    }
    $mouseup(evt) {
        if (this.$down) {
            this.$down = false;
            GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseUpEvent);
            if (this.$dropdown && !this.$dropdown.parent) {
                if (this.$over)
                    this.setState(GButton.OVER);
                else
                    this.setState(GButton.UP);
            }
        }
    }
}

class GSlider extends GComponent {
    constructor() {
        super();
        this.$max = 0;
        this.$value = 0;
        this.$barMaxWidth = 0;
        this.$barMaxHeight = 0;
        this.$barMaxWidthDelta = 0;
        this.$barMaxHeightDelta = 0;
        this.$titleType = 0 /* Percent */;
        this.$value = 50;
        this.$max = 100;
        this.$clickPos = new createjs.Point();
    }
    get titleType() {
        return this.$titleType;
    }
    set titleType(value) {
        this.$titleType = value;
    }
    get max() {
        return this.$max;
    }
    set max(value) {
        if (this.$max != value) {
            this.$max = value;
            this.update();
        }
    }
    get value() {
        return this.$value;
    }
    set value(value) {
        if (this.$value != value) {
            this.$value = value;
            this.update();
        }
    }
    update() {
        let percent = Math.min(this.$value / this.$max, 1);
        this.updateWidthPercent(percent);
    }
    updateWidthPercent(percent) {
        if (this.$titleObject) {
            switch (this.$titleType) {
                case 0 /* Percent */:
                    this.$titleObject.text = `${Math.round(percent * 100)}%`;
                    break;
                case 1 /* ValueAndMax */:
                    this.$titleObject.text = `${this.$value}/${this.$max}`;
                    break;
                case 2 /* Value */:
                    this.$titleObject.text = `${this.$value}`;
                    break;
                case 3 /* Max */:
                    this.$titleObject.text = `${this.$max}`;
                    break;
            }
        }
        if (this.$barObjectH)
            this.$barObjectH.width = (this.width - this.$barMaxWidthDelta) * percent;
        if (this.$barObjectV)
            this.$barObjectV.height = (this.height - this.$barMaxHeightDelta) * percent;
        if (this.$aniObject instanceof GMovieClip)
            this.$aniObject.frame = Math.round(percent * 100);
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        if (this.$barObjectH)
            this.$barMaxWidth = this.width - this.$barMaxWidthDelta;
        if (this.$barObjectV)
            this.$barMaxHeight = this.height - this.$barMaxHeightDelta;
        if (!this.$inProgressBuilding)
            this.update();
    }
    setupAfterAdd(xml) {
        super.setupAfterAdd(xml);
        xml = XmlParser.getChildNodes(xml, 'Slider')[0];
        if (xml) {
            this.$value = parseInt(xml.attributes.value);
            this.$max = parseInt(xml.attributes.max);
        }
        this.update();
    }
    constructFromXML(xml) {
        super.constructFromXML(xml);
        xml = XmlParser.getChildNodes(xml, 'Slider')[0];
        let str;
        if (xml) {
            str = xml.attributes.titleType;
            if (str)
                this.$titleType = ParseProgressTitleType(str);
        }
        this.$titleObject = this.getChild('title');
        this.$barObjectH = this.getChild('bar');
        this.$barObjectV = this.getChild('bar_v');
        this.$aniObject = this.getChild('ani');
        this.$gripObject = this.getChild('grip');
        if (this.$barObjectH) {
            this.$barMaxWidth = this.$barObjectH.width;
            this.$barMaxWidthDelta = this.width - this.$barMaxWidth;
        }
        if (this.$barObjectV) {
            this.$barMaxHeight = this.$barObjectV.height;
            this.$barMaxHeightDelta = this.height - this.$barMaxHeight;
        }
        if (this.$gripObject)
            this.$gripObject.on(InteractiveEvents.Down, this.$gripMouseDown, this);
    }
    $gripMouseDown(evt) {
        this.$clickPos = this.globalToLocal(evt.stageX, evt.stageY);
        this.$clickPercent = this.$value / this.$max;
        this.$mouseMoveEvent = GRoot.inst.nativeStage.on(InteractiveEvents.Move, this.$gripMouseMove, this);
        this.$mouseUpEvent = GRoot.inst.nativeStage.on(InteractiveEvents.Up, this.$gripMouseUp, this);
    }
    $gripMouseMove(evt) {
        let pt = this.globalToLocal(evt.stageX, evt.stageY, GSlider.sSilderHelperPoint);
        let deltaX = pt.x - this.$clickPos.x;
        let deltaY = pt.y - this.$clickPos.y;
        let percent;
        if (this.$barObjectH)
            percent = this.$clickPercent + deltaX / this.$barMaxWidth;
        else
            percent = this.$clickPercent + deltaY / this.$barMaxHeight;
        if (percent > 1)
            percent = 1;
        else if (percent < 0)
            percent = 0;
        let newValue = Math.round(this.$max * percent);
        if (newValue != this.$value) {
            this.$value = newValue;
            let evt = new createjs.Event("__stateChanged" /* CHANGED */, true, false);
            this.dispatchEvent(evt, this);
        }
        this.updateWidthPercent(percent);
    }
    $gripMouseUp(evt) {
        let percent = this.$value / this.$max;
        this.updateWidthPercent(percent);
        GRoot.inst.nativeStage.off(InteractiveEvents.Move, this.$mouseMoveEvent);
        GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseUpEvent);
    }
    dispose() {
        if (this.$gripObject)
            this.$gripObject.off(InteractiveEvents.Down, this.$gripMouseDown);
        GRoot.inst.nativeStage.off(InteractiveEvents.Move, this.$mouseMoveEvent);
        GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseUpEvent);
        super.dispose();
    }
}
GSlider.sSilderHelperPoint = new createjs.Point();

class GProgressBar extends GComponent {
    constructor() {
        super();
        this.$max = 0;
        this.$value = 0;
        this.$barMaxWidth = 0;
        this.$barMaxHeight = 0;
        this.$barMaxWidthDelta = 0;
        this.$barMaxHeightDelta = 0;
        this.$barStartX = 0;
        this.$barStartY = 0;
        this.$tweenValue = 0;
        this.$titleType = 0 /* Percent */;
        this.$value = 50;
        this.$max = 100;
    }
    get titleType() {
        return this.$titleType;
    }
    set titleType(value) {
        if (this.$titleType != value) {
            this.$titleType = value;
            this.update(this.$value);
        }
    }
    get max() {
        return this.$max;
    }
    set max(value) {
        if (this.$max != value) {
            this.$max = value;
            this.update(this.$value);
        }
    }
    get value() {
        return this.$value;
    }
    set value(value) {
        if (this.$tweener != null) {
            this.$tweener.paused = true;
            this.$tweener = null;
        }
        if (this.$value != value) {
            this.$value = value;
            this.update(this.$value);
        }
    }
    tweenValue(value, duration) {
        if (this.$value != value) {
            if (this.$tweener) {
                this.$tweener.paused = true;
                this.$tweener.removeAllEventListeners();
                createjs.Tween.removeTweens(this);
            }
            this.$tweenValue = this.$value;
            this.$value = value;
            this.$tweener = createjs.Tween.get(this, {
                onChange: Binder.create(this.onUpdateTween, this)
            }).to({ $tweenValue: value }, duration * 1000, GProgressBar.easeLinear);
            return this.$tweener;
        }
        else
            return null;
    }
    onUpdateTween() {
        this.update(this.$tweenValue);
    }
    update(val) {
        let percent = this.$max != 0 ? Math.min(val / this.$max, 1) : 0;
        if (this.$titleObject) {
            switch (this.$titleType) {
                case 0 /* Percent */:
                    this.$titleObject.text = `${Math.round(percent * 100)}%`;
                    break;
                case 1 /* ValueAndMax */:
                    this.$titleObject.text = `${Math.round(val)}/${Math.round(this.$max)}`;
                    break;
                case 2 /* Value */:
                    this.$titleObject.text = `${Math.round(val)}`;
                    break;
                case 3 /* Max */:
                    this.$titleObject.text = `${Math.round(this.$max)}`;
                    break;
            }
        }
        let fullWidth = this.width - this.$barMaxWidthDelta;
        let fullHeight = this.height - this.$barMaxHeightDelta;
        if (!this.$reverse) {
            if (this.$barObjectH)
                this.$barObjectH.width = fullWidth * percent;
            if (this.$barObjectV)
                this.$barObjectV.height = fullHeight * percent;
        }
        else {
            if (this.$barObjectH) {
                this.$barObjectH.width = fullWidth * percent;
                this.$barObjectH.x = this.$barStartX + (fullWidth - this.$barObjectH.width);
            }
            if (this.$barObjectV) {
                this.$barObjectV.height = fullHeight * percent;
                this.$barObjectV.y = this.$barStartY + (fullHeight - this.$barObjectV.height);
            }
        }
        if (this.$aniObject instanceof GMovieClip)
            this.$aniObject.frame = Math.round(percent * 100);
    }
    constructFromXML(xml) {
        super.constructFromXML(xml);
        xml = XmlParser.getChildNodes(xml, 'ProgressBar')[0];
        let str;
        str = xml.attributes.titleType;
        if (str)
            this.$titleType = ParseProgressTitleType(str);
        this.$reverse = xml.attributes.reverse == 'true';
        this.$titleObject = this.getChild('title');
        this.$barObjectH = this.getChild('bar');
        this.$barObjectV = this.getChild('bar_v');
        this.$aniObject = this.getChild('ani');
        if (this.$barObjectH) {
            this.$barMaxWidth = this.$barObjectH.width;
            this.$barMaxWidthDelta = this.width - this.$barMaxWidth;
            this.$barStartX = this.$barObjectH.x;
        }
        if (this.$barObjectV) {
            this.$barMaxHeight = this.$barObjectV.height;
            this.$barMaxHeightDelta = this.height - this.$barMaxHeight;
            this.$barStartY = this.$barObjectV.y;
        }
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        if (this.$barObjectH)
            this.$barMaxWidth = this.width - this.$barMaxWidthDelta;
        if (this.$barObjectV)
            this.$barMaxHeight = this.height - this.$barMaxHeightDelta;
        if (!this.$inProgressBuilding)
            this.update(this.$value);
    }
    setupAfterAdd(xml) {
        super.setupAfterAdd(xml);
        xml = XmlParser.getChildNodes(xml, 'ProgressBar')[0];
        if (xml) {
            this.$value = parseInt(xml.attributes.value) || 0;
            this.$max = parseInt(xml.attributes.max) || 0;
        }
        this.update(this.$value);
    }
    dispose() {
        if (this.$tweener) {
            this.$tweener.paused = true;
            this.$tweener.removeAllEventListeners();
        }
        createjs.Tween.removeTweens(this);
        this.$tweener = null;
        super.dispose();
    }
}
GProgressBar.easeLinear = ParseEaseType('linear'); // createjs.Ease.getPowIn(1);

class GScrollBar extends GComponent {
    constructor() {
        super();
        this.$dragOffset = new createjs.Point();
        this.$scrollPerc = 0;
    }
    setScrollPane(target, vertical) {
        this.$target = target;
        this.$vertical = vertical;
    }
    set displayPerc(val) {
        if (this.$vertical) {
            if (!this.$fixedGripSize)
                this.$grip.height = val * this.$bar.height;
            this.$grip.y = this.$bar.y + (this.$bar.height - this.$grip.height) * this.$scrollPerc;
        }
        else {
            if (!this.$fixedGripSize)
                this.$grip.width = val * this.$bar.width;
            this.$grip.x = this.$bar.x + (this.$bar.width - this.$grip.width) * this.$scrollPerc;
        }
    }
    get scrollPerc() {
        return this.$scrollPerc;
    }
    set scrollPerc(val) {
        this.$scrollPerc = val;
        if (this.$vertical)
            this.$grip.y = this.$bar.y + (this.$bar.height - this.$grip.height) * this.$scrollPerc;
        else
            this.$grip.x = this.$bar.x + (this.$bar.width - this.$grip.width) * this.$scrollPerc;
    }
    get minSize() {
        if (this.$vertical)
            return ((this.$arrowButton1 != null ? this.$arrowButton1.height : 0) +
                (this.$arrowButton2 != null ? this.$arrowButton2.height : 0));
        else
            return ((this.$arrowButton1 != null ? this.$arrowButton1.width : 0) +
                (this.$arrowButton2 != null ? this.$arrowButton2.width : 0));
    }
    constructFromXML(xml) {
        super.constructFromXML(xml);
        xml = XmlParser.getChildNodes(xml, 'ScrollBar')[0];
        if (xml != null)
            this.$fixedGripSize = xml.attributes.fixedGripSize == 'true';
        this.$grip = this.getChild('grip');
        if (!this.$grip) {
            console.error("please create and define 'grip' in the Editor for the scrollbar");
            return;
        }
        this.$bar = this.getChild('bar');
        if (!this.$bar) {
            console.error("please create and define 'bar' in the Editor for the scrollbar");
            return;
        }
        this.$arrowButton1 = this.getChild('arrow1');
        this.$arrowButton2 = this.getChild('arrow2');
        this.$grip.on(InteractiveEvents.Down, this.$gripMouseDown, this);
        if (this.$arrowButton1)
            this.$arrowButton1.on(InteractiveEvents.Down, this.$arrowButton1Click, this);
        if (this.$arrowButton2)
            this.$arrowButton2.on(InteractiveEvents.Down, this.$arrowButton2Click, this);
        this.on(InteractiveEvents.Down, this.$barMouseDown, this);
    }
    $gripMouseDown(evt) {
        if (!this.$bar)
            return;
        evt.stopPropagation();
        // this.$dragOffset = evt.data.getLocalPosition(this.displayObject, this.$dragOffset);
        this.$dragOffset = new createjs.Point(evt.localX, evt.localY);
        this.$dragOffset.x -= this.$grip.x;
        this.$dragOffset.y -= this.$grip.y;
        this.$mouseMoveEvent = GRoot.inst.nativeStage.on(InteractiveEvents.Move, this.$gripDragging, this);
        this.$mouseUpEvent = GRoot.inst.nativeStage.on(InteractiveEvents.Up, this.$gripDraggingEnd, this);
    }
    $gripDragging(evt) {
        let pt = evt.target.localToLocal(evt.localX, evt.localY, this.$displayObject); // todo
        if (GScrollBar.sScrollbarHelperPoint.x == 0 && GScrollBar.sScrollbarHelperPoint.y == 0) {
            GScrollBar.sScrollbarHelperPoint.x = this.$target['$xPos'];
            GScrollBar.sScrollbarHelperPoint.y = this.$target['$yPos'];
        }
        pt.x -= GScrollBar.sScrollbarHelperPoint.x;
        pt.y -= GScrollBar.sScrollbarHelperPoint.y;
        if (this.$vertical) {
            let curY = pt.y - this.$dragOffset.y;
            this.$target.setPercY((curY - this.$bar.y) / (this.$bar.height - this.$grip.height), false);
        }
        else {
            let curX = pt.x - this.$dragOffset.x;
            this.$target.setPercX((curX - this.$bar.x) / (this.$bar.width - this.$grip.width), false);
        }
    }
    $gripDraggingEnd(evt) {
        GScrollBar.sScrollbarHelperPoint = new createjs.Point();
        GRoot.inst.nativeStage.off(InteractiveEvents.Move, this.$mouseMoveEvent);
        GRoot.inst.nativeStage.off(InteractiveEvents.Up, this.$mouseUpEvent);
    }
    $arrowButton1Click(evt) {
        evt.stopPropagation();
        if (this.$vertical)
            this.$target.scrollUp();
        else
            this.$target.scrollLeft();
    }
    $arrowButton2Click(evt) {
        evt.stopPropagation();
        if (this.$vertical)
            this.$target.scrollDown();
        else
            this.$target.scrollRight();
    }
    $barMouseDown(evt) {
        let pt = new createjs.Point(evt.localX, evt.localY);
        // let pt: createjs.Point = evt.data.getLocalPosition(this.$grip.displayObject, GScrollBar.sScrollbarHelperPoint);
        if (this.$vertical) {
            if (pt.y < 0)
                this.$target.scrollUp(4);
            else
                this.$target.scrollDown(4);
        }
        else {
            if (pt.x < 0)
                this.$target.scrollLeft(4);
            else
                this.$target.scrollRight(4);
        }
    }
    dispose() {
        this.off(InteractiveEvents.Down, this.$barMouseDown);
        GScrollBar.sScrollbarHelperPoint = new createjs.Point();
        if (this.$arrowButton1)
            this.$arrowButton1.off(InteractiveEvents.Down, this.$arrowButton1Click);
        if (this.$arrowButton2)
            this.$arrowButton2.off(InteractiveEvents.Down, this.$arrowButton2Click);
        this.$grip.off(InteractiveEvents.Down, this.$gripMouseDown);
        this.$gripDraggingEnd(null);
        super.dispose();
    }
}
GScrollBar.sScrollbarHelperPoint = new createjs.Point();

class ItemInfo {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.updateFlag = 0;
        this.selected = false;
    }
}
class GList extends GComponent {
    constructor() {
        super();
        this.$lineCount = 0;
        this.$columnCount = 0;
        this.$lineGap = 0;
        this.$columnGap = 0;
        this.$lastSelectedIndex = 0;
        this.$numItems = 0;
        this.$firstIndex = 0; //top left index
        this.$curLineItemCount = 0; //item count in one line
        this.$virtualListChanged = 0 /* None */;
        //render sorting type
        this.$apexIndex = 0;
        this.$childrenRenderOrder = 0 /* Ascent */;
        this.$itemInfoVer = 0; //is the item used in the current handling or not
        this.$enterCounter = 0; //because the handleScroll function can be re-entered, so this variable is used to avoid dead-lock
        this.$trackBounds = true;
        this.$pool = new GObjectRecycler();
        this.$layout = 0 /* SingleColumn */;
        this.$autoResizeItem = true;
        this.$lastSelectedIndex = -1;
        this.$selectionMode = 0 /* Single */;
        this.opaque = true;
        this.scrollItemToViewOnClick = true;
        this.$align = "left" /* Left */;
        this.$verticalAlign = 0 /* Top */;
        this.$container = new createjs.Container();
        this.$rootContainer.addChild(this.$container);
        this.$container.cursor = 'pointer';
    }
    get childrenRenderOrder() {
        return this.$childrenRenderOrder;
    }
    set childrenRenderOrder(value) {
        if (this.$childrenRenderOrder != value) {
            this.$childrenRenderOrder = value;
            this.appendChildrenList();
        }
    }
    get apexIndex() {
        return this.$apexIndex;
    }
    set apexIndex(value) {
        if (this.$apexIndex != value) {
            this.$apexIndex = value;
            if (this.$childrenRenderOrder == 2 /* Arch */)
                this.appendChildrenList();
        }
    }
    /**@override */
    appendChildrenList() {
        const cnt = this.$children.length;
        if (cnt == 0)
            return;
        let i;
        let child;
        switch (this.$childrenRenderOrder) {
            case 0 /* Ascent */:
                {
                    for (i = 0; i < cnt; i++) {
                        child = this.$children[i];
                        if (child.displayObject != null && child.finalVisible)
                            this.$container.addChild(child.displayObject);
                    }
                }
                break;
            case 1 /* Descent */:
                {
                    for (i = cnt - 1; i >= 0; i--) {
                        child = this.$children[i];
                        if (child.displayObject != null && child.finalVisible)
                            this.$container.addChild(child.displayObject);
                    }
                }
                break;
            case 2 /* Arch */:
                {
                    for (i = 0; i < this.$apexIndex; i++) {
                        child = this.$children[i];
                        if (child.displayObject != null && child.finalVisible)
                            this.$container.addChild(child.displayObject);
                    }
                    for (i = cnt - 1; i >= this.$apexIndex; i--) {
                        child = this.$children[i];
                        if (child.displayObject != null && child.finalVisible)
                            this.$container.addChild(child.displayObject);
                    }
                }
                break;
        }
    }
    /**@override */
    setXY(xv, yv) {
        if (this.$x != xv || this.$y != yv) {
            this.$x = xv;
            this.$y = yv;
            this.handleXYChanged();
            this.updateGear(1 /* XY */);
            if (GObject.draggingObject == this && !GObject.sUpdatingWhileDragging)
                this.localToGlobalRect(0, 0, this.width, this.height, GObject.sGlobalRect);
        }
    }
    /**@override */
    $setChildIndex(child, oldIndex, index = 0) {
        let cnt = this.$children.length;
        if (index > cnt)
            index = cnt;
        if (oldIndex == index)
            return oldIndex;
        this.$children.splice(oldIndex, 1);
        this.$children.splice(index, 0, child);
        if (child.inContainer) {
            let displayIndex = 0;
            let g;
            let i;
            if (this.$childrenRenderOrder == 0 /* Ascent */) {
                for (i = 0; i < index; i++) {
                    g = this.$children[i];
                    if (g.inContainer)
                        displayIndex++;
                }
                if (displayIndex == this.$container.children.length)
                    displayIndex--;
                this.$container.setChildIndex(child.displayObject, displayIndex);
            }
            else if (this.$childrenRenderOrder == 1 /* Descent */) {
                for (i = cnt - 1; i > index; i--) {
                    g = this.$children[i];
                    if (g.inContainer)
                        displayIndex++;
                }
                if (displayIndex == this.$container.children.length)
                    displayIndex--;
                this.$container.setChildIndex(child.displayObject, displayIndex);
            }
            else
                GTimer.inst.callLater(this.appendChildrenList, this);
            this.setBoundsChangedFlag();
        }
        return index;
    }
    /**@override */
    childStateChanged(child) {
        if (this.$buildingDisplayList)
            return;
        if (child instanceof GGroup) {
            this.$children.forEach(g => {
                if (g.group == child)
                    this.childStateChanged(g);
            }, this);
            return;
        }
        if (!child.displayObject)
            return;
        if (child.finalVisible) {
            let i, g;
            let cnt = this.$children.length;
            if (!child.displayObject.parent) {
                let index = 0;
                if (this.$childrenRenderOrder == 0 /* Ascent */) {
                    for (let i = 0; i < cnt; i++) {
                        g = this.$children[i];
                        if (g == child)
                            break;
                        if (g.displayObject != null && g.displayObject.parent != null)
                            index++;
                    }
                    this.$container.addChildAt(child.displayObject, index);
                }
                else if (this.$childrenRenderOrder == 1 /* Descent */) {
                    for (i = cnt - 1; i >= 0; i--) {
                        g = this.$children[i];
                        if (g == child)
                            break;
                        if (g.displayObject != null && g.displayObject.parent != null)
                            index++;
                    }
                    this.$container.addChildAt(child.displayObject, index);
                }
                else {
                    this.$container.addChild(child.displayObject);
                    GTimer.inst.callLater(this.appendChildrenList, this);
                }
            }
        }
        else {
            if (child.displayObject.parent)
                this.$container.removeChild(child.displayObject);
        }
    }
    dispose() {
        GTimer.inst.remove(this.$refreshVirtualList, this);
        this.$pool.clear();
        if (this.$scrollPane)
            this.$scrollPane.off("__scroll" /* SCROLL */, this.$scrolled);
        super.dispose();
    }
    get layout() {
        return this.$layout;
    }
    set layout(value) {
        if (this.$layout != value) {
            this.$layout = value;
            this.setBoundsChangedFlag();
            if (this.$virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get lineCount() {
        return this.$lineCount;
    }
    set lineCount(value) {
        if (this.$lineCount != value) {
            this.$lineCount = value;
            if (this.$layout == 3 /* FlowVertical */ ||
                this.$layout == 4 /* Pagination */) {
                this.setBoundsChangedFlag();
                if (this.$virtual)
                    this.setVirtualListChangedFlag(true);
            }
        }
    }
    get columnCount() {
        return this.$columnCount;
    }
    set columnCount(value) {
        if (this.$columnCount != value) {
            this.$columnCount = value;
            if (this.$layout == 2 /* FlowHorizontal */ ||
                this.$layout == 4 /* Pagination */) {
                this.setBoundsChangedFlag();
                if (this.$virtual)
                    this.setVirtualListChangedFlag(true);
            }
        }
    }
    get lineGap() {
        return this.$lineGap;
    }
    set lineGap(value) {
        if (this.$lineGap != value) {
            this.$lineGap = value;
            this.setBoundsChangedFlag();
            if (this.$virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get columnGap() {
        return this.$columnGap;
    }
    set columnGap(value) {
        if (this.$columnGap != value) {
            this.$columnGap = value;
            this.setBoundsChangedFlag();
            if (this.$virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get align() {
        return this.$align;
    }
    set align(value) {
        if (this.$align != value) {
            this.$align = value;
            this.setBoundsChangedFlag();
            if (this.$virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get verticalAlign() {
        return this.$verticalAlign;
    }
    set verticalAlign(value) {
        if (this.$verticalAlign != value) {
            this.$verticalAlign = value;
            this.setBoundsChangedFlag();
            if (this.$virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get virtualItemSize() {
        return this.$itemSize;
    }
    set virtualItemSize(value) {
        if (this.$virtual) {
            if (this.$itemSize == null)
                this.$itemSize = new createjs.Point();
            this.$itemSize.copy(value);
            this.setVirtualListChangedFlag(true);
        }
    }
    get defaultItem() {
        return this.$defaultItem;
    }
    set defaultItem(val) {
        this.$defaultItem = val;
    }
    get autoResizeItem() {
        return this.$autoResizeItem;
    }
    set autoResizeItem(value) {
        if (this.$autoResizeItem != value) {
            this.$autoResizeItem = value;
            this.setBoundsChangedFlag();
            if (this.$virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get selectionMode() {
        return this.$selectionMode;
    }
    set selectionMode(value) {
        this.$selectionMode = value;
    }
    get selectionController() {
        return this.$selectionController;
    }
    set selectionController(value) {
        this.$selectionController = value;
    }
    get itemPool() {
        return this.$pool;
    }
    getFromPool(url = null) {
        if (!url)
            url = this.$defaultItem;
        let obj = this.$pool.get(url);
        if (obj != null)
            obj.visible = true;
        return obj;
    }
    returnToPool(obj) {
        this.$pool.recycle(obj.resourceURL, obj);
    }
    addChildAt(child, index = 0) {
        super.addChildAt(child, index);
        if (child instanceof GButton) {
            child.selected = false;
            child.changeStateOnClick = false;
        }
        child.click(this.$clickItem, this);
        return child;
    }
    addItem(url = null) {
        if (!url)
            url = this.$defaultItem;
        return this.addChild(UIPackage.createObjectFromURL(url));
    }
    addItemFromPool(url = null) {
        return this.addChild(this.getFromPool(url));
    }
    removeChildAt(index, dispose = false) {
        if (index >= 0 && index < this.numChildren) {
            let child = this.$children[index];
            child.parent = null;
            if (child.sortingOrder != 0)
                this.$sortingChildCount--;
            this.$children.splice(index, 1);
            if (child.inContainer) {
                this.$container.removeChild(child.displayObject);
                if (this.$childrenRenderOrder == 2 /* Arch */)
                    GTimer.inst.callLater(this.appendChildrenList, this);
            }
            if (dispose === true)
                child.dispose();
            this.setBoundsChangedFlag();
            child.removeClick(this.$clickItem);
            return child;
        }
        else
            throw new Error('Invalid child index');
    }
    removeChildToPoolAt(index) {
        let child = this.removeChildAt(index);
        this.returnToPool(child);
    }
    removeChildToPool(child) {
        super.removeChild(child);
        this.returnToPool(child);
    }
    removeChildrenToPool(beginIndex = 0, endIndex = -1) {
        if (endIndex < 0 || endIndex >= this.$children.length)
            endIndex = this.$children.length - 1;
        for (let i = beginIndex; i <= endIndex; ++i)
            this.removeChildToPoolAt(beginIndex);
    }
    get selectedIndex() {
        let i;
        if (this.$virtual) {
            for (i = 0; i < this.$realNumItems; i++) {
                const ii = this.$virtualItems[i];
                if ((ii.obj instanceof GButton && ii.obj.selected) || (ii.obj == null && ii.selected)) {
                    if (this.$loop)
                        return i % this.$numItems;
                    else
                        return i;
                }
            }
        }
        else {
            const cnt = this.$children.length;
            for (i = 0; i < cnt; i++) {
                const obj = this.$children[i];
                if (obj != null && obj.selected)
                    return i;
            }
        }
        return -1;
    }
    set selectedIndex(value) {
        if (value >= 0 && value < this.numItems) {
            if (this.selectionMode != 0 /* Single */)
                this.clearSelection();
            this.addSelection(value);
        }
        else
            this.clearSelection();
    }
    getSelection() {
        let ret = [];
        let i;
        if (this.$virtual) {
            for (i = 0; i < this.$realNumItems; i++) {
                const ii = this.$virtualItems[i];
                if ((ii.obj instanceof GButton && ii.obj.selected) || (ii.obj == null && ii.selected)) {
                    let j = i;
                    if (this.$loop) {
                        j = i % this.$numItems;
                        if (ret.indexOf(j) != -1)
                            continue;
                    }
                    ret.push(j);
                }
            }
        }
        else {
            const cnt = this.$children.length;
            for (i = 0; i < cnt; i++) {
                const obj = this.$children[i];
                if (obj != null && obj.selected)
                    ret.push(i);
            }
        }
        return ret;
    }
    addSelection(index, scrollIntoView = false) {
        if (this.$selectionMode == 3 /* None */)
            return;
        this.checkVirtualList();
        if (this.$selectionMode == 0 /* Single */)
            this.clearSelection();
        if (scrollIntoView)
            this.scrollToView(index);
        this.$lastSelectedIndex = index;
        let obj = null;
        if (this.$virtual) {
            const ii = this.$virtualItems[index];
            if (ii.obj != null)
                obj = ii.obj;
            ii.selected = true;
        }
        else
            obj = this.getChildAt(index);
        if (obj != null && !obj.selected) {
            obj.selected = true;
            this.updateSelectionController(index);
        }
    }
    removeSelection(index) {
        if (this.$selectionMode == 3 /* None */)
            return;
        let obj = null;
        if (this.$virtual) {
            const ii = this.$virtualItems[index];
            if (ii.obj != null)
                obj = ii.obj;
            ii.selected = false;
        }
        else
            obj = this.getChildAt(index);
        if (obj != null)
            obj.selected = false;
    }
    clearSelection() {
        let i;
        if (this.$virtual) {
            for (i = 0; i < this.$realNumItems; i++) {
                const ii = this.$virtualItems[i];
                if (ii.obj instanceof GButton)
                    ii.obj.selected = false;
                ii.selected = false;
            }
        }
        else {
            const cnt = this.$children.length;
            for (i = 0; i < cnt; i++) {
                const obj = this.$children[i];
                if (obj != null)
                    obj.selected = false;
            }
        }
    }
    clearSelectionExcept(g) {
        let i;
        if (this.$virtual) {
            for (i = 0; i < this.$realNumItems; i++) {
                const ii = this.$virtualItems[i];
                if (ii.obj != g) {
                    if (ii.obj instanceof GButton)
                        ii.obj.selected = false;
                    ii.selected = false;
                }
            }
        }
        else {
            const cnt = this.$children.length;
            for (i = 0; i < cnt; i++) {
                const obj = this.$children[i];
                if (obj != null && obj != g)
                    obj.selected = false;
            }
        }
    }
    selectAll() {
        this.checkVirtualList();
        let last = -1;
        let i;
        if (this.$virtual) {
            for (i = 0; i < this.$realNumItems; i++) {
                const ii = this.$virtualItems[i];
                if (ii.obj instanceof GButton && !ii.obj.selected) {
                    ii.obj.selected = true;
                    last = i;
                }
                ii.selected = true;
            }
        }
        else {
            const cnt = this.$children.length;
            for (i = 0; i < cnt; i++) {
                const obj = this.$children[i];
                if (obj != null && !obj.selected) {
                    obj.selected = true;
                    last = i;
                }
            }
        }
        if (last != -1)
            this.updateSelectionController(last);
    }
    selectNone() {
        this.clearSelection();
    }
    selectReverse() {
        this.checkVirtualList();
        let last = -1;
        let i;
        if (this.$virtual) {
            for (i = 0; i < this.$realNumItems; i++) {
                const ii = this.$virtualItems[i];
                if (ii.obj instanceof GButton) {
                    ii.obj.selected = !ii.obj.selected;
                    if (ii.obj.selected)
                        last = i;
                }
                ii.selected = !ii.selected;
            }
        }
        else {
            const cnt = this.$children.length;
            for (i = 0; i < cnt; i++) {
                const obj = this.$children[i];
                if (obj != null) {
                    obj.selected = !obj.selected;
                    if (obj.selected)
                        last = i;
                }
            }
        }
        if (last != -1)
            this.updateSelectionController(last);
    }
    handleArrowKey(key) {
        let index = this.selectedIndex;
        if (index == -1)
            return;
        let current;
        let k, i;
        let obj;
        switch (key) {
            case 38 /* Up */:
                if (this.$layout == 0 /* SingleColumn */ ||
                    this.$layout == 3 /* FlowVertical */) {
                    index--;
                    if (index >= 0) {
                        this.clearSelection();
                        this.addSelection(index, true);
                    }
                }
                else if (this.$layout == 2 /* FlowHorizontal */ ||
                    this.$layout == 4 /* Pagination */) {
                    current = this.$children[index];
                    k = 0;
                    for (i = index - 1; i >= 0; i--) {
                        obj = this.$children[i];
                        if (obj.y != current.y) {
                            current = obj;
                            break;
                        }
                        k++;
                    }
                    for (; i >= 0; i--) {
                        obj = this.$children[i];
                        if (obj.y != current.y) {
                            this.clearSelection();
                            this.addSelection(i + k + 1, true);
                            break;
                        }
                    }
                }
                break;
            case 39 /* Right */:
                if (this.$layout == 1 /* SingleRow */ ||
                    this.$layout == 2 /* FlowHorizontal */ ||
                    this.$layout == 4 /* Pagination */) {
                    index++;
                    if (index < this.$children.length) {
                        this.clearSelection();
                        this.addSelection(index, true);
                    }
                }
                else if (this.$layout == 3 /* FlowVertical */) {
                    current = this.$children[index];
                    k = 0;
                    const cnt = this.$children.length;
                    for (i = index + 1; i < cnt; i++) {
                        obj = this.$children[i];
                        if (obj.x != current.x) {
                            current = obj;
                            break;
                        }
                        k++;
                    }
                    for (; i < cnt; i++) {
                        obj = this.$children[i];
                        if (obj.x != current.x) {
                            this.clearSelection();
                            this.addSelection(i - k - 1, true);
                            break;
                        }
                    }
                }
                break;
            case 40 /* Down */:
                if (this.$layout == 0 /* SingleColumn */ ||
                    this.$layout == 3 /* FlowVertical */) {
                    index++;
                    if (index < this.$children.length) {
                        this.clearSelection();
                        this.addSelection(index, true);
                    }
                }
                else if (this.$layout == 2 /* FlowHorizontal */ ||
                    this.$layout == 4 /* Pagination */) {
                    current = this.$children[index];
                    k = 0;
                    const cnt = this.$children.length;
                    for (i = index + 1; i < cnt; i++) {
                        obj = this.$children[i];
                        if (obj.y != current.y) {
                            current = obj;
                            break;
                        }
                        k++;
                    }
                    for (; i < cnt; i++) {
                        obj = this.$children[i];
                        if (obj.y != current.y) {
                            this.clearSelection();
                            this.addSelection(i - k - 1, true);
                            break;
                        }
                    }
                }
                break;
            case 37 /* Left */:
                if (this.$layout == 1 /* SingleRow */ ||
                    this.$layout == 2 /* FlowHorizontal */ ||
                    this.$layout == 4 /* Pagination */) {
                    index--;
                    if (index >= 0) {
                        this.clearSelection();
                        this.addSelection(index, true);
                    }
                }
                else if (this.$layout == 3 /* FlowVertical */) {
                    current = this.$children[index];
                    k = 0;
                    for (i = index - 1; i >= 0; i--) {
                        obj = this.$children[i];
                        if (obj.x != current.x) {
                            current = obj;
                            break;
                        }
                        k++;
                    }
                    for (; i >= 0; i--) {
                        obj = this.$children[i];
                        if (obj.x != current.x) {
                            this.clearSelection();
                            this.addSelection(i + k + 1, true);
                            break;
                        }
                    }
                }
                break;
        }
    }
    $clickItem(evt) {
        if (this.$scrollPane != null && this.$scrollPane.isDragging)
            return;
        const item = GObject.castFromNativeObject(evt.currentTarget);
        if (!item)
            return;
        this.setSelectionOnEvent(item);
        if (this.$scrollPane && this.scrollItemToViewOnClick)
            this.$scrollPane.scrollToView(item, true);
        let event = new createjs.Event("__itemClick" /* ItemClick */, true, false);
        event.data = { item };
        this.dispatchEvent(event, this);
    }
    setSelectionOnEvent(button) {
        if (!(button instanceof GButton) || this.$selectionMode == 3 /* None */)
            return;
        let dontChangeLastIndex = false;
        let index = this.childIndexToItemIndex(this.getChildIndex(button));
        if (this.$selectionMode == 0 /* Single */) {
            if (!button.selected) {
                this.clearSelectionExcept(button);
                button.selected = true;
            }
        }
        else {
            if (DOMEventManager.inst.isKeyPressed(16 /* Shift */)) {
                if (!button.selected) {
                    if (this.$lastSelectedIndex != -1) {
                        const min = Math.min(this.$lastSelectedIndex, index);
                        const max = Math.min(Math.max(this.$lastSelectedIndex, index), this.numItems - 1);
                        let i;
                        if (this.$virtual) {
                            for (i = min; i <= max; i++) {
                                const ii = this.$virtualItems[i];
                                if (ii.obj instanceof GButton)
                                    ii.obj.selected = true;
                                ii.selected = true;
                            }
                        }
                        else {
                            for (i = min; i <= max; i++) {
                                const obj = this.getChildAt(i);
                                if (obj != null)
                                    obj.selected = true;
                            }
                        }
                        dontChangeLastIndex = true;
                    }
                    else
                        button.selected = true;
                }
            }
            else if (DOMEventManager.inst.isKeyPressed(17 /* Ctrl */) ||
                this.$selectionMode == 2 /* Multiple_SingleClick */)
                button.selected = !button.selected;
            else {
                if (!button.selected) {
                    this.clearSelectionExcept(button);
                    button.selected = true;
                }
                else
                    this.clearSelectionExcept(button);
            }
        }
        if (!dontChangeLastIndex)
            this.$lastSelectedIndex = index;
        if (button.selected)
            this.updateSelectionController(index);
    }
    resizeToFit(itemCount = 1000000, minSize = 0) {
        this.ensureBoundsCorrect();
        const curCount = this.numItems;
        if (itemCount > curCount)
            itemCount = curCount;
        if (this.$virtual) {
            const lineCount = Math.ceil(itemCount / this.$curLineItemCount);
            if (this.$layout == 0 /* SingleColumn */ ||
                this.$layout == 2 /* FlowHorizontal */)
                this.viewHeight = lineCount * this.$itemSize.y + Math.max(0, lineCount - 1) * this.$lineGap;
            else
                this.viewWidth = lineCount * this.$itemSize.x + Math.max(0, lineCount - 1) * this.$columnGap;
        }
        else if (itemCount == 0) {
            if (this.$layout == 0 /* SingleColumn */ ||
                this.$layout == 2 /* FlowHorizontal */)
                this.viewHeight = minSize;
            else
                this.viewWidth = minSize;
        }
        else {
            let i = itemCount - 1;
            let obj;
            while (i >= 0) {
                obj = this.getChildAt(i);
                if (!this.foldInvisibleItems || obj.visible)
                    break;
                i--;
            }
            if (i < 0) {
                if (this.$layout == 0 /* SingleColumn */ ||
                    this.$layout == 2 /* FlowHorizontal */)
                    this.viewHeight = minSize;
                else
                    this.viewWidth = minSize;
            }
            else {
                let size = 0;
                if (this.$layout == 0 /* SingleColumn */ ||
                    this.$layout == 2 /* FlowHorizontal */) {
                    size = obj.y + obj.height;
                    if (size < minSize)
                        size = minSize;
                    this.viewHeight = size;
                }
                else {
                    size = obj.x + obj.width;
                    if (size < minSize)
                        size = minSize;
                    this.viewWidth = size;
                }
            }
        }
    }
    getMaxItemWidth() {
        const cnt = this.$children.length;
        let max = 0;
        for (let i = 0; i < cnt; i++) {
            const child = this.getChildAt(i);
            if (child.width > max)
                max = child.width;
        }
        return max;
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        this.setBoundsChangedFlag();
        if (this.$virtual)
            this.setVirtualListChangedFlag(true);
    }
    handleControllerChanged(c) {
        super.handleControllerChanged(c);
        if (this.$selectionController == c)
            this.selectedIndex = c.selectedIndex;
    }
    updateSelectionController(index) {
        if (this.$selectionController != null &&
            !this.$selectionController.$updating &&
            index < this.selectionController.pageCount) {
            const c = this.$selectionController;
            this.$selectionController = null;
            c.selectedIndex = index;
            this.$selectionController = c;
        }
    }
    getSnappingPosition(xValue, yValue, resultPoint = null) {
        if (this.$virtual) {
            if (!resultPoint)
                resultPoint = new createjs.Point();
            let saved;
            let index;
            if (this.$layout == 0 /* SingleColumn */ ||
                this.$layout == 2 /* FlowHorizontal */) {
                saved = yValue;
                GList.$lastPosHelper = yValue;
                index = this.getIndexOnPos1(false);
                yValue = GList.$lastPosHelper;
                if (index < this.$virtualItems.length &&
                    saved - yValue > this.$virtualItems[index].height / 2 &&
                    index < this.$realNumItems)
                    yValue += this.$virtualItems[index].height + this.$lineGap;
            }
            else if (this.$layout == 1 /* SingleRow */ ||
                this.$layout == 3 /* FlowVertical */) {
                saved = xValue;
                GList.$lastPosHelper = xValue;
                index = this.getIndexOnPos2(false);
                xValue = GList.$lastPosHelper;
                if (index < this.$virtualItems.length &&
                    saved - xValue > this.$virtualItems[index].width / 2 &&
                    index < this.$realNumItems)
                    xValue += this.$virtualItems[index].width + this.$columnGap;
            }
            else {
                saved = xValue;
                GList.$lastPosHelper = xValue;
                index = this.getIndexOnPos3(false);
                xValue = GList.$lastPosHelper;
                if (index < this.$virtualItems.length &&
                    saved - xValue > this.$virtualItems[index].width / 2 &&
                    index < this.$realNumItems)
                    xValue += this.$virtualItems[index].width + this.$columnGap;
            }
            resultPoint.x = xValue;
            resultPoint.y = yValue;
            return resultPoint;
        }
        else
            return super.getSnappingPosition(xValue, yValue, resultPoint);
    }
    scrollToView(index, ani = false, snapToFirst = false) {
        if (this.$virtual) {
            if (this.$numItems == 0)
                return;
            this.checkVirtualList();
            if (index >= this.$virtualItems.length)
                throw new Error(`Invalid child index: ${index} is larger than max length: ${this.$virtualItems.length}`);
            if (this.$loop)
                index = Math.floor(this.$firstIndex / this.$numItems) * this.$numItems + index;
            let rect;
            const ii = this.$virtualItems[index];
            let pos = 0;
            let i;
            if (this.$layout == 0 /* SingleColumn */ ||
                this.$layout == 2 /* FlowHorizontal */) {
                for (i = 0; i < index; i += this.$curLineItemCount)
                    pos += this.$virtualItems[i].height + this.$lineGap;
                rect = new createjs.Rectangle(0, pos, this.$itemSize.x, ii.height);
            }
            else if (this.$layout == 1 /* SingleRow */ ||
                this.$layout == 3 /* FlowVertical */) {
                for (i = 0; i < index; i += this.$curLineItemCount)
                    pos += this.$virtualItems[i].width + this.$columnGap;
                rect = new createjs.Rectangle(pos, 0, ii.width, this.$itemSize.y);
            }
            else {
                const page = index / (this.$curLineItemCount * this.$curLineItemCount2);
                rect = new createjs.Rectangle(page * this.viewWidth + (index % this.$curLineItemCount) * (ii.width + this.$columnGap), ((index / this.$curLineItemCount) % this.$curLineItemCount2) *
                    (ii.height + this.$lineGap), ii.width, ii.height);
            }
            //the position will be also changed if the height of its parent (if changeable) is being changed, so here we need to forcely set this to true
            snapToFirst = true;
            if (this.$scrollPane != null)
                this.$scrollPane.scrollToView(rect, ani, snapToFirst);
        }
        else {
            const obj = this.getChildAt(index);
            if (this.$scrollPane != null)
                this.$scrollPane.scrollToView(obj, ani, snapToFirst);
            else if (this.parent != null && this.parent.scrollPane != null)
                this.parent.scrollPane.scrollToView(obj, ani, snapToFirst);
        }
    }
    getFirstChildInView() {
        return this.childIndexToItemIndex(super.getFirstChildInView());
    }
    childIndexToItemIndex(index) {
        if (!this.$virtual)
            return index;
        if (this.$layout == 4 /* Pagination */) {
            for (let i = this.$firstIndex; i < this.$realNumItems; i++) {
                if (this.$virtualItems[i].obj != null) {
                    index--;
                    if (index < 0)
                        return i;
                }
            }
            return index;
        }
        else {
            index += this.$firstIndex;
            if (this.$loop && this.$numItems > 0)
                index = index % this.$numItems;
            return index;
        }
    }
    itemIndexToChildIndex(index) {
        if (!this.$virtual)
            return index;
        if (this.$layout == 4 /* Pagination */)
            return this.getChildIndex(this.$virtualItems[index].obj);
        else {
            if (this.$loop && this.$numItems > 0) {
                const j = this.$firstIndex % this.$numItems;
                if (index >= j)
                    index = this.$firstIndex + (index - j);
                else
                    index = this.$firstIndex + this.$numItems + (j - index);
            }
            else
                index -= this.$firstIndex;
            return index;
        }
    }
    setVirtual() {
        this.$setVirtual(false);
    }
    setVirtualAndLoop() {
        this.$setVirtual(true);
    }
    $setVirtual(loop) {
        if (!this.$virtual) {
            if (this.$scrollPane == null)
                throw new Error('Virtual list must be scrollable');
            if (loop) {
                if (this.$layout == 2 /* FlowHorizontal */ ||
                    this.$layout == 3 /* FlowVertical */)
                    throw new Error('Virtual list with loop mode is not supported for both FlowHorizontal and FlowVertical layout');
                this.$scrollPane.bouncebackEffect = false;
            }
            this.$virtual = true;
            this.$loop = loop;
            this.$virtualItems = [];
            this.removeChildrenToPool();
            if (this.$itemSize == null) {
                this.$itemSize = new createjs.Point();
                const obj = this.getFromPool(null);
                if (obj == null)
                    throw new Error('Virtual list must have a default list item resource specified through list.defaultItem = resUrl.');
                else {
                    this.$itemSize.x = obj.width;
                    this.$itemSize.y = obj.height;
                }
                this.returnToPool(obj);
            }
            if (this.$layout == 0 /* SingleColumn */ ||
                this.$layout == 2 /* FlowHorizontal */) {
                this.$scrollPane.scrollSpeed = this.$itemSize.y;
                if (this.$loop)
                    this.$scrollPane.$loop = 2;
            }
            else {
                this.$scrollPane.scrollSpeed = this.$itemSize.x;
                if (this.$loop)
                    this.$scrollPane.$loop = 1;
            }
            this.$scrollPane.on("__scroll" /* SCROLL */, this.$scrolled, this);
            this.setVirtualListChangedFlag(true);
        }
    }
    get numItems() {
        if (this.$virtual)
            return this.$numItems;
        else
            return this.$children.length;
    }
    set numItems(value) {
        let i;
        if (this.$virtual) {
            if (this.itemRenderer == null)
                throw new Error('list.itemRenderer is required');
            this.$numItems = value;
            if (this.$loop)
                this.$realNumItems = this.$numItems * 6;
            //enlarge for loop
            else
                this.$realNumItems = this.$numItems;
            //increase only
            const oldCount = this.$virtualItems.length;
            if (this.$realNumItems > oldCount) {
                for (i = oldCount; i < this.$realNumItems; i++) {
                    let ii = new ItemInfo();
                    ii.width = this.$itemSize.x;
                    ii.height = this.$itemSize.y;
                    this.$virtualItems.push(ii);
                }
            }
            else {
                for (i = this.$realNumItems; i < oldCount; i++)
                    this.$virtualItems[i].selected = false;
            }
            if (this.$virtualListChanged != 0 /* None */)
                GTimer.inst.remove(this.$refreshVirtualList, this);
            //refresh now
            this.$refreshVirtualList();
        }
        else {
            const cnt = this.$children.length;
            if (value > cnt) {
                for (i = cnt; i < value; i++) {
                    if (this.itemProvider == null)
                        this.addItemFromPool();
                    else
                        this.addItemFromPool(this.itemProvider(i));
                }
            }
            else
                this.removeChildrenToPool(value, cnt);
            if (this.itemRenderer != null) {
                for (i = 0; i < value; i++)
                    this.itemRenderer(i, this.getChildAt(i));
            }
        }
    }
    refreshVirtualList() {
        this.setVirtualListChangedFlag(false);
    }
    checkVirtualList() {
        if (this.$virtualListChanged != 0 /* None */) {
            this.$refreshVirtualList();
            GTimer.inst.remove(this.$refreshVirtualList, this);
        }
    }
    setVirtualListChangedFlag(layoutChanged = false) {
        if (layoutChanged)
            this.$virtualListChanged = 2 /* SizeChanged */;
        else if (this.$virtualListChanged == 0 /* None */)
            this.$virtualListChanged = 1 /* ContentChanged */;
        GTimer.inst.callLater(this.$refreshVirtualList, this);
    }
    $refreshVirtualList() {
        const layoutChanged = this.$virtualListChanged == 2 /* SizeChanged */;
        this.$virtualListChanged = 0 /* None */;
        this.$eventLocked = true;
        if (layoutChanged) {
            if (this.$layout == 0 /* SingleColumn */ || this.$layout == 1 /* SingleRow */)
                this.$curLineItemCount = 1;
            else if (this.$layout == 2 /* FlowHorizontal */) {
                if (this.$columnCount > 0)
                    this.$curLineItemCount = this.$columnCount;
                else {
                    this.$curLineItemCount = Math.floor((this.$scrollPane.viewWidth + this.$columnGap) / (this.$itemSize.x + this.$columnGap));
                    if (this.$curLineItemCount <= 0)
                        this.$curLineItemCount = 1;
                }
            }
            else if (this.$layout == 3 /* FlowVertical */) {
                if (this.$lineCount > 0)
                    this.$curLineItemCount = this.$lineCount;
                else {
                    this.$curLineItemCount = Math.floor((this.$scrollPane.viewHeight + this.$lineGap) / (this.$itemSize.y + this.$lineGap));
                    if (this.$curLineItemCount <= 0)
                        this.$curLineItemCount = 1;
                }
            } //pagination
            else {
                if (this.$columnCount > 0)
                    this.$curLineItemCount = this.$columnCount;
                else {
                    this.$curLineItemCount = Math.floor((this.$scrollPane.viewWidth + this.$columnGap) / (this.$itemSize.x + this.$columnGap));
                    if (this.$curLineItemCount <= 0)
                        this.$curLineItemCount = 1;
                }
                if (this.$lineCount > 0)
                    this.$curLineItemCount2 = this.$lineCount;
                else {
                    this.$curLineItemCount2 = Math.floor((this.$scrollPane.viewHeight + this.$lineGap) / (this.$itemSize.y + this.$lineGap));
                    if (this.$curLineItemCount2 <= 0)
                        this.$curLineItemCount2 = 1;
                }
            }
        }
        let ch = 0, cw = 0;
        if (this.$realNumItems > 0) {
            let i;
            let len = Math.ceil(this.$realNumItems / this.$curLineItemCount) * this.$curLineItemCount;
            let len2 = Math.min(this.$curLineItemCount, this.$realNumItems);
            if (this.$layout == 0 /* SingleColumn */ ||
                this.$layout == 2 /* FlowHorizontal */) {
                for (i = 0; i < len; i += this.$curLineItemCount)
                    ch += this.$virtualItems[i].height + this.$lineGap;
                if (ch > 0)
                    ch -= this.$lineGap;
                if (this.$autoResizeItem)
                    cw = this.$scrollPane.viewWidth;
                else {
                    for (i = 0; i < len2; i++)
                        cw += this.$virtualItems[i].width + this.$columnGap;
                    if (cw > 0)
                        cw -= this.$columnGap;
                }
            }
            else if (this.$layout == 1 /* SingleRow */ ||
                this.$layout == 3 /* FlowVertical */) {
                for (i = 0; i < len; i += this.$curLineItemCount)
                    cw += this.$virtualItems[i].width + this.$columnGap;
                if (cw > 0)
                    cw -= this.$columnGap;
                if (this.$autoResizeItem)
                    ch = this.$scrollPane.viewHeight;
                else {
                    for (i = 0; i < len2; i++)
                        ch += this.$virtualItems[i].height + this.$lineGap;
                    if (ch > 0)
                        ch -= this.$lineGap;
                }
            }
            else {
                const pageCount = Math.ceil(len / (this.$curLineItemCount * this.$curLineItemCount2));
                cw = pageCount * this.viewWidth;
                ch = this.viewHeight;
            }
        }
        this.handleAlign(cw, ch);
        this.$scrollPane.setContentSize(cw, ch);
        this.$eventLocked = false;
        this.handleScroll(true);
    }
    $scrolled() {
        this.handleScroll(false);
    }
    getIndexOnPos1(forceUpdate) {
        if (this.$realNumItems < this.$curLineItemCount) {
            GList.$lastPosHelper = 0;
            return 0;
        }
        let i;
        let pos2;
        let pos3;
        if (this.numChildren > 0 && !forceUpdate) {
            pos2 = this.getChildAt(0).y;
            if (pos2 > GList.$lastPosHelper) {
                for (i = this.$firstIndex - this.$curLineItemCount; i >= 0; i -= this.$curLineItemCount) {
                    pos2 -= this.$virtualItems[i].height + this.$lineGap;
                    if (pos2 <= GList.$lastPosHelper) {
                        GList.$lastPosHelper = pos2;
                        return i;
                    }
                }
                GList.$lastPosHelper = 0;
                return 0;
            }
            else {
                for (i = this.$firstIndex; i < this.$realNumItems; i += this.$curLineItemCount) {
                    pos3 = pos2 + this.$virtualItems[i].height + this.$lineGap;
                    if (pos3 > GList.$lastPosHelper) {
                        GList.$lastPosHelper = pos2;
                        return i;
                    }
                    pos2 = pos3;
                }
                GList.$lastPosHelper = pos2;
                return this.$realNumItems - this.$curLineItemCount;
            }
        }
        else {
            pos2 = 0;
            for (i = 0; i < this.$realNumItems; i += this.$curLineItemCount) {
                pos3 = pos2 + this.$virtualItems[i].height + this.$lineGap;
                if (pos3 > GList.$lastPosHelper) {
                    GList.$lastPosHelper = pos2;
                    return i;
                }
                pos2 = pos3;
            }
            GList.$lastPosHelper = pos2;
            return this.$realNumItems - this.$curLineItemCount;
        }
    }
    getIndexOnPos2(forceUpdate) {
        if (this.$realNumItems < this.$curLineItemCount) {
            GList.$lastPosHelper = 0;
            return 0;
        }
        let i;
        let pos2;
        let pos3;
        if (this.numChildren > 0 && !forceUpdate) {
            pos2 = this.getChildAt(0).x;
            if (pos2 > GList.$lastPosHelper) {
                for (i = this.$firstIndex - this.$curLineItemCount; i >= 0; i -= this.$curLineItemCount) {
                    pos2 -= this.$virtualItems[i].width + this.$columnGap;
                    if (pos2 <= GList.$lastPosHelper) {
                        GList.$lastPosHelper = pos2;
                        return i;
                    }
                }
                GList.$lastPosHelper = 0;
                return 0;
            }
            else {
                for (i = this.$firstIndex; i < this.$realNumItems; i += this.$curLineItemCount) {
                    pos3 = pos2 + this.$virtualItems[i].width + this.$columnGap;
                    if (pos3 > GList.$lastPosHelper) {
                        GList.$lastPosHelper = pos2;
                        return i;
                    }
                    pos2 = pos3;
                }
                GList.$lastPosHelper = pos2;
                return this.$realNumItems - this.$curLineItemCount;
            }
        }
        else {
            pos2 = 0;
            for (i = 0; i < this.$realNumItems; i += this.$curLineItemCount) {
                pos3 = pos2 + this.$virtualItems[i].width + this.$columnGap;
                if (pos3 > GList.$lastPosHelper) {
                    GList.$lastPosHelper = pos2;
                    return i;
                }
                pos2 = pos3;
            }
            GList.$lastPosHelper = pos2;
            return this.$realNumItems - this.$curLineItemCount;
        }
    }
    getIndexOnPos3(forceUpdate) {
        if (this.$realNumItems < this.$curLineItemCount) {
            GList.$lastPosHelper = 0;
            return 0;
        }
        const viewWidth = this.viewWidth;
        const page = Math.floor(GList.$lastPosHelper / viewWidth);
        const startIndex = page * (this.$curLineItemCount * this.$curLineItemCount2);
        let i;
        let pos3;
        let pos2 = page * viewWidth;
        for (i = 0; i < this.$curLineItemCount; i++) {
            pos3 = pos2 + this.$virtualItems[startIndex + i].width + this.$columnGap;
            if (pos3 > GList.$lastPosHelper) {
                GList.$lastPosHelper = pos2;
                return startIndex + i;
            }
            pos2 = pos3;
        }
        GList.$lastPosHelper = pos2;
        return startIndex + this.$curLineItemCount - 1;
    }
    handleScroll(forceUpdate) {
        if (this.$eventLocked)
            return;
        this.$enterCounter = 0;
        if (this.$layout == 0 /* SingleColumn */ ||
            this.$layout == 2 /* FlowHorizontal */) {
            this.handleScroll1(forceUpdate);
            this.handleArchOrder1();
        }
        else if (this.$layout == 1 /* SingleRow */ ||
            this.$layout == 3 /* FlowVertical */) {
            this.handleScroll2(forceUpdate);
            this.handleArchOrder2();
        }
        else
            this.handleScroll3(forceUpdate);
        this.$boundsChanged = false;
    }
    handleScroll1(forceUpdate) {
        this.$enterCounter++;
        if (this.$enterCounter > 3) {
            console.warn('this list view cannot be filled full as the itemRenderer function always returns an item with different size.');
            return;
        }
        let pos = this.$scrollPane.scrollingPosY;
        let max = pos + this.$scrollPane.viewHeight;
        const end = max == this.$scrollPane.contentHeight; //indicates we need to scroll to end in spite of content size changing
        //find the first item from current pos
        GList.$lastPosHelper = pos;
        const newFirstIndex = this.getIndexOnPos1(forceUpdate);
        if (newFirstIndex == this.$firstIndex && !forceUpdate)
            return;
        pos = GList.$lastPosHelper;
        const oldFirstIndex = this.$firstIndex;
        this.$firstIndex = newFirstIndex;
        let curIndex = newFirstIndex;
        const forward = oldFirstIndex > newFirstIndex;
        const oldCount = this.numChildren;
        const lastIndex = oldFirstIndex + oldCount - 1;
        let reuseIndex = forward ? lastIndex : oldFirstIndex;
        let curX = 0, curY = pos;
        let needRender;
        let deltaSize = 0;
        let firstItemDeltaSize = 0;
        let url = this.defaultItem;
        let ii, ii2;
        let i, j;
        const partSize = (this.$scrollPane.viewWidth - this.$columnGap * (this.$curLineItemCount - 1)) /
            this.$curLineItemCount;
        this.$itemInfoVer++;
        while (curIndex < this.$realNumItems && (end || curY < max)) {
            ii = this.$virtualItems[curIndex];
            if (ii.obj == null || forceUpdate) {
                if (this.itemProvider != null) {
                    url = this.itemProvider(curIndex % this.$numItems);
                    if (url == null)
                        url = this.$defaultItem;
                    url = UIPackage.normalizeURL(url);
                }
                if (ii.obj != null && ii.obj.resourceURL != url) {
                    if (ii.obj instanceof GButton)
                        ii.selected = ii.obj.selected;
                    this.removeChildToPool(ii.obj);
                    ii.obj = null;
                }
            }
            if (ii.obj == null) {
                //search for a most suitable item to reuse in order to render or create less item when refresh
                if (forward) {
                    for (j = reuseIndex; j >= oldFirstIndex; j--) {
                        ii2 = this.$virtualItems[j];
                        if (ii2.obj != null &&
                            ii2.updateFlag != this.$itemInfoVer &&
                            ii2.obj.resourceURL == url) {
                            if (ii2.obj instanceof GButton)
                                ii2.selected = ii2.obj.selected;
                            ii.obj = ii2.obj;
                            ii2.obj = null;
                            if (j == reuseIndex)
                                reuseIndex--;
                            break;
                        }
                    }
                }
                else {
                    for (j = reuseIndex; j <= lastIndex; j++) {
                        ii2 = this.$virtualItems[j];
                        if (ii2.obj != null &&
                            ii2.updateFlag != this.$itemInfoVer &&
                            ii2.obj.resourceURL == url) {
                            if (ii2.obj instanceof GButton)
                                ii2.selected = ii2.obj.selected;
                            ii.obj = ii2.obj;
                            ii2.obj = null;
                            if (j == reuseIndex)
                                reuseIndex++;
                            break;
                        }
                    }
                }
                if (ii.obj != null)
                    this.setChildIndex(ii.obj, forward ? curIndex - newFirstIndex : this.numChildren);
                else {
                    ii.obj = this.$pool.get(url);
                    if (forward)
                        this.addChildAt(ii.obj, curIndex - newFirstIndex);
                    else
                        this.addChild(ii.obj);
                }
                if (ii.obj instanceof GButton)
                    ii.obj.selected = ii.selected;
                needRender = true;
            }
            else
                needRender = forceUpdate;
            if (needRender) {
                if (this.$autoResizeItem &&
                    (this.$layout == 0 /* SingleColumn */ || this.$columnCount > 0))
                    ii.obj.setSize(partSize, ii.obj.height, true);
                this.itemRenderer(curIndex % this.$numItems, ii.obj);
                if (curIndex % this.$curLineItemCount == 0) {
                    deltaSize += Math.ceil(ii.obj.height) - ii.height;
                    if (curIndex == newFirstIndex && oldFirstIndex > newFirstIndex) {
                        //when scrolling down, we need to make compensation for the position to avoid flickering if the item's size changes
                        firstItemDeltaSize = Math.ceil(ii.obj.height) - ii.height;
                    }
                }
                ii.width = Math.ceil(ii.obj.width);
                ii.height = Math.ceil(ii.obj.height);
            }
            ii.updateFlag = this.$itemInfoVer;
            ii.obj.setXY(curX, curY);
            if (curIndex == newFirstIndex)
                //pad one more
                max += ii.height;
            curX += ii.width + this.$columnGap;
            if (curIndex % this.$curLineItemCount == this.$curLineItemCount - 1) {
                curX = 0;
                curY += ii.height + this.$lineGap;
            }
            curIndex++;
        }
        for (i = 0; i < oldCount; i++) {
            ii = this.$virtualItems[oldFirstIndex + i];
            if (ii.updateFlag != this.$itemInfoVer && ii.obj != null) {
                if (ii.obj instanceof GButton)
                    ii.selected = ii.obj.selected;
                this.removeChildToPool(ii.obj);
                ii.obj = null;
            }
        }
        if (deltaSize != 0 || firstItemDeltaSize != 0)
            this.$scrollPane.changeContentSizeOnScrolling(0, deltaSize, 0, firstItemDeltaSize);
        if (curIndex > 0 &&
            this.numChildren > 0 &&
            this.$container.y < 0 &&
            this.getChildAt(0).y > -this.$container.y)
            //last page is not full
            this.handleScroll1(false); //recursive
    }
    handleScroll2(forceUpdate) {
        this.$enterCounter++;
        if (this.$enterCounter > 3) {
            console.warn('this list view cannot be filled full as the itemRenderer function always returns an item with different size.');
            return;
        }
        let pos = this.$scrollPane.scrollingPosX;
        let max = pos + this.$scrollPane.viewWidth;
        const end = pos == this.$scrollPane.contentWidth;
        GList.$lastPosHelper = pos;
        const newFirstIndex = this.getIndexOnPos2(forceUpdate);
        if (newFirstIndex == this.$firstIndex && !forceUpdate)
            return;
        pos = GList.$lastPosHelper;
        const oldFirstIndex = this.$firstIndex;
        this.$firstIndex = newFirstIndex;
        let curIndex = newFirstIndex;
        const forward = oldFirstIndex > newFirstIndex;
        const oldCount = this.numChildren;
        let lastIndex = oldFirstIndex + oldCount - 1;
        let reuseIndex = forward ? lastIndex : oldFirstIndex;
        let curX = pos, curY = 0;
        let needRender;
        let deltaSize = 0;
        let firstItemDeltaSize = 0;
        let url = this.defaultItem;
        let ii, ii2;
        let i, j;
        const partSize = (this.$scrollPane.viewHeight - this.$lineGap * (this.$curLineItemCount - 1)) /
            this.$curLineItemCount;
        this.$itemInfoVer++;
        while (curIndex < this.$realNumItems && (end || curX < max)) {
            ii = this.$virtualItems[curIndex];
            if (ii.obj == null || forceUpdate) {
                if (this.itemProvider != null) {
                    url = this.itemProvider(curIndex % this.$numItems);
                    if (url == null)
                        url = this.$defaultItem;
                    url = UIPackage.normalizeURL(url);
                }
                if (ii.obj != null && ii.obj.resourceURL != url) {
                    if (ii.obj instanceof GButton)
                        ii.selected = ii.obj.selected;
                    this.removeChildToPool(ii.obj);
                    ii.obj = null;
                }
            }
            if (ii.obj == null) {
                if (forward) {
                    for (j = reuseIndex; j >= oldFirstIndex; j--) {
                        ii2 = this.$virtualItems[j];
                        if (ii2.obj != null &&
                            ii2.updateFlag != this.$itemInfoVer &&
                            ii2.obj.resourceURL == url) {
                            if (ii2.obj instanceof GButton)
                                ii2.selected = ii2.obj.selected;
                            ii.obj = ii2.obj;
                            ii2.obj = null;
                            if (j == reuseIndex)
                                reuseIndex--;
                            break;
                        }
                    }
                }
                else {
                    for (j = reuseIndex; j <= lastIndex; j++) {
                        ii2 = this.$virtualItems[j];
                        if (ii2.obj != null &&
                            ii2.updateFlag != this.$itemInfoVer &&
                            ii2.obj.resourceURL == url) {
                            if (ii2.obj instanceof GButton)
                                ii2.selected = ii2.obj.selected;
                            ii.obj = ii2.obj;
                            ii2.obj = null;
                            if (j == reuseIndex)
                                reuseIndex++;
                            break;
                        }
                    }
                }
                if (ii.obj != null)
                    this.setChildIndex(ii.obj, forward ? curIndex - newFirstIndex : this.numChildren);
                else {
                    ii.obj = this.$pool.get(url);
                    if (forward)
                        this.addChildAt(ii.obj, curIndex - newFirstIndex);
                    else
                        this.addChild(ii.obj);
                }
                if (ii.obj instanceof GButton)
                    ii.obj.selected = ii.selected;
                needRender = true;
            }
            else
                needRender = forceUpdate;
            if (needRender) {
                if (this.$autoResizeItem &&
                    (this.$layout == 1 /* SingleRow */ || this.$lineCount > 0))
                    ii.obj.setSize(ii.obj.width, partSize, true);
                this.itemRenderer(curIndex % this.$numItems, ii.obj);
                if (curIndex % this.$curLineItemCount == 0) {
                    deltaSize += Math.ceil(ii.obj.width) - ii.width;
                    if (curIndex == newFirstIndex && oldFirstIndex > newFirstIndex)
                        firstItemDeltaSize = Math.ceil(ii.obj.width) - ii.width;
                }
                ii.width = Math.ceil(ii.obj.width);
                ii.height = Math.ceil(ii.obj.height);
            }
            ii.updateFlag = this.$itemInfoVer;
            ii.obj.setXY(curX, curY);
            if (curIndex == newFirstIndex)
                max += ii.width;
            curY += ii.height + this.$lineGap;
            if (curIndex % this.$curLineItemCount == this.$curLineItemCount - 1) {
                curY = 0;
                curX += ii.width + this.$columnGap;
            }
            curIndex++;
        }
        for (i = 0; i < oldCount; i++) {
            ii = this.$virtualItems[oldFirstIndex + i];
            if (ii.updateFlag != this.$itemInfoVer && ii.obj != null) {
                if (ii.obj instanceof GButton)
                    ii.selected = ii.obj.selected;
                this.removeChildToPool(ii.obj);
                ii.obj = null;
            }
        }
        if (deltaSize != 0 || firstItemDeltaSize != 0)
            this.$scrollPane.changeContentSizeOnScrolling(deltaSize, 0, firstItemDeltaSize, 0);
        if (curIndex > 0 &&
            this.numChildren > 0 &&
            this.$container.x < 0 &&
            this.getChildAt(0).x > -this.$container.x)
            this.handleScroll2(false);
    }
    handleScroll3(forceUpdate) {
        let pos = this.$scrollPane.scrollingPosX;
        GList.$lastPosHelper = pos;
        const newFirstIndex = this.getIndexOnPos3(forceUpdate);
        if (newFirstIndex == this.$firstIndex && !forceUpdate)
            return;
        pos = GList.$lastPosHelper;
        const oldFirstIndex = this.$firstIndex;
        this.$firstIndex = newFirstIndex;
        //height-sync is not supported in pagnation mode, so just only render 1 page
        let reuseIndex = oldFirstIndex;
        const virtualItemCount = this.$virtualItems.length;
        const pageSize = this.$curLineItemCount * this.$curLineItemCount2;
        const startCol = newFirstIndex % this.$curLineItemCount;
        const viewWidth = this.viewWidth;
        const page = Math.floor(newFirstIndex / pageSize);
        const startIndex = page * pageSize;
        const lastIndex = startIndex + pageSize * 2;
        let needRender;
        let i;
        let ii, ii2;
        let col;
        let url = this.$defaultItem;
        const partWidth = (this.$scrollPane.viewWidth - this.$columnGap * (this.$curLineItemCount - 1)) /
            this.$curLineItemCount;
        const partHeight = (this.$scrollPane.viewHeight - this.$lineGap * (this.$curLineItemCount2 - 1)) /
            this.$curLineItemCount2;
        this.$itemInfoVer++;
        //add mark for items used this time
        for (i = startIndex; i < lastIndex; i++) {
            if (i >= this.$realNumItems)
                continue;
            col = i % this.$curLineItemCount;
            if (i - startIndex < pageSize) {
                if (col < startCol)
                    continue;
            }
            else {
                if (col > startCol)
                    continue;
            }
            ii = this.$virtualItems[i];
            ii.updateFlag = this.$itemInfoVer;
        }
        let lastObj = null;
        let insertIndex = 0;
        for (i = startIndex; i < lastIndex; i++) {
            if (i >= this.$realNumItems)
                continue;
            ii = this.$virtualItems[i];
            if (ii.updateFlag != this.$itemInfoVer)
                continue;
            if (ii.obj == null) {
                //find if any free item can be used
                while (reuseIndex < virtualItemCount) {
                    ii2 = this.$virtualItems[reuseIndex];
                    if (ii2.obj != null && ii2.updateFlag != this.$itemInfoVer) {
                        if (ii2.obj instanceof GButton)
                            ii2.selected = ii2.obj.selected;
                        ii.obj = ii2.obj;
                        ii2.obj = null;
                        break;
                    }
                    reuseIndex++;
                }
                if (insertIndex == -1)
                    insertIndex = this.getChildIndex(lastObj) + 1;
                if (ii.obj == null) {
                    if (this.itemProvider != null) {
                        url = this.itemProvider(i % this.$numItems);
                        if (url == null)
                            url = this.$defaultItem;
                        url = UIPackage.normalizeURL(url);
                    }
                    ii.obj = this.$pool.get(url);
                    this.addChildAt(ii.obj, insertIndex);
                }
                else
                    insertIndex = this.setChildIndexBefore(ii.obj, insertIndex);
                insertIndex++;
                if (ii.obj instanceof GButton)
                    ii.obj.selected = ii.selected;
                needRender = true;
            }
            else {
                needRender = forceUpdate;
                insertIndex = -1;
                lastObj = ii.obj;
            }
            if (needRender) {
                if (this.$autoResizeItem) {
                    if (this.$curLineItemCount == this.$columnCount &&
                        this.$curLineItemCount2 == this.$lineCount)
                        ii.obj.setSize(partWidth, partHeight, true);
                    else if (this.$curLineItemCount == this.$columnCount)
                        ii.obj.setSize(partWidth, ii.obj.height, true);
                    else if (this.$curLineItemCount2 == this.$lineCount)
                        ii.obj.setSize(ii.obj.width, partHeight, true);
                }
                this.itemRenderer(i % this.$numItems, ii.obj);
                ii.width = Math.ceil(ii.obj.width);
                ii.height = Math.ceil(ii.obj.height);
            }
        }
        //layout
        let borderX = (startIndex / pageSize) * viewWidth;
        let xx = borderX;
        let yy = 0;
        let lineHeight = 0;
        for (i = startIndex; i < lastIndex; i++) {
            if (i >= this.$realNumItems)
                continue;
            ii = this.$virtualItems[i];
            if (ii.updateFlag == this.$itemInfoVer)
                ii.obj.setXY(xx, yy);
            if (ii.height > lineHeight)
                lineHeight = ii.height;
            if (i % this.$curLineItemCount == this.$curLineItemCount - 1) {
                xx = borderX;
                yy += lineHeight + this.$lineGap;
                lineHeight = 0;
                if (i == startIndex + pageSize - 1) {
                    borderX += viewWidth;
                    xx = borderX;
                    yy = 0;
                }
            }
            else
                xx += ii.width + this.$columnGap;
        }
        //release items not used
        for (i = reuseIndex; i < virtualItemCount; i++) {
            ii = this.$virtualItems[i];
            if (ii.updateFlag != this.$itemInfoVer && ii.obj != null) {
                if (ii.obj instanceof GButton)
                    ii.selected = ii.obj.selected;
                this.removeChildToPool(ii.obj);
                ii.obj = null;
            }
        }
    }
    handleArchOrder1() {
        if (this.$childrenRenderOrder == 2 /* Arch */) {
            const mid = this.$scrollPane.posY + this.viewHeight / 2;
            let minDist = Number.POSITIVE_INFINITY;
            let dist = 0;
            let apexIndex = 0;
            const cnt = this.numChildren;
            for (let i = 0; i < cnt; i++) {
                const obj = this.getChildAt(i);
                if (!this.foldInvisibleItems || obj.visible) {
                    dist = Math.abs(mid - obj.y - obj.height / 2);
                    if (dist < minDist) {
                        minDist = dist;
                        apexIndex = i;
                    }
                }
            }
            this.apexIndex = apexIndex;
        }
    }
    handleArchOrder2() {
        if (this.childrenRenderOrder == 2 /* Arch */) {
            const mid = this.$scrollPane.posX + this.viewWidth / 2;
            let minDist = Number.POSITIVE_INFINITY;
            let dist = 0;
            let apexIndex = 0;
            const cnt = this.numChildren;
            for (let i = 0; i < cnt; i++) {
                const obj = this.getChildAt(i);
                if (!this.foldInvisibleItems || obj.visible) {
                    dist = Math.abs(mid - obj.x - obj.width / 2);
                    if (dist < minDist) {
                        minDist = dist;
                        apexIndex = i;
                    }
                }
            }
            this.apexIndex = apexIndex;
        }
    }
    handleAlign(contentWidth, contentHeight) {
        let newOffsetX = 0;
        let newOffsetY = 0;
        if (contentHeight < this.viewHeight) {
            if (this.$verticalAlign == 1 /* Middle */)
                newOffsetY = Math.floor((this.viewHeight - contentHeight) / 2);
            else if (this.$verticalAlign == 2 /* Bottom */)
                newOffsetY = this.viewHeight - contentHeight;
        }
        if (contentWidth < this.viewWidth) {
            if (this.$align == "center" /* Center */)
                newOffsetX = Math.floor((this.viewWidth - contentWidth) / 2);
            else if (this.$align == "right" /* Right */)
                newOffsetX = this.viewWidth - contentWidth;
        }
        if (newOffsetX != this.$alignOffset.x || newOffsetY != this.$alignOffset.y) {
            this.$alignOffset.setValues(newOffsetX, newOffsetY);
            if (this.$scrollPane != null)
                this.$scrollPane.adjustMaskContainer();
            else {
                this.$container.x = this.$margin.left + this.$alignOffset.x;
                this.$container.y = this.$margin.top + this.$alignOffset.y;
            }
        }
    }
    /**@override */
    updateBounds() {
        if (this.$virtual)
            return;
        let i;
        let child;
        let curX = 0;
        let curY = 0;
        let maxWidth = 0;
        let maxHeight = 0;
        let cw = 0, ch = 0;
        let j = 0;
        let page = 0;
        let k = 0;
        const cnt = this.$children.length;
        const viewWidth = this.viewWidth;
        const viewHeight = this.viewHeight;
        let lineSize = 0;
        let lineStart = 0;
        let ratio;
        if (this.$layout == 0 /* SingleColumn */) {
            for (i = 0; i < cnt; i++) {
                child = this.getChildAt(i);
                if (this.foldInvisibleItems && !child.visible)
                    continue;
                if (curY != 0)
                    curY += this.$lineGap;
                child.y = curY;
                if (this.$autoResizeItem)
                    child.setSize(viewWidth, child.height, true);
                curY += Math.ceil(child.height);
                if (child.width > maxWidth)
                    maxWidth = child.width;
            }
            cw = Math.ceil(maxWidth);
            ch = curY;
        }
        else if (this.$layout == 1 /* SingleRow */) {
            for (i = 0; i < cnt; i++) {
                child = this.getChildAt(i);
                if (this.foldInvisibleItems && !child.visible)
                    continue;
                if (curX != 0)
                    curX += this.$columnGap;
                child.x = curX;
                if (this.$autoResizeItem)
                    child.setSize(child.width, viewHeight, true);
                curX += Math.ceil(child.width);
                if (child.height > maxHeight)
                    maxHeight = child.height;
            }
            cw = curX;
            ch = Math.ceil(maxHeight);
        }
        else if (this.$layout == 2 /* FlowHorizontal */) {
            if (this.$autoResizeItem && this.$columnCount > 0) {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    lineSize += child.sourceWidth;
                    j++;
                    if (j == this.$columnCount || i == cnt - 1) {
                        ratio = (viewWidth - lineSize - (j - 1) * this.$columnGap) / lineSize;
                        curX = 0;
                        for (j = lineStart; j <= i; j++) {
                            child = this.getChildAt(j);
                            if (this.foldInvisibleItems && !child.visible)
                                continue;
                            child.setXY(curX, curY);
                            if (j < i) {
                                child.setSize(child.sourceWidth + Math.round(child.sourceWidth * ratio), child.height, true);
                                curX += Math.ceil(child.width) + this.$columnGap;
                            }
                            else
                                child.setSize(viewWidth - curX, child.height, true);
                            if (child.height > maxHeight)
                                maxHeight = child.height;
                        }
                        //new line
                        curY += Math.ceil(maxHeight) + this.$lineGap;
                        maxHeight = 0;
                        j = 0;
                        lineStart = i + 1;
                        lineSize = 0;
                    }
                }
                ch = curY + Math.ceil(maxHeight);
                cw = viewWidth;
            }
            else {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    if (curX != 0)
                        curX += this.$columnGap;
                    if ((this.$columnCount != 0 && j >= this.$columnCount) ||
                        (this.$columnCount == 0 && curX + child.width > viewWidth && maxHeight != 0)) {
                        //new line
                        curX = 0;
                        curY += Math.ceil(maxHeight) + this.$lineGap;
                        maxHeight = 0;
                        j = 0;
                    }
                    child.setXY(curX, curY);
                    curX += Math.ceil(child.width);
                    if (curX > maxWidth)
                        maxWidth = curX;
                    if (child.height > maxHeight)
                        maxHeight = child.height;
                    j++;
                }
                ch = curY + Math.ceil(maxHeight);
                cw = Math.ceil(maxWidth);
            }
        }
        else if (this.$layout == 3 /* FlowVertical */) {
            if (this.$autoResizeItem && this.$lineCount > 0) {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    lineSize += child.sourceHeight;
                    j++;
                    if (j == this.$lineCount || i == cnt - 1) {
                        ratio = (viewHeight - lineSize - (j - 1) * this.$lineGap) / lineSize;
                        curY = 0;
                        for (j = lineStart; j <= i; j++) {
                            child = this.getChildAt(j);
                            if (this.foldInvisibleItems && !child.visible)
                                continue;
                            child.setXY(curX, curY);
                            if (j < i) {
                                child.setSize(child.width, child.sourceHeight + Math.round(child.sourceHeight * ratio), true);
                                curY += Math.ceil(child.height) + this.$lineGap;
                            }
                            else
                                child.setSize(child.width, viewHeight - curY, true);
                            if (child.width > maxWidth)
                                maxWidth = child.width;
                        }
                        //new line
                        curX += Math.ceil(maxWidth) + this.$columnGap;
                        maxWidth = 0;
                        j = 0;
                        lineStart = i + 1;
                        lineSize = 0;
                    }
                }
                cw = curX + Math.ceil(maxWidth);
                ch = viewHeight;
            }
            else {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    if (curY != 0)
                        curY += this.$lineGap;
                    if ((this.$lineCount != 0 && j >= this.$lineCount) ||
                        (this.$lineCount == 0 && curY + child.height > viewHeight && maxWidth != 0)) {
                        curY = 0;
                        curX += Math.ceil(maxWidth) + this.$columnGap;
                        maxWidth = 0;
                        j = 0;
                    }
                    child.setXY(curX, curY);
                    curY += Math.ceil(child.height);
                    if (curY > maxHeight)
                        maxHeight = curY;
                    if (child.width > maxWidth)
                        maxWidth = child.width;
                    j++;
                }
                cw = curX + Math.ceil(maxWidth);
                ch = Math.ceil(maxHeight);
            }
        } //pagination
        else {
            let eachHeight;
            if (this.$autoResizeItem && this.$lineCount > 0)
                eachHeight = Math.floor((viewHeight - (this.$lineCount - 1) * this.$lineGap) / this.$lineCount);
            if (this.$autoResizeItem && this.$columnCount > 0) {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    lineSize += child.sourceWidth;
                    j++;
                    if (j == this.$columnCount || i == cnt - 1) {
                        ratio = (viewWidth - lineSize - (j - 1) * this.$columnGap) / lineSize;
                        curX = 0;
                        for (j = lineStart; j <= i; j++) {
                            child = this.getChildAt(j);
                            if (this.foldInvisibleItems && !child.visible)
                                continue;
                            child.setXY(page * viewWidth + curX, curY);
                            if (j < i) {
                                child.setSize(child.sourceWidth + Math.round(child.sourceWidth * ratio), this.$lineCount > 0 ? eachHeight : child.height, true);
                                curX += Math.ceil(child.width) + this.$columnGap;
                            }
                            else
                                child.setSize(viewWidth - curX, this.$lineCount > 0 ? eachHeight : child.height, true);
                            if (child.height > maxHeight)
                                maxHeight = child.height;
                        }
                        //new line
                        curY += Math.ceil(maxHeight) + this.$lineGap;
                        maxHeight = 0;
                        j = 0;
                        lineStart = i + 1;
                        lineSize = 0;
                        k++;
                        if ((this.$lineCount != 0 && k >= this.$lineCount) ||
                            (this.$lineCount == 0 && curY + child.height > viewHeight)) {
                            //new page
                            page++;
                            curY = 0;
                            k = 0;
                        }
                    }
                }
            }
            else {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    if (curX != 0)
                        curX += this.$columnGap;
                    if (this.$autoResizeItem && this.$lineCount > 0)
                        child.setSize(child.width, eachHeight, true);
                    if ((this.$columnCount != 0 && j >= this.$columnCount) ||
                        (this.$columnCount == 0 && curX + child.width > viewWidth && maxHeight != 0)) {
                        //new line
                        curX = 0;
                        curY += Math.ceil(maxHeight) + this.$lineGap;
                        maxHeight = 0;
                        j = 0;
                        k++;
                        if ((this.$lineCount != 0 && k >= this.$lineCount) ||
                            (this.$lineCount == 0 && curY + child.height > viewHeight && maxWidth != 0)) {
                            //new page
                            page++;
                            curY = 0;
                            k = 0;
                        }
                    }
                    child.setXY(page * viewWidth + curX, curY);
                    curX += Math.ceil(child.width);
                    if (curX > maxWidth)
                        maxWidth = curX;
                    if (child.height > maxHeight)
                        maxHeight = child.height;
                    j++;
                }
            }
            ch = page > 0 ? viewHeight : curY + Math.ceil(maxHeight);
            cw = (page + 1) * viewWidth;
        }
        this.handleAlign(cw, ch);
        this.setBounds(0, 0, cw, ch);
    }
    setupBeforeAdd(xml) {
        super.setupBeforeAdd(xml);
        let str;
        let arr;
        str = xml.attributes.layout;
        if (str)
            this.$layout = ParseListLayoutType(str);
        let overflow;
        str = xml.attributes.overflow;
        if (str)
            overflow = ParseOverflowType(str);
        else
            overflow = 0 /* Visible */;
        str = xml.attributes.margin;
        if (str)
            this.$margin.parse(str);
        str = xml.attributes.align;
        if (str)
            this.$align = ParseAlignType(str);
        str = xml.attributes.vAlign;
        if (str)
            this.$verticalAlign = ParseVertAlignType(str);
        if (overflow == 2 /* Scroll */) {
            let scroll;
            str = xml.attributes.scroll;
            if (str)
                scroll = ParseScrollType(str);
            else
                scroll = 1 /* Vertical */;
            let scrollBarDisplay;
            str = xml.attributes.scrollBar;
            if (str)
                scrollBarDisplay = ParseScrollBarDisplayType(str);
            else
                scrollBarDisplay = 0 /* Default */;
            let scrollBarFlags;
            str = xml.attributes.scrollBarFlags;
            if (str)
                scrollBarFlags = parseInt(str);
            else
                scrollBarFlags = 0;
            let scrollBarMargin = new Margin();
            str = xml.attributes.scrollBarMargin;
            if (str)
                scrollBarMargin.parse(str);
            let vtScrollBarRes;
            let hzScrollBarRes;
            str = xml.attributes.scrollBarRes;
            if (str) {
                arr = str.split(',');
                vtScrollBarRes = arr[0];
                hzScrollBarRes = arr[1];
            }
            let headerRes;
            let footerRes;
            str = xml.attributes.ptrRes;
            if (str) {
                arr = str.split(',');
                headerRes = arr[0];
                footerRes = arr[1];
            }
            this.setupScroll(scrollBarMargin, scroll, scrollBarDisplay, scrollBarFlags, vtScrollBarRes, hzScrollBarRes, headerRes, footerRes);
        }
        else
            this.setupOverflow(overflow);
        str = xml.attributes.lineGap;
        if (str)
            this.$lineGap = parseInt(str);
        str = xml.attributes.colGap;
        if (str)
            this.$columnGap = parseInt(str);
        str = xml.attributes.lineItemCount;
        if (str) {
            if (this.$layout == 2 /* FlowHorizontal */ ||
                this.$layout == 4 /* Pagination */)
                this.$columnCount = parseInt(str);
            else if (this.$layout == 3 /* FlowVertical */)
                this.$lineCount = parseInt(str);
        }
        str = xml.attributes.lineItemCount2;
        if (str)
            this.$lineCount = parseInt(str);
        str = xml.attributes.selectionMode;
        if (str)
            this.$selectionMode = ParseListSelectionMode(str);
        str = xml.attributes.defaultItem;
        if (str)
            this.$defaultItem = str;
        str = xml.attributes.autoItemSize;
        if (this.$layout == 1 /* SingleRow */ || this.$layout == 0 /* SingleColumn */)
            this.$autoResizeItem = str != 'false';
        else
            this.$autoResizeItem = str == 'true';
        str = xml.attributes.renderOrder;
        if (str) {
            this.$childrenRenderOrder = ParseListChildrenRenderOrder(str);
            if (this.$childrenRenderOrder == 2 /* Arch */) {
                str = xml.attributes.apex;
                if (str)
                    this.$apexIndex = parseInt(str);
            }
        }
        let col = xml.children;
        col.forEach(cxml => {
            if (cxml.nodeName != 'item')
                return;
            let url = cxml.attributes.url;
            if (!url)
                url = this.$defaultItem;
            if (!url)
                return;
            let obj = this.getFromPool(url);
            if (obj != null) {
                this.addChild(obj);
                str = cxml.attributes.title;
                if (str)
                    obj.text = str;
                str = cxml.attributes.icon;
                if (str)
                    obj.icon = str;
                str = cxml.attributes.name;
                if (str)
                    obj.name = str;
                str = cxml.attributes.selectedIcon;
                if (str && obj instanceof GButton)
                    obj.selectedIcon = str;
            }
        }, this);
    }
    setupAfterAdd(xml) {
        super.setupAfterAdd(xml);
        let str;
        str = xml.attributes.selectionController;
        if (str)
            this.$selectionController = this.parent.getController(str);
    }
}
GList.$lastPosHelper = 0;

class PopupMenu {
    constructor(resourceURL = null) {
        if (!resourceURL) {
            resourceURL = UIConfig.popupMenu;
            if (!resourceURL)
                throw new Error('UIConfig.popupMenu not defined');
        }
        this.$contentPane = UIPackage.createObjectFromURL(resourceURL);
        this.$contentPane.on('added', this.$addedToStage, this);
        this.$list = this.$contentPane.getChild('list');
        this.$list.removeChildrenToPool();
        this.$list.addRelation(this.$contentPane, 14 /* Width */);
        this.$list.removeRelation(this.$contentPane, 15 /* Height */);
        this.$contentPane.addRelation(this.$list, 15 /* Height */);
        this.$list.on("__itemClick" /* ItemClick */, this.$clickItem, this);
    }
    dispose() {
        GTimer.inst.remove(this.$delayClickItem, this);
        this.$list.off("__itemClick" /* ItemClick */, this.$clickItem);
        this.$contentPane.off('added', this.$addedToStage);
        this.$contentPane.dispose();
    }
    addItem(caption, handler) {
        let item = this.$list.addItemFromPool();
        item.title = caption;
        item.data = handler;
        item.grayed = false;
        let c = item.getController('checked');
        if (c != null)
            c.selectedIndex = 0;
        return item;
    }
    addItemAt(caption, index, handler) {
        let item = this.$list.getFromPool();
        this.$list.addChildAt(item, index);
        item.title = caption;
        item.data = handler;
        item.grayed = false;
        let c = item.getController('checked');
        if (c != null)
            c.selectedIndex = 0;
        return item;
    }
    addSeperator() {
        if (UIConfig.popupMenuSeperator == null)
            throw new Error('UIConfig.popupMenuSeperator not defined');
        this.$list.addItemFromPool(UIConfig.popupMenuSeperator);
    }
    getItemName(index) {
        let item = this.$list.getChildAt(index);
        return item.name;
    }
    setItemText(name, caption) {
        let item = this.$list.getChild(name);
        item.title = caption;
    }
    setItemVisible(name, visible) {
        let item = this.$list.getChild(name);
        if (item.visible != visible) {
            item.visible = visible;
            this.$list.setBoundsChangedFlag();
        }
    }
    setItemGrayed(name, grayed) {
        let item = this.$list.getChild(name);
        item.grayed = grayed;
    }
    setItemCheckable(name, checkable) {
        let item = this.$list.getChild(name);
        let c = item.getController('checked');
        if (c != null) {
            if (checkable) {
                if (c.selectedIndex == 0)
                    c.selectedIndex = 1;
            }
            else
                c.selectedIndex = 0;
        }
    }
    setItemChecked(name, checked) {
        let item = this.$list.getChild(name);
        let c = item.getController('checked');
        if (c != null)
            c.selectedIndex = checked ? 2 : 1;
    }
    isItemChecked(name) {
        let item = this.$list.getChild(name);
        let c = item.getController('checked');
        if (c != null)
            return c.selectedIndex == 2;
        else
            return false;
    }
    removeItem(name) {
        let item = this.$list.getChild(name);
        if (item != null) {
            let index = this.$list.getChildIndex(item);
            this.$list.removeChildToPoolAt(index);
            return true;
        }
        else
            return false;
    }
    clearItems() {
        this.$list.removeChildrenToPool();
    }
    get itemCount() {
        return this.$list.numChildren;
    }
    get contentPane() {
        return this.$contentPane;
    }
    get list() {
        return this.$list;
    }
    show(target = null, dir) {
        let r = target != null ? GRoot.findFor(target) : GRoot.inst;
        r.showPopup(this.contentPane, target instanceof GRoot ? null : target, dir);
    }
    $clickItem(evt) {
        let item = evt.data.item;
        GTimer.inst.add(100, 1, this.$delayClickItem, this, item);
    }
    $delayClickItem(itemObject) {
        if (!(itemObject instanceof GButton))
            return;
        if (itemObject.grayed) {
            this.$list.selectedIndex = -1;
            return;
        }
        let c = itemObject.getController('checked');
        if (c != null && c.selectedIndex != 0) {
            if (c.selectedIndex == 1)
                c.selectedIndex = 2;
            else
                c.selectedIndex = 1;
        }
        let r = this.$contentPane.parent;
        if (r)
            r.hidePopup(this.contentPane);
        if (itemObject.data != null)
            itemObject.data.call(null);
        GTimer.inst.remove(this.$delayClickItem, this);
    }
    $addedToStage() {
        this.$list.selectedIndex = -1;
        this.$list.resizeToFit(100000, 10);
    }
}

class UIObjectFactory {
    static setPackageItemExtension(url, type) {
        UIObjectFactory.packageItemExtensions[url.substring(5)] = type;
    }
    // public static setLoaderExtension(type: { new(): GLoader }): void {
    //     UIObjectFactory.loaderExtension = type;
    // }
    static newObject(pi) {
        switch (pi.type) {
            case 0 /* Image */:
                return new GImage();
            case 2 /* MovieClip */:
                return new GMovieClip();
            case 4 /* Component */:
                let cls = UIObjectFactory.packageItemExtensions[pi.owner.id + pi.id];
                if (cls)
                    return new cls();
                let xml = pi.owner.getItemAsset(pi);
                let extention = xml.attributes.extention;
                if (extention != null) {
                    switch (extention) {
                        case 'Button':
                            return new GButton();
                        case 'ProgressBar':
                            return new GProgressBar();
                        case 'Label':
                            return new GLabel();
                        case 'Slider':
                            return new GSlider();
                        case 'ScrollBar':
                            return new GScrollBar();
                        case 'ComboBox':
                            return new GComboBox();
                        default:
                            return new GComponent();
                    }
                }
                else
                    return new GComponent();
        }
        return null;
    }
    static newObjectDirectly(type) {
        switch (type) {
            case 'image':
                return new GImage();
            case 'movieclip':
                return new GMovieClip();
            case 'component':
                return new GComponent();
            case 'text':
                return new GTextField();
            case 'list':
                return new GList();
            case 'richtext':
                return new GRichTextField();
            case 'inputtext':
                return new GTextInput();
            case 'group':
                return new GGroup();
            case 'graph':
                return new GGraph();
            case 'loader':
                if (UIObjectFactory.loaderExtension != null)
                    return new UIObjectFactory.loaderExtension();
                else
                    return new GLoader();
        }
        return null;
    }
}
UIObjectFactory.packageItemExtensions = {};
Decls.UIObjectFactory = UIObjectFactory;

class DragIndicator {
    constructor() {
        this.$agent = new GLoader();
        this.$agent.draggable = true;
        this.$agent.touchable = false;
        this.$agent.setSize(100, 100);
        this.$agent.setPivot(0.5, 0.5, true);
        this.$agent.align = "center" /* Center */;
        this.$agent.verticalAlign = 1 /* Middle */;
        this.$agent.sortingOrder = 1000000; //top most
        this.$agent.on("__dragEnd" /* END */, this.$dragEnd, this);
    }
    get dragAgent() {
        return this.$agent;
    }
    get isDragging() {
        return this.$agent.parent != null;
    }
    get sourceObject() {
        return this.$sourceObject;
    }
    startDrag(source, icon, sourceData, touchPointID = -1) {
        if (this.isDragging)
            return;
        this.$sourceObject = source;
        this.$sourceData = sourceData;
        this.$agent.url = icon;
        GRoot.inst.addChild(this.$agent);
        const pt = GRoot.inst.globalToLocal(GRoot.globalMouseStatus.mouseX, GRoot.globalMouseStatus.mouseY);
        this.$agent.setXY(pt.x, pt.y);
        this.$agent.startDrag(touchPointID);
    }
    cancel() {
        if (this.$agent.parent != null) {
            this.$agent.stopDrag();
            GRoot.inst.removeChild(this.$agent);
            this.$sourceData = null;
        }
    }
    $dragEnd(evt) {
        if (!this.isDragging)
            return;
        GRoot.inst.removeChild(this.$agent);
        let sourceData = this.$sourceData;
        this.$sourceData = null;
        let obj = GRoot.inst.getObjectUnderPoint(evt.target.x, evt.target.y);
        while (obj != null) {
            if (obj.hasListener("__dragDrop" /* DROP */)) {
                obj.requestFocus();
                let currentTarget = obj.displayObject;
                let event = new createjs.Event("__dragDrop" /* DROP */, true, false);
                event.data = { currentTarget, sourceData };
                obj.dispatchEvent(event, this);
                return;
            }
            obj = obj.parent;
        }
    }
}

export { AssetLoader, Binder, BlendModeMap, Controller, DefaultUIStageOptions, DragIndicator, GButton, GComboBox, GComponent, GGraph, GGroup, GImage, GLabel, GList, GLoader, GMovieClip, GObject, GProgressBar, GRichTextField, GRoot, GScrollBar, GSlider, GTextField, GTextInput, GTimer, GearXMLNodeNameMap, InteractiveEvents, PackageItem, ParseAlignType, ParseAutoSizeType, ParseButtonMode, ParseEaseType, ParseFlipType, ParseListChildrenRenderOrder, ParseListLayoutType, ParseListSelectionMode, ParseLoaderFillType, ParseOverflowType, ParsePackageItemType, ParseProgressTitleType, ParseScrollBarDisplayType, ParseScrollType, ParseVertAlignType, PopupMenu, ScrollPane, StringUtil, Transition, UIConfig, UIObjectFactory, UIPackage, UIStage, Window };
