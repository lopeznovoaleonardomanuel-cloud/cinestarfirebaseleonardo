

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyAhhFK6P1n-5x3eFzE0sKpkW5GsPtbEmio",
   authDomain: "leonardocinestar.firebaseapp.com",
   projectId: "leonardocinestar",
   storageBucket: "leonardocinestar.firebasestorage.app",
   messagingSenderId: "1053362816846",
   appId: "1:1053362816846:web:71ff5744059e130cfb001f"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };
