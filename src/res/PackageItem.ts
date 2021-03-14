
import { PackageItemType } from "../config/Definitions";
import { BitmapFont } from "../display/BitmapFont";
import { Frame } from "../display/Frame";
import { XmlNode } from "../utils/XMLParser";
import { DisplayListItem } from "./DisplayListItem";
import { UIPackage, AssetTypes } from "./UIPackage";

export class PackageItem {

    public owner: UIPackage;

    public type: PackageItemType;
    public id: string;
    public name: string;
    public width: number = 0;
    public height: number = 0;
    public file: string;
    public decoded: boolean;

    //image
    public scale9Grid: createjs.Rectangle;
    public scaleByTile: boolean;
    public tiledSlices: number = 0;
    public texture: HTMLImageElement | createjs.SpriteSheetFrame;

    //movieclip
    public interval: number = 0;
    public repeatDelay: number = 0;
    public swing: boolean;
    public frames: Frame[];

    //sound
    public sound: createjs.Sound;

    //componenet
    public componentData: XmlNode;
    public displayList: DisplayListItem[];

    //font 
    public bitmapFont: BitmapFont;

    public load(): AssetTypes {
        return this.owner.getItemAsset(this);
    }

    public toString(): string {
        return this.name;
    }
}
