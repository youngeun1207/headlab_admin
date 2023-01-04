import "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import 'https://www.gstatic.com/firebasejs/8.8.1/firebase-storage.js';
import "https://www.gstatic.com/firebasejs/8.8.1/firebase-auth.js";

import { deleteStorage, getAuth, readDatabase, readStorage, saveImage, uploadFile} from "./firebase.js";

await getAuth();
const data = await readDatabase("key_info");

const key_list = Object.keys(data);

async function createFile(url){
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: 'image/png'
    };
    let file = new File([data], "test.png", metadata);
    return file
}

for(let i = key_list.length-1; i < key_list.length; i--){
    let file_num = 1;
    let key = key_list[i];
    let index = await readDatabase(`data/${key}/process_index`);
    let filename = await readDatabase(`data/${key}/drawing`);
    console.log(index);
    for(let j = 0; j < Object.keys(index).length; j++){
        let src = await readStorage(filename + `_${file_num}`);
        await uploadFile(await createFile(src), `${filename}/${filename.slice(8)}_${file_num}.png`);
        file_num+=2;
    }
    let src = await readStorage(filename + `_end`);
    await uploadFile(await createFile(src), `${filename}/${filename.slice(8)}_end.png`);
}