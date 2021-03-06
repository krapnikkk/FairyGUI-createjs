export interface IUISource {
    fileName: string;
    loaded: boolean;

    load(callback: () => void, thisObj: any): void;
}
