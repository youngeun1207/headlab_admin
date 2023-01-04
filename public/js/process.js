import { listStorage, readStorage } from "./firebase.js";
import { getGazeShare } from "./getShare.js";
import { min1, min3, min5, min7 } from "./minBtn.js";
import { min } from "./Page/Gallaries.js";
import { generateZIP } from "./saveImages.js";

const WHITE = "255, 255, 255, 0.5"
const RED = "255, 0, 0, 0.5"

export async function createProcess(gaze_data) {
    const container = document.getElementById("proc-container");

    container.style.height = gaze_data.window_size.y + "px";
    container.style.width = gaze_data.window_size.x + "px";

    let rank, colors, src;

    const offset = gaze_data.offsets.canvas;
    const canvasOffset = {
        l: offset.l,
        r: offset.r,
        t: offset.t,
        b: offset.b
    }
    const width = canvasOffset.r - canvasOffset.l;
    const height = canvasOffset.b - canvasOffset.t;
    await generateZIP(gaze_data.drawing.slice(8) ,await listStorage(gaze_data.drawing + `/`));
    
    if(min1){
        rank = await getGridShare(canvasOffset, gaze_data.gaze_data.slice(0, min1), width, height);
        src = await readStorage(gaze_data.drawing + `/${gaze_data.drawing.slice(8)}` + min.min1 + '.png');
        colors = await getMaxVal(rank);
        container.insertAdjacentHTML("beforeend", template(src, rank, "proc1" , width, height, colors));
    }
    if(min3){
        rank = await getGridShare(canvasOffset, gaze_data.gaze_data.slice(min1, min3), width, height);
        src = await readStorage(gaze_data.drawing + `/${gaze_data.drawing.slice(8)}` + min.min3 + '.png');
        colors = await getMaxVal(rank);
        container.insertAdjacentHTML("beforeend", template(src, rank, "proc3", width, height, colors));
    }
    if(min5){
        rank = await getGridShare(canvasOffset, gaze_data.gaze_data.slice(min3, min5), width, height);
        src = await readStorage(gaze_data.drawing + `/${gaze_data.drawing.slice(8)}` + min.min5 + '.png');
        colors = await getMaxVal(rank);
        container.insertAdjacentHTML("beforeend", template(src, rank, "proc5", width, height, colors));
    }
    if(min7){
        rank = await getGridShare(canvasOffset, gaze_data.gaze_data.slice(min5, min7), width, height);
        src = await readStorage(gaze_data.drawing + `/${gaze_data.drawing.slice(8)}` + min.min7 + '.png');
        colors = await getMaxVal(rank);
        container.insertAdjacentHTML("beforeend", template(src, rank, "proc7", width, height, colors));
    }
    rank = await getGridShare(canvasOffset, gaze_data.gaze_data.slice(Math.max(0, min1, min3, min5, min7)), width, height);
    src = await readStorage(gaze_data.drawing + `/${gaze_data.drawing.slice(8)}` + min.end + '.png');
    colors = await getMaxVal(rank);
    container.insertAdjacentHTML("beforeend", template(src, rank, "proc_end", width, height, colors)); 

    rank = await getGridShare(canvasOffset, gaze_data.gaze_data, width, height);
    colors = await getMaxVal(rank);
    container.insertAdjacentHTML("beforeend", template(src, rank, "proc_all", width, height, colors)); 

    container.style.visibility = "hidden";
    container.style.zIndex = 1;
}

async function getMaxVal(rank){
    let colors = [WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE];
    const max_val = Math.max(...rank);

    const max_index = rank.indexOf(max_val);

    colors[max_index] = RED;
    return colors;
}

export async function hideAllProcess(){
    const proc1 = document.getElementById("proc1");
    const proc3 = document.getElementById("proc3");
    const proc5 = document.getElementById("proc5");
    const proc7 = document.getElementById("proc7");
    const proc_end = document.getElementById("proc_end");
    const proc_all = document.getElementById("proc_all");

    if(proc1){
        proc1.style.visibility = "hidden";
    }
    if(proc3){
        proc3.style.visibility = "hidden";
    }
    if(proc5){
        proc5.style.visibility = "hidden";
    }
    if(proc7){
        proc7.style.visibility = "hidden";
    }
    if(proc_end){
        proc_end.style.visibility = "hidden";
    }
    if(proc_all){
        proc_all.style.visibility = "hidden";
    }
}

export async function showSelectedProcess(min){
    const proc = document.getElementById(min);
    if(proc){
        proc.style.visibility = "visible";
    }
}

async function getGridShare(canvasOffset, gaze_data, width, height) {
    let share = [];
    const gridWidth = width / 3;
    const gridHeight = height / 3;

    let targetOffset = {
        l: null,
        r: null,
        t: null,
        b: null
    };

    const canvasShare = await getGazeShare(canvasOffset, gaze_data);
    
    for (let i = 0; i < 3; i++) {
        targetOffset.l = canvasOffset.l + gridWidth * i;
        targetOffset.r = canvasOffset.l + gridWidth * (i+1);
        for (let j = 0; j < 3; j++) {
            targetOffset.t = canvasOffset.t + gridHeight * j;
            targetOffset.b = canvasOffset.t + gridHeight * (j+1);
            const fullShare = await getGazeShare(targetOffset, gaze_data)/canvasShare*100;
            const tmp = Math.round(fullShare*100);
            const result = tmp / 100;
            share.push(result);
        }
    }

    return share;
}

export function deleteProcess(){
    hideAllProcess();
    const process = document.getElementById("proc-container");
    process.style.visibility='hidden';
}

export function showProcess(){
    const process = document.getElementById("proc-container");
    process.style.visibility='visible';
    showSelectedProcess("proc5");
}

const template = (src, sec, id, width, height, colors) =>`
    <div class="div9-container" id=${id} style="width:${width}px; height:${height}px">
        <image class="drawing-proc" src=${src} style="width:${width}px; height:${height}px">
        <section style="width:${width}px; height:${height}px">
            <div style="background-color:rgba(${colors[0]})">${sec[0]}%</div>
            <div style="background-color:rgba(${colors[1]})">${sec[1]}%</div>
            <div style="background-color:rgba(${colors[2]})">${sec[2]}%</div>
            <div style="background-color:rgba(${colors[3]})">${sec[3]}%</div>
            <div style="background-color:rgba(${colors[4]})">${sec[4]}%</div>
            <div style="background-color:rgba(${colors[5]})">${sec[5]}%</div>
            <div style="background-color:rgba(${colors[6]})">${sec[6]}%</div>
            <div style="background-color:rgba(${colors[7]})">${sec[7]}%</div>
            <div style="background-color:rgba(${colors[8]})">${sec[8]}%</div>
        </section>
    </div>
`; 
