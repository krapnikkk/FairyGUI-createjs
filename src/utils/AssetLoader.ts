
import { Resource } from "../createjs/extras/Resource";

export interface ResourceDictionary {

    [index: string]: Resource|HTMLImageElement;

}
export class AssetLoader extends createjs.LoadQueue {
    protected static $resources: ResourceDictionary = {};
    public constructor(preferXHR?: boolean, basePath?: string,crossOrigin?:string) {
        super(preferXHR, basePath);

        this.on('complete', this._onComplete, this);
    }

    protected _onComplete(event: any): void {
        var loader = event.target;
        var result = loader["_loadedResults"];
        AssetLoader.addResources(result);
    };

    public static get resourcesPool(): ResourceDictionary {
        return AssetLoader.$resources;
    }

    public static destroyResource(key: string): void {
        let res = AssetLoader.$resources[key];
        if (res) {
            delete AssetLoader.$resources[key];
        }
    }

    public static addResources(res: ResourceDictionary): void {
        if (!res) return;
        for (let key in res)   //override the item which has same key name
            AssetLoader.$resources[key] = res[key];
    }
}
