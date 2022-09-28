import { readDatabase, readPersonalData, readStorage } from "../firebase.js";
import { openNewPage } from "./showDetails.js";

export const min = {
    min1: "_1",
    min3: "_3",
    min5: "_5",
    min7: "_7",
    end: "_end"
}

export const className = {
    red: '빨강',
    orange: '주황',
    yellow: '노랑',
    yellowGreen: '연두',
    green: '초록',
    blue: '파랑',
    sky: '하늘',
    purple: '보라',
    pink: '분홍',
    white: '하양',
    test: '테스터'
}

export const division = {
    disability: '장애',
    genius: '영재',
    test: '테스트'
}
export const disability_type = {
    autism: '(자폐)',
    intellectual: '(지적)',
    complex: '(복합)',
    etc: '(기타)',
    NA: ''
}

export default async function getGallaries(key_data){
    const full_data = Object.entries(key_data);
    const gallaryDocument = document.querySelector("#gallary");
    full_data.map(async (d) => {
        const value = d[1];
        const key = d[0];
        let isRef = 'X';
        if(value.is_reference){
            isRef = 'O'
        }
        // const src = await readStorage(value .drawing + min.end);
        const id = value .id;
        gallaryDocument.insertAdjacentHTML("beforeend", 
            template(key, division[id.division], className[id.class], id.id, isRef));
        }
    );
    gallaryDocument.addEventListener('click',async function(e){
        if(e.target && e.target.id != 'gallary'){
            const link = "./detail.html";
            // var data = drawing_data[e.target.id];
            const data = await readPersonalData(e.target.id);
            const src = await readStorage(data.screenshot);
            await openNewPage(link, data, src);
         }
    });
}

export function sortFunction(a, b) {
    // 소속 -> 이름 순 정렬
    if (a[1].id.division < b[1].id.division) return -1;
    if (a[1].id.division > b[1].id.division) return 1;
    if (a[1].id.id < b[1].id.id) return -1;
    else return 1;
}

const template = (drawing, division, classes, id, isRef) => `
    <div class='drawing' id=${drawing}">
        <div id=${drawing}>
            <div class = 'text' id=${drawing}>${division}</div>
            <div class = 'text' id=${drawing}>${classes}</div>
            <div class = 'text' id=${drawing}>${id}</div>
        </div>
        <div class = 'text' id=${drawing}>참고이미지: ${isRef}</div>
    </div>
`; 


// const template = (src, drawing, division, classes, id) => `
//     <div class='drawing' id=${drawing}">
//         <image class ='thumbnail' src=${src} id=${drawing} />
//         <div id=${drawing}>
//             <div class = 'text' id=${drawing}>${division}</div>
//             <div class = 'text' id=${drawing}>${classes}</div>
//             <div class = 'text' id=${drawing}>${id}</div>
//         </div>
//     </div>
// `; 