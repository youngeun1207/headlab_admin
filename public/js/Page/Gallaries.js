import { readStorage } from "../firebase.js";
import { openNewPage } from "./showDetails.js";

export default async function getGallaries(drawing_data) {
    const data = Object.entries(drawing_data);
    const gallaryDocument = document.querySelector("#gallary");
    data.map(async (d) => {
        const value = d[1];
        const key = d[0];
        const src = await readStorage(value .drawing);
        const id = value .id;
        gallaryDocument.insertAdjacentHTML("beforeend", 
            template(src, key, id.division, id.class, id.id));
        }
    );
    gallaryDocument.addEventListener('click',function(e){
        if(e.target && e.target.id != 'gallary'){
            openNewPage(drawing_data[e.target.id]);
         }
    });
}

const template = (src, drawing, division, classes, id) => `
    <div class='drawing' id=${drawing}">
        <image class ='thumbnail' src=${src} id=${drawing} />
        <div id=${drawing}>
            <div class = 'text' id=${drawing}>${division}</div>
            <div class = 'text' id=${drawing}>${classes}</div>
            <div class = 'text' id=${drawing}>${id}</div>
        </div>
    </div>
`; 