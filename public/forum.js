function checkCookie() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = (xhr.responseText);
            console.log(result);
        } else {
            window.location.href = '/';
        }
    }
    xhr.open('GET', '/validate', true);
    xhr.send();
}

checkCookie()