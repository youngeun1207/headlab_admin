import { readStorage } from "../firebase.js";

export default function getGallaries(data) {
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
}

const template = (src, drawing, division, classes, id) => `
    <div class='drawing' id=${drawing}>
        <image id ='thumbnail' src=${src} />
        <div>
            <div class = 'text'>${division}</div>
            <div class = 'text'>${classes}</div>
            <div class = 'text'>${id}</div>
        </div>
    </div>
`; 