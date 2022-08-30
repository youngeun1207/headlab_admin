const db = firebase.database(app);
const dbRef = db.ref();

const storage = firebase.storage();
var pathReference = storage.ref('images/stars.jpg');

dbRef.child("data").get().then((snapshot) => {
  if (snapshot.exists()) {
    const gaze_data = snapshot.val();
  } else {
    console.log("데이터 없음");
  }
}).catch((error) => {
  console.error(error);
});