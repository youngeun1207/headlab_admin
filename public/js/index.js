import "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import 'https://www.gstatic.com/firebasejs/8.8.1/firebase-storage.js';
import "https://www.gstatic.com/firebasejs/8.8.1/firebase-auth.js";

import { getAuth, readDatabase } from "./firebase.js";
import getGallaries, { sortFunction } from './Page/Gallaries.js';

await getAuth();
const data = await readDatabase("key_info");

// const key_list = Object.keys(data);
// key_list.map(key => readStorage(data[key].drawing + "_end"));

let entries = Object.entries(data);
entries.sort(sortFunction);

const final_data = Object.fromEntries(entries);

await getGallaries(final_data);
