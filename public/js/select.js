import { deleteData, deleteFromStorage } from "./firebase.js";
import { deleteBtn, selectBtn } from "./index.js";
import { openPersonalPage } from "./Page/Gallaries.js";

const gallaryDocument = document.querySelector("#gallary");

let selected = [];

export let isSelectMode = false;

async function selectData(e) {
    if (e.target && e.target.id != 'gallary') {
        const divId = e.target.id;
        const index = selected.indexOf(divId);
        const target = document.getElementById(divId);
        if (index > -1) {
            selected.splice(index, 1);
            target.style.backgroundColor = "rgba(255, 219, 85, 1)";
            return;
        }
        target.style.backgroundColor = "white";
        selected.push(e.target.id);
    }
}
export async function handleDeleteClick() {
    const isDeleteStorage = await swal.fire({
        title: "저장소도 삭제?",
        text: '중복 저장 삭제는 저장소 삭제 금지!!',
        focusConfirm: false,
        allowOutsideClick: false,
        showDenyButton: true,
        confirmButtonText: 'ㅇ',
        denyButtonText: `ㄴ`
    });
    const isSure = await swal.fire({
        title: "진짜로 삭제?",
        text: '되돌릴수없다...',
        focusConfirm: false,
        allowOutsideClick: false,
        showDenyButton: true,
        confirmButtonText: 'ㅇ',
        denyButtonText: `ㄴ`
    });
    if(isSure.isDenied){
        return;
    }
    if(isDeleteStorage.isConfirmed){
        for (let i = 0; i < selected.length; i++) {
            await deleteFromStorage(selected[i]);
        }
    }
    for (let i = 0; i < selected.length; i++) {
        await deleteData(selected[i]);
    }
    selected = [];
    location.reload();
}

export function handleSelectClick() {
    if (!isSelectMode) {
        isSelectMode = true;
        selectBtn.innerText = "취소";
        deleteBtn.style.visibility = "visible";
        gallaryDocument.addEventListener('click', selectData);
        gallaryDocument.removeEventListener('click', openPersonalPage);
    }
    else {
        isSelectMode = false;
        selectBtn.innerText = "선택";
        deleteBtn.style.visibility = "hidden";
        changeColors();
        selected = [];
        gallaryDocument.removeEventListener('click', selectData);
        gallaryDocument.addEventListener('click', openPersonalPage);
    }
}

function changeColors() {
    const drawings = document.getElementsByClassName("drawing")
    Array.from(drawings).forEach(drawing => drawing.style.backgroundColor = 'rgba(255, 219, 85, 1)');
}