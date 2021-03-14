import { Frame } from "../display/Frame";
import { MovieClipData } from "../display/MovieClipData";
import { DefaultMovieClipSettings } from "../display/MovieClipSettings";

export interface IMovieClip {
    interval: number;
    swing: boolean;
    repeatDelay: number;

    // playing: boolean;
    frameCount: number;
    frames: Frame[];
    // currentFrame: number;
    // data: MovieClipData;
}