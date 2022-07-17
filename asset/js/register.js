import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC-4WweZF0dohrX-3eI17jE4bx6DCf1Mqk",
    authDomain: "graphicalpasswordauth.firebaseapp.com",
    databaseURL: "https://graphicalpasswordauth-default-rtdb.firebaseio.com",
    projectId: "graphicalpasswordauth",
    storageBucket: "graphicalpasswordauth.appspot.com",
    messagingSenderId: "1053248110278",
    appId: "1:1053248110278:web:4859c68da268485730a1c7",
    measurementId: "G-RZYJK2JQW6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

var form = document.getElementById('signup_form');
document.getElementById('btn_setPass').addEventListener("click", setPass);

function setPass() {
    sessionStorage.setItem('register', 'true')
    window.open("password-ui.html", '_blank')
}

form.addEventListener('submit', function (event) {
    event.preventDefault()
    var mUserName = document.getElementById('user_name_signup').value;
    var mEmail = document.getElementById('user_email_signup').value;
    var mPass = localStorage.getItem('!!!');
    if (mPass != null) {

        document.getElementById('btn_regist').style.cursor = "progress";
        createUserWithEmailAndPassword(auth, mEmail, mPass)
            .then((userCredential) => {

                const user = userCredential.user;
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        createDB(user, mEmail, mUserName);
                    })
                    .catch((error) => {
                        alert('An Error Occurred');
                        console.log('['+error.code+'] Email not sent');
                        localStorage.removeItem('!!!');
                    })
            })
            .catch((error) => {
                console.log(error.code);
                alert('An Error Occurred');
                document.getElementById('btn_regist').style.cursor = "pointer";
            });
        localStorage.removeItem('!!!');
    } else {
        alert('Password Error!\nSet your password first.');
    }
})

function createDB(user, mEmail, mUserName) {

    set(ref(database, 'users/' + user.uid), {
        name: mUserName,
        mail: mEmail
    })
        .then(() => {
            alert('User ('+ mUserName +') registered successfully.');
            localStorage.removeItem('!!!');
            window.history.go(-1);
        })
        .catch((error) => {
            localStorage.removeItem('!!!');
            alert('An Error Occurred');
            console.log('['+error.code+'] Cloud save failed');
        })

}