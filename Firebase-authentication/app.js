// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged ,signOut ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
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
const auth = getAuth(app)

const form = document.getElementById("registerForm")
const formarea = document.getElementById("form-area")
const profile = document.getElementById("profile")
const welcome = document.getElementById("welcome")
const logout = document.getElementById("logout")
const loginForm = document.getElementById("loginForm")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = form.email.value
    const password = form.password.value
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
        alert("Account created")

    }).catch(error => {
        alert(error.message)
    })

})

onAuthStateChanged(auth, (user) => {
    //log in
    if (user) {
        profile.style.display = "block"
        formarea.style.display = "none"
        welcome.innerText = `welcome ${user.email}`
    } else {
        //ไม่ได้ log in
        profile.style.display = "none"
        formarea.style.display = "block"
    }
})

logout.addEventListener("click",(e)=>{
    signOut(auth).then(()=> {
        alert("Signed out")
    }).catch((error)=>{
        alert(error.message)
    })
})

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth,email,password).then((result=>{
        alert("Signed in")
    })).catch(error=>{
        alert(error.message)
    })
})