import { readStorage } from "./firebase.js";

export async function getAudioFile(path){
    const audioFile = await readStorage(path);
    document.getElementById("audio").setAttribute('src', audioFile);
}

