const handlers = require('./handler.js');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
   handlers.homeHandler(request, response);
  }
  else if (endpoint.indexOf('/public') !== -1) {
    handlers.staticFileHandler(request, response, endpoint);
  } else if (endpoint === '/signup') {
    handlers.signUpUser(request, response);
  }
  else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 resource not found');
  }
};

module.exports = router;
