// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ここで getFirestore をインポート
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "quotevibes-63b2e.firebaseapp.com",
  projectId: "quotevibes-63b2e",
  storageBucket: "quotevibes-63b2e.firebasestorage.app",
  messagingSenderId: "774181051170",
  appId: "1:774181051170:web:8d04c1f505d5d3d60b237b",
  measurementId: "G-XDE7N7F0ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ここで db を定義

export { db }; // 名前付きエクスポート
