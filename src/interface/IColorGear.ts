export interface IColorGear {
    color: string|number;
}

export let isColorGear = function (obj: any): obj is IColorGear {
    return obj && "color" in obj;
}
