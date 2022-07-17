
function forgotPass() {
    alert('Contact project maintainer (imashutosh2706@gmail.com) to get your password reset.');
}

var form = document.getElementById('login_form')
form.addEventListener('submit',function(event){
    event.preventDefault()
    var userMail = document.getElementById('user_email').value
    var userName = document.getElementById('user_name').value
    sessionStorage.setItem('email',userMail)
    sessionStorage.setItem('register','false')
    sessionStorage.setItem('username',userName)
    window.open("password-ui.html",'_blank')
})