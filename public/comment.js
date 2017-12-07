var getEmail = function(cb) {
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

var getPost = function(cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            cb(xhr.responseText);
        }
    }
    xhr.open('GET', '/loadpost', true);
    xhr.send();
}

var updatePost = function(post) {
    console.log(JSON.parse(post))
    // finish
}

getPost(updatePost)

