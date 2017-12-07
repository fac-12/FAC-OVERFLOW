var userEmail = '';

function checkCookie() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            userEmail = xhr.responseText;
        } else if (xhr.readyState === 4 && xhr.status === 401){
            window.location.href = '/';
        }
    }
    xhr.open('GET', '/validate', true);
    xhr.send();
}

checkCookie()