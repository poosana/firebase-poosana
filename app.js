// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getFirestore , collection , getDocs ,addDoc , deleteDoc , doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js"
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
const db = getFirestore(app)
const table = document.getElementById("table")
const form = document.getElementById("addForm")

// async คือต้องรอดึงข้อมูลมาครบก่อนถึงจะใช้งานได้
async function getEmployees(db){
    const empCol = collection(db,'employees')
    //await ต้องรอให้ข้อมูลมาครบถึงจะไปทำอย่างอื่นได้
    const empSnapshot = await getDocs(empCol)
    return empSnapshot
}

function showData(employee){
    const row = table.insertRow(-1)
    const nameCol = row.insertCell(0)
    const ageCol = row.insertCell(1)
    const deleteCol = row.insertCell(2)
    nameCol.innerHTML = employee.data().name
    ageCol.innerHTML = employee.data().age

    //สร้างปุ่มลบข้อมูล
    let btn = document.createElement('button')
    btn.textContent="delete data"
    btn.setAttribute('class','btn btn-danger')
    btn.setAttribute('data-id',employee.id)
    deleteCol.appendChild(btn)
    btn.addEventListener('click',(e)=>{
        let id = e.target.getAttribute('data-id')
        deleteDoc(doc(db,'employees',id))
    })
}


//ดึงกลุ่ม document
const data = await getEmployees(db)
data.forEach(employee =>{
    showData(employee)
})

//ดึงข้อมูลจากแบบฟอร์ม
form.addEventListener('submit',(e)=>{
    //ไม่ต้องเคลียร์ค่าในช่อง
    e.preventDefault()
    addDoc(collection(db,'employees'),{
        name:form.name.value,
        age:form.age.value
    })
    //reset ค่าว่าง
    form.name.value=""
    form.age.value=""
    alert("Data saved")
})