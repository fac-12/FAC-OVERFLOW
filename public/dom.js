/* eslint-disable */

var login = document.getElementById('login');
var signup = document.getElementById('signup');
var loginEmail = document.getElementById('login_email');
var email = document.getElementById('email');
var pw1 = document.getElementById('password');
var pw2 = document.getElementById('confirmPassword');
var errorMsg = document.getElementById('errorMessage');
var loginErrorMsg = document.getElementById('loginErrorMessage');

login.addEventListener('submit', function (event) {
    event.preventDefault();
    if (errorMsg.textContent === "") {
        console.log('submitted');
        // send a post to login
    }
});

signup.addEventListener('submit', function (event) {
    event.preventDefault();
    if (errorMsg.textContent === "" && pw1.className === "") {
        console.log('submitted');
         // send a post to signup
    }
});

var validEmail = function(email) {
    var regex = /^[\w-.]+@[\w-.]+.\w+$/;
    return regex.test(email);
}

var checkEmail = function (errMessage, emailBox) {
    console.log(errMessage)
    if (emailBox.value === "") {
        errMessage.textContent = "Please enter an email."
    } else if (!validEmail(emailBox.value)) {
        errMessage.textContent = "Invalid email address."
        emailBox.className = "red";
    } else {
        emailBox.className = "";
        errMessage.textContent = "";
    }
}

var resetEmail = function (errMessage, emailBox) {
    emailBox.className = "";
    errMessage.textContent = "";
}

loginEmail.addEventListener('focusout', function() {
    checkEmail(loginErrorMsg, loginEmail)
});
email.addEventListener('focusout', function() {
    checkEmail(errorMsg, email)
});
loginEmail.addEventListener('focus', function() {
    resetEmail(loginErrorMsg, loginEmail)
});
email.addEventListener('focus', function() {
    resetEmail(errorMsg, email)
});

var checkPasswords = function (event) {
    if (pw1.value !== pw2.value) {
        errorMsg.textContent = "Passwords do not match";
        pw1.className = "red";
        pw2.className = "red";
    } else {
        pw1.className = "";
        pw2.className = "";
        errorMsg.className = "";
    }
}

pw1.addEventListener('focusout', function (event) {
    if (pw1.value === "") {
        errorMsg.textContent = "Please enter a password."
    } else {
        checkPasswords();
    }
});

pw2.addEventListener('focusout', checkPasswords);

var resetPasswords = function (event) {
    pw1.className = "";
    pw2.className = "";
    errorMsg.textContent = "";
};

pw1.addEventListener('focus', resetPasswords);
pw2.addEventListener('focus', resetPasswords);