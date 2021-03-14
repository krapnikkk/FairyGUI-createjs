import { XmlNode } from "../utils/XMLParser";
import { Controller } from "./Controller";

export class Action {
    public fromPage: string[];
    public toPage: string[];
    public execute(controller: Controller, prevPage: string, curPage: string): void {
        if ((!this.fromPage || this.fromPage.length == 0 || this.fromPage.indexOf(prevPage) != -1)
            && (!this.toPage || this.toPage.length == 0 || this.toPage.indexOf(curPage) != -1))
            this.enter(controller);
        else
            this.leave(controller);
    }

    protected enter(controller: Controller): void {
    }

    protected leave(controller: Controller): void {
    }

    public setup(xml: XmlNode): void {
        let str: String;

        str = xml.attributes.fromPage;
        if (str)
            this.fromPage = str.split(",");

        str = xml.attributes.toPage;
        if (str)
            this.toPage = str.split(",");
    }
}