function getEmail(cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            cb(xhr.responseText);
        }
    }
    xhr.open('GET', '/validate', true);
    xhr.send();
}

var updateEmail = function(email) {
    console.log(email)
    // finish
}

getEmail(updateEmail)