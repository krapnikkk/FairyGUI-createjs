import { XmlNode } from "../utils/XMLParser";
import { PackageItem } from "./PackageItem";

export class DisplayListItem {
    public packageItem: PackageItem;
    public type: string;
    public desc: XmlNode;
    public listItemCount: number;

    public constructor(packageItem: PackageItem, type: string) {
        this.packageItem = packageItem;
        this.type = type;
    }
}
