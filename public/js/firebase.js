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

export async function readDatabase() {
    const data = await dbRef.child("data").get();
    if (!data.val()) console.error("err");
    return data.val();
}

export async function readStorage(path) {
    return await storageRef.child(path).getDownloadURL();
}
