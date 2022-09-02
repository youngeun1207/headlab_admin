import "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import 'https://www.gstatic.com/firebasejs/8.8.1/firebase-storage.js';

import { readDatabase, readStorage } from "./firebase.js";
import getGallaries from './Page/Gallaries.js';

const data = await readDatabase();

const key_list = Object.keys(data);
key_list.map(key => readStorage(data[key].drawing));

await getGallaries(data);