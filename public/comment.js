/*eslint-disable*/

var userDisplay = document.getElementsByClassName('user')[0];
var postDisplay = document.getElementById('posts');
var logoutBtn = document.getElementById('logoutBtn');

var getRequest = function(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            cb(xhr.responseText);
        } else if (xhr.readyState === 4 && xhr.status === 401){
            window.location.href = '/';
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

var updateEmail = function(email) {
    document.getElementsByTagName('body')[0].className = "";
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
        postTitle.setAttribute('class','postTitle');
        var postTitleText = document.createTextNode(element.title);
        postTitle.appendChild(postTitleText);
        postHolder.appendChild(postTitle);
        var postAuthor = document.createElement('p');
        var postAuthorText = document.createTextNode(element.username);
        postAuthor.appendChild(postAuthorText);
        postHolder.appendChild(postAuthor);
        postAuthor.setAttribute('class','postAuthor');
        var postText = document.createElement('p');
        var postTextText = document.createTextNode(element.text_post);
        postText.appendChild(postTextText);
        postText.setAttribute('class','postText');
        postHolder.appendChild(postText);
        var commentsBtn = document.createElement('button');
        var commentsBtnText = document.createTextNode('Show Comments');
        commentsBtn.appendChild(commentsBtnText);
        commentsBtn.addEventListener('click', function(event) {
            if (this.textContent === 'Show Comments') {
                loadComments(this, element.id, postHolder);
            } else {
                this.textContent = 'Show Comments';
                this.parentElement.removeChild(this.parentElement.lastChild);
            }
        });
        commentsBtn.setAttribute('class','commentBtn');
        postHolder.appendChild(commentsBtn);
        postDisplay.appendChild(postHolder);
    });
}

function loadComments(button, id, post) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            displayComments(button, JSON.parse(xhr.responseText), post);
        }
    }
    xhr.open('GET', '/loadcomments?'+id, true);
    xhr.send();
}

function displayComments(button, comments, post) {
    button.textContent = 'Hide Comments';
    var commentsHolder = document.createElement('div');
    comments.forEach(function(comment) {
        var commentBox = document.createElement('div');
        commentBox.setAttribute('class','commentBox');
        var commentText = document.createElement('p');
        var commentTextText = document.createTextNode(comment.text_comments);
        commentText.appendChild(commentTextText);
        commentText.setAttribute('class','commentText');
        var commentAuthor = document.createElement('p');
        var commentAuthorText = document.createTextNode(comment.username);
        commentAuthor.appendChild(commentAuthorText);
        commentAuthor.setAttribute('class','commentAuthor');
        commentBox.appendChild(commentText);
        commentBox.appendChild(commentAuthor);

        commentsHolder.appendChild(commentBox);
    });
    post.appendChild(commentsHolder);
}

getRequest('/loadpost', updatePosts);

logoutBtn.addEventListener('click',function(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 201){
          window.location.href = xhr.getResponseHeader('Location');
      }
  }
  xhr.open('GET', '/logout', true);
  xhr.send();

})
