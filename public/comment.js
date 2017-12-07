/*eslint-disable*/

var userDisplay = document.getElementsByClassName('user')[0];
var postDisplay = document.getElementById('posts');

var getRequest = function(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            cb(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

var updateEmail = function(email) {
    userDisplay.textContent = email;
}

getRequest('/validate', updateEmail);

var updatePosts = function(posts) {
    var allPosts = JSON.parse(posts);
    allPosts.forEach(function (element) {
        var postHolder = document.createElement('article');
        postHolder.setAttribute('class','postBox');
        postHolder.setAttribute('id', ('post-'+element.id));
        var postTitle = document.createElement('h1');
        var postTitleText = document.createTextNode(element.title);
        postTitle.appendChild(postTitleText);
        postHolder.appendChild(postTitle);
        var postAuthor = document.createElement('p');
        var postAuthorText = document.createTextNode(element.username);
        postAuthor.appendChild(postAuthorText);
        postHolder.appendChild(postAuthor);
        var postText = document.createElement('p');
        var postTextText = document.createTextNode(element.text_post);
        postText.appendChild(postTextText);
        postHolder.appendChild(postText);
        var commentsBtn = document.createElement('button');
        var commentsBtnText = document.createTextNode('Comments');
        commentsBtn.appendChild(commentsBtnText);
        commentsBtn.addEventListener('click', function(event) {
            loadComments(element.id, postHolder);
        });
        postHolder.appendChild(commentsBtn);
        postDisplay.appendChild(postHolder);
    });
}

function loadComments(id, post) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            console.log(JSON.parse(xhr.responseText));
        }
    }
    xhr.open('GET', '/loadcomments?'+id, true);
    xhr.send();
}

getRequest('/loadpost', updatePosts)


