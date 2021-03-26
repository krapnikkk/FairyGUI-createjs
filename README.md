# FairyGUI-createjs

#### A GUI Editor&amp;framework for Create.js ####

Official website: [www.fairygui.com](https://www.fairygui.com)

#### Install
```
npm install fairygui-createjs
```

#### Live Demo ####
[example](https://blog.krapnik.cn/FairyGUI-createjs-example/dist/index.html)

### Usage ###

Step 1, we use the editor to create the UI.

![](images/20200610-084916.png)

Step 2, we only need a little code to display it.

```javascript
import * as fgui from 'fairygui-createjs'

// create stage
let canvas = document.query("#canvas")
let stage = new createjs.Stage(canvas);
let loader = new fgui.AssetLoader(false, "", "Anonymous");
let manifest = [
    { id: "test", src: 'ui/test.fui', type: "binary" },
    { id: 'test@atlas0', src: 'ui/test@atlas0.png', type: "image" },
    { id: 'test@atlas0_1', src: 'ui/test@atlas0_1.png', type: "image" }
];

function createStage(){
    fgui.GRoot.inst.attachTo(this.stage, {
        designWidth: 1136,
        designHeight: 640,
        scaleMode: fgui.StageScaleMode.FIXED_WIDTH,
        orientation: fgui.StageOrientation.LANDSCAPE,
        alignV: fgui.StageAlign.TOP,
        alignH: fgui.StageAlign.LEFT
    });

    createjs.Ticker.framerate = 60;
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.on('tick', ()=>{
        if (e.paused !== 1) {
            stage.update();
        } else {
            console.log('pause!');
    }, this);
}

// createLoader
function createLoader() {
    createjs.Sound.alternateExtensions = ["mp3"];
    loader.installPlugin(createjs.Sound);
    loader.loadManifest(this.manifest);
    loader.on("complete", resLoaded, this);
}

// createObject
function resLoaded(){
    loader.destroy();
    fgui.UIPackage.addPackage("test");
    let ins = fgui.UIPackage.createObject("test", "main");
    ins.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
    ins.addRelation(fgui.GRoot.inst, fgui.RelationType.Size);
    fgui.GRoot.inst.addChild(ins);
}

createStage();
createLoader();

```

# License
MIT
