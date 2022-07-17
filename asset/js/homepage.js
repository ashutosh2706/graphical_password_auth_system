import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

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
const auth = getAuth();
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        const email = user.email;
        const emailVerified = user.emailVerified;
        
        document.getElementById("name").innerHTML = "" + sessionStorage.getItem('username');
        document.getElementById("email").innerHTML = "Email: " + email;
        sessionStorage.removeItem('username')
        if(emailVerified) {
            document.getElementById("verified").innerHTML = "Verified";
        }else {
            document.getElementById("verified").innerHTML = "Not verified";
        }
    } else {
        console.log("user null");
    }
});
// if (user !== null) {
//     // The user object has basic properties such as display name, email, etc.
//     const displayName = user.user;
//     const email = user.mail;
//     const login = user.last_login;
//     const emailVerified = user.emailVerified;
//     const uid = user.uid;

//     console.log(displayName)
//     console.log(email)
//     console.log(login)
//     console.log(uid)
//     console.log(emailVerified)

//     document.getElementById("id").innerHTML = "User-ID: "+uid;
//     document.getElementById("name").innerHTML = ""+displayName;
//     document.getElementById("email").innerHTML = "Email: "+email;
//     document.getElementById("login-time").innerHTML = "Last logged-in: "+login;
//     document.getElementById("verified").innerHTML = "Email verified: "+emailVerified;

//     // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.

// }else
// {
//     console.log("null")
// }