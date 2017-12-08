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

////Generic Functions for Validation

//Sends and handles post requests
var postRequest = function (url, body, errMsgBox) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            window.location.href = xhr.getResponseHeader('Location');
        } else if (xhr.readyState === 4 && xhr.status >= 400) {
            errMsgBox.textContent = xhr.responseText;
        }
    }
    xhr.open('POST', url, true);
    xhr.send(body);
}

//checks if email address valid, returns boolean and sets error messages accordingly
var checkEmail = function (errMessage, emailBox) {
    if (emailBox.value && (!validEmail(emailBox.value))) {
        errMessage.textContent = "Invalid email address"
        emailBox.className = "red";
        return false;
    } else {
        emailBox.className = "";
        if (errMessage.textContent.includes('email')) {
            errMessage.textContent = "";
        }
        return true;
    }
}

//tests email against regex, returns boolean
var validEmail = function (email) {
    var regex = /^[\w-.]+@[\w-.]+.\w+$/;
    return regex.test(email);
}

//test password against regex, return error message or empty string
var badPassword = function(password){
    var regex = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    var minEight = /^.{8,}$/;
    if(regex.test(password)){
        return '';
    } else if (minEight.test(password)){
        return 'Password must include numbers & letters';
    } else {
        return 'Password must be at least 8 characters';
    }
}

//reset password error
var resetPasswordError = function (event) {
    pw1.className = "";
    pw2.className = "";
    if (errorMsg.textContent.includes('Password')) {
        errorMsg.textContent = "";
    }
};

//check if passwords match and sets error messages accordingly
var checkPasswords = function (event) {
    var error = '';
    if (pw1.value && pw2.value) {
        error = badPassword(pw1.value);
        if (!error && (pw1.value !== pw2.value)) {
            error = "Passwords do not match";
        }
        if (error) {
            if (!errorMsg.textContent.includes('email')) {
                errorMsg.textContent = error;
            }
            pw1.className = "red";
            pw2.className = "red";
            return false;
        } else {
            resetPasswordError();
            return true;
        }
    } else {
        resetPasswordError();
        return true;
    }
}

////Handle Log In and Validation

loginEmail.addEventListener('focusout', function () {
    checkEmail(loginErrorMsg, loginEmail);
});

loginEmail.addEventListener('focus', function () {
    loginEmail.className = '';
});

loginPassword.addEventListener('focus', function (){
    loginPassword.className = '';
});

login.addEventListener('submit', function (event) {
    event.preventDefault();
    if (loginEmail.value === "") {
        loginErrorMsg.textContent = "Please enter an email";
    } else if (loginPassword.value === "") {
        loginErrorMsg.textContent = "Please enter your password"
    } else if (checkEmail) {
        var url = JSON.stringify({email: loginEmail.value, password: loginPassword.value});
        postRequest('/login', url, loginErrorMsg);
    }
});

////Handle Sign Up and Validation

email.addEventListener('focusout', function () {
    checkEmail(errorMsg, email)
});

email.addEventListener('focus', function () {
    email.className = "";
});

pw1.addEventListener('focusout', checkPasswords);
pw2.addEventListener('focusout', checkPasswords);
pw1.addEventListener('focus', resetPasswordError);
pw2.addEventListener('focus', resetPasswordError);

signup.addEventListener('submit', function (event) {
    event.preventDefault();
    if (email.value === "") {
        errorMsg.textContent = "Please enter an email";
    } else if (!validEmail(email.value)) {
        errorMsg.textContent = "Invalid email address";
    } else if (!checkPasswords()) {
        console.log("pw dont match");
        errorMsg.textContent = "Passwords do not match";
    } else if (badPassword(pw1.value)) {
        errorMsg.textContent = badPassword(pw1.value);
    } else {
        var url = JSON.stringify({ email: email.value, password: pw1.value });
        postRequest('/signup', url, errorMsg);
    }
});