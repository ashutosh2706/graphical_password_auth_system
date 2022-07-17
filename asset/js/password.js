import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

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

class Stack {
    constructor() {
        this.items = [];
    }

    has(element) {
        return this.items.includes(element)
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length == 0) {
            return "-1";
        }
        return this.items.pop();
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length == 0;
    }
}

function clearStack() {
    while(!(stack.isEmpty())) {
        stack.pop();
    }
}

var stack = new Stack();
document.getElementById('btn_submitPass').addEventListener("click", submitPass);
document.getElementById('btn_resetPass').addEventListener("click", resetPass);
document.getElementById('btn_swap').addEventListener("click", swapImages);


while (stack.size() < 16) {
    var str = "";
    str = getRand() + "" + getRand()
    if (!(stack.has(str))) {
        stack.push(str);
    }
}

for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++) {
        var st = i + "" + j;
        setFruitImages(st)
    }

function setFruitImages(id) {
    var path = stack.pop() + ".png";
    var fullpath = "../asset/img/" + path;
    document.getElementById(id).style.backgroundImage = 'url(' + fullpath + ')';
}

function setAlphaImages(id) {
    var path = stack.pop() + ".png";
    var fullpath = "../asset/img/alpha/" + path;
    document.getElementById(id).style.backgroundImage = 'url(' + fullpath + ')';
}

var password = "";

for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++) {
        var btnID = i + "" + j;
        document.getElementById(btnID).onclick = function () {
            var clicked = event.target
            genPass(clicked.id)
        }
    }

function genPass(btnID) {
    document.getElementById(btnID).style.opacity = "0.3";
    document.getElementById(btnID).style.filter = 'alpha(opacity=30)';
    var v = document.getElementById(btnID).style.backgroundImage;
    generatePassword(v.substring(v.lastIndexOf('/') + 1, v.lastIndexOf('.')))
}

function generatePassword(s) {
    switch (s) {
        case '00':
            password += "00";
            break;
        case '01':
            password += "01";
            break;
        case '02':
            password += "02";
            break;
        case '03':
            password += "03";
            break;
        case '10':
            password += "10";
            break;
        case '11':
            password += "11";
            break;
        case '12':
            password += "12";
            break;
        case '13':
            password += "13";
            break;
        case '20':
            password += "20";
            break;
        case '21':
            password += "21";
            break;
        case '22':
            password += "22";
            break;
        case '23':
            password += "23";
            break;
        case '30':
            password += "30";
            break;
        case '31':
            password += "31";
            break;
        case '32':
            password += "32";
            break;
        case '33':
            password += "33";
            break;
    }
}

function submitPass() {
    var register_user = sessionStorage.getItem('register');
    if (register_user == 'true') {
        if (validPass()) {
            localStorage.setItem('!!!', password);
            window.close();
        } else {
            alert('Select at least 3 images.');
        }
    } else {
        if (validPass()) {
            document.getElementById('btn_submitPass').style.cursor = "progress";
            signInWithEmailAndPassword(auth, sessionStorage.getItem('email'), password)
                .then((userCredential) => {

                    const user = userCredential.user;
                    const dt = new Date();
                    const yyyy = dt.getFullYear();
                    let mm = dt.getMonth()+1;
                    let dd = dt.getDate();
                    if(mm<10) mm = '0'+mm;
                    if(dd<10) dd = '0'+dd;
                    const today = dd+'/'+mm+'/'+yyyy;

                    update(ref(database, 'users/' + user.uid), {
                        login: today
                    })
                        .then(() => {
                            sessionStorage.removeItem('email');
                            resetPass();
                            window.open('homepage.html', 'top');
                            window.close();
                        })
                        .catch((error) => {
                            alert('An Error Occurred');
                            console.log('['+error.code+'] An error occurred while updating user details');
                        })
                })
                .catch((error) => {
                    resetPass();
                    const msg = error.code;
                    if(msg == 'auth/invalid-email')
                        alert('Invalid Email\nPlease enter correct email address.');
                    else if(msg == 'auth/wrong-password')
                        alert('Incorrect Password.');
                    else if(msg == 'auth/too-many-requests')
                        alert('Access Blocked\nToo many unsuccessful login attempts. Try again after 30 minutes.');
                    else
                        alert('An Error Occurred');
                    console.log(msg);
                    document.getElementById('btn_submitPass').style.cursor = "pointer";
                });
        } else {
            alert('Select at least 3 images.');
        }
    }
}

function resetPass() {
    password = "";
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var st = i + "" + j;
            document.getElementById(st).style.opacity = "1.0";
            document.getElementById(st).style.filter = 'alpha(opacity=10)';
        }
}

function validPass() {
    return (password.length < 6)?false:true;
}

function getRand() {
    return Math.floor(Math.random() * (4 - 0) + 0)
}

var img_fruits = "true";

function swapImages() {
    resetPass();
    clearStack();

    while (stack.size() < 16) {
        var str = "";
        str = getRand() + "" + getRand()
        if (!(stack.has(str))) {
            stack.push(str);
        }
    }

    if (img_fruits == "true") {

        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++) {
                var st = i + "" + j;
                setAlphaImages(st)
            }
        img_fruits = "false";
    } else {

        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++) {
                var st = i + "" + j;
                setFruitImages(st)
            }
        img_fruits = "true";
    }
}