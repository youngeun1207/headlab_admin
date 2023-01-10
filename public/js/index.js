import "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import 'https://www.gstatic.com/firebasejs/8.8.1/firebase-storage.js';
import "https://www.gstatic.com/firebasejs/8.8.1/firebase-auth.js";

import { getAuth, readDatabase } from "./firebase.js";
import getGallaries, { sortFunction } from './Page/Gallaries.js';
import { handleDeleteClick, handleSelectClick } from "./select.js";
import { handlePrevClick } from "./openPrevData.js";


export const selectBtn = document.getElementById("select");
export const deleteBtn = document.getElementById("delete");

export const prevBtn = document.getElementById("prev_data");

if(selectBtn){
    selectBtn.addEventListener('click', handleSelectClick);
}

if(deleteBtn){
    deleteBtn.addEventListener('click', handleDeleteClick);
}

if(prevBtn){
    prevBtn.addEventListener('click', handlePrevClick);
}

await getAuth();
// const data = await readDatabase("key_info");
// 1월 테스트
const data = await readDatabase("key_info_2023JAN");

// const key_list = Object.keys(data);
// key_list.map(key => readStorage(data[key].drawing + "_end"));

let entries = Object.entries(data);
entries.sort(sortFunction);

const final_data = Object.fromEntries(entries);

await getGallaries(final_data);
