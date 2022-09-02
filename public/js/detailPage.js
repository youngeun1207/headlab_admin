import "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import 'https://www.gstatic.com/firebasejs/8.8.1/firebase-storage.js';

import { readDatabase, readStorage } from "./firebase.js";
import createHeatmap, { deleteHeatmap, showHeatmap } from "./heatmap.js"
import { createSequence, deleteSequence, showSequence } from "./sequence.js";

var isSequence = false;
var isHeatmap  = false;
var isShare  = false;

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

    createSequence(bg, gaze_data);
    createHeatmap(bg, gaze_data);

    const seq = document.getElementById("seq");
    const heat = document.getElementById("heat");
    const share = document.getElementById("share");

    if (seq) {
        seq.addEventListener("click", handleSequence);
    }
    if (share) {
        share.addEventListener("click", ()=> console.log("yet"));
    }
    if (heat) {
        heat.addEventListener("click", handleHeatmap);
    }
    
})

function handleHeatmap(){
    if(isHeatmap){
        deleteHeatmap();
        isHeatmap  = false;
    }
    if(isSequence){
        deleteSequence();
        isSequence  = false;
    }
    showHeatmap();
    isHeatmap  = true;
}

function handleSequence(){
    if(isHeatmap){
        deleteHeatmap();
        isHeatmap  = false;
    }
    if(isSequence){
        deleteSequence();
        isSequence  = false;
    }
    showSequence();
    isSequence  = true;
}