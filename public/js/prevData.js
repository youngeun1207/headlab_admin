import "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import 'https://www.gstatic.com/firebasejs/8.8.1/firebase-storage.js';
import "https://www.gstatic.com/firebasejs/8.8.1/firebase-auth.js";
import { getAuth, readDatabase } from "./firebase.js";
import { className, division, openPersonalPage, sortFunction } from "./Page/Gallaries.js";

$(document).ready(async function () {
    await getAuth();
    
    const data = await readDatabase("key_info");

    let entries = Object.entries(data);
    entries.sort(sortFunction);

    const final_data = Object.fromEntries(entries);

    await getGallaries(final_data);
})

async function getGallaries(key_data){
    const full_data = Object.entries(key_data);
    const gallaryDocument = document.querySelector("#gallary");
    full_data.map(async (d) => {
        const value = d[1];
        const key = d[0];
        let isRef = 'X';
        if(value.is_reference){
            isRef = 'O'
        }
        const id = value .id;
        gallaryDocument.insertAdjacentHTML("beforeend", 
            template(key, division[id.division], className[id.class], id.id, isRef));
        }
    );
    gallaryDocument.addEventListener('click',openPersonalPage);
}
const template = (drawing, division, classes, id, isRef) => `
    <div class='drawing' id=${drawing}>
        <div id=${drawing}>
            <div class = 'text' id=${drawing}>${division}</div>
            <div class = 'text' id=${drawing}>${classes}</div>
            <div class = 'text' id=${drawing}>${id}</div>
        </div>
        <div class = 'text' id=${drawing}>참고이미지: ${isRef}</div>
    </div>
`; 