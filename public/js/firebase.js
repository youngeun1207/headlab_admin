const firebaseConfig = {
    apiKey: "AIzaSyBR0yFjUp3Rp6XrkVW7fuaYCjNU7t1xRB0",
    authDomain: "iboda-eyetracking.firebaseapp.com",
    databaseURL: "https://iboda-eyetracking-default-rtdb.firebaseio.com",
    projectId: "iboda-eyetracking",
    storageBucket: "iboda-eyetracking.appspot.com",
    messagingSenderId: "350140103230",
    appId: "1:350140103230:web:430388fd47b7ca41072f6f",
    measurementId: "G-05WEK5VGX2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.database(app);
const dbRef = db.ref();

const storage = firebase.app().storage("gs://iboda-eyetracking.appspot.com");
const storageRef = storage.ref();

const auth = firebase.auth(app);

export async function getAuth() {
    auth.signInAnonymously().catch((error) => {
        console.log(error.code);
        console.log(); (error.message);
    });
}

export async function readDatabase(dir) {
    const data = await dbRef.child(dir).get();
    if (!data.val()) console.error("err");
    return data.val();
}

export async function readPersonalData(key) {
    const data = await dbRef.child("data").child(key).get();
    if (!data.val()) console.error("err");
    return data.val();
}

export async function readStoragePath(key) {
    let pathList = [];

    const screenPath = (await dbRef.child("data").child(key).child("screenshot").get()).val();
    if (screenPath);
    pathList.push(screenPath);

    const drawPath = (await dbRef.child("data").child(key).child("drawing").get()).val();

    const timestamp = (await dbRef.child("data").child(key).child("process_index").get()).val();
    if (timestamp) {
        const timestampArr = Object.values(timestamp);
        let prefix = 1;
        for (let i = 0; i < timestampArr.length; i++) {
            pathList.push(`${drawPath}_${prefix}`);
            prefix += 2;
        }
    }
    pathList.push(`${drawPath}_end`);

    const audioPath = (await dbRef.child("data").child(key).child("audio").get()).val();
    if (audioPath) {
        pathList.push(audioPath);
    }

    return pathList;
}

export async function deleteFromStorage(key) {
    const pathList = await readStoragePath(key);
    console.log(pathList);
    Array.from(pathList).forEach(path => (storageRef.child(path)).delete());
}
export async function deleteStorage(path) {
    (storageRef.child(path)).delete();
}
export async function readStorage(path) {
    let url;
    try {
        url = await storageRef.child(path).getDownloadURL();
    } catch (e) {
    }
    return url;
}

export async function listStorage(path) {
    let url = await storageRef.child(path);
    const urlList = [];
    const res = await url.listAll();
    res.items.forEach(async (itemRef) => {
        urlList.push(await itemRef.getDownloadURL());
    });
    return urlList;
}

export async function deleteData(path) {
    const data = await dbRef.child("data").child(path);
    data.remove();

    const keyInfo = await dbRef.child("key_info").child(path);
    keyInfo.remove();
}

export async function saveImage(path, src) {
    const file_path = storageRef.child(path);
    file_path.put(src)
}

export async function uploadFile(file, filename) {
    const path = storageRef.child(filename);
    path.put(file)
}