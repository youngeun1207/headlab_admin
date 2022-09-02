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
    gallaryDocument.addEventListener('click',async function(e){
        if(e.target && e.target.id != 'gallary'){
            var link = "./detail.html";
            var data = drawing_data[e.target.id];
            var src = await readStorage(data.screenshot);
            await openNewPage(link, data, src);
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