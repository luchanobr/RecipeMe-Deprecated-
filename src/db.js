import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCVGxfDn588HcQsdcAGsgZnngMZh1PJ-3g",
    authDomain: "recipeme-9277a.firebaseapp.com",
    databaseURL: "https://recipeme-9277a.firebaseio.com",
    projectId: "recipeme-9277a",
    storageBucket: "recipeme-9277a.appspot.com",
    messagingSenderId: "911612842269",
    appId: "1:911612842269:web:9117e7ef85a69ea1"
};
// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();
