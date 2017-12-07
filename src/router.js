const handlers = require('./handler.js');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
    handlers.homeHandler(request, response);
  } else if (endpoint.indexOf('/public') !== -1) {
    handlers.staticFileHandler(request, response, endpoint);
  } else if (endpoint === '/signup') {
    handlers.signUpUser(request, response);
  } else if (endpoint === '/login') {
    handlers.loginUser(request, response);
  } else if (endpoint === '/forum') {
    handlers.staticFileHandler(request, response, '/public/forum.html');
  } else if (endpoint === '/validate') {
    handlers.validateToken(request, response);
  } else if (endpoint === '/loadpost') {
      handlers.getPost(request, response);
  } else if (endpoint.indexOf('/loadcomments') !== -1) {
    handlers.getComments(request, response, endpoint);
  } else if (endpoint.indexOf('/logout') !== -1) {
    handlers.logoutHandler(request, response);
  }else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 resource not found');
  }
};

module.exports = router;
