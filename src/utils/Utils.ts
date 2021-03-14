export class Utils {
    static deepCopyProperties(target: any, source: any, propertyObj: Object) {
        for (var prop in propertyObj) {
            if (Array.isArray(source[prop])) {
                target[prop] = source[prop].slice();
            } else {
                target[prop] = source[prop];
            }
        }
    }

    static TextureCache: { [key: string]: HTMLImageElement|createjs.SpriteSheetFrame } = {};

    public static fillPath(ctx: createjs.Graphics, points: number[], px: number, py: number): void {
        var cnt: number = points.length;
        ctx.moveTo(points[0] + px, points[1] + py);
        for (var i: number = 2; i < cnt; i += 2) {
            ctx.lineTo(points[i] + px, points[i + 1] + py);
        }
        ctx.lineTo(points[0] + px, points[1] + py);
    }
}
