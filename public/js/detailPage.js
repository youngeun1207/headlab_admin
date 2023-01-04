import "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import 'https://www.gstatic.com/firebasejs/8.8.1/firebase-storage.js';
import "https://www.gstatic.com/firebasejs/8.8.1/firebase-auth.js";
import "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.js";
import "http://cdn.jsdelivr.net/g/filesaver.js";

import { readDatabase, readStorage } from "./firebase.js";
import createHeatmap, { deleteHeatmap, showHeatmap } from "./heatmap.js"
import { deleteSequence, createSequenceCanvas, showSequence } from "./sequence.js";
import { createShareData, showShare, deleteShare } from "./getShare.js";
import { createProcess, deleteProcess, showProcess } from "./process.js";
import { className, disability_type, division } from "./Page/Gallaries.js";
import { editMinButtons } from "./minBtn.js";
import { getAudioFile } from "./playAudio.js";
import { createGazeDot, deleteGazeDot, showGazeDot } from "./showGazeDot.js";

let isHeatmap  = false;
let isShare  = false;
export let isSequence = false;
export let isProc  = false;
export let isMovement  = false;

$(document).ready(function () {
    const bg = document.getElementById("screenshot");
    bg.value = opener.document.getElementById("gallary").value;
    const gaze_data = bg.value[0];
    
    const src = bg.value[1];
    if(bg){
        bg.style.width = gaze_data.window_size.x + "px";
        bg.style.height = gaze_data.window_size.y + "px";
        bg.style.backgroundImage = "url('" + src + "')";

    }
    
    const student = document.getElementById("student-info");
    const student_type = division[gaze_data.id.division] + disability_type[gaze_data.personal_info.disability_type];
    const student_info = `${student_type} ${className[gaze_data.id.class]} ${gaze_data.id.id} (${gaze_data.personal_info.gender}/${gaze_data.personal_info.age})`;
    student.innerText = student_info;

    document.title = student_info;
    
    editMinButtons(gaze_data);
    createSequenceCanvas(bg);
    createHeatmap(bg, gaze_data);
    createShareData(gaze_data);
    createProcess(gaze_data);
    createGazeDot(gaze_data.gaze_data, bg);
    if(gaze_data.audio){
        getAudioFile(gaze_data.audio);
    } else {
        const audio = document.getElementById("audio");
        audio.remove();
    }

    const seq = document.getElementById("seq");
    const heat = document.getElementById("heat");
    const share = document.getElementById("share");
    const proc = document.getElementById("proc");
    const close = document.getElementById("close");
    const movement = document.getElementById("dot");
    

    if (seq) {
        seq.addEventListener("click", handleSequence);
    }
    if (share) {
        share.addEventListener("click", handleShare);
    }
    if (heat) {
        heat.addEventListener("click", handleHeatmap);
    }
    if (proc) {
        proc.addEventListener("click", handleProcess);
    }
    if(movement) {
        movement.addEventListener("click", handleMovement);
    }
    if (close) {
        close.addEventListener("click", handleClose);
    }
})

function handleClose(){
    if(isSequence){
        deleteSequence();
        isSequence  = false;
    }
    if(isShare){
        deleteShare();
        isShare  = false;
    }
    if(isHeatmap){
        deleteHeatmap();
        isHeatmap  = false;
    }
    if(isProc){
        deleteProcess();
        isProc  = false;
    }
    if(isMovement){
        deleteGazeDot();
        isMovement  = false;
    }
}

function handleMovement(){
    if(isSequence){
        deleteSequence();
        isSequence  = false;
    }
    if(isShare){
        deleteShare();
        isShare  = false;
    }
    if(isHeatmap){
        deleteHeatmap();
        isHeatmap  = false;
    }
    if(isProc){
        deleteProcess();
        isProc = false;
    }
    if(isMovement){
        return;
    }
    showGazeDot();
    isMovement = true;
}

function handleProcess(){
    if(isSequence){
        deleteSequence();
        isSequence  = false;
    }
    if(isShare){
        deleteShare();
        isShare  = false;
    }
    if(isHeatmap){
        deleteHeatmap();
        isHeatmap  = false;
    }
    if(isMovement){
        deleteGazeDot();
        isMovement  = false;
    }
    if(isProc){
        return;
    }
    showProcess();
    isProc  = true;
}
function handleHeatmap(){
    if(isSequence){
        deleteSequence();
        isSequence  = false;
    }
    if(isShare){
        deleteShare();
        isShare  = false;
    }
    if(isProc){
        deleteProcess();
        isProc = false;
    }
    if(isMovement){
        deleteGazeDot();
        isMovement  = false;
    }
    if(isHeatmap){
        return;
    }
    showHeatmap();
    isHeatmap  = true;
}

function handleSequence(){
    if(isHeatmap){
        deleteHeatmap();
        isHeatmap  = false;
    }
    if(isShare){
        deleteShare();
        isShare  = false;
    }
    if(isSequence){
        return;
    }
    if(isProc){
        deleteProcess();
        isProc = false;
    }
    if(isMovement){
        deleteGazeDot();
        isMovement  = false;
    }
    showSequence();
    isSequence  = true;
}

function handleShare(){
    if(isHeatmap){
        deleteHeatmap();
        isHeatmap  = false;
    }
    if(isSequence){
        deleteSequence();
        isSequence  = false;
    }
    if(isShare){
        return;
    }
    if(isProc){
        deleteProcess();
        isProc = false;
    }
    if(isMovement){
        deleteGazeDot();
        isMovement  = false;
    }
    showShare();
    isShare  = true;
}