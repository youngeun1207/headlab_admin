import { readStorage } from "./firebase.js";
import { getGazeShare } from "./getShare.js";
import { min } from "./Page/Gallaries.js";

export async function createProcess(gaze_data) {
    const timestamp = gaze_data.process_index;
    const container = document.getElementById("proc-container");

    container.style.height = gaze_data.window_size.y + "px";
    container.style.width = gaze_data.window_size.x + "px";

    var rank;
    var src;

    const min1 = timestamp.min1;
    const min3 = timestamp.min3;
    const offset = gaze_data.offsets.canvas;
    const canvasOffset = {
        l: offset.l,
        r: offset.r,
        t: offset.t,
        b: offset.b
    }
    const width = canvasOffset.r - canvasOffset.l;
    const height = canvasOffset.b - canvasOffset.t;
    if(min1 > 0){
        rank = await getGridShare(canvasOffset, gaze_data.gaze_data.slice(0, min1), width, height);
        src = await readStorage(gaze_data.drawing + min.min1);
        container.insertAdjacentHTML("beforeend", template(src, rank, "proc1" , width, height));

        const btn = document.getElementById("proc1_btn");
        btn.addEventListener("click", ()=>{
            hideAllProcess();
            showSelectedProcess("proc1")
        });
    }else{
        const btn = document.getElementById("proc1_btn");
        btn.remove();
    }
    if(min3 > 0){
        rank = await getGridShare(canvasOffset, gaze_data.gaze_data.slice(min1, min3), width, height);
        src = await readStorage(gaze_data.drawing + min.min3);
        container.insertAdjacentHTML("beforeend", template(src, rank, "proc3", width, height));

        const btn = document.getElementById("proc3_btn");
        btn.addEventListener("click", ()=>{
            hideAllProcess();
            showSelectedProcess("proc3")
        });
    }else{
        const btn = document.getElementById("proc3_btn");
        btn.remove();
    }
    rank = await getGridShare(canvasOffset, gaze_data.gaze_data.slice(Math.max(0, min1, min3)), width, height);
    src = await readStorage(gaze_data.drawing + min.min5);
    container.insertAdjacentHTML("beforeend", template(src, rank, "proc5", width, height)); 

    const btn = document.getElementById("proc5_btn");
    btn.addEventListener("click", ()=>{
        hideAllProcess();
        showSelectedProcess("proc5")
    });

    container.style.visibility = "hidden";
    container.style.zIndex = 1;
}

async function hideAllProcess(){
    const proc1 = document.getElementById("proc1");
    const proc3 = document.getElementById("proc3");
    const proc5 = document.getElementById("proc5");

    if(proc1){
        proc1.style.visibility = "hidden";
    }
    if(proc3){
        proc3.style.visibility = "hidden";
    }
    if(proc5){
        proc5.style.visibility = "hidden";
    }
}

async function showSelectedProcess(min){
    const proc = document.getElementById(min);
    if(proc){
        proc.style.visibility = "visible";
    }
}

async function getGridShare(canvasOffset, gaze_data, width, height) {
    var share = [];
    const gridWidth = width / 3;
    const gridHeight = height / 3;

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

            var fullShare = await getGazeShare(targetOffset, gaze_data)/canvasShare*100;
            var tmp = Math.round(fullShare*100);
            var result = tmp / 100;
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

const template = (src, sec, id, width, height) =>`
    <div class="div9-container" id=${id} style="width:${width}px; height:${height}px">
        <image class="drawing-proc" src=${src} style="width:${width}px; height:${height}px">
        <section style="width:${width}px; height:${height}px">
            <div>${sec[0]}%</div>
            <div>${sec[1]}%</div>
            <div>${sec[2]}%</div>
            <div>${sec[3]}%</div>
            <div>${sec[4]}%</div>
            <div>${sec[5]}%</div>
            <div>${sec[6]}%</div>
            <div>${sec[7]}%</div>
            <div>${sec[8]}%</div>
        </section>
    </div>
`; 
