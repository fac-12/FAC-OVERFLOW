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
        loginErrorMsg.textContent = "Please enter an email"
    } else if (loginPassword.value === "") {
        return loginErrorMsg.textContent = "Please enter your password"
    } else if (checkEmail) {
        XHRRequest('/login', 'POST', JSON.stringify({email: loginEmail.value, password: loginPassword.value}), loginErrorMsg)
    }
});

loginEmail.addEventListener('focusout', function () {
    checkEmail(loginErrorMsg, loginEmail);
});

loginEmail.addEventListener('focus', function () {
    loginEmail.className = '';
});

email.addEventListener('focusout', function () {
    checkEmail(errorMsg, email)
});

email.addEventListener('focus', function () {
    email.className = "";
    if (pw1.className !== 'red'){
        errorMsg.textContent = "";
    }
});

loginPassword.addEventListener('focus', function (){
    loginPassword.className = '';
});

var checkEmail = function (errMessage, emailBox) {
    if (emailBox.value && (!validEmail(emailBox.value))) {
        errMessage.textContent = "Invalid email address"
        emailBox.className = "red";
        return false;
    } else {
        emailBox.className = "";
        errMessage.textContent = "";
        return true;
    }
}

var validEmail = function (email) {
    var regex = /^[\w-.]+@[\w-.]+.\w+$/;
    return regex.test(email);
}

signup.addEventListener('submit', function (event) {
    event.preventDefault();
    if (email.value === "") {
        errorMsg.textContent = "Please enter an email"
    } else if (!validEmail(email.value)) {
        errorMsg.textContent = "Invalid email address"
    } else if (!checkPasswords()) {
        console.log("pw dont match");
        errorMsg.textContent = "Passwords do not match"
    } else if (badPassword(pw1.value)) {
        errorMsg.textContent = badPassword(pw1.value);
    } else {
        XHRRequest('/signup', 'POST', JSON.stringify({ email: email.value, password: pw1.value }), errorMsg)
    }
});

var badPassword = function(password){
    var regex = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    var minEight = /^.{8,}$/;
    if(regex.test(password)){
        return '';
    } else if (minEight.test(password)){
        return 'Must include numbers & letters';
    } else {
        return 'Password not long enough (8+)';
    }
}

var checkPasswords = function (event) {
    if ((pw1.value !== pw2.value) && pw2.value && pw1.value) {
        errorMsg.textContent = "Passwords do not match";
        pw1.className = "red";
        pw2.className = "red";
        console.log('passwords don\'t match')
        return false;
    } else {
        pw1.className = "";
        pw2.className = "";
        errorMsg.className = "";
        console.log('passwords match');
        return true;
    }
}

pw1.addEventListener('focusout', checkPasswords);

pw2.addEventListener('focusout', checkPasswords);

var resetPasswords = function (event) {
    pw1.className = "";
    pw2.className = "";
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