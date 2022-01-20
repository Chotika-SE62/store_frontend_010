// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCauCocod6AZqxZXf1jJZDf_TvQl7qy8WY",
  authDomain: "fir-reactupload-f10ed.firebaseapp.com",
  projectId: "fir-reactupload-f10ed",
  storageBucket: "fir-reactupload-f10ed.appspot.com",
  messagingSenderId: "338079710145",
  appId: "1:338079710145:web:c81431a36c904ff27ecd40",
  measurementId: "G-SCJER0WPXJ"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

//Export storage
const storage = getStorage(firebase);

export { storage, firebase as default };