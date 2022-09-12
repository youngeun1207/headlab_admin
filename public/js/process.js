import { readStorage } from "./firebase.js";
import { getGazeShare } from "./getShare.js";
import { min } from "./Page/Gallaries.js";

var rank = [];

export async function createProcess(gaze_data) {
    const timestamp = gaze_data.process_index;

    const min1 = timestamp.min1;
    const min3 = timestamp.min3;
    const offset = gaze_data.offsets.canvas;

    rank.push(getGridShare(offset, gaze_data.gaze_data.slice(0, min1)));
    rank.push(getGridShare(offset, gaze_data.gaze_data.slice(min1, min3)));
    rank.push(getGridShare(offset, gaze_data.gaze_data.slice(min3)));

    console.log(rank);

    const img = document.createElement('img');

    const src1 = await readStorage(gaze_data.drawing + min.min5);
    const src3 = await readStorage(gaze_data.drawing + min.min5);
    const src5 = await readStorage(gaze_data.drawing + min.min5);

}

async function getGridShare(offset, gaze_data) {
    var share = [];
    var canvasOffset = {
        l: offset.l,
        r: offset.r,
        t: offset.t,
        b: offset.b
    }
    const gridWidth = (canvasOffset.r - canvasOffset.l) / 3;
    const gridHeight = (canvasOffset.b - canvasOffset.t) / 3;

    var targetOffset = {
        l: null,
        r: null,
        t: null,
        b: null
    };

    const canvasShare = await getGazeShare(canvasOffset, gaze_data);

    for (var i = 0; i < 3; i++) {
        targetOffset.l = canvasOffset.l + gridWidth * i;
        targetOffset.r += canvasOffset.l + gridWidth * (i+1);
        for (var j = 0; j < 3; j++) {
            targetOffset.t = canvasOffset.t + gridHeight * j;
            targetOffset.b = canvasOffset.t + gridHeight * (j+1);
            share.push(await getGazeShare(targetOffset, gaze_data)/canvasShare*100);
        }
    }

    return share;
}

export function deleteProcess(){
    const share = document.getElementById("share-data");
    share.style.visibility='hidden';
}

export function showProcess(){
    const share = document.getElementById("share-data");
    share.style.visibility='visible';
}