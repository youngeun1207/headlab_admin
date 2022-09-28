import { isProc, isSequence } from "./detailPage.js";
import { hideAllProcess, showSelectedProcess } from "./process.js";
import { createSequence } from "./sequence.js";

export let min1, min3, min5, min7;

export async function editMinButtons(gaze_data){
    const timestamp = gaze_data.process_index;
    if (timestamp) {
        min1 = timestamp.min1;
        min3 = timestamp.min3;
        min5 = timestamp.min5;
        min7 = timestamp.min7;
    } else {
        min1 = null;
        min3 = null;
        min5 = null;
        min7 = null;
    }

    if(!min1){
        min1 = null;
        const btn = document.getElementById("proc1_btn");
        btn.remove();
    }
    if(!min3){
        min3 = null;
        const btn = document.getElementById("proc3_btn");
        btn.remove();
    }
    if(!min5){
        min5 = null;
        const btn = document.getElementById("proc5_btn");
        btn.remove();
    }
    if(!min7){
        min7 = null;
        const btn = document.getElementById("proc7_btn");
        btn.remove();
    }
    addEventListenerforMin(gaze_data.gaze_data);
}

function addEventListenerforMin(gaze_data){
    if(min1){
        const btn = document.getElementById("proc1_btn");
        btn.addEventListener("click", ()=>{
            if(isProc){
                hideAllProcess();
                showSelectedProcess("proc1");
            }
            if(isSequence){
                createSequence(gaze_data.slice(0, min1));
            }
        });
    }
    if(min3){
        const btn = document.getElementById("proc3_btn");
        btn.addEventListener("click", ()=>{
            if(isProc){
                hideAllProcess();
                showSelectedProcess("proc3");
            }
            if(isSequence){
                createSequence(gaze_data.slice(min1, min3));
            }
        });
    }
    if(min5){
        const btn = document.getElementById("proc5_btn");
        btn.addEventListener("click", ()=>{
            if(isProc){
                hideAllProcess();
                showSelectedProcess("proc5");
            }
            if(isSequence){
                createSequence(gaze_data.slice(min3, min5));
            }
        });
    }
    if(min7){
        const btn = document.getElementById("proc7_btn");
        btn.addEventListener("click", ()=>{
            if(isProc){
                hideAllProcess();
                showSelectedProcess("proc7");
            }
            if(isSequence){
                createSequence(gaze_data.slice(min5, min7));
            }
        });
    }

    const end_btn = document.getElementById("proc_end_btn");
    end_btn.addEventListener("click", ()=>{
        if(isProc){
            hideAllProcess();
            showSelectedProcess("proc_end");
        }
        if(isSequence){
            createSequence(gaze_data.slice(Math.max(0, min1, min3, min5, min7)));
        }
    });

    const all_btn = document.getElementById("proc_all_btn");
    all_btn.addEventListener("click", ()=>{
        if(isProc){
            hideAllProcess();
            showSelectedProcess("proc_all");
        }
        if(isSequence){
            createSequence(gaze_data);
        }
    });
}

