/* eslint-disable */

var login = document.getElementById('login');
var signup = document.getElementById('signup');
var loginEmail = document.getElementById('login_email');
var email = document.getElementById('email');
var loginPassword = document.getElementById('login_password');
var pw1 = document.getElementById('password');
var pw2 = document.getElementById('confirmPassword');
var errorMsg = document.getElementById('errorMessage');
var loginErrorMsg = document.getElementById('loginErrorMessage');

// sort out passwords IMPORTANT


login.addEventListener('submit', function (event) {
    event.preventDefault();
    if (loginEmail.value === "") {
        loginErrorMsg.textContent = "Please enter an email."
    }
    if (loginErrorMsg.textContent === "") {
        XHRRequest('/login', 'POST', JSON.stringify({email: loginEmail.value, password: loginPassword.value}), loginErrorMsg)
    }
});

signup.addEventListener('submit', function (event) {
    event.preventDefault();
    if (email.value === "") {
        loginErrorMsg.textContent = "Please enter an email."
    } else {
        loginErrorMsg.textContent = badPassword(loginPassword.value);
    }
    if (errorMsg.textContent === "" && pw1.className === "") {
        XHRRequest('/signup', 'POST', JSON.stringify({ email: email.value, password: pw1.value }), errorMsg)
    }
});

loginPassword.addEventListener('focus', function (){
    loginErrorMsg.textContent = '';
})

var validEmail = function (email) {
    var regex = /^[\w-.]+@[\w-.]+.\w+$/;
    return regex.test(email);
}

var checkEmail = function (errMessage, emailBox) {
    if (emailBox.value && (!validEmail(emailBox.value))) {
        console.log(errMessage.textContent);
        errMessage.textContent = "Invalid email address."
        console.log(errMessage.textContent);
        emailBox.className = "red";
    } else {
        emailBox.className = "";
        errMessage.textContent = "";
    }
}


var badPassword = function(password){
    var regex = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    var minEight = /^.{8,}$/;
    if(regex.test(password)){
        return '';
    } else if (minEight.test(password)){
        return 'Must include numbers and characters';
    } else {
        return 'Password not long enough (8+)';
    }
}
loginEmail.addEventListener('focusout', function () {
    checkEmail(loginErrorMsg, loginEmail)
});
email.addEventListener('focusout', function () {
    checkEmail(errorMsg, email)
});
loginEmail.addEventListener('focus', function () {
    loginEmail.className = "";
});
email.addEventListener('focus', function () {
    email.className = "";
    if (pw1.className !== 'red'){
        errMessage.textContent = "";
    }
});

var checkPasswords = function (event) {
    if ((pw1.value !== pw2.value) && pw2.value && pw1.value) {
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

var XHRRequest = function (url, method, body, errMsgBox) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            window.location.href = xhr.getResponseHeader('Location');
        } else if (xhr.readyState === 4 && xhr.status >= 400) {
            errMsgBox.textContent = xhr.responseText;
        }
    }
    xhr.open(method, url, true);
    xhr.send(body);
}

function parseResponse(response) {
    try {
        return JSON.parse(response);
    } catch (e) {
        return {
            err: "Not JSON"
        };
    }
}