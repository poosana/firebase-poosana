// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getStorage ,ref , uploadBytes } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZivew68oYOgfRsrTDK5yWKYR49m7Qrhw",
    authDomain: "poosana-firebase.firebaseapp.com",
    projectId: "poosana-firebase",
    storageBucket: "poosana-firebase.appspot.com",
    messagingSenderId: "991596356926",
    appId: "1:991596356926:web:3265cbaea5cb36266d386f",
    measurementId: "G-C04SZW7LTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app)


const fileUpload = document.getElementById("fileUpload")
fileUpload.addEventListener("change",(e)=>{
    const file = e.target.files[0]
    const imageRef = ref(storage,"myimage")
    uploadBytes(imageRef,file).then((result)=>{
        alert("Upload success")
    })
})

